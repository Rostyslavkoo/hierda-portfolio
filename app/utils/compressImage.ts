interface Variant {
  maxWidth: number
  quality: number
}

const THUMB: Variant = { maxWidth: 1200, quality: 0.78 }
const FULL: Variant = { maxWidth: 2400, quality: 0.9 }

// Prefer WebP (much smaller); fall back to JPEG if the browser can't encode it.
function pickFormat(): { mime: string; ext: string } {
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  const webp = canvas.toDataURL('image/webp')
  return webp.startsWith('data:image/webp')
    ? { mime: 'image/webp', ext: 'webp' }
    : { mime: 'image/jpeg', ext: 'jpg' }
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => { URL.revokeObjectURL(url); resolve(img) }
    img.onerror = (e) => { URL.revokeObjectURL(url); reject(e) }
    img.src = url
  })
}

function render(img: HTMLImageElement, variant: Variant, mime: string): Promise<Blob> {
  const scale = img.width > variant.maxWidth ? variant.maxWidth / img.width : 1
  const w = Math.round(img.width * scale)
  const h = Math.round(img.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  canvas.getContext('2d')!.drawImage(img, 0, 0, w, h)

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('toBlob failed'))),
      mime,
      variant.quality,
    )
  })
}

export interface CompressedPair {
  /** Lightweight image for grids/galleries. */
  thumb: File
  /** High-quality image for lightbox / full view. */
  full: File
  ext: string
}

/**
 * Produces two optimised variants of an uploaded image: a small `thumb` for
 * display and a larger high-quality `full` for the lightbox. Both are WebP
 * where supported. If the input isn't an image, both variants are the original.
 */
export async function compressImage(file: File): Promise<CompressedPair> {
  if (!file.type.startsWith('image/')) {
    const ext = file.name.split('.').pop() ?? 'bin'
    return { thumb: file, full: file, ext }
  }

  const { mime, ext } = pickFormat()
  const img = await loadImage(file)

  const [thumbBlob, fullBlob] = await Promise.all([
    render(img, THUMB, mime),
    render(img, FULL, mime),
  ])

  const base = file.name.replace(/\.[^.]+$/, '')
  return {
    thumb: new File([thumbBlob], `${base}.${ext}`, { type: mime }),
    full: new File([fullBlob], `${base}.${ext}`, { type: mime }),
    ext,
  }
}
