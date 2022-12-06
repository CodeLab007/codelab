import * as React from 'react';

export interface IProps {
  label: string;
  primary: boolean;
  children: React.ReactNode;
}

export const Button = ({ label, primary }: IProps) => {
  return (
    <button
      style={{
        color: primary ? 'black' : 'blue',
      }}
    >
      {label}
    </button>
  );
};
