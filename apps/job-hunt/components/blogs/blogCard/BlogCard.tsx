import { ClBadge, ClBox, ClButton, ClCard, ClHeading, ClLink } from '@codelab/ui';
import React from 'react';
import ClText from '@codelab/ui/src/components/text/Text';
import { FaPenAlt,FaClock } from 'react-icons/fa';
import { Image } from '@/components/ui/image/Image';

export const BlogCard = () => {
  const headerContent = (
    <Image
      src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
      alt='Blog Image'
      width={500}
      height={250}
      className='w-100'
    />
  );
  return (
    <ClLink className='p-0' href='/blogs/1'>
      <ClBox as={ClCard} headerContent={headerContent} noPadding={true}>
        <ClHeading className='text-gray-7 my-2' level={5}>
          How to Merge Instagram Accounts
        </ClHeading>

        <ClBox direction='row' className='mb-2'>
          <ClText className='d-flex text-gray-5' level={6}>
            <FaPenAlt /> <span className='text-primary ms-1'>Muhammad Shumas</span>
          </ClText>
          <ClText className='d-flex text-gray-5' level={6}>
            <FaClock /> <span className='text-primary ms-1'>2023-02-12</span>
          </ClText>
        </ClBox>

        <ClText className='text-gray-6' level={6}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure voluptatibus cum itaque
          nostrum animi ut voluptas voluptates provident eius et nulla nihil...
        </ClText>
        {/* <ClButton>Read More</ClButton> */}
      </ClBox>
    </ClLink>
  );
};
