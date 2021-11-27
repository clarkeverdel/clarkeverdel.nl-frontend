import { MINIMAL_VIEWPORTS} from '@storybook/addon-viewport';

import '../src/styles/style.scss';

export const parameters = {
  backgrounds: {
    default: 'dark',
    values: [
      { name: 'dark', value: '#1b1d1f'},
      { name: 'primary', value: '#206bff'},
      { name: 'light', value: '#FFF' }
    ]
  },
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
      kindleFire2: {
        name: 'Kindle Fire 2',
        styles: {
          width: '600px',
          height: '963px',
        },
      },
      kindleFireHD: {
        name: 'Kindle Fire HD',
        styles: {
          width: '533px',
          height: '801px',
        },
      },
    },
    defaultViewport: 'Kindle Fire 2',
  }
};
