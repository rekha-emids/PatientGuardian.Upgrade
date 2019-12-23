import React from "react";
import configureMockStore from "redux-mock-store";
import Dots from "./Dots";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { USER_TYPES } from "../../../constants/constants";

Enzyme.configure({ adapter: new Adapter() });
// import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware],
 mockStore = configureMockStore(middlewares);



jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

jest.mock('../../../utils/signalrUtility', () => ({signalrUtility: 'mockSignalrUtility'}))

jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))

jest.mock('../../../routes', () => ({
  routes: 'mockRoutes',
  PATH: 'path'
}))
jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))


describe('Dots component', () => {

  it('should be handling Dots', () => {
    const store = mockStore({
      asyncMessageState: {conversation: []},
      authState: {userState: {userInfo: {userType: 'G', userId: '10'}}},
      networkReducer: {network: true} 
    }),

     context = { store },
     wrapper = shallow(
      <Dots participant={{userId: ''}} firstName ={'test'} lastName={'test'}/>,
      { context },
    ),
     inst = wrapper.dive().instance();

     inst.showModal()
     inst.viewProfile()
     inst.onRemoveParticipant()
     inst.onCancel()
     inst.cancelModel()

  });

  it('should be handling Dots', () => {
    const store = mockStore({
      asyncMessageState: {conversation: []},
      authState: {userState: {userInfo: {userType: 'G', userId: '10'}}},
      networkReducer: {network: true} 
    }),

     context = { store },
     wrapper = shallow(
      <Dots participant={{userId: ''}} firstName ={'test'} lastName={'test'} participantType={USER_TYPES.SERVICE_PROVIDER} />,
      { context },
    ),
     inst = wrapper.dive().instance();

     inst.showModal()
     inst.viewProfile()
     inst.onRemoveParticipant()
     inst.onCancel()
     inst.cancelModel()

  });

})