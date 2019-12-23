import React from "react";
import configureMockStore from "redux-mock-store";
import SummittedFeedback, { Question } from "./index";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SUMMARY_DETAILS, SUBMITTED_RESPONSE } from "../mockData";
import { USER_TYPES } from "../../../../constants/constants";
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
        <SummittedFeedback {...props} />,
        { context },
      );
      const inst = wrapper.dive().dive().dive().dive().instance();
    })
})
describe('Service Visits component', () => {
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

    it('should be handling functions', () => {
      const createTestProps = (props) => ({
        navigation: {
          state: {params: {feedbackAlertUserType: USER_TYPES.SERVICE_PROVIDER}},
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
        <SummittedFeedback {...props} />,
        { context },
      );
      let questionWrapper = shallow(
        <Question feedbackAlertUserType={USER_TYPES.SERVICE_PROVIDER} feedbackAlertStatus={true} answerTypeDescription={"OpenText"} />,
        {context},
    )
      const inst = wrapper.dive().dive().dive().dive().instance();
    })
})


describe('Service Visits component', () => {
    let store = mockStore({
        visitSelectionState: {
            VisitServiceProcessingState: {
                SummaryState: {
            getSummaryDetailsStatus: false,
            SummaryDetails: {serviceProvider: {}},
            CalculationsData: {}
          }
        }
      },
      visitHistoryState: {vistServiceHistoryState: {submittedResponse: SUBMITTED_RESPONSE}},
      loadingState: {isLoading: false}
      });

    it('should be handling functions', () => {
      const createTestProps = (props) => ({
        navigation: {
          state: {params: {feedbackAlertUserType: USER_TYPES.SERVICE_PROVIDER}},
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
        hideNavbar: true,
        ...props
      });
  
      let props = createTestProps({});
      let context = { store };
      let wrapper = shallow(
        <SummittedFeedback {...props} />,
        { context },
      );

      let questionWrapper = shallow(
        <Question {...props} />,
        {context},
    )
      const questionWrapperInst = questionWrapper.dive().instance()
      const inst = wrapper.dive().dive().dive().dive().instance();
    })
})