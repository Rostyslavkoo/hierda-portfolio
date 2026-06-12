import * as React from 'react';

/**
 * Multi-line editorial text field, sibling of Input.
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Tracked uppercase label rendered above the field. */
  label?: string;
}

export function Textarea(props: TextareaProps): JSX.Element;
