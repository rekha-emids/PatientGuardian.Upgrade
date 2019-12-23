import 'react-native';
import React from 'react';
import CoreoImage from './Image';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<CoreoImage/>).toJSON();

  expect(tree).toMatchSnapshot();
});