// Gerda Portfolio — local copy of the design-system primitives.
// The generated `_ds_bundle.js` is only available inside the Design System tab;
// when this site is opened directly it must define the components itself.
// These mirror components/core/* and components/forms/* exactly.

function Button({ children, variant = 'line', size = 'md', as = 'button', disabled = false, style, ...rest }) {
  const sizes = {
    sm: { fontSize: 'var(--text-xs)', padding: '10px 18px', letterSpacing: '0.2em' },
    md: { fontSize: 'var(--text-sm)', padding: '14px 28px', letterSpacing: '0.22em' },
    lg: { fontSize: 'var(--text-base)', padding: '18px 40px', letterSpacing: '0.24em' },
  };
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
    fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-medium)', textTransform: 'uppercase',
    textDecoration: 'none', borderRadius: 'var(--radius-xs)', cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'color var(--dur-fast) var(--ease-soft), background var(--dur-fast) var(--ease-soft), border-color var(--dur-fast) var(--ease-soft), opacity var(--dur-fast) var(--ease-soft)',
    opacity: disabled ? 0.4 : 1, border: '1px solid transparent', ...sizes[size],
  };
  const variants = {
    solid: { background: 'var(--accent)', color: 'var(--on-accent)', borderColor: 'var(--accent)' },
    ghost: { background: 'transparent', color: 'var(--text-strong)', borderColor: 'var(--border-hair)' },
    line: { background: 'transparent', color: 'var(--text-strong)', borderColor: 'transparent', padding: '6px 0', borderBottom: '1px solid var(--accent)', borderRadius: 0 },
  };
  const Tag = as;
  return (
    <Tag className={`gda-btn gda-btn--${variant}`} disabled={as === 'button' ? disabled : undefined} style={{ ...base, ...variants[variant], ...style }} {...rest}>
      <style>{`
        .gda-btn--solid:hover:not(:disabled){ background:var(--accent-hover); border-color:var(--accent-hover); }
        .gda-btn--ghost:hover:not(:disabled){ border-color:var(--accent); color:var(--text-accent); }
        .gda-btn--line:hover:not(:disabled){ color:var(--text-accent); }
        .gda-btn:focus-visible{ outline:2px solid var(--focus-ring); outline-offset:3px; }
      `}</style>
      {children}
    </Tag>
  );
}

function Eyebrow({ children, rule = true, color, style, ...rest }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-medium)', letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase', color: color || 'var(--text-accent)', ...style }} {...rest}>
      {rule && <span aria-hidden="true" style={{ width: '32px', height: '1px', background: 'var(--accent)', flex: 'none' }} />}
      {children}
    </span>
  );
}

function Stat({ value, label, align = 'left', style, ...rest }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: align, alignItems: align === 'center' ? 'center' : 'flex-start', ...style }} {...rest}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--display-md)', fontWeight: 'var(--weight-medium)', color: 'var(--text-strong)', letterSpacing: '0.02em', lineHeight: 1 }}>{value}</span>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-medium)', letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</span>
    </div>
  );
}

function Input({ label, id, type = 'text', style, ...rest }) {
  const fieldId = id || (label ? `gda-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return (
    <div className="gda-field" style={{ display: 'flex', flexDirection: 'column', gap: '10px', ...style }}>
      {label && <label htmlFor={fieldId} style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-medium)', letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</label>}
      <input id={fieldId} type={type} className="gda-input" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-lg)', color: 'var(--text-strong)', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-hair)', padding: '10px 0', outline: 'none', transition: 'border-color var(--dur-base) var(--ease-editorial)' }} {...rest} />
      <style>{`.gda-input::placeholder{ color:var(--text-faint); } .gda-input:focus{ border-bottom-color:var(--accent); }`}</style>
    </div>
  );
}

function Textarea({ label, id, rows = 4, style, ...rest }) {
  const fieldId = id || (label ? `gda-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return (
    <div className="gda-field" style={{ display: 'flex', flexDirection: 'column', gap: '10px', ...style }}>
      {label && <label htmlFor={fieldId} style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-medium)', letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</label>}
      <textarea id={fieldId} rows={rows} className="gda-textarea" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-lg)', lineHeight: 'var(--leading-normal)', color: 'var(--text-strong)', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-hair)', padding: '10px 0', outline: 'none', resize: 'vertical', transition: 'border-color var(--dur-base) var(--ease-editorial)' }} {...rest} />
      <style>{`.gda-textarea::placeholder{ color:var(--text-faint); } .gda-textarea:focus{ border-bottom-color:var(--accent); }`}</style>
    </div>
  );
}

// Register under the design-system namespace so section files resolve it whether
// or not the generated bundle is present.
window.GerdaDesignSystem_228e1e = Object.assign(
  window.GerdaDesignSystem_228e1e || {},
  { Button, Eyebrow, Stat, Input, Textarea }
);
