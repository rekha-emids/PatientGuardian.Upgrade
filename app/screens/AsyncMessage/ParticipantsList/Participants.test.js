import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ParticipantsList from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { asyncMessageState, userState, participantList } from "./storeVariable";
import Participants from "./Participants";

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);
const store = mockStore({});



jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

  jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))

  jest.mock('../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))

//   jest.mock('react-navigation', () => ({	
//     reactNavigation: 'mockReactNavigation'	
//   }))

  test('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><ParticipantsList /></Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should be handling functions', () => {
    let store = mockStore({
      asyncMessageState: asyncMessageState[0],
      authState: {userState: userState[0]},
      networkReducer: {network: false}
    });


    // let props = createTestProps({});
    let context = { store };
    let mockedKeyboardHeight = { endCoordinates: { height: 40 } };
    let wrapper = shallow(
      <ParticipantsList />,
      { context },
    );
    let inst = wrapper.dive().instance();

    inst.gotoConversation();
    inst.gotoAddParticipants()
    inst.leaveConversation()
    inst._keyExtractor({userId: 1}, 1);
    inst.showModalOnCancel()
  })


  it('should be handling Participants', () => {
    let store = mockStore({
      asyncMessageState: asyncMessageState[0],
      authState: {userState: userState[0]},
      networkReducer: {network: false}
    });


    // let props = createTestProps({});
    let context = { store };
    let mockedKeyboardHeight = { endCoordinates: { height: 40 } };
    let wrapper = shallow(
      <Participants 
      participant={participantList}
      conversationId={1711}
      loggedInUser={{
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
}}
      isActive={true}
      />,
      { context },
    );
    let inst = wrapper.dive().instance();

  })
