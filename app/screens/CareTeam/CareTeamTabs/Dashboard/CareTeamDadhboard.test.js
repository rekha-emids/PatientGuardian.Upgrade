import React from "react";
import configureMockStore from "redux-mock-store";
import Dashboard from "./index";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);



jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))

jest.mock('react-native-device-info', () => ({	
  DeviceInfo: 'mockRNDeviceInfo',
  getUniqueID: () => {}	
}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

  jest.mock('../../../../redux/store', () => ({Store: 'mockStore'}))

  jest.mock('../../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))

  it('should be handling DashboardDetails', () => {
    let store = mockStore({
        authState: {
            userAgreementState: {
                isEulaUpdated: true,
                eulaContent: {}
            },
            userState: {userInfo: {userId: 1}}
        },
        careTeamState: {
            dashboardState: {
                individualCountRequestObject: {},
                serviceProviderCountRequestObject: {},
                serviceVisitsCountRequestObject: {},
                serviceRequestCountRequestObject: {}
            }
        }

    });

    let context = { store };
    let wrapper = shallow(
      <Dashboard
      />,
      { context },
    );
    let inst = wrapper.dive().instance();

    inst.onPressTodayIcon()
    inst.onChangeToDate('')
    inst.onChangeFromDate('')
    inst.onClickOk()
    inst.getToDateDefaultValues()
    inst.getFromDateDefaultValues()
    inst.onBtnPress()
    inst.componentDidMount()
    inst.handleTabFocus()
    inst.componentWillReceiveProps({})

  })