import React from "react";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import VisitServiceList, { getServiceRequest } from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
// import {navigation} from './mockData'
// import FormConstants from "./FormConstants";
Enzyme.configure({ adapter: new Adapter() });

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware],
  mockStore = configureMockStore(middlewares);



jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))

jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation', () => ({reactNativeFetchBlob: 'mockRNNavigation'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

jest.mock('../../../utils/signalrUtility', () => ({signalrUtility: 'mockSignalrUtility'}))

jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))

jest.mock('../../../routes', () => ({
  routes: 'mockRoutes',
  PATH: "path"
}))
jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))



describe('VisitServiceList component', () => {
    it('VisitServiceList', () => {  
      const store = mockStore({
        visitHistoryState: {vistServiceHistoryState: {serviceCategories: []}},
        menuState: {spVisitInProgressState: {isServiceProviderInStandBy: false}},
        profileState: {PersonalDetailState: {imageData: ""}},
        visitSelectionState: {
            VisitServiceListState: {
                getVisitServicesStatus: {},
                visitServiceList: []
            },
            VisitServiceDetailsState: {
                getVisitServiceDetailsStatus: {},
                setVideoCallStatus: {},
                setConversationStatus: {},
                VisitServiceDetails: {},
                patientId: 2,
                VisitServiceSchedule: {},
                cancelServiceRequestStatus: {},
                firstAndLastVisitDates: {},
                offlineVisitIds: []
            },
            VisitServiceProcessingState: {
                AssessmentState: {},
                PerformTasksState: {
                    getPerformTasksStatus: {},
                    PerformTasksList: {
                        visitStatus: 'IN_PROGRESS',
                        visitStartTime: null,
                        visitEndTime: null,
                        visitTimeDuration: 10
                    }
                },
                SummaryState: {
                    SummaryDetails: {patient: {patientId: 3}, originalTotalDuration: 5, serviceRequestId: 333, servicePlanVisitId: 34, serviceProviderId: 2, serviceRequestVisitId: 22, totalTask: '', serviceRequestTypeVisits: [], totalTaskCompleted: 4, totalTask: 5},
                    getSummaryDetailsStatus: true,
                    CalculationsData: {originalChargableTime: "11:23:44", uiChargableTime: "11:23:44"},
                    actualTimeDiff: 15000,
                    originalTimeDiff: {},
                    timeUpdated: false
                },
                FeedbackState: {isLoading: false}
            }
        },
        authState: {userState: {serviceProviderId: 2, isEntityServiceProvider: true}},
        syncServerState: {syncDataBackToServer: false},
        dashboardState: {dashboardState: {assignServiceProvider: {}, serviceProviderList: [], selectedVisitDate: ""}},
        networkReducer: {network: true}
      });

      const createTestProps = (props) => ({
        navigation: {
          state: { params: {serviceRequestVisitId: 12} },
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
          ...props
        });

        let props = createTestProps({});

      const context = { store };

        wrapper = shallow(
          <VisitServiceList {...props} onClickNext= {() => {}} data={[]} startOrStopService={() => {}} performTasksList={{visitStatus: 'IN_PROGRESS', visitStartTime: null, visitEndTime: null, visitTimeDuration: null}}/>,
          { context },
        ),
        inst = wrapper.dive().instance()
        inst.refreshScreen()
        inst.onRefresh()
        inst.onResetFilter()
        inst.onSortChange(true, true)
        inst.onApplyFilter({
          seletedDateRange: {
            fromDate: "",
            toDate: ""
          },
          statusData: {1: 1, 2: 2}
        })
        inst.onNewServiceRequestClick()
        inst.apiCall({}, "init")
        inst.handleTabFocus()
        inst.onApplyFilter({
          seletedDateRange: {
            fromDate: null,
            toDate: null
          }
        })
        inst.onSortChange(null, null)
        inst.onInactivity(() => {})
        getServiceRequest({})
      });
  })