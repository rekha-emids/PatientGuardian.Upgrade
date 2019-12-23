import React from "react";
import {View} from 'react-native'
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ItemDetail from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import ProgressBar from "../../../../../../components/LevelOne/ProgressBar";
import { CARETEAM_SERVICE_PROVIDERS } from "../../../../../../constants/constants";
import Adapter from 'enzyme-adapter-react-16';
import {ModalPopup} from '../../../../../../components/LevelOne/ModalPopup'
import sinon from 'sinon';

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

let itemDetail = [{
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
  serviceCategories: "",
  serviceCategory: "Activities of Daily Living",
  serviceCategoryId: 0,
  serviceProviderId: 1,
  serviceType: "Bathing",
  serviceTypeId: 0,
  serviceTypes: "",
  showsVerticalScrollIndicator: false,
  source: undefined,
  type: "",
  typeId: 0,
  srid: 0,
  vid: 0
}]

let userState = {
  forgetPasswordState: { sendResetPasswordLinkSuccess: false, sendResetPasswordLinkError: false, emailId: "" },
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

function createVideoConference(data) {

}
function getSPImage(data) {

}
function inpersinatePatient() {

}
function goBackToServiceProviderDashboardDetail() {

}
function onCreateNewConversation(data) {

}
function clearImageData() {

}
test('renders correctly', () => {



  const store = mockStore({
    careTeamState: {
      dashboardState: {
        itemDetail: itemDetail[0],
        providerImageData: {image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…53Co+mKnMtNtJ5W0JSPQUUVAF0UUUAUUUUAUUUUAUUUUB/9k=", imageByte: null, thumbnailImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…53Co+mKnMtNtJ5W0JSPQUUVAF0UUUAUUUUAUUUUAUUUUB/9k="},
        isLoading: false,
        selectedCount: {label: CARETEAM_SERVICE_PROVIDERS.WITH_FEEDBACK_ALERTS}
      }
    },
    authState: userState
  });

  const itemDetailSCreen = renderer.create(
    <Provider store={store}>
      <ItemDetail
        itemDetail={itemDetail[0]}
        clearImageData={clearImageData}
        createVideoConference={createVideoConference}
        getSPImage={getSPImage}
        goBackToServiceProviderDashboardDetail={goBackToServiceProviderDashboardDetail}
        inpersinatePatient={inpersinatePatient}
        loadingStatus={200}
        onCreateNewConversation={onCreateNewConversation}
        providerImageData={{ serviceProviderId: 1, image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…53Co+mKnMtNtJ5W0JSPQUUVAF0UUUAUUUUAUUUUAUUUUB/9k=", imageByte: null, thumbnailImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…53Co+mKnMtNtJ5W0JSPQUUVAF0UUUAUUUUAUUUUAUUUUB/9k=", thumbnailImageByte: null }}
        selectedCount={{ totalCount: 65, subText: "Providers", label: "In Total In The Population", statusId: 0, statusName: "TotalInTheNetwork" }}

      />
    </Provider>
  ).toJSON();

  expect(itemDetailSCreen).toMatchSnapshot();
  const modalPopup = renderer.create(
    <Provider store={store}>
     <ModalPopup
                visible={true}
                primaryButton={true}
                children={<View></View>}
                secondaryButton={true}
                isDisabled ={true}
            />
    </Provider>
  ).toJSON();

  expect(modalPopup).toMatchSnapshot();

  const progressBarScreen = renderer.create(
    <Provider store={store}>
      <ProgressBar
        containerStyle={{}}
        progressStyle={{}}
      />
    </Provider>
  ).toJSON();

  expect(progressBarScreen).toMatchSnapshot();

});
describe('ItemDetail component', () => {

  it('should be handling onPressConversation', () => {
    const store = mockStore({
      careTeamState: {
        dashboardState: {
          itemDetail: itemDetail[1],
          providerImageData: "",
          isLoading: false,
          selectedCount: {label: CARETEAM_SERVICE_PROVIDERS.WITH_FEEDBACK_ALERTS}
        }
      },
      authState: userState
    });

    const context = { store };
    const wrapper = shallow(
      <ItemDetail />,
      { context },
    );
    const inst = wrapper.dive().instance();

    inst.onPressConversation();
    inst.onTeleHealthPress();
    inst.onCallPopUp('9999999999');
    inst.onCallPopUp('');
    inst.showNoNumberModal();
    inst.changeModalPopup();
    inst.makePoneCall()
    wrapper.unmount()

    const willUnmount = sinon.spy();

    // const mountedWrapper = mount(<ItemDetail  />, {context});
    expect(jest.fn(willUnmount)).toBeCalledTimes(0);
  });

})
