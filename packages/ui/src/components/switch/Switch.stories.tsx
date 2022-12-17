// Button.stories.tsx
import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import { ClSwitch } from './Switch';

export default {
  component: ClSwitch,
} as Meta;

export const Default: Story = (args) => <ClSwitch {...args} />;
// Default.args = {
//   label: 'Button',
//   primary: true,
// };
