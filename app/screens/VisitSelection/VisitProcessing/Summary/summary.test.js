import React from "react";
import configureMockStore from "redux-mock-store";
import Summary, { SummaryPaymentDetails, ServiceVisitDetails, PaymentDetails } from "./index";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SUMMARY_DETAILS, SUBMITTED_RESPONSE } from "../../../VisitHistory/VisitHistoryServiceDetails/mockData";
import { API_FETCHING } from "../../../../constants/AppAPIConstants";
Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);




jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

  jest.mock('../../../../redux/store', () => ({Store: 'mockStore'}))

  jest.mock('../../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
  jest.mock('react-native-pdf', () => ({reactNativePdf: 'mockRNPdf'}))
  describe('Service Visits component', () => {
    it('should be handling functions', () => {
      let store = mockStore({
        visitSelectionState: {
          VisitServiceProcessingState: {
            SummaryState: {
              getSummaryDetailsStatus: false,
              SummaryDetails: SUMMARY_DETAILS,
              CalculationsData: {}
            }
          }
        },
        visitHistoryState: {vistServiceHistoryState: {submittedResponse: SUBMITTED_RESPONSE}},
        loadingState: {isLoading: false}
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
  
      let props = createTestProps({});
      let context = { store };
      let wrapper = shallow(
        <Summary {...props} />,
        { context },
      );

      shallow(
        <SummaryPaymentDetails summaryDetails={SUMMARY_DETAILS} />,
        {context}
      )
      shallow(
        <ServiceVisitDetails summaryDetails={SUMMARY_DETAILS} CalculationsData={{}} />,
        {context}
      )
  
      const inst = wrapper.dive().instance();
    })
  })

  describe('Service Visits component', () => {
    it('should be handling functions', () => {
      let store = mockStore({
        visitSelectionState: {
          VisitServiceProcessingState: {
            SummaryState: {
              getSummaryDetailsStatus: false,
              SummaryDetails: null,
              CalculationsData: {}
            }
          }
        },
        visitHistoryState: {vistServiceHistoryState: {submittedResponse: SUBMITTED_RESPONSE}},
        loadingState: {isLoading: false}
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
  
      let props = createTestProps({});
      let context = { store };
      let wrapper = shallow(
        <Summary {...props} />,
        { context },
      );

      shallow(
        <SummaryPaymentDetails summaryDetails={SUMMARY_DETAILS} />,
        {context}
      )
      shallow(
        <ServiceVisitDetails summaryDetails={SUMMARY_DETAILS} CalculationsData={{}} />,
        {context}
      )
  
      const inst = wrapper.dive().instance();
    })
  })

  describe('Service Visits component', () => {
    it('should be handling functions', () => {
      let store = mockStore({
        visitSelectionState: {
          VisitServiceProcessingState: {
            SummaryState: {
              getSummaryDetailsStatus: API_FETCHING,
              SummaryDetails: null,
              CalculationsData: {}
            }
          }
        },
        visitHistoryState: {vistServiceHistoryState: {submittedResponse: SUBMITTED_RESPONSE}},
        loadingState: {isLoading: false}
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
  
      let props = createTestProps({});
      let context = { store };
      let wrapper = shallow(
        <Summary {...props} />,
        { context },
      );

      shallow(
        <SummaryPaymentDetails summaryDetails={SUMMARY_DETAILS} />,
        {context}
      )
      shallow(
        <PaymentDetails summaryDetails={SUMMARY_DETAILS} CalculationsData={{}} />,
        {context}
      )
      shallow(
        <ServiceVisitDetails summaryDetails={SUMMARY_DETAILS} CalculationsData={{}} />,
        {context}
      )
  
      const inst = wrapper.dive().instance();
    })
  })