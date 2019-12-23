import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ResetPasswordSuccess from "./index";
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
    const tree = renderer.create(<Provider store={store}><ResetPasswordSuccess /></Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  
  it('should be handling Reset password', () => {
    let store = mockStore({
      networkReducer: {network: false},
      loadingState: {isLoading: true}
    });


    // let props = createTestProps({});
    let context = { store };
    let wrapper = shallow(
      <ResetPasswordSuccess sendResetPasswordLink = {jest.fn()}/>,
      { context },
    );
    let inst = wrapper.dive().instance()

    inst.setState({email: ''})

    inst.onClicksendResetPasswordLink()

    inst.setState({email: 'abc@example.com'})

    inst.onClicksendResetPasswordLink()
  })