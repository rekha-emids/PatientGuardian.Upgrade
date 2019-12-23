import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import AddParticipant from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {userState, asyncMessageState} from './storeVariable'


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

jest.mock('../../../routes', () => ({routes: 'mockRoutes'}))
jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))





test('renders correctly', () => {
  const store = mockStore({
    asyncMessageState,
    authState: {userState: userState[0]}
  }),
   tree = renderer.create(<Provider store={store}><AddParticipant /></Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});


describe('AddParicipant component', () => {

  it('should be handling onAddParticipants', () => {
    const store = mockStore({
      asyncMessageState,
      authState: {userState: userState[1]} 
    }),

     context = { store },
     wrapper = shallow(
      <AddParticipant />,
      { context },
    ),
     inst = wrapper.dive().dive()
.dive()
.dive()
.instance();

    inst.apiCall();
    inst.onAddParticipants();
    inst.onBackButton();
    inst.onClickBackButton()
    inst.onSearchTextChange();
    inst.updateSelected(1, asyncMessageState.conversation.participantList[0])
    inst.showModalOnCancel();
    wrapper.unmount()

  });

  it('should be handling onAddParticipants', () => {
    const store = mockStore({
      asyncMessageState,
      authState: {userState: userState[2]} 
    }),

     context = { store },
     wrapper = shallow(
      <AddParticipant />,
      { context },
    );

  });

  it('should be handling onAddParticipants', () => {
    const store = mockStore({
      asyncMessageState,
      authState: {userState: userState[3]} 
    }),

     context = { store },
     wrapper = shallow(
      <AddParticipant />,
      { context },
    );

  });
})