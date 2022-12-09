import * as React from 'react';

export interface IProps {
  label: string;
  primary: boolean;
}

export const Button = ({ label, primary }: IProps) => {
  return <button className="btn btn-secondary">Button 5</button>;
};
