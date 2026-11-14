// Battle Engine for Pokémon Emerald Journeys
// Handles Turn Flow, Damage Calculation, Mega Evolution, Z-Moves, Dynamax/G-Max, Catching & Exp

import { getEffectiveness } from './types.js';
import { MOVES, Z_MOVES, MAX_MOVES, GMAX_MOVES } from './movesData.js';
import { POKEMON_SPECIES, calculateStats } from './pokemonData.js';
import { Sound } from './audio.js';
import { AnimeVfx } from './animeVfx.js';
import { Sprites } from './sprites.js';

export class Battle {
  constructor({
    playerTeam,
    playerBox = [],
    opponentTeam,
    isTrainer = false,
    trainerName = 'Wild Pokémon',
    isWcs = false,
    wcsData = null,
    isLegendaryEvent = false,
    eventData = null,
    onBattleEnd,
    logCallback,
    uiCallback
  }) {
    this.playerTeam = playerTeam;
    this.playerBox = playerBox;
    this.opponentTeam = opponentTeam;
    this.isTrainer = isTrainer;
    this.trainerName = trainerName;
    this.isWcs = isWcs;
    this.wcsData = wcsData;
    this.isLegendaryEvent = isLegendaryEvent;
    this.eventData = eventData;
    this.onBattleEnd = onBattleEnd;
    this.logCallback = logCallback || console.log;
    this.uiCallback = uiCallback || (() => {});

    this.playerActiveIndex = 0;
    this.opponentActiveIndex = 0;

    // Find first non-fainted Pokémon
    this.playerActiveIndex = this.playerTeam.findIndex(p => p.currentHp > 0);
    this.opponentActiveIndex = this.opponentTeam.findIndex(p => p.currentHp > 0);

    // Turn state
    this.turn = 1;
    this.isBusy = false;
    this.selectedMega = false;
    this.selectedZMove = false;
    this.selectedDynamax = false;
    this.expGains = new Map();

    // Check if opponent should auto-trigger gimmick (like Korrina Mega Lucario or Leon G-Max Charizard)
    this.checkOpponentGimmickTrigger();
  }

  getPlayerPokemon() {
    return this.playerTeam[this.playerActiveIndex];
  }

  getOpponentPokemon() {
    return this.opponentTeam[this.opponentActiveIndex];
  }

  log(message) {
    if (this.logCallback) this.logCallback(message);
  }

  refreshUi() {
    this.uiCallback();
  }

  checkOpponentGimmickTrigger() {
    const opp = this.getOpponentPokemon();
    if (!opp) return;

    if (opp.megaEvolve && !opp.isMega) {
      this.triggerMegaEvolution(opp, false);
    } else if (opp.canGmax && !opp.isDynamaxed) {
      this.triggerDynamax(opp, false);
    }
  }

  triggerMegaEvolution(pokemon, isPlayer = true) {
    const species = POKEMON_SPECIES[pokemon.speciesKey];
    if (!species || !species.megaForm || pokemon.isMega) return false;

    pokemon.isMega = true;
    pokemon.name = species.megaForm.name;
    if (species.megaForm.types) {
      pokemon.types = [...species.megaForm.types];
    }
    // Boost base stats
    const oldMax = pokemon.stats.maxHp;
    pokemon.stats = calculateStats(species.megaForm.baseStats, pokemon.level);
    pokemon.stats.maxHp = oldMax; // HP remains constant during Mega

    Sound.playMegaEvolution();
    const targetEl = document.getElementById(isPlayer ? 'player-sprite' : 'opp-sprite');
    AnimeVfx.playMegaEvolutionCutscene(targetEl);
    this.log(`${isPlayer ? 'Your ' : "Foe's "}${species.name} reacted to the Mega Bracelet! Mega Evolution!`);
    return true;
  }

