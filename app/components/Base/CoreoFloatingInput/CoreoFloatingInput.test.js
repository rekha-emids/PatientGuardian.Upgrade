import React from "react";
import configureMockStore from "redux-mock-store";
import CoroeFloatingInput from "./CoreoFloatingInput";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FormConstants from "../../../screens/EditProfile/EditPersonalDetails/FormConstants";

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


describe('CoroeFloatingInput component', () => {

  it('should be handling CoroeFloatingInput', () => {
    const store = mockStore({authState: {}}),

     context = { store },
     wrapper = shallow(
      <CoroeFloatingInput onChangeText={() => {}} keyboardType={'numeric'} name={FormConstants.PHONE} onBlur={() => {}} value={'test'}
      placeholder={""}
      />,
      { context },
    ),
     inst = wrapper.instance();

     inst.onChangeText("test+1")
     inst.handleFocus()
     inst.handleBlur()

  });

})