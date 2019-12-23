import React from "react";
import configureMockStore from "redux-mock-store";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EditHeightWeightDetails from ".";
import { profileState, item } from '../EditClinicalCondition/mockData'
import { navigation } from '../EditClinicalCondition/mockData'

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


describe('EditHeightWeight component', () => {
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

  it('should be handling EditHeightWeight', () => {
    const store = mockStore({
      profileState,
      navigation
    }),

      context = { store },
      wrapper = shallow(
        <EditHeightWeightDetails navigation={navigation[0]} />,
        { context },
      ),
      inst = wrapper.dive().dive().dive().dive().instance();

      inst.onFormInputChange()
      inst.onNavigateBack()
      inst.onClickUpdate()
  });

})