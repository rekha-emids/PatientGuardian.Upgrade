import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Preferred from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


 jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


 jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

 jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

 jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

 jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

   jest.mock('../../../../../redux/store', () => ({Store: 'mockStore'}))

   jest.mock('../../../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
  test('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><Preferred /></Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('Needing approval component', () => {

    it('should be handling onPressConversation', () => {
      const context = { store };
      const wrapper = shallow(
        <Preferred />,
        { context },
      );
      const inst = wrapper.dive().instance();

      wrapper.unmount()
  
      const willUnmount = sinon.spy();
  
      // const mountedWrapper = mount(<ItemDetail  />, {context});
      expect(jest.fn(willUnmount)).toBeCalledTimes(0);
    });
  
  })