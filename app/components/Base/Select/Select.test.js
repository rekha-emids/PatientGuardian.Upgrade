import 'react-native';
import React from 'react';
import Select from './Select';

import renderer from 'react-test-renderer';
jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))

jest.mock('../../../redux/store/index', () => ({store: 'mockStore'}))
jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))

jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
test('renders correctly', () => {
  const tree = renderer.create(<Select />).toJSON();

  expect(tree).toMatchSnapshot();
});