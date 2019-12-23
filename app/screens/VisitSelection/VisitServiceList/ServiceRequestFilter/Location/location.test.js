import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import HourlyRate from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

Enzyme.configure({ adapter: new Adapter() });

jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-firebase', () => ({
  rnfb: 'mockRNFirebase'
}))



jest.mock('react-navigation-redux-helpers', () => ({
  reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'
}))

jest.mock('../../../../../utils/signalrUtility', () => ({
  signalrUtility: 'mockSignalrUtility'
}))

jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))


jest.mock('../../../../../redux/store', () => ({
  Store: 'mockStore'
}))

jest.mock('../../../../../routes', () => ({
  routes: 'mockRoutes',
  PATH: "path"
}))

jest.mock('@ptomasroos/react-native-multi-slider', () => ({	
  reactNativeMultiSlider: 'mockRNMultiSlider'	
}))
describe('Experience component', () => {
    it('Experience', () => {  
      const store = mockStore({
        careTeamState: {
            dashboardState: {clinicalConditions: []}
        },
        visitHistoryState: {
            vistServiceHistoryState: {
                attributeProviders: [],
                serviceCategories: []
            }
        },
        menuState: {
            spVisitInProgressState: {
                isServiceProviderInStandBy: false
            }
        },
        profileState: {
            PersonalDetailState: {
                imageData: ""
            }
        },
        visitSelectionState: {
            VisitServiceListState: {
                getVisitServicesStatus: {},
                visitServiceList:[]
            },
            VisitServiceDetailsState:{
                getVisitServiceDetailsStatus:{},
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
                    getPerformTasksStatus:{},
                    PerformTasksList: {
                        visitStatus: 'IN_PROGRESS',
                        visitStartTime: null,
                        visitEndTime: null,
                        visitTimeDuration: 10
                    }
                },
                SummaryState: {
                    SummaryDetails: {patient: {patientId: 3}, originalTotalDuration : 5, serviceRequestId : 333, servicePlanVisitId: 34, serviceProviderId : 2, serviceRequestVisitId : 22, totalTask: '', serviceRequestTypeVisits: [],totalTaskCompleted: 4, totalTask: 5},
                    getSummaryDetailsStatus: true,
                    CalculationsData: {originalChargableTime: "11:23:44", uiChargableTime: "11:23:44"},
                    actualTimeDiff: 15000,
                    originalTimeDiff: {},
                    timeUpdated: false
                },
                FeedbackState: {
                    isLoading: false
                }
            }
        },
        serviceProvidersTabState: {
          requestsState: {
            pointOfServices: []
          }
        },
        authState: {
            userState: {serviceProviderId: 2, isEntityServiceProvider: true}
        },
        syncServerState: {
            syncDataBackToServer: false
        },
        dashboardState: {
            dashboardState: {assignServiceProvider: {}, serviceProviderList: [], selectedVisitDate: "", lookupDetails: {state: []}}
        },
        networkReducer:{
          network:true
        },
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
          <HourlyRate otherLocation={{street: 'abc', city: 'AAA', state: 'AL', zip: 14526, range: 2}} types={[{serviceTypeId: 1, serviceTypeDescription: "hey"}]} {...props} onClickNext= {() => {}} data={[]} startOrStopService={() => {}} performTasksList={{visitStatus: 'IN_PROGRESS', visitStartTime: null, visitEndTime: null, visitTimeDuration: null}}/>,
          { context },
        ),
        inst = wrapper.dive().instance()
        inst.renderError()
        inst.renderFileds()
        inst.renderAddress()

      })
})

