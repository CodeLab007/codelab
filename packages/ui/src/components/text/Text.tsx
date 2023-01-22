import { classNames } from '@codelab/lib';
import React from 'react';

export interface ITextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

const ClText = ({ className = '', children, level = 5, style }: ITextProps) => {
  return (
    <p className={classNames(className ?? '', 't' + level)} style={style}>
      {children}
    </p>
  );
};

export default ClText;
