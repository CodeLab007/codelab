import { ComponentAttrs, Variant } from '../types/general';

export interface IButtonProps extends ComponentAttrs {
  variant: Variant;
  disabled?: boolean;
  onClick?: React.EventHandler<React.MouseEvent | React.KeyboardEvent>;
}

import { classNames } from '../../lib/classNames';

export const ClButton = ({ variant, children, className = '', ...rest }: IButtonProps) => {
  return (
    <button className={classNames('btn', `btn-${variant}`, className)} {...rest}>
      {children}
    </button>
  );
};
