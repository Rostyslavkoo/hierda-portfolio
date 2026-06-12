export interface Painting {
  id: string
  title: string
  medium: string
  dimensions: string
  price: string
  src: string
  alt: string
}

export const paintings: Painting[] = [
  {
    id: 'umbral',
    title: 'Umbral',
    medium: 'Oil on linen',
    dimensions: '90×120 cm',
    price: '€ 1,400',
    src: '/photos/8I5A9619-retouched.jpg',
    alt: 'Painting — Umbral',
  },
  {
    id: 'reposo',
    title: 'Reposo',
    medium: 'Acrylic on canvas',
    dimensions: '70×100 cm',
    price: '€ 980',
    src: '/photos/8I5A9625-retouched.jpg',
    alt: 'Painting — Reposo',
  },
  {
    id: 'marea',
    title: 'Marea',
    medium: 'Mixed media',
    dimensions: '100×140 cm',
    price: '€ 1,650',
    src: '/photos/8I5A9637-retouched.jpg',
    alt: 'Painting — Marea',
  },
]
