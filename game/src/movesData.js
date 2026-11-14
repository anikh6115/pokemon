// Comprehensive Moves Database for Pokémon Emerald Journeys
// Including Standard Moves, Signature Moves, Z-Moves, and Max Moves

export const MOVES = {
  // Normal Moves
  Tackle: { name: 'Tackle', type: 'Normal', category: 'Physical', power: 40, accuracy: 100, pp: 35, desc: 'A physical charge attack.' },
  Scratch: { name: 'Scratch', type: 'Normal', category: 'Physical', power: 40, accuracy: 100, pp: 35, desc: 'Scratches with sharp claws.' },
  QuickAttack: { name: 'Quick Attack', type: 'Normal', category: 'Physical', power: 40, accuracy: 100, pp: 30, priority: 1, desc: 'An almost invisibly fast attack.' },
  Slash: { name: 'Slash', type: 'Normal', category: 'Physical', power: 70, accuracy: 100, pp: 20, critRate: 2, desc: 'High critical-hit ratio.' },
  HyperBeam: { name: 'Hyper Beam', type: 'Normal', category: 'Special', power: 150, accuracy: 90, pp: 5, desc: 'A devastating beam attack.' },
  BodySlam: { name: 'Body Slam', type: 'Normal', category: 'Physical', power: 85, accuracy: 100, pp: 15, effect: 'paralyze', effectChance: 30, desc: 'May paralyze the foe.' },
  ExtremeSpeed: { name: 'Extreme Speed', type: 'Normal', category: 'Physical', power: 80, accuracy: 100, pp: 10, priority: 2, desc: 'Blinding speed attack.' },

  // Fire Moves
  Ember: { name: 'Ember', type: 'Fire', category: 'Special', power: 40, accuracy: 100, pp: 25, effect: 'burn', effectChance: 10, desc: 'May burn the target.' },
  FlameWheel: { name: 'Flame Wheel', type: 'Fire', category: 'Physical', power: 60, accuracy: 100, pp: 25, effect: 'burn', effectChance: 10, desc: 'A fiery rolling attack.' },
  Flamethrower: { name: 'Flamethrower', type: 'Fire', category: 'Special', power: 90, accuracy: 100, pp: 15, effect: 'burn', effectChance: 10, desc: 'A powerful blast of fire.' },
  FireBlast: { name: 'Fire Blast', type: 'Fire', category: 'Special', power: 110, accuracy: 85, pp: 5, effect: 'burn', effectChance: 10, desc: 'An intense fire burst.' },
  FlareBlitz: { name: 'Flare Blitz', type: 'Fire', category: 'Physical', power: 120, accuracy: 100, pp: 15, recoil: 0.33, desc: 'Cloaked in fire, causes recoil.' },
  PyroBall: { name: 'Pyro Ball', type: 'Fire', category: 'Physical', power: 120, accuracy: 90, pp: 5, effect: 'burn', effectChance: 10, desc: 'Cinderace signature move.' },
  TorchSong: { name: 'Torch Song', type: 'Fire', category: 'Special', power: 80, accuracy: 100, pp: 10, statBuff: { stat: 'spAtk', stages: 1 }, desc: 'Boosts Special Attack.' },

  // Water Moves
  WaterGun: { name: 'Water Gun', type: 'Water', category: 'Special', power: 40, accuracy: 100, pp: 25, desc: 'Squirts water to attack.' },
  WaterPulse: { name: 'Water Pulse', type: 'Water', category: 'Special', power: 60, accuracy: 100, pp: 20, effect: 'confusion', effectChance: 20, desc: 'May confuse target.' },
  Surf: { name: 'Surf', type: 'Water', category: 'Special', power: 90, accuracy: 100, pp: 15, desc: 'A giant crashing wave.' },
  HydroPump: { name: 'Hydro Pump', type: 'Water', category: 'Special', power: 110, accuracy: 80, pp: 5, desc: 'Blasts high-pressure water.' },
  Waterfall: { name: 'Waterfall', type: 'Water', category: 'Physical', power: 80, accuracy: 100, pp: 15, effect: 'flinch', effectChance: 20, desc: 'May cause flinching.' },
  WaterShuriken: { name: 'Water Shuriken', type: 'Water', category: 'Special', power: 85, accuracy: 100, pp: 20, priority: 1, desc: 'Greninja ninja star.' },
  OriginPulse: { name: 'Origin Pulse', type: 'Water', category: 'Special', power: 110, accuracy: 85, pp: 10, desc: 'Kyogre signature beam.' },

  // Grass Moves
  VineWhip: { name: 'Vine Whip', type: 'Grass', category: 'Physical', power: 45, accuracy: 100, pp: 25, desc: 'Strikes with slender vines.' },
  RazorLeaf: { name: 'Razor Leaf', type: 'Grass', category: 'Physical', power: 55, accuracy: 95, pp: 25, critRate: 2, desc: 'Cuts with sharp leaves.' },
  GigaDrain: { name: 'Giga Drain', type: 'Grass', category: 'Special', power: 75, accuracy: 100, pp: 10, drain: 0.5, desc: 'Drains half the damage dealt.' },
  EnergyBall: { name: 'Energy Ball', type: 'Grass', category: 'Special', power: 90, accuracy: 100, pp: 10, effect: 'lowerSpDef', effectChance: 10, desc: 'May lower Sp. Def.' },
  LeafBlade: { name: 'Leaf Blade', type: 'Grass', category: 'Physical', power: 90, accuracy: 100, pp: 15, critRate: 2, desc: 'Sceptile signature slash.' },
  LeafStorm: { name: 'Leaf Storm', type: 'Grass', category: 'Special', power: 130, accuracy: 90, pp: 5, recoilSpAtk: -2, desc: 'Lowers Sp. Atk by 2 stages.' },
  FlowerTrick: { name: 'Flower Trick', type: 'Grass', category: 'Physical', power: 70, accuracy: 100, pp: 10, alwaysCrit: true, desc: 'Never misses, always crits.' },

  // Electric Moves
  ThunderShock: { name: 'Thunder Shock', type: 'Electric', category: 'Special', power: 40, accuracy: 100, pp: 30, effect: 'paralyze', effectChance: 10, desc: 'May paralyze target.' },
  Spark: { name: 'Spark', type: 'Electric', category: 'Physical', power: 65, accuracy: 100, pp: 20, effect: 'paralyze', effectChance: 30, desc: 'An electrified charge.' },
  Thunderbolt: { name: 'Thunderbolt', type: 'Electric', category: 'Special', power: 90, accuracy: 100, pp: 15, effect: 'paralyze', effectChance: 10, desc: 'A strong electrical blast.' },
  Thunder: { name: 'Thunder', type: 'Electric', category: 'Special', power: 110, accuracy: 70, pp: 10, effect: 'paralyze', effectChance: 30, desc: 'A lightning strike.' },
  VoltTackle: { name: 'Volt Tackle', type: 'Electric', category: 'Physical', power: 120, accuracy: 100, pp: 15, recoil: 0.33, desc: 'Electrified tackle with recoil.' },
  ThunderousKick: { name: 'Electro Drift', type: 'Electric', category: 'Special', power: 100, accuracy: 100, pp: 5, desc: 'Miraidon signature lightning charge.' },

  // Ice Moves
  IceShard: { name: 'Ice Shard', type: 'Ice', category: 'Physical', power: 40, accuracy: 100, pp: 30, priority: 1, desc: 'Fast flash of ice.' },
  IceBeam: { name: 'Ice Beam', type: 'Ice', category: 'Special', power: 90, accuracy: 100, pp: 10, effect: 'freeze', effectChance: 10, desc: 'May freeze the target.' },
  Blizzard: { name: 'Blizzard', type: 'Ice', category: 'Special', power: 110, accuracy: 70, pp: 5, effect: 'freeze', effectChance: 10, desc: 'A howling snowstorm.' },
  IcicleCrash: { name: 'Icicle Crash', type: 'Ice', category: 'Physical', power: 85, accuracy: 90, pp: 10, effect: 'flinch', effectChance: 30, desc: 'May cause flinching.' },
  GlaiveRush: { name: 'Glaive Rush', type: 'Dragon', category: 'Physical', power: 120, accuracy: 100, pp: 5, desc: 'Baxcalibur signature assault.' },

  // Fighting Moves
  MachPunch: { name: 'Mach Punch', type: 'Fighting', category: 'Physical', power: 40, accuracy: 100, pp: 30, priority: 1, desc: 'A punch thrown at supersonic speed.' },
  AuraSphere: { name: 'Aura Sphere', type: 'Fighting', category: 'Special', power: 80, accuracy: 100, pp: 20, neverMiss: true, desc: 'Aura blast that never misses.' },
  CloseCombat: { name: 'Close Combat', type: 'Fighting', category: 'Physical', power: 120, accuracy: 100, pp: 5, selfDebuff: { def: -1, spDef: -1 }, desc: 'Lowers user Def & Sp. Def.' },
  FocusBlast: { name: 'Focus Blast', type: 'Fighting', category: 'Special', power: 120, accuracy: 70, pp: 5, desc: 'Focuses power into a blast.' },
  CollisionCourse: { name: 'Collision Course', type: 'Fighting', category: 'Physical', power: 100, accuracy: 100, pp: 5, desc: 'Koraidon ancient strike.' },

  // Ground Moves
  MudSlap: { name: 'Mud-Slap', type: 'Ground', category: 'Special', power: 20, accuracy: 100, pp: 10, desc: 'Hurls mud in eyes.' },
  Earthquake: { name: 'Earthquake', type: 'Ground', category: 'Physical', power: 100, accuracy: 100, pp: 10, desc: 'Tremendous ground-shaking tremor.' },
  EarthPower: { name: 'Earth Power', type: 'Ground', category: 'Special', power: 90, accuracy: 100, pp: 10, effect: 'lowerSpDef', effectChance: 10, desc: 'Makes the earth erupt.' },
  PrecipiceBlades: { name: 'Precipice Blades', type: 'Ground', category: 'Physical', power: 120, accuracy: 85, pp: 10, desc: 'Groudon earthen blades.' },

  // Flying Moves
  Gust: { name: 'Gust', type: 'Flying', category: 'Special', power: 40, accuracy: 100, pp: 35, desc: 'Strikes with wings of wind.' },
  AirSlash: { name: 'Air Slash', type: 'Flying', category: 'Special', power: 75, accuracy: 95, pp: 15, effect: 'flinch', effectChance: 30, desc: 'Blade of air that may flinch.' },
  BraveBird: { name: 'Brave Bird', type: 'Flying', category: 'Physical', power: 120, accuracy: 100, pp: 15, recoil: 0.33, desc: 'Tucks wings and charges.' },
  DragonAscent: { name: 'Dragon Ascent', type: 'Flying', category: 'Physical', power: 120, accuracy: 100, pp: 5, selfDebuff: { def: -1, spDef: -1 }, desc: 'Rayquaza Mega ascension move.' },

  // Psychic Moves
  Confusion: { name: 'Confusion', type: 'Psychic', category: 'Special', power: 50, accuracy: 100, pp: 25, effect: 'confusion', effectChance: 10, desc: 'Telekinetic attack.' },
  Psychic: { name: 'Psychic', type: 'Psychic', category: 'Special', power: 90, accuracy: 100, pp: 10, effect: 'lowerSpDef', effectChance: 10, desc: 'Strong telekinetic force.' },
  Psystrike: { name: 'Psystrike', type: 'Psychic', category: 'Special', power: 100, accuracy: 100, pp: 10, desc: 'Mewtwo signature mind wave.' },

  // Ghost Moves
  ShadowBall: { name: 'Shadow Ball', type: 'Ghost', category: 'Special', power: 80, accuracy: 100, pp: 15, effect: 'lowerSpDef', effectChance: 20, desc: 'Hurls a shadowy blob.' },
  ShadowClaw: { name: 'Shadow Claw', type: 'Ghost', category: 'Physical', power: 70, accuracy: 100, pp: 15, critRate: 2, desc: 'Sharp shadow swipe.' },
  ShadowSneak: { name: 'Shadow Sneak', type: 'Ghost', category: 'Physical', power: 40, accuracy: 100, pp: 30, priority: 1, desc: 'Strikes from the shadows.' },
  MoongeistBeam: { name: 'Moongeist Beam', type: 'Ghost', category: 'Special', power: 100, accuracy: 100, pp: 5, desc: 'Lunala sinister moon beam.' },

  // Dragon Moves
  DragonBreath: { name: 'Dragon Breath', type: 'Dragon', category: 'Special', power: 60, accuracy: 100, pp: 20, effect: 'paralyze', effectChance: 30, desc: 'Exhales an ionized blast.' },
  DragonClaw: { name: 'Dragon Claw', type: 'Dragon', category: 'Physical', power: 80, accuracy: 100, pp: 15, desc: 'Slashes with huge claws.' },
  Outrage: { name: 'Outrage', type: 'Dragon', category: 'Physical', power: 120, accuracy: 100, pp: 10, desc: 'Rampages for immense damage.' },
  DracoMeteor: { name: 'Draco Meteor', type: 'Dragon', category: 'Special', power: 130, accuracy: 90, pp: 5, recoilSpAtk: -2, desc: 'Comets rain from the sky.' },
  RoarOfTime: { name: 'Roar of Time', type: 'Dragon', category: 'Special', power: 150, accuracy: 90, pp: 5, desc: 'Dialga distorts time itself.' },
  SpacialRend: { name: 'Spacial Rend', type: 'Dragon', category: 'Special', power: 100, accuracy: 95, pp: 5, critRate: 2, desc: 'Palkia tears space apart.' },

  // Steel Moves
  MetalClaw: { name: 'Metal Claw', type: 'Steel', category: 'Physical', power: 50, accuracy: 95, pp: 35, statBuff: { stat: 'atk', stages: 1, chance: 10 }, desc: 'Steel claws strike.' },
  IronHead: { name: 'Iron Head', type: 'Steel', category: 'Physical', power: 80, accuracy: 100, pp: 15, effect: 'flinch', effectChance: 30, desc: 'Hard headbutt.' },
  FlashCannon: { name: 'Flash Cannon', type: 'Steel', category: 'Special', power: 80, accuracy: 100, pp: 10, effect: 'lowerSpDef', effectChance: 10, desc: 'Gathers light to fire.' },
  BehemothBlade: { name: 'Behemoth Blade', type: 'Steel', category: 'Physical', power: 100, accuracy: 100, pp: 5, desc: 'Zacian legendary strike.' },
  GigatonHammer: { name: 'Gigaton Hammer', type: 'Steel', category: 'Physical', power: 160, accuracy: 100, pp: 5, desc: 'Tinkaton 100kg hammer slam.' },

  // Dark Moves
  Bite: { name: 'Bite', type: 'Dark', category: 'Physical', power: 60, accuracy: 100, pp: 25, effect: 'flinch', effectChance: 30, desc: 'Bites with vicious teeth.' },
  Crunch: { name: 'Crunch', type: 'Dark', category: 'Physical', power: 80, accuracy: 100, pp: 15, effect: 'lowerDef', effectChance: 20, desc: 'Crunches with sharp fangs.' },
  DarkPulse: { name: 'Dark Pulse', type: 'Dark', category: 'Special', power: 80, accuracy: 100, pp: 15, effect: 'flinch', effectChance: 20, desc: 'Horrible aura wave.' },
  NightSlash: { name: 'Night Slash', type: 'Dark', category: 'Physical', power: 70, accuracy: 100, pp: 15, critRate: 2, desc: 'Cuts instantly in darkness.' },
  WickedBlow: { name: 'Wicked Blow', type: 'Dark', category: 'Physical', power: 80, accuracy: 100, pp: 5, alwaysCrit: true, desc: 'Urshifu critical strike.' },

  // Fairy Moves
  DrainingKiss: { name: 'Draining Kiss', type: 'Fairy', category: 'Special', power: 50, accuracy: 100, pp: 10, drain: 0.75, desc: 'Drains energy with a kiss.' },
  DazzlingGleam: { name: 'Dazzling Gleam', type: 'Fairy', category: 'Special', power: 80, accuracy: 100, pp: 10, desc: 'Emits a powerful flash.' },
  Moonblast: { name: 'Moonblast', type: 'Fairy', category: 'Special', power: 95, accuracy: 100, pp: 15, effect: 'lowerSpAtk', effectChance: 30, desc: 'Draws power from moon.' },
  PlayRough: { name: 'Play Rough', type: 'Fairy', category: 'Physical', power: 90, accuracy: 90, pp: 10, effect: 'lowerAtk', effectChance: 10, desc: 'Rough-and-tumble attack.' },

  // Rock Moves
  RockThrow: { name: 'Rock Throw', type: 'Rock', category: 'Physical', power: 50, accuracy: 90, pp: 15, desc: 'Hurls small boulders.' },
  RockSlide: { name: 'Rock Slide', type: 'Rock', category: 'Physical', power: 75, accuracy: 90, pp: 10, effect: 'flinch', effectChance: 30, desc: 'Cascades large rocks.' },
  StoneEdge: { name: 'Stone Edge', type: 'Rock', category: 'Physical', power: 100, accuracy: 80, pp: 5, critRate: 2, desc: 'Stabs with sharp stones.' },

  // Poison Moves
  PoisonSting: { name: 'Poison Sting', type: 'Poison', category: 'Physical', power: 15, accuracy: 100, pp: 35, effect: 'poison', effectChance: 30, desc: 'May poison the foe.' },
  SludgeBomb: { name: 'Sludge Bomb', type: 'Poison', category: 'Special', power: 90, accuracy: 100, pp: 10, effect: 'poison', effectChance: 30, desc: 'Hurls toxic sludge.' },
  GunkShot: { name: 'Gunk Shot', type: 'Poison', category: 'Physical', power: 120, accuracy: 80, pp: 5, effect: 'poison', effectChance: 30, desc: 'Shoots filthy garbage.' },

  // Bug Moves
  BugBuzz: { name: 'Bug Buzz', type: 'Bug', category: 'Special', power: 90, accuracy: 100, pp: 10, effect: 'lowerSpDef', effectChance: 10, desc: 'Vibrates damaging sound.' },
  XScissor: { name: 'X-Scissor', type: 'Bug', category: 'Physical', power: 80, accuracy: 100, pp: 15, desc: 'Slashes with crossed scythes.' },

  // Status Buff / Recovery Moves
  SwordsDance: { name: 'Swords Dance', type: 'Normal', category: 'Status', power: 0, accuracy: 100, pp: 20, statBuff: { stat: 'atk', stages: 2 }, desc: 'Sharply raises user Attack.' },
  DragonDance: { name: 'Dragon Dance', type: 'Dragon', category: 'Status', power: 0, accuracy: 100, pp: 20, statBuff: { stat: 'atk', stages: 1, stat2: 'spd', stages2: 1 }, desc: 'Raises Attack and Speed.' },
  CalmMind: { name: 'Calm Mind', type: 'Psychic', category: 'Status', power: 0, accuracy: 100, pp: 20, statBuff: { stat: 'spAtk', stages: 1, stat2: 'spDef', stages2: 1 }, desc: 'Raises Sp. Atk & Sp. Def.' },
  Recover: { name: 'Recover', type: 'Normal', category: 'Status', power: 0, accuracy: 100, pp: 10, heal: 0.5, desc: 'Restores up to 50% max HP.' }
};

