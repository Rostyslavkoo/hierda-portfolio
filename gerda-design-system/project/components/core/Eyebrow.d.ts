import * as React from 'react';

/**
 * Tracked uppercase micro-label placed above section titles.
 */
export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Show the short leading rose rule. Default true. */
  rule?: boolean;
  /** Override the text/rule color. */
  color?: string;
  children?: React.ReactNode;
}

export function Eyebrow(props: EyebrowProps): JSX.Element;
