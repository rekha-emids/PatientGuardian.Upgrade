import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import SelectIndividual from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
import { authState, onSelectIndividual } from "./mockData";

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

  jest.mock('../../redux/store', () => ({Store: 'mockStore'}))

  jest.mock('../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
  test('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><SelectIndividual /></Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should be handling SelectIndividual', () => {
    let store = mockStore({
      networkReducer: {network: true},
      authState: authState[0].loginState  
    });
    let context = { store };
    let wrapper = shallow(
      <SelectIndividual />,
      { context },
    );
    let inst = wrapper.dive().instance();
  })


  it('should be handling SelectIndividual', () => {
    let store = mockStore({
      networkReducer: {network: true},
      authState: authState[1].loginState
    });
    let context = { store };
    let wrapper = shallow(
      <SelectIndividual />,
      { context },
    );
    let inst = wrapper.dive().instance();

    inst.onSelectMe();
    inst.onBack();
    inst.onSelectIndividual(onSelectIndividual);
  })

  
  it('should be handling SelectIndividual', () => {
    let store = mockStore({
      networkReducer: {network: true},
      authState: authState[2].loginState
    });
    let context = { store };
    let wrapper = shallow(
      <SelectIndividual />,
      { context },
    );
    let inst = wrapper.dive().instance();

    inst.onSelectMe();
    inst.onBack();
    inst.onSelectIndividual(onSelectIndividual);
  })

  it('should be handling SelectIndividual', () => {
    let store = mockStore({
      networkReducer: {network: true},
      authState: authState[3].loginState
    });
    let context = { store };
    let wrapper = shallow(
      <SelectIndividual />,
      { context },
    );
    let inst = wrapper.dive().instance();

    inst.onSelectMe();
    inst.onBack();
    inst.onSelectIndividual(onSelectIndividual);
  })