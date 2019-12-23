import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import NewConversation from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { asyncMessageState, userState } from "./storeVariable";

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
  jest.mock('../../ServiceProvidersTab', () => ({ServiceProvidersTab: 'mockServiceProvidersTab'}))

  jest.mock('../../HomeTabs', () => ({HomeTabs: 'mockHomeTabs'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
  test('renders correctly', () => {
    const tree = NewConversation && renderer.create(<Provider store={store}><NewConversation /></Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should be handling functions', () => {
    let store = mockStore({
      asyncMessageState: asyncMessageState[0],
      authState: {userState: userState[0]},
      networkReducer: {network: true}
    });


    // let props = createTestProps({});
    let context = { store };
    let wrapper = shallow(
      <NewConversation />,
      { context },
    );
    let inst = wrapper.dive().dive().dive().dive().instance()

    inst.formatLinkedPatients();
    inst.onSearchTextChange('');
    inst.onSearchTextChange('Hello');
    inst.onCreateConversation();
    inst.onSelectPatient(1002);
    inst.onBackButton();
    inst.updateSelected(1, {selected: true, userId: 81})
    inst.updateSelected(1, {});
    inst.participantsListSelection(1, {selected: true})
    inst.onChangeTextInput();
    inst.onPressSelect();
    inst.onClearTextSearch()
  })
    it('should be handling functions', () => {
    let store = mockStore({
      asyncMessageState: asyncMessageState[1],
      authState: {userState: userState[3]},
      networkReducer: {network: false}
    });


    // let props = createTestProps({});
    let context = { store };
  
    let wrapper = shallow(
      <NewConversation />,
      { context },
    );
    let inst = wrapper.dive().dive().dive().dive().instance();

    inst.formatLinkedPatients();
    inst.onSearchTextChange('');
    inst.onSearchTextChange('Hello');
    inst.onCreateConversation();
    inst.onSelectPatient(1002);
    inst.onBackButton();
    inst.updateSelected(1, {selected: true, userId: 81})
    inst.updateSelected(1, {});
    inst.participantsListSelection(1, {selected: true})
    inst.onChangeTextInput();
    inst.onPressSelect();
    inst.onClearTextSearch()

  })

  it('should be handling functions', () => {
    let store = mockStore({
      asyncMessageState: asyncMessageState[0],
      authState: {userState: userState[1]},
      networkReducer: {network: false}
    });


    // let props = createTestProps({});
    let context = { store };
  
    let wrapper = shallow(
      <NewConversation />,
      { context },
    );
    let inst = wrapper.dive().dive().dive().dive().instance();

    inst.formatLinkedPatients();
    inst.onSearchTextChange('');
    inst.onSearchTextChange('Hello');
    inst.onCreateConversation();
    inst.onSelectPatient(1002);
    inst.onBackButton();
    inst.updateSelected(1, {selected: true, userId: 81})
    inst.updateSelected(1, {});
    inst.participantsListSelection(1, {selected: true})
    inst.onChangeTextInput();
    inst.onPressSelect();
    inst.onClearTextSearch()

  })

    it('should be handling functions', () => {
    let store = mockStore({
      asyncMessageState: asyncMessageState[0],
      authState: {userState: userState[1]},
      networkReducer: {network: false}
    });


    // let props = createTestProps({});
    let context = { store };
  
    let wrapper = shallow(
      <NewConversation />,
      { context },
    );
    let inst = wrapper.dive().dive().dive().dive().instance();

    inst.formatLinkedPatients();
    inst.onSearchTextChange('');
    inst.onSearchTextChange('Hello');
    inst.onCreateConversation();
    inst.onSelectPatient(1002);
    inst.onBackButton();
    inst.updateSelected(1, {selected: true, userId: 81})
    inst.updateSelected(1, {});
    inst.participantsListSelection(1, {selected: true})
    inst.onChangeTextInput();
    inst.onPressSelect();
    inst.onClearTextSearch()

  })