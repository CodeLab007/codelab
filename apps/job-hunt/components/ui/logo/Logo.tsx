import { ClLink, ComponentAttrs } from '@codelab/ui';
import {ClHeading} from '@codelab/ui/src/components/heading/Heading';
import React from 'react';

interface IProps extends ComponentAttrs{}

const Logo = ({className}:IProps) => {
  return (
    <ClLink applyLinkStyles={false} className={className} href='/'>
      <ClHeading className='text-dark' level={2}>
        Job<span className='fw-bold text-primary'>Hunt</span>
      </ClHeading>
    </ClLink>
  );
};

export default Logo;
