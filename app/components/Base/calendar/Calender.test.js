import React from "react";
import configureMockStore from "redux-mock-store";
import Calender from "./Calendar";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
// import toJson from 'enzyme-to-json';

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
  PATH: 'path'
}))
jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))


describe('Dots component', () => {

  it('should be handling Dots', () => {
    const store = mockStore({
      asyncMessageState: {conversation: []},
      authState: {userState: {userInfo: {userType: 'G', userId: '10'}}} 
    }),

     context = { store },
     wrapper = shallow(
      <Calender  onSelectDate={() => {}}/>,
      { context },
    ),
     inst = wrapper.instance();

     inst.componentWillReceiveProps({monthlabel: ''})
     inst.daysInMonth('', '')
     inst.getDates({
 currentDate: '',
        showDaysBeforeCurrent: '',
        showMonthsCount: '',
        showYearCount: ''
})
    inst.onRenderDay(0, 10)
    inst.getVisibleDates()
    inst.getVisibleMonthAndYear()
    inst.updateVisibleMonthAndYear()
    inst.scrollToCurrentDay()
    inst.onSelectDay(0, true)
    inst.leftArrow()
    inst.rightArrow()
    inst.onScroll({ nativeEvent: { contentOffset: { x: 0, y: 0 } } })
  });

})