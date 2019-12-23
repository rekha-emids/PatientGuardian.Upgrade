import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Gender from "./index";
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';

Enzyme.configure({ adapter: new Adapter() });

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware],
 mockStore = configureMockStore(middlewares);

const store = mockStore({});

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
      syncServerState: {isSyncComplete: true}
      });

    it('should be handling functions', () => {
      const createTestProps = (props) => ({...props});
      let gender = [{
        id: 8,
        name: "Others"
      },
      {
        id: 6,
        name: "Male"
      },
      {
        id: 7,
        name: "Female"
      }
    ]
  
      let props = createTestProps({});
      let context = { store };
      let wrapper = shallow(
        <Gender  genderType={gender} {...props} />,
        { context },
      );
      const inst = wrapper.dive().instance();
      let wrapper2 = shallow(
        <Gender  selectedGenderKey={8} genderType={gender} {...props} />,
        { context },
      );
      const inst2 = wrapper2.dive().instance();

    })
})