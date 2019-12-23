import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import PersonalDetails, { NavBar, ProfilePicAndDetails, Address, AddressField } from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { authState, profileState, profilePicAndDetails } from "./mockData";
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
  const tree = renderer.create(<Provider store={store}><PersonalDetails /></Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});

it('should be handling PersonalDetails', () => {
  let store = mockStore({
    profileState: profileState[0],
    authState: authState[0],
    networkReducer: {network: true}
  });
  let context = { store };
  let wrapper = shallow(
    <PersonalDetails />,
    { context },
  );
  let inst = wrapper.dive().instance();

  inst.onEditPress();
  inst.renderAffliationComponent({ profileType: 'patient' });
  inst.renderAffliationComponent({ profileType: 'Organization' });
  inst.onPressFun()
})


it('should be handling NavBar', () => {
  let store = mockStore({
    profileState: profileState[0],
    authState: authState[0],
    networkReducer: {network: true}

  });
  let context = { store };
  let wrapper = shallow(
    <NavBar isEditable={true} onEditPress={jest.fn()} onPress={jest.fn()} />,
    { context },
  );
  let inst = wrapper.dive().instance();

})

it('should be handling NavBar', () => {
  let store = mockStore({
    profileState: profileState[0],
    authState: authState[0],
    networkReducer: {network: true}
  });
  let context = { store };
  let wrapper = shallow(
    <NavBar isEditable={false} onEditPress={jest.fn()} onPress={jest.fn()} />,
    { context },
  );
  let inst = wrapper.dive().instance();

})


it('should be handling ProfilePicAndDetails', () => {
  let store = mockStore({
    profileState: profileState[0],
    authState: authState[0],
    networkReducer: {network: true}
  });
  let context = { store };
  let wrapper = shallow(
    <ProfilePicAndDetails
      details={profilePicAndDetails[0].details}
      params={profilePicAndDetails[0].params}
      profilePercentage={profilePicAndDetails[0].profilePercentage}
      profilePic={profilePicAndDetails[0].profilePic}
      userType={profilePicAndDetails[0].userType}

    />,
    { context },
  );
  let inst = wrapper.dive().instance();

})

it('should be handling ProfilePicAndDetails', () => {
  let store = mockStore({
    profileState: profileState[0],
    authState: authState[0],
    networkReducer: {network: true}

  });
  let context = { store };
  let wrapper = shallow(
    <ProfilePicAndDetails
      details={profilePicAndDetails[2].details}
      params={profilePicAndDetails[2].params}
      profilePercentage={profilePicAndDetails[2].profilePercentage}
      profilePic={profilePicAndDetails[2].profilePic}
      userType={profilePicAndDetails[2].userType}

    />,
    { context },
  );
  let inst = wrapper.dive().instance();

})


it('should be handling ProfilePicAndDetails', () => {
  let store = mockStore({
    profileState: profileState[0],
    authState: authState[0],
    networkReducer: {network: true}

  });
  let context = { store };
  let wrapper = shallow(
    <ProfilePicAndDetails
      details={profilePicAndDetails[1].details}
      params={profilePicAndDetails[1].params}
      profilePercentage={profilePicAndDetails[1].profilePercentage}
      profilePic={profilePicAndDetails[1].profilePic}
      userType={profilePicAndDetails[1].userType}

    />,
    { context },
  );
  let inst = wrapper.dive().instance();

})


it('should be handling ProfilePicAndDetails', () => {
  let store = mockStore({
    profileState: profileState[0],
    authState: authState[0],
    networkReducer: {network: true}

  });
  let context = { store };
  let wrapper = shallow(
    <ProfilePicAndDetails
      details={profilePicAndDetails[3].details}
      params={profilePicAndDetails[3].params}
      profilePercentage={profilePicAndDetails[3].profilePercentage}
      profilePic={profilePicAndDetails[3].profilePic}
      userType={profilePicAndDetails[3].userType}
    />,
    { context },
  );
  let inst = wrapper.dive().instance();

})


it('should be handling Address', () => {
  let store = mockStore({
    profileState: profileState[0],
    authState: authState[0],
    networkReducer: {network: true}

  });
  let context = { store };
  let wrapper = shallow(
    <Address address={{ streetAddress: "streetAddress", city: 'city', state: { name: 'US' }, zipCode: '456731' }} mobileNumber={"9876543210"} />,
    { context },
  );
  let inst = wrapper.dive().instance();

})


it('should be handling AddressField', () => {
  let store = mockStore({
    profileState: profileState[0],
    authState: authState[0],
    networkReducer: {network: true}

  });
  let context = { store };
  let wrapper = shallow(
    <AddressField icon={'base64ImageIcon'} label={'AddressFieldName'} value={"value"} />,
    { context },
  );
  let inst = wrapper.dive().instance();

})
