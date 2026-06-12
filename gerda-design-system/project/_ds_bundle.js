/* @ds-bundle: {"format":3,"namespace":"GerdaDesignSystem_228e1e","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Stat","sourcePath":"components/core/Stat.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"}],"sourceHashes":{"components/core/Button.jsx":"9b88c815f928","components/core/Eyebrow.jsx":"abc41fe70c7d","components/core/Stat.jsx":"8044bcd250c9","components/forms/Input.jsx":"ace39571cb2f","components/forms/Textarea.jsx":"362e2476193a","ui_kits/portfolio/About.jsx":"42f14e6bfe6a","ui_kits/portfolio/App.jsx":"a10d163a1347","ui_kits/portfolio/Contact.jsx":"22040caa1f64","ui_kits/portfolio/Cover.jsx":"6ea6ce76bb7b","ui_kits/portfolio/Footer.jsx":"196e4909237e","ui_kits/portfolio/Gallery.jsx":"6964fe6a7c85","ui_kits/portfolio/Nav.jsx":"45ac3d7604db","ui_kits/portfolio/Parametry.jsx":"b35f65475f24","ui_kits/portfolio/Shop.jsx":"fea90d9293e0","ui_kits/portfolio/Snepi.jsx":"b01a5c6ed66d","ui_kits/portfolio/components.jsx":"6e240e1a26ce"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.GerdaDesignSystem_228e1e = window.GerdaDesignSystem_228e1e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Gerda — Button
 * Editorial CTA. Defaults to a minimal underlined link-style; `solid` and
 * `ghost` variants available. Wide tracking, uppercase, never rounded.
 */
function Button({
  children,
  variant = 'line',
  size = 'md',
  as = 'button',
  disabled = false,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      fontSize: 'var(--text-xs)',
      padding: '10px 18px',
      letterSpacing: '0.2em'
    },
    md: {
      fontSize: 'var(--text-sm)',
      padding: '14px 28px',
      letterSpacing: '0.22em'
    },
    lg: {
      fontSize: 'var(--text-base)',
      padding: '18px 40px',
      letterSpacing: '0.24em'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--weight-medium)',
    textTransform: 'uppercase',
    textDecoration: 'none',
    borderRadius: 'var(--radius-xs)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'color var(--dur-fast) var(--ease-soft), background var(--dur-fast) var(--ease-soft), border-color var(--dur-fast) var(--ease-soft), opacity var(--dur-fast) var(--ease-soft)',
    opacity: disabled ? 0.4 : 1,
    border: '1px solid transparent',
    ...sizes[size]
  };
  const variants = {
    solid: {
      background: 'var(--accent)',
      color: 'var(--on-accent)',
      borderColor: 'var(--accent)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-strong)',
      borderColor: 'var(--border-hair)'
    },
    line: {
      background: 'transparent',
      color: 'var(--text-strong)',
      borderColor: 'transparent',
      padding: '6px 0',
      borderBottom: '1px solid var(--accent)',
      borderRadius: 0
    }
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: `gda-btn gda-btn--${variant}`,
    disabled: as === 'button' ? disabled : undefined,
    style: {
      ...base,
      ...variants[variant],
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("style", null, `
        .gda-btn--solid:hover:not(:disabled){ background:var(--accent-hover); border-color:var(--accent-hover); }
        .gda-btn--ghost:hover:not(:disabled){ border-color:var(--accent); color:var(--text-accent); }
        .gda-btn--line:hover:not(:disabled){ color:var(--text-accent); }
        .gda-btn:focus-visible{ outline:2px solid var(--focus-ring); outline-offset:3px; }
      `), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Gerda — Eyebrow
 * The tracked, uppercase micro-label that sits above section titles.
 * Optional leading rule (a short rose line) reinforces the editorial grid.
 */
function Eyebrow({
  children,
  rule = true,
  color,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '14px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-widest)',
      textTransform: 'uppercase',
      color: color || 'var(--text-accent)',
      ...style
    }
  }, rest), rule && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: '32px',
      height: '1px',
      background: 'var(--accent)',
      flex: 'none'
    }
  }), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Gerda — Stat
 * A single editorial statistic: large display value over a tracked label.
 * Used for model stats (height, measurements, location).
 */
