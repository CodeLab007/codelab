import JobCard from '@/components/jobs/jobCard/JobCard';
import { ClCol, ClContainer, ClRow, ClSection } from '@codelab/ui';
import React from 'react';

export const RecentJobs = () => {
  return (
    <ClSection heading='Recent Jobs'>
      <ClContainer>
        <ClRow>
          <ClCol xs={4}>
            <JobCard />
          </ClCol>
          <ClCol xs={4}>
            <JobCard />
          </ClCol>
          <ClCol xs={4}>
            <JobCard />
          </ClCol>
        </ClRow>
      </ClContainer>
    </ClSection>
  );
};


