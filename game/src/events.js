// Special Events System for catching ALL Legendary Pokémon
// Features story triggers, cutscene text, dynamic legendary battles, and rewards.

export const LEGENDARY_EVENTS = [
  {
    id: 'event_rayquaza',
    title: 'Descent of the Sky Dragon',
    legendary: 'rayquaza',
    level: 70,
    location: 'Sky Pillar Pinnacle (Amber Crags)',
    requiredRank: 1000, // Great Class or better
    desc: 'An emerald meteor pierced the sky above Amber Crags. The ancient dragon of ozone awaits a worthy challenger.',
    introText: 'The sky darkens to jade green... A piercing roar reverberates through the clouds as RAYQUAZA descends from the ozone layer!',
    rewardItem: 'Rayquazite (Unlocks Mega Rayquaza)',
    isCompleted: false
  },
  {
    id: 'event_mewtwo',
    title: 'The Genetic Apex Experiment',
    legendary: 'mewtwo',
    level: 70,
    location: 'Sunken Genetic Facility (Cobalt Bay)',
    requiredRank: 100, // Ultra Class or better
    desc: 'Deep beneath Cobalt Bay, a sealed research pod has cracked open. Telepathic waves ripple across the sea.',
    introText: 'Glass shatters under tremendous psychic pressure! MEWTWO hovers before you, eyes glowing with cosmic psionic light!',
    rewardItem: 'Mewtwonite Y & Mew Encounter',
    isCompleted: false
  },
  {
    id: 'event_creation_trio',
    title: 'Rift of Space, Time & Distortion',
    legendary: 'giratina',
    extraLegendaries: ['dialga', 'palkia', 'arceus'],
    level: 75,
    location: 'Dimensional Rift (Whispering Gloom)',
    requiredRank: 50,
    desc: 'Spacetime fractures across the ancient monoliths. Dialga, Palkia, and the shadowy ruler of the Distortion World emerge!',
    introText: 'Reality warps and shadows twist! GIRATINA emerges from the Distortion World accompanied by the masters of Time and Space!',
    rewardItem: 'Griseous Core & Origin Plate',
    isCompleted: false
  },
  {
    id: 'event_primal_titans',
    title: 'Primal Awakening of Land & Sea',
    legendary: 'kyogre',
    extraLegendaries: ['groudon'],
    level: 70,
    location: 'Abyssal Trench & Magma Core (Cobalt / Cinder)',
    requiredRank: 500,
    desc: 'Torrential downpours and blinding droughts clash across the coast. The ancient weather titans have awakened.',
    introText: 'Heavy rain pours as oceanic trenches roar! PRIMAL KYOGRE and PRIMAL GROUDON rise from slumber to test your strength!',
    rewardItem: 'Blue Orb & Red Orb (Primal Reversion)',
    isCompleted: false
  },
  {
    id: 'event_galar_heroes',
    title: 'Slumbering Legends of Crown & Shield',
    legendary: 'zacian',
    extraLegendaries: ['zamazenta'],
    level: 72,
    location: 'Slumbering Weald Shrine (Wyrmrest Plateau)',
    requiredRank: 20,
    desc: 'Two sacred rusted pedestals glow with blinding light in the mists of Wyrmrest. The legendary heroes stir.',
    introText: 'A radiant fog fills the forest. With noble howls, CROWNED ZACIAN and CROWNED ZAMAZENTA emerge to test the future Monarch!',
    rewardItem: 'Rusted Sword & Rusted Shield',
    isCompleted: false
  },
  {
    id: 'event_celestial_altar',
    title: 'Radiance of Sun & Moon',
    legendary: 'solgaleo',
    extraLegendaries: ['lunala'],
    level: 72,
    location: 'Celestial Altar (Glacier Peak)',
    requiredRank: 10,
    desc: 'At the snowy summit where the sun and moon meet simultaneously, ultra wormholes crackle with divine energy.',
    introText: 'Solar and lunar energy intertwine at the summit altar! SOLGALEO and LUNALA bathe the peak in radiant ultra-light!',
    rewardItem: 'Solganium Z & Lunalium Z',
    isCompleted: false
  },
  {
    id: 'event_paradox_titans',
    title: 'Ancient Past & Distant Future',
    legendary: 'koraidon',
    extraLegendaries: ['miraidon'],
    level: 75,
    location: 'The Zero Crater (Wyrmrest Abyss)',
    requiredRank: 8, // Master Class
    desc: 'A mysterious crater pulsed with crystalline energy. Prehistoric roar meets neon future drive.',
    introText: 'The crater floor shatters with blinding Terastal light! KORAIDON and MIRAIDON roar across the epochs of time!',
    rewardItem: 'Paradox Booster Core',
    isCompleted: false
  },
  {
    id: 'event_tao_titans',
    title: 'The Legendary Continuum (Post-Game)',
    legendary: 'arceus',
    extraLegendaries: ['reshiram', 'zekrom', 'xerneas', 'yveltal'],
    level: 80,
    location: 'Monarch’s Spire Pinnacle',
    requiredRank: 1, // Monarch Rank 1
    desc: 'The crowning of the new World Monarch echoes across the multiverse. ARCEUS and the dragons of truth and ideals appear to honor you!',
    introText: 'A celestial staircase forms from pure light. ARCEUS descends, encircled by RESHIRAM, ZEKROM, XERNEAS, and YVELTAL!',
    rewardItem: 'Crown of the Multiverse',
    isCompleted: false
  }
];

export function getAvailableEvents(playerRank, completedEvents = []) {
  return LEGENDARY_EVENTS.map(event => ({
    ...event,
    isUnlocked: playerRank <= event.requiredRank,
    isDone: completedEvents.includes(event.id)
  }));
}
