// Hierda Karlson — Параметри: editorial comp card
function Parametry() {
  const stats = [
    ['Height',      '178 cm'],
    ['Bust',        '84 cm'],
    ['Waist',       '61 cm'],
    ['Hips',        '89 cm'],
    ['Clothing',    'XS / 34'],
    ['Shoe',        'EU 39'],
    ['Eyes',        'Green'],
    ['Hair',        'Brown'],
  ];

  return (
    <section id="parametry" className="parametry bleed-section">
      <div className="bleed-title">PARAMETERS</div>

      <div className="parametry__card">
        <div className="parametry__card-head">
          <span className="parametry__card-name">Hierda Karlson</span>
          <span className="parametry__card-occ">Model · Madrid</span>
        </div>
        <div className="parametry__grid">
          {stats.map(([key, val]) => (
            <div className="parametry__cell" key={key}>
              <div className="parametry__key">{key}</div>
              <div className="parametry__val">{val}</div>
            </div>
          ))}
          <div className="parametry__cell parametry__cell--full">
            <div className="parametry__key">Location</div>
            <div className="parametry__val">Madrid, Spain · Available worldwide</div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.Parametry = Parametry;
