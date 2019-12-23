import React from "react";
import configureMockStore from "redux-mock-store";
import ServiceScheduleDetails from "./index";
import thunkMiddleware from 'redux-thunk';
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


 jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

 jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

 jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

 jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

   jest.mock('../../../../../redux/store', () => ({Store: 'mockStore'}))

   jest.mock('../../../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))


  describe('ServiceScheduleDetails component', () => {  
  
    it('should be handling functions patient else cases', () => {
      const store = mockStore({
        servicerequestState: {
            requirementsState: {
                getServiceCategoryStauts: true,
                getServiceTypesStatus: true,
                requirementObj: {}
          },
          reviewState: {postServiceRequestStatus: true}
        },
        visitSelectionState: {
          VisitServiceDetailsState: {
            VisitServiceDetails: {},
            VisitServiceSchedule: {},
            firstAndLastVisitDates: {},
            getServiceScheduleStatus: {}
          }
        },
        networkReducer: {network: true}
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
  
      const context = { store };
      const wrapper = shallow(
        <ServiceScheduleDetails {...props} screenProps={{isPlanVisit: true}}/>,
        { context },
      );
      const inst = wrapper.dive().instance();

      inst.apiCall({}, 'INIT')
      inst.onCancelVisit(356)
      inst.onClickSummaryDetails(55)
      inst.onPressStartVisit(253)
      inst.onReset()
      inst.emptyView()
      inst.onInactivity(() => {})
      inst.onApplyFilter({visitStatusData: [{status: ''}], seletedDateRange: {fromDate: '', toDate: ''}, selectedServiceCategories: []})
    });
  
  })

