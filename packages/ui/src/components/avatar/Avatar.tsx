import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';

export interface IAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: Avatar.AvatarImageProps['src'];
  alt?: Avatar.AvatarImageProps['alt'];
  fallbackDelayMs?: Avatar.AvatarFallbackProps['delayMs'];
  children: Avatar.AvatarFallbackProps['children'];
}

export const ClAvatar = ({ src, alt, fallbackDelayMs, children }: IAvatarProps) => (
  <div style={{ display: 'flex', gap: 20 }}>
    <Avatar.Root className='avatar'>
      <Avatar.Image className='avatar__image' src={src} alt={alt} />
      <Avatar.Fallback
        className='avatar__fallback'
        delayMs={fallbackDelayMs ? fallbackDelayMs : 600}
      >
        {children}
      </Avatar.Fallback>
      <ClStatus>
        <ClStatusDot />
      </ClStatus>
    </Avatar.Root>
  </div>
);

const ClStatus = ({ children }: { children: React.ReactNode }) => (
  <div className='status'>{children}</div>
);

const ClStatusDot = () => <div className='status__dot' />;
