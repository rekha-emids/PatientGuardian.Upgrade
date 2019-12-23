import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Badge from "./Badge";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
const middlewares = [thunkMiddleware],
 mockStore = configureMockStore(middlewares),
 store = mockStore({});



jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

  jest.mock('../../../../utils/signalrUtility', () => ({signalrUtility: 'mockSignalrUtility'}))

  jest.mock('../../../../redux/store', () => ({Store: 'mockStore'}))

  jest.mock('../../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
  test('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><Badge label = {'G'} style={{}}/></Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });