import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ServiceRequestContainer from "./ServiceRequestContainer";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { HIRED_STATUS, OPEN_STATUS } from "../../../constants/constants";

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

  jest.mock('../../../routes', () => ({	
    routes: 'mockRoutes',
    PATH: "path"
  }))


  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
  test('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><ServiceRequestContainer /></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('ServiceRequest filter component', () => {
    it('ServiceRequest', () => {
      const store = mockStore({
        dashboardState: {
          dashboardState: {
            conversationDetail: {},
            patientServiceRequest: []
          }
        },
        authState: {
          userState: {
            impersinated: false
          }
        },
        networkReducer: {
          network: true
        }
      }),

        context = { store },
        wrapper = shallow(
          <ServiceRequestContainer />,
          { context },
        ),
        inst = wrapper.dive().instance()
    });
  })

  describe('ServiceRequest filter component', () => {
    it('ServiceRequest', () => {
      const store = mockStore({
        dashboardState: {
          dashboardState: {
            conversationDetail: {},
            patientServiceRequest: [
              {
                types: [{serviceTypeDescription: "category", serviceTypeId:12}],
                recurringPatternDescription: 'One Time',
                startDate: "1990-01-01",
                serviceRequestId: 1,
                image: "",
                serviceCategoryDescription: "description",
                statusId: HIRED_STATUS
              },
              {
                types: [{serviceTypeDescription: "category", serviceTypeId:12}],
                recurringPatternDescription: 'Weekly',
                startDate: "1990-01-01",
                serviceRequestId: 1,
                image: "",
                serviceCategoryDescription: "description",
                statusId: OPEN_STATUS
              },
              {
                types: [{serviceTypeDescription: "category", serviceTypeId:12}],
                recurringPatternDescription: 'no',
                startDate: "1990-01-01",
                serviceRequestId: 1,
                image: null,
                serviceCategoryDescription: "description",
                statusId: OPEN_STATUS
              }
            ]
          }
        },
        authState: {
          userState: {
            impersinated: false
          }
        },
        networkReducer: {
          network: false
        }
      }),

        context = { store },
        wrapper = shallow(
          <ServiceRequestContainer navigation={{navigate: () => {}}} />,
          { context },
        ),
        inst = wrapper.dive().instance()
        inst.componentWillReceiveProps({serviceType: "serviceType"})
        inst.showallText()
        inst.handleViewAll()
        inst.browseServiceProviders()
        inst.goToSpProfile()
        inst.goToServiceProvidersTab()

    });
  })