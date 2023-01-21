import React from 'react';

import { ComponentAttrs } from '../../types/general';
import {ClHeading} from '../heading/Heading'

interface IProps extends ComponentAttrs {
  paddingTop?: string;
  paddingBottom?: string;
  marginBottom?: string;
  marginTop?: string;
  heading?: React.ReactNode;
}

export const ClSection = ({
  children,
  marginBottom = '3rem',
  marginTop = '0',
  paddingBottom = '2rem',
  paddingTop = '2rem',
  className = '',
  heading,
  style = {},
}: IProps) => {
  const styles = {
    marginTop,
    marginBottom,
    paddingBottom,
    paddingTop,
    ...style,
  };
  return (
    <section className={className} style={styles}>
      {heading && (
        <ClHeading className='text-primary text-capitalize text-center mb-3' level={2}>
          {heading}
        </ClHeading>
      )}

      {children}
    </section>
  );
};

// Add headingProps prop and set its type by importing from heading component
