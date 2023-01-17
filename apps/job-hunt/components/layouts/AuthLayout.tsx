import { ComponentAttrs } from '@codelab/ui';

export const AuthLayout = ({ children }: ComponentAttrs) => {
  return <main className='d-flex auth-layout'>{children}</main>;
};
