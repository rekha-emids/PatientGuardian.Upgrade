import React from "react";
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
// import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
// import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
// import sinon from 'sinon';
import ServiceProviders from './index';
Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);

import { CARETEAM_SERVICE_PROVIDERS } from '../../../../../constants/constants';
// import MyNavigator from './MyNavigator';

jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

  jest.mock('../../../../../redux/store', () => ({Store: 'mockStore'}))

  jest.mock('../../../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))

  jest.mock('react-navigation', () => ({reactNavigation: 'mockReactNavigation'}))

  it('should be handling ServiceRequestDetails', () => {
    let store = mockStore({
      careTeamState: {
        dashboardState: {
            serviceProviderCount: [{label: ""}, {label: ""}, {label: ""}, {label: ""}],
            fromDate: '',
            toDate: '',
            isLoading: true  
        }
      },
      authState: {userState: {careTeamId: 1}}
    });
    const createTestProps = (props) => ({
      navigation: {
        state: { params: {} },
        dispatch: jest.fn(),
        goBack: jest.fn(),
        dismiss: jest.fn(),
        navigate: jest.fn(),
        openDrawer: jest.fn(),
        closeDrawer: jest.fn(),
        toggleDrawer: jest.fn(),
        getParam: jest.fn(),
        setParams: jest.fn(),
        addListener: jest.fn(),
        push: jest.fn(),
        replace: jest.fn(),
        pop: jest.fn(),
        popToTop: jest.fn(),
        isFocused: jest.fn()
      },
      navigationState: {routes: []},
      ...props
    });
    let props = createTestProps({})


    let context = { store };
    let wrapper = shallow(
      <ServiceProviders {...props}
      />,
      { context },
    );
    let inst = wrapper.dive().instance();

    inst.renderSwitch(CARETEAM_SERVICE_PROVIDERS.IN_TOTAL_IN_THE_NETWORK)
    inst.renderSwitch(CARETEAM_SERVICE_PROVIDERS.WITH_LOW_RATINGS)
    inst.renderSwitch('With Feedback Alerts')
    inst.renderSwitch('With Visits In The Period')
    inst.renderSwitch('With Low Task Completion')
    inst.renderSwitch('')
    inst.componentWillReceiveProps({})
    inst.componentDidMount()
    inst.handleTabFocus()
  })