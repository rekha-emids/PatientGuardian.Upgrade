import React from "react";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import VisitProcessing from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { SUMMARY_DETAILS, SUBMITTED_RESPONSE } from "../../VisitHistory/VisitHistoryServiceDetails/mockData";
Enzyme.configure({ adapter: new Adapter() });
const middlewares = [ thunkMiddleware ]
const mockStore = configureMockStore(middlewares);
const store = mockStore({});



jest.mock('jsencrypt', () => ({	
    encryptPassword: 'mockJSEncrypt'	
}))


jest.mock('react-native-background-task', () => ({	
  rnbt: 'mockRNBackgroundTask'	
}))

jest.mock('react-native-firebase', () => ({	
  rnfb: 'mockRNFirebase'	
}))

jest.mock('rn-fetch-blob', () => ({	
  reactNativeFetchBlob: 'mockRNFetchBlob'	
}))

jest.mock('react-navigation-redux-helpers', () => ({	
    reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'	
  }))

  jest.mock('../../../redux/store', () => ({	
    Store: 'mockStore'	
  }))

  jest.mock('../../../routes', () => ({	
    routes: 'mockRoutes'	
  }))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({	
    reactNativeMultiSlider: 'mockRNMultiSlider'	
  }))
  jest.mock('react-native-pdf', () => ({	
    reactNativePdf: 'mockRNPdf'	
  }))
  describe('VisitProcessing component', () => {
    it('should be handling functions', () => {
      let store = mockStore({
        visitSelectionState: {
          VisitServiceProcessingState: {
            SummaryState: {
              getSummaryDetailsStatus: false,
              SummaryDetails: SUMMARY_DETAILS,
              CalculationsData: {}
            },
            PerformTasksState: {
                PerformTasksList: [],
                getPerformTasksStatus: {}
            }
          },
        },
        visitHistoryState: {
          vistServiceHistoryState: {
            submittedResponse: SUBMITTED_RESPONSE
          }
        },
        loadingState: {
          isLoading: false
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
  
      let props = createTestProps({});
      let context = { store };
      let wrapper = shallow(
        <VisitProcessing {...props} />,
        { context },
      );  
      const inst = wrapper.dive().dive().dive().dive().instance();
      inst.getRenderComponent();
      inst.onClickPrev();
      inst.onClickNext();
    })
  })