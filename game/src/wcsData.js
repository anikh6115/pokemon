// World Coronation Series (WCS) Data
// Storyline from Rank #10,000 to Rank #1 (The World Monarch)

export const WCS_TIERS = {
  NORMAL: { name: 'Normal Class', minRank: 10001, maxRank: 1001, color: '#9E9E9E' },
  GREAT: { name: 'Great Class', minRank: 1000, maxRank: 101, color: '#2196F3' },
  ULTRA: { name: 'Ultra Class', minRank: 100, maxRank: 9, color: '#9C27B0' },
  MASTER: { name: 'Master Class (Masters Eight)', minRank: 8, maxRank: 1, color: '#FFD700' }
};

export const WCS_OPPONENTS = [
  // === NORMAL CLASS (Ranks 10,000 - 1,001) ===
  {
    id: 'wcs_norm_1',
    name: 'Oliver (Rookie Challenger)',
    tier: 'Normal Class',
    rank: 9240,
    location: 'Verdant Trail',
    dialogue: 'Welcome to the World Coronation Series! Let’s see what your partner can do!',
    victoryDialogue: 'Incredible speed! Rotom Drone, register the results!',
    rankReward: 1500, // New rank: ~7,740
    team: [
      { species: 'rookidee', level: 8 },
      { species: 'shinx', level: 9 }
    ]
  },
  {
    id: 'wcs_norm_2',
    name: 'Visquez (Vermilion Gym Emissary)',
    tier: 'Normal Class',
    rank: 5120,
    location: 'Verdant Trail Outpost',
    dialogue: 'I represent the Vermilion Gym! Feel the thunderous power of electric types!',
    victoryDialogue: 'Electrifying battle! You are climbing the ladder swiftly!',
    rankReward: 2600, // New rank: ~2,520
    team: [
      { species: 'pikachu', level: 16 },
      { species: 'corvisquire', level: 17 }
    ]
  },
  {
    id: 'wcs_norm_3',
    name: 'Tony (Unova Ace)',
    tier: 'Normal Class',
    rank: 1850,
    location: 'Cobalt Bay Harbor',
    dialogue: 'Win here, and I get promoted to Great Class! I won’t hold back!',
    victoryDialogue: 'You completely outmaneuvered me! Take that Great Class ticket!',
    rankReward: 850, // Rank climbs to 1,000 (Great Class trigger)
    team: [
      { species: 'croconaw', level: 23 },
      { species: 'larvitar', level: 24 }
    ]
  },

  // === GREAT CLASS PROMOTION & BATTLES (Ranks 1,000 - 101) ===
  {
    id: 'wcs_great_promo',
    name: 'Bea (Galar Martial Prodigy)',
    tier: 'Great Class Promotion Match',
    rank: 999,
    location: 'Cobalt Bay Seaside Arena',
    isPromotion: true,
    dialogue: 'Discipline and absolute strength. That is how we fight. Show me your determination!',
    victoryDialogue: 'You and your Pokémon have exceptional spirit. Welcome to the Great Class!',
    rankReward: 350, // Rank drops to 649
    team: [
      { species: 'machamp', level: 29, canGmax: true },
      { species: 'quaquaval', level: 30 }
    ]
  },
  {
    id: 'wcs_great_1',
    name: 'Korrina & Mega Lucario',
    tier: 'Great Class',
    rank: 480,
    location: 'Cinder Caldera Sanctuary',
    dialogue: 'Our bond burns hotter than volcanic magma! Witness our Mega Evolution!',
    victoryDialogue: 'Your bond with your partner resonated so brightly! Here, take this Mega Ring!',
    rankReward: 260, // Rank drops to 220
    unlocksMega: true,
    team: [
      { species: 'lucario', level: 36, megaEvolve: true },
      { species: 'blaziken', level: 35 }
    ]
  },
  {
    id: 'wcs_great_2',
    name: 'Volkner (Sunyshore Luminary)',
    tier: 'Great Class',
    rank: 180,
    location: 'Amber Crags',
    dialogue: 'I was looking for a battle that would shock me out of boredom. Don’t disappoint me!',
    victoryDialogue: 'Now that was a real blackout of a fight! Ultra Class awaits you!',
    rankReward: 80, // Rank drops to 100 (Ultra Class trigger)
    team: [
      { species: 'luxray', level: 42 },
      { species: 'metagross', level: 43 }
    ]
  },

  // === ULTRA CLASS PROMOTION & BATTLES (Ranks 100 - 9) ===
  {
    id: 'wcs_ultra_promo',
    name: 'Raihan (Hammerlocke Dragon Master)',
    tier: 'Ultra Class Promotion Match',
    rank: 99,
    location: 'Wyrmrest Plateau Wellspring',
    isPromotion: true,
    dialogue: 'Time for a pre-match selfie! I will blow you away with my G-Max Duraludon storm!',
    victoryDialogue: 'Argh, snapped right at the finish line! You earned your spot in Ultra Class!',
    rankReward: 45, // Rank drops to 54
    unlocksDynamax: true,
    team: [
      { species: 'dragonite', level: 48 },
      { species: 'garchomp', level: 49 },
      { species: 'charizard', level: 50, canGmax: true }
    ]
  },
  {
    id: 'wcs_ultra_1',
    name: 'Paul (Sinnoh Tactician)',
    tier: 'Ultra Class',
    rank: 45,
    location: 'Whispering Gloom Monoliths',
    dialogue: 'Only ruthless strategy and true power survive. Let’s see if your training holds up.',
    victoryDialogue: 'Hmph. You’ve refined your Pokémon’s potential far beyond what I expected.',
    rankReward: 25, // Rank drops to 20
    unlocksZRing: true,
    team: [
      { species: 'gengar', level: 54, canGmax: true },
      { species: 'metagross', level: 55 },
      { species: 'tyranitar', level: 55, megaEvolve: true }
    ]
  },
  {
    id: 'wcs_ultra_2',
    name: 'Marnie & G-Max Grimmsnarl',
    tier: 'Ultra Class',
    rank: 15,
    location: 'Frost Caverns Gate',
    dialogue: 'Team Yell is cheering us on! Spikemuth pride never backs down!',
    victoryDialogue: 'You really got everyone screaming! Go take on the Masters Eight!',
    rankReward: 7, // Rank drops to 8 (Master Class Tournament unlocked!)
    team: [
      { species: 'tinkaton', level: 58 },
      { species: 'baxcalibur', level: 59 },
      { species: 'gengar', level: 60, canGmax: true }
    ]
  },

  // === THE MASTERS EIGHT TOURNAMENT (Ranks 8 to 1) ===
  {
    id: 'wcs_master_8',
    name: 'Alain (Kalos League Champion)',
    tier: 'Master Class - Match 1',
    rank: 8,
    location: 'Apex Stadium - Round of 8',
    dialogue: 'To protect what is precious, my Mega Charizard X and I will burn everything to ash!',
    victoryDialogue: 'An overwhelming clash... Advance to the next round with pride!',
    rankReward: 1, // Advance to Rank 7
    team: [
      { species: 'chesnaught', level: 65 },
      { species: 'tyranitar', level: 65 },
      { species: 'charizard', level: 67, megaEvolve: true }
    ]
  },
  {
    id: 'wcs_master_7',
    name: 'Iris (Unova Champion)',
    tier: 'Master Class - Match 2',
    rank: 7,
    location: 'Apex Stadium - Round of 8',
    dialogue: 'I can hear the voices of the dragons crying out! Let’s soar to the heavens together!',
    victoryDialogue: 'What pure dragon heart! You were incredible!',
    rankReward: 1, // Advance to Rank 6
    team: [
      { species: 'dragonite', level: 67 },
      { species: 'garchomp', level: 68 },
      { species: 'haxorus', level: 69 }
    ]
  },
  {
    id: 'wcs_master_6',
    name: 'Diantha (Kalos Grand Champion)',
    tier: 'Master Class - Match 3',
    rank: 6,
    location: 'Apex Stadium - Quarter-Finals',
    dialogue: 'A Pokémon battle is an elegant play upon a grand stage. Let the curtain rise!',
    victoryDialogue: 'A flawless performance! Your spotlight shines brighter than ever.',
    rankReward: 1, // Advance to Rank 5
    team: [
      { species: 'aurorus', level: 70 },
      { species: 'goodra', level: 70 },
      { species: 'gardevoir', level: 72, megaEvolve: true }
    ]
  },
  {
    id: 'wcs_master_5',
    name: 'Lance (Kanto/Johto Dragon Master)',
    tier: 'Master Class - Match 4',
    rank: 5,
    location: 'Apex Stadium - Quarter-Finals',
    dialogue: 'Behold the invincible might of dragonkind! Red Gyarados, unleash the fury of the storm!',
    victoryDialogue: 'The power of your bond surpassed the dragons themselves! Magnificent!',
    rankReward: 1, // Advance to Rank 4
    team: [
      { species: 'gyarados', level: 72, canGmax: true },
      { species: 'aerodactyl', level: 72 },
      { species: 'dragonite', level: 74 }
    ]
  },
  {
    id: 'wcs_master_4',
    name: 'Steven Stone (Hoenn Champion)',
    tier: 'Master Class - Match 5',
    rank: 4,
    location: 'Apex Stadium - Semi-Finals',
    dialogue: 'When passion and steel combine, nothing can pierce our resolve! Mega Metagross, shine!',
    victoryDialogue: 'A battle of truly rare brilliance. You have the heart of a true champion!',
    rankReward: 1, // Advance to Rank 3
    team: [
      { species: 'aggron', level: 75 },
      { species: 'cradily', level: 75 },
      { species: 'metagross', level: 77, megaEvolve: true }
    ]
  },
  {
    id: 'wcs_master_3',
    name: 'Cynthia (Sinnoh Champion)',
    tier: 'Master Class - Match 6',
    rank: 3,
    location: 'Apex Stadium - Semi-Finals',
    dialogue: 'Every life that meets another creates something born of that encounter. Garchomp, let us show the apex of our bond!',
    victoryDialogue: 'Fabulous... I felt the depths of your love for your Pokémon with every single strike.',
    rankReward: 1, // Advance to Rank 2
    team: [
      { species: 'spiritomb', level: 78 },
      { species: 'milotic', level: 78 },
      { species: 'lucario', level: 79, megaEvolve: true },
      { species: 'garchomp', level: 80 }
    ]
  },
  {
    id: 'wcs_master_2',
    name: 'Ash Ketchum (Alola Champion & Master Challenger)',
    tier: 'Master Class - Match 7',
    rank: 2,
    location: 'Apex Stadium - Final Challenger Match',
    dialogue: 'Pikachu and I have traveled all across the world to reach this moment! We are going full power: Mega Evolution, Z-Move, and Gigantamax! Let’s give it everything we’ve got!',
    victoryDialogue: 'WOAH!! That was the most fun battle I’ve ever had! You are ready for Leon! GO BECOME NUMBER ONE!',
    rankReward: 1, // Advance to Rank 1 Challenger
    team: [
      { species: 'dragonite', level: 82 },
      { species: 'gengar', level: 82, canGmax: true },
      { species: 'lucario', level: 83, megaEvolve: true },
      { species: 'pikachu', level: 85, hasZMove: true }
    ]
  },
  {
    id: 'wcs_master_1',
    name: 'Monarch Leon (The Undefeated Champion)',
    tier: 'The Grand World Championship',
    rank: 1,
    location: 'The Apex Stadium - Crown Battle',
    isChampion: true,
    dialogue: 'Welcome to my Champion Time! 100,000 fans are screaming our names! My Charizard and I have never known defeat, but today I want you to push us past our limits! LET’S HAVE A CHAMPION TIME!!',
    victoryDialogue: 'INCREDIBLE!! Unbelievable! The undefeated streak is broken, and a new World Monarch is born! The entire world crowns you as NUMBER ONE!!',
    rankReward: 0, // YOU ARE RANK #1!
    team: [
      { species: 'aegislash', level: 86 },
      { species: 'dragapult', level: 86 },
      { species: 'rillaboom', level: 87 },
      { species: 'cinderace', level: 87 },
      { species: 'inteleon', level: 87 },
      { species: 'charizard', level: 90, canGmax: true }
    ]
  }
];

export function getTierForRank(rank) {
  if (rank > 1000) return WCS_TIERS.NORMAL;
  if (rank > 100) return WCS_TIERS.GREAT;
  if (rank > 8) return WCS_TIERS.ULTRA;
  return WCS_TIERS.MASTER;
}
