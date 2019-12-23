import React from "react";
import configureMockStore from "redux-mock-store";
import ReduxFormTextInput from "./index";
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

jest.mock('../../../routes', () => ({
  routes: 'mockRoutes',
  PATH: 'path'
}))
jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))


describe('ReduxFormPicker component', () => {

  it('should be handling ReduxFormPicker', () => {
    const store = mockStore({
      asyncMessageState: {conversation: []},
      authState: {userState: {userInfo: {userType: 'G', userId: '10'}}} 
    }),

     context = { store },
     wrapper = shallow(
      <ReduxFormTextInput  input={{value: '', onChange: () => {}, name: FormConstants.PHONE}} meta={{touched: true, valid: true, error: ''}} label={""} format={''} defaultDate={""} minimumDate={""} maximumDate={''} onChangeText={() => {}} screen={"profile"}
    onFormInputChange={() => {}}
    />,
      { context },
    )

    wrapper.props().children[0].props.onChangeText('test')

  });

  it('should be handling ReduxFormPicker', () => {
    const store = mockStore({
      asyncMessageState: {conversation: []},
      authState: {userState: {userInfo: {userType: 'G', userId: '10'}}} 
    }),

     context = { store },
     wrapper = shallow(
      <ReduxFormTextInput  input={{value: '', onChange: () => {}, name: FormConstants.ZIP_CODE, onBlur: () => {}}} meta={{touched: true, valid: false, error: ''}} label={""} format={''} defaultDate={""} minimumDate={""} maximumDate={''} onChangeText={() => {}} keyboardType={'numeric'}
    onFormInputChange={() => {}}

    />,
      { context },
      
    )

    wrapper.props().children[0].props.onChangeText('test')
    wrapper.props().children[0].props.onBlur('test')


  });

  

})