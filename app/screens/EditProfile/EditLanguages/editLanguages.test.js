import React from "react";
import configureMockStore from "redux-mock-store";
import EditLanguages from "./index";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { profileState,  nextProps } from './mockData'
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

  it('should be handling EditLanguages', () => {
    const store = mockStore({
      profileState,
      navigation
    }),

      context = { store },
      wrapper = shallow(
        <EditLanguages navigation={navigation[0]} />,
        { context },
      ),
      inst = wrapper.dive().instance();

    inst.onConfirm();
    inst.onChangeText("")
    inst.onChangeText("Hi")
    inst.updateList(updatedLanguage);
    inst.onClickLanguageItem(updatedLanguage, jest.fn());
    inst.componentWillReceiveProps(nextProps)

  });

  it('should be handling EditLanguages', () => {
    const store = mockStore({
      profileState,
      navigation
    }),

      context = { store },
      wrapper = shallow(
        <EditLanguages navigation={navigation[1]} />,
        { context },
      );

    inst = wrapper.dive().instance();

    inst.onConfirm();

  });

  it('should be handling EditLanguages', () => {
    const store = mockStore({
      profileState,
      navigation
    })

    context = { store },
      wrapper = shallow(
        <EditLanguages navigation={navigation[1]} />,
        { context },
      );
    inst = wrapper.dive().instance();

    inst.onConfirm();

  });
})
