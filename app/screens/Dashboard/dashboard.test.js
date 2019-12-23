import React from "react";
import configureMockStore from "redux-mock-store";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Dashboard from "./index";
Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);



jest.mock('react-native-device-info', () => ({DeviceInfo: 'mockRNDeviceInfo'}))

jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))

jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation', () => ({reactNavigation: 'mockReactNavigation'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))


  jest.mock('../../redux/store', () => ({Store: 'mockStore'}))

  jest.mock('../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))

  it('should be handling Dashboard', () => {
    let store = mockStore({
      authState: {
        userState: {
          isVideoPlayed: true,
          introVideoUrl: '',
          getPatientImageStatus: {},
          patientImage: {image: ''}
        },
        userAgreementState: {
          isEulaUpdated: true,
          eulaContent: {},
          getEulaContentStatus: {}
        }
      },
      dashboardState: {
        dashboardState: {
          conversationDetail: {},
          getPatientVisitsStatus: {},
          getPatientServiceRequestsStatus: {},
          getServiceProvidersStatus: {},
          dashboardRequestObject: {},
          selectedStatusId: '',
          videoConferenceNotifications: []
    
        }
      },
      loadingState: {isLoading: false},
      asyncMessageState: {isNavigationLoading: false},
      networkReducer: {network: true},
      visitSelectionState: {VisitServiceDetailsState: {cancelServiceRequestStatus: {}}},
      navigationState: {routes: []}

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


    let context = { store };
    let wrapper = shallow(
      <Dashboard {...props}
      />,
      { context },
    );
    let inst = wrapper.dive().instance();

    inst.fetchDashboardAPI()
    inst.fetchProfileApi()
    inst.handleTabFocus()
    inst._onRefresh('refresh')
    inst.fetchServerData()
    inst.onClickOk()
    inst.handleBelliconPressed()
    inst.onClickJoinConference(253)
    inst.componentWillReceiveProps({})
    inst.componentDidMount()
  })