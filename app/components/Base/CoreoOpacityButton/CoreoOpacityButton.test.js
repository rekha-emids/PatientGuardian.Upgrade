import 'react-native';
import React from 'react';
import CoreoOpacityButton from './CoreoOpacityButton';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<CoreoOpacityButton />).toJSON();

  expect(tree).toMatchSnapshot();
});