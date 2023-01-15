import { classNames } from '@codelab/lib';
import React from 'react';

interface IOverlayProps {
  visible: boolean;
  children: React.ReactNode;
  backdropBlur?: boolean;
  position?: 'top' | 'bottom' | 'center';
  animation?: 'zoom' | 'slide';
}

export default function ClOverlay({
  visible,
  children,
  backdropBlur,
  position,
  animation,
}: IOverlayProps) {
  return (
    <div
      className={classNames(
        'overlay',
        `overlay__${position ? position : 'center'} ${backdropBlur && 'backdropBlur'}`,
      )}
    >
      <div className={classNames(`${visible ? animation : 'exit'}`)}>{children}</div>
    </div>
  );
}
