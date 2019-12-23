import React from "react";
import configureMockStore from "redux-mock-store";
import Address from "./index";
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunkMiddleware from 'redux-thunk';

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
  let address = [{addressId: 1}]

  describe('Visit service details component', () => {
    let store = mockStore({
      networkReducer: {network: true}, 
      syncServerState: {isSyncComplete: true}
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
      let address = [{addressId: 1}]
  
      let props = createTestProps({});
      let context = { store };
      let wrapper = shallow(
        <Address renderError={() => null} selectedAddressKey={1} patientAddressType={address} {...props} />,
        { context },
      );
      let wrapper1 = shallow(
        <Address renderError={() => null} selectedAddressKey={1} patientAddressType={[{addressId: -1}]} />
      )
      let wrapper2 = shallow(
        <Address isUpdated={true} renderError={() => true} selectedAddressKey={-1} patientAddressType={[{addressId: -1}]} />
      )
      let wrapper3 =  shallow(
        <Address isUpdated={false} renderError={() => null} selectedAddressKey={1} patientAddressType={[{addressId: 1, addressTypeId: 1}]} />
      )
      const inst = wrapper.dive().instance();
      const inst2 = wrapper1.dive().instance()
      const inst3 = wrapper2.dive().instance()
      const inst4 = wrapper3.dive().instance()
    })
})
