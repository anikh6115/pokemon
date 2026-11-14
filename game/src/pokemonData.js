// Comprehensive Pokémon Database for Pokémon Emerald Journeys
// Spanning Gens 1 through 9, Mega Evolutions, Gigantamax Forms, and Legendaries

export const STARTER_OPTIONS = [
  // Gen 1 - Kanto
  { id: 'bulbasaur', name: 'Bulbasaur', gen: 1, region: 'Kanto', type: ['Grass', 'Poison'] },
  { id: 'charmander', name: 'Charmander', gen: 1, region: 'Kanto', type: ['Fire'] },
  { id: 'squirtle', name: 'Squirtle', gen: 1, region: 'Kanto', type: ['Water'] },
  { id: 'pikachu', name: 'Pikachu', gen: 1, region: 'Kanto', type: ['Electric'] },
  { id: 'eevee', name: 'Eevee', gen: 1, region: 'Kanto', type: ['Normal'] },
  // Gen 2 - Johto
  { id: 'chikorita', name: 'Chikorita', gen: 2, region: 'Johto', type: ['Grass'] },
  { id: 'cyndaquil', name: 'Cyndaquil', gen: 2, region: 'Johto', type: ['Fire'] },
  { id: 'totodile', name: 'Totodile', gen: 2, region: 'Johto', type: ['Water'] },
  // Gen 3 - Hoenn
  { id: 'treecko', name: 'Treecko', gen: 3, region: 'Hoenn', type: ['Grass'] },
  { id: 'torchic', name: 'Torchic', gen: 3, region: 'Hoenn', type: ['Fire'] },
  { id: 'mudkip', name: 'Mudkip', gen: 3, region: 'Hoenn', type: ['Water'] },
  // Gen 4 - Sinnoh
  { id: 'turtwig', name: 'Turtwig', gen: 4, region: 'Sinnoh', type: ['Grass'] },
  { id: 'chimchar', name: 'Chimchar', gen: 4, region: 'Sinnoh', type: ['Fire'] },
  { id: 'piplup', name: 'Piplup', gen: 4, region: 'Sinnoh', type: ['Water'] },
  // Gen 5 - Unova
  { id: 'snivy', name: 'Snivy', gen: 5, region: 'Unova', type: ['Grass'] },
  { id: 'tepig', name: 'Tepig', gen: 5, region: 'Unova', type: ['Fire'] },
  { id: 'oshawott', name: 'Oshawott', gen: 5, region: 'Unova', type: ['Water'] },
  // Gen 6 - Kalos
  { id: 'chespin', name: 'Chespin', gen: 6, region: 'Kalos', type: ['Grass'] },
  { id: 'fennekin', name: 'Fennekin', gen: 6, region: 'Kalos', type: ['Fire'] },
  { id: 'froakie', name: 'Froakie', gen: 6, region: 'Kalos', type: ['Water'] },
  // Gen 7 - Alola
  { id: 'rowlet', name: 'Rowlet', gen: 7, region: 'Alola', type: ['Grass', 'Flying'] },
  { id: 'litten', name: 'Litten', gen: 7, region: 'Alola', type: ['Fire'] },
  { id: 'popplio', name: 'Popplio', gen: 7, region: 'Alola', type: ['Water'] },
  // Gen 8 - Galar
  { id: 'grookey', name: 'Grookey', gen: 8, region: 'Galar', type: ['Grass'] },
  { id: 'scorbunny', name: 'Scorbunny', gen: 8, region: 'Galar', type: ['Fire'] },
  { id: 'sobble', name: 'Sobble', gen: 8, region: 'Galar', type: ['Water'] },
  // Gen 9 - Paldea
  { id: 'sprigatito', name: 'Sprigatito', gen: 9, region: 'Paldea', type: ['Grass'] },
  { id: 'fuecoco', name: 'Fuecoco', gen: 9, region: 'Paldea', type: ['Fire'] },
  { id: 'quaxly', name: 'Quaxly', gen: 9, region: 'Paldea', type: ['Water'] }
];

