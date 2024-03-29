import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import AddMemberDetails from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { manageConnectionState, onboardingState } from "./mockData";
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
    const tree = renderer.create(<Provider store={store}><AddMemberDetails /></Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should be handling AddGuardianDetails', () => {
    let store = mockStore({
      manageConnectionState,
      loadingState: {isLoading: false},
      onboardingState
    });
    let e = {endCoordinates: {height: 40}}
    let context = { store };
    let wrapper = shallow(
      <AddMemberDetails />,
      { context },
    );
    let inst = wrapper.dive().instance();
  })