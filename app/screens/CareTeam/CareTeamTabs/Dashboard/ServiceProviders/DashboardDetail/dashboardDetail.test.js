import React from "react";
import configureMockStore from "redux-mock-store";
import CareTeamDashboardDetail from "./index";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
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

  it('should be handling CareTeamDashboardDetail', () => {
    let store = mockStore({
      dashboardState: {
        dashboardState: {
            patientVisit: {},
            morningVisits: [],
            eveningVisits: [],
            afternoonVisits: [],
            serviceVisitCount: 10  
        }
      }
    });

    let context = { store };
    let wrapper = shallow(
      <CareTeamDashboardDetail
      />,
      { context },
    );
    let inst = wrapper.dive().instance();

    inst.getInitialData()
    inst.apiCall({}, 'init')
    inst.onRefresh()
    inst.componentWillReceiveProps({fromDate: '', toDate: ''})
    inst.onResetFilter()
    inst.onSortChange(true)
    inst.renderSwitch('In Total In The Network')
    inst.renderSwitch('With Low Ratings')
    inst.renderSwitch('With Feedback Alerts')
    inst.renderSwitch('With Visits In The Period')
    inst.renderSwitch('With Low Task Completion')
    inst.renderSwitch('ss')
    inst.onApplyFilter({})
    inst.resetSearch()
    inst.onSearch()
    inst.onInactivity(() => {})
    inst.onApplyFilter({})

  })