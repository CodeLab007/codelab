import { classNames } from '@codelab/lib';
import { ComponentAttrs } from '../../types/general';

interface IProps extends ComponentAttrs {
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  headerClasses?: string;
  bodyClasses?: string;
  footerClasses?: string;
  bodyAsChildren?:boolean;
  noPadding?:boolean;
}

export const ClCard = ({
  children,
  headerContent,
  headerClasses = '',
  bodyClasses = '',
  footerContent,
  footerClasses = '',
  className = '',
  bodyAsChildren = false,
  noPadding = false,
  ...rest
}: IProps) => {
  return (
    <div className={classNames('card',className,noPadding ? 'no-padding' : '')} {...rest}>
      {headerContent && (
        <div className={classNames(headerClasses, 'card__header')}>{headerContent}</div>
      )}

      {bodyAsChildren ? children : <div className={classNames(bodyClasses,'card__body')}>{children}</div>}

      {footerContent && <div className={footerClasses}>{footerContent}</div>}
    </div>
  );
};
