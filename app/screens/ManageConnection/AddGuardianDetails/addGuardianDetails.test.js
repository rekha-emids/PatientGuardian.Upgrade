import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import AddGuardianDetails from "./index";
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
    const tree = renderer.create(<Provider store={store}><AddGuardianDetails /></Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should be handling AddGuardianDetails', () => {
    let store = mockStore({
      loadingState: {isLoading: false},
      onboardingState: {setUserIdState: {isLoadingUserId: 0}},
      manageConnectionState
    });
    let e = {endCoordinates: {height: 40}}
    let context = { store };
    let wrapper = shallow(
      <AddGuardianDetails />,
      { context },
    );
    let inst = wrapper.dive().instance()

    inst.onClickButtonNext();
    inst.onClickButtonSkip();
    inst.onClickSendInvitation();
    inst.onClickButtonCancel();
    inst.onFirstNameChange("John");
    inst.onChangeLastName("Cannady");
    inst.onChangeEmail('john@example.com');
    inst.onChangeContactNumber('9999999999');
    inst._keyboardDidShow(e);
    inst._keyboardDidHide();
    inst.componentWillUnmount();
    inst.onBlurEmail('john@example.com');
    inst.setState({emailAddress: '#3434'})
    inst.onBlurEmail("@$45")
   
    inst.onBlurContact('9999999999')
    inst.setState({contactNumber: '123456'})
    inst.onBlurContact('9999999999')
    inst.setState({firstName: ""})
    inst.onFirstNameChange("1john");
    inst.onClickSendInvitation()
    inst.setState({emailAddress: 'abc'})
    inst.onClickSendInvitation()
    inst.setState({lastName: '124'})
    inst.onChangeLastName("124");
  })