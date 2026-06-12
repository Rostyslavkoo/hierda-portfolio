import React from 'react';

/**
 * Gerda — Button
 * Editorial CTA. Defaults to a minimal underlined link-style; `solid` and
 * `ghost` variants available. Wide tracking, uppercase, never rounded.
 */
export function Button({
  children,
  variant = 'line',
  size = 'md',
  as = 'button',
  disabled = false,
  style,
  ...rest
}) {
  const sizes = {
    sm: { fontSize: 'var(--text-xs)', padding: '10px 18px', letterSpacing: '0.2em' },
    md: { fontSize: 'var(--text-sm)', padding: '14px 28px', letterSpacing: '0.22em' },
    lg: { fontSize: 'var(--text-base)', padding: '18px 40px', letterSpacing: '0.24em' },
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
    ...sizes[size],
  };

  const variants = {
    solid: {
      background: 'var(--accent)',
      color: 'var(--on-accent)',
      borderColor: 'var(--accent)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-strong)',
      borderColor: 'var(--border-hair)',
    },
    line: {
      background: 'transparent',
      color: 'var(--text-strong)',
      borderColor: 'transparent',
      padding: '6px 0',
      borderBottom: '1px solid var(--accent)',
      borderRadius: 0,
    },
  };

  const Tag = as;
  return (
    <Tag
      className={`gda-btn gda-btn--${variant}`}
      disabled={as === 'button' ? disabled : undefined}
      style={{ ...base, ...variants[variant], ...style }}
      {...rest}
    >
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
