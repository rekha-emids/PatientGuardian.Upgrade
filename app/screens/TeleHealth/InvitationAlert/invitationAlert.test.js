import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import InvitationAlert from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
import { userState } from "../../AsyncMessage/AddParticipant/storeVariable";
import {telehealthTestingState} from './telehealthTestingState'
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


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


  jest.mock('../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))

  jest.mock('react-native-pdf', () => ({reactNativePdf: 'mockRNPdf'}))

  test('renders correctly', () => {
    let store = mockStore({})
    const tree = renderer.create(<Provider store={store}><InvitationAlert /></Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('invitationAlert component', () => {

    it('should be handling invitaion alets', () => {
      let store = mockStore({
        telehealthTestingState,
        authState: {userState: userState[0]},
        networkReducer: {network: true}
      }),
  
       context = { store },
       wrapper = shallow(
        <InvitationAlert />,
        { context },
      ),
       inst = wrapper.dive().instance();
  
      inst.onReject()
      inst.joinVideoConference()
      wrapper.unmount()
  
    });
  })