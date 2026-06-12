import * as React from 'react';

/**
 * Minimal editorial text field — baseline rule lights to rose on focus.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Tracked uppercase label rendered above the field. */
  label?: string;
}

export function Input(props: InputProps): JSX.Element;
