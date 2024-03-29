import React from "react";
import configureMockStore from "redux-mock-store";
import MyProvider from "./index";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
const middlewares = [ thunkMiddleware ]
const mockStore = configureMockStore(middlewares);
const store = mockStore({});



jest.mock('jsencrypt', () => ({	
    encryptPassword: 'mockJSEncrypt'	
}))


jest.mock('react-native-background-task', () => ({	
  rnbt: 'mockRNBackgroundTask'	
}))

jest.mock('react-native-firebase', () => ({	
  rnfb: 'mockRNFirebase'	
}))

jest.mock('rn-fetch-blob', () => ({	
  reactNativeFetchBlob: 'mockRNFetchBlob'	
}))

jest.mock('react-navigation-redux-helpers', () => ({	
    reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'	
  }))

  jest.mock('../../../../../redux/store', () => ({	
    Store: 'mockStore'	
  }))

  jest.mock('../../../../../routes', () => ({	
    routes: 'mockRoutes'	
  }))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({	
    reactNativeMultiSlider: 'mockRNMultiSlider'	
  }))
  jest.mock('react-native-pdf', () => ({	
    reactNativePdf: 'mockRNPdf'	
  }))

  describe('MyProvider component', () => {
    let store = mockStore({
      visitSelectionState: {
        VisitServiceProcessingState: {
          SummaryState: {
            getSummaryDetailsStatus: false,
            // SummaryDetails: SUMMARY_DETAILS,
            CalculationsData: {}
          }
        },
        VisitServiceDetailsState: {
            VisitServiceDetails: {},
            serviceProviderId: 1,
            VisitServiceSchedule: {},
            getServiceDetailsStatus: {},
            cancelServiceRequestStatus: {},
            getServiceScheduleStatus: {}
        }
      },
      dashboardState: {
        dashboardState: {
            tabNavigation: {navigate: () => {}}
        }
      },
      visitHistoryState: {
        vistServiceHistoryState: {
          submittedResponse: {}
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
                patientId: 3
            },
            patientId: 3
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
        <MyProvider {...props} />,
        { context },
      );
      const inst = wrapper.dive().instance();
      inst.browseServiceProviders()

    })
})
