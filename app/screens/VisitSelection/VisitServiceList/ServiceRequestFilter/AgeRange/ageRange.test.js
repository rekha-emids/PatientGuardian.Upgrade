import React from "react";
import configureMockStore from "redux-mock-store";
import AgeRange from "./index";
import thunkMiddleware from 'redux-thunk';

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);



jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

  jest.mock('../../../../../redux/store', () => ({Store: 'mockStore'}))

  jest.mock('../../../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
  jest.mock('react-native-pdf', () => ({reactNativePdf: 'mockRNPdf'}))
  // test('renders correctly', () => {
  //   const tree = renderer.create(<Provider store={store}><AgeRange /></Provider>).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

    
  it('should be handling AgeRange', () => {
    const store = mockStore({}),

     context = { store },
     wrapper = shallow(
      <AgeRange />,
      { context },
    )
     })