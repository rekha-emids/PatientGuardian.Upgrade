import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Availability from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
import { impersonateProfileState } from "./mockData";

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AvailabilityDays, { AvailabilityItem, Slot } from "./AvailabilityDay";
import BlockoutDays from "./BlockoutDays";
Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);
const store = mockStore({});



jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))

jest.mock('../../../routes', () => ({routes: 'mockRoutes'}))
jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
test('renders correctly', () => {
  const tree = renderer.create(<Provider store={store}><Availability /></Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});

it('should be handling SelectIndividual', () => {
  let store = mockStore({impersonateProfileState});
  let context = { store };
  let wrapper = shallow(
    <Availability />,
    { context },
  );
  let inst = wrapper.dive().instance();

  inst.getAvailableAndBlockoutDays();
})

it('should be handling AvailabilityDays', () => {
  let store = mockStore({impersonateProfileState});
  let context = { store };
  let wrapper = shallow(
    <AvailabilityDays />,
    { context },
  );
  let inst = wrapper.dive().instance();
})

it('should be handling AvailabilityItem', () => {
  let store = mockStore({impersonateProfileState});
  let context = { store };
  let wrapper = shallow(
    <AvailabilityItem
      day={{slots: [{isActive: true}]}}
      isEditable={true}
      onPress={jest.fn()}
    />,
    { context },
  );
  let inst = wrapper.dive().instance();
})

it('should be handling AvailabilityItem', () => {
  let store = mockStore({impersonateProfileState});
  let context = { store };
  let wrapper = shallow(
    <AvailabilityItem
      day={{slots: [{isActive: false}]}}
      isEditable={false}
      onPress={jest.fn()}
    />,
    { context },
  );
  let inst = wrapper.instance();
})


it('should be handling Slot ', () => {
  let store = mockStore({impersonateProfileState});
  let context = { store };
  let wrapper = shallow(
    <Slot
      isActive = {true}
      slotName = {'SlotName'}
      isEditable = {true}
      onPress = {jest.fn()}
      dayId = {123}
    />,
    { context },
  );
  let inst = wrapper.instance();
})

it('should be handling BlockoutDays ', () => {
  let store = mockStore({impersonateProfileState});
  let context = { store };
  let wrapper = shallow(
    <BlockoutDays />,
    { context },
  );
  let inst = wrapper.dive().instance();
})