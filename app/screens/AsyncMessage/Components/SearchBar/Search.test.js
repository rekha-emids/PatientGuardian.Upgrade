import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Search from "./Search";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware],
 mockStore = configureMockStore(middlewares),
 store = mockStore({});



jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

  jest.mock('../../../../redux/store', () => ({Store: 'mockStore'}))

  jest.mock('../../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
  jest.mock('react-navigation', () => ({reactNavigation: 'mockReactNavigation'}))
  test('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><Search /></Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  
  it('should be handling ParticipantSelect with negative scenario', () => {

    const component = shallow(<Search 
      icon = {{type: 'md'}}
      noIcon = {true}
      lightTheme = {true}
      containerStyle={{}}
      inputStyle = {{}}
      round = {true}
      showLoadingIcon = {true}
      loadingIcon = {{}}
      clearIcon = {() => {}}
      // Deprecated
      textInputRef = {() => {}}
      // Deprecated
      containerRef = {() => {}}
      underlineColorAndroid = ""
      onChangeText = {() => {}}
      onClearText = {() => {}}      
      />)

    component.instance().clearText()
    component.instance().blur()
    component.instance().focus()
    component.instance().getRefHandler()

  });

  it('should be handling ParticipantSelect with negative scenario', () => {

    const component = shallow(<Search 
      icon = {{}}
      noIcon = {true}
      lightTheme = {true}
      containerStyle={{}}
      inputStyle = {{}}
      round = {true}
      showLoadingIcon = {true}
      loadingIcon = {{}}
      clearIcon = {() => {}}
      // Deprecated
      textInputRef = {() => {}}
      // Deprecated
      containerRef = {() => {}}
      underlineColorAndroid = ""
      onChangeText = {() => {}}
      onClearText = {() => {}}
      />)

    component.instance().clearText()
    component.instance().blur()
    component.instance().focus()
    component.instance().getRefHandler()

  });