import React from "react";
import configureMockStore from "redux-mock-store";
import Help from "./index";
import thunkMiddleware from 'redux-thunk';

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);



jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

  jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))

  jest.mock('../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
  jest.mock('react-native-pdf', () => ({reactNativePdf: 'mockRNPdf'}))

it('should be handling Help component with network as true', () => {
    let store = mockStore({networkReducer: {network: true}});
    let context = { store };
    let wrapper = shallow(
      <Help />,
      { context },
    );
    let inst = wrapper.dive().instance()

    inst.onLoadComplete()
  })

  
it('should be handling Help component with network as false', () => {
  let store = mockStore({networkReducer: {network: false}});
  let context = { store };
  let wrapper = shallow(
    <Help />,
    { context },
  );
  let inst = wrapper.dive().instance()

  inst.onLoadComplete()
})