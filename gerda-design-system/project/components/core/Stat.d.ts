import * as React from 'react';

/**
 * A single editorial statistic — large display value over a tracked label.
 */
export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The headline figure, e.g. "178 cm". */
  value: React.ReactNode;
  /** The tracked uppercase caption, e.g. "Height". */
  label: string;
  align?: 'left' | 'center';
}

export function Stat(props: StatProps): JSX.Element;