  triggerDynamax(pokemon, isPlayer = true) {
    if (pokemon.isDynamaxed) return false;

    pokemon.isDynamaxed = true;
    pokemon.dynamaxTurns = 3;
    const species = POKEMON_SPECIES[pokemon.speciesKey];
    if (species && species.gmaxForm) {
      pokemon.isGmax = true;
      pokemon.name = species.gmaxForm.name;
    } else {
      pokemon.name = `Dynamax ${pokemon.name}`;
    }

    // Double HP during Dynamax
    const hpRatio = pokemon.currentHp / pokemon.stats.maxHp;
    pokemon.stats.maxHp *= 2;
    pokemon.currentHp = Math.round(pokemon.stats.maxHp * hpRatio);

    Sound.playDynamax();
    const targetEl = document.getElementById(isPlayer ? 'player-sprite' : 'opp-sprite');
    AnimeVfx.playDynamaxCutscene(targetEl);
    this.log(`${isPlayer ? 'Your ' : "Foe's "}${pokemon.name} is enveloped in dark crimson storm clouds! Dynamax!`);
    return true;
  }

  getActualMove(pokemon, moveKey, isZMove, isDynamax) {
    const baseMove = MOVES[moveKey] || MOVES.Tackle;
    if (isZMove && !pokemon.hasZMoveUsed) {
      if (pokemon.speciesKey === 'pikachu') {
        return Z_MOVES.SpecialPikachu;
      }
      return Z_MOVES[baseMove.type] || Z_MOVES.Normal;
    }
    if (isDynamax || pokemon.isDynamaxed) {
      const species = POKEMON_SPECIES[pokemon.speciesKey];
      if (pokemon.isGmax && species && species.gmaxForm && species.gmaxForm.signatureMove) {
        return GMAX_MOVES[pokemon.speciesKey.charAt(0).toUpperCase() + pokemon.speciesKey.slice(1)] || MAX_MOVES[baseMove.type] || MAX_MOVES.Normal;
      }
      return MAX_MOVES[baseMove.type] || MAX_MOVES.Normal;
    }
    return baseMove;
  }

  calculateDamage(attacker, defender, move) {
    if (move.category === 'Status' || move.power === 0) return 0;

    const isSpecial = move.category === 'Special';
    const attackStat = isSpecial ? attacker.stats.spAtk : attacker.stats.atk;
    const defenseStat = isSpecial ? defender.stats.spDef : defender.stats.def;

    // Level factor
    const levelFactor = (2 * attacker.level) / 5 + 2;
    let baseDmg = ((levelFactor * move.power * (attackStat / defenseStat)) / 50) + 2;

    // STAB (Same Type Attack Bonus)
    if (attacker.types.includes(move.type)) {
      baseDmg *= 1.5;
    }

    // Type effectiveness
    const effectiveness = getEffectiveness(move.type, defender.types);
    baseDmg *= effectiveness;

    // Critical hit check
    const isCrit = move.alwaysCrit || Math.random() < ((move.critRate || 1) * 0.0625);
    if (isCrit) {
      baseDmg *= 1.5;
    }

    // Random roll (0.85 to 1.0)
    const randomFactor = 0.85 + Math.random() * 0.15;
    baseDmg = Math.max(1, Math.floor(baseDmg * randomFactor));

    return {
      damage: baseDmg,
      effectiveness: effectiveness,
      isCrit: isCrit
    };
  }

