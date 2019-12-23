import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ScreenCover from "./ScreenCover";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);
const store = mockStore({});



jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('@ptomasroos/react-native-multi-slider', () => ({rnmultislider: 'mockRNmultislider'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

  jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))

  test('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><ScreenCover /></Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });