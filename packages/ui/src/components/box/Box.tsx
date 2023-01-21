import { classNames } from '@codelab/lib';
import { ComponentAttrs } from '../../types/general';

interface IProps<T extends React.ElementType> extends ComponentAttrs {
  rowGap?: string;
  colGap?: string;
  direction?: 'row' | 'column';
  as?: T;
}

export const ClBox = <T extends React.ElementType = 'div'>({
  rowGap = '0.5rem',
  colGap = '0.5rem',
  children,
  direction = 'column',
  className = '',
  as,
  ...rest
}: IProps<T>) => {
  const style = {
    gap: `${rowGap} ${colGap}`,
  };
  const Component = as || 'div';
  return (
    <Component
      {...rest}
      className={classNames(
        'd-flex',
        `flex-${direction}`,
        direction === 'column' ? 'align-items-start' : '',
        className,
      )}
      style={style}
    >
      {children}
    </Component>
  );
};
