import React from "react";
import configureMockStore from "redux-mock-store";
import Home from "./index";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { telehealthState } from "./mockData";
Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);



jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

jest.mock('../../redux/store', () => ({Store: 'mockStore'}))

jest.mock('../../routes', () => ({routes: 'mockRoutes'}))

jest.mock('react-native-device-info', () => ({getUniqueID: () => 4}))
jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
// test('renders correctly', () => {
//   const tree = renderer.create(<Provider store={store}><Home /></Provider>).toJSON();
//   expect(tree).toMatchSnapshot();
// });

it('should be handling Home', () => {
  const store = mockStore({
    telehealthState,
    dashboardState: {dashboardState: {tabNavigation: null}},
    profileState: {
      PersonalDetailState: {
        cityDetail: [],
        genderDetail: [],
        getProfileStatus: 0,
        imageData: "",
        impersonatedDetails: {},
        isLoading: 0,
        isUser: false,
        personalDetail: null,
        profilePercentage: 0,
        updatePersonalDetailSuccess: false
      }
    },
    authState: {
      userState: {
        userInfo: {
          careTeamId: 0,
          coreoHomeUserId: 118,
          email: "Lori.whitfoot@mailinator.com",
          emailId: "Lori.whitfoot@mailinator.com",
          isUserMapped: true,
          lastViewedUserId: 1022,
          lastViewedUserType: "I",
          onBoardRelationShip: null,
          onBoardUserId: 0,
          patientId: 1022,
          relationshipName: "Self",
          userId: 118,
          userType: "I"
        }
      }
    },
    asyncMessageState: {
      callbackInterval: 9000,
      conversation: {},
      conversationCount: 0,
      conversationImageUrl: "",
      conversationSummary: [],
      conversationTitle: "",
      currentConversation: {},
      dashboardMessageCount: 0,
      isLoading: 0,
      isNavigationLoading: 0,
      linkedParticipants: [],
      linkedPatients: [],
      loggedInUser: {},
      openedAsyncPage: null,
      removeParticipantConcurrencyExist: false,
      selectedContext: 0,
      selectedConversationId: null,
      unreadCounts: []
    }
  }),

    context = { store },
    wrapper = shallow(
      <Home />,
      { context },
    )
    let message = {
      data: 'sample Message',
      title: "sample title"
    }
  let inst = wrapper.dive().instance()

  inst.onBtnPress();
  inst.joinVideoConference()
  inst.setTimeoutLeaveConf()
  // inst.joinOrEndOngoingCall()  
  // inst.displayNotificationFromCustomData(message);
  // Home.onTokenRefreshListener()
  // inst.registerKilledListener()
  inst.showModal()
  inst.onCancel()
  // inst.componentWillUnmount()

})