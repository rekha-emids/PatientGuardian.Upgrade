import React from "react";
import configureMockStore from "redux-mock-store";
import DashboardDetail from "./index";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { careTeamState, serviceProvidersTabState, authState } from "./storeVariable";
Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);




jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

  jest.mock('../../../../../../redux/store', () => ({Store: 'mockStore'}))

  jest.mock('../../../../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))

  it('should be handling ItemDetail', () => {
    let store = mockStore({
        careTeamState: careTeamState[0],
        serviceProvidersTabState,
        authState: authState[0].loginState
    });


    let context = { store };
    let wrapper = shallow(
      <DashboardDetail
      />,
      { context },
    );
    let inst = wrapper.dive().instance();

    inst.componentWillUnmount();
    inst.onPressConversation();
    inst.onTeleHealthPress();
    inst.onCallPopUp('9999999999')
    inst.onCallPopUp('');
    inst.showNoNumberModal()
  })

  it('should be handling ItemDetail', () => {
    let store = mockStore({
        careTeamState: careTeamState[1],
        serviceProvidersTabState,
        authState: authState[0].loginState
    });


    let context = { store };
    let wrapper = shallow(
      <DashboardDetail
      />,
      { context },
    );
    let inst = wrapper.dive().instance();

    inst.componentWillUnmount();
    inst.onPressConversation();
    inst.onTeleHealthPress();
    inst.onCallPopUp('9999999999')
    inst.onCallPopUp('');
    inst.showNoNumberModal()
  })