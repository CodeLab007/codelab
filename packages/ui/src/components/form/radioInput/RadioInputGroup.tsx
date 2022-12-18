import React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';

import { ClLabel } from '../../label/Label';
import { Check } from '../checkInput/CheckInputFormik';
import { LabelProps } from '@radix-ui/react-label';

export interface IRadioGroupProps extends RadioGroup.RadioGroupProps {
  radios: Check[];
  labelProps?: LabelProps;
}

export const ClRadioGroup = ({ radios, children, labelProps, ...rest }: IRadioGroupProps) => (
  <RadioGroup.Root className='form-radio-group' {...rest}>
    {radios.map((radio) => {
      return (
        <div className='form-radio-group__radio' key={radio.value}>
          <RadioGroup.Item className='form-radio-group__item' value={radio.value} id={radio.value}>
            <RadioGroup.Indicator className='form-radio-group__indicator' />
          </RadioGroup.Item>
          {radio.label && (
            <ClLabel {...labelProps} htmlFor={radio.value}>
              {radio.label}
            </ClLabel>
          )}
        </div>
      );
    })}
    {children}
  </RadioGroup.Root>
);
