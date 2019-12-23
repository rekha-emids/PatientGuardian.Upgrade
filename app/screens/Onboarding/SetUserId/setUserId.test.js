import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import SetUserId from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { onboardingState, authState } from "./mockData";
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
    const tree = renderer.create(<Provider store={store}><SetUserId /></Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should be handling OnboardingCompleted', () => {
    let store = mockStore({
      onboardingState: onboardingState[0],
      loadingState: {isLoading: true},
      networkReducer: {network: true},
      authState: authState[0]

    });
    let context = { store };
    let wrapper = shallow(
      <SetUserId />,
      { context },
    );
    let inst = wrapper.dive().instance();

    inst.onClickButtonPrevious();
    inst.onClickSendVerificationLink();
    inst.onChangeEmail('John@mailinator.com');
    inst.onBlurEmail();
    inst.setState({email: 'John@mailinator.com'})
    inst.onClickButtonPrevious();
    inst.componentWillUnmount();
    inst.onCancelClickWizScreen();
  })

  it('should be handling OnboardingCompleted', () => {
    let store = mockStore({
      onboardingState: onboardingState[1],
      loadingState: {isLoading: true},
      networkReducer: {network: true},
      authState: authState[0]

    });
    let context = { store };
    let wrapper = shallow(
      <SetUserId />,
      { context },
    );
    let inst = wrapper.dive().instance();

    inst.onClickButtonPrevious();
    inst.onClickSendVerificationLink();
    inst.onChangeEmail('John@mailinator.com');
    inst.onBlurEmail();
    inst.setState({email: 'John@mailinator.com'})
    inst.onClickButtonPrevious();
    inst.componentWillUnmount();
    inst.onCancelClickWizScreen();
    inst.showModalOnCancelConfirm();
    inst.showModalOnCancel();
  })