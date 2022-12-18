import React from 'react';
import * as Select from '@radix-ui/react-select';

import { FaCheck, FaChevronDown, FaChevronUp } from 'react-icons/fa';


import { classNames } from '@codelab/lib';

export const ClSelectInput = () => (
  <Select.Root >
    <Select.Trigger className='select__trigger' aria-label='Food'>
      <Select.Value placeholder='Select a fruit…' />
      <Select.Icon className='Select__icon'>
        <FaChevronDown />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className='select__content'>
        <Select.ScrollUpButton className='select__scroll-button'>
          <FaChevronUp />
        </Select.ScrollUpButton>
        <Select.Viewport className='select__viewport'>
          <Select.Group>
            <Select.Label className='select__label'>Fruits</Select.Label>
            <SelectItem value='apple'>Apple</SelectItem>
            <SelectItem value='banana'>Banana</SelectItem>
            <SelectItem value='blueberry'>Blueberry</SelectItem>
            <SelectItem value='grapes'>Grapes</SelectItem>
            <SelectItem value='pineapple'>Pineapple</SelectItem>
          </Select.Group>

          <Select.Separator className='select__separator' />

          <Select.Group>
            <Select.Label className='select__label'>Vegetables</Select.Label>
            <SelectItem value='aubergine'>Aubergine</SelectItem>
            <SelectItem value='broccoli'>Broccoli</SelectItem>
            <SelectItem value='carrot' disabled>
              Carrot
            </SelectItem>
            <SelectItem value='courgette'>Courgette</SelectItem>
            <SelectItem value='leek'>leek</SelectItem>
          </Select.Group>

          <Select.Separator className='select__separator' />

          <Select.Group>
            <Select.Label className='select__label'>Meat</Select.Label>
            <SelectItem value='beef'>Beef</SelectItem>
            <SelectItem value='chicken'>Chicken</SelectItem>
            <SelectItem value='lamb'>Lamb</SelectItem>
            <SelectItem value='pork'>Pork</SelectItem>
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton className='select__scroll-button'>
          <FaChevronDown />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

const SelectItem = React.forwardRef<HTMLDivElement, Select.SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classNames('select__item', className ?? '')}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className='select__item-indicator'>
          <FaCheck />
        </Select.ItemIndicator>
      </Select.Item>
    );
  },
);
SelectItem.displayName = 'SelectItem';
export default ClSelectInput;
