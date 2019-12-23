import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import PointService, { Address, AddressField } from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { authState, profileState } from "./mockData";
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
test('renders correctly', () => {
  const tree = renderer.create(<Provider store={store}><PointService /></Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});

it('should be handling PointService', () => {
  let store = mockStore({
    profileState: profileState[0],
    authState: authState[0],
    networkReducer: {network: true}

  });
  let context = { store };
  let wrapper = shallow(
    <PointService params={{ id: 1023 }} />,
    { context },
  );
  let inst = wrapper.dive().instance();

  inst.onDelete();
  inst.onEditPress({});
  inst.onAddPress();
  inst.onServiceDelete({ addressId: 1023 });
})

it('should be handling PointService', () => {
  let store = mockStore({
    profileState: profileState[1],
    authState: authState[0],
    networkReducer: {network: true}

  });
  let context = { store };
  let wrapper = shallow(
    <PointService />,
    { context },
  );
  let inst = wrapper.dive().instance();

  inst.onDelete();
  inst.onEditPress({});
  inst.onAddPress();
  inst.onServiceDelete({ addressId: 1023 });
  inst.onConfirmModal();
  inst.onCancelModal();
})

it('should be handling Address', () => {
  let store = mockStore({
    profileState: profileState[1],
    authState: authState[0],
    networkReducer: {network: true}

  });
  let context = { store };
  let wrapper = shallow(
    <Address

      address={{ addressTypeId: 1, isPrimaryAddress: true, street: 'street', city: 'city', stateName: 'stateName', zip: '56009' }}
      onEditPress={jest.fn()}
      onServiceDelete={jest.fn()}
      divider={'divider'}
      isEditable={true}
    />,
    { context },
  );
  let inst = wrapper.dive().instance();

})

it('should be handling AddressField', () => {
  let store = mockStore({
    profileState: profileState[1],
    authState: authState[0],
    networkReducer: {network: true}

  });
  let context = { store };
  let wrapper = shallow(
    <AddressField
      label={'label'}
      value={'value'}
    />,
    { context },
  );
  let inst = wrapper.dive().instance();

})