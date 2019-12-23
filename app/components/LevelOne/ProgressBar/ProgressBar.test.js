import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
import ProgressBar from "./index";
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);




jest.mock('../../../utils/encryptPassword', () => ({encryptPassword: 'mockencryptPassword'}))

jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

  jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))

  jest.mock('../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
  test('renders correctly', () => {

    const store = mockStore({});
    const tree = renderer.create(
        <Provider store={store}>
          <ProgressBar
          containerStyle={{}}
          progressStyle={{}}
          />
        </Provider>
        ).toJSON();
  })