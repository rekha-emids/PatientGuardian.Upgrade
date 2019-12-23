import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Conversation from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ConversationScreen from "./ConversationScreen";
import { asyncMessageState, userState } from "./storeVariable";
import SendMessage from "./SendMessage";

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
test('renders correctly', () => {
  const tree = renderer.create(<Provider store={store}><Conversation /></Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});

describe('AddParicipant component', () => {

  it('should be handling onAddParticipants', () => {
    const store = mockStore({
      asyncMessageState,
      authState: {userState: userState[0]},
      networkReducer: {network: true}
    });

    const context = { store };
    let mockedKeyboardHeight = { endCoordinates: { height: 40 } };
    const wrapper = shallow(
      <Conversation />,
      { context },
    );
    const inst = wrapper.dive().dive().dive().dive().instance();

    inst.apiCall();
    inst.componentDidMount();
    inst.onBackButton();
    inst.updateMessageText('Hi');
    inst.updateMessageText('Hi');
    inst._keyboardDidShow(mockedKeyboardHeight);
    inst.onLoadMore();
    wrapper.unmount()

  });


  
  it('should be handling conversationScreen', () => {
    const store = mockStore({
      asyncMessageState: {...asyncMessageState, conversationImageUrl: "url"},
      authState: {userState: userState[0]},
      networkReducer: {network: true}
    });

    const context = { store };
    const wrapper = shallow(
      <ConversationScreen message={{conversationMessageId: 0}}/>,
      { context },
    );
    const inst = wrapper.dive().instance();

    inst.displayImagePreview()

  });

  it('should be handling conversationScreen', () => {
    const store = mockStore({
      asyncMessageState,
      authState: {userState: userState[0]},
      networkReducer: {network: true}
    });

    const context = { store };
    const wrapper = shallow(
      <ConversationScreen message={{conversationMessageId: 0}} />,
      { context },
    );
    const inst = wrapper.dive().instance();

    inst.displayImagePreview({conversationMessageId: 0})

  });

  it('should be handling sendMessage', () => {
    const store = mockStore({
      asyncMessageState,
      authState: {userState: userState[0]},
      networkReducer: {network: true}
    });

    const context = { store };
    const wrapper = shallow(
      <SendMessage updateMessageText={jest.fn()} />,
      { context },
    );
    const inst = wrapper.dive().instance();

    inst.onClickSendMessage()

  });

})