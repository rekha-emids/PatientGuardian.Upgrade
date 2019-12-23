import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import SetPassword from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
import { authState, onboardingState } from "./mockData";

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
    const tree = renderer.create(<Provider store={store}><SetPassword /></Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should be handling OnboardingCompleted', () => {
    let store = mockStore({
      onboardingState: onboardingState[0],
      loadingState: {isLoading: true},
      authState: authState[0],
      networkReducer: {network: true}
    });
    let context = { store };
    let wrapper = shallow(
      <SetPassword />,
      { context },
    );
    let inst = wrapper.dive().instance();

    inst.onClickButtonCancel();
    inst.onClickButtonNext();
    inst.setState({selectedProfileType: "Guardian"})
    inst.validatePassword();
    inst.validateConfirmPassword();
    inst.componentWillReceiveProps({})
  })

  it('should be handling OnboardingCompleted', () => {
    let store = mockStore({
      onboardingState: onboardingState[0],
      loadingState: {isLoading: true},
      authState: authState[2],
      networkReducer: {network: true}
    });
    let context = { store };
    let wrapper = shallow(
      <SetPassword />,
      { context },
    );
    let inst = wrapper.dive().instance();

    inst.onClickButtonCancel();
    inst.onClickButtonNext();
    inst.setState({selectedProfileType: "Guardian"})
    inst.validatePassword();
    inst.validateConfirmPassword();
    inst.componentWillReceiveProps({})
  })

  it('should be handling OnboardingCompleted', () => {
    let store = mockStore({
      onboardingState: onboardingState[1],
      loadingState: {isLoading: true},
      authState: authState[1],
      networkReducer: {network: true}
    });
    let context = { store };
    let wrapper = shallow(
      <SetPassword />,
      { context },
    );
    let inst = wrapper.dive().instance();

    inst.onClickButtonCancel();
    inst.onClickButtonNext();
    inst.setState({selectedProfileType: "Guardian"})
    inst.validatePassword();
    inst.validateConfirmPassword();
    inst.componentWillReceiveProps({})
    inst.setState({
      pass: 'Emids',
      confirmPass: 'Emids'
    })
    inst.onClickButtonNext();
    inst.onPwdChange();
    inst.onConfirmPwdChange();
    inst.onUserAgreementPress();
    inst.onClickCancel();
    inst.showModalOnCancel();
    inst.redirect();
    inst.onPressUserAgreementModal();
  })