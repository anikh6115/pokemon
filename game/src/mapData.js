// Completely New Original Map: The Astraea Region
// 8 Interconnected Zones with Distinct Environments, NPCs, Shrines, and Warps

export const TILE_TYPES = {
  WALKABLE: 0,
  TALL_GRASS: 1,
  OBSTACLE_TREE: 2,
  OBSTACLE_WATER: 3,
  OBSTACLE_BUILDING: 4,
  DOOR_WARP: 5,
  LEGENDARY_SHRINE: 6,
  COUNTER: 7,
  FLOWER: 8,
  ICE_SNOW: 9
};

export const ZONES = {
  VERTEX_HAVEN: {
    id: 'VERTEX_HAVEN',
    name: 'Vertex Haven (WCS Headquarters)',
    theme: 'city',
    width: 20,
    height: 16,
    playerStart: { x: 10, y: 12 },
    // Map layout: 0=path, 1=grass, 2=trees, 3=water, 4=building, 5=warp, 6=shrine, 7=counter, 8=flower
    tiles: [
      [2,2,2,2,2,2,2,2,2,5,5,2,2,2,2,2,2,2,2,2], // row 0: top exit to Verdant Trail (x=9,10)
      [2,4,4,4,4,2,0,0,0,0,0,0,0,2,4,4,4,4,2,2], // row 1: Lab (left) & WCS Arena (right)
      [2,4,4,4,4,2,0,8,0,0,0,8,0,2,4,4,4,4,2,2],
      [2,4,5,4,4,2,0,0,0,0,0,0,0,2,4,5,4,4,2,2], // row 3: doors
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,8,0,8,0,0,2,2,2,2,0,0,0,8,0,8,0,0,2],
      [2,0,0,0,0,0,0,2,4,4,2,0,0,0,0,0,0,0,0,2],
      [2,4,4,4,4,2,0,2,4,5,2,0,2,4,4,4,4,2,0,2], // PokeCenter (middle)
      [2,4,4,4,4,2,0,0,0,0,0,0,2,4,4,4,4,2,0,2],
      [2,4,5,4,4,2,0,0,0,0,0,0,2,4,5,4,4,2,0,2], // PokeMart (right)
      [2,0,0,0,0,0,0,8,0,0,8,0,0,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
      [3,3,3,3,3,3,3,0,0,0,0,0,3,3,3,3,3,3,3,3], // ocean pier at south
      [3,3,3,3,3,3,3,0,0,0,0,0,3,3,3,3,3,3,3,3]
    ],
    warps: [
      { x: 9, y: 0, toZone: 'VERDANT_TRAIL', toX: 10, toY: 18 },
      { x: 10, y: 0, toZone: 'VERDANT_TRAIL', toX: 10, toY: 18 },
      { x: 2, y: 3, isSpecial: 'lab' },
      { x: 15, y: 3, isSpecial: 'wcs_bureau' },
      { x: 9, y: 7, isSpecial: 'pokecenter' }
    ],
    npcs: [
      {
        id: 'npc_prof_sakuragi',
        name: 'Prof. Sakuragi',
        x: 2, y: 4,
        dialogue: 'Welcome to Astraea! The World Coronation Series has registered fighters from every corner of the world. Pick your starter and claim Rank #1!'
      },
      {
        id: 'npc_rotom_drone',
        name: 'Rotom Drone (WCS Official)',
        x: 14, y: 4,
        dialogue: 'Bzzzt! Welcome challenger! I track the global ranking board. Win matches across Astraea to climb from Rank #10,000 to the Master Class!'
      },
      {
        id: 'npc_nurse_joy',
        name: 'Nurse Joy',
        x: 8, y: 7,
        isNurse: true,
        dialogue: 'Welcome to the Pokémon Center! Let me heal your team back to full vitality!'
      },
      {
        id: 'npc_wcs_rep',
        name: 'WCS Coach Dan',
        x: 7, y: 11,
        dialogue: 'Head north along Verdant Trail to find registered Normal Class challengers! The faster you defeat them, the faster your rank skyrockets!'
      }
    ],
    wildEncounters: []
  },

  POKECENTER_INTERIOR: {
    id: 'POKECENTER_INTERIOR',
    name: 'Pokémon Center',
    theme: 'city',
    width: 12,
    height: 10,
    playerStart: { x: 6, y: 8 },
    tiles: [
      [4,4,4,4,4,4,4,4,4,4,4,4],
      [4,0,0,0,0,0,0,0,0,0,0,4],
      [4,0,7,7,7,0,0,0,7,7,0,4],
      [4,0,0,0,0,0,0,0,0,0,0,4],
      [4,0,0,0,0,0,0,0,0,0,0,4],
      [4,0,0,0,0,0,0,0,0,0,0,4],
      [4,0,0,0,0,0,0,0,0,0,0,4],
      [4,0,0,0,0,0,0,0,0,0,0,4],
      [4,4,4,4,4,5,5,4,4,4,4,4],
      [4,4,4,4,4,4,4,4,4,4,4,4]
    ],
    warps: [{ x: 5, y: 8, isSpecial: 'pokecenter_exit' }, { x: 6, y: 8, isSpecial: 'pokecenter_exit' }],
    npcs: [
      { id: 'nurse_joy_interior', name: 'Nurse Joy', x: 3, y: 2, isNurse: true, dialogue: 'Welcome to the Pokémon Center! I will restore your party to full health.' },
      { id: 'pc_terminal', name: 'Pokémon Storage PC', x: 9, y: 2, isPc: true, dialogue: 'A familiar PC hums quietly. Access Pokémon Storage?' }
    ],
    wildEncounters: []
  },

  BUILDING_INTERIOR: {
    id: 'BUILDING_INTERIOR',
    name: 'Astraea Building',
    theme: 'city',
    width: 10,
    height: 8,
    playerStart: { x: 5, y: 6 },
    tiles: [
      [4,4,4,4,4,4,4,4,4,4],
      [4,0,0,0,0,0,0,0,0,4],
      [4,0,7,7,7,7,7,7,0,4],
      [4,0,0,0,0,0,0,0,0,4],
      [4,0,0,0,0,0,0,0,0,4],
      [4,0,0,0,0,0,0,0,0,4],
      [4,4,4,4,5,5,4,4,4,4],
      [4,4,4,4,4,4,4,4,4,4]
    ],
    warps: [{ x: 4, y: 6, isSpecial: 'building_exit' }, { x: 5, y: 6, isSpecial: 'building_exit' }],
    npcs: [{ id: 'indoor_resident', name: 'Resident', x: 5, y: 3, dialogue: 'Welcome inside. Buildings across Astraea are open for exploration.' }],
    wildEncounters: []
  },

  VERDANT_TRAIL: {
    id: 'VERDANT_TRAIL',
    name: 'Verdant Trail (Route 1)',
    theme: 'route',
    width: 20,
    height: 20,
    playerStart: { x: 10, y: 18 },
    tiles: [
      [2,2,2,2,2,2,2,2,2,5,5,2,2,2,2,2,2,2,2,2], // row 0: north exit to Cobalt Bay
      [2,1,1,1,2,0,0,0,0,0,0,0,0,0,2,1,1,1,1,2],
      [2,1,1,1,2,0,0,0,0,0,0,0,0,0,2,1,1,1,1,2],
      [2,1,1,1,0,0,0,2,2,0,0,2,2,0,0,1,1,1,1,2],
      [2,0,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,2],
      [2,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,2],
      [2,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,2],
      [2,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,2],
      [2,0,0,1,1,1,0,0,2,2,2,0,0,0,1,1,1,0,0,2],
      [2,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,2],
      [2,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,2],
      [2,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,2],
      [2,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,2],
      [2,0,1,1,1,0,0,2,0,0,0,0,2,0,0,1,1,1,0,2],
      [2,0,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2],
      [2,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,2],
      [2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2], // row 18: south entrance from Vertex Haven
      [2,2,2,2,2,2,2,2,2,5,5,2,2,2,2,2,2,2,2,2]  // row 19
    ],
    warps: [
      { x: 9, y: 19, toZone: 'VERTEX_HAVEN', toX: 10, toY: 1 },
      { x: 10, y: 19, toZone: 'VERTEX_HAVEN', toX: 10, toY: 1 },
      { x: 9, y: 0, toZone: 'COBALT_BAY', toX: 10, toY: 18 },
      { x: 10, y: 0, toZone: 'COBALT_BAY', toX: 10, toY: 18 }
    ],
    npcs: [
      {
        id: 'npc_oliver',
        name: 'Oliver (WCS Rank #9,240)',
        x: 6, y: 10,
        isWcsTrainer: true,
        wcsId: 'wcs_norm_1',
        dialogue: 'A battle request from Rotom Phone! Let’s have our Normal Class match!'
      },
      {
        id: 'npc_visquez',
        name: 'Visquez (WCS Rank #5,120)',
        x: 13, y: 5,
        isWcsTrainer: true,
        wcsId: 'wcs_norm_2',
        dialogue: 'I am the representative for Vermilion Gym! Are you ready for electric speed?'
      }
    ],
    wildEncounters: [
      { species: 'rookidee', minLvl: 3, maxLvl: 6, weight: 30 },
      { species: 'shinx', minLvl: 3, maxLvl: 6, weight: 30 },
      { species: 'ralts', minLvl: 4, maxLvl: 7, weight: 20 },
      { species: 'pikachu', minLvl: 5, maxLvl: 8, weight: 10 },
      { species: 'eevee', minLvl: 5, maxLvl: 8, weight: 10 }
    ]
  },

  COBALT_BAY: {
    id: 'COBALT_BAY',
    name: 'Cobalt Bay & Seaside Arena',
    theme: 'water',
    width: 20,
    height: 20,
    playerStart: { x: 10, y: 18 },
    tiles: [
      [2,2,2,2,2,2,2,2,2,5,5,2,2,2,2,2,2,2,2,2], // row 0: north to Cinder Caldera
      [3,3,3,3,3,3,3,0,0,0,0,0,0,2,4,4,4,4,2,2],
      [3,3,3,3,3,3,3,0,0,0,0,0,0,2,4,5,4,4,2,2], // row 2: Seaside Arena (Bea)
      [3,3,6,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,2], // row 3, col 2: Sunken Genetic Lab Shrine!
      [3,3,3,3,3,3,0,0,0,2,2,0,0,0,0,0,0,0,0,2],
      [3,3,3,3,3,0,0,0,0,2,2,0,0,0,4,4,4,4,0,2], // row 5: PokeCenter
      [3,3,3,3,0,0,0,0,0,0,0,0,0,0,4,5,4,4,0,2],
      [3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [3,3,0,0,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,2],
      [3,3,0,0,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,2],
      [3,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,2],
      [3,0,0,0,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,2],
      [3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3],
      [3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3],
      [3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3],
      [3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,3,3,3,3,3],
      [2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2],
      [2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2],
      [2,2,2,2,2,2,2,2,2,5,5,2,2,2,2,2,2,2,2,2]
    ],
    warps: [
      { x: 9, y: 19, toZone: 'VERDANT_TRAIL', toX: 10, toY: 1 },
      { x: 10, y: 19, toZone: 'VERDANT_TRAIL', toX: 10, toY: 1 },
      { x: 9, y: 0, toZone: 'CINDER_CALDERA', toX: 10, toY: 18 },
      { x: 10, y: 0, toZone: 'CINDER_CALDERA', toX: 10, toY: 18 },
      { x: 2, y: 3, isSpecial: 'event_mewtwo' } // Mewtwo Event portal
    ],
    npcs: [
      {
        id: 'npc_tony',
        name: 'Tony (WCS Rank #1,850)',
        x: 8, y: 12,
        isWcsTrainer: true,
        wcsId: 'wcs_norm_3',
        dialogue: 'Win here, and I get promoted to Great Class! I won’t hold back!'
      },
      {
        id: 'npc_bea',
        name: 'Bea (Great Class Promotion)',
        x: 15, y: 4,
        isWcsTrainer: true,
        wcsId: 'wcs_great_promo',
        dialogue: 'Discipline and absolute strength. Prove your power to enter the Great Class!'
      },
      {
        id: 'npc_nurse_joy_cobalt',
        name: 'Nurse Joy',
        x: 15, y: 7,
        isNurse: true,
        dialogue: 'Welcome to Cobalt Bay Pokémon Center! Let me heal your exhausted team!'
      },
      {
        id: 'npc_mewtwo_diver',
        name: 'Deep Sea Explorer',
        x: 3, y: 4,
        dialogue: 'The glowing vortex at (2, 3) leads to the sunken lab where Mewtwo and Mew dwell!'
      }
    ],
    wildEncounters: [
      { species: 'squirtle', minLvl: 12, maxLvl: 16, weight: 20 },
      { species: 'froakie', minLvl: 12, maxLvl: 16, weight: 20 },
      { species: 'gyarados', minLvl: 18, maxLvl: 22, weight: 15 },
      { species: 'dratini', minLvl: 14, maxLvl: 18, weight: 25 },
      { species: 'totodile', minLvl: 12, maxLvl: 16, weight: 20 }
    ]
  },

  CINDER_CALDERA: {
    id: 'CINDER_CALDERA',
    name: 'Cinder Caldera & Amber Crags',
    theme: 'fire',
    width: 20,
    height: 20,
    playerStart: { x: 10, y: 18 },
    tiles: [
      [2,2,2,2,2,2,2,2,2,5,5,2,2,2,2,2,2,2,2,2], // north to Whispering Gloom
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,2], // col 17, row 1: Sky Pillar Shrine (Rayquaza)
      [2,0,4,4,4,4,2,0,0,0,0,0,0,2,4,4,4,4,0,2], // Mega Sanctuary (Korrina)
      [2,0,4,5,4,4,2,0,0,0,0,0,0,2,4,4,4,4,0,2],
      [2,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,2],
      [2,1,1,1,0,0,0,0,2,2,0,0,0,0,1,1,1,0,0,2],
      [2,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,0,2],
      [2,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,2],
      [2,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,2],
      [2,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,2],
      [2,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,0,2],
      [2,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2],
      [2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2],
      [2,2,2,2,2,2,2,2,2,5,5,2,2,2,2,2,2,2,2,2]
    ],
    warps: [
      { x: 9, y: 19, toZone: 'COBALT_BAY', toX: 10, toY: 1 },
      { x: 10, y: 19, toZone: 'COBALT_BAY', toX: 10, toY: 1 },
      { x: 9, y: 0, toZone: 'WHISPERING_GLOOM', toX: 10, toY: 18 },
      { x: 10, y: 0, toZone: 'WHISPERING_GLOOM', toX: 10, toY: 18 },
      { x: 17, y: 1, isSpecial: 'event_rayquaza' } // Rayquaza Event portal
    ],
    npcs: [
      {
        id: 'npc_nurse_joy_cinder',
        name: 'Nurse Joy',
        x: 3, y: 4,
        isNurse: true,
        dialogue: 'Welcome to the Caldera Recovery Station! Let me soothe your battle fatigue!'
      },
      {
        id: 'npc_korrina',
        name: 'Korrina & Mega Lucario (Rank #480)',
        x: 4, y: 4,
        isWcsTrainer: true,
        wcsId: 'wcs_great_1',
        dialogue: 'Our bond burns hotter than magma! Defeat me to awaken the power of Mega Evolution!'
      },
      {
        id: 'npc_volkner',
        name: 'Volkner (Rank #180)',
        x: 12, y: 9,
        isWcsTrainer: true,
        wcsId: 'wcs_great_2',
        dialogue: 'I was looking for a battle that would shock me out of boredom. Let’s go!'
      }
    ],
    wildEncounters: [
      { species: 'charmander', minLvl: 22, maxLvl: 26, weight: 20 },
      { species: 'torchic', minLvl: 22, maxLvl: 26, weight: 20 },
      { species: 'larvitar', minLvl: 24, maxLvl: 28, weight: 25 },
      { species: 'cyndaquil', minLvl: 22, maxLvl: 26, weight: 20 },
      { species: 'gible', minLvl: 25, maxLvl: 30, weight: 15 }
    ]
  },

  WHISPERING_GLOOM: {
    id: 'WHISPERING_GLOOM',
    name: 'Whispering Gloom & Shadow Ruins',
    theme: 'ghost',
    width: 20,
    height: 20,
    playerStart: { x: 10, y: 18 },
    tiles: [
      [2,2,2,2,2,2,2,2,2,5,5,2,2,2,2,2,2,2,2,2], // north to Glacier Peak
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,2], // col 2: Dimensional Rift (Giratina/Arceus), col 16: Z-Ring Altar
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,1,1,1,0,0,0,0,2,2,0,0,0,0,1,1,1,0,0,2],
      [2,1,1,1,1,0,0,0,2,2,0,0,0,1,1,1,1,1,0,2],
      [2,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,2],
      [2,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,2],
      [2,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,2],
      [2,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,0,2],
      [2,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2],
      [2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2],
      [2,2,2,2,2,2,2,2,2,5,5,2,2,2,2,2,2,2,2,2],
      [2,2,2,2,2,2,2,2,2,5,5,2,2,2,2,2,2,2,2,2]
    ],
    warps: [
      { x: 9, y: 19, toZone: 'CINDER_CALDERA', toX: 10, toY: 1 },
      { x: 10, y: 19, toZone: 'CINDER_CALDERA', toX: 10, toY: 1 },
      { x: 9, y: 0, toZone: 'GLACIER_PEAK', toX: 10, toY: 18 },
      { x: 10, y: 0, toZone: 'GLACIER_PEAK', toX: 10, toY: 18 },
      { x: 2, y: 2, isSpecial: 'event_creation_trio' } // Giratina/Dialga/Palkia/Arceus Rift
    ],
    npcs: [
      {
        id: 'npc_paul',
        name: 'Paul (WCS Rank #45)',
        x: 10, y: 9,
        isWcsTrainer: true,
        wcsId: 'wcs_ultra_1',
        dialogue: 'Only ruthless strategy survives. Let’s see if your training holds up in Ultra Class!'
      },
      {
        id: 'npc_zring_guardian',
        name: 'Altar Keeper',
        x: 15, y: 2,
        dialogue: 'The ancient Z-Ring draws power from the cosmos. Master it, and unleash devastating Z-Moves!'
      }
    ],
    wildEncounters: [
      { species: 'gengar', minLvl: 38, maxLvl: 44, weight: 25 },
      { species: 'rowlet', minLvl: 35, maxLvl: 40, weight: 20 },
      { species: 'litten', minLvl: 35, maxLvl: 40, weight: 20 },
      { species: 'lucario', minLvl: 40, maxLvl: 45, weight: 20 },
      { species: 'tinkaton', minLvl: 40, maxLvl: 46, weight: 15 }
    ]
  },

  GLACIER_PEAK: {
    id: 'GLACIER_PEAK',
    name: 'Glacier Peak & Frost Caverns',
    theme: 'ice',
    width: 20,
    height: 20,
    playerStart: { x: 10, y: 18 },
    tiles: [
      [2,2,2,2,2,2,2,2,2,5,5,2,2,2,2,2,2,2,2,2], // north to Wyrmrest Plateau
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,2], // col 9, row 2: Celestial Altar (Solgaleo / Lunala)
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,9,9,9,0,0,0,0,2,2,0,0,0,0,9,9,9,0,0,2],
      [2,9,9,9,9,0,0,0,2,2,0,0,0,9,9,9,9,9,0,2],
      [2,9,9,9,9,9,0,0,0,0,0,0,9,9,9,9,9,9,0,2],
      [2,0,9,9,9,0,0,0,0,0,0,0,0,9,9,9,9,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,9,9,9,0,0,0,0,0,0,0,0,0,0,0,9,9,9,0,2],
      [2,9,9,9,9,0,0,0,0,0,0,0,0,0,9,9,9,9,0,2],
      [2,9,9,9,9,9,0,0,0,0,0,0,0,9,9,9,9,9,0,2],
      [2,0,9,9,9,0,0,0,0,0,0,0,0,0,9,9,9,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2],
      [2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2],
      [2,2,2,2,2,2,2,2,2,5,5,2,2,2,2,2,2,2,2,2],
      [2,2,2,2,2,2,2,2,2,5,5,2,2,2,2,2,2,2,2,2]
    ],
    warps: [
      { x: 9, y: 19, toZone: 'WHISPERING_GLOOM', toX: 10, toY: 1 },
      { x: 10, y: 19, toZone: 'WHISPERING_GLOOM', toX: 10, toY: 1 },
      { x: 9, y: 0, toZone: 'WYRMREST_PLATEAU', toX: 10, toY: 18 },
      { x: 10, y: 0, toZone: 'WYRMREST_PLATEAU', toX: 10, toY: 18 },
      { x: 9, y: 2, isSpecial: 'event_celestial_altar' } // Solgaleo / Lunala Event portal
    ],
    npcs: [
      {
        id: 'npc_nurse_joy_glacier',
        name: 'Nurse Joy',
        x: 4, y: 3,
        isNurse: true,
        dialogue: 'Welcome to the Frost Peak Shelter! Let me warm up and heal your Pokémon!'
      },
      {
        id: 'npc_marnie',
        name: 'Marnie (WCS Rank #15)',
        x: 10, y: 8,
        isWcsTrainer: true,
        wcsId: 'wcs_ultra_2',
        dialogue: 'Win here, and you qualify for the Masters Eight Tournament at Apex Stadium!'
      }
    ],
    wildEncounters: [
      { species: 'baxcalibur', minLvl: 46, maxLvl: 52, weight: 25 },
      { species: 'blastoise', minLvl: 45, maxLvl: 50, weight: 25 },
      { species: 'corviknight', minLvl: 45, maxLvl: 50, weight: 25 },
      { species: 'empoleon', minLvl: 45, maxLvl: 50, weight: 25 }
    ]
  },

  WYRMREST_PLATEAU: {
    id: 'WYRMREST_PLATEAU',
    name: 'Wyrmrest Plateau & Dynamax Wellspring',
    theme: 'dragon',
    width: 20,
    height: 20,
    playerStart: { x: 10, y: 18 },
    tiles: [
      [2,2,2,2,2,2,2,2,2,5,5,2,2,2,2,2,2,2,2,2], // north to The Apex Stadium!
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,2], // col 2: Slumbering Weald (Zacian/Zamazenta), col 16: Zero Crater (Koraidon/Miraidon)
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,1,1,1,0,0,0,0,2,2,0,0,0,0,1,1,1,0,0,2],
      [2,1,1,1,1,0,0,0,2,2,0,0,0,1,1,1,1,1,0,2],
      [2,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,2],
      [2,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,2],
      [2,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,2],
      [2,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,0,2],
      [2,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2],
      [2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2],
      [2,2,2,2,2,2,2,2,2,5,5,2,2,2,2,2,2,2,2,2],
      [2,2,2,2,2,2,2,2,2,5,5,2,2,2,2,2,2,2,2,2]
    ],
    warps: [
      { x: 9, y: 19, toZone: 'GLACIER_PEAK', toX: 10, toY: 1 },
      { x: 10, y: 19, toZone: 'GLACIER_PEAK', toX: 10, toY: 1 },
      { x: 9, y: 0, toZone: 'APEX_STADIUM', toX: 10, toY: 18 },
      { x: 10, y: 0, toZone: 'APEX_STADIUM', toX: 10, toY: 18 },
      { x: 2, y: 2, isSpecial: 'event_galar_heroes' }, // Zacian / Zamazenta
      { x: 16, y: 2, isSpecial: 'event_paradox_titans' } // Koraidon / Miraidon
    ],
    npcs: [
      {
        id: 'npc_raihan',
        name: 'Raihan (WCS Rank #99 - Ultra Promo)',
        x: 10, y: 8,
        isWcsTrainer: true,
        wcsId: 'wcs_ultra_promo',
        dialogue: 'Time for a pre-match selfie! Let’s unleash the crimson energy of Dynamax!'
      }
    ],
    wildEncounters: [
      { species: 'dragapult', minLvl: 55, maxLvl: 62, weight: 25 },
      { species: 'garchomp', minLvl: 55, maxLvl: 62, weight: 25 },
      { species: 'dragonite', minLvl: 55, maxLvl: 62, weight: 25 },
      { species: 'tyranitar', minLvl: 55, maxLvl: 62, weight: 25 }
    ]
  },

  APEX_STADIUM: {
    id: 'APEX_STADIUM',
    name: 'The Apex Stadium (The Masters Eight)',
    theme: 'stadium',
    width: 20,
    height: 20,
    playerStart: { x: 10, y: 18 },
    tiles: [
      [2,2,2,2,2,2,2,2,2,6,6,2,2,2,2,2,2,2,2,2], // row 0: Legendary Continuum Shrine (Arceus / Tao)
      [2,4,4,4,4,4,4,4,4,0,0,4,4,4,4,4,4,4,4,2],
      [2,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2],
      [2,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2],
      [2,4,0,0,2,2,2,0,0,0,0,0,0,2,2,2,0,0,4,2],
      [2,4,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,4,2],
      [2,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2],
      [2,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2],
      [2,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2],
      [2,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2],
      [2,4,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,4,2],
      [2,4,0,0,2,2,2,0,0,0,0,0,0,2,2,2,0,0,4,2],
      [2,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2],
      [2,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,2],
      [2,4,4,4,4,4,4,0,0,0,0,0,0,4,4,4,4,4,4,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
      [2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2],
      [2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2],
      [2,2,2,2,2,2,2,2,2,5,5,2,2,2,2,2,2,2,2,2]
    ],
    warps: [
      { x: 9, y: 19, toZone: 'WYRMREST_PLATEAU', toX: 10, toY: 1 },
      { x: 10, y: 19, toZone: 'WYRMREST_PLATEAU', toX: 10, toY: 1 },
      { x: 9, y: 0, isSpecial: 'event_tao_titans' },
      { x: 10, y: 0, isSpecial: 'event_tao_titans' }
    ],
    npcs: [
      {
        id: 'npc_nurse_joy_stadium',
        name: 'Nurse Joy (Official WCS Medical Chief)',
        x: 3, y: 15,
        isNurse: true,
        dialogue: 'Welcome to the Masters Eight Medical Center! We keep champions in top shape!'
      },
      {
        id: 'npc_master_official',
        name: 'Masters Eight Head Official',
        x: 10, y: 15,
        dialogue: 'Welcome to the Masters Eight Tournament! Step forward into the arena to challenge the greatest champions on Earth!'
      },
      {
        id: 'npc_alain',
        name: 'Alain (Rank #8)',
        x: 5, y: 10,
        isWcsTrainer: true,
        wcsId: 'wcs_master_8',
        dialogue: 'Match 1 of the Masters Eight. My Mega Charizard X and I won’t hold back!'
      },
      {
        id: 'npc_iris',
        name: 'Champion Iris (Rank #7)',
        x: 14, y: 10,
        isWcsTrainer: true,
        wcsId: 'wcs_master_7',
        dialogue: 'Unova Champion Iris! Let’s dance with dragons!'
      },
      {
        id: 'npc_diantha',
        name: 'Grand Champion Diantha (Rank #6)',
        x: 6, y: 8,
        isWcsTrainer: true,
        wcsId: 'wcs_master_6',
        dialogue: 'Kalos Champion Diantha. May our battle be a masterpiece!'
      },
      {
        id: 'npc_lance',
        name: 'Champion Lance (Rank #5)',
        x: 13, y: 8,
        isWcsTrainer: true,
        wcsId: 'wcs_master_5',
        dialogue: 'The invincible might of dragons! Red Gyarados, strike!'
      },
      {
        id: 'npc_steven',
        name: 'Champion Steven (Rank #4)',
        x: 7, y: 6,
        isWcsTrainer: true,
        wcsId: 'wcs_master_4',
        dialogue: 'Hoenn Champion Steven Stone. Witness the ultimate shine of steel!'
      },
      {
        id: 'npc_cynthia',
        name: 'Champion Cynthia (Rank #3)',
        x: 12, y: 6,
        isWcsTrainer: true,
        wcsId: 'wcs_master_3',
        dialogue: 'Sinnoh Champion Cynthia. Garchomp and I are thrilled to battle you!'
      },
      {
        id: 'npc_ash',
        name: 'Ash Ketchum (Rank #2)',
        x: 9, y: 4,
        isWcsTrainer: true,
        wcsId: 'wcs_master_2',
        dialogue: 'Pikachu and I are going full power! 10,000,000 Volt Thunderbolt, Mega Lucario, G-Max Gengar! LET’S BATTLE!'
      },
      {
        id: 'npc_leon',
        name: 'Monarch Leon (Rank #1)',
        x: 10, y: 3,
        isWcsTrainer: true,
        wcsId: 'wcs_master_1',
        dialogue: 'IT’S CHAMPION TIME! Let’s give the entire world the greatest battle in history!'
      }
    ],
    wildEncounters: []
  }
};

export const NEAREST_POKECENTER = {
  VERTEX_HAVEN: { zone: 'VERTEX_HAVEN', x: 8, y: 8, name: 'Vertex Haven Central Center' },
  VERDANT_TRAIL: { zone: 'VERTEX_HAVEN', x: 8, y: 8, name: 'Vertex Haven Central Center' },
  COBALT_BAY: { zone: 'COBALT_BAY', x: 15, y: 8, name: 'Cobalt Bay Harbor Center' },
  CINDER_CALDERA: { zone: 'CINDER_CALDERA', x: 3, y: 5, name: 'Caldera Recovery Station' },
  WHISPERING_GLOOM: { zone: 'CINDER_CALDERA', x: 3, y: 5, name: 'Caldera Recovery Station' },
  GLACIER_PEAK: { zone: 'GLACIER_PEAK', x: 4, y: 4, name: 'Frost Peak Shelter' },
  WYRMREST_PLATEAU: { zone: 'APEX_STADIUM', x: 3, y: 16, name: 'Apex Stadium Medical Center' },
  APEX_STADIUM: { zone: 'APEX_STADIUM', x: 3, y: 16, name: 'Apex Stadium Medical Center' }
};
