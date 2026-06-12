export interface GalleryPhoto {
  src: string
  alt: string
  label: string
  variant?: 'hero' | 'a' | 'b' | 'c'
  objectPosition?: string
}

export const coverPhotos: GalleryPhoto[] = [
  {
    src: '/photos/8I5A9442-retouched.jpg',
    alt: 'Hierda Karlson — cover photo 1',
    label: 'Cover 1',
    objectPosition: '50% 20%',
  },
  {
    src: '/photos/8I5A9370-retouched.jpg',
    alt: 'Hierda Karlson — cover photo 2',
    label: 'Cover 2',
    objectPosition: '50% 10%',
  },
  {
    src: '/photos/8I5A9476-retouched.jpg',
    alt: 'Hierda Karlson — cover photo 3',
    label: 'Cover 3',
    objectPosition: '50% 25%',
  },
]

export const snepiPhotos: GalleryPhoto[] = [
  {
    src: '/photos/8I5A9442-retouched.jpg',
    alt: 'Hierda Karlson — face',
    label: 'Face',
  },
  {
    src: '/photos/8I5A9370-retouched.jpg',
    alt: 'Hierda Karlson — front',
    label: 'Front',
  },
  {
    src: '/photos/8I5A9476-retouched.jpg',
    alt: 'Hierda Karlson — 3/4',
    label: '3/4',
  },
  {
    src: '/photos/8I5A9443-retouched.jpg',
    alt: 'Hierda Karlson — crouching',
    label: 'Crouching',
  },
  {
    src: '/photos/8I5A9445-retouched.jpg',
    alt: 'Hierda Karlson — seated',
    label: 'Seated',
  },
  {
    src: '/photos/8I5A9619-retouched.jpg',
    alt: 'Hierda Karlson — full length',
    label: 'Full length',
  },
]

export const galleryPhotos: GalleryPhoto[] = [
  {
    src: '/photos/8I5A9681-retouched.jpg',
    alt: 'Hierda Karlson — studio 2025',
    label: 'Studio · 2025',
    variant: 'hero',
  },
  {
    src: '/photos/8I5A9625-retouched.jpg',
    alt: 'Hierda Karlson — editorial I',
    label: 'Editorial · I',
    variant: 'a',
  },
  {
    src: '/photos/8I5A9637-retouched.jpg',
    alt: 'Hierda Karlson — editorial II',
    label: 'Editorial · II',
    variant: 'b',
  },
  {
    src: '/photos/8I5A9785-retouched.jpg',
    alt: 'Hierda Karlson — full length',
    label: 'Full length',
    variant: 'c',
  },
  {
    src: '/photos/8I5A9386-retouched.jpg',
    alt: 'Hierda Karlson — studio dynamic',
    label: 'Studio · Dynamic',
  },
  {
    src: '/photos/8I5A9445-retouched.jpg',
    alt: 'Hierda Karlson — studio seated',
    label: 'Studio · Seated',
  },
  {
    src: '/photos/8I5A9476-retouched.jpg',
    alt: 'Hierda Karlson — studio 3/4',
    label: 'Studio · 3/4',
  },
]

export const aboutPhoto: GalleryPhoto = {
  src: '/photos/8I5A9442-retouched.jpg',
  alt: 'Hierda Karlson — portrait',
  label: 'Madrid, 2025',
}
