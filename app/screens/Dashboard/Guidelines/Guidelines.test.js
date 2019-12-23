import React from "react";
import configureMockStore from "redux-mock-store";
import Guidelines from ".";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
// import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);



jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

jest.mock('../../../utils/signalrUtility', () => ({signalrUtility: 'mockSignalrUtility'}))

jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))

jest.mock('../../../routes', () => ({routes: 'mockRoutes'}))
jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))


describe('AddParicipant component', () => {

  it('should be handling onAddParticipants', () => {
    const store = mockStore({dashboardState: {dashboardState: {stages: {0: true, 1: false, 2: true, 3: false, 4: false}}}});

    const context = { store };

    const wrapper = shallow(
      <Guidelines />,
      { context },
    );
    const inst = wrapper.dive().instance();

    inst.onClickLeft();
    inst.onClickRight();
    inst.onPressImage(0)
    inst.onPressImage(1)
    inst.onPressImage(2)
    inst.onPressImage(3)
    inst.onPressImage(4)

  });
})