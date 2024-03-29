import { classNames } from '@codelab/lib';
import { LabelProps } from '@radix-ui/react-label';
import React, { CSSProperties } from 'react';
import { ComponentAttrs } from '../../types/general';
import Error from '../error/Error';
import { ClLabel } from '../label/Label';

interface ICommonProps extends ComponentAttrs {
  labelProps?: LabelProps;
  label?: LabelProps['children'];
  labelBefore?: boolean;
  inputMainClass?: 'form-control' | 'form-check-input';
  error?: string;
  hasError?: boolean;
  icon?: React.ReactNode;
  size: 'sm' | 'lg';
  formGroupClasses?:string
  formGroupstyle?:CSSProperties

} 

export type IInputProps =
  | (React.InputHTMLAttributes<HTMLInputElement> &
      ICommonProps & {
        Control?: 'input';
      })
  | (React.TextareaHTMLAttributes<HTMLTextAreaElement> &
      ICommonProps & {
        Control?: 'textarea';
      });
// export interface IInputProps<T extends 'form-control' | 'form-check-input' = 'form-control'>
//   extends React.InputHTMLAttributes<HTMLInputElement> {
//   labelProps?: LabelProps;
//   label?: LabelProps['children'];
//   labelBefore?: boolean;
//   inputMainClass?: T;
//   error?: string;
//   hasError?: boolean;
//   Control:'input' | 'textarea'
// }

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
  size,
  icon,
  Control = 'input',
  formGroupClasses = '',
  formGroupstyle,

  ...rest
}: IInputProps) => {

  return (
    <div style={ formGroupstyle} className={classNames('form-group mb-3 d-flex flex-column position-relative',formGroupClasses)}>
      {label && labelBefore && (
        <ClLabel {...labelProps} htmlFor={id}>
          {label}
        </ClLabel>
      )}
      <Control
        {...rest}
        className={classNames(
          inputMainClass,
          hasError ? 'is-invalid' : '',
          className ?? '',
          size ? size : '',
        )}
      />
      <div className='position-absolute form-group__icon'>
        {icon}
      </div>
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
