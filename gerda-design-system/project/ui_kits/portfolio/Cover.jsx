// Hierda Karlson — Cover: three photos, pill buttons, name line
function Cover() {
  const R = window.__resources || {};

  const photos = [
    { src: R.p9442 || '../../uploads/8I5A9442-retouched.jpg', pos: '50% 20%' },
    { src: R.p9370 || '../../uploads/8I5A9370-retouched.jpg', pos: '50% 10%' },
    { src: R.p9476 || '../../uploads/8I5A9476-retouched.jpg', pos: '50% 25%' },
  ];

  return (
    <section id="cover" className="cover">
      <div className="cover__photos">
        {photos.map((p, i) => (
          <div className="cover__photo-wrap" key={i}>
            <img
              src={p.src}
              alt={`Hierda Karlson — photo ${i + 1}`}
              style={{ objectPosition: p.pos }}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      <div className="cover__identity">
        <div className="cover__pills">
          <a href="#parametry" className="cover__pill">Parameters</a>
          <a href="#snepi"     className="cover__pill">Digitals</a>
        </div>
        <span className="cover__name-line">
          Hierda Karlson · Model · Artist · Madrid
        </span>
      </div>
    </section>
  );
}
window.Cover = Cover;
