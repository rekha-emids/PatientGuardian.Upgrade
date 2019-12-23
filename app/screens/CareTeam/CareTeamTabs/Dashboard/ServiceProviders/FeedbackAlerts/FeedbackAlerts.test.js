import React from "react";
import configureMockStore from "redux-mock-store";
import { FeedbackAlertGridItem, FeedbackAlertGrid } from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import { CARETEAM_SERVICE_PROVIDERS } from "../../../../../../constants/constants";
import Adapter from 'enzyme-adapter-react-16';
import FeedbackAlerts from "./index.js";

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);




jest.mock('../../../../../../utils/encryptPassword', () => ({encryptPassword: 'mockencryptPassword'}))

jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

jest.mock('../../../../../../redux/store', () => ({Store: 'mockStore'}))

jest.mock('../../../../../../routes', () => ({routes: 'mockRoutes'}))
jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))

function goToServiceProviderItemDetail(data) {

}
function renderListScrollerFooter() {

}

export const itemDetail = [{
  actions: null,
  affiliation: "AACE International",
  affiliationId: 0,
  alwaysInitialAPI: true,
  apiSaga: () => { },
  applyPaginationFetching: true,
  canAutomaticRefresh: false,
  coreoHomeUserId: 5,
  dataCount: 65,
  dispatch: () => { },
  emptyViewComponent: null,
  feedback: 1,
  firstName: "Tyler",
  index: 0,
  inverted: false,
  isHorizontal: false,
  isPaginationEnabled: true,
  lastName: "Ford",
  length: 20,
  name: "Tyler Ford",
  networkCallStatus: 200,
  noItemsText: "No results found.",
  onEndReached: () => { },
  onEndReachedThreshold: 0.5,
  onPress: (data) => {
 goToServiceProviderItemDetail(data) 
},
  onRefresh: () => { },
  onScroll: () => { },
  pageSize: 10,
  percentage: 0,
  phoneNumber: "9999999999",
  rating: 5,
  refreshControl: true,
  renderChildrenAfterLoading: false,
  renderListScrollerFooter: renderListScrollerFooter(),
  renderSeparator: null,
  requestProps: {
    agencies: [],
    careTeamId: 3,
    city: "null",
    fromDate: "02/13/2019",
    genderId: 0,
    lat: 0,
    lon: 0,
    maxExperience: 0,
    maxHourlyRate: 0,
    minExperience: 0,
    minHourlyRate: 0,
    range: 0,
    ratings: 4,
    searchText: "",
    serviceTypeIds: [],
    skills: [],
    sortName: "rating",
    sortOrder: "dsc",
    stateName: "",
    streetName: "",
    tabFilter: "TotalInTheNetwork",
    toDate: "05/13/2019",
    zip: 0
  },
  serviceCategories: ["Activities of Daily Living", "Help at Home", "Transportation", "Activities of Daily Living"],
  serviceCategory: "Activities of Daily Living",
  serviceCategoryId: 0,
  serviceType: "Bathing",
  serviceTypeId: 0,
  serviceTypes: ["Bathing", "Continence", "Eating", "Getting Dressed", "Toileting", "Transferring", "Companionship and Errands", "Food Prep", "House Keeping", "Laundry", "Shopping", "Using Home Appliances", "General Transportation", "Ambulation and Mobility"],
  showsVerticalScrollIndicator: false,
  source: undefined,
  type: "Individual",
  typeId: 0,
  srid: 1,
  vid: 1,
  actions: null,
  age: 25,
  attributeProvider: "Pamphila Clayhanger",
  attributeProviders: [],
  attributedProvider: null,
  authorizationNumber: null,
  clinicalConditions: [{ clinicalConditionId: 2, clinicalConditionName: "Chest Pain" }],
  cohorts: [{ cohortId: 92, cohortName: "Infection", riskIndicatorName: null, acronym: "( )", ranking: "5" }],
  contract: null,
  contracts: [{ contractId: 9, contractName: "NoContract" }],
  eligibityApprovalStatus: null,
  emailId: "jony@mailinator.com",
  gender: "others",
  individualId: 1083,
  individualName: "kaira wills",
  mpi: 2830199,
  patientRating: 0,
  thumbNail: "data:image/png;base64,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",
  visitCount: 0
},
{
  actions: null,
  affiliation: "",
  affiliationId: 0,
  alwaysInitialAPI: true,
  apiSaga: () => { },
  applyPaginationFetching: true,
  canAutomaticRefresh: false,
  coreoHomeUserId: 5,
  dataCount: 65,
  dispatch: () => { },
  emptyViewComponent: null,
  feedback: 0,
  firstName: "Tyler",
  index: 0,
  inverted: false,
  isHorizontal: false,
  isPaginationEnabled: true,
  lastName: "Ford",
  length: 20,
  name: "Tyler Ford",
  networkCallStatus: 200,
  noItemsText: "No results found.",
  onEndReached: () => { },
  onEndReachedThreshold: 0.5,
  onPress: (data) => {
 goToServiceProviderItemDetail(data) 
},
  onRefresh: () => { },
  onScroll: () => { },
  pageSize: 10,
  percentage: 0,
  phoneNumber: "9999999999",
  rating: 5,
  refreshControl: true,
  renderChildrenAfterLoading: false,
  renderListScrollerFooter: renderListScrollerFooter(),
  renderSeparator: null,
  requestProps: {
    agencies: [],
    careTeamId: 3,
    city: "null",
    fromDate: "02/13/2019",
    genderId: 0,
    lat: 0,
    lon: 0,
    maxExperience: 0,
    maxHourlyRate: 0,
    minExperience: 0,
    minHourlyRate: 0,
    range: 0,
    ratings: 4,
    searchText: "",
    serviceTypeIds: [],
    skills: [],
    sortName: "rating",
    sortOrder: "dsc",
    stateName: "",
    streetName: "",
    tabFilter: "TotalInTheNetwork",
    toDate: "05/13/2019",
    zip: 0
  },
  serviceCategory: "Activities of Daily Living",
  serviceCategoryId: 0,
  serviceProviderId: 1,
  serviceType: "Bathing",
  serviceTypeId: 0,
  showsVerticalScrollIndicator: false,
  source: undefined,
  typeId: 0,
  srid: 0,
  vid: 0
},
{
  actions: null,
  affiliation: "AACE International",
  affiliationId: 0,
  alwaysInitialAPI: true,
  apiSaga: () => { },
  applyPaginationFetching: true,
  canAutomaticRefresh: false,
  coreoHomeUserId: 5,
  dataCount: 65,
  dispatch: () => { },
  emptyViewComponent: null,
  feedback: 1,
  firstName: "Tyler",
  index: 0,
  inverted: false,
  isHorizontal: false,
  isPaginationEnabled: true,
  lastName: "Ford",
  length: 20,
  name: "Tyler Ford",
  networkCallStatus: 200,
  noItemsText: "No results found.",
  onEndReached: () => { },
  onEndReachedThreshold: 0.5,
  onPress: (data) => {
 goToServiceProviderItemDetail(data) 
},
  onRefresh: () => { },
  onScroll: () => { },
  pageSize: 10,
  percentage: 0,
  phoneNumber: "9999999999",
  rating: 5,
  refreshControl: true,
  renderChildrenAfterLoading: false,
  renderListScrollerFooter: renderListScrollerFooter(),
  renderSeparator: null,
  requestProps: {
    agencies: [],
    careTeamId: 3,
    city: "null",
    fromDate: "02/13/2019",
    genderId: 0,
    lat: 0,
    lon: 0,
    maxExperience: 0,
    maxHourlyRate: 0,
    minExperience: 0,
    minHourlyRate: 0,
    range: 0,
    ratings: 4,
    searchText: "",
    serviceTypeIds: [],
    skills: [],
    sortName: "rating",
    sortOrder: "dsc",
    stateName: "",
    streetName: "",
    tabFilter: "TotalInTheNetwork",
    toDate: "05/13/2019",
    zip: 0
  },
  serviceCategories: ["Activities of Daily Living", "Help at Home", "Transportation", "Activities of Daily Living"],
  serviceCategory: "Activities of Daily Living",
  serviceCategoryId: 0,
  serviceProviderId: 1,
  serviceType: "Bathing",
  serviceTypeId: 0,
  serviceTypes: ["Bathing", "Continence", "Eating", "Getting Dressed", "Toileting", "Transferring", "Companionship and Errands", "Food Prep", "House Keeping", "Laundry", "Shopping", "Using Home Appliances", "General Transportation", "Ambulation and Mobility"],
  showsVerticalScrollIndicator: false,
  source: undefined,
  type: "Individual",
  typeId: 0,
  srid: 1,
  vid: 1
},
{
  actions: null,
  affiliationId: 0,
  alwaysInitialAPI: true,
  apiSaga: () => { },
  applyPaginationFetching: true,
  canAutomaticRefresh: false,
  coreoHomeUserId: 5,
  dataCount: 65,
  dispatch: () => { },
  emptyViewComponent: null,
  firstName: "Tyler",
  index: 0,
  inverted: false,
  isHorizontal: false,
  isPaginationEnabled: true,
  lastName: "Ford",
  length: 20,
  name: "Tyler Ford",
  networkCallStatus: 200,
  noItemsText: "No results found.",
  onEndReached: () => { },
  onEndReachedThreshold: 0.5,
  onPress: (data) => {
 goToServiceProviderItemDetail(data) 
},
  onRefresh: () => { },
  onScroll: () => { },
  pageSize: 10,
  percentage: 0,
  phoneNumber: "",
  refreshControl: true,
  renderChildrenAfterLoading: false,
  renderListScrollerFooter: renderListScrollerFooter(),
  renderSeparator: null,
  requestProps: {
    agencies: [],
    careTeamId: 3,
    city: "null",
    fromDate: "02/13/2019",
    genderId: 0,
    lat: 0,
    lon: 0,
    maxExperience: 0,
    maxHourlyRate: 0,
    minExperience: 0,
    minHourlyRate: 0,
    range: 0,
    ratings: 4,
    searchText: "",
    serviceTypeIds: [],
    skills: [],
    sortName: "rating",
    sortOrder: "dsc",
    stateName: "",
    streetName: "",
    tabFilter: "TotalInTheNetwork",
    toDate: "05/13/2019",
    zip: 0
  },
  serviceCategory: "Activities of Daily Living",
  serviceCategoryId: 0,
  serviceProviderId: 1,
  serviceType: "Bathing",
  serviceTypeId: 0,
  showsVerticalScrollIndicator: false,
  source: undefined,
  typeId: 0,
  srid: 1,
  vid: 1
},
{
  actions: null,
  affiliationId: 0,
  alwaysInitialAPI: true,
  apiSaga: () => { },
  applyPaginationFetching: true,
  canAutomaticRefresh: false,
  coreoHomeUserId: 5,
  dataCount: 65,
  dispatch: () => { },
  emptyViewComponent: null,
  firstName: "Tyler",
  index: 0,
  inverted: false,
  isHorizontal: false,
  isPaginationEnabled: true,
  lastName: "Ford",
  length: 20,
  name: "Tyler Ford",
  networkCallStatus: 200,
  noItemsText: "No results found.",
  onEndReached: () => { },
  onEndReachedThreshold: 0.5,
  onPress: (data) => {
 goToServiceProviderItemDetail(data) 
},
  onRefresh: () => { },
  onScroll: () => { },
  pageSize: 10,
  percentage: 0,
  phoneNumber: "9999999999",
  rating: 5,
  refreshControl: true,
  renderChildrenAfterLoading: false,
  renderListScrollerFooter: renderListScrollerFooter(),
  renderSeparator: null,
  requestProps: {
    agencies: [],
    careTeamId: 3,
    city: "null",
    fromDate: "02/13/2019",
    genderId: 0,
    lat: 0,
    lon: 0,
    maxExperience: 0,
    maxHourlyRate: 0,
    minExperience: 0,
    minHourlyRate: 0,
    range: 0,
    ratings: 4,
    searchText: "",
    serviceTypeIds: [],
    skills: [],
    sortName: "rating",
    sortOrder: "dsc",
    stateName: "",
    streetName: "",
    tabFilter: "TotalInTheNetwork",
    toDate: "05/13/2019",
    zip: 0
  },
  serviceCategories: ["Activities of Daily Living", "Help at Home", "Transportation", "Activities of Daily Living"],
  serviceCategory: "Activities of Daily Living",
  serviceCategoryId: 0,
  serviceType: "Bathing",
  serviceTypeId: 0,
  serviceTypes: ["Bathing", "Continence", "Eating", "Getting Dressed", "Toileting", "Transferring", "Companionship and Errands", "Food Prep", "House Keeping", "Laundry", "Shopping", "Using Home Appliances", "General Transportation", "Ambulation and Mobility"],
  showsVerticalScrollIndicator: false,
  source: undefined,
  typeId: 0,
  srid: 1,
  vid: 1,
  actions: null,
  attributeProviders: [],
  authorizationNumber: null,
  clinicalConditions: [{ clinicalConditionId: 2, clinicalConditionName: "Chest Pain" }],
  contract: null,
  contracts: [{ contractId: 9, contractName: "NoContract" }],
  eligibityApprovalStatus: null,
  emailId: "jony@mailinator.com",
  individualId: 1083,
  individualName: "kaira wills",
  patientRating: 0,
  thumbNail: "data:image/png;base64,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",
  visitCount: 0
}
]

