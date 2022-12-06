import * as React from 'react';

export interface IProps {
  label: string;
  primary: boolean;
}

export const Button = ({ label, primary }: IProps) => {
  return (
    <button
      className='btn'
      style={{
        color: primary ? 'black' : 'blue',
      }}
    >
      {label}
    </button>
  );
};
