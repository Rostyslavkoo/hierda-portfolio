// Hierda Karlson — Contact: flower illustration + links + form
function Contact() {
  const { Input, Textarea, Button } = window.GerdaDesignSystem_228e1e;
  const [sent, setSent] = React.useState(false);

  // Gestural thin-line flowers — inspired by reference image 2
  const FlowerIllustration = () => (
    <svg
      className="contact__flower"
      width="420" height="120"
      viewBox="0 0 420 120"
      fill="none"
      stroke="#1a1a1a"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ opacity: 0.28 }}
    >
      {/* Left flower stem */}
      <path d="M60 118 C58 96 52 80 55 58 C57 42 66 26 62 8"/>
      {/* Left petal 1 */}
      <path d="M62 8 C46 -4 30 6 46 22 C52 28 62 8 62 8"/>
      {/* Left petal 2 */}
      <path d="M62 8 C78 -4 92 6 76 22 C70 28 62 8 62 8"/>
      {/* Left petal 3 */}
      <path d="M62 8 C42 10 36 26 52 28 C58 30 62 8 62 8"/>
      {/* Left petal 4 */}
      <path d="M62 8 C82 12 86 28 70 28 C64 30 62 8 62 8"/>
      {/* Left petal 5 - top */}
      <path d="M62 8 C62 -10 70 -2 62 8"/>
      {/* Left leaf */}
      <path d="M58 64 C42 56 34 66 46 74"/>
      {/* Left second leaf */}
      <path d="M56 82 C66 70 78 72 70 82"/>

      {/* Center crossing stem (connects left to right) */}
      <path d="M62 90 C120 70 190 90 210 60 C230 32 280 50 340 40 C360 36 380 28 360 10"/>

      {/* Right flower stem */}
      <path d="M360 118 C362 96 368 80 365 58 C363 42 354 26 358 8"/>
      {/* Right petal 1 */}
      <path d="M358 8 C342 -4 326 6 342 22 C348 28 358 8 358 8"/>
      {/* Right petal 2 */}
      <path d="M358 8 C374 -4 388 6 372 22 C366 28 358 8 358 8"/>
      {/* Right petal 3 */}
      <path d="M358 8 C338 10 332 26 348 28 C354 30 358 8 358 8"/>
      {/* Right petal 4 */}
      <path d="M358 8 C378 12 382 28 366 28 C360 30 358 8 358 8"/>
      {/* Right petal 5 */}
      <path d="M358 8 C358 -10 366 -2 358 8"/>
      {/* Right leaf */}
      <path d="M362 64 C378 56 386 66 374 74"/>
    </svg>
  );

  const links = [
    { label: 'Instagram', href: 'https://instagram.com/hierdakarlson' },
    { label: 'Email',     href: 'mailto:studio@hierdakarlson.com' },
    { label: 'Agency',    href: '#' },
  ];

  return (
    <section id="contact" className="contact">
      <h2 className="contact__bleed-title">CONTACT</h2>
      <p className="contact__sub">Madrid · Available worldwide</p>

      <FlowerIllustration />

      <nav className="contact__links" aria-label="Contact links">
        {links.map(l => (
          <a key={l.label} href={l.href} className="contact__link">
            {l.label}
            <span className="arr">↗</span>
          </a>
        ))}
      </nav>

      <p className="contact__form-label">Send a message</p>
      <form
        className="contact__form"
        onSubmit={e => { e.preventDefault(); setSent(true); }}
      >
        <div className="contact__form-row">
          <Input label="Name" placeholder="Your name" required />
          <Input label="Email" type="email" placeholder="you@studio.com" required />
        </div>
        <Textarea label="Message" rows={3} placeholder="Tell me about the project" required />
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Button variant="solid" type="submit">Send</Button>
          {sent && (
            <span style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: '1.2rem', color: 'var(--text-muted)',
            }}>
              Thank you — I'll be in touch.
            </span>
          )}
        </div>
      </form>
    </section>
  );
}
window.Contact = Contact;
