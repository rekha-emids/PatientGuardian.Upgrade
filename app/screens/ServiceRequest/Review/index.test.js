import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Review from "./index";
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
import { SERVICE_CATEGORIES } from "../Requirements/mockData";
import { userState } from "../../AsyncMessage/AddParticipant/storeVariable";

Enzyme.configure({ adapter: new Adapter() });

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware],
 mockStore = configureMockStore(middlewares);

const store = mockStore({});

jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

  jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))

  jest.mock('../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
  test('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><Review /></Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('Visit service details component', () => {
    let store = mockStore({
      networkReducer: {network: true}, 
      authState: {userState: userState[0]},
      syncServerState: {isSyncComplete: true},
      servicerequestState: SERVICE_CATEGORIES,
      loadingState: {isLoading: true},
      DashboardState: {
        dashboardState: {
          lookupDetails: {
            gender: [{
              name: "Others",
              id: 8
            },
            {
              name: "Male",
              id: 7
            },
            {
              name: "Female",
              id: 6
            }
          ]
          }
        }
      }
      });

    it('should be handling functions', () => {
      const createTestProps = (props) => ({
        navigator: {
          navigate: jest.fn(),
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
        <Review changeActiveIndex={() => null} removeError={() => null} {...props} />,
        { context },
      );
      const inst = wrapper.dive().instance()

      inst.onClickBackToDashboard()
      inst.onSuccess()
      inst.onNxt()
      inst.componentWillReceiveProps({isNextButtonClicked: true})
    })
})

describe('Visit service details component', () => {
  let store = mockStore({
    networkReducer: {network: true}, 
    syncServerState: {isSyncComplete: true},
    authState: {userState: userState[0]},
    servicerequestState: {
      ...SERVICE_CATEGORIES,
      schedulepreferencesState: {
        ...SERVICE_CATEGORIES.schedulepreferencesState,
        schedulePreferencesObj: {
          ...SERVICE_CATEGORIES.schedulepreferencesState.schedulePreferencesObj,
          minimumServiceProviderExperience: 7,
          selectedScheduleType: 32,
          selectedAddressKey: -1,
          selectedStateKey: 12
        }
      }
    },
    loadingState: {isLoading: true},
    DashboardState: {
      dashboardState: {
        lookupDetails: {
          gender: [{
            name: "Others",
            id: 8
          },
          {
            name: "Male",
            id: 7
          },
          {
            name: "Female",
            id: 6
          }
        ]
        }
      }
    }
    });

  it('should be handling functions', () => {
    const createTestProps = (props) => ({
      navigator: {
        navigate: jest.fn(),
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
      <Review changeActiveIndex={() => null} removeError={() => null} {...props} />,
      { context },
    );
    const inst = wrapper.dive().instance()

    inst.onClickBackToDashboard()
    inst.onSuccess()
    inst.onNxt()
    inst.componentWillReceiveProps({isNextButtonClicked: true})
  })
})