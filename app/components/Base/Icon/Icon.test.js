import React from "react";
import configureMockStore from "redux-mock-store";
import Icon from "./index";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
// import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware],
 mockStore = configureMockStore(middlewares);



jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

jest.mock('../../../utils/signalrUtility', () => ({signalrUtility: 'mockSignalrUtility'}))

jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))

jest.mock('../../../routes', () => ({
  routes: 'mockRoutes',
  PATH: 'path'
}))
jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))


describe('Dots component', () => {

  it('should be handling Dots', () => {
    const store = mockStore({
      asyncMessageState: {conversation: []},
      authState: {userState: {userInfo: {userType: 'G', userId: '10'}}} 
    }),

     context = { store },
     wrapper = shallow(
      <Icon
      name={""}
    size={10}
    color={""}
    style={{}}
    type={"Ionicons"}
    bgStyle={{}}
    text={""}
    onPress={() => {}}
    backgroundColor={""}
      />,
      { context },
    )
    wrapper.instance();
  });

  it('should be handling Dots', () => {
    const store = mockStore({
      asyncMessageState: {conversation: []},
      authState: {userState: {userInfo: {userType: 'G', userId: '10'}}} 
    }),

     context = { store },
     wrapper = shallow(
      <Icon
      name={""}
    size={10}
    color={""}
    style={{}}
    type={"Entypo"}
    bgStyle={{}}
    text={""}
    onPress={() => {}}
    backgroundColor={""}
      />,
      { context },
    )
    wrapper.instance();
  });

  it('should be handling Dots', () => {
    const store = mockStore({
      asyncMessageState: {conversation: []},
      authState: {userState: {userInfo: {userType: 'G', userId: '10'}}} 
    }),

     context = { store },
     wrapper = shallow(
      <Icon
      name={""}
    size={10}
    color={""}
    style={{}}
    type={"FontAwesome"}
    bgStyle={{}}
    text={""}
    onPress={() => {}}
    backgroundColor={""}
      />,
      { context },
    )
    wrapper.instance();
  });

  it('should be handling Dots', () => {
    const store = mockStore({
      asyncMessageState: {conversation: []},
      authState: {userState: {userInfo: {userType: 'G', userId: '10'}}} 
    }),

     context = { store },
     wrapper = shallow(
      <Icon
      name={""}
    size={10}
    color={""}
    style={{}}
    type={"EvilIcons"}
    bgStyle={{}}
    text={""}
    onPress={() => {}}
    backgroundColor={""}
      />,
      { context },
    )
    
    wrapper.instance();
  });

  it('should be handling Dots', () => {
    const store = mockStore({
      asyncMessageState: {conversation: []},
      authState: {userState: {userInfo: {userType: 'G', userId: '10'}}} 
    }),

     context = { store },
     wrapper = shallow(
      <Icon
      name={""}
    size={10}
    color={""}
    style={{}}
    type={"MaterialCommunityIcons"}
    bgStyle={{}}
    text={""}
    onPress={() => {}}
    backgroundColor={""}
      />,
      { context },
    )
    
    wrapper.instance();
  });
  
  it('should be handling Dots', () => {
    const store = mockStore({
      asyncMessageState: {conversation: []},
      authState: {userState: {userInfo: {userType: 'G', userId: '10'}}} 
    }),

     context = { store },
     wrapper = shallow(
      <Icon
      name={""}
    size={10}
    color={""}
    style={{}}
    type={"FontAwesomeButton"}
    bgStyle={{}}
    text={""}
    onPress={() => {}}
    backgroundColor={""}
      />,
      { context },
    )
    
    wrapper.instance();
  });

  it('should be handling Dots', () => {
    const store = mockStore({
      asyncMessageState: {conversation: []},
      authState: {userState: {userInfo: {userType: 'G', userId: '10'}}} 
    }),

     context = { store },
     wrapper = shallow(
      <Icon
      name={""}
    size={10}
    color={""}
    style={{}}
    type={""}
    bgStyle={{}}
    text={""}
    onPress={() => {}}
    backgroundColor={""}
      />,
      { context },
    )
    wrapper.instance();
  });

})