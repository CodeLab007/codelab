import { ComponentAttrs, Variant } from '../../types/general';

export interface IButtonProps extends ComponentAttrs {
  variant: Variant;
  disabled?: boolean;
  onClick?: React.EventHandler<React.MouseEvent | React.KeyboardEvent>;
  text?: string;
}

import { classNames } from '@codelab/lib';

export const ClButton = ({ variant, children, text, className = '', ...rest }: IButtonProps) => {
  return (
    <button className={classNames('btn', `btn-${variant}`, className)} {...rest}>
      {text ? text : children}
    </button>
  );
};