  async executeMove(attacker, defender, move, isPlayer) {
    const moveName = move.name;
    this.log(`${isPlayer ? attacker.name : 'Foe ' + attacker.name} used ${moveName}!`);

    // Anime Realistic Attack Animation & Effects
    const attackerEl = document.getElementById(isPlayer ? 'player-sprite' : 'opp-sprite');
    const defenderEl = document.getElementById(isPlayer ? 'opp-sprite' : 'player-sprite');
    await AnimeVfx.playMoveVfx(move, attackerEl, defenderEl, isPlayer);

    if (move.power > 0) {
      const result = this.calculateDamage(attacker, defender, move);
      defender.currentHp = Math.max(0, defender.currentHp - result.damage);

      Sound.playHit(result.effectiveness > 1);

      if (result.isCrit) {
        this.log('A critical hit!');
      }
      if (result.effectiveness > 1) {
        this.log("It's super effective!");
      } else if (result.effectiveness > 0 && result.effectiveness < 1) {
        this.log("It's not very effective...");
      } else if (result.effectiveness === 0) {
        this.log(`It doesn't affect ${defender.name}...`);
      }

      // Check self debuffs / recoil / stat buffs
      if (move.recoil) {
        const recoilDmg = Math.max(1, Math.floor(result.damage * move.recoil));
        attacker.currentHp = Math.max(0, attacker.currentHp - recoilDmg);
        this.log(`${attacker.name} is hit with recoil!`);
      }

      if (move.drain) {
        const healAmt = Math.floor(result.damage * move.drain);
        attacker.currentHp = Math.min(attacker.stats.maxHp, attacker.currentHp + healAmt);
        this.log(`${attacker.name} drained energy and regained HP!`);
      }
    } else if (move.heal) {
      const healAmt = Math.floor(attacker.stats.maxHp * move.heal);
      attacker.currentHp = Math.min(attacker.stats.maxHp, attacker.currentHp + healAmt);
      this.log(`${attacker.name} recovered health!`);
    } else if (move.statBuff) {
      this.log(`${attacker.name}'s stats rose!`);
    }

    if (defender.currentHp <= 0) {
      Sound.playFaint();
      this.log(`${defender.name} fainted!`);
    }
    this.refreshUi();
  }

  async handlePlayerTurn(playerMoveKey) {
    if (this.isBusy) return;
    this.isBusy = true;

    const playerPkmn = this.getPlayerPokemon();
    const oppPkmn = this.getOpponentPokemon();

    // Check Mega evolution trigger
    if (this.selectedMega && !playerPkmn.isMega) {
      this.triggerMegaEvolution(playerPkmn, true);
      this.selectedMega = false;
    }

    // Check Dynamax trigger
    if (this.selectedDynamax && !playerPkmn.isDynamaxed) {
      this.triggerDynamax(playerPkmn, true);
      this.selectedDynamax = false;
    }

    // Determine actual move (Standard, Z-Move, Max Move)
    const playerMove = this.getActualMove(playerPkmn, playerMoveKey, this.selectedZMove, playerPkmn.isDynamaxed);
    if (this.selectedZMove) {
      Sound.playZMove();
      playerPkmn.hasZMoveUsed = true;
      this.selectedZMove = false;
    }

    // Opponent random move
    const oppMoveKey = oppPkmn.moves[Math.floor(Math.random() * oppPkmn.moves.length)];
    const oppMove = this.getActualMove(oppPkmn, oppMoveKey, false, oppPkmn.isDynamaxed);

    // Speed comparison (with move priority)
    const playerPriority = playerMove.priority || 0;
    const oppPriority = oppMove.priority || 0;

    let playerFirst = true;
    if (playerPriority === oppPriority) {
      playerFirst = playerPkmn.stats.spd >= oppPkmn.stats.spd;
    } else {
      playerFirst = playerPriority > oppPriority;
    }

    // First attacker
    const first = playerFirst
      ? { atk: playerPkmn, def: oppPkmn, move: playerMove, isPlayer: true }
      : { atk: oppPkmn, def: playerPkmn, move: oppMove, isPlayer: false };

    const second = playerFirst
      ? { atk: oppPkmn, def: playerPkmn, move: oppMove, isPlayer: false }
      : { atk: playerPkmn, def: oppPkmn, move: playerMove, isPlayer: true };

    await this.executeMove(first.atk, first.def, first.move, first.isPlayer);

    // Check if second can still attack
    if (first.def.currentHp > 0) {
      await this.executeMove(second.atk, second.def, second.move, second.isPlayer);
    }

    // Turn end: decrement dynamax turns
    if (playerPkmn.isDynamaxed) {
      playerPkmn.dynamaxTurns--;
      if (playerPkmn.dynamaxTurns <= 0) {
        playerPkmn.isDynamaxed = false;
        playerPkmn.stats.maxHp = Math.round(playerPkmn.stats.maxHp / 2);
        playerPkmn.currentHp = Math.min(playerPkmn.stats.maxHp, Math.round(playerPkmn.currentHp / 2));
        this.log(`${playerPkmn.name}'s Dynamax ended!`);
      }
    }
    if (oppPkmn.isDynamaxed) {
      oppPkmn.dynamaxTurns--;
      if (oppPkmn.dynamaxTurns <= 0) {
        oppPkmn.isDynamaxed = false;
        oppPkmn.stats.maxHp = Math.round(oppPkmn.stats.maxHp / 2);
        oppPkmn.currentHp = Math.min(oppPkmn.stats.maxHp, Math.round(oppPkmn.currentHp / 2));
        this.log(`Foe ${oppPkmn.name}'s Dynamax ended!`);
      }
    }

    // Check win / lose / next pokemon
    await this.checkBattleStatus();
    this.isBusy = false;
    this.refreshUi();
  }

