import React from "react";
import configureMockStore from "redux-mock-store";
import VisitServiceCard from "./VisitServiceCard";
import { shallow } from 'enzyme';
import thunkMiddleware from 'redux-thunk';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
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
    let store = mockStore({networkReducer: {network: true}});

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
            "serviceTypes": [
              {
                "serviceTypeId": 16,
                "serviceTypeDescription": "General Transportation",
                "serviceTask": [],
                "taskCompleted": 0,
                "totalTask": 0
              }
            ],
            "serviceRequestVisitId": 13384,
            "totalTaskCompleted": 2,
            "totalTask": 2,
            "totalChargeableTime": null,
            "estimatedCost": 0,
            "taxAndFees": 0,
            "totalCost": 0,
            "serviceRequestId": 1147,
            "serviceTypeId": 16,
            "serviceTaskId": 0,
            "serviceType": null,
            "serviceTask": null,
            "serviceCategory": "Transportation",
            "slotDescription": "Morning",
            "day": null,
            "taxPaid": 0,
            "originalTotalDuration": null,
            "billedTotalDuration": "00:00:15",
            "visitStatusName": null,
            "visitDate": "2019-05-28T00:00:00",
            "visitStartTime": "5/28/2019 11:37:27 AM",
            "visitEndTime": "5/28/2019 11:37:42 AM",
            "providerFirstName": "Roy",
            "providerLastName": "Snyder",
            "serviceProviderId": 28,
            "providerImageArray": null,
            "providerImage": "data:image/jpeg;base64,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",
            "patientFirstName": null,
            "patientLastName": null,
            "patientImageArray": null,
            "patientImage": null,
            "patientId": 0,
            "signatureArray": null,
            "signature": null,
            "dataCount": 10,
            "billedTotalDurationTimeSpan": null,
            "originalTotalDurationTimeSpan": null
      });
  
      let props = createTestProps({});
      let context = { store };
      let wrapper = shallow(
        <VisitServiceCard {...props} />,
        { context },
      );
      const inst = wrapper.dive().instance();

      inst.goToSPProfile(1)
})
  })

  describe('Service Visits component', () => {
    let store = mockStore({networkReducer: {network: true}});

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
            "serviceRequestVisitId": 13384,
            "totalTaskCompleted": 2,
            "totalTask": 0,
            "totalChargeableTime": null,
            "estimatedCost": 0,
            "taxAndFees": 0,
            "totalCost": 0,
            "serviceRequestId": 1147,
            "serviceTypeId": 16,
            "serviceTaskId": 0,
            "serviceType": null,
            "serviceTask": null,
            "serviceCategory": "Transportation",
            "slotDescription": "Morning",
            "day": null,
            "taxPaid": 0,
            "originalTotalDuration": null,
            "originalTotalDuration": "00:00:15",
            "visitStatusName": null,
            "visitDate": "2019-05-28T00:00:00",
            "visitStartTime": "5/28/2019 11:37:27 AM",
            "visitEndTime": "5/28/2019 11:37:42 AM",
            "providerFirstName": "Roy",
            "providerLastName": "Snyder",
            "serviceProviderId": 28,
            "providerImageArray": null,
            "providerImage": "data:image/jpeg;base64,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",
            "patientFirstName": null,
            "patientLastName": null,
            "patientImageArray": null,
            "patientImage": null,
            "patientId": 0,
            "signatureArray": null,
            "signature": null,
            "dataCount": 10,
            "billedTotalDurationTimeSpan": null,
            "originalTotalDurationTimeSpan": null
      });
  
      let props = createTestProps({});
      let context = { store };
      let wrapper = shallow(
        <VisitServiceCard {...props} />,
        { context },
      );
      const inst = wrapper.dive().instance();

      inst.goToSPProfile(1)
})
  })