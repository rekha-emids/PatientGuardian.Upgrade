import React from "react";
import configureMockStore from "redux-mock-store";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CoreoWizFlow from "./CoreoWizFlow";
Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);

jest.mock('react-native-device-info', () => ({DeviceInfo: 'mockRNDeviceInfo'}))

jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))

jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

  jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))

  jest.mock('../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))

  it('should be handling CoreoWizFlow', () => {
    let store = mockStore({
      dashboardState: {
          dashboardState: {
              patientVisit: {},
              morningVisits: [],
              eveningVisits: [],
              afternoonVisits: [],
              serviceVisitCount: 10  
          }
      },
      authState: {
        userState: {
            userType: 'I',
            patientId: 1,
            impersinated: false
        }  
      },
      networkReducer: {network: true}
    });


    let context = { store };
    let wrapper = shallow(
      <CoreoWizFlow
      />,
      { context },
    );
    // let inst = wrapper.dive().instance();
    // inst.cancelVisit(253)
    // inst.hideModal()
    // inst.goToServiceRequestDetails({})
    // inst.onClickSummaryDetails(2)
    // inst.onPressStartVisit(125)
    // inst.showNoNumberModal()
    // inst.onPhonePress({})
    // inst.timeout(1000)
    // inst.onPressConversation({serviceProvider:{entitySpCoreoHomeUserId:2, serviceProviderId:5}})
    // inst.calendarComponent()
    // inst.onTeleHealthPress({serviceProvider:{entitySpCoreoHomeUserId:2, serviceProviderId:5}})
    // inst.onchangeDropdown('June')
    // inst.goToSPProfile(256)
    // inst.showallText()
    // inst.onSelectDate('', 2)
    // inst.slicedData({})
    // inst.componentWillReceiveProps({})
    // inst.componentDidMount()
    // inst.onPressTodayIcon()

    
    
  })