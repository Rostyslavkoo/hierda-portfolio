// Hierda Karlson — Nav: asymmetric star-burger left, HK center, nothing right
function StarIcon() {
  return (
    <svg width="34" height="46" viewBox="0 0 34 46" fill="none" aria-hidden="true">
      {/* 5-pointed star with elongated bottom spike */}
      <path
        d="M17 2 L20.5 12 L29 10.5 L23 18.5 L26.5 28 L17 43 L7.5 28 L11 18.5 L5 10.5 L13.5 12 Z"
        fill="var(--text-strong)"
      />
      {/* 3 horizontal lines through the star body */}
      <line x1="8.5"  y1="15"   x2="25.5" y2="15"   stroke="var(--bg-base)" strokeWidth="1.25"/>
      <line x1="7.5"  y1="19.5" x2="26.5" y2="19.5" stroke="var(--bg-base)" strokeWidth="1.25"/>
      <line x1="9"    y1="24"   x2="25"   y2="24"   stroke="var(--bg-base)" strokeWidth="1.25"/>
    </svg>
  );
}

function Nav() {
  const [open, setOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const top = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (top / total) * 100 : 0);
      setScrolled(top > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['Parameters', '#parametry'],
    ['Digitals',   '#snepi'],
    ['Portfolio',  '#portfolio'],
    ['About',      '#about'],
    ['Shop',       '#shop'],
    ['Contact',    '#contact'],
  ];

  return (
    <>
      <div className="progress-bar" style={{ width: progress + '%' }} />
      <nav className={'nav' + (scrolled ? ' scrolled' : '')}>
        <button
          className="nav__star-btn"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <StarIcon />
        </button>
        <a href="#cover" className="nav__mono">HK</a>
      </nav>

      {open && (
        <div className="mobile-menu" role="dialog" aria-modal="true">
          <button
            className="mobile-menu__close"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >×</button>
          <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="mobile-menu__link"
                onClick={() => setOpen(false)}
              >{label}</a>
            ))}
          </nav>
          <p className="mobile-menu__city">Madrid · Worldwide</p>
        </div>
      )}
    </>
  );
}
window.Nav = Nav;
