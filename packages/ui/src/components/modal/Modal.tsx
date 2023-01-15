import { classNames } from '@codelab/lib';
import React from 'react';

export interface IModalProps {
  children: React.ReactNode;
}

export default function ClModal({ children }: IModalProps) {
  return <div className={classNames('modal')}>{children}</div>;
}
