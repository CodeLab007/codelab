import { classNames } from '@codelab/lib';
import { LabelProps } from '@radix-ui/react-label';
import React from 'react';
import Error from '../error/Error';
import { ClLabel } from '../label/Label';

export interface IInputProps<T extends 'form-control' | 'form-check-input' = 'form-control'>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelProps?: LabelProps;
  label?: LabelProps['children'];
  labelBefore?: boolean;
  inputMainClass?: T;
  error?: string;
  hasError?: boolean;
}

export const ClInput = ({
  label,
  id,
  className,
  inputMainClass = 'form-control',
  labelBefore = true,
  labelProps,
  children,
  error,
  hasError,
  ...rest
}: IInputProps) => {
  return (
    <div className='mb-3 d-flex flex-column'>
      {label && labelBefore && (
        <ClLabel {...labelProps} htmlFor={id}>
          {label}
        </ClLabel>
      )}
      <input
        {...rest}
        className={classNames(inputMainClass, hasError ? 'is-invalid' : '', className ?? '')}
      />
      {label && !labelBefore && (
        <ClLabel {...labelProps} htmlFor={id}>
          {label}
        </ClLabel>
      )}
      {hasError && <Error>{error}</Error>}
      {children}
    </div>
  );
};
