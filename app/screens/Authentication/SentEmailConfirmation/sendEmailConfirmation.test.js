import React from "react";
import configureMockStore from "redux-mock-store";
import SentEmailConfirmation from "./index";
import thunkMiddleware from 'redux-thunk';
import { shallow} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {userState } from "./storeVariable";

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

  it('should be handling functions', () => {
    let store = mockStore({
      authState: {userState: userState[3]},
      networkReducer: {network: false},
      loadingState: {isLoading: true}
    });


    // let props = createTestProps({});
    let context = { store };
    let wrapper = shallow(
      <SentEmailConfirmation sendResetPasswordLink = {jest.fn()}/>,
      { context },
    );
    let inst = wrapper.dive().instance()

    inst.setState({email: 'abc@example.com'})
    inst.onClicksendResetPasswordLink()

    inst.setState({email: ''})
    inst.onClicksendResetPasswordLink()
  })