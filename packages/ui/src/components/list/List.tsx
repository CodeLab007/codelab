import React from 'react';
import { ComponentAttrs } from '../../types/general';
import { ClBox } from '../box/Box';

interface IProps extends ComponentAttrs {
  items:
    | {
        content: React.ReactNode;
      }[]
    | string[];
  type?: 'ul' | 'ol';
}

export const ClList = ({ items, type = 'ul', className }: IProps) => {
  const listItems = items.map((item, i) => (
    <li key={i}>{typeof item === 'string' ? item : item.content}</li>
  ));
  const _className = [`list-style--default 'ps-3'`, className].join(' ');
  return (
    <ClBox rowGap='10px' as={type} className={_className} direction='column'>
      {listItems}
    </ClBox>
  );
};
