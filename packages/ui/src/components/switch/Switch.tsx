import React from 'react';
import * as Switch from '@radix-ui/react-switch';
import { classNames } from '@codelab/lib';

export interface ISwitchProps extends React.HTMLAttributes<HTMLFormElement> {
  label?: string;
  htmlFor?: string;
}

export const ClSwitch = ({ label, htmlFor }: ISwitchProps) => {
  return (
    <form className={classNames()}>
      <div className='flex__center'>
        <label className='label' htmlFor={htmlFor}>
          {label}
        </label>
        <Switch.Root className='switch' id={htmlFor}>
          <Switch.Thumb className='switch__thumb' />
        </Switch.Root>
      </div>
    </form>
  );
};
