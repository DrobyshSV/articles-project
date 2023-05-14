import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Popover } from './Popover';
import { StoreDecorator } from '../../../../config/storybook/StoreDecorator/StoreDecorator';

export default {
  title: 'shared/Popups/Popover',
  component: Popover,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator({})],
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => <Popover {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};
