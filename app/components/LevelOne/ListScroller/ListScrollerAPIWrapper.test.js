import React from "react";
import configureMockStore from "redux-mock-store";
import ListScrollerAPIWrapper from "./ListScrollerAPIWrapper";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import {navigation} from './mockData'
// import FormConstants from "./FormConstants";
Enzyme.configure({ adapter: new Adapter() });

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware],
  mockStore = configureMockStore(middlewares);



jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

jest.mock('../../../utils/signalrUtility', () => ({signalrUtility: 'mockSignalrUtility'}))

jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))

jest.mock('../../../routes', () => ({
  routes: 'mockRoutes',
  PATH: "path"
}))
jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))

describe('ListScrollerAPIWrapper component', () => {
    it('ListScrollerAPIWrapper', () => {
      const store = mockStore({data: []}),

        context = { store },
        wrapper = shallow(
          <ListScrollerAPIWrapper data={[]}/>,
          { context },
        ),
        inst = wrapper.instance()

        inst.initAPICall('init')
        inst.onLoadMore()
        inst.onRefresh('init')
        inst.handleRetry()
      });
  })