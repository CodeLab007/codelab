

import { ClCol, ClContainer, ClRow, ClSection } from '@codelab/ui';
import React from 'react';
import { FeedbackCard } from './FeedbackCard';

export const Feedback = () => {
  return (
    <ClSection heading='Happy Clients About Us'>
      <ClContainer>
        <ClRow>
          <ClCol xs={8}>
            <FeedbackCard />
          </ClCol>
          <ClCol xs={8}>
          <FeedbackCard  />
          </ClCol>
          <ClCol xs={8}>
          <FeedbackCard  />
          </ClCol>
        </ClRow>
      </ClContainer>
    </ClSection>
  );
};


