import 'react-native';
import React from 'react';
import Text from './Text';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Text />).toJSON();

  expect(tree).toMatchSnapshot();
});