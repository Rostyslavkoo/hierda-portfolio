// Hierda Karlson — Shop: original paintings
function Shop() {
  const R = window.__resources || {};
  const paintings = [
    { src: R.paint1 || 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=800&q=80', title: 'Umbral', price: '€ 1,400', meta: 'Oil on linen · 90×120 cm' },
    { src: R.paint2 || 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=800&q=80', title: 'Reposo', price: '€ 980',   meta: 'Acrylic on canvas · 70×100 cm' },
    { src: R.paint3 || 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?auto=format&fit=crop&w=800&q=80', title: 'Marea',  price: '€ 1,650', meta: 'Mixed media · 100×140 cm' },
  ];

  const mailto = p =>
    `mailto:studio@hierdakarlson.com?subject=${encodeURIComponent(`Inquiry — "${p.title}" (${p.price})`)}&body=${encodeURIComponent(`Hello,\n\nI'd like to inquire about the painting "${p.title}" listed at ${p.price}.\n\nThank you,`)}`;

  return (
    <section id="shop" className="shop bleed-section">
      <div className="bleed-title">ORIGINAL WORKS</div>
      <p className="shop__sub">Paintings available for acquisition</p>

      <div className="shop__grid">
        {paintings.map(p => (
          <article className="painting" key={p.title}>
            <div className="painting__frame">
              <img src={p.src} alt={`Painting — ${p.title}`} loading="lazy" />
            </div>
            <div className="painting__body">
              <div className="painting__row">
                <h3 className="painting__title">{p.title}</h3>
                <span className="painting__price">{p.price}</span>
              </div>
              <p className="painting__meta">{p.meta}</p>
              <a className="link-arrow" href={mailto(p)}>
                Inquire <span className="arr">——›</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
window.Shop = Shop;