function Stat({
  value,
  label,
  align = 'left',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      textAlign: align,
      alignItems: align === 'center' ? 'center' : 'flex-start',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--display-md)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--text-strong)',
      letterSpacing: '0.02em',
      lineHeight: 1
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-wider)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Stat.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Gerda — Input
 * Minimal editorial text field: no box, just a baseline rule that lights
 * to rose on focus. Floating tracked label sits above.
 */
function Input({
  label,
  id,
  type = 'text',
  style,
  ...rest
}) {
  const fieldId = id || (label ? `gda-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    className: "gda-field",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-wider)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    type: type,
    className: "gda-input",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-lg)',
      color: 'var(--text-strong)',
      background: 'transparent',
      border: 'none',
      borderBottom: '1px solid var(--border-hair)',
      padding: '10px 0',
      outline: 'none',
      transition: 'border-color var(--dur-base) var(--ease-editorial)'
    }
  }, rest)), /*#__PURE__*/React.createElement("style", null, `
        .gda-input::placeholder{ color:var(--text-faint); }
        .gda-input:focus{ border-bottom-color:var(--accent); }
      `));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Gerda — Textarea
 * Sibling of Input for longer messages. Same baseline-rule treatment.
 */
function Textarea({
  label,
  id,
  rows = 4,
  style,
  ...rest
}) {
  const fieldId = id || (label ? `gda-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    className: "gda-field",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-wider)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    id: fieldId,
    rows: rows,
    className: "gda-textarea",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-lg)',
      lineHeight: 'var(--leading-normal)',
      color: 'var(--text-strong)',
      background: 'transparent',
      border: 'none',
      borderBottom: '1px solid var(--border-hair)',
      padding: '10px 0',
      outline: 'none',
      resize: 'vertical',
      transition: 'border-color var(--dur-base) var(--ease-editorial)'
    }
  }, rest)), /*#__PURE__*/React.createElement("style", null, `
        .gda-textarea::placeholder{ color:var(--text-faint); }
        .gda-textarea:focus{ border-bottom-color:var(--accent); }
      `));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/About.jsx
