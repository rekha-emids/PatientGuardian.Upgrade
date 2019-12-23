import React from "react";
import configureMockStore from "redux-mock-store";
import RequestsTab from "./index";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
const middlewares = [ thunkMiddleware ]
const mockStore = configureMockStore(middlewares);
const store = mockStore({});



jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))

jest.mock('react-navigation', () => ({	
    reactNavigation: 'mockReactNavigation'	
  }))

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
  jest.mock('react-native-pdf', () => ({	
    reactNativePdf: 'mockRNPdf'	
  }))

  describe('RequestsTab component', () => {
    let store = mockStore({
      manageConnectionState: {
        manageConnectionDataState: {
            manageConnection: [],
            manageConnectionDataState: {
                impersonatedManageConnections: [{manageConnection: []}]
            }
        }
      },
      visitSelectionState: {
        VisitServiceProcessingState: {
          SummaryState: {
            getSummaryDetailsStatus: false,
            SummaryDetails: {},
            CalculationsData: {}
          }
        },
        VisitServiceDetailsState: {
            VisitServiceDetails: {},
            VisitServiceSchedule: {},
            getServiceDetailsStatus: {},
            cancelServiceRequestStatus: {},
            getServiceScheduleStatus: {}
        }
      },
      visitHistoryState: {
        vistServiceHistoryState: {
          submittedResponse: {},
          serviceCategories: []
        }
      },
      careTeamState: {
        dashboardState: {
            isLoading: false
        }
      },
      loadingState: {
        isLoading: false
      },
      authState: {
        userState: {
            userInfo:{
                patientId: 3,
                userType: 'I',
                userId: 2
            },
            patientId: 3
        }
      },
      menuState: {
        paymentState: {
          CardList: []
        }
      },
      serviceProvidersTabState: {
        requestsState: {
          isLoading: false,
          normalizedPointOfServices: [],
          browseState: {getEngageServiceRequests: []}
        }
      },
      networkReducer: {
        network: true
      }
      });
    it('should be handling functions', () => {
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
        navigationState: {
            routes: []
        },
        ...props
      });
  
      let props = createTestProps({});
      let context = { store };
      let wrapper = shallow(
        <RequestsTab {...props} manageConnection={[{userType: 'I'}]}/>,
        { context },
      );
      const inst = wrapper.dive().instance();
      inst.HeaderComponent()
      inst.cancelInvitation(321, 2, 'Snyder')
      inst.onRefresh()
      inst.onInactivity(() => {})
      inst.onClickSp(2, true)
      inst.onClickFavourite(2, true, () => {})
      inst.renderSearchAndSorting()
      inst.onChangeSearchText('hello')
      inst.renderBelowSortingAndFilter()
      inst.onEligibilitySuccess('hello')
      inst.onPaymentSuccess([])
      inst.onHireClicked(321, 2, 'I')
      inst.onSearch()
      inst.resetSearch()
      inst.onChangeText('hello')
      inst.renderServiceRequests([])
      inst.onClickServiceRequest(2, {patientAddressId: 2, city: 'ABC', streetAddress: '', stateName: '', zipCode: 12563, lat: 12, lon: 45})
      inst.apiToGetServiceProviders({pageNumber: 1, pageSize: 10, requestType: 'init'})
      inst.apiCall(325)
      inst.onApplyFilter({otherLocation: {}, selectedAddressDetails: {}, selectedGenderId: 44, maxExp: 35, minExp: 20, maxRate: 50, minRate: 15, rating: 1, selectedServiceCategoryId: 1, selectedServiceCategories: [], selectedSkills: [], preferredData: ['isFavourite', 'isRecent']})
      inst._keyboardDidShow({endCoordinates: {height: 10}})
      inst.handleTabFocus()
    })
})
