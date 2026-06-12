// Hierda Karlson — Про мене: bleeding title + polaroid + bio
function About() {
  const { Stat } = window.GerdaDesignSystem_228e1e;
  const portrait = (window.__resources && window.__resources.p9386) || '../../uploads/8I5A9386-retouched.jpg';

  const stats = [
    ['178 cm',     'Height'],
    ['84 · 61 · 89', 'Measurements'],
    ['EU 39',      'Shoe'],
    ['Madrid',     'Based in'],
  ];

  return (
    <section id="about" className="about bleed-section">
      <div className="bleed-title">ABOUT ME</div>

      <div className="about__inner">
        <div className="about__polaroid">
          <img src={portrait} alt="Hierda Karlson — portrait" loading="lazy" />
          <span className="about__polaroid-cap">Madrid, 2025</span>
        </div>
        <div className="about__text">
          <p className="about__quote">
            "Drawn to stillness and the spaces between movement."
          </p>
          <p className="about__body">
            Hierda Karlson is a Madrid-based fashion model and artist working across
            editorial, runway, and campaign. Her approach favours a restrained,
            sculptural presence — the kind that lets the garment, the light, and the
            silence speak first.
          </p>
          <div className="about__stats">
            {stats.map(([v, l]) => (
              <Stat key={l} value={v} label={l} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
window.About = About;
