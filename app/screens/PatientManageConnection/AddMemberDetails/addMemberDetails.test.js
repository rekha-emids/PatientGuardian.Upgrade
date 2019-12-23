import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import AddMemberDetails from "./index";
Enzyme.configure({ adapter: new Adapter() });
const middlewares = [ thunkMiddleware ]
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))
jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))
jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))
jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))
jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))
jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))
jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
jest.mock('../../../components/LevelOne/Calendar', () => ({Calendar: 'mockCalendar'}))


  jest.mock('../../../routes', () => ({	
    routes: 'mockRoutes',
    "PATH" : "path"	
  }))



  test('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><AddMemberDetails /></Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should be handling AddMemberDetails', () => {
    let store = mockStore({
      onboardingState: {
        memberDetailsState: {
          plans: [{planType: "1", planId: 1}],
          patientProfiles: [{id: 1}],
          profileData: {},
          searchMembersSuccess: true,
          searchMembersError: true,
          planId: 1,
          lastName: "John",
          memberId: 1,
          dob: "1990-01-01"          
        },
        profileTypeState: {
          profileType: {},
          selectedRelationValue: "Father"
        }
      },
      loadingState: {
        isLoading: true
      },
      networkReducer: {
        network: true
      }

    });

    const createTestProps = (props) => ({
      navigation: {
        state: { params: {} },
        dispatch: jest.fn(),
        goBack: jest.fn(),
        dismiss: jest.fn(),
        navigate: jest.fn(),
        openDrawer: jest.fn(),
        closeDrawer: jest.fn(),
        toggleDrawer: jest.fn(),
        getParam: jest.fn(),
        setParams: jest.fn(),
        addListener: jest.fn(),
        push: jest.fn(),
        replace: jest.fn(),
        pop: jest.fn(),
        popToTop: jest.fn(),
        isFocused: jest.fn()
      },
      navigationState: {
          routes: []
      },
      ...props
    });
    let props = createTestProps({})


    let context = { store };
    let wrapper = shallow(
      <AddMemberDetails {...props}
      />,
      { context },
    );
    let inst = wrapper.dive().instance();
    inst.resetData()
    inst.onClickButtonPrevious()
    inst.dateChanged("1900-01-01")
    inst.onChangePlan(1, 1)
    inst.onChangeLastName("value")
    inst.onChangeMemberId(1)
    inst.onClickPreviousBtn()
    inst.onPressSupport()
    inst.searchPatient()
  })