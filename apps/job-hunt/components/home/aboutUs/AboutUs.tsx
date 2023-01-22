import { Image } from '@/components/ui/image/Image'
import { ClBox, ClButton, ClCol, ClContainer, ClHeading, ClRow, ClSection } from '@codelab/ui'
import ClText from '@codelab/ui/src/components/text/Text'
import React from 'react'

const AboutUs = () => {
  return (
    <ClSection heading='About Us' className='bg-white'>
      <ClContainer>
        <ClRow className='align-items-center'>
          <ClCol sm={12}>
            <ClBox >
            <ClHeading level={4}>
              Jobs For All
            </ClHeading>
            <ClText level={6}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, maxime necessitatibus repellat eius consequatur ipsam maiores expedita placeat reiciendis culpa provident modi excepturi qui iste. Cumque aspernatur eos quod impedit?
            </ClText>
            <ClButton className='align-self-start'>Learn More</ClButton>
            </ClBox>
          </ClCol>
          <ClCol sm={12}>
              <Image width={500} height={500} src='/assets/images/home/about-us.png' alt='Isometric building'/>
          </ClCol>
        </ClRow>
      </ClContainer>
    </ClSection>
  )
}

export default AboutUs