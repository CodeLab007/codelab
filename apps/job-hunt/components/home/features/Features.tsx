
import {  ClCol, ClContainer, ClRow, ClSection } from '@codelab/ui';
import React from 'react';

import FeatureCard from './featureCard/FeatureCard';
export const Features = () => {
  return (
    <ClSection heading='Features'>
      <ClContainer>
        <ClRow>
          <ClCol xs={8}>
            <FeatureCard title='Frequent Job Updates' iconBgClass='bg-primary'/>
          </ClCol>
          <ClCol xs={8}>
            <FeatureCard title='Filter Jobs' iconBgClass='bg-danger'/>
          </ClCol>
          <ClCol  className='mb-4' xs={8}>
            <FeatureCard  title='Notified About Jobs' iconBgClass='bg-warning'/>
          </ClCol>
        </ClRow>
      </ClContainer>
    </ClSection>
  );
};


