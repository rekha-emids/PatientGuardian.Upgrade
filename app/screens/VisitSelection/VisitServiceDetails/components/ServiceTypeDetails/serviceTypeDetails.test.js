import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ServiceTypeDetails from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
import { visitSelectionState } from "../../mockData";
import { navigation } from "../../../../EditProfile/EditClinicalCondition/mockData";
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);
const store = mockStore({visitSelectionState});



jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

  jest.mock('../../../../../redux/store', () => ({Store: 'mockStore'}))

  jest.mock('../../../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
  jest.mock('react-native-pdf', () => ({reactNativePdf: 'mockRNPdf'}))
  test('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><ServiceTypeDetails screenProps={{navigation: navigation[0]}} /></Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });