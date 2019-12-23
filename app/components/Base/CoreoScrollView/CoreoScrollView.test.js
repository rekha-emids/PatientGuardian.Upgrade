import 'react-native';
import React from 'react';
import CoreoScrollView from './CoreoScrollView';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<CoreoScrollView />).toJSON();

  expect(tree).toMatchSnapshot();
});