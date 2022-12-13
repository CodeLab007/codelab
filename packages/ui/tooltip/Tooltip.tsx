import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { ComponentAttrs } from '../types/general';

export interface ITooltipProps extends ComponentAttrs {
  showArrow?: boolean;
  arrowProps?: Tooltip.TooltipArrowProps;
  triggerProps: Tooltip.TooltipTriggerProps;
  contentProps?: Tooltip.TooltipContentProps;
  providerProps?: Tooltip.TooltipProviderProps;
}

export const ClTooltip = ({
  showArrow = true,
  arrowProps,
  triggerProps,
  contentProps,
  providerProps,
  children,
}: ITooltipProps) => {
  return (
    <Tooltip.Provider {...providerProps}>
      <Tooltip.Root>
        <Tooltip.Trigger {...triggerProps}>{triggerProps.children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className='tooltip__content' {...contentProps}>
            {children}
            {showArrow && <Tooltip.Arrow className='tooltip__arrow' {...arrowProps} />}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
