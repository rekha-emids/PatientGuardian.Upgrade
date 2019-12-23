import React from "react";
import configureMockStore from "redux-mock-store";
import VisitServicesList from "./index";
import { shallow } from 'enzyme';
import thunkMiddleware from 'redux-thunk';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { VISIT_HISTORY_LIST } from "./mockData";
import { INIT } from "../../../constants/AppAPIConstants";
Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);



jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

  jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))

  jest.mock('../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
  jest.mock('react-native-pdf', () => ({reactNativePdf: 'mockRNPdf'}))
  describe('Service Visits component', () => {
    let store = mockStore({
      visitHistoryState: {
        vistServiceHistoryState: {
          VisitServiceHistory: VISIT_HISTORY_LIST,
          getVisitServicesListStatus: false
        }
      },
      loadingState: {isLoading: false},
      networkReducer: {network: true},
      authState: {userState: {patientId: 1}}
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
        navigationState: {routes: []},
        ...props
      });
  
      let props = createTestProps({});
      let context = { store };
      let wrapper = shallow(
        <VisitServicesList {...props} />,
        { context },
      );
      const inst = wrapper.dive().instance();

      inst.onRefresh()
      inst.onRefresh(() => {})
      inst.onInactivity()
      inst.onClickServiceVisitCard(1, {servicePlanVisitId: 1, visitTypeId: 1, serviceProviderId: 1})
      inst.apiCall({}, INIT)
      inst.apiCall(null, INIT)
      inst.onApplyFilter(
        {
          seletedDateRange: {fromDate: "123", toDate: "456"}, 
          selectedServiceCategories: {},
          selectedServiceProviderIds: {},
          selectedServiceCategoryId: 1
    })
    inst.onApplyFilter(
      {
        seletedDateRange: {fromDate: null, toDate: null}, 
        selectedServiceCategories: {1: 1},
        selectedServiceProviderIds: {},
        selectedServiceCategoryId: 1
  })
  inst.onApplyFilter(
    {
      seletedDateRange: {}, 
      selectedServiceCategories: {},
      selectedServiceProviderIds: {},
      selectedServiceCategoryId: 1
})
  inst.apiCall({}, INIT)
    })
})