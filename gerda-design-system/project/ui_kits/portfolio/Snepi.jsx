// Hierda Karlson — Снепи: natural agency digitals
function Snepi() {
  const R = window.__resources || {};

  const digitals = [
    { src: R.p9386 || '../../uploads/8I5A9386-retouched.jpg', label: 'Face',        pos: '50% 8%'  },
    { src: R.p9370 || '../../uploads/8I5A9370-retouched.jpg', label: 'Front',       pos: '50% 8%'  },
    { src: R.p9681 || '../../uploads/8I5A9681-retouched.jpg', label: '3/4',         pos: '50% 10%' },
    { src: R.p9442 || '../../uploads/8I5A9442-retouched.jpg', label: 'Crouching',   pos: '50% 20%' },
    { src: R.p9445 || '../../uploads/8I5A9445-retouched.jpg', label: 'Seated',      pos: '50% 15%' },
    { src: R.p9476 || '../../uploads/8I5A9476-retouched.jpg', label: 'Full length', pos: '50% 20%' },
  ];

  return (
    <section id="snepi" className="snepi bleed-section">
      <div className="bleed-title">DIGITALS</div>

      <div className="snepi__grid">
        {digitals.map(d => (
          <div className="snepi__item" key={d.label}>
            <div className="snepi__photo">
              <img
                src={d.src}
                alt={`Hierda Karlson — ${d.label}`}
                style={{ objectPosition: d.pos }}
                loading="lazy"
              />
            </div>
            <span className="snepi__label">{d.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
window.Snepi = Snepi;