try { (() => {
// Hierda Karlson — Про мене: bleeding title + polaroid + bio
function About() {
  const {
    Stat
  } = window.GerdaDesignSystem_228e1e;
  const portrait = window.__resources && window.__resources.p9386 || '../../uploads/8I5A9386-retouched.jpg';
  const stats = [['178 cm', 'Height'], ['84 · 61 · 89', 'Measurements'], ['EU 39', 'Shoe'], ['Madrid', 'Based in']];
  return /*#__PURE__*/React.createElement("section", {
    id: "about",
    className: "about bleed-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bleed-title"
  }, "ABOUT ME"), /*#__PURE__*/React.createElement("div", {
    className: "about__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "about__polaroid"
  }, /*#__PURE__*/React.createElement("img", {
    src: portrait,
    alt: "Hierda Karlson \u2014 portrait",
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("span", {
    className: "about__polaroid-cap"
  }, "Madrid, 2025")), /*#__PURE__*/React.createElement("div", {
    className: "about__text"
  }, /*#__PURE__*/React.createElement("p", {
    className: "about__quote"
  }, "\"Drawn to stillness and the spaces between movement.\""), /*#__PURE__*/React.createElement("p", {
    className: "about__body"
  }, "Hierda Karlson is a Madrid-based fashion model and artist working across editorial, runway, and campaign. Her approach favours a restrained, sculptural presence \u2014 the kind that lets the garment, the light, and the silence speak first."), /*#__PURE__*/React.createElement("div", {
    className: "about__stats"
  }, stats.map(([v, l]) => /*#__PURE__*/React.createElement(Stat, {
    key: l,
    value: v,
    label: l
  }))))));
}
window.About = About;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/About.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/App.jsx
try { (() => {
// Hierda Karlson — App composition
function App() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement(Cover, null), /*#__PURE__*/React.createElement("div", {
    className: "section-sep"
  }), /*#__PURE__*/React.createElement(Parametry, null), /*#__PURE__*/React.createElement("div", {
    className: "section-sep"
  }), /*#__PURE__*/React.createElement(Snepi, null), /*#__PURE__*/React.createElement("div", {
    className: "section-sep"
  }), /*#__PURE__*/React.createElement(Gallery, null), /*#__PURE__*/React.createElement("div", {
    className: "section-sep"
  }), /*#__PURE__*/React.createElement(About, null), /*#__PURE__*/React.createElement("div", {
    className: "section-sep"
  }), /*#__PURE__*/React.createElement(Shop, null), /*#__PURE__*/React.createElement("div", {
    className: "section-sep"
  }), /*#__PURE__*/React.createElement(Contact, null), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Contact.jsx
try { (() => {
// Hierda Karlson — Contact: flower illustration + links + form
function Contact() {
  const {
    Input,
    Textarea,
    Button
  } = window.GerdaDesignSystem_228e1e;
  const [sent, setSent] = React.useState(false);

  // Gestural thin-line flowers — inspired by reference image 2
  const FlowerIllustration = () => /*#__PURE__*/React.createElement("svg", {
    className: "contact__flower",
    width: "420",
    height: "120",
    viewBox: "0 0 420 120",
    fill: "none",
    stroke: "#1a1a1a",
    strokeWidth: "1.1",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: {
      opacity: 0.28
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M60 118 C58 96 52 80 55 58 C57 42 66 26 62 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M62 8 C46 -4 30 6 46 22 C52 28 62 8 62 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M62 8 C78 -4 92 6 76 22 C70 28 62 8 62 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M62 8 C42 10 36 26 52 28 C58 30 62 8 62 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M62 8 C82 12 86 28 70 28 C64 30 62 8 62 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M62 8 C62 -10 70 -2 62 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M58 64 C42 56 34 66 46 74"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M56 82 C66 70 78 72 70 82"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M62 90 C120 70 190 90 210 60 C230 32 280 50 340 40 C360 36 380 28 360 10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M360 118 C362 96 368 80 365 58 C363 42 354 26 358 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M358 8 C342 -4 326 6 342 22 C348 28 358 8 358 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M358 8 C374 -4 388 6 372 22 C366 28 358 8 358 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M358 8 C338 10 332 26 348 28 C354 30 358 8 358 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M358 8 C378 12 382 28 366 28 C360 30 358 8 358 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M358 8 C358 -10 366 -2 358 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M362 64 C378 56 386 66 374 74"
  }));
  const links = [{
    label: 'Instagram',
    href: 'https://instagram.com/hierdakarlson'
  }, {
    label: 'Email',
    href: 'mailto:studio@hierdakarlson.com'
  }, {
    label: 'Agency',
    href: '#'
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    className: "contact"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "contact__bleed-title"
  }, "CONTACT"), /*#__PURE__*/React.createElement("p", {
    className: "contact__sub"
  }, "Madrid \xB7 Available worldwide"), /*#__PURE__*/React.createElement(FlowerIllustration, null), /*#__PURE__*/React.createElement("nav", {
    className: "contact__links",
    "aria-label": "Contact links"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href,
    className: "contact__link"
  }, l.label, /*#__PURE__*/React.createElement("span", {
    className: "arr"
  }, "\u2197")))), /*#__PURE__*/React.createElement("p", {
    className: "contact__form-label"
  }, "Send a message"), /*#__PURE__*/React.createElement("form", {
    className: "contact__form",
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "contact__form-row"
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Name",
    placeholder: "Your name",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    placeholder: "you@studio.com",
    required: true
  })), /*#__PURE__*/React.createElement(Textarea, {
    label: "Message",
    rows: 3,
    placeholder: "Tell me about the project",
    required: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "solid",
    type: "submit"
  }, "Send"), sent && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontSize: '1.2rem',
      color: 'var(--text-muted)'
    }
  }, "Thank you \u2014 I'll be in touch."))));
}
window.Contact = Contact;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Contact.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Cover.jsx
try { (() => {
// Hierda Karlson — Cover: three photos, pill buttons, name line
function Cover() {
  const R = window.__resources || {};
  const photos = [{
    src: R.p9442 || '../../uploads/8I5A9442-retouched.jpg',
    pos: '50% 20%'
  }, {
    src: R.p9370 || '../../uploads/8I5A9370-retouched.jpg',
    pos: '50% 10%'
  }, {
    src: R.p9476 || '../../uploads/8I5A9476-retouched.jpg',
    pos: '50% 25%'
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "cover",
    className: "cover"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cover__photos"
  }, photos.map((p, i) => /*#__PURE__*/React.createElement("div", {
    className: "cover__photo-wrap",
    key: i
  }, /*#__PURE__*/React.createElement("img", {
    src: p.src,
    alt: `Hierda Karlson — photo ${i + 1}`,
    style: {
      objectPosition: p.pos
    },
    loading: i === 0 ? 'eager' : 'lazy'
  })))), /*#__PURE__*/React.createElement("div", {
    className: "cover__identity"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cover__pills"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#parametry",
    className: "cover__pill"
  }, "Parameters"), /*#__PURE__*/React.createElement("a", {
    href: "#snepi",
    className: "cover__pill"
  }, "Digitals")), /*#__PURE__*/React.createElement("span", {
    className: "cover__name-line"
  }, "Hierda Karlson \xB7 Model \xB7 Artist \xB7 Madrid")));
}
window.Cover = Cover;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Cover.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Footer.jsx
try { (() => {
// Hierda Karlson — Footer
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 ", new Date().getFullYear(), " Hierda Karlson"), /*#__PURE__*/React.createElement("span", {
    className: "footer__c"
  }, "Madrid"), /*#__PURE__*/React.createElement("a", {
    href: "https://instagram.com/hierdakarlson",
    className: "footer__r"
  }, "Instagram \u2197"));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Gallery.jsx
