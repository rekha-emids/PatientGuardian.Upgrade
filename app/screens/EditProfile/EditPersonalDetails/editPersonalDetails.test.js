import React from "react";
import configureMockStore from "redux-mock-store";
import EditPersonalDetailsForm from "./index";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { navigation, userState, DashboardState, EditPersonalDetailsFormState } from './mockData'

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


describe('EditPersonalDetailsForm component', () => {
  let updatedLanguage = {id: 3, name: "Filipino"}

  it('should be handling EditLanguages', () => {
    const store = mockStore({

      navigation,
      authState: {userState},
      DashboardState,
      form: {"EDIT_PERSONAL_DETAILS_FORM": "EDIT_PERSONAL_DETAILS_FORM"}
    }),

      context = { store },
      wrapper = shallow(
        <EditPersonalDetailsForm navigation={navigation[0]} EditPersonalDetailsFormState = {EditPersonalDetailsFormState}/>,
        { context },
      ),
      inst = wrapper.dive().dive().dive().dive().instance();

    inst.onClickUpdate();
    inst.onNavigateBack();
    inst.onFormInputChange();
    inst.onChangeTextInput()
    inst.onPickImage("pickedImageData")


  });

  it('should be handling EditPersonalDetailsForm', () => {
    const store = mockStore({
      navigation,
      authState: {userState},
      DashboardState
    }),

      context = { store },
      wrapper = shallow(
        <EditPersonalDetailsForm navigation={navigation[0]} />,
        { context },
      );

    inst = wrapper.dive().dive().dive().dive().instance();
    inst.updatedProfilePic = "updatedImage"
    inst.onClickUpdate();
    inst.updatedProfilePic = null
    inst.onClickUpdate();
    inst.onNavigateBack();
    inst.onFormInputChange();
    inst.onChangeTextInput()
    inst.onPickImage("")

  });

  it('should be handling EditPersonalDetailsForm', () => {
    const store = mockStore({
      navigation,
      authState: {userState},
      DashboardState
    })

    context = { store },
      wrapper = shallow(
        <EditPersonalDetailsForm navigation={navigation[1]} />,
        { context },
      );
    inst = wrapper.dive().dive().dive().dive().instance();

    inst.onClickUpdate();
    inst.onNavigateBack();
    inst.onFormInputChange();
    inst.onChangeTextInput();
    inst.onPickImage("pickedImageData")

  });
})
