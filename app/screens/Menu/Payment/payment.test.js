import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Payment, { Card } from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { cardProps } from "./mockData";
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
jest.mock('react-native-pdf', () => ({reactNativePdf: 'mockRNPdf'}))
test('renders correctly', () => {
  const tree = renderer.create(<Provider store={store}><Payment /></Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});

it('should be handling Payment component with CardList as null', () => {
  let store = mockStore({menuState: {paymentState: {CardList: null, paymentStatus: "IN_PROGRESS"}}});
  let context = { store };
  let wrapper = shallow(
    <Payment />,
    { context },
  );
  let inst = wrapper.dive().instance()

  inst.onDeleteSuccess();
  inst.makePrimary(287, true);
  inst.onCardPress(287, false);
  inst.onConfirmPopup();
  inst.onCancelPopup()
})


it('should be handling Payment component with CardList as not null', () => {
  let store = mockStore({
    menuState: {
      paymentState: {
        CardList: [{
          ccNumber: "XXXX XXXX XXXX 4242",
          ccType: "Visa",
          coreoHomeStripeCustomerId: 287,
          description: "Card payment",
          isPrimary: true,
          isSaveCard: false,
          patientId: 1096,
          serviceRequestId: 0,
          serviceRequestVisitId: 0,
          stripeCustomerId: "cus_F1prQUaFzIJXtg"
        }], 
        paymentStatus: "IN_PROGRESS"
      }
    }
  });
  let context = { store };
  let wrapper = shallow(
    <Payment />,
    { context },
  );
  let inst = wrapper.dive().instance()

  inst.onDeleteSuccess();
  inst.makePrimary(287, true);
  inst.onCardPress(287, false);
  inst.onConfirmPopup();
  inst.onCancelPopup();
  inst.onConfirmSuccessPopup()
})


it('should be handling Card component', () => {
  let store = mockStore({});

  let context = { store };
  let wrapper = shallow(
    <Card props={cardProps} />,
    { context },
  );

})