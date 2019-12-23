import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ItemDetail from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
import { itemDetail } from "../FeedbackAlerts/FeedbackAlerts.test";
import { CARETEAM_SERVICE_PROVIDERS } from "../../../../../../constants/constants";
import { userState } from "../../../../../AsyncMessage/AddParticipant/storeVariable";
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  careTeamState: {
    dashboardState: {
      itemDetail: itemDetail[0],
      providerImageData: "",
      patientImageData: {image: "image"},
      isLoading: false,
      selectedCount: {label: CARETEAM_SERVICE_PROVIDERS.WITH_FEEDBACK_ALERTS}
    }
  },
  authState: userState[0],
  serviceProvidersTabState: {requestsState: {gender: []}},
  navigationState: {routes: []},
  networkReducer: {network: true}
});



jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

  jest.mock('../../../../../../redux/store', () => ({Store: 'mockStore'}))

  jest.mock('../../../../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
  test('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><ItemDetail /></Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });