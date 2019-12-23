import 'react-native';
import React from 'react';
import CoreoHighlightButton from './CoreoHighlightButton';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<CoreoHighlightButton />).toJSON();

  expect(tree).toMatchSnapshot();
});