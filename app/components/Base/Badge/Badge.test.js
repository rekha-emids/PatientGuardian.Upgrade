import 'react-native';
import React from 'react';
import Badge from './Badge';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Badge/>).toJSON();

  expect(tree).toMatchSnapshot();
});