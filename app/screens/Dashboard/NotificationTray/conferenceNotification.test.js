import React from "react";
import configureMockStore from "redux-mock-store";
import NotificationTray from "./index";
import {ConferenceNotification} from './ConferenceNotification'
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


it('should be handling NotificationTray', () => {
    const store = mockStore({}),

     context = { store },
     wrapper = shallow(
      <NotificationTray />,
      { context },
    ),
     inst = wrapper.instance();


  });

  it('should be handling ConferenceNotification', () => {
    const store = mockStore({}),

     context = { store },
     wrapper = shallow(
      <ConferenceNotification onClickJoin = {jest.fn()} roomNumber={1}/>,
      { context },
    ),
     inst = wrapper.instance();

    inst.btnPress()

  });