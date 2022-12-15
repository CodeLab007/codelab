import { Variant } from '../../types/general';
import { classNames } from '@codelab/lib';

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant;
  disabled?: boolean;
  onClick?: React.EventHandler<React.MouseEvent | React.KeyboardEvent>;
  text?: string;
}

export const ClButton = ({ variant, children, text, className = '', ...rest }: IButtonProps) => {
  return (
    <button className={classNames('btn', `btn__${variant}`, className)} {...rest}>
      {text ? text : children}
    </button>
  );
};
