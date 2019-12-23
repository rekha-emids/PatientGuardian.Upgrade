import React from "react";
import configureMockStore from "redux-mock-store";
import DashboardDetail from "./index";
import thunkMiddleware from 'redux-thunk';
const middlewares = [ thunkMiddleware ]
const mockStore = configureMockStore(middlewares);

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CARETEAM_SERVICE_VISITS } from "../../../../../../constants/constants";
Enzyme.configure({ adapter: new Adapter() });


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

    jest.mock('../../../../../../redux/store', () => ({	
    Store: 'mockStore'	
  }))

    jest.mock('../../../../../../routes', () => ({	
    routes: 'mockRoutes'	
  }))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({	
    reactNativeMultiSlider: 'mockRNMultiSlider'	
  }))


   describe('DashboardDetail component', () => {  

     it('should be handling functions patient else cases', () => {
      const store = mockStore({
        careTeamState:{
          dashboardState:{
                selectedCount:{
                  label: "nothing"
                },
                serviceRequestDashboardDetail: [],
                fromDate: "",
                toDate: "",
                careTeamId: 0,
                isLoading: false
          },
        },
        authState: {
          userState: {
            careTeamId: 0
          }
        },
        navigationState:{
            routes:[]
        },
        networkReducer: {
            network: true
        }
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
        navigationState: {
            routes: []
        },
        ...props
      });

       let props = createTestProps({})

       const context = { store };
      const wrapper = shallow(
        <DashboardDetail {...props} />,
        { context },
      );
      const inst = wrapper.dive().instance();
      inst.onRefresh()
      inst.apiCall({})
      inst.getInitialData()
      inst.componentWillReceiveProps({})
      inst.onApplyFilter({selectedServiceCategories: {}})
      inst.onResetFilter()
      inst.getSortOrderAndName()
      inst.resetSearch()
      inst.onSearch()
      inst.renderSwitch(CARETEAM_SERVICE_VISITS.IN_TOTAL_IN_THE_NETWORK)
      inst.renderSwitch(CARETEAM_SERVICE_VISITS.CANCELLED_IN_THE_PERIOD)
      inst.renderSwitch(CARETEAM_SERVICE_VISITS.WITH_LOW_TASK_COMPLETION)
      inst.renderSwitch(CARETEAM_SERVICE_VISITS.OVERDUE_IN_THE_PERIOD)
      inst.onInactivity()
    });

   })