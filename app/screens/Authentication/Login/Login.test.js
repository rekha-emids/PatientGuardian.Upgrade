import React from "react";
import configureMockStore from "redux-mock-store";
import Login from "./index";
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

  function FormDataMock() {
    this.append = jest.fn();
}
global.FormData = FormDataMock

  jest.mock('../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
  // test('renders correctly', () => {
  //   const tree = renderer.create(<Provider store={store}><Login /></Provider>).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  it('should be handling Login', () => {
    let store = mockStore({
      loadingState: {isLoading: false},
      authState: userState[3],
      networkReducer: {network: true}
    });


    let context = { store };
    let wrapper = shallow(
      <Login />,
      { context },
    );
    let inst = wrapper.dive().instance()

    inst.onBtnPress();
    inst.onFailure();
    inst.setState({
      errorMsg: 'invalid credentials',
      username: 'Lori.whitfoot@mailinator.com',
      password: "Emids@1234"
    })
    inst.onLoginBtnClick()

    inst.setState({
      username: '',
      password: "Emids@1234"
    })
    inst.onLoginBtnClick()

    inst.setState({
      username: 'Lori.whitfoot@mailinator.com',
      password: ""
    })
    inst.onLoginBtnClick()
    inst.setState({
      username: '',
      password: ""
    })
    inst.onLoginBtnClick();
    inst.onChangePwdTextInput()
    inst.onChangeEmailTextInput()
    inst.onCoreoHighlightBtnPress()
  })

  it('should be handling Login', () => {
    let store = mockStore({
      loadingState: {isLoading: false},
      authState: userState[4],
      networkReducer: {network: true}
    });


    let context = { store };
    let wrapper = shallow(
      <Login />,
      { context },
    );
    let inst = wrapper.dive().instance()

    inst.onBtnPress();
    inst.onFailure();
    inst.setState({
      errorMsg: 'invalid credentials',
      username: 'Lori.whitfoot@mailinator.com',
      password: "Emids@1234"
    })
    inst.onLoginBtnClick()

    inst.setState({
      username: '',
      password: "Emids@1234"
    })
    inst.onLoginBtnClick()

    inst.setState({
      username: 'Lori.whitfoot@mailinator.com',
      password: ""
    })
    inst.onLoginBtnClick()
    inst.setState({
      username: '',
      password: ""
    })
    inst.onLoginBtnClick();
    inst.onChangePwdTextInput()
    inst.onChangeEmailTextInput()
    inst.onCoreoHighlightBtnPress()
  })