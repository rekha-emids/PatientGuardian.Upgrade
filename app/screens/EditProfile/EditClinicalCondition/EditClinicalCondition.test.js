import React from "react";
import configureMockStore from "redux-mock-store";
import EditClinicalCondition, { Item, ItemLanguage } from "./index";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import {userState, asyncMessageState} from './storeVariable'
import { profileState, item } from './mockData'
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

  it('should be handling EditClinicalCondition', () => {
    const store = mockStore({
      profileState,
      navigation
    }),

      context = { store },
      wrapper = shallow(
        <EditClinicalCondition navigation={navigation[0]} />,
        { context },
      ),
      inst = wrapper.dive().instance();

    inst.onConfirm();
    inst.onClickClinicalConditionItem(clinicalCondition, jest.fn());
    inst.onChangeText("")
    inst.onChangeText("Hi")

  });

  it('should be handling EditClinicalCondition', () => {
    const store = mockStore({
      profileState,
      navigation
    }),

      context = { store },
      wrapper = shallow(
        <EditClinicalCondition navigation={navigation[1]} />,
        { context },
      );

    inst = wrapper.dive().instance();

    inst.onConfirm();

  });

  it('should be handling EditClinicalCondition', () => {
    const store = mockStore({
      profileState,
      navigation
    })

    context = { store },
      wrapper = shallow(
        <EditClinicalCondition navigation={navigation[1]} />,
        { context },
      );
    inst = wrapper.dive().instance();

    inst.onConfirm();

  });
})

it('should be handling Item', () => {
  const store = mockStore({
    profileState,
    navigation
  })

  context = { store },
    wrapper = shallow(
      <Item item={item} />,
      { context },
    );
  inst = wrapper.dive().instance();
});

it('should be handling ItemLanguage', () => {
  const store = mockStore({
    profileState,
    navigation
  })

  context = { store },
    wrapper = shallow(
      <ItemLanguage item={item} />,
      { context },
    );
  inst = wrapper.dive().instance();
});