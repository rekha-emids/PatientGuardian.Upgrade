import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import WelcomeScreen from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { authState } from "./mockData";
Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

Platform = require('react-native').Platform; 

jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))


jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

  jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))


  jest.mock('../../../routes', () => ({	
    routes: 'mockRoutes'
  }))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({	
    reactNativeMultiSlider: 'mockRNMultiSlider'	
  }))


  it('should be handling OnboardingCompleted', () => {
    Platform.OS = 'android'
    let store = mockStore({
      loadingState: {isLoading: true},
      authState: authState[0],
      onboardingState:{
        welcomeState: {
          canOnboard: true
        }
      }
      networkReducer: {network: true}

    });
    let context = { store };
    let wrapper = shallow(
      <WelcomeScreen />,
      { context },
    );
    let inst = wrapper.dive().instance();

    inst.requestCameraPermission()
    inst.setState({appState: 'active'})
    inst._handleAppStateChange('active');
    inst.componentWillUnmount();
    inst.onBoardingFun();
    inst._handleOpenURL({url: 'http://coreoHome.com'})
  })


  it('should be handling OnboardingCompleted', () => {
    Platform.OS = 'android'
    let store = mockStore({
      loadingState: {isLoading: true},
      authState: authState[0],
      networkReducer: {
        network: false
      },
      onboardingState:{
        welcomeState: {
          canOnboard: false
        }
      }

    });
    let context = { store };
    let wrapper = shallow(
      <WelcomeScreen />,
      { context },
    );
    let inst = wrapper.dive().instance();

    inst.requestCameraPermission()
    inst.setState({appState: 'active'})
    inst._handleAppStateChange('active');
    inst._handleAppStateChange('inactive')
    inst._handleAppStateChange('background')
    inst.componentWillUnmount();
    inst.onBoardingFun();
    inst._handleOpenURL({url: 'http://coreoHome.com/resetpassword'})
    inst._handleOpenURL({url: 'http://coreoHome.com/setpassword'})
    inst._handleOpenURL({url: 'http://coreoHome.com/TelehealthInviteScreen'})
  })