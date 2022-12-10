export type Variant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark'
  | 'light'
  | string;

import { CSSProperties } from 'react';

export interface ComponentAttrs {
  className?: string;
  children?: string;
  style?: CSSProperties;
  id?: string;
}
