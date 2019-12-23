import React from "react";
import configureMockStore from "redux-mock-store";
import thunkMiddleware from 'redux-thunk';
import { shallow} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ServiceRequestDetails from "./index";
import { navigation } from "../../../../../EditProfile/EditClinicalCondition/mockData";
Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);


jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

  jest.mock('../../../../../../redux/store', () => ({Store: 'mockStore'}))

  jest.mock('../../../../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))

  it('should be handling ServiceRequestDetails', () => {
    let store = mockStore({
      navigation: navigation[0],
      careTeamState: {dashboardState: {serviceRequestDetails: {patient: {patientAddresses: []}}}}
    });


    let context = { store };
    let wrapper = shallow(
      <ServiceRequestDetails
      navigation ={navigation[0]}
      />,
      { context },
    );
    let inst = wrapper.dive().instance();

    inst.renderServiceTasks()
    inst.renderAddress()
    inst.renderSPPreferences()
    inst.onPressDecline()
    inst.onPressApprove()
    inst.componentDidMount()
  })