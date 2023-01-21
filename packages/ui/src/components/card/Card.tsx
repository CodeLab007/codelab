import { classNames } from '@codelab/lib';
import { ComponentAttrs } from '../../types/general';

interface IProps extends ComponentAttrs {
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  headerClasses?: string;
  bodyClasses?: string;
  footerClasses?: string;
  bodyAsChildren?:boolean;
}

export const ClCard = ({
  children,
  headerContent,
  headerClasses = '',
  bodyClasses,
  footerContent,
  footerClasses,
  className = '',
  bodyAsChildren = false,
  ...rest
}: IProps) => {
  return (
    <div className={classNames('card',className)} {...rest}>
      {headerContent && (
        <div className={classNames(headerClasses, 'card__header')}>{headerContent}</div>
      )}

      {bodyAsChildren ? children : <div className={bodyClasses}>{children}</div>}

      {footerContent && <div className={footerClasses}>{footerContent}</div>}
    </div>
  );
};
