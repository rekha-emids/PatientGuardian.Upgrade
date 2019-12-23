import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import MemberDetails from "./index";
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
  jest.mock('../../../components/LevelOne/Calendar', () => ({Calendar: 'mockCalendar'}))
  test('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><MemberDetails /></Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should be handling OfflineScreen', () => {
    let store = mockStore({
      loadingState: {isLoading: false},
      onboardingState: onboardingState[0],
      networkReducer: {network: true}
    });
    let context = { store };
    let wrapper = shallow(
      <MemberDetails />,
      { context },
    );
    let inst = wrapper.dive().instance();

    inst.setState({
      searchData: {
        lastname: '',
        memberId: '',
        dob: '',
        planId: null,
        relationShipId: 0
    }
    })
    inst.resetData();
    inst.onPressInfo();
    inst.dateChanged('03/02/2019')
    inst.onChangePlan(20, 1);
    inst.onChangeMemberId(22908);
    inst.onChangeRelationship(3);
    inst.onFailure('failure');
    inst.searchPatient();
    inst.onPressSupport();
    inst.onChangeLastName('Jaya')


    inst.setState({
      searchData: {
        lastname: 'Danny',
        memberId: 1,
        dob: '04/04/2019',
        planId: 1,
        relationShipId: 0
    },
    dobValid: false
    })
    inst.searchPatient();
    inst.onSelectProfile({
      mpi: 1, firstName: 'abc',
      lastName: 'abc', dob: '02/02/1994',
      gender: 'Male', memberId: '123'
    });
  })