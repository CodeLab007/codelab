import { classNames } from '@codelab/lib';
import React from 'react';

interface IProps extends React.HTMLAttributes<HTMLParagraphElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Text = ({ className, children, level = 4, style }: IProps) => {
  return (
    <p className={classNames(className ?? '', `text--level${level}`)} style={style}>
      {children}
    </p>
  );
};

export default Text;
