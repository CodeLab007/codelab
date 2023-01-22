import { ClBox, ClButton, ClHeading, ClSection, ClTextInput } from '@codelab/ui';
import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
export const Newsletter = () => {
  return (
    <ClSection marginBottom='0' className='bg-white py-7' heading='Signup For Newsletter'>
      <ClBox className='mx-auto' style={{maxWidth:'25rem'}} rowGap="0">
        <ClTextInput
          className='ps-5'
          size='lg'
          placeholder='Enter your email here'
          icon={<FaEnvelope className='text-gray-7' />}
        />
        <ClButton>Submit</ClButton>
      </ClBox>
    </ClSection>
  );
};
