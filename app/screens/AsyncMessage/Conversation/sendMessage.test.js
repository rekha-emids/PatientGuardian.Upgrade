import React from "react";
import configureMockStore from "redux-mock-store";
import SendMessage from "./SendMessage";
import thunkMiddleware from 'redux-thunk';

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { asyncMessageState, userState } from "./storeVariable";

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

  describe('SendMessage component', () => {

    it('should be handling SendMessage', () => {
      const store = mockStore({
        asyncMessageState,
        authState: {userState: userState[0]},
        networkReducer: {network: true}
      });

      const context = { store };
      const wrapper = shallow(
        <SendMessage updateMessageText={() => {}}/>,
        { context },
      );
      const inst = wrapper.dive().instance();

      inst.onClickSendMessage();
      inst.updateMessageText('Hi');
      inst.sendImageMessage();
      inst.closePreviewModal();
      inst.onClickAttachment()
    });
  }) 