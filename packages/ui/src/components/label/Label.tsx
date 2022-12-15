import { classNames } from '@codelab/lib';
import * as Label from '@radix-ui/react-label';
import React from 'react';

export interface ILabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  htmlFor: Label.LabelProps['htmlFor'];
  children: Label.LabelProps['children'];
  className?: Label.LabelProps['className'];
}

export const ClLabel = ({ htmlFor, children, className }: ILabelProps) => {
  return (
    <Label.Root
      className={classNames(className ? className : '', 'transition', 'label')}
      htmlFor={htmlFor}
    >
      {children}
    </Label.Root>
  );
};
