import React from 'react';

/**
 * Gerda — Input
 * Minimal editorial text field: no box, just a baseline rule that lights
 * to rose on focus. Floating tracked label sits above.
 */
export function Input({ label, id, type = 'text', style, ...rest }) {
  const fieldId = id || (label ? `gda-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return (
    <div className="gda-field" style={{ display: 'flex', flexDirection: 'column', gap: '10px', ...style }}>
      {label && (
        <label
          htmlFor={fieldId}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--weight-medium)',
            letterSpacing: 'var(--tracking-wider)',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}
        >
          {label}
        </label>
      )}
      <input
        id={fieldId}
        type={type}
        className="gda-input"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-lg)',
          color: 'var(--text-strong)',
          background: 'transparent',
          border: 'none',
          borderBottom: '1px solid var(--border-hair)',
          padding: '10px 0',
          outline: 'none',
          transition: 'border-color var(--dur-base) var(--ease-editorial)',
        }}
        {...rest}
      />
      <style>{`
        .gda-input::placeholder{ color:var(--text-faint); }
        .gda-input:focus{ border-bottom-color:var(--accent); }
      `}</style>
    </div>
  );
}
