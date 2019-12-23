
import React from "react";
import configureMockStore from "redux-mock-store";
import thunkMiddleware from 'redux-thunk';

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ConversationScreen from "./ConversationScreen";
import { asyncMessageState, userState, } from "./storeVariable";

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

  describe('ConversationScreen component', () => {

    it('should be handling ConversationScreen', () => {
      const store = mockStore({
        asyncMessageState,
        authState: {userState: userState[0]},
        networkReducer: {network: true}
      });

      const context = { store };
      const wrapper = shallow(
        <ConversationScreen message={{createdBy: 'roy', createdByType: 'ISP'}}/>,
        { context },
      );
      const inst = wrapper.dive().instance();

      inst.renderMessages();
      inst.displayImagePreview('Hello');
    });
  }) 