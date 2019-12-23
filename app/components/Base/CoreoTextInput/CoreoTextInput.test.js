import 'react-native';
import React from 'react';
import CoreoTextInput from './CoreoTextInput';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<CoreoTextInput />).toJSON();

  expect(tree).toMatchSnapshot();
});