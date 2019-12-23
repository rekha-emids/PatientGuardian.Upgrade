import React from "react";
import configureMockStore from "redux-mock-store";
import PerformTasks, { PeformedTasks, Task, TasksList } from "./index";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PERFORM_TASKS } from "../mockData";
import { SERVICE_STATES } from "../../../../constants/constants";
Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))

jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

  jest.mock('../../../../redux/store', () => ({Store: 'mockStore'}))

  jest.mock('../../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
  jest.mock('react-native-pdf', () => ({reactNativePdf: 'mockRNPdf'}))

  describe('Service Visits component', () => {
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
        PerformTasksList: PERFORM_TASKS,
        ...props
      });
  
      let props = createTestProps({});
      let context = { store };
      let wrapper = shallow(
        <PerformTasks {...props} />,
        { context },
      );
  
      const inst = wrapper.dive().instance();
    })
  })

  describe('Service Visits component', () => {
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
        PerformTasksList: {
          ...PERFORM_TASKS,
          visitStatusId: SERVICE_STATES.COMPLETED
        },
        ...props
      });
  
      let props = createTestProps({});
      let context = { store };
      let wrapper = shallow(
        <PerformTasks {...props} />,
        { context },
      );
  
      const inst = wrapper.dive().instance();
    })
  })
  describe('Service Visits component', () => {
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
        PerformTasksList: {
          ...PERFORM_TASKS,
          visitStatusId: SERVICE_STATES.YET_TO_START
        },
        ...props
      });
  
      let props = createTestProps({});
      let context = { store };
      let wrapper = shallow(
        <PerformTasks {...props} />,
        { context },
      );
  
      const inst = wrapper.dive().instance();
    })
  })

  describe('Service Visits component', () => {
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
        PerformTasksList: null,
        ...props
      });
  
      let props = createTestProps({});
      let context = { store };
      let wrapper = shallow(
        <PerformTasks {...props} />,
        { context },
      );

      let performedTasks = shallow(
        <PeformedTasks openedTasks={{1599: 1599, 7668: 7668}} performTasksList={PERFORM_TASKS} />,
        {context}
      )
  
      shallow(
        <Task isOpened={true} serviceRequestTypeTaskVisits={PERFORM_TASKS.serviceRequestTypeVisits[0].serviceRequestTypeTaskVisits} />,
        {context}
      )
      shallow(
        <Task showDivider={true} isOpened={true} serviceRequestTypeTaskVisits={PERFORM_TASKS.serviceRequestTypeVisits[0].serviceRequestTypeTaskVisits} />,
        {context}
      )
      shallow(
        <TasksList  />,
        {context}
      )
      shallow(
        <TasksList displayDivider={true} statusId={90} />,
        {context}
      )
      const inst = wrapper.dive().instance();
    })
  })