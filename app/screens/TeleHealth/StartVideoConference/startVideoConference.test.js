import React from "react";
import configureMockStore from "redux-mock-store";
import StartVideoConference from "./index";

import thunkMiddleware from 'redux-thunk';

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { telehealthTestingState } from "../InvitationAlert/telehealthTestingState";
import { userState } from "../../AsyncMessage/AddParticipant/storeVariable";
import { createTestProps, defaultHandler } from "../../AsyncMessage/ConversationSummary/storeVariable";

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


  describe('Start VideoConference component', () => {

    it('should be handling Start VideoConference', () => {
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
          <StartVideoConference />,
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
      inst.onSelectPatient('100')
      inst.onBackButton()
      inst.formatLinkedPatients()
      inst.onClickBackButton()
      inst.apiCall()
      inst.handleTabFocus()
      inst.onPressStartVideoCall()
      inst.onPressCancle()
      inst.componentWillUnmount()
      wrapper.unmount()
  
    });
  })

  test('navigation options', () => {
    let naviProp = createTestProps({});
    const navigationOptions = StartVideoConference.navigationOptions().tabBarOnPress(naviProp, defaultHandler);
  
    expect(navigationOptions).toMatchSnapshot();
  });