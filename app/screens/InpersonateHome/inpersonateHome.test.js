import React from "react";
import configureMockStore from "redux-mock-store";
import InpersonateHome from "./index";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);
const store = mockStore({});



jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

  jest.mock('../../redux/store', () => ({Store: 'mockStore'}))

  jest.mock('../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
  jest.mock('react-native-device-info', () => ({getUniqueID: () => 4}))
it('should be handling impersonateHome', () => {
    let store = mockStore({});
    let context = { store };
    let wrapper = shallow(
      <InpersonateHome />,
      { context },
    );
    let inst = wrapper.dive().instance()

    inst.onBtnPress()
    inst.onPressBack()
  })