let userState = {
  forgetPasswordState: { sendResetPasswordLinkSuccess: false, sendResetPasswordLinkError: false, emailId: "" },
  userState: { careTeamId: 10 },
  loginState: {
    error: { message: "", code: "" },
    isFailed: false,
    userData: {accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA2RDNFNDZFOTEwNzNDNUQ0QkMyQzk5ODNCRTlGRjQ0OENGNjQwRDQiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJCdFBrYnBFSFBGMUx3c21ZTy1uX1JJejJRTlEifQ.eyJuYmYiOjE1NTc3NDg1NDAsImV4cCI6MTU2MDM0MDU0MCwiaXNzIjoiaHR0cHM6Ly9jaHFhLW9hdXRoLWFwaS5jb3Jlb2Zsb3dzYW5kYm94LmNvbSIsImF1ZCI6WyJodHRwczovL2NocWEtb2F1dGgtYXBpLmNvcmVvZmxvd3NhbmRib3guY29tL3Jlc291cmNlcyIsImFwaTEiXSwiY2xpZW50X2lkIjoicm9jbGllbnQiLCJzdWIiOiJKb2huLldpbGxpYW1AbWFpbGluYXRvci5jb20iLCJhdXRoX3RpbWUiOjE1NTc3NDg1NDAsImlkcCI6ImxvY2FsIiwidXNlcm5hbWUiOiJKb2huLldpbGxpYW1AbWFpbGluYXRvci5jb20iLCJlbWFpbCI6IkpvaG4uV2lsbGlhbUBtYWlsaW5hdG9yLmNvbSIsInVzZXJpZCI6IjI4IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIklzRXVsYVVwZGF0ZWQiOiJUcnVlIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsImFwaTEiXSwiYW1yIjpbInBhc3N3b3JkIl19.iWYFrkvjJD8DhHjSQO5H4j6gQ20YJdehf2hqeaj553nHv4gX_8Tw5_tv1SW9a8CU0_xWc996rOJGnyS9vYRZ8l4keZ1oPSTMu95F-jNQ-xODfvdy_PSsK-UgJKeP70rrc59ns-udZLy0x2qkqiy0h70cHckxyg7nM8HadSrulpe1OiokVo-C55JgN2ni6kJFB7BbSMnqSJcmihQnFZHE8s4ys5Yoi1AWBvrKrzAfa5QN4kbuVV0P5awmgqKLGbrV6jNOTixzLM2vKOABu9Fj38-9p3STjJCNQ5HfaxUWHDC3TLNnpYlbZ2gr3DjJjW_VB81KvXbjKb-2q1FWWPwiJg"},
    logoutState: {
      error: { message: "", code: "" },
      loading: false,
      userData: {}
    },
    navigateToLoginReducer: { screen: "LOGIN_SCREEN" },
    resetPasswordState: {
      emailId: "",
      getEmailIdError: false,
      getEmailIdSuccess: false,
      patientId: null,
      resetPasswordError: false,
      resetPasswordLinkStatus: "",
      resetPasswordStatus: false,
      resetPasswordSuccess: false,
      token: "",
      userId: null
    },
    userAgreementState: {
      emailId: "John.William@mailinator.com",
      eulaContent: "<!DOCTYPE html><html lang='en'><head><meta charset",
      getEulaContentStatus: 400,
      isEulaUpdated: false
    },
    userState: {
      authData: { access_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA2RDNFNDZFOTEwNzNDNU…xUWHDC3TLNnpYlbZ2gr3DjJjW_VB81KvXbjKb-2q1FWWPwiJg", expires_in: 2592000, token_type: "Bearer" },
      autoLogoutTime: 1800000,
      careTeamId: 3,
      emailId: "john.william@mailinator.com",
      getPatientImageStatus: 0,
      impersinated: false,
      individualList: [],
      isUserMapped: true,
      lastViewedUserId: 1083,
      lastViewedUserType: "I",
      onBoardRelationShip: null,
      onBoardUserId: 0,
      patientId: 0,
      patientImage: {},
      patientName: {},
      relationshipName: "CareTeam",
      roles: {
        "Assign Service Providers to open_service_request": { Update: true, Read: true },
        "Async_Messages": { Create: true, Update: true, Read: true },
        "Bulk_invitation": { Create: true, Update: true, Read: true },
        "CareTeam_Settings": { Create: true, Read: true, Update: true, Delete: true },
        "Clinical Conditions": { Create: true, Update: true, Read: true, Delete: true },
        "Dashboard": { Create: true, Update: true, Read: true },
        "Geo_Map": { Read: true },
        "Languages Spoken": { Create: true, Update: true, Read: true, Delete: true },
        "Manage_Connections": { Create: true, Update: true, Read: true, Delete: true },
        "Notifications": { Read: true },
        "Payment": { Read: true },
        "Payment_Processing": { Create: true, Update: true, Read: true, Delete: true },
        "Profile": { Create: true, Update: true, Read: true, Delete: true },
        "Search": { Create: true, Update: true, Read: true, Delete: true },
        "Service_Provider_Standby": { Read: true },
        "Service_Providers(Hired/Invited)": { Create: true, Update: true, Read: true, Delete: true },
        "Service_Request": { Create: true, Update: true, Read: true, Delete: true },
        "Telehealth": { Create: true, Update: true, Read: true },
        "Users": { Create: true, Update: true, Read: true, Delete: true },
        "Visit_History": { Create: true, Update: true, Read: true, Delete: true },
        "Visit_Processing": { Create: true, Update: true, Read: true, Delete: true }
      },
      selectedPatientInfo: {},
      userEmail: "john.william@mailinator.com",
      userId: 28,
      userInfo: {
        careTeamId: 3,
        coreoHomeUserId: 28,
        email: "john.william@mailinator.com",
        emailId: "john.william@mailinator.com",
        isUserMapped: true,
        lastViewedUserId: 1083,
        lastViewedUserType: "I",
        onBoardRelationShip: null,
        onBoardUserId: 0,
        patientId: 0,
        relationshipName: "CareTeam",
        userId: 28,
        userType: "CT"
      },
      userType: "CT"
    }
  }
}

test('renders correctly', () => {


  const feedbackAlertGridItem = renderer.create(
    <FeedbackAlertGridItem
      serviceRequestVisitId={"0"}
      visitDate={""}
      onPress={() => { }}
      goToVisitHistory={() => null}
    />
  ).toJSON();

  expect(feedbackAlertGridItem).toMatchSnapshot();

  const feedbackAlertGrid = renderer.create(
    <FeedbackAlertGrid
      name={''}
      value={""}
      count={""}
      onPress={() => { }}
      goToVisitHistory={() => null}
    />
  ).toJSON();

  expect(feedbackAlertGrid).toMatchSnapshot();

  const feedbackAlertGridElse = renderer.create(
    <FeedbackAlertGrid
      name={''}
      value={""}
      count={""}
      onPress={() => { }}
      goToVisitHistory={() => null}
      showFeedbackAlerts ={true}
    />
  ).toJSON();

  expect(feedbackAlertGridElse).toMatchSnapshot();
});


describe('FeedbackAlert component', () => {

  it('should be handling functions', () => {
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
      authState: userState,
      serviceProvidersTabState: {requestsState: {gender: []}},
      navigationState: {routes: []},
      networkReducer: {network: true}
    });

    const context = { store };
    const wrapper = shallow(
      <FeedbackAlerts />,
      { context },
    );
    const inst = wrapper.dive().instance();

    inst.onPressConversation();
    inst.onTeleHealthPress();
    inst.onCallPopUp('9999999999');
    inst.onCallPopUp('');
    inst.showNoNumberModal();
    inst.goToVisitHistoryDetails('10');
    inst.apiCall({})
    inst.headerPatient()
    inst.inpersinateClick()
    inst.onConfirm()
    wrapper.unmount()

  });

  it('should be handling functions as SP', () => {
    const store = mockStore({
      careTeamState: {
        dashboardState: {
          itemDetail: itemDetail[2],
          providerImageData: "",
          isLoading: false,
          selectedCount: {label: CARETEAM_SERVICE_PROVIDERS.WITH_FEEDBACK_ALERTS}
        }
      },
      serviceProvidersTabState: {requestsState: {gender: []}},
      authState: userState,
      navigationState: {routes: []},
      networkReducer: {network: true}
    });

    const context = { store };
    const wrapper = shallow(
      <FeedbackAlerts />,
      { context },
    );
    const inst = wrapper.dive().instance();

    inst.onPressConversation();
    inst.onTeleHealthPress();
    inst.onCallPopUp('9999999999');
    inst.onCallPopUp('');
    inst.showNoNumberModal();
    inst.goToVisitHistoryDetails('10');
    inst.apiCall({})
    inst.header()
    inst.onHeaderItemPress()
    inst.onConfirm()
    wrapper.unmount()

  });


  it('should be handling functions SP else cases', () => {
    const store = mockStore({
      careTeamState: {
        dashboardState: {
          itemDetail: itemDetail[3],
          providerImageData: {image: "image"},
          patientImageData: {image: "image"},
          isLoading: false,
          selectedCount: {label: CARETEAM_SERVICE_PROVIDERS.WITH_FEEDBACK_ALERTS}
        }
      },
      serviceProvidersTabState: {requestsState: {gender: []}},
      authState: userState,
      navigationState: {routes: []},
      networkReducer: {network: true}
    });

    const context = { store };
    const wrapper = shallow(
      <FeedbackAlerts />,
      { context },
    );
    const inst = wrapper.dive().instance();

    inst.onPressConversation();
    inst.onTeleHealthPress();
    inst.onCallPopUp('9999999999');
    inst.onCallPopUp('');
    inst.showNoNumberModal();
    inst.goToVisitHistoryDetails('10');
    inst.apiCall({})
    inst.header()
    inst.onHeaderItemPress()
    inst.onConfirm()
    wrapper.unmount()

  });


  it('should be handling functions patient else cases', () => {
    const store = mockStore({
      careTeamState: {
        dashboardState: {
          itemDetail: itemDetail[4],
          providerImageData: {image: "image"},
          isLoading: false,
          selectedCount: {label: CARETEAM_SERVICE_PROVIDERS.WITH_FEEDBACK_ALERTS}
        }
      },
      serviceProvidersTabState: {requestsState: {gender: []}},
      authState: userState,
      navigationState: {routes: []},
      networkReducer: {network: true}
    });

    const context = { store };
    const wrapper = shallow(
      <FeedbackAlerts />,
      { context },
    );
    const inst = wrapper.dive().instance();

    inst.onPressConversation();
    inst.onTeleHealthPress();
    inst.onCallPopUp('9999999999');
    inst.onCallPopUp('');
    inst.showNoNumberModal();
    inst.goToVisitHistoryDetails('10');
    inst.apiCall({})
    inst.headerPatient()
    inst.inpersinateClick()
    inst.onConfirm()
    wrapper.unmount()

  });

})