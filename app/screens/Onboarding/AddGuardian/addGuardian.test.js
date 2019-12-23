import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import AddGuardian from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { onboardingState } from "./mockData";
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
    const tree = renderer.create(<Provider store={store}><AddGuardian /></Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should be handling OfflineScreen', () => {
    let store = mockStore({
      loadingState: {isLoading: false},
      networkReducer: {network: true},
      onboardingState: onboardingState[0]
    });
    let context = { store };
    let wrapper = shallow(
      <AddGuardian />,
      { context },
    );
    let inst = wrapper.dive().instance()

    inst.onClickButtonNext();
    inst.onClickButtonSkip();
    inst.onClickSendInvitation();
    inst.onClickButtonCancel();
  })

  it('should be handling OfflineScreen', () => {
    let store = mockStore({
      loadingState: {isLoading: false},
      onboardingState: onboardingState[1],
      networkReducer: {network: true}
    });
    let context = { store };
    let wrapper = shallow(
      <AddGuardian />,
      { context },
    );
    let inst = wrapper.dive().instance()

    inst.onClickButtonNext();
    inst.onClickButtonSkip();
    inst.onClickSendInvitation();
    inst.onClickButtonCancel();
    inst.setState({
      firstName: '',
      lastName: '',
      relationshipId: 4
    })
    inst.onClickSendInvitation();

    inst.setState({firstName: '12dkadfd'})
    inst.onClickSendInvitation();

    inst.setState({
      firstName: 'Johny',
      lastName: 'dep',
      emailAddress: 'john@example.com',
      contactNumber: '9999999999',
      relationshipId: 3
    })
    inst.onClickSendInvitation();

    inst.setState({
      firstName: '1Johny',
      lastName: 'dep',
      emailAddress: 'johnexample.com',
      contactNumber: '9999222999999',
      relationshipId: null
    })
    inst.onClickSendInvitation();


    inst.setState({
      firstName: 'John',
      lastName: 'Dep',
      emailAddress: 'john@example.com',
      contactNumber: '9999999555999',
      relationshipId: 3
    })
    inst.onClickSendInvitation();
    inst.onCancelCoreoWizScreen();
    inst.onChangeFirstName();
    inst.setState({updatedTextInput: true})
    inst.onChangeLastName();
    inst.onChangeEmailAddress();
    inst.onChangePhoneNumber();
    inst.onRelationshipChange();
  })
  