  async checkBattleStatus() {
    const oppPkmn = this.getOpponentPokemon();
    const playerPkmn = this.getPlayerPokemon();

    // Check if opponent fainted
    if (oppPkmn.currentHp <= 0) {
      // Award exp to all player party (Modern Shared Exp)
      const expYield = Math.floor((oppPkmn.level * 60) / 7);
      this.distributeExp(expYield);

      // Check next opponent
      const nextOppIndex = this.opponentTeam.findIndex(p => p.currentHp > 0);
      if (nextOppIndex !== -1) {
        this.opponentActiveIndex = nextOppIndex;
        const newOpp = this.getOpponentPokemon();
        this.log(`${this.trainerName} sent out ${newOpp.name}!`);
        this.checkOpponentGimmickTrigger();
        this.refreshUi();
        return;
      } else {
        // VICTORY!
        this.log(`You defeated ${this.trainerName}!`);
        Sound.playTone(523, 'triangle', 0.2, 0.3);
        setTimeout(() => Sound.playTone(659, 'triangle', 0.2, 0.3), 150);
        setTimeout(() => Sound.playTone(784, 'triangle', 0.3, 0.4), 300);
        if (this.onBattleEnd) {
          this.onBattleEnd({ outcome: 'win', battle: this });
        }
        return;
      }
    }

    // Check if player fainted
    if (playerPkmn.currentHp <= 0) {
      const nextPlayerIndex = this.playerTeam.findIndex(p => p.currentHp > 0);
      if (nextPlayerIndex !== -1) {
        this.playerActiveIndex = nextPlayerIndex;
        const newPkmn = this.getPlayerPokemon();
        this.log(`Go! ${newPkmn.name}!`);
        this.refreshUi();
        return;
      } else {
        // DEFEAT
        this.log('You are out of usable Pokémon! You blacked out...');
        if (this.onBattleEnd) {
          this.onBattleEnd({ outcome: 'loss', battle: this });
        }
        return;
      }
    }
  }

  distributeExp(expTotal) {
    const active = this.getPlayerPokemon();
    this.addExpToPokemon(active, expTotal, true);
    this.recordExp(active, expTotal);

    // Shared Exp for other party members (50% yield)
    this.playerTeam.forEach((pkmn, idx) => {
      if (idx !== this.playerActiveIndex && pkmn.currentHp > 0) {
        const sharedExp = Math.floor(expTotal * 0.5);
        this.addExpToPokemon(pkmn, sharedExp, false);
        this.recordExp(pkmn, sharedExp);
        this.log(`${pkmn.name} gained ${sharedExp} EXP!`);
      }
    });
  }

  recordExp(pokemon, amount) {
    this.expGains.set(pokemon, (this.expGains.get(pokemon) || 0) + amount);
  }

  getExpSummaryLines() {
    if (!this.expGains.size) return [];
    return [
      'EXP GAINED',
      ...[...this.expGains.entries()].map(([pokemon, amount]) => `${pokemon.name} gained ${amount} EXP!`)
    ];
  }

