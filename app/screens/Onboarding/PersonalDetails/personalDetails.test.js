import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import PersonalDetails from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { onboardingState } from "./mockData";
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
    const tree = renderer.create(<Provider store={store}><PersonalDetails /></Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should be handling OnboardingCompleted', () => {
    let store = mockStore({
      networkReducer: {network: true},
      onboardingState: onboardingState[0]
    });
    let context = { store };
    let wrapper = shallow(
      <PersonalDetails />,
      { context },
    );
    let inst = wrapper.dive().instance();

    inst.onClickButtonCancel();
    inst.onSubmitClick();
    inst.onChangeInputText('abc');
    inst.setState({firstName: '123bac'})
    inst.onBlur();
  })

  it('should be handling OnboardingCompleted', () => {
    let store = mockStore({
      networkReducer: {network: true},
      onboardingState: onboardingState[1]
    });
    let context = { store };
    let wrapper = shallow(
      <PersonalDetails />,
      { context },
    );
    let inst = wrapper.dive().instance();

    inst.onClickButtonCancel();
    inst.onSubmitClick();
    inst.onChangeInputText('abc');
    inst.setState({firstName: '123bac'})
    inst.onBlur();
    inst.onChangeLastName('cba');
    inst.onLastNameBlur();
    inst.setState({lastName: '123'})
    inst.onLastNameBlur();
    inst.onChangeContactNumber();
    inst.onContactNumberBlur();
  })