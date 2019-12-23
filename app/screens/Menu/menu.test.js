import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Menu from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';


import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {  profileState } from "./mockData";
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

jest.mock('../HomeTabs', () => ({HomeTabs: 'mockHomeTabs'}))
jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
jest.mock('react-native-pdf', () => ({reactNativePdf: 'mockRNPdf'}))
test('renders correctly', () => {
  const tree = renderer.create(<Provider store={store}><Menu /></Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});

it('should be handling Menu', () => {
  let store = mockStore({
    authState: {
      userState: {
        patientImage: {image: ''},
        patientName: '',
        userInfo: {
          userType: 'I',
          coreoHomeUserId: 2
        },
        userImage: ''
      }
    },
    profileState: {PersonalDetailState: {personalDetail: profileState}},
    careTeamState: {dashboardState: {itemDetail: {individualId: 30}}},
    dashboardState: {
      dashboardState: {
        menuVideoConferenceNotifications: [],
        getOngoingVideoConferenceStatus: {}
      }
    },
    networkReducer: {network: true}
  });
  let context = { store };
  let wrapper = shallow(
    <Menu />,
    { context },
  );
  let inst = wrapper.dive().instance()

  inst.onPressPayment();
  inst.onPressProfileSelection();
  inst.goToManageConnection({});
  inst.onClickJoinConference(235);
  inst.onPressMenuItem('PAYMENT');
  inst.onPressMenuItem('CONNECTIONS');
  inst.onPressMenuItem('VISIT_HISTORY');
  inst.onPressMenuItem('VIDEO_CONFERENCE');
  inst.onPressMenuItem('ABOUT_US');
  inst.onPressMenuItem('SETTINGS');
  inst.onPressMenuItem('SUPPORT');
  inst.onPressMenuItem('HELP');
  inst.onPressProfileSelection();
  inst.startConference();
})

