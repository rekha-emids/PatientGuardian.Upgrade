import React from "react";
import configureMockStore from "redux-mock-store";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CareTeam from "./index";
Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);



jest.mock('react-native-device-info', () => ({	
    DeviceInfo: 'mockRNDeviceInfo',
    getUniqueID: () => {}	
}))

jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))

jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({	
  rnfb: 'mockRNFirebase',
  messaging: () => ({
onTokenRefresh: () => {},
  onMessage: () => {}
}),
  notifications: () => ({
onNotificationOpened: () => {},
  onNotification: () => {}
})
}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

  jest.mock('../../redux/store', () => ({Store: 'mockStore'}))

  jest.mock('../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))

  it('should be handling ServiceRequestDetails', () => {
    let store = mockStore({
      profileState: {PersonalDetailState: {personalDetail: {}}},
      authState: {userState: {userInfo: {}}}
    });


    let context = { store };
    let wrapper = shallow(
      <CareTeam
      />,
      { context },
    );
    let inst = wrapper.dive().instance();

    inst.onBtnPress()
    inst.showVideoConferencePopup({})
    inst.onConfirm()
    inst.onCancel()
  })