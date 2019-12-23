import 'react-native';
import React from 'react';
import Preloader from './Preloader';

import renderer from 'react-test-renderer';

jest.mock('@ptomasroos/react-native-multi-slider', () => ({rnmultislider: 'mockRNmultislider'}))

test('renders correctly', () => {
  const tree = renderer.create(<Preloader />).toJSON();

  expect(tree).toMatchSnapshot();
});