import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { RxChevronDown } from 'react-icons/rx';

import { ComponentAttrs } from '../types/general';

import { classNames } from '../../lib/classNames';

interface IProps extends ComponentAttrs {
    
}

export const ClAccordion = () => (
  <Accordion.Root className='accordion' type='single' defaultValue='item-1' collapsible>
    <Accordion.Item className='accordion__item' value='item-1'>
      <AccordionTrigger>TR</AccordionTrigger>
      <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
    </Accordion.Item>
  </Accordion.Root>
);

const AccordionTrigger = React.forwardRef<HTMLButtonElement, ComponentAttrs>(
  ({ children, className = '', ...rest }, forwardedRef) => {
    return (
      <Accordion.Header className='accordion__header'>
        <Accordion.Trigger
          className={classNames('accordion__trigger', className)}
          {...rest}
          ref={forwardedRef}
        >
          {children}
          <RxChevronDown className='accordion__chevron' aria-hidden />
        </Accordion.Trigger>
      </Accordion.Header>
    );
  },
);
AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = React.forwardRef<HTMLDivElement, ComponentAttrs>(
  ({ children, className = '', ...rest }, forwardedRef) => (
    <Accordion.Content
      className={classNames('accordion__content', className)}
      {...rest}
      ref={forwardedRef}
    >
      <div className='accordion__content__text'>{children}</div>
    </Accordion.Content>
  ),
);

AccordionContent.displayName = 'AccordionContent';
