import React from "react";
import configureMockStore from "redux-mock-store";
import VideoConference from "./index";
import thunkMiddleware from 'redux-thunk';

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { userState } from "../../AsyncMessage/AddParticipant/storeVariable";
import { telehealthTestingState } from "../InvitationAlert/telehealthTestingState";


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
  // test('renders correctly', () => {
  //   const tree = renderer.create(<Provider store={store}><VideoConference /></Provider>).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  describe('VideoConference component', () => {
   
    it('should be handling VideoConference', () => {
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
          <VideoConference />,
          { context },
        ),
        inst = wrapper.dive().instance();

      inst._onMuteButtonPress('search')
      inst.disconnectConversation('100')
      inst._onEndButtonPress()
      inst._onLeaveButtonPress()
      inst._onRoomDidFailToConnect()
      inst._onRoomDidDisconnect()
      inst._onRoomDidConnect()
      inst._onConnectButtonPress('token')
      inst._onGenerateTokenPress()
      inst._onParticipantAddedVideoTrack({participant: {sid: ''}, track: {trackSid: ''}})
      inst._onParticipantRemovedVideoTrack({participant: {sid: ''}, track: {trackSid: ''}})
      inst._onsetLocalVideoEnabled()
      inst._onFlipButtonPress()
      inst.checkTimeStarted()
      inst.checkSessionInactive()
      inst.checkMaxVideoCallHour()
      inst.onleaveConf()
      inst.OnNotLeaveConf()
      inst.onElapsedCancel()
      inst.onElapsedLeave()
      inst.showLeaveConfModal()
      inst.goBackParticipantView()
      inst.goBackInviteParticipantView()
      inst.resetSelectedTrack()
      inst.pressViewParticiapnt()
      inst.pressInviteParticipantView()
      inst.componentWillUnmount()
      wrapper.unmount()
  
    });
  })