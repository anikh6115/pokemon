// Sprite Management Engine for Pokémon Emerald Journeys
// Combines CDN Sprite Assets with Pixel-Art SVG Fallback for 100% Offline Resilience

export class SpriteManager {
  constructor() {
    this.cache = new Map();
  }

  // Get Primary Animated Anime Sprite URL for Pokemon
  getPokemonSpriteUrl(pokemon, isBack = false) {
    const key = pokemon.speciesKey.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Check Mega Form
    if (pokemon.isMega) {
      if (key === 'charizard') return isBack
        ? 'https://play.pokemonshowdown.com/sprites/ani-back/charizard-megax.gif'
        : 'https://play.pokemonshowdown.com/sprites/ani/charizard-megax.gif';
      if (key === 'mewtwo') return isBack
        ? 'https://play.pokemonshowdown.com/sprites/ani-back/mewtwo-megay.gif'
        : 'https://play.pokemonshowdown.com/sprites/ani/mewtwo-megay.gif';
      return isBack
        ? `https://play.pokemonshowdown.com/sprites/ani-back/${key}-mega.gif`
        : `https://play.pokemonshowdown.com/sprites/ani/${key}-mega.gif`;
    }

    // Check G-Max Form
    if (pokemon.isGmax) {
      return isBack
        ? `https://play.pokemonshowdown.com/sprites/gen5-back/${key}-gmax.png`
        : `https://play.pokemonshowdown.com/sprites/gen5/${key}-gmax.png`;
    }

    // Standard Form Animated Sprite (Showdown TV-Anime GIF)
    return isBack
      ? `https://play.pokemonshowdown.com/sprites/ani-back/${key}.gif`
      : `https://play.pokemonshowdown.com/sprites/ani/${key}.gif`;
  }

  // Backup static sprite URL if animated gif is not yet cached or gen 9
  getStaticBackupSpriteUrl(pokemon, isBack = false) {
    const key = pokemon.speciesKey.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (pokemon.dexNumber) {
      return isBack
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon.dexNumber}.png`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.dexNumber}.png`;
    }
    return `https://play.pokemonshowdown.com/sprites/gen5/${key}.png`;
  }

  // Generate an SVG Data URL fallback with accurate color and silhouette
  getFallbackSvgUrl(pokemon, isBack = false) {
    const typeColor = this.getTypePrimaryColor(pokemon.types[0] || 'Normal');
    const secondaryColor = this.getTypePrimaryColor(pokemon.types[1] || pokemon.types[0] || 'Normal');
    const name = pokemon.name || 'PKMN';

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
        <defs>
          <radialGradient id="grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="${typeColor}" />
            <stop offset="100%" stop-color="${secondaryColor}" />
          </radialGradient>
        </defs>
        <!-- Shadow -->
        <ellipse cx="48" cy="84" rx="30" ry="8" fill="rgba(0,0,0,0.25)" />
        <!-- Body Shape -->
        <circle cx="48" cy="48" r="32" fill="url(#grad)" stroke="#1a202c" stroke-width="3" />
        <!-- Inner Details / Eyes -->
        ${isBack
          ? `<ellipse cx="40" cy="42" rx="12" ry="16" fill="${secondaryColor}" opacity="0.6" />`
          : `<circle cx="40" cy="42" r="5" fill="#ffffff" /><circle cx="40" cy="42" r="2.5" fill="#000000" />
             <circle cx="56" cy="42" r="5" fill="#ffffff" /><circle cx="56" cy="42" r="2.5" fill="#000000" />
             <path d="M 44 54 Q 48 58 52 54" stroke="#000000" stroke-width="2" fill="none" />`
        }
        <!-- Decorative Badge -->
        <rect x="18" y="72" width="60" height="14" rx="4" fill="#2d3748" />
        <text x="48" y="82" font-family="monospace" font-size="8" font-weight="bold" fill="#ffffff" text-anchor="middle">${name.slice(0, 8).toUpperCase()}</text>
      </svg>
    `;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  getTypePrimaryColor(type) {
    const map = {
      Normal: '#A8A878', Fire: '#F08030', Water: '#6890F0', Grass: '#78C850',
      Electric: '#F8D030', Ice: '#98D8D8', Fighting: '#C03028', Poison: '#A040A0',
      Ground: '#E0C068', Flying: '#A890F0', Psychic: '#F85888', Bug: '#A8B820',
      Rock: '#B8A038', Ghost: '#705898', Dragon: '#7038F8', Steel: '#B8B8D0',
      Dark: '#705848', Fairy: '#EE99AC'
    };
    return map[type] || '#A8A878';
  }
}

export const Sprites = new SpriteManager();