// Z-Move Definitions
export const Z_MOVES = {
  Normal: { name: 'Breakneck Blitz', power: 180, category: 'Special', desc: 'The user builds power and zooms full force.' },
  Fire: { name: 'Inferno Overdrive', power: 190, category: 'Special', desc: 'User summons a gigantic apocalyptic sun.' },
  Water: { name: 'Hydro Vortex', power: 185, category: 'Special', desc: 'Whirlpool vortex engulfs the target.' },
  Grass: { name: 'Bloom Doom', power: 190, category: 'Physical', desc: 'Forest flora blooms into catastrophic explosion.' },
  Electric: { name: 'Gigavolt Havoc', power: 185, category: 'Special', desc: 'Unleashes a torrential tempest of lightning.' },
  Ice: { name: 'Subzero Slammer', power: 185, category: 'Special', desc: 'Encases the target in colossal icebergs.' },
  Fighting: { name: 'All-Out Pummeling', power: 190, category: 'Physical', desc: 'A relentless barrage of 1,000 aura punches.' },
  Poison: { name: 'Acid Downpour', power: 180, category: 'Special', desc: 'A torrential rain of venom dissolves everything.' },
  Ground: { name: 'Tectonic Rage', power: 190, category: 'Physical', desc: 'Tectonic plates shatter into a canyon.' },
  Flying: { name: 'Supersonic Skystrike', power: 185, category: 'Physical', desc: 'Dives from high stratosphere at Mach 5.' },
  Psychic: { name: 'Shattered Psyche', power: 185, category: 'Special', desc: 'Psychic force crushes the battlefield.' },
  Bug: { name: 'Savage Spin-Out', power: 180, category: 'Physical', desc: 'Spun silk wraps and detonates the target.' },
  Rock: { name: 'Continental Crush', power: 190, category: 'Physical', desc: 'Crushes opponent beneath a titanic asteroid.' },
  Ghost: { name: 'Never-Ending Nightmare', power: 185, category: 'Special', desc: 'Spectral hands pull the foe into the abyss.' },
  Dragon: { name: 'Devastating Drake', power: 195, category: 'Special', desc: 'The primal spirit of dragonkind vaporizes the foe.' },
  Steel: { name: 'Corkscrew Crash', power: 190, category: 'Physical', desc: 'A diamond-hard steel drill pierces everything.' },
  Dark: { name: 'Black Hole Eclipse', power: 190, category: 'Special', desc: 'A supermassive black hole consumes all light.' },
  Fairy: { name: 'Twinkle Tackle', power: 185, category: 'Special', desc: 'Fairy starlight crashes down in radiant fury.' },
  // Ash's signature Z-Move
  SpecialPikachu: { name: '10,000,000 Volt Thunderbolt', power: 220, type: 'Electric', category: 'Special', critRate: 4, desc: 'Ash and Pikachu unleash seven colors of lightning!' }
};

