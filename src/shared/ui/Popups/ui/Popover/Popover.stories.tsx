import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { StoreDecorator } from '../../../../config/storybook/StoreDecorator/StoreDecorator';

import { Popover } from './Popover';

export default {
  title: 'shared/Popups/Popover',
  component: Popover,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator({})],
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => (
  <Popover {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
