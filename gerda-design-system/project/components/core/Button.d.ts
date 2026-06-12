import * as React from 'react';

/**
 * Editorial call-to-action button with wide uppercase tracking.
 *
 * @startingPoint section="Core" subtitle="Editorial CTA — line, solid, ghost" viewport="700x160"
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual style. `line` = underlined link (default), `solid` = filled rose, `ghost` = hairline outline. */
  variant?: 'line' | 'solid' | 'ghost';
  /** Size scale. */
  size?: 'sm' | 'md' | 'lg';
  /** Element/tag to render as — e.g. 'a' for links. */
  as?: 'button' | 'a';
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;
