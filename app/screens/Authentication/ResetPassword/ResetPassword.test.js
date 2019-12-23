import React from "react";
import configureMockStore from "redux-mock-store";
import ResetPassword from "./index";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { userState } from "./storeVariable";
Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);



jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

  jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))

  jest.mock('../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))

  it('should be handling ResetPassword', () => {
    let store = mockStore({
      loadingState: {isLoading: false},
      authState: {resetPasswordState: userState[3].loginState.resetPasswordState},
      networkReducer: {network: true}
    });


    let context = { store };
    let wrapper = shallow(
      <ResetPassword />,
      { context },
    );
    let inst = wrapper.dive().instance()

    inst.setState({
      password: 'Emids@123',
      rePassword: '123'
    })
    inst.onClickButtonReset()

    inst.setState({password: ''})
    inst.onClickButtonReset()
    inst.onPressBtn();
    inst.onChangepwdTextInput()
    inst.onChangeRePwdTextInput();
  })