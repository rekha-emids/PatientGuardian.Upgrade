import 'react-native';
import React from 'react';
import Popup from './Popup';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Popup />).toJSON();

  expect(tree).toMatchSnapshot();
});