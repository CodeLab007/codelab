import { classNames } from '@codelab/lib';
import { ClBox, ClCard, ClHeading } from '@codelab/ui';
import ClText from '@codelab/ui/src/components/text/Text';
import React from 'react';

import { FaBriefcase } from 'react-icons/fa';
interface IProps {
  iconBgClass: string;
  title:string
}
const FeatureCard = ({ iconBgClass,title }: IProps) => {
  return (
    <ClBox as={ClCard} bodyAsChildren={true}>
      <div className={classNames(iconBgClass, 'text-gray-1 p-3 mb-3 rounded-lg')}>
        <FaBriefcase size='2rem' />
      </div>
      <ClHeading level={5}>{title}</ClHeading>
      <ClText level={6} className='text-gray-6'>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit dolor quis, repudiandae
        maxime necessitatibus mollitia, eligendi repellendus corporis placeat saepe atque iusto
        labore cum sint commodi dignissimos accusamus tempore nemo.
      </ClText>
    </ClBox>
  );
};

export default FeatureCard;
