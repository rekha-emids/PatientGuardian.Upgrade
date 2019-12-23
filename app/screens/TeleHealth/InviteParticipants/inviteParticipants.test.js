import React from "react";
import configureMockStore from "redux-mock-store";
import InviteParticipants from "./index";

import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { telehealthTestingState } from '../InvitationAlert/telehealthTestingState'
import { userState } from "../../AsyncMessage/AddParticipant/storeVariable";
Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);



jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

// jest.mock('react-navigation-redux-helpers', () => ({	
//     reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'	
//   }))

jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))

jest.mock('react-navigation', () => ({ReactNavigation: 'ReactNavigation'}))

jest.mock('../../../routes', () => ({routes: 'mockRoutes'}))
jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))

jest.mock('react-native-pdf', () => ({reactNativePdf: 'mockRNPdf'}))

describe('inviteParticipant component', () => {

  it('should be handling invite participant', () => {
    let store = mockStore({
      telehealthState: telehealthTestingState,
      authState: {userState: userState[0]},
      profileState: {
        PersonalDetailState: {
          cityDetail: [],
          genderDetail: [],
          imageData: "",
          isUser: false,
          patientId: null,
          personalDetail: [],
          updatePersonalDetailSuccess: false,
          userId: null,
          userType: ""
        }
      }

    }),

      context = { store },
      wrapper = shallow(
        <InviteParticipants />,
        { context },
      ),
      inst = wrapper.dive().instance();

    inst.updateSelected('index', {
      selected: true,
      userId: '',
      participantType: '',
      firstName: '',
      lastName: '',
      thumbNail: '',
      participantId: ''
    })
    inst.onSearchTextChange('search')
    inst.onBackButton()
    inst.addParticipants()
    inst.onPressBack()
    inst.componentWillUnmount()
    wrapper.unmount()

  });
})