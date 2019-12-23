import 'react-native';
import React from 'react';
import Link from './Link';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Link />).toJSON();

  expect(tree).toMatchSnapshot();
});