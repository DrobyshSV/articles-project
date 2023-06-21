import { addDecorator } from '@storybook/react';

import { FeaturesFlagsDecorator } from '../../src/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import { Theme } from '../../src/shared/const/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  themes: {
    default: 'light',
    list: [
      { name: 'light', class: ['app', Theme.LIGHT], color: '#a9a9ff' },
      { name: 'dark', class: ['app', Theme.DARK], color: '#27275d' },
      { name: 'orange', class: ['app', Theme.GREEN], color: '#43c01a' },
    ],
  },
};

addDecorator(StyleDecorator);
addDecorator(RouterDecorator);
addDecorator(SuspenseDecorator);
addDecorator(FeaturesFlagsDecorator({}));
