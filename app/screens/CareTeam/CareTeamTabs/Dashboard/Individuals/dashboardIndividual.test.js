import React from "react";
import configureMockStore from "redux-mock-store";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Individuals from "./index";
import { INDIVIDUAL_LABELS } from '../../../../../constants/constants';
Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);




jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))

jest.mock('react-navigation', () => ({reactNavigation: 'mockReactNavigation'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

  jest.mock('../../../../../redux/store', () => ({Store: 'mockStore'}))

  jest.mock('../../../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))

  it('should be handling ServiceRequestDetails', () => {
    let store = mockStore({
      careTeamState: {
        dashboardState: {
            individualCount: [{label: ""}, {label: ""}, {label: ""}, {label: ""}],
            fromDate: '',
            toDate: '',
            isLoading: true  
        }
      },
      authState: {userState: {careTeamId: 1}}
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
      <Individuals {...props}
      />,
      { context },
    );
    let inst = wrapper.dive().instance();

    inst.renderSwitch(INDIVIDUAL_LABELS.WITH_FEEDBACK_ALERTS)
    inst.renderSwitch(INDIVIDUAL_LABELS.WITH_VISITS_IN_THE_PERIOD)
    inst.renderSwitch(INDIVIDUAL_LABELS.WITH_NO_INVALID_CREDIT_CARD)
    inst.renderSwitch(INDIVIDUAL_LABELS.IN_TOTAL_IN_THE_PERIOD)
    inst.renderSwitch('')
    inst.componentWillReceiveProps({})
    inst.componentDidMount()
    inst.handleTabFocus()
  })