import React from 'react';

/**
 * Gerda — Eyebrow
 * The tracked, uppercase micro-label that sits above section titles.
 * Optional leading rule (a short rose line) reinforces the editorial grid.
 */
export function Eyebrow({ children, rule = true, color, style, ...rest }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '14px',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--weight-medium)',
        letterSpacing: 'var(--tracking-widest)',
        textTransform: 'uppercase',
        color: color || 'var(--text-accent)',
        ...style,
      }}
      {...rest}
    >
      {rule && (
        <span
          aria-hidden="true"
          style={{ width: '32px', height: '1px', background: 'var(--accent)', flex: 'none' }}
        />
      )}
      {children}
    </span>
  );
}
