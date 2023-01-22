import Logo from '@/components/ui/logo/Logo';
import { Facebook } from '@/components/ui/socialShare/socialIcons/FacebookIcon';
import { Twitter } from '@/components/ui/socialShare/socialIcons/TwitterIcon';
import { ClBox, ClCol, ClContainer, ClHeading, ClLink, ClList, ClRow } from '@codelab/ui';
import ClText from '@codelab/ui/src/components/text/Text';
import React from 'react';

export const Footer = () => {
  const items = ['Service1', 'Service2', 'Service3', 'Service4', 'Service5', 'Service6'];
  return (
    <footer className='py-5'>
      <ClContainer>
        <ClRow className='align-items-center'>
          <ClCol sm={8}>
            <ClBox>
              <Logo />
              <ClText level={6} className='mb-3'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum molestiae vitae hic
                aperiam blanditiis ullam nostrum odit praesentium vel eos?
              </ClText>
              <ClHeading level={6}>Follow Us</ClHeading>
              <ClBox direction='row'>
                <ClLink applyLinkStyles={false} href='https://google.com.pk'>
                  <Facebook />
                </ClLink>
                <ClLink applyLinkStyles={false} href='https://google.com.pk'>
                  <Twitter />
                </ClLink>
              </ClBox>
            </ClBox>
          </ClCol>
          <ClCol sm={5}>
            <ClBox direction='column'>
              <ClHeading className='text-primary' level={6}>Solutions</ClHeading>
              <ClList items={items} />
            </ClBox>
          </ClCol>
          <ClCol sm={5}>
            <ClBox direction='column'>
              <ClHeading className='text-primary' level={6}>Industries</ClHeading>
              <ClList items={items} />
            </ClBox>
          </ClCol>
          <ClCol sm={5}>
            <ClBox direction='column'>
              <ClHeading className='text-primary' level={6}>Company</ClHeading>
              <ClList items={items} />
            </ClBox>
          </ClCol>
        </ClRow>
      </ClContainer>
    </footer>
  );
};
