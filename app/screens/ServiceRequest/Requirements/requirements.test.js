import React from "react";
import configureMockStore from "redux-mock-store";
import Requirements from "./requirement";
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunkMiddleware from 'redux-thunk';
import { SERVICE_CATEGORIES } from "./mockData";

Enzyme.configure({ adapter: new Adapter() });

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware],
 mockStore = configureMockStore(middlewares);


jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

  jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))

  jest.mock('../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))


  describe('Visit service details component', () => {
    let store = mockStore({
      networkReducer: {network: true}, 
      syncServerState: {isSyncComplete: true},
      servicerequestState: SERVICE_CATEGORIES,
      loadingState: {isLoading: true}
      });

    it('should be handling functions', () => {
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
        navigationState: {routes: []},
        ...props
      });
  
      let props = createTestProps({});
      let context = { store };
      let wrapper = shallow(
        <Requirements changeActiveIndex={() => null} removeError={() => null} {...props} />,
        { context },
      );
      const inst = wrapper.dive().instance()

      inst.onNextClick()
      inst.onClickServiceCategory(1)
      inst.onCheckServiceTask()
      inst.onClickServiceType({serviceTypeId: 1})
      inst.typeItemPressed({serviceTypeId: 1})
      inst.typeItemPressed({serviceTypeId: 12})
      inst.onClickConfirm()
      inst.componentWillReceiveProps({isNextButtonClicked: true})
      inst.onNextClick()
      inst.renderItemCategory({item: {selectedItemCategoryId: 1, selected: false}, index: 0})
      inst.renderItemCategory({item: {selectedItemCategoryId: -1, selected: false}, index: 0})
      inst.renderItemType({
item: {
        "serviceTypeId": 1,
        "serviceTypeDescription": "Ambulation and Mobility",
        "serviceTask": [
          {
            "serviceTaskId": 1,
            "serviceTaskDescription": "Locate transfer devices",
            "serviceRequestTypeDetailsId": 0,
            "isDefault": true,
            "serviceTypeId": 1,
            "isByDefaultSelected": true
          },
          {
            "serviceTaskId": 2,
            "serviceTaskDescription": "Assist with transfer(s)",
            "serviceRequestTypeDetailsId": 0,
            "isDefault": true,
            "serviceTypeId": 1,
            "isByDefaultSelected": true
          }
        ],
        "taskCompleted": 0,
        "totalTask": 0,
        "selected": true
      }, index: 1
})
      inst.renderItemType({
item: {
        "serviceTypeId": 1,
        "serviceTypeDescription": "Ambulation and Mobility",
        "serviceTask": [
          {
            "serviceTaskId": 1,
            "serviceTaskDescription": "Locate transfer devices",
            "serviceRequestTypeDetailsId": 0,
            "isDefault": true,
            "serviceTypeId": 1,
            "isByDefaultSelected": true
          },
          {
            "serviceTaskId": 2,
            "serviceTaskDescription": "Assist with transfer(s)",
            "serviceRequestTypeDetailsId": 0,
            "isDefault": true,
            "serviceTypeId": 1,
            "isByDefaultSelected": true
          }
        ],
        "taskCompleted": 0,
        "totalTask": 0,
        "selected": false
      }, index: 1
})
      inst.onConfirm()
    })
})


describe('Visit service details component', () => {
  let store = mockStore({
    networkReducer: {network: true}, 
    syncServerState: {isSyncComplete: true},
    servicerequestState: {
      ...SERVICE_CATEGORIES,
      requirementsState: {
        ...SERVICE_CATEGORIES.requirementsState,
        selectedServiceCategoryId: -1
      }
      
    },
    loadingState: {isLoading: true}
    });

  it('should be handling functions', () => {
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
      navigationState: {routes: []},
      ...props
    });

    let props = createTestProps({});
    let context = { store };
    let wrapper = shallow(
      <Requirements changeNextButtonClickFlag={() => null} changeActiveIndex={() => null} removeError={() => null} {...props} />,
      { context },
    );
    const inst = wrapper.dive().instance()

    inst.onNextClick()
    inst.onClickServiceCategory(1)
    inst.onCheckServiceTask()
    inst.onClickServiceType({serviceTypeId: 1})
    inst.typeItemPressed({serviceTypeId: 1})
    inst.typeItemPressed({serviceTypeId: 12})
    inst.onClickConfirm()
    inst.componentWillReceiveProps({isNextButtonClicked: true})
    inst.onNextClick()
    inst.renderItemCategory({item: {selectedItemCategoryId: 1, selected: false}, index: 0})
    inst.renderItemCategory({item: {selectedItemCategoryId: -1, selected: false}, index: 0})
    inst.renderItemType({
item: {
      "serviceTypeId": 1,
      "serviceTypeDescription": "Ambulation and Mobility",
      "serviceTask": [
        {
          "serviceTaskId": 1,
          "serviceTaskDescription": "Locate transfer devices",
          "serviceRequestTypeDetailsId": 0,
          "isDefault": true,
          "serviceTypeId": 1,
          "isByDefaultSelected": true
        },
        {
          "serviceTaskId": 2,
          "serviceTaskDescription": "Assist with transfer(s)",
          "serviceRequestTypeDetailsId": 0,
          "isDefault": true,
          "serviceTypeId": 1,
          "isByDefaultSelected": true
        }
      ],
      "taskCompleted": 0,
      "totalTask": 0,
      "selected": false
    }, index: 1
})
    inst.renderItemType({
item: {
      "serviceTypeId": 1,
      "serviceTypeDescription": "Ambulation and Mobility",
      "serviceTask": [
        {
          "serviceTaskId": 1,
          "serviceTaskDescription": "Locate transfer devices",
          "serviceRequestTypeDetailsId": 0,
          "isDefault": true,
          "serviceTypeId": 1,
          "isByDefaultSelected": true
        },
        {
          "serviceTaskId": 2,
          "serviceTaskDescription": "Assist with transfer(s)",
          "serviceRequestTypeDetailsId": 0,
          "isDefault": true,
          "serviceTypeId": 1,
          "isByDefaultSelected": true
        }
      ],
      "taskCompleted": 0,
      "totalTask": 0,
      "selected": false
    }, index: 1
})
    inst.onConfirm()
  })
})