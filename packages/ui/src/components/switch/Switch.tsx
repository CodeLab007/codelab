import React, { useState } from 'react';
import * as Switch from '@radix-ui/react-switch';
import { classNames } from '@codelab/lib';
import { Variant } from '../../types/general';

export interface ISwitchProps extends React.HTMLAttributes<HTMLFormElement> {
  variant?: Variant;
  name?: string;
  disabled?: boolean;
  defaultChecked?: boolean;
  checked?: boolean;
  required?: boolean;
  value?: string;
  label?: string;
  htmlFor?: string;
  onTurnedOn?: () => void;
  onTurnedOff?: () => void;
}

export const ClSwitch = ({
  name,
  variant,
  disabled,
  defaultChecked,
  checked,
  required,
  value,
  label,
  htmlFor,
  onTurnedOn,
  onTurnedOff,
}: ISwitchProps) => {
  const handleChange = (event: any) => {
    if (event) {
      console.log(event);
    } else {
      console.log(event);
    }
  };
  return (
    <form>
      <div className='flex__center'>
        <label className='label' htmlFor={htmlFor}>
          {label}
        </label>
        <Switch.Root
          name={name}
          disabled={disabled}
          defaultChecked={defaultChecked}
          checked={checked}
          required={required}
          value={value}
          onCheckedChange={(e) => {
            handleChange(e);
          }}
          className={classNames('switch', `switch__${variant}`)}
          id={htmlFor}
        >
          <Switch.Thumb className='switch__thumb' />
        </Switch.Root>
      </div>
    </form>
  );
};
