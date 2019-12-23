import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import EditTitle from "./index";
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
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
  test('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><EditTitle /></Provider>).toJSON();

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
      <EditTitle />,
      { context },
    );
    let inst = wrapper.dive().instance()

    inst.onChangeTitle()
    inst.onSubmitChangeTitle();
    inst.onSuccessUpdate();
    inst.gotoConversation();
    inst.onBackButton();
    inst.onClickBackButton();
    inst.showModalOnCancel()
  })
    it('should be handling functions', () => {
    let store = mockStore({
      asyncMessageState: asyncMessageState[1],
      authState: {userState: userState[3]},
      networkReducer: {network: false}
    });


    // let props = createTestProps({});
    let context = { store };
    let mockedKeyboardHeight = { endCoordinates: { height: 40 } };
    let wrapper = shallow(
      <EditTitle />,
      { context },
    );
    let inst = wrapper.dive().instance()

    inst.onChangeTitle()
    inst.onSubmitChangeTitle();
    inst.onSuccessUpdate();
    inst.gotoConversation();
    inst.onBackButton();
    inst.onClickBackButton();
    inst.showModalOnCancel()
  })