  addExpToPokemon(pokemon, expGain, isActive) {
    pokemon.exp += expGain;
    if (isActive) {
      this.log(`${pokemon.name} gained ${expGain} EXP!`);
    }

    // Level up check
    while (pokemon.exp >= pokemon.nextExp && pokemon.level < 100) {
      pokemon.level++;
      pokemon.nextExp = Math.pow(pokemon.level + 1, 3);
      const oldMax = pokemon.stats.maxHp;
      const species = POKEMON_SPECIES[pokemon.speciesKey];
      pokemon.stats = calculateStats(species.baseStats, pokemon.level);
      pokemon.currentHp += (pokemon.stats.maxHp - oldMax);

      Sound.playLevelUp();
      this.log(`${pokemon.name} grew to Level ${pokemon.level}!`);

      // Check evolution
      if (species.evolution && pokemon.level >= species.evolution.level) {
        this.triggerEvolution(pokemon, species.evolution.to);
      }
    }
  }

  triggerEvolution(pokemon, toSpeciesKey) {
    const targetSpecies = POKEMON_SPECIES[toSpeciesKey];
    if (!targetSpecies) return;

    this.log(`What? ${pokemon.name} is evolving!`);
    this.playEvolutionAnimation(pokemon, targetSpecies);
    pokemon.speciesKey = toSpeciesKey;
    pokemon.name = targetSpecies.name;
    pokemon.dexNumber = targetSpecies.dexNumber;
    pokemon.types = [...targetSpecies.types];
    pokemon.stats = calculateStats(targetSpecies.baseStats, pokemon.level);
    pokemon.currentHp = pokemon.stats.maxHp;

    Sound.playCatchSuccess();
    this.log(`Congratulations! Your Pokémon evolved into ${targetSpecies.name}!`);
  }

