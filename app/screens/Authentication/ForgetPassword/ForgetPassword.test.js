import React from "react";
import configureMockStore from "redux-mock-store";
import ForgetPassword from "./index";
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
  // test('renders correctly', () => {
  //   const tree = renderer.create(<Provider store={store}><ForgetPassword /></Provider>).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  it('should be handling forgetPassword', () => {
    let store = mockStore({
      loadingState: {isLoading: false},
      authState: userState[3]
    });


    let context = { store };
    let wrapper = shallow(
      <ForgetPassword  clearErrorFlag={jest.fn()}/>,
      { context },
    );
    let inst = wrapper.dive().instance()

    inst.setState({email: ''})

  inst.onClicksendResetPasswordLink()

  inst.setState({email: 'abc@example.com'})

  inst.onClicksendResetPasswordLink();
  inst.onChangeTextInput();
  inst.backToLogin()
  })

  it('should be handling forgetPassword', () => {
    let store = mockStore({
      loadingState: {isLoading: false},
      authState: userState[4]
    });


    let context = { store };
    let wrapper = shallow(
      <ForgetPassword  clearErrorFlag={jest.fn()}/>,
      { context },
    );
    let inst = wrapper.dive().instance()

    inst.setState({email: ''})

  inst.onClicksendResetPasswordLink()

  inst.setState({email: 'abc@example.com'})

  inst.onClicksendResetPasswordLink();
  inst.onChangeTextInput();
  inst.backToLogin()
  })