import { Image } from '@/components/ui/image/Image';
import { classNames } from '@codelab/lib';
import { ClBox, ClContainer, ClLink, ClSection, ClHeading } from '@codelab/ui';

import ClText from '@codelab/ui/src/components/text/Text';
import React from 'react';
import classes from './heroHeader.module.scss';
export const HeroHeader = () => {
  return (
    <ClSection marginBottom='0'>
      <ClContainer className='d-flex justify-content-between align-items-center'>
        <ClBox
          rowGap='1.5rem'
          className={classNames('align-items-start', classes['hero-header__content'])}
        >
          <ClHeading className='text-gray-7 text-capitalize'>
            Join Now And Find Your Dream Job
          </ClHeading>
          <ClText className='text-gray-6' level={6}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure sit magnam facere
            provident officiis, laudantium hic eveniet iste nihil in ad eaque quas rem cumque
            eligendi doloremque! Molestiae, temporibus dicta?
          </ClText>
          <ClLink href='/jobs' className='btn btn__primary btn__lg'>
            Browse Jobs
          </ClLink>
        </ClBox>
        <ClBox>
          <Image
            src='/assets/images/home/hero-header.png'
            width={500}
            height={500}
            alt='Person pointing'
          />
        </ClBox>
      </ClContainer>
      <div className='xs:container bg-primary'>
        <h1 className='text-3xl font-bold underline shadow-lg text-success card'>
          Hello world!
        </h1>
      </div>
    </ClSection>
  );
};
