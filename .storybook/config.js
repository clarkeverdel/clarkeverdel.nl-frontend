import { configure, addDecorator } from '@storybook/react';

import { configureViewport } from '@storybook/addon-viewport';
import { withBackgrounds } from '@storybook/addon-backgrounds';

import '../src/styles/style.scss';

addDecorator(
    withBackgrounds([
        { name: 'dark', value: '#1b1d1f', default: true },
        { name: 'primary', value: '#206bff'},
        { name: 'light', value: '#FFF' },
    ])
);

function loadStories() {
  require('../stories/index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