export const POKEMON_SPECIES = {
  // === GEN 1 STARTERS & ACES ===
  bulbasaur: {
    name: 'Bulbasaur', dexNumber: 1, types: ['Grass', 'Poison'],
    baseStats: { hp: 45, atk: 49, def: 49, spAtk: 65, spDef: 65, spd: 45 },
    moves: ['Tackle', 'VineWhip'],
    learnset: [
      { level: 7, move: 'VineWhip' },
      { level: 13, move: 'PoisonSting' },
      { level: 20, move: 'RazorLeaf' },
      { level: 32, move: 'GigaDrain' },
      { level: 44, move: 'EnergyBall' }
    ],
    evolution: { level: 16, to: 'ivysaur' }
  },
  ivysaur: {
    name: 'Ivysaur', dexNumber: 2, types: ['Grass', 'Poison'],
    baseStats: { hp: 60, atk: 62, def: 63, spAtk: 80, spDef: 80, spd: 60 },
    moves: ['Tackle', 'VineWhip', 'RazorLeaf'],
    evolution: { level: 32, to: 'venusaur' }
  },
  venusaur: {
    name: 'Venusaur', dexNumber: 3, types: ['Grass', 'Poison'],
    baseStats: { hp: 80, atk: 82, def: 83, spAtk: 100, spDef: 100, spd: 80 },
    moves: ['EnergyBall', 'SludgeBomb', 'GigaDrain', 'Earthquake'],
    megaForm: {
      name: 'Mega Venusaur', types: ['Grass', 'Poison'],
      baseStats: { hp: 80, atk: 100, def: 123, spAtk: 122, spDef: 120, spd: 80 },
      spriteSuffix: '-mega'
    },
    gmaxForm: { name: 'G-Max Venusaur', moves: ['Max Overgrowth', 'Max Ooze'] }
  },

  charmander: {
    name: 'Charmander', dexNumber: 4, types: ['Fire'],
    baseStats: { hp: 39, atk: 52, def: 43, spAtk: 60, spDef: 50, spd: 65 },
    moves: ['Scratch', 'Ember'],
    learnset: [
      { level: 8, move: 'Ember' },
      { level: 15, move: 'FlameWheel' },
      { level: 24, move: 'Slash' },
      { level: 36, move: 'Flamethrower' },
      { level: 48, move: 'FireBlast' }
    ],
    evolution: { level: 16, to: 'charmeleon' }
  },
  charmeleon: {
    name: 'Charmeleon', dexNumber: 5, types: ['Fire'],
    baseStats: { hp: 58, atk: 64, def: 58, spAtk: 80, spDef: 65, spd: 80 },
    moves: ['Scratch', 'Ember', 'FlameWheel'],
    evolution: { level: 36, to: 'charizard' }
  },
  charizard: {
    name: 'Charizard', dexNumber: 6, types: ['Fire', 'Flying'],
    baseStats: { hp: 78, atk: 84, def: 78, spAtk: 109, spDef: 85, spd: 100 },
    moves: ['Flamethrower', 'AirSlash', 'DragonClaw', 'FireBlast'],
    megaForm: {
      name: 'Mega Charizard X', types: ['Fire', 'Dragon'],
      baseStats: { hp: 78, atk: 130, def: 111, spAtk: 130, spDef: 85, spd: 100 },
      spriteSuffix: '-megax'
    },
    gmaxForm: { name: 'G-Max Charizard', signatureMove: 'G-Max Wildfire' }
  },

  squirtle: {
    name: 'Squirtle', dexNumber: 7, types: ['Water'],
    baseStats: { hp: 44, atk: 48, def: 65, spAtk: 50, spDef: 64, spd: 43 },
    moves: ['Tackle', 'WaterGun'],
    learnset: [
      { level: 8, move: 'WaterGun' },
      { level: 15, move: 'WaterPulse' },
      { level: 24, move: 'Bite' },
      { level: 36, move: 'Surf' },
      { level: 48, move: 'HydroPump' }
    ],
    evolution: { level: 16, to: 'wartortle' }
  },
  wartortle: {
    name: 'Wartortle', dexNumber: 8, types: ['Water'],
    baseStats: { hp: 59, atk: 63, def: 80, spAtk: 65, spDef: 80, spd: 58 },
    moves: ['Tackle', 'WaterGun', 'WaterPulse'],
    evolution: { level: 36, to: 'blastoise' }
  },
  blastoise: {
    name: 'Blastoise', dexNumber: 9, types: ['Water'],
    baseStats: { hp: 79, atk: 83, def: 100, spAtk: 85, spDef: 105, spd: 78 },
    moves: ['HydroPump', 'Surf', 'IceBeam', 'FlashCannon'],
    megaForm: {
      name: 'Mega Blastoise', types: ['Water'],
      baseStats: { hp: 79, atk: 103, def: 120, spAtk: 135, spDef: 115, spd: 78 },
      spriteSuffix: '-mega'
    },
    gmaxForm: { name: 'G-Max Blastoise', signatureMove: 'Max Geyser' }
  },

  pikachu: {
    name: 'Pikachu', dexNumber: 25, types: ['Electric'],
    baseStats: { hp: 60, atk: 85, def: 55, spAtk: 80, spDef: 60, spd: 110 },
    moves: ['QuickAttack', 'ThunderShock', 'Spark', 'IronHead'],
    learnset: [
      { level: 5, move: 'ThunderShock' },
      { level: 12, move: 'QuickAttack' },
      { level: 18, move: 'Spark' },
      { level: 28, move: 'Thunderbolt' },
      { level: 42, move: 'VoltTackle' }
    ],
    gmaxForm: { name: 'G-Max Pikachu', signatureMove: 'G-Max Volt Crash' }
  },

  eevee: {
    name: 'Eevee', dexNumber: 133, types: ['Normal'],
    baseStats: { hp: 65, atk: 75, def: 65, spAtk: 65, spDef: 75, spd: 75 },
    moves: ['Tackle', 'QuickAttack', 'Bite', 'Slash'],
    gmaxForm: { name: 'G-Max Eevee', signatureMove: 'Max Strike' }
  },

  // === GEN 2 STARTERS ===
  chikorita: {
    name: 'Chikorita', dexNumber: 152, types: ['Grass'],
    baseStats: { hp: 45, atk: 49, def: 65, spAtk: 49, spDef: 65, spd: 45 },
    moves: ['Tackle', 'RazorLeaf'],
    evolution: { level: 16, to: 'bayleef' }
  },
  bayleef: {
    name: 'Bayleef', dexNumber: 153, types: ['Grass'],
    baseStats: { hp: 60, atk: 62, def: 80, spAtk: 63, spDef: 80, spd: 60 },
    moves: ['Tackle', 'RazorLeaf', 'GigaDrain'],
    evolution: { level: 32, to: 'meganium' }
  },
  meganium: {
    name: 'Meganium', dexNumber: 154, types: ['Grass'],
    baseStats: { hp: 80, atk: 82, def: 100, spAtk: 83, spDef: 100, spd: 80 },
    moves: ['EnergyBall', 'GigaDrain', 'Earthquake', 'BodySlam']
  },

  cyndaquil: {
    name: 'Cyndaquil', dexNumber: 155, types: ['Fire'],
    baseStats: { hp: 39, atk: 52, def: 43, spAtk: 60, spDef: 50, spd: 65 },
    moves: ['Tackle', 'Ember'],
    evolution: { level: 14, to: 'quilava' }
  },
  quilava: {
    name: 'Quilava', dexNumber: 156, types: ['Fire'],
    baseStats: { hp: 58, atk: 64, def: 58, spAtk: 80, spDef: 65, spd: 80 },
    moves: ['QuickAttack', 'FlameWheel', 'Swift'],
    evolution: { level: 36, to: 'typhlosion' }
  },
  typhlosion: {
    name: 'Typhlosion', dexNumber: 157, types: ['Fire'],
    baseStats: { hp: 78, atk: 84, def: 78, spAtk: 109, spDef: 85, spd: 100 },
    moves: ['Flamethrower', 'FireBlast', 'Earthquake', 'Thunderbolt']
  },

  totodile: {
    name: 'Totodile', dexNumber: 158, types: ['Water'],
    baseStats: { hp: 50, atk: 65, def: 64, spAtk: 44, spDef: 48, spd: 43 },
    moves: ['Scratch', 'WaterGun'],
    evolution: { level: 18, to: 'croconaw' }
  },
  croconaw: {
    name: 'Croconaw', dexNumber: 159, types: ['Water'],
    baseStats: { hp: 65, atk: 80, def: 80, spAtk: 59, spDef: 63, spd: 58 },
    moves: ['Bite', 'WaterGun', 'Slash'],
    evolution: { level: 30, to: 'feraligatr' }
  },
  feraligatr: {
    name: 'Feraligatr', dexNumber: 160, types: ['Water'],
    baseStats: { hp: 85, atk: 105, def: 100, spAtk: 79, spDef: 83, spd: 78 },
    moves: ['Waterfall', 'Crunch', 'IceBeam', 'Earthquake']
  },

  // === GEN 3 STARTERS ===
  treecko: {
    name: 'Treecko', dexNumber: 252, types: ['Grass'],
    baseStats: { hp: 40, atk: 45, def: 35, spAtk: 65, spDef: 55, spd: 70 },
    moves: ['Pound', 'QuickAttack', 'MegaDrain'],
    evolution: { level: 16, to: 'grovyle' }
  },
  grovyle: {
    name: 'Grovyle', dexNumber: 253, types: ['Grass'],
    baseStats: { hp: 50, atk: 65, def: 45, spAtk: 85, spDef: 65, spd: 95 },
    moves: ['QuickAttack', 'LeafBlade', 'Slash'],
    evolution: { level: 36, to: 'sceptile' }
  },
  sceptile: {
    name: 'Sceptile', dexNumber: 254, types: ['Grass'],
    baseStats: { hp: 70, atk: 85, def: 65, spAtk: 105, spDef: 85, spd: 120 },
    moves: ['LeafBlade', 'DragonClaw', 'EnergyBall', 'XScissor'],
    megaForm: {
      name: 'Mega Sceptile', types: ['Grass', 'Dragon'],
      baseStats: { hp: 70, atk: 110, def: 75, spAtk: 145, spDef: 85, spd: 145 }
    }
  },

  torchic: {
    name: 'Torchic', dexNumber: 255, types: ['Fire'],
    baseStats: { hp: 45, atk: 60, def: 40, spAtk: 70, spDef: 50, spd: 45 },
    moves: ['Scratch', 'Ember'],
    evolution: { level: 16, to: 'combusken' }
  },
  combusken: {
    name: 'Combusken', dexNumber: 256, types: ['Fire', 'Fighting'],
    baseStats: { hp: 60, atk: 85, def: 60, spAtk: 85, spDef: 60, spd: 55 },
    moves: ['MachPunch', 'FlameWheel', 'DoubleKick'],
    evolution: { level: 36, to: 'blaziken' }
  },
  blaziken: {
    name: 'Blaziken', dexNumber: 257, types: ['Fire', 'Fighting'],
    baseStats: { hp: 80, atk: 120, def: 70, spAtk: 110, spDef: 70, spd: 80 },
    moves: ['FlareBlitz', 'CloseCombat', 'BraveBird', 'StoneEdge'],
    megaForm: {
      name: 'Mega Blaziken', types: ['Fire', 'Fighting'],
      baseStats: { hp: 80, atk: 160, def: 80, spAtk: 130, spDef: 80, spd: 100 }
    }
  },

  mudkip: {
    name: 'Mudkip', dexNumber: 258, types: ['Water'],
    baseStats: { hp: 50, atk: 70, def: 50, spAtk: 50, spDef: 50, spd: 40 },
    moves: ['Tackle', 'WaterGun', 'MudSlap'],
    evolution: { level: 16, to: 'marshtomp' }
  },
  marshtomp: {
    name: 'Marshtomp', dexNumber: 259, types: ['Water', 'Ground'],
    baseStats: { hp: 70, atk: 85, def: 70, spAtk: 60, spDef: 70, spd: 50 },
    moves: ['MudSlap', 'WaterGun', 'RockThrow'],
    evolution: { level: 36, to: 'swampert' }
  },
  swampert: {
    name: 'Swampert', dexNumber: 260, types: ['Water', 'Ground'],
    baseStats: { hp: 100, atk: 110, def: 90, spAtk: 85, spDef: 90, spd: 60 },
    moves: ['Waterfall', 'Earthquake', 'IceBeam', 'StoneEdge'],
    megaForm: {
      name: 'Mega Swampert', types: ['Water', 'Ground'],
      baseStats: { hp: 100, atk: 150, def: 110, spAtk: 95, spDef: 110, spd: 70 }
    }
  },

  // === GEN 4 STARTERS ===
  turtwig: {
    name: 'Turtwig', dexNumber: 387, types: ['Grass'],
    baseStats: { hp: 55, atk: 68, def: 64, spAtk: 45, spDef: 55, spd: 31 },
    moves: ['Tackle', 'RazorLeaf'],
    evolution: { level: 18, to: 'grotle' }
  },
  grotle: {
    name: 'Grotle', dexNumber: 388, types: ['Grass'],
    baseStats: { hp: 75, atk: 89, def: 85, spAtk: 55, spDef: 65, spd: 36 },
    moves: ['RazorLeaf', 'Bite', 'MegaDrain'],
    evolution: { level: 32, to: 'torterra' }
  },
  torterra: {
    name: 'Torterra', dexNumber: 389, types: ['Grass', 'Ground'],
    baseStats: { hp: 95, atk: 109, def: 105, spAtk: 75, spDef: 85, spd: 56 },
    moves: ['Earthquake', 'LeafBlade', 'StoneEdge', 'Crunch']
  },

  chimchar: {
    name: 'Chimchar', dexNumber: 390, types: ['Fire'],
    baseStats: { hp: 44, atk: 58, def: 44, spAtk: 58, spDef: 44, spd: 61 },
    moves: ['Scratch', 'Ember'],
    evolution: { level: 14, to: 'monferno' }
  },
  monferno: {
    name: 'Monferno', dexNumber: 391, types: ['Fire', 'Fighting'],
    baseStats: { hp: 64, atk: 78, def: 52, spAtk: 78, spDef: 52, spd: 81 },
    moves: ['MachPunch', 'FlameWheel', 'FurySwipes'],
    evolution: { level: 36, to: 'infernape' }
  },
  infernape: {
    name: 'Infernape', dexNumber: 392, types: ['Fire', 'Fighting'],
    baseStats: { hp: 76, atk: 104, def: 71, spAtk: 104, spDef: 71, spd: 108 },
    moves: ['FlareBlitz', 'CloseCombat', 'Thunderbolt', 'Acrobatics']
  },

  piplup: {
    name: 'Piplup', dexNumber: 393, types: ['Water'],
    baseStats: { hp: 53, atk: 51, def: 53, spAtk: 61, spDef: 56, spd: 40 },
    moves: ['Pound', 'WaterGun'],
    evolution: { level: 16, to: 'prinplup' }
  },
  prinplup: {
    name: 'Prinplup', dexNumber: 394, types: ['Water'],
    baseStats: { hp: 64, atk: 66, def: 68, spAtk: 81, spDef: 76, spd: 50 },
    moves: ['BubbleBeam', 'MetalClaw', 'FuryAttack'],
    evolution: { level: 36, to: 'empoleon' }
  },
  empoleon: {
    name: 'Empoleon', dexNumber: 395, types: ['Water', 'Steel'],
    baseStats: { hp: 84, atk: 86, def: 88, spAtk: 111, spDef: 101, spd: 60 },
    moves: ['HydroPump', 'FlashCannon', 'IceBeam', 'DrillPeck']
  },

  // === GEN 5 STARTERS ===
  snivy: {
    name: 'Snivy', dexNumber: 495, types: ['Grass'],
    baseStats: { hp: 45, atk: 45, def: 55, spAtk: 45, spDef: 55, spd: 63 },
    moves: ['Tackle', 'VineWhip'],
    evolution: { level: 17, to: 'servine' }
  },
  servine: {
    name: 'Servine', dexNumber: 496, types: ['Grass'],
    baseStats: { hp: 60, atk: 60, def: 75, spAtk: 60, spDef: 75, spd: 83 },
    moves: ['VineWhip', 'LeafTornado', 'Slam'],
    evolution: { level: 36, to: 'serperior' }
  },
  serperior: {
    name: 'Serperior', dexNumber: 497, types: ['Grass'],
    baseStats: { hp: 75, atk: 75, def: 95, spAtk: 75, spDef: 95, spd: 113 },
    moves: ['LeafStorm', 'DragonPulse', 'GigaDrain', 'EnergyBall']
  },

  tepig: {
    name: 'Tepig', dexNumber: 498, types: ['Fire'],
    baseStats: { hp: 65, atk: 63, def: 45, spAtk: 45, spDef: 45, spd: 45 },
    moves: ['Tackle', 'Ember'],
    evolution: { level: 17, to: 'pignite' }
  },
  pignite: {
    name: 'Pignite', dexNumber: 499, types: ['Fire', 'Fighting'],
    baseStats: { hp: 90, atk: 93, def: 55, spAtk: 70, spDef: 55, spd: 55 },
    moves: ['ArmThrust', 'FlameCharge', 'Rollout'],
    evolution: { level: 36, to: 'emboar' }
  },
  emboar: {
    name: 'Emboar', dexNumber: 500, types: ['Fire', 'Fighting'],
    baseStats: { hp: 110, atk: 123, def: 65, spAtk: 100, spDef: 65, spd: 65 },
    moves: ['FlareBlitz', 'HammerArm', 'HeadSmash', 'WildCharge']
  },

  oshawott: {
    name: 'Oshawott', dexNumber: 501, types: ['Water'],
    baseStats: { hp: 55, atk: 55, def: 45, spAtk: 63, spDef: 45, spd: 45 },
    moves: ['Tackle', 'WaterGun'],
    evolution: { level: 17, to: 'dewott' }
  },
  dewott: {
    name: 'Dewott', dexNumber: 502, types: ['Water'],
    baseStats: { hp: 75, atk: 75, def: 60, spAtk: 83, spDef: 60, spd: 60 },
    moves: ['RazorShell', 'WaterPulse', 'FuryCutter'],
    evolution: { level: 36, to: 'samurott' }
  },
  samurott: {
    name: 'Samurott', dexNumber: 503, types: ['Water'],
    baseStats: { hp: 95, atk: 100, def: 85, spAtk: 108, spDef: 70, spd: 70 },
    moves: ['HydroPump', 'Megahorn', 'IceBeam', 'NightSlash']
  },

  // === GEN 6 STARTERS ===
  chespin: {
    name: 'Chespin', dexNumber: 650, types: ['Grass'],
    baseStats: { hp: 56, atk: 61, def: 65, spAtk: 48, spDef: 45, spd: 38 },
    moves: ['Tackle', 'VineWhip'],
    evolution: { level: 16, to: 'quilladin' }
  },
  quilladin: {
    name: 'Quilladin', dexNumber: 651, types: ['Grass'],
    baseStats: { hp: 61, atk: 78, def: 95, spAtk: 56, spDef: 58, spd: 57 },
    moves: ['PinMissile', 'NeedleArm', 'Bite'],
    evolution: { level: 36, to: 'chesnaught' }
  },
  chesnaught: {
    name: 'Chesnaught', dexNumber: 652, types: ['Grass', 'Fighting'],
    baseStats: { hp: 88, atk: 107, def: 122, spAtk: 74, spDef: 75, spd: 64 },
    moves: ['WoodHammer', 'CloseCombat', 'StoneEdge', 'SpikyShield']
  },

  fennekin: {
    name: 'Fennekin', dexNumber: 653, types: ['Fire'],
    baseStats: { hp: 40, atk: 45, def: 40, spAtk: 62, spDef: 60, spd: 60 },
    moves: ['Scratch', 'Ember'],
    evolution: { level: 16, to: 'braixen' }
  },
  braixen: {
    name: 'Braixen', dexNumber: 654, types: ['Fire'],
    baseStats: { hp: 59, atk: 59, def: 58, spAtk: 90, spDef: 70, spd: 73 },
    moves: ['Psybeam', 'FlameCharge', 'LightScreen'],
    evolution: { level: 36, to: 'delphox' }
  },
  delphox: {
    name: 'Delphox', dexNumber: 655, types: ['Fire', 'Psychic'],
    baseStats: { hp: 75, atk: 69, def: 72, spAtk: 114, spDef: 100, spd: 104 },
    moves: ['FireBlast', 'Psychic', 'ShadowBall', 'DazzlingGleam']
  },

  froakie: {
    name: 'Froakie', dexNumber: 656, types: ['Water'],
    baseStats: { hp: 41, atk: 56, def: 40, spAtk: 62, spDef: 44, spd: 71 },
    moves: ['Pound', 'WaterGun'],
    evolution: { level: 16, to: 'frogadier' }
  },
  frogadier: {
    name: 'Frogadier', dexNumber: 657, types: ['Water'],
    baseStats: { hp: 54, atk: 63, def: 52, spAtk: 83, spDef: 56, spd: 97 },
    moves: ['WaterPulse', 'QuickAttack', 'Round'],
    evolution: { level: 36, to: 'greninja' }
  },
  greninja: {
    name: 'Greninja', dexNumber: 658, types: ['Water', 'Dark'],
    baseStats: { hp: 72, atk: 95, def: 67, spAtk: 103, spDef: 71, spd: 122 },
    moves: ['WaterShuriken', 'DarkPulse', 'HydroPump', 'IceBeam'],
    megaForm: {
      name: 'Ash-Greninja', types: ['Water', 'Dark'],
      baseStats: { hp: 72, atk: 145, def: 67, spAtk: 153, spDef: 71, spd: 132 }
    }
  },

  // === GEN 7 STARTERS ===
  rowlet: {
    name: 'Rowlet', dexNumber: 722, types: ['Grass', 'Flying'],
    baseStats: { hp: 68, atk: 55, def: 55, spAtk: 50, spDef: 50, spd: 42 },
    moves: ['Tackle', 'Leafage'],
    evolution: { level: 17, to: 'dartrix' }
  },
  dartrix: {
    name: 'Dartrix', dexNumber: 723, types: ['Grass', 'Flying'],
    baseStats: { hp: 78, atk: 75, def: 75, spAtk: 70, spDef: 70, spd: 52 },
    moves: ['RazorLeaf', 'Pluck', 'Astonish'],
    evolution: { level: 34, to: 'decidueye' }
  },
  decidueye: {
    name: 'Decidueye', dexNumber: 724, types: ['Grass', 'Ghost'],
    baseStats: { hp: 78, atk: 107, def: 75, spAtk: 100, spDef: 100, spd: 70 },
    moves: ['LeafBlade', 'ShadowBall', 'BraveBird', 'EnergyBall']
  },

  litten: {
    name: 'Litten', dexNumber: 725, types: ['Fire'],
    baseStats: { hp: 45, atk: 65, def: 40, spAtk: 60, spDef: 40, spd: 70 },
    moves: ['Scratch', 'Ember'],
    evolution: { level: 17, to: 'torracat' }
  },
  torracat: {
    name: 'Torracat', dexNumber: 726, types: ['Fire'],
    baseStats: { hp: 65, atk: 85, def: 50, spAtk: 80, spDef: 50, spd: 90 },
    moves: ['FireFang', 'Bite', 'DoubleKick'],
    evolution: { level: 34, to: 'incineroar' }
  },
  incineroar: {
    name: 'Incineroar', dexNumber: 727, types: ['Fire', 'Dark'],
    baseStats: { hp: 95, atk: 115, def: 90, spAtk: 80, spDef: 90, spd: 60 },
    moves: ['FlareBlitz', 'DarkPulse', 'CloseCombat', 'Earthquake']
  },

  popplio: {
    name: 'Popplio', dexNumber: 728, types: ['Water'],
    baseStats: { hp: 50, atk: 54, def: 54, spAtk: 66, spDef: 56, spd: 40 },
    moves: ['Pound', 'WaterGun'],
    evolution: { level: 17, to: 'brionne' }
  },
  brionne: {
    name: 'Brionne', dexNumber: 729, types: ['Water'],
    baseStats: { hp: 60, atk: 69, def: 69, spAtk: 91, spDef: 81, spd: 50 },
    moves: ['BubbleBeam', 'DisarmingVoice', 'AquaJet'],
    evolution: { level: 34, to: 'primarina' }
  },
  primarina: {
    name: 'Primarina', dexNumber: 730, types: ['Water', 'Fairy'],
    baseStats: { hp: 80, atk: 74, def: 74, spAtk: 126, spDef: 116, spd: 60 },
    moves: ['HydroPump', 'Moonblast', 'Psychic', 'IceBeam']
  },

  // === GEN 8 STARTERS ===
  grookey: {
    name: 'Grookey', dexNumber: 810, types: ['Grass'],
    baseStats: { hp: 50, atk: 65, def: 50, spAtk: 40, spDef: 40, spd: 65 },
    moves: ['Scratch', 'BranchPoke'],
    evolution: { level: 16, to: 'thwackey' }
  },
  thwackey: {
    name: 'Thwackey', dexNumber: 811, types: ['Grass'],
    baseStats: { hp: 70, atk: 85, def: 70, spAtk: 55, spDef: 60, spd: 80 },
    moves: ['RazorLeaf', 'DoubleHit', 'Slam'],
    evolution: { level: 35, to: 'rillaboom' }
  },
  rillaboom: {
    name: 'Rillaboom', dexNumber: 812, types: ['Grass'],
    baseStats: { hp: 100, atk: 125, def: 90, spAtk: 60, spDef: 70, spd: 85 },
    moves: ['LeafBlade', 'Earthquake', 'HammerArm', 'BodySlam'],
    gmaxForm: { name: 'G-Max Rillaboom', signatureMove: 'G-Max Drum Solo' }
  },

  scorbunny: {
    name: 'Scorbunny', dexNumber: 813, types: ['Fire'],
    baseStats: { hp: 50, atk: 71, def: 40, spAtk: 40, spDef: 40, spd: 69 },
    moves: ['Tackle', 'Ember'],
    evolution: { level: 16, to: 'raboot' }
  },
  raboot: {
    name: 'Raboot', dexNumber: 814, types: ['Fire'],
    baseStats: { hp: 65, atk: 86, def: 60, spAtk: 55, spDef: 60, spd: 94 },
    moves: ['FlameCharge', 'DoubleKick', 'Headbutt'],
    evolution: { level: 35, to: 'cinderace' }
  },
  cinderace: {
    name: 'Cinderace', dexNumber: 815, types: ['Fire'],
    baseStats: { hp: 80, atk: 116, def: 75, spAtk: 65, spDef: 75, spd: 119 },
    moves: ['PyroBall', 'HighJumpKick', 'IronHead', 'GunkShot'],
    gmaxForm: { name: 'G-Max Cinderace', signatureMove: 'G-Max Fireball' }
  },

  sobble: {
    name: 'Sobble', dexNumber: 816, types: ['Water'],
    baseStats: { hp: 50, atk: 40, def: 40, spAtk: 70, spDef: 40, spd: 70 },
    moves: ['Pound', 'WaterGun'],
    evolution: { level: 16, to: 'drizzile' }
  },
  drizzile: {
    name: 'Drizzile', dexNumber: 817, types: ['Water'],
    baseStats: { hp: 65, atk: 60, def: 55, spAtk: 95, spDef: 55, spd: 90 },
    moves: ['WaterPulse', 'SuckerPunch', 'Uturn'],
    evolution: { level: 35, to: 'inteleon' }
  },
  inteleon: {
    name: 'Inteleon', dexNumber: 818, types: ['Water'],
    baseStats: { hp: 70, atk: 85, def: 65, spAtk: 125, spDef: 65, spd: 120 },
    moves: ['HydroPump', 'IceBeam', 'DarkPulse', 'AirSlash'],
    gmaxForm: { name: 'G-Max Inteleon', signatureMove: 'G-Max Hydrosnipe' }
  },

  // === GEN 9 STARTERS ===
  sprigatito: {
    name: 'Sprigatito', dexNumber: 906, types: ['Grass'],
    baseStats: { hp: 40, atk: 61, def: 54, spAtk: 45, spDef: 45, spd: 65 },
    moves: ['Scratch', 'Leafage'],
    evolution: { level: 16, to: 'floragato' }
  },
  floragato: {
    name: 'Floragato', dexNumber: 907, types: ['Grass'],
    baseStats: { hp: 61, atk: 80, def: 63, spAtk: 60, spDef: 63, spd: 83 },
    moves: ['SeedBomb', 'Bite', 'QuickAttack'],
    evolution: { level: 36, to: 'meowscarada' }
  },
  meowscarada: {
    name: 'Meowscarada', dexNumber: 908, types: ['Grass', 'Dark'],
    baseStats: { hp: 76, atk: 110, def: 70, spAtk: 81, spDef: 70, spd: 123 },
    moves: ['FlowerTrick', 'NightSlash', 'PlayRough', 'AuraSphere']
  },

  fuecoco: {
    name: 'Fuecoco', dexNumber: 909, types: ['Fire'],
    baseStats: { hp: 67, atk: 45, def: 59, spAtk: 63, spDef: 40, spd: 36 },
    moves: ['Tackle', 'Ember'],
    evolution: { level: 16, to: 'crocalor' }
  },
  crocalor: {
    name: 'Crocalor', dexNumber: 910, types: ['Fire'],
    baseStats: { hp: 81, atk: 55, def: 78, spAtk: 90, spDef: 58, spd: 49 },
    moves: ['Incinerate', 'Bite', 'Roar'],
    evolution: { level: 36, to: 'skeledirge' }
  },
  skeledirge: {
    name: 'Skeledirge', dexNumber: 911, types: ['Fire', 'Ghost'],
    baseStats: { hp: 104, atk: 75, def: 100, spAtk: 110, spDef: 75, spd: 66 },
    moves: ['TorchSong', 'ShadowBall', 'EarthPower', 'HyperVoice']
  },

  quaxly: {
    name: 'Quaxly', dexNumber: 912, types: ['Water'],
    baseStats: { hp: 55, atk: 65, def: 45, spAtk: 50, spDef: 45, spd: 50 },
    moves: ['Pound', 'WaterGun'],
    evolution: { level: 16, to: 'quaxwell' }
  },
  quaxwell: {
    name: 'Quaxwell', dexNumber: 913, types: ['Water'],
    baseStats: { hp: 70, atk: 85, def: 65, spAtk: 65, spDef: 60, spd: 65 },
    moves: ['AquaCutter', 'LowSweep', 'WingAttack'],
    evolution: { level: 36, to: 'quaquaval' }
  },
  quaquaval: {
    name: 'Quaquaval', dexNumber: 914, types: ['Water', 'Fighting'],
    baseStats: { hp: 85, atk: 120, def: 80, spAtk: 85, spDef: 75, spd: 85 },
    moves: ['Waterfall', 'CloseCombat', 'BraveBird', 'IceSpinner']
  },

  // === MASTERS EIGHT & ICONIC POKÉMON ===
  lucario: {
    name: 'Lucario', dexNumber: 448, types: ['Fighting', 'Steel'],
    baseStats: { hp: 70, atk: 110, def: 70, spAtk: 115, spDef: 70, spd: 90 },
    moves: ['AuraSphere', 'FlashCannon', 'CloseCombat', 'ExtremeSpeed'],
    megaForm: {
      name: 'Mega Lucario', types: ['Fighting', 'Steel'],
      baseStats: { hp: 70, atk: 145, def: 88, spAtk: 140, spDef: 70, spd: 112 }
    }
  },
  gengar: {
    name: 'Gengar', dexNumber: 94, types: ['Ghost', 'Poison'],
    baseStats: { hp: 60, atk: 65, def: 60, spAtk: 130, spDef: 75, spd: 110 },
    moves: ['ShadowBall', 'SludgeBomb', 'Thunderbolt', 'Psychic'],
    megaForm: {
      name: 'Mega Gengar', types: ['Ghost', 'Poison'],
      baseStats: { hp: 60, atk: 65, def: 80, spAtk: 170, spDef: 95, spd: 130 }
    },
    gmaxForm: { name: 'G-Max Gengar', signatureMove: 'G-Max Terror' }
  },
  garchomp: {
    name: 'Garchomp', dexNumber: 445, types: ['Dragon', 'Ground'],
    baseStats: { hp: 108, atk: 130, def: 95, spAtk: 80, spDef: 85, spd: 102 },
    moves: ['DragonClaw', 'Earthquake', 'StoneEdge', 'IronHead'],
    megaForm: {
      name: 'Mega Garchomp', types: ['Dragon', 'Ground'],
      baseStats: { hp: 108, atk: 170, def: 115, spAtk: 120, spDef: 95, spd: 92 }
    }
  },
  metagross: {
    name: 'Metagross', dexNumber: 376, types: ['Steel', 'Psychic'],
    baseStats: { hp: 80, atk: 135, def: 130, spAtk: 95, spDef: 90, spd: 70 },
    moves: ['IronHead', 'Psychic', 'Earthquake', 'Thunderbolt'],
    megaForm: {
      name: 'Mega Metagross', types: ['Steel', 'Psychic'],
      baseStats: { hp: 80, atk: 145, def: 150, spAtk: 105, spDef: 110, spd: 110 }
    }
  },
  gardevoir: {
    name: 'Gardevoir', dexNumber: 282, types: ['Psychic', 'Fairy'],
    baseStats: { hp: 68, atk: 65, def: 65, spAtk: 125, spDef: 115, spd: 80 },
    moves: ['Moonblast', 'Psychic', 'ShadowBall', 'EnergyBall'],
    megaForm: {
      name: 'Mega Gardevoir', types: ['Psychic', 'Fairy'],
      baseStats: { hp: 68, atk: 85, def: 65, spAtk: 165, spDef: 135, spd: 100 }
    }
  },
  dragonite: {
    name: 'Dragonite', dexNumber: 149, types: ['Dragon', 'Flying'],
    baseStats: { hp: 91, atk: 134, def: 95, spAtk: 100, spDef: 100, spd: 80 },
    moves: ['DragonClaw', 'ExtremeSpeed', 'FireBlast', 'Earthquake']
  },
  dragapult: {
    name: 'Dragapult', dexNumber: 887, types: ['Dragon', 'Ghost'],
    baseStats: { hp: 88, atk: 120, def: 75, spAtk: 100, spDef: 75, spd: 142 },
    moves: ['DragonClaw', 'ShadowBall', 'Flamethrower', 'Thunderbolt']
  },
  haxorus: {
    name: 'Haxorus', dexNumber: 612, types: ['Dragon'],
    baseStats: { hp: 76, atk: 147, def: 90, spAtk: 60, spDef: 70, spd: 97 },
    moves: ['Outrage', 'Earthquake', 'IronHead', 'CloseCombat']
  },
  gyarados: {
    name: 'Gyarados', dexNumber: 130, types: ['Water', 'Flying'],
    baseStats: { hp: 95, atk: 125, def: 79, spAtk: 60, spDef: 100, spd: 81 },
    moves: ['Waterfall', 'Crunch', 'Earthquake', 'IceBeam'],
    megaForm: {
      name: 'Mega Gyarados', types: ['Water', 'Dark'],
      baseStats: { hp: 95, atk: 155, def: 109, spAtk: 70, spDef: 130, spd: 81 }
    }
  },
  tinkaton: {
    name: 'Tinkaton', dexNumber: 959, types: ['Fairy', 'Steel'],
    baseStats: { hp: 85, atk: 75, def: 77, spAtk: 70, spDef: 105, spd: 94 },
    moves: ['GigatonHammer', 'PlayRough', 'StoneEdge', 'FlashCannon']
  },
  baxcalibur: {
    name: 'Baxcalibur', dexNumber: 998, types: ['Dragon', 'Ice'],
    baseStats: { hp: 115, atk: 145, def: 92, spAtk: 75, spDef: 86, spd: 87 },
    moves: ['GlaiveRush', 'IcicleCrash', 'Earthquake', 'IronHead']
  },

  // === ROUTE WILD POKÉMON ===
  rookidee: {
    name: 'Rookidee', dexNumber: 821, types: ['Flying'],
    baseStats: { hp: 38, atk: 47, def: 35, spAtk: 33, spDef: 35, spd: 57 },
    moves: ['Gust', 'QuickAttack'],
    evolution: { level: 18, to: 'corvisquire' }
  },
  corvisquire: {
    name: 'Corvisquire', dexNumber: 822, types: ['Flying'],
    baseStats: { hp: 68, atk: 67, def: 55, spAtk: 43, spDef: 55, spd: 77 },
    moves: ['AirSlash', 'FuryAttack'],
    evolution: { level: 38, to: 'corviknight' }
  },
  corviknight: {
    name: 'Corviknight', dexNumber: 823, types: ['Flying', 'Steel'],
    baseStats: { hp: 98, atk: 87, def: 105, spAtk: 53, spDef: 85, spd: 67 },
    moves: ['BraveBird', 'IronHead', 'BodySlam', 'Roost'],
    gmaxForm: { name: 'G-Max Corviknight', signatureMove: 'Max Airstream' }
  },
  shinx: {
    name: 'Shinx', dexNumber: 403, types: ['Electric'],
    baseStats: { hp: 45, atk: 65, def: 34, spAtk: 40, spDef: 34, spd: 45 },
    moves: ['Tackle', 'ThunderShock'],
    evolution: { level: 15, to: 'luxray' }
  },
  luxray: {
    name: 'Luxray', dexNumber: 405, types: ['Electric'],
    baseStats: { hp: 80, atk: 120, def: 79, spAtk: 95, spDef: 79, spd: 70 },
    moves: ['Thunderbolt', 'Crunch', 'IronHead', 'WildCharge']
  },
  ralts: {
    name: 'Ralts', dexNumber: 280, types: ['Psychic', 'Fairy'],
    baseStats: { hp: 28, atk: 25, def: 25, spAtk: 45, spDef: 35, spd: 40 },
    moves: ['Confusion', 'DrainingKiss'],
    evolution: { level: 20, to: 'gardevoir' }
  },
  larvitar: {
    name: 'Larvitar', dexNumber: 246, types: ['Rock', 'Ground'],
    baseStats: { hp: 50, atk: 64, def: 50, spAtk: 45, spDef: 50, spd: 41 },
    moves: ['Bite', 'RockThrow'],
    evolution: { level: 30, to: 'tyranitar' }
  },
  tyranitar: {
    name: 'Tyranitar', dexNumber: 248, types: ['Rock', 'Dark'],
    baseStats: { hp: 100, atk: 134, def: 110, spAtk: 95, spDef: 100, spd: 61 },
    moves: ['StoneEdge', 'Crunch', 'Earthquake', 'FireBlast'],
    megaForm: {
      name: 'Mega Tyranitar', types: ['Rock', 'Dark'],
      baseStats: { hp: 100, atk: 164, def: 150, spAtk: 95, spDef: 120, spd: 71 }
    }
  },
  gible: {
    name: 'Gible', dexNumber: 443, types: ['Dragon', 'Ground'],
    baseStats: { hp: 58, atk: 70, def: 45, spAtk: 40, spDef: 45, spd: 42 },
    moves: ['Tackle', 'DragonBreath'],
    evolution: { level: 24, to: 'garchomp' }
  },
  dratini: {
    name: 'Dratini', dexNumber: 147, types: ['Dragon'],
    baseStats: { hp: 41, atk: 64, def: 45, spAtk: 50, spDef: 50, spd: 50 },
    moves: ['Wrap', 'ThunderWave', 'DragonBreath'],
    evolution: { level: 30, to: 'dragonite' }
  },

  // === ALL MAJOR LEGENDARY POKÉMON ===
  rayquaza: {
    name: 'Rayquaza', dexNumber: 384, types: ['Dragon', 'Flying'], isLegendary: true,
    baseStats: { hp: 105, atk: 150, def: 90, spAtk: 150, spDef: 90, spd: 95 },
    moves: ['DragonAscent', 'Outrage', 'Earthquake', 'ExtremeSpeed'],
    megaForm: {
      name: 'Mega Rayquaza', types: ['Dragon', 'Flying'],
      baseStats: { hp: 105, atk: 180, def: 100, spAtk: 180, spDef: 100, spd: 115 }
    }
  },
  mewtwo: {
    name: 'Mewtwo', dexNumber: 150, types: ['Psychic'], isLegendary: true,
    baseStats: { hp: 106, atk: 110, def: 90, spAtk: 154, spDef: 90, spd: 130 },
    moves: ['Psystrike', 'ShadowBall', 'AuraSphere', 'IceBeam'],
    megaForm: {
      name: 'Mega Mewtwo Y', types: ['Psychic'],
      baseStats: { hp: 106, atk: 150, def: 70, spAtk: 194, spDef: 120, spd: 140 }
    }
  },
  mew: {
    name: 'Mew', dexNumber: 151, types: ['Psychic'], isLegendary: true,
    baseStats: { hp: 100, atk: 100, def: 100, spAtk: 100, spDef: 100, spd: 100 },
    moves: ['Psychic', 'AuraSphere', 'Flamethrower', 'Thunderbolt']
  },
  dialga: {
    name: 'Dialga', dexNumber: 483, types: ['Steel', 'Dragon'], isLegendary: true,
    baseStats: { hp: 100, atk: 120, def: 120, spAtk: 150, spDef: 100, spd: 90 },
    moves: ['RoarOfTime', 'FlashCannon', 'Earthquake', 'DragonClaw']
  },
  palkia: {
    name: 'Palkia', dexNumber: 484, types: ['Water', 'Dragon'], isLegendary: true,
    baseStats: { hp: 90, atk: 120, def: 100, spAtk: 150, spDef: 120, spd: 100 },
    moves: ['SpacialRend', 'HydroPump', 'AuraSphere', 'Thunderbolt']
  },
  giratina: {
    name: 'Giratina', dexNumber: 487, types: ['Ghost', 'Dragon'], isLegendary: true,
    baseStats: { hp: 150, atk: 120, def: 100, spAtk: 120, spDef: 100, spd: 90 },
    moves: ['ShadowBall', 'DragonClaw', 'Earthquake', 'AuraSphere']
  },
  arceus: {
    name: 'Arceus', dexNumber: 493, types: ['Normal'], isLegendary: true,
    baseStats: { hp: 120, atk: 120, def: 120, spAtk: 120, spDef: 120, spd: 120 },
    moves: ['ExtremeSpeed', 'Earthquake', 'ShadowBall', 'Recover']
  },
  kyogre: {
    name: 'Kyogre', dexNumber: 382, types: ['Water'], isLegendary: true,
    baseStats: { hp: 100, atk: 100, def: 90, spAtk: 150, spDef: 140, spd: 90 },
    moves: ['OriginPulse', 'IceBeam', 'Thunder', 'Surf'],
    megaForm: {
      name: 'Primal Kyogre', types: ['Water'],
      baseStats: { hp: 100, atk: 150, def: 90, spAtk: 180, spDef: 160, spd: 90 }
    }
  },
  groudon: {
    name: 'Groudon', dexNumber: 383, types: ['Ground'], isLegendary: true,
    baseStats: { hp: 100, atk: 150, def: 140, spAtk: 100, spDef: 90, spd: 90 },
    moves: ['PrecipiceBlades', 'FireBlast', 'SolarBeam', 'StoneEdge'],
    megaForm: {
      name: 'Primal Groudon', types: ['Ground', 'Fire'],
      baseStats: { hp: 100, atk: 180, def: 160, spAtk: 150, spDef: 90, spd: 90 }
    }
  },
  zacian: {
    name: 'Zacian', dexNumber: 888, types: ['Fairy', 'Steel'], isLegendary: true,
    baseStats: { hp: 92, atk: 170, def: 115, spAtk: 80, spDef: 115, spd: 148 },
    moves: ['BehemothBlade', 'PlayRough', 'CloseCombat', 'IronHead']
  },
  zamazenta: {
    name: 'Zamazenta', dexNumber: 889, types: ['Fighting', 'Steel'], isLegendary: true,
    baseStats: { hp: 92, atk: 130, def: 145, spAtk: 80, spDef: 145, spd: 128 },
    moves: ['CloseCombat', 'IronHead', 'Crunch', 'StoneEdge']
  },
  solgaleo: {
    name: 'Solgaleo', dexNumber: 791, types: ['Psychic', 'Steel'], isLegendary: true,
    baseStats: { hp: 137, atk: 137, def: 107, spAtk: 113, spDef: 89, spd: 97 },
    moves: ['SunsteelStrike', 'Psychic', 'Earthquake', 'FlareBlitz']
  },
  lunala: {
    name: 'Lunala', dexNumber: 792, types: ['Psychic', 'Ghost'], isLegendary: true,
    baseStats: { hp: 137, atk: 113, def: 89, spAtk: 137, spDef: 107, spd: 97 },
    moves: ['MoongeistBeam', 'Psychic', 'Moonblast', 'IceBeam']
  },
  koraidon: {
    name: 'Koraidon', dexNumber: 1007, types: ['Fighting', 'Dragon'], isLegendary: true,
    baseStats: { hp: 100, atk: 135, def: 115, spAtk: 85, spDef: 100, spd: 135 },
    moves: ['CollisionCourse', 'Outrage', 'FlareBlitz', 'IronHead']
  },
  miraidon: {
    name: 'Miraidon', dexNumber: 1008, types: ['Electric', 'Dragon'], isLegendary: true,
    baseStats: { hp: 100, atk: 85, def: 100, spAtk: 135, spDef: 115, spd: 135 },
    moves: ['ThunderousKick', 'DracoMeteor', 'Thunderbolt', 'PowerGem']
  },
  reshiram: {
    name: 'Reshiram', dexNumber: 643, types: ['Dragon', 'Fire'], isLegendary: true,
    baseStats: { hp: 100, atk: 120, def: 100, spAtk: 150, spDef: 120, spd: 90 },
    moves: ['BlueFlare', 'DracoMeteor', 'EarthPower', 'StoneEdge']
  },
  zekrom: {
    name: 'Zekrom', dexNumber: 644, types: ['Dragon', 'Electric'], isLegendary: true,
    baseStats: { hp: 100, atk: 150, def: 120, spAtk: 120, spDef: 100, spd: 90 },
    moves: ['BoltStrike', 'Outrage', 'Crunch', 'StoneEdge']
  },
  xerneas: {
    name: 'Xerneas', dexNumber: 716, types: ['Fairy'], isLegendary: true,
    baseStats: { hp: 126, atk: 131, def: 95, spAtk: 131, spDef: 98, spd: 99 },
    moves: ['Moonblast', 'Geomancy', 'Thunderbolt', 'FocusBlast']
  },
  yveltal: {
    name: 'Yveltal', dexNumber: 717, types: ['Dark', 'Flying'], isLegendary: true,
    baseStats: { hp: 126, atk: 131, def: 95, spAtk: 131, spDef: 98, spd: 99 },
    moves: ['OblivionWing', 'DarkPulse', 'SuckerPunch', 'FocusBlast']
  }
};

