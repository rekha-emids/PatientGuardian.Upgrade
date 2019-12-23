import React from "react";
import configureMockStore from "redux-mock-store";
import ConversationSummary, { EmptyConversation } from "./index";
import thunkMiddleware from 'redux-thunk';
import {
  gotoCreateConversation

} from '../../../redux/asyncMessages/actions';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { asyncMessageState, userState,  conversationItem, conversationReqObj, createTestProps, defaultHandler, conversationListProps, participantList } from "./storeVariable";
import ConversationList from "./ConversationList";

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);



jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))

jest.mock('../../HomeTabs', () => ({HomeTabs: 'mockHomeTabs'}))

jest.mock('../..//CareTeam/CareTeamTabs', () => ({CareTeamTabs: 'mockCareTeamTabs'}))

jest.mock('../../../routes', () => ({routes: 'mockRoutes'}))
jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))


describe('AddParicipant component', () => {

  it('should be handling functions', () => {
    let store = mockStore({
      asyncMessageState: asyncMessageState[0],
      authState: {userState: userState[0]},
      networkReducer: {network: true}
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
      ...props
    });

    let props = createTestProps({});
    let context = { store };
    let mockedKeyboardHeight = { endCoordinates: { height: 40 } };
    let wrapper = shallow(
      <ConversationSummary {...props} />,
      { context },
    );
    const inst = wrapper.dive().instance();

    inst.combineConversationSummary();
    inst.gotoConversation(conversationItem);
    inst.emptyView()
    inst.handleTabFocus();
    inst.apiCall(conversationReqObj);
  })


  it('should be handling functions', () => {
    let store = mockStore({
      asyncMessageState: asyncMessageState[1],
      authState: {userState: userState[3]},
      networkReducer: {network: false}
    });


    let props = createTestProps({});
    let context = { store };
    let mockedKeyboardHeight = { endCoordinates: { height: 40 } };
    let wrapper = shallow(
      <ConversationSummary {...props} />,
      { context },
    );
  })

  it('should be handling functions', () => {
    let store = mockStore({
      asyncMessageState: asyncMessageState[1],
      authState: {userState: userState[0]},
      networkReducer: {network: true}
    });


    let props = createTestProps({});
    let context = { store };
    let wrapper = shallow(
      <EmptyConversation gotoCreateConversation = {gotoCreateConversation} />,
      { context },
    );
  })

  it('should be handling ConversationList', () => {
    let store = mockStore({
      asyncMessageState: asyncMessageState[1],
      authState: {userState: userState[0]},
      networkReducer: {network: true}
    });


    let props = conversationListProps({})[0];
    let context = { store };
    let wrapper = shallow(
      <ConversationList {...props}/>,
      { context },
    );
    let inst = wrapper.dive().instance()

    inst.getPartcipitantHeader(participantList)
  })

  it('should be handling ConversationList', () => {
    let store = mockStore({
      asyncMessageState: asyncMessageState[0],
      authState: {userState: userState[0]},
      networkReducer: {network: true}
    });


    let props = conversationListProps({})[1];
    let context = { store };
    let wrapper = shallow(
      <ConversationList {...props}/>,
      { context },
    );
    let inst = wrapper.dive().instance()

    inst.getPartcipitantHeader(participantList);
    inst.gotoConversation();
  })

  it('should be handling ConversationList', () => {
    let store = mockStore({
      asyncMessageState: asyncMessageState[0],
      authState: {userState: userState[0]},
      networkReducer: {network: true}
    });


    let props = conversationListProps({})[2];
    let context = { store };
    let wrapper = shallow(
      <ConversationList {...props}/>,
      { context },
    );
    let inst = wrapper.dive().instance()

    inst.getPartcipitantHeader(participantList);
    inst.gotoConversation();
  })
})

test('navigation options', () => {
  let naviProp = createTestProps({});
  const navigationOptions = ConversationSummary.navigationOptions().tabBarOnPress(naviProp, defaultHandler);

  expect(navigationOptions).toMatchSnapshot();
});
