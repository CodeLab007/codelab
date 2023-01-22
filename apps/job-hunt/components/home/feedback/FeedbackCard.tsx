import { ClAvatar, ClBadge, ClBox, ClButton, ClCard, ClHeading, ClLink } from '@codelab/ui';
import React from 'react';
import ClText from '@codelab/ui/src/components/text/Text';
import { Image } from '@/components/ui/image/Image';
import SocialShare from '@/components/ui/socialShare/SocialShare';

export const FeedbackCard = () => {
  return (
    <ClBox as={ClCard}>
      <ClBox direction='row' className='mb-3'>
        <Image
          src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
          alt='avatar'
          width={40}
          height={40}
          className='rounded-circle'
        />
        <ClBox direction='column' rowGap='0'>
          <ClHeading level={6}>Dany Morrison</ClHeading>
          <ClText level={7}>Student</ClText>
        </ClBox>
        <SocialShare className='ms-auto' iconSize={24} title="Feedback" url="http://localhost:3001"/>
      </ClBox>
      <ClText level={6}>
      &quot;Extra ordinary platform, I managed to find my first job through them & their support system is just Great!&quot;
      </ClText>
    </ClBox>
  );
};
