import React from "react";
import configureMockStore from "redux-mock-store";
import ServiceProviders from "./index";
import thunkMiddleware from 'redux-thunk';
import ServiceProvideContainer from './ServiceProvideContainer'
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { dashboardState } from "./storeVariable";
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

  it('should be handling ServiceProviders', () => {
    const store = mockStore({
      dashboardState: {dashboardState: {serviceProvider: {}}},
      networkReducer: {network: true}
    })

    let navigation = {navigate: jest.fn()}

     context = { store },
     wrapper = shallow(
      <ServiceProviders navigation = {navigation}/>,
      { context },
    ),
     inst = wrapper.dive().instance();
    inst.btnOnPress()

  });

  it('should be handling ServiceProvideContainer', () => {
    const store = mockStore({
      dashboardState,
      networkReducer: {network: true}
    })

    let navigation = {navigate: jest.fn()}

     context = { store },
     wrapper = shallow(
      <ServiceProvideContainer />,
      { context },
    ),
     inst = wrapper.dive().instance();

  });