// Max Moves & Signature Gigantamax Moves
export const MAX_MOVES = {
  Normal: { name: 'Max Strike', power: 130, effect: 'Lowers foe Speed' },
  Fire: { name: 'Max Flare', power: 140, effect: 'Summons harsh Sunlight' },
  Water: { name: 'Max Geyser', power: 140, effect: 'Summons heavy Rain' },
  Grass: { name: 'Max Overgrowth', power: 140, effect: 'Sets Grassy Terrain' },
  Electric: { name: 'Max Lightning', power: 140, effect: 'Sets Electric Terrain' },
  Ice: { name: 'Max Hailstorm', power: 140, effect: 'Summons Hail' },
  Fighting: { name: 'Max Knuckle', power: 100, effect: 'Raises user Attack' },
  Poison: { name: 'Max Ooze', power: 100, effect: 'Raises user Sp. Atk' },
  Ground: { name: 'Max Quake', power: 130, effect: 'Raises user Sp. Def' },
  Flying: { name: 'Max Airstream', power: 130, effect: 'Raises user Speed' },
  Psychic: { name: 'Max Mindstorm', power: 130, effect: 'Sets Psychic Terrain' },
  Bug: { name: 'Max Flutterby', power: 130, effect: 'Lowers foe Sp. Atk' },
  Rock: { name: 'Max Rockfall', power: 130, effect: 'Summons Sandstorm' },
  Ghost: { name: 'Max Phantasm', power: 130, effect: 'Lowers foe Defense' },
  Dragon: { name: 'Max Wyrmwind', power: 140, effect: 'Lowers foe Attack' },
  Steel: { name: 'Max Steelspike', power: 130, effect: 'Raises user Defense' },
  Dark: { name: 'Max Darkness', power: 130, effect: 'Lowers foe Sp. Def' },
  Fairy: { name: 'Max Starfall', power: 130, effect: 'Sets Misty Terrain' }
};

