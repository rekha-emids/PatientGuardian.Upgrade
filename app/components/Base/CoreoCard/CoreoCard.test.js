import 'react-native';
import React from 'react';
import CoreoCard from './index';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<CoreoCard/>).toJSON();

  expect(tree).toMatchSnapshot();
});