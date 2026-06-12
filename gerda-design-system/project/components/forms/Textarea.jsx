import React from 'react';

/**
 * Gerda — Textarea
 * Sibling of Input for longer messages. Same baseline-rule treatment.
 */
export function Textarea({ label, id, rows = 4, style, ...rest }) {
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
      <textarea
        id={fieldId}
        rows={rows}
        className="gda-textarea"
        style={{
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
          transition: 'border-color var(--dur-base) var(--ease-editorial)',
        }}
        {...rest}
      />
      <style>{`
        .gda-textarea::placeholder{ color:var(--text-faint); }
        .gda-textarea:focus{ border-bottom-color:var(--accent); }
      `}</style>
    </div>
  );
}
