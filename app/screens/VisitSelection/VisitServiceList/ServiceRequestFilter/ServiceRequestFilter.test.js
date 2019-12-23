import React from "react";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ServiceRequestFilter from "./index";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { Keys, ServiceRequestFiltersData } from "../../../../data/FiltersData";

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunkMiddleware],
  mockStore = configureMockStore(middlewares);

const store = mockStore({});



 jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


 jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

 jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

 jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

   jest.mock('../../../../redux/store', () => ({Store: 'mockStore'}))

   jest.mock('../../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
  test('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><ServiceRequestFilter /></Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });
  describe('ServiceRequest filter component', () => {
    it('ServiceRequest', () => {
      const store = mockStore({visitHistoryState: {vistServiceHistoryState: {serviceCategories: []}}}),

        context = { store },
        wrapper = shallow(
          <ServiceRequestFilter onApplyFilter={() => {}} onClose={() => {}} filters={ServiceRequestFiltersData} data={[]}/>,
          { context },
        ),
        inst = wrapper.dive().instance()

        inst.onChangeMinExp(1)
        inst.onChangeMaxExp(5)
        inst.onChangeMinRating([0, 5])
        inst.onChangeMaxRating(9)
        inst.onChangeRating(7)
        inst.onChangeFromDate("1990-01-01")
        inst.onChangeToDate("1990-01-01")
        inst.onChangeSelectedGender({name: "male", id: 8})
        inst.onClickSkill({id: 1})
        inst.onClickFilter(Keys.CATEGORIES)
        inst.onClickFilter(Keys.SERVICE_PROVIDERS)
        inst.onClickFilter(Keys.DATE_RANGE)
        inst.onClickFilter(Keys.STATUS)
        inst.onClickFilter(Keys.HOURLY_RATE)
        inst.onClickFilter(Keys.EXPERIENCE)
        inst.onClickFilter(Keys.RATING)
        inst.onClickFilter(Keys.SKILLS)
        inst.onClickFilter(Keys.GENDER)
        inst.onClickFilter(Keys.POINT_OF_SERVICE)
        inst.onClickFilter(Keys.CONTRACT)
        inst.onClickFilter(Keys.COHORT)
        inst.onClickFilter(Keys.AGE_RANGE)
        inst.onClickFilter(Keys.CLINICAL_CONDITIONS)
        inst.onClickFilter(Keys.LOCATION)
        inst.onClickFilter(Keys.ATTRIBUTE_PROVIDERS)
        inst.onClickFilter(Keys.RECURRING)
        inst.onClickFilter(Keys.NEEDING_APPROVAL)
        inst.onClickFilter(Keys.VISIT_STATUS)
        inst.onClickFilter(Keys.PREFERRED)
        inst.onClickFilter(Keys.SERVICE_STATUS)
        inst.onPressSp(2)
        inst.onChangeAddress(1, 1, "Andhra")
        inst.onChangeAddressId(1, {})
        inst.onPressCohorts(1)
        inst.onClickClinicalCondition(1)
        inst.onAgeChange([2, 4]),
        inst.onChangeExp([1, 2])
        inst.onChangeSelectedPattern(1)
        inst.updateNeedingApprovalData(1)
        inst.updatePreferredData(1)
        inst.onPressNeedingApproval(1)  
        inst.onUpdateVisitStatusData({})
        inst.statusData(1, true)
        inst.statusData(-1, true)
        inst.serviceStatusData({}, 1)
        inst.applyFilter()  
        inst.onPressCategory(1)
        inst.renderFilters() 
        inst.onReset()
        inst.resetLocalStates(() => {})
        inst.onClose()
        inst.componentWillReceiveProps({id: 1})
        inst.onChangeContractId(1)
        inst.onChangeCategory({serviceCategoryId: 1, serviceTypeTasks: [{serviceTypeId: 1}] })
      });
  })