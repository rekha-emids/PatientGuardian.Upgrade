import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import PersonalDetails, { RatingAndExperience, NavBar, ProfilePicAndDetails, Address, AddressField } from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { impersonateProfileState, details, profilePicDetailsData } from "./mockData";
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

  it('should be handling Languages ', () => {
    let store = mockStore({impersonateProfileState});
    let context = { store };
    let wrapper = shallow(
      <PersonalDetails />,
      { context },
    );
    let inst = wrapper.dive().instance();

    inst.getPersonalDetailsData();
  })

  it('should be handling RatingAndExperience ', () => {
    let store = mockStore({impersonateProfileState});
    let context = { store };
    let wrapper = shallow(
      <RatingAndExperience details = {details}/>,
      { context },
    );
    let inst = wrapper.dive().instance();
  })

  it('should be handling RatingAndExperience ', () => {
    let store = mockStore({impersonateProfileState});
    let context = { store };
    let wrapper = shallow(
      <NavBar isEditable = {true} onPress = {jest.fn()}/>,
      { context },
    );
    let inst = wrapper.dive().instance();
  })


  it('should be handling ProfilePicAndDetails ', () => {
    let store = mockStore({impersonateProfileState});
    let context = { store };
    let wrapper = shallow(
      <ProfilePicAndDetails 
      profilePic = {profilePicDetailsData.profilePic}
      details = {profilePicDetailsData.details}
      percentage = {profilePicDetailsData.percentage}
      />,
      { context },
    );
    let inst = wrapper.dive().instance();
  })
 

  it('should be handling Address ', () => {
    let store = mockStore({impersonateProfileState});
    let context = { store };
    let wrapper = shallow(
      <Address address = {{city: 'city', state: {name: 'state'}, zipCode: '56009' }} mobileNumber = {'9876543210'}/>,
      { context },
    );
    let inst = wrapper.dive().instance();
  }) 


  it('should be handling AddressField ', () => {
    let store = mockStore({impersonateProfileState});
    let context = { store };
    let wrapper = shallow(
      <AddressField icon = {'SampleIcon'} label = {'label'} value = {"value"}/>,
      { context },
    );
    let inst = wrapper.dive().instance();
  }) 