try { (() => {
// Hierda Karlson — Portfolio: asymmetric magazine spread + lightbox
function Gallery() {
  const R = window.__resources || {};
  const row1 = [{
    src: R.p9637 || '../../uploads/8I5A9637-retouched.jpg',
    cls: 'hero',
    cap: 'Studio · 2025'
  }, {
    src: R.p9619 || '../../uploads/8I5A9619-retouched.jpg',
    cls: 'a',
    cap: 'Editorial · I'
  }, {
    src: R.p9625 || '../../uploads/8I5A9625-retouched.jpg',
    cls: 'b',
    cap: 'Editorial · II'
  }, {
    src: R.p9785 || '../../uploads/8I5A9785-retouched.jpg',
    cls: 'c',
    cap: 'Full length'
  }];
  const row2 = [{
    src: R.p9443 || '../../uploads/8I5A9443-retouched.jpg',
    cap: 'Studio · Dynamic'
  }, {
    src: R.p9445 || '../../uploads/8I5A9445-retouched.jpg',
    cap: 'Studio · Seated'
  }, {
    src: R.p9681 || '../../uploads/8I5A9681-retouched.jpg',
    cap: 'Studio · 3/4'
  }];
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
  return /*#__PURE__*/React.createElement("section", {
    id: "portfolio",
    className: "gallery bleed-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bleed-title"
  }, "PORTFOLIO"), /*#__PURE__*/React.createElement("div", {
    className: "gallery__spread"
  }, row1.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.src,
    className: `gallery__item gallery__item--${s.cls}`,
    onClick: () => setOpen(i)
  }, /*#__PURE__*/React.createElement("img", {
    src: s.src,
    alt: s.cap,
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("span", {
    className: "gallery__label"
  }, s.cap)))), /*#__PURE__*/React.createElement("div", {
    className: "gallery__row2"
  }, row2.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.src,
    className: "gallery__item",
    onClick: () => setOpen(row1.length + i)
  }, /*#__PURE__*/React.createElement("img", {
    src: s.src,
    alt: s.cap,
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("span", {
    className: "gallery__label"
  }, s.cap)))), open !== null && /*#__PURE__*/React.createElement("div", {
    className: "lightbox",
    onClick: close
  }, /*#__PURE__*/React.createElement("button", {
    className: "lightbox__close",
    onClick: close,
    "aria-label": "Close"
  }, "\xD7"), /*#__PURE__*/React.createElement("button", {
    className: "lightbox__nav prev",
    onClick: e => {
      e.stopPropagation();
      step(-1);
    }
  }, "Prev"), /*#__PURE__*/React.createElement("img", {
    src: all[open].src,
    alt: all[open].cap,
    onClick: e => e.stopPropagation()
  }), /*#__PURE__*/React.createElement("button", {
    className: "lightbox__nav next",
    onClick: e => {
      e.stopPropagation();
      step(1);
    }
  }, "Next"), /*#__PURE__*/React.createElement("div", {
    className: "lightbox__count"
  }, String(open + 1).padStart(2, '0'), " / ", String(all.length).padStart(2, '0'))));
}
window.Gallery = Gallery;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Gallery.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Nav.jsx
try { (() => {
// Hierda Karlson — Nav: asymmetric star-burger left, HK center, nothing right
function StarIcon() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "34",
    height: "46",
    viewBox: "0 0 34 46",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M17 2 L20.5 12 L29 10.5 L23 18.5 L26.5 28 L17 43 L7.5 28 L11 18.5 L5 10.5 L13.5 12 Z",
    fill: "var(--text-strong)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8.5",
    y1: "15",
    x2: "25.5",
    y2: "15",
    stroke: "var(--bg-base)",
    strokeWidth: "1.25"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "7.5",
    y1: "19.5",
    x2: "26.5",
    y2: "19.5",
    stroke: "var(--bg-base)",
    strokeWidth: "1.25"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "9",
    y1: "24",
    x2: "25",
    y2: "24",
    stroke: "var(--bg-base)",
    strokeWidth: "1.25"
  }));
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
      setProgress(total > 0 ? top / total * 100 : 0);
      setScrolled(top > 50);
    };
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [['Parameters', '#parametry'], ['Digitals', '#snepi'], ['Portfolio', '#portfolio'], ['About', '#about'], ['Shop', '#shop'], ['Contact', '#contact']];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "progress-bar",
    style: {
      width: progress + '%'
    }
  }), /*#__PURE__*/React.createElement("nav", {
    className: 'nav' + (scrolled ? ' scrolled' : '')
  }, /*#__PURE__*/React.createElement("button", {
    className: "nav__star-btn",
    onClick: () => setOpen(true),
    "aria-label": "Open menu"
  }, /*#__PURE__*/React.createElement(StarIcon, null)), /*#__PURE__*/React.createElement("a", {
    href: "#cover",
    className: "nav__mono"
  }, "HK")), open && /*#__PURE__*/React.createElement("div", {
    className: "mobile-menu",
    role: "dialog",
    "aria-modal": "true"
  }, /*#__PURE__*/React.createElement("button", {
    className: "mobile-menu__close",
    onClick: () => setOpen(false),
    "aria-label": "Close menu"
  }, "\xD7"), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4
    }
  }, links.map(([label, href]) => /*#__PURE__*/React.createElement("a", {
    key: href,
    href: href,
    className: "mobile-menu__link",
    onClick: () => setOpen(false)
  }, label))), /*#__PURE__*/React.createElement("p", {
    className: "mobile-menu__city"
  }, "Madrid \xB7 Worldwide")));
}
window.Nav = Nav;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Parametry.jsx
try { (() => {
// Hierda Karlson — Параметри: editorial comp card
function Parametry() {
  const stats = [['Height', '178 cm'], ['Bust', '84 cm'], ['Waist', '61 cm'], ['Hips', '89 cm'], ['Clothing', 'XS / 34'], ['Shoe', 'EU 39'], ['Eyes', 'Green'], ['Hair', 'Brown']];
  return /*#__PURE__*/React.createElement("section", {
    id: "parametry",
    className: "parametry bleed-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bleed-title"
  }, "PARAMETERS"), /*#__PURE__*/React.createElement("div", {
    className: "parametry__card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "parametry__card-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "parametry__card-name"
  }, "Hierda Karlson"), /*#__PURE__*/React.createElement("span", {
    className: "parametry__card-occ"
  }, "Model \xB7 Madrid")), /*#__PURE__*/React.createElement("div", {
    className: "parametry__grid"
  }, stats.map(([key, val]) => /*#__PURE__*/React.createElement("div", {
    className: "parametry__cell",
    key: key
  }, /*#__PURE__*/React.createElement("div", {
    className: "parametry__key"
  }, key), /*#__PURE__*/React.createElement("div", {
    className: "parametry__val"
  }, val))), /*#__PURE__*/React.createElement("div", {
    className: "parametry__cell parametry__cell--full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "parametry__key"
  }, "Location"), /*#__PURE__*/React.createElement("div", {
    className: "parametry__val"
  }, "Madrid, Spain \xB7 Available worldwide")))));
}
window.Parametry = Parametry;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Parametry.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Shop.jsx
try { (() => {
// Hierda Karlson — Shop: original paintings
function Shop() {
  const R = window.__resources || {};
  const paintings = [{
    src: R.paint1 || 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=800&q=80',
    title: 'Umbral',
    price: '€ 1,400',
    meta: 'Oil on linen · 90×120 cm'
  }, {
    src: R.paint2 || 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=800&q=80',
    title: 'Reposo',
    price: '€ 980',
    meta: 'Acrylic on canvas · 70×100 cm'
  }, {
    src: R.paint3 || 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?auto=format&fit=crop&w=800&q=80',
    title: 'Marea',
    price: '€ 1,650',
    meta: 'Mixed media · 100×140 cm'
  }];
  const mailto = p => `mailto:studio@hierdakarlson.com?subject=${encodeURIComponent(`Inquiry — "${p.title}" (${p.price})`)}&body=${encodeURIComponent(`Hello,\n\nI'd like to inquire about the painting "${p.title}" listed at ${p.price}.\n\nThank you,`)}`;
  return /*#__PURE__*/React.createElement("section", {
    id: "shop",
    className: "shop bleed-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bleed-title"
  }, "ORIGINAL WORKS"), /*#__PURE__*/React.createElement("p", {
    className: "shop__sub"
  }, "Paintings available for acquisition"), /*#__PURE__*/React.createElement("div", {
    className: "shop__grid"
  }, paintings.map(p => /*#__PURE__*/React.createElement("article", {
    className: "painting",
    key: p.title
  }, /*#__PURE__*/React.createElement("div", {
    className: "painting__frame"
  }, /*#__PURE__*/React.createElement("img", {
    src: p.src,
    alt: `Painting — ${p.title}`,
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("div", {
    className: "painting__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "painting__row"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "painting__title"
  }, p.title), /*#__PURE__*/React.createElement("span", {
    className: "painting__price"
  }, p.price)), /*#__PURE__*/React.createElement("p", {
    className: "painting__meta"
  }, p.meta), /*#__PURE__*/React.createElement("a", {
    className: "link-arrow",
    href: mailto(p)
  }, "Inquire ", /*#__PURE__*/React.createElement("span", {
    className: "arr"
  }, "\u2014\u2014\u203A")))))));
}
window.Shop = Shop;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Shop.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Snepi.jsx
try { (() => {
// Hierda Karlson — Снепи: natural agency digitals
function Snepi() {
  const R = window.__resources || {};
  const digitals = [{
    src: R.p9386 || '../../uploads/8I5A9386-retouched.jpg',
    label: 'Face',
    pos: '50% 8%'
  }, {
    src: R.p9370 || '../../uploads/8I5A9370-retouched.jpg',
    label: 'Front',
    pos: '50% 8%'
  }, {
    src: R.p9681 || '../../uploads/8I5A9681-retouched.jpg',
    label: '3/4',
    pos: '50% 10%'
  }, {
    src: R.p9442 || '../../uploads/8I5A9442-retouched.jpg',
    label: 'Crouching',
    pos: '50% 20%'
  }, {
    src: R.p9445 || '../../uploads/8I5A9445-retouched.jpg',
    label: 'Seated',
    pos: '50% 15%'
  }, {
    src: R.p9476 || '../../uploads/8I5A9476-retouched.jpg',
    label: 'Full length',
    pos: '50% 20%'
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "snepi",
    className: "snepi bleed-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bleed-title"
  }, "DIGITALS"), /*#__PURE__*/React.createElement("div", {
    className: "snepi__grid"
  }, digitals.map(d => /*#__PURE__*/React.createElement("div", {
    className: "snepi__item",
    key: d.label
  }, /*#__PURE__*/React.createElement("div", {
    className: "snepi__photo"
  }, /*#__PURE__*/React.createElement("img", {
    src: d.src,
    alt: `Hierda Karlson — ${d.label}`,
    style: {
      objectPosition: d.pos
    },
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("span", {
    className: "snepi__label"
  }, d.label)))));
}
window.Snepi = Snepi;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Snepi.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/components.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Gerda Portfolio — local copy of the design-system primitives.
// The generated `_ds_bundle.js` is only available inside the Design System tab;
// when this site is opened directly it must define the components itself.
// These mirror components/core/* and components/forms/* exactly.

function Button({
  children,
  variant = 'line',
  size = 'md',
  as = 'button',
  disabled = false,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      fontSize: 'var(--text-xs)',
      padding: '10px 18px',
      letterSpacing: '0.2em'
    },
    md: {
      fontSize: 'var(--text-sm)',
      padding: '14px 28px',
      letterSpacing: '0.22em'
    },
    lg: {
      fontSize: 'var(--text-base)',
      padding: '18px 40px',
      letterSpacing: '0.24em'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--weight-medium)',
    textTransform: 'uppercase',
    textDecoration: 'none',
    borderRadius: 'var(--radius-xs)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'color var(--dur-fast) var(--ease-soft), background var(--dur-fast) var(--ease-soft), border-color var(--dur-fast) var(--ease-soft), opacity var(--dur-fast) var(--ease-soft)',
    opacity: disabled ? 0.4 : 1,
    border: '1px solid transparent',
    ...sizes[size]
  };
  const variants = {
    solid: {
      background: 'var(--accent)',
      color: 'var(--on-accent)',
      borderColor: 'var(--accent)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-strong)',
      borderColor: 'var(--border-hair)'
    },
    line: {
      background: 'transparent',
      color: 'var(--text-strong)',
      borderColor: 'transparent',
      padding: '6px 0',
      borderBottom: '1px solid var(--accent)',
      borderRadius: 0
    }
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: `gda-btn gda-btn--${variant}`,
    disabled: as === 'button' ? disabled : undefined,
    style: {
      ...base,
      ...variants[variant],
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("style", null, `
        .gda-btn--solid:hover:not(:disabled){ background:var(--accent-hover); border-color:var(--accent-hover); }
        .gda-btn--ghost:hover:not(:disabled){ border-color:var(--accent); color:var(--text-accent); }
        .gda-btn--line:hover:not(:disabled){ color:var(--text-accent); }
        .gda-btn:focus-visible{ outline:2px solid var(--focus-ring); outline-offset:3px; }
      `), children);
}
function Eyebrow({
  children,
  rule = true,
  color,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '14px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-widest)',
      textTransform: 'uppercase',
      color: color || 'var(--text-accent)',
      ...style
    }
  }, rest), rule && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: '32px',
      height: '1px',
      background: 'var(--accent)',
      flex: 'none'
    }
  }), children);
}
function Stat({
  value,
  label,
  align = 'left',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      textAlign: align,
      alignItems: align === 'center' ? 'center' : 'flex-start',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--display-md)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--text-strong)',
      letterSpacing: '0.02em',
      lineHeight: 1
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-wider)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label));
}
function Input({
  label,
  id,
  type = 'text',
  style,
  ...rest
}) {
  const fieldId = id || (label ? `gda-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    className: "gda-field",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-wider)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    type: type,
    className: "gda-input",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-lg)',
      color: 'var(--text-strong)',
      background: 'transparent',
      border: 'none',
      borderBottom: '1px solid var(--border-hair)',
      padding: '10px 0',
      outline: 'none',
      transition: 'border-color var(--dur-base) var(--ease-editorial)'
    }
  }, rest)), /*#__PURE__*/React.createElement("style", null, `.gda-input::placeholder{ color:var(--text-faint); } .gda-input:focus{ border-bottom-color:var(--accent); }`));
}
function Textarea({
  label,
  id,
  rows = 4,
  style,
  ...rest
}) {
  const fieldId = id || (label ? `gda-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    className: "gda-field",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-wider)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    id: fieldId,
    rows: rows,
    className: "gda-textarea",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-lg)',
      lineHeight: 'var(--leading-normal)',
      color: 'var(--text-strong)',
      background: 'transparent',
      border: 'none',
      borderBottom: '1px solid var(--border-hair)',
      padding: '10px 0',
      outline: 'none',
      resize: 'vertical',
      transition: 'border-color var(--dur-base) var(--ease-editorial)'
    }
  }, rest)), /*#__PURE__*/React.createElement("style", null, `.gda-textarea::placeholder{ color:var(--text-faint); } .gda-textarea:focus{ border-bottom-color:var(--accent); }`));
}

// Register under the design-system namespace so section files resolve it whether
// or not the generated bundle is present.
window.GerdaDesignSystem_228e1e = Object.assign(window.GerdaDesignSystem_228e1e || {}, {
  Button,
  Eyebrow,
  Stat,
  Input,
  Textarea
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/components.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Textarea = __ds_scope.Textarea;

})();
