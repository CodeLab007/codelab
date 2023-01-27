import { ClBadge, ClBox, ClButton, ClCard, ClHeading, ClLink } from '@codelab/ui';
import React from 'react';
import ClText from '@codelab/ui/src/components/text/Text';
import { FaBriefcase } from 'react-icons/fa';

const JobCard = () => {
  return (
    <ClLink className='p-0' href='/jobs/1'>
      <ClBox as={ClCard} bodyAsChildren={true}>
        <ClHeading className='text-gray-7' level={4}>Full Stack Laravel, PHP Deveoper Team Lead</ClHeading>
        <ClText className='text-gray-6 mb-2' level={6}>
          Xint Solutions, Lahore
        </ClText>
        <ClBox direction='row' className='mb-2'>
          <ClBox direction='row' rowGap='0.25rem' as={ClBadge}>
            <FaBriefcase />
            <span>Full-time</span>
          </ClBox>
        </ClBox>
        <ClText className='text-gray-6 mb-3' level={6}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure voluptatibus cum itaque
          nostrum animi ut voluptas voluptates provident eius et nulla nihil...
        </ClText>
        <ClButton>Apply Now</ClButton>
      </ClBox>
    </ClLink>
  );
};

export default JobCard;