// Helper function to calculate actual stats from level & base stats
export function calculateStats(baseStats, level) {
  const hp = Math.floor(((2 * baseStats.hp + 31) * level) / 100) + level + 10;
  const calcOther = (base) => Math.floor(((2 * base + 31) * level) / 100) + 5;
  return {
    maxHp: hp,
    atk: calcOther(baseStats.atk),
    def: calcOther(baseStats.def),
    spAtk: calcOther(baseStats.spAtk),
    spDef: calcOther(baseStats.spDef),
    spd: calcOther(baseStats.spd)
  };
}

// Helper to create an active Pokémon instance
export function createPokemon(speciesKey, level, nickname = null) {
  const species = POKEMON_SPECIES[speciesKey.toLowerCase()];
  if (!species) throw new Error(`Unknown species: ${speciesKey}`);
  const stats = calculateStats(species.baseStats, level);
  const moves = [...species.moves.slice(0, 4)];
  return {
    speciesKey: speciesKey.toLowerCase(),
    name: nickname || species.name,
    dexNumber: species.dexNumber,
    level: level,
    types: [...species.types],
    stats: stats,
    currentHp: stats.maxHp,
    moves: moves,
    baseStats: { ...species.baseStats },
    exp: Math.pow(level, 3),
    nextExp: Math.pow(level + 1, 3),
    isMega: false,
    isGmax: false,
    isDynamaxed: false,
    dynamaxTurns: 0,
    hasZMoveUsed: false,
    heldItem: null
  };
}
