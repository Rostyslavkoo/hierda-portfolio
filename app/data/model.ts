export interface ModelStat {
  key: string
  value: string
}

export interface ModelData {
  name: string
  tagline: string
  location: string
  quote: string
  bio: string
  polaroidCaption: string
  email: string
  instagram: string
  stats: ModelStat[]
  aboutStats: ModelStat[]
}

export const model: ModelData = {
  name: 'Hierda Karlson',
  tagline: 'Model · Artist · Madrid',
  location: 'Madrid · Available worldwide',
  quote: 'Drawn to stillness and the spaces between movement.',
  bio: 'Hierda Karlson is a Madrid-based fashion model and artist working across editorial, runway, and campaign. Her approach favours a restrained, sculptural presence — the kind that lets the garment, the light, and the silence speak first.',
  polaroidCaption: 'Madrid, 2025',
  email: 'studio@hierdakarlson.com',
  instagram: 'https://instagram.com/hierdakarlson',
  stats: [
    { key: 'Height',       value: '178 cm' },
    { key: 'Bust',         value: '84 cm' },
    { key: 'Waist',        value: '61 cm' },
    { key: 'Hips',         value: '89 cm' },
    { key: 'Clothing',     value: 'XS / 34' },
    { key: 'Shoe',         value: 'EU 39' },
    { key: 'Eyes',         value: 'Green' },
    { key: 'Hair',         value: 'Brown' },
    { key: 'Location',     value: 'Madrid, Spain' },
    { key: 'Availability', value: 'Worldwide' },
  ],
  aboutStats: [
    { key: 'Height',   value: '178' },
    { key: 'Bust · Waist · Hips', value: '84 · 61 · 89' },
    { key: 'Clothing', value: 'XS / 34' },
    { key: 'Shoe',     value: 'EU 39' },
  ],
}
