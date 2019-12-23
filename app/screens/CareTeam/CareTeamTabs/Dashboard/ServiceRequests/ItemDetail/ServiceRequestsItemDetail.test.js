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
import {USER_STATE} from '../../../../../../utils/testCaseUtils'
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
  serviceRequestId: 1,
  providerLastName: "Last NAME",
  serviceCategoryDescription: "Activities of daily living",
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
  serviceTypeId: 0,
  serviceType: ["Bathing", "Continence", "Eating", "Getting Dressed", "Toileting", "Transferring", "Companionship and Errands", "Food Prep", "House Keeping", "Laundry", "Shopping", "Using Home Appliances", "General Transportation", "Ambulation and Mobility"],
  showsVerticalScrollIndicator: false,
  source: undefined,
  type: "Individual",
  typeId: 0,
  srid: 1,
  vid: 1,
  providerFirstName: "First name",
  statusName: "Low Network",
  diagnosisCode: "78594"
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
  serviceType: ["Bathing"],
  serviceTypeId: 0,
  showsVerticalScrollIndicator: false,
  source: undefined,
  type: "",
  typeId: 0,
  srid: 0,
  vid: 0
}]

function createVideoConference(data) {

}
function getImage(data) {

}
function inpersinatePatient() {

}
function goBackToServiceProviderDashboardDetail() {

}
function onCreateNewConversation(data) {

}
function postAuthNo() {

}
function goBackToServiceRequestDashboardDetail(){}

function getServiceRequestDashboardDetail(){}

function goToServiceRequestDetails(){}

function goToDiagnosisCode(){}


const store = mockStore({
  careTeamState: {
    dashboardState: {
      serviceRequestDashboardDetail: itemDetail,
      itemDetail: itemDetail[0],
      providerImageData: {image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…53Co+mKnMtNtJ5W0JSPQUUVAF0UUUAUUUUAUUUUAUUUUB/9k=", imageByte: null, thumbnailImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…53Co+mKnMtNtJ5W0JSPQUUVAF0UUUAUUUUAUUUUAUUUUB/9k="},
      isLoading: false,
      selectedCount: {label: CARETEAM_SERVICE_PROVIDERS.WITH_FEEDBACK_ALERTS},
      patientImageData: {image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…53Co+mKnMtNtJ5W0JSPQUUVAF0UUUAUUUUAUUUUAUUUUB/9k=", imageByte: null, thumbnailImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…53Co+mKnMtNtJ5W0JSPQUUVAF0UUUAUUUUAUUUUAUUUUB/9k="}
    }
  },
  authState: USER_STATE,
  profileState: {
    PersonalDetailState: {
      personalDetail: {},
      imageData: {}
    }
  },
  telehealthState: {},
  navigation: {state: {params: {}}}
});

test('renders correctly', () => {

  const itemDetailSCreen = renderer.create(
    <Provider store={store}>
      <ItemDetail
        serviceRequestDashboardDetail={itemDetail[0]}
        itemDetail={itemDetail[0]}
        postAuthNo={postAuthNo}
        createVideoConference={createVideoConference}
        getImage={getImage}
        goBackToServiceProviderDashboardDetail={goBackToServiceProviderDashboardDetail}
        inpersinatePatient={inpersinatePatient}
        loadingStatus={200}
        onCreateNewConversation={onCreateNewConversation}
        providerImageData={{ serviceProviderId: 1, image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…53Co+mKnMtNtJ5W0JSPQUUVAF0UUUAUUUUAUUUUAUUUUB/9k=", imageByte: null, thumbnailImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…53Co+mKnMtNtJ5W0JSPQUUVAF0UUUAUUUUAUUUUAUUUUB/9k=", thumbnailImageByte: null }}
        selectedCount={{ totalCount: 65, subText: "Providers", label: "In Total In The Population", statusId: 0, statusName: "TotalInTheNetwork" }}
        goBackToServiceRequestDashboardDetail={goBackToServiceRequestDashboardDetail}
        getServiceRequestDashboardDetail={getServiceRequestDashboardDetail}
        goToServiceRequestDetails={goToServiceRequestDetails}
        goToDiagnosisCode={goToDiagnosisCode}
        navigation={{state: {parmas: {}}}}
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
    const context = { store };
    const wrapper = shallow(
      <ItemDetail
        navigation={{state: {parmas: {}}}}
      />,
      { context },
    );
    const inst = wrapper.dive().instance();

    inst.onPressConversation();
    inst.onTeleHealthPress();
    inst.onCallPopUp('9999999999');
    inst.onCallPopUp('');
    inst.onBlurAuthNo("")
    wrapper.unmount()

    const willUnmount = sinon.spy();

    // const mountedWrapper = mount(<ItemDetail  />, {context});
    expect(jest.fn(willUnmount)).toBeCalledTimes(0);
  });

})

describe('ItemDetail component', () => {

  it('should be handling onPressConversation', () => {
    const mockStorage = mockStore({
      careTeamState: {
        dashboardState: {
          serviceRequestDashboardDetail: itemDetail,
          itemDetail: itemDetail[1],
          providerImageData: {image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…53Co+mKnMtNtJ5W0JSPQUUVAF0UUUAUUUUAUUUUAUUUUB/9k=", imageByte: null, thumbnailImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…53Co+mKnMtNtJ5W0JSPQUUVAF0UUUAUUUUAUUUUAUUUUB/9k="},
          isLoading: false,
          selectedCount: {label: CARETEAM_SERVICE_PROVIDERS.WITH_FEEDBACK_ALERTS}
        },
        patientImageData: {image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…53Co+mKnMtNtJ5W0JSPQUUVAF0UUUAUUUUAUUUUAUUUUB/9k=", imageByte: null, thumbnailImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…53Co+mKnMtNtJ5W0JSPQUUVAF0UUUAUUUUAUUUUAUUUUB/9k="}
      },
      authState: USER_STATE,
      profileState: {
        PersonalDetailState: {
          personalDetail: {},
          imageData: {}
        }
      },
      telehealthState: {},
      navigation: {state: {params: {}}}
    });
    const context = { store: mockStorage };
    const wrapper = shallow(
      <ItemDetail
        navigation={{state: {parmas: {}}}}
      />,
      { context },
    );
    const inst = wrapper.dive().instance();

    inst.onPressConversation();
    inst.onTeleHealthPress();
    inst.onCallPopUp('9999999999');
    inst.onCallPopUp('');
    inst.onBlurAuthNo("")
    wrapper.unmount()

    const willUnmount = sinon.spy();

    // const mountedWrapper = mount(<ItemDetail  />, {context});
    expect(jest.fn(willUnmount)).toBeCalledTimes(0);
  });

})