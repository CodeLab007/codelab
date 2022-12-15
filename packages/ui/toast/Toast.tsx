import * as Toast from '@radix-ui/react-toast';

import { FaTimes } from 'react-icons/fa';

import { classNames } from '@codelab/lib';

export interface IToastProps extends Toast.ToastProps {
  providerProps?: Toast.ToastProviderProps;
  closeProps?: Toast.ToastCloseProps;
  titleProps?: Toast.ToastTitleProps;
  descriptionProps?: Toast.ToastDescriptionProps;
  actionProps?: Toast.ToastActionProps;
  viewportProps?: Toast.ToastViewportProps;
}

export const ClToast = ({
  providerProps,
  closeProps,
  titleProps,
  descriptionProps,
  actionProps,
  viewportProps,
  ...rest
}: IToastProps) => {
  return (
    <Toast.Provider {...providerProps}>
      <Toast.Root className='toast' {...rest}>
        <Toast.Close
          {...closeProps}
          className={classNames('toast__close', closeProps?.className ?? '')}
        >
          {closeProps?.children ? closeProps.children : <FaTimes />}
        </Toast.Close>

        <Toast.Title
          className={classNames('toast__title', titleProps?.className ?? '')}
          {...titleProps}
        >
          {titleProps?.children}
        </Toast.Title>
        <Toast.Description {...descriptionProps}>{descriptionProps?.children}</Toast.Description>
        {actionProps && (
          <Toast.Action className='toast__action' {...actionProps}>
            {actionProps?.children}
          </Toast.Action>
        )}
      </Toast.Root>
      <Toast.Viewport className='toast__viewport' {...viewportProps} />
    </Toast.Provider>
  );
};
