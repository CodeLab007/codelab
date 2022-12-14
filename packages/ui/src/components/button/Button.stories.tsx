// Button.stories.tsx
import * as React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ClButton } from './Button';

export default {
  component: ClButton,
} as ComponentMeta<typeof ClButton>;

export const Primary: ComponentStory<typeof ClButton> = (args) => <ClButton {...args} />;
