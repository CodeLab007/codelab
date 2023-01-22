import React from 'react';
import {
  FacebookShareButton,
  // FacebookIcon,
  TwitterShareButton,
  // TwitterIcon,
  WhatsappShareButton,
  // WhatsappIcon,
} from 'next-share';

import { Facebook as FacebookIcon } from './socialIcons/FacebookIcon';
import { Twitter as TwitterIcon } from './socialIcons/TwitterIcon';
import { Whatsapp as WhatsappIcon } from './socialIcons/WhatsappIcon';
import { ClBox, ComponentAttrs } from '@codelab/ui';

interface IProps extends ComponentAttrs {
  iconSize?: number;
  url: string;
  hashtags?: string[];
  title: string;
}

const SocialShare = ({ iconSize = 32, url, hashtags = [], title, className }: IProps) => {
  return (
    <ClBox className={className} direction="row">
      <FacebookShareButton url={url} quote={title} hashtag={hashtags[0]} style={{width:iconSize}}>
        <FacebookIcon />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title} hashtags={hashtags} style={{width:iconSize}}>
        <TwitterIcon />
      </TwitterShareButton>

      <WhatsappShareButton url={url} title={title} separator=':: ' style={{width:iconSize}}>
        <WhatsappIcon />
      </WhatsappShareButton>
    </ClBox>
  );
};

export default SocialShare;