  playEvolutionAnimation(pokemon, targetSpecies) {
    const overlay = document.getElementById('evolution-overlay');
    const oldSprite = document.getElementById('evolution-old-sprite');
    const newSprite = document.getElementById('evolution-new-sprite');
    const text = document.getElementById('evolution-text');
    if (!overlay || !oldSprite || !newSprite) return;
    oldSprite.src = Sprites.getPokemonSpriteUrl(pokemon, true);
    newSprite.src = Sprites.getPokemonSpriteUrl({ speciesKey: targetSpecies.key || Object.keys(POKEMON_SPECIES).find(key => POKEMON_SPECIES[key] === targetSpecies) }, true);
    // Species objects do not retain their key; use dex number for a dependable sprite URL fallback.
    newSprite.onerror = () => { newSprite.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${targetSpecies.dexNumber}.png`; };
    if (text) text.textContent = `What? ${pokemon.name} is evolving!`;
    overlay.classList.remove('hidden');
    overlay.classList.remove('evolving');
    void overlay.offsetWidth;
    overlay.classList.add('evolving');
    setTimeout(() => {
      if (text) text.textContent = `Congratulations! ${targetSpecies.name} evolved!`;
    }, 1500);
    setTimeout(() => { overlay.classList.add('hidden'); overlay.classList.remove('evolving'); }, 2900);
  }

  async throwPokeball(ballType = 'pokeball') {
    if (this.isTrainer) {
      this.log("The trainer blocked the Pokéball! You can't catch another trainer's Pokémon!");
      return false;
    }
    if (this.isBusy) return false;
    this.isBusy = true;

    const oppPkmn = this.getOpponentPokemon();
    Sound.playPokeballThrow();
    this.log(`You threw a ${ballType.toUpperCase()}!`);

    let ballMultiplier = 1;
    if (ballType === 'greatball') ballMultiplier = 1.5;
    if (ballType === 'ultraball') ballMultiplier = 2.0;
    if (ballType === 'masterball') ballMultiplier = 255;

    // Standard Pokémon catch rate calculation
    const hpFactor = (3 * oppPkmn.stats.maxHp - 2 * oppPkmn.currentHp) / (3 * oppPkmn.stats.maxHp);
    const catchRate = oppPkmn.isLegendary ? 45 : 120;
    const finalCatchChance = Math.min(1.0, (catchRate * ballMultiplier * hpFactor) / 255);

    const caught = ballType === 'masterball' || Math.random() < finalCatchChance;
    await this.playBallThrow(ballType, caught);

    if (caught) {
      Sound.playCatchSuccess();
      this.log(`Gotcha! ${oppPkmn.name} was caught!`);
      // Add to player team or box
      if (this.playerTeam.length < 6) {
        this.playerTeam.push(oppPkmn);
        this.log(`${oppPkmn.name} was added to your party!`);
      } else {
        this.playerBox.push(oppPkmn);
        this.log(`Party is full! ${oppPkmn.name} was transferred to PC Box!`);
      }
      this.isBusy = false;
      if (this.onBattleEnd) {
        this.onBattleEnd({ outcome: 'caught', battle: this, caughtPokemon: oppPkmn });
      }
      return true;
    } else {
      this.log(`Oh no! ${oppPkmn.name} broke free!`);
      this.isBusy = false;
      // Opponent gets a free attack on failed catch
      const oppMoveKey = oppPkmn.moves[Math.floor(Math.random() * oppPkmn.moves.length)];
      const oppMove = this.getActualMove(oppPkmn, oppMoveKey, false, oppPkmn.isDynamaxed);
      await this.executeMove(oppPkmn, this.getPlayerPokemon(), oppMove, false);
      await this.checkBattleStatus();
      return false;
    }
  }

  runAway() {
    if (this.isTrainer) {
      this.log("No! There's no running from a Trainer battle!");
      return false;
    }
    this.log('Got away safely!');
    if (this.onBattleEnd) {
      this.onBattleEnd({ outcome: 'fled', battle: this });
    }
    return true;
  }

  async switchPlayerPokemon(index) {
    if (this.isBusy || index === this.playerActiveIndex) return false;
    const next = this.playerTeam[index];
    if (!next || next.currentHp <= 0) return false;
    this.isBusy = true;
    const outgoing = this.getPlayerPokemon();
    this.log(`${outgoing.name}, come back! Go, ${next.name}!`);
    this.playerActiveIndex = index;
    this.refreshUi();
    await new Promise(resolve => setTimeout(resolve, 500));
    const opponent = this.getOpponentPokemon();
    const moveKey = opponent.moves[Math.floor(Math.random() * opponent.moves.length)];
    await this.executeMove(opponent, next, this.getActualMove(opponent, moveKey, false, opponent.isDynamaxed), false);
    await this.checkBattleStatus();
    this.isBusy = false;
    this.refreshUi();
    return true;
  }

  async playBallThrow(ballType, caught) {
    const ball = document.createElement('div');
    ball.className = `throw-ball ${ballType}`;
    const stage = document.getElementById('battle-screen');
    const target = document.getElementById('opp-sprite');
    stage?.appendChild(ball);
    target?.classList.add('capture-into-ball');
    await new Promise(resolve => setTimeout(resolve, 900));

    // The ball visibly shakes for each catch check, instead of only logging it.
    for (let wobble = 0; wobble < 3; wobble++) {
      ball.classList.remove('ball-wobble');
      void ball.offsetWidth;
      ball.classList.add('ball-wobble');
      Sound.playPokeballShake();
      this.log('...');
      await new Promise(resolve => setTimeout(resolve, 550));
    }

    if (caught) {
      ball.classList.add('ball-caught');
      await new Promise(resolve => setTimeout(resolve, 430));
    } else {
      ball.classList.add('ball-breakout');
      target?.classList.remove('capture-into-ball');
      target?.classList.add('capture-breakout');
      await new Promise(resolve => setTimeout(resolve, 430));
      target?.classList.remove('capture-breakout');
    }
    ball.remove();
  }
}
