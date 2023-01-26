import { classNames } from '@codelab/lib';
import React from 'react';
import { ComponentAttrs, Variant } from '../../types/general';

interface IProps extends ComponentAttrs {
  variant?: Variant;
}
export const ClBadge = ({ className = '', children, variant = 'gray-3', ...rest }: IProps) => {
  return (
    <div {...rest} className={classNames(className, 'badge', `badge__${variant}`)}>
      {children}
    </div>
  );
};
