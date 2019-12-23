import React from "react";
import configureMockStore from "redux-mock-store";
import EditPointofServiceForm from "./index";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { profileState,  DashboardState } from './mockData'
import { navigation } from './mockData'

Enzyme.configure({ adapter: new Adapter() });
// import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware],
  mockStore = configureMockStore(middlewares);



jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

jest.mock('../../../utils/signalrUtility', () => ({signalrUtility: 'mockSignalrUtility'}))

jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))

jest.mock('../../../routes', () => ({routes: 'mockRoutes'}))
jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))


describe('EditClinicalCondition component', () => {
  let clinicalCondition = {
    attributeDescription: "Allergies",
    attributeId: 15,
    attributeName: "Allergies",
    createdDate: "0001-01-01T00:00:00",
    isActive: false,
    modifiedDate: "0001-01-01T00:00:00",
    patientId: 0,
    rowVerionId: null,
    timeZoneId: null,
    timeZoneName: null
  }
  let updatedLanguage = {id: 3, name: "Filipino"}

  it('should be handling EditPointofServiceForm', () => {
    const store = mockStore({
      profileState,
      navigation,
      form: 'EDIT_POINT_OF_SERVICE_FORM',
      DashboardState
    }),

      context = { store },
      wrapper = shallow(
        <EditPointofServiceForm navigation={navigation[0]} />,
        { context },
      ),
      inst = wrapper.dive().dive().dive().dive().instance();

    inst.onClickUpdate()
    inst.onNavigateBack()
    inst.deletePointService()
    inst.onChangeInput()
    inst.onFormInputChange();
    inst.addPointServiceFailure()

  });

  it('should be handling EditPointofServiceForm', () => {
    const store = mockStore({
      profileState,
      navigation,
      form: 'EDIT_POINT_OF_SERVICE_FORM',
      DashboardState
    }),

      context = { store },
      wrapper = shallow(
        <EditPointofServiceForm navigation={navigation[1]} />,
        { context },
      );

    inst = wrapper.dive().dive().dive().dive().instance();

    inst.onClickUpdate()
    inst.onNavigateBack()
    inst.deletePointService()
    inst.onChangeInput()
    inst.onFormInputChange()

  });

  it('should be handling EditPointofServiceForm', () => {
    const store = mockStore({
      profileState,
      navigation,
      form: 'EDIT_POINT_OF_SERVICE_FORM',
      DashboardState
    })

    context = { store },
      wrapper = shallow(
        <EditPointofServiceForm navigation={navigation[1]} />,
        { context },
      );
    inst = wrapper.dive().dive().dive().dive().instance();

    inst.onClickUpdate()
    inst.onNavigateBack()
    inst.deletePointService()
    inst.onChangeInput()
    inst.onFormInputChange()

  });
})
