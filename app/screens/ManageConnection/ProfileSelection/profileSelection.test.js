import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ProfileSelection from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { manageConnectionState } from "./mockData";
Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);
const store = mockStore({});



jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))

jest.mock('../../../routes', () => ({routes: 'mockRoutes'}))
jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
test('renders correctly', () => {
  const tree = renderer.create(<Provider store={store}><ProfileSelection /></Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});

it('should be handling GeneralComponent', () => {
  const store = mockStore({
    authState: {
      userState: {
        userInfo: {
          careTeamId: 0,
          coreoHomeUserId: 118,
          email: "Lori.whitfoot@mailinator.com",
          emailId: "Lori.whitfoot@mailinator.com",
          isUserMapped: true,
          lastViewedUserId: 1022,
          lastViewedUserType: "I",
          onBoardRelationShip: null,
          onBoardUserId: 0,
          patientId: 1022,
          relationshipName: "Self",
          userId: 118,
          userType: "I"
        }
      }
    },
    manageConnectionState
  });
  let context = { store }
  let wrapper = shallow(
    <ProfileSelection />,
    { context }
  );
  let inst = wrapper.dive().instance();

  inst.onClickButtonCancel();
  inst.onClickButtonNext();
  inst.setState({selectedProfileType: 'Guardian'})

})