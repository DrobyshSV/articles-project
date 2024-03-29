import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Select } from './Select';

export default {
  title: 'shared/Select',
  component: Select,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Add value',
  options: [
    { value: '123', content: 'First item' },
    { value: '1234', content: 'Second item' },
  ],
};
