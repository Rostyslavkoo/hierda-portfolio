// Hierda Karlson — Portfolio: asymmetric magazine spread + lightbox
function Gallery() {
  const R = window.__resources || {};

  const row1 = [
    { src: R.p9637 || '../../uploads/8I5A9637-retouched.jpg', cls: 'hero', cap: 'Studio · 2025' },
    { src: R.p9619 || '../../uploads/8I5A9619-retouched.jpg', cls: 'a',    cap: 'Editorial · I' },
    { src: R.p9625 || '../../uploads/8I5A9625-retouched.jpg', cls: 'b',    cap: 'Editorial · II' },
    { src: R.p9785 || '../../uploads/8I5A9785-retouched.jpg', cls: 'c',    cap: 'Full length' },
  ];
  const row2 = [
    { src: R.p9443 || '../../uploads/8I5A9443-retouched.jpg', cap: 'Studio · Dynamic' },
    { src: R.p9445 || '../../uploads/8I5A9445-retouched.jpg', cap: 'Studio · Seated' },
    { src: R.p9681 || '../../uploads/8I5A9681-retouched.jpg', cap: 'Studio · 3/4' },
  ];
  const all = [...row1, ...row2];

  const [open, setOpen] = React.useState(null);
  const close = () => setOpen(null);
  const step = d => setOpen(i => i === null ? null : (i + d + all.length) % all.length);

  React.useEffect(() => {
    if (open === null) return;
    const fn = e => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [open]);

  return (
    <section id="portfolio" className="gallery bleed-section">
      <div className="bleed-title">PORTFOLIO</div>

      <div className="gallery__spread">
        {row1.map((s, i) => (
          <div key={s.src} className={`gallery__item gallery__item--${s.cls}`} onClick={() => setOpen(i)}>
            <img src={s.src} alt={s.cap} loading="lazy" />
            <span className="gallery__label">{s.cap}</span>
          </div>
        ))}
      </div>

      <div className="gallery__row2">
        {row2.map((s, i) => (
          <div key={s.src} className="gallery__item" onClick={() => setOpen(row1.length + i)}>
            <img src={s.src} alt={s.cap} loading="lazy" />
            <span className="gallery__label">{s.cap}</span>
          </div>
        ))}
      </div>

      {open !== null && (
        <div className="lightbox" onClick={close}>
          <button className="lightbox__close" onClick={close} aria-label="Close">×</button>
          <button className="lightbox__nav prev" onClick={e => { e.stopPropagation(); step(-1); }}>Prev</button>
          <img src={all[open].src} alt={all[open].cap} onClick={e => e.stopPropagation()} />
          <button className="lightbox__nav next" onClick={e => { e.stopPropagation(); step(1); }}>Next</button>
          <div className="lightbox__count">
            {String(open+1).padStart(2,'0')} / {String(all.length).padStart(2,'0')}
          </div>
        </div>
      )}
    </section>
  );
}
window.Gallery = Gallery;
