import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Participants from "./index";
import renderer from 'react-test-renderer';
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
  test('renders correctly', () => {
    let store = mockStore({});
    const tree = renderer.create(<Provider store={store}><Participants /></Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('Participants component', () => {

    it('should be handling participants', () => {
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
          <Participants />,
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
      inst.formatLinkedPatients()
      inst.addParticipants()
      inst.onPressBack()
      inst.onPressCancle()
      wrapper.unmount()
  
    });
  })