export const GMAX_MOVES = {
  Charizard: { name: 'G-Max Wildfire', type: 'Fire', power: 150, effect: 'Engulfs target in sea of flame' },
  Pikachu: { name: 'G-Max Volt Crash', type: 'Electric', power: 150, effect: 'Guaranteed Paralysis on all foes' },
  Gengar: { name: 'G-Max Terror', type: 'Ghost', power: 150, effect: 'Traps opponent in horrific nightmares' },
  Cinderace: { name: 'G-Max Fireball', type: 'Fire', power: 160, effect: 'Launches a gigantamax sun fireball' },
  Inteleon: { name: 'G-Max Hydrosnipe', type: 'Water', power: 160, effect: 'Sniper shot piercing all defenses' },
  Rillaboom: { name: 'G-Max Drum Solo', type: 'Grass', power: 160, effect: 'Drumbeats that shake tectonic plates' },
  Lapras: { name: 'G-Max Resonance', type: 'Ice', power: 140, effect: 'Sets Aurora Veil barrier' },
  Snorlax: { name: 'G-Max Replenish', type: 'Normal', power: 150, effect: 'Recycles berries and heals' },
  Machamp: { name: 'G-Max Chi Strike', type: 'Fighting', power: 140, effect: 'Dramatically raises critical hit ratio' },
  Urshifu: { name: 'G-Max One Blow', type: 'Dark', power: 160, effect: 'Bypasses Max Guard and Protect' }
};
