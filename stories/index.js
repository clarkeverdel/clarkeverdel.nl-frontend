import React from 'react';
import { storiesOf } from '@storybook/react';

import AnimatedButton from '../src/components/AnimatedButton';

const bodyStyle = {
    padding: '20px',
    backgroundColor: 'transparent'
};

storiesOf('Animated Buttons', module)
  .add('Black', () => (
    <div style={bodyStyle}>
      <AnimatedButton color="dark" text="Find out more"/>
    </div>
  ))
  .add('Blue', () => (
    <div style={bodyStyle}>
      <AnimatedButton color="primary" text="Find out more"/>
    </div>
  ));
