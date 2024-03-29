import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import GeneralComponent from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
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
  const tree = renderer.create(<Provider store={store}><GeneralComponent /></Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});

it('should be handling GeneralComponent', () => {

  let item = {
    coreoHomeUserId: 363,
    firstName: "lori",
    image: "",
    imageArray: null,
    lastName: "vill",
    name: "Spouse",
    patientId: 1022,
    userType: "G"

  }
  let wrapper = shallow(
    <GeneralComponent />
  );
  let inst = wrapper.instance();

  inst._renderItem({item})
  inst.onRenderItemPress(item, true)
  inst.onRenderItemPress(item, false)
  inst.onTouchableOpacityPress(item, true)
  inst.onTouchableOpacityPress(item, false)

  item = {
    coreoHomeUserId: 363,
    firstName: "lori",
    image: "",
    imageArray: null,
    lastName: "vill",
    name: "Spouse",
    patientId: 1022,
    userType: "P"

  }
  inst.onRenderItemPress(item, true)
  inst.onRenderItemPress(item, false)
  inst.onTouchableOpacityPress(item, true)
  inst.onTouchableOpacityPress(item, false)
})