import React from "react";
import configureMockStore from "redux-mock-store";
import SchedulePreferences from "./index";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { OCCURANCES, VALIDATIONS } from "../../../constants/constants";

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

  it('should be handling SchedulePreferences', () => {

    const store = mockStore({
      authState: {
        userState: {}
      },
      servicerequestState: {
        schedulepreferencesState: {
          schedulePreferencesObj: {
            reccuranceSlotData: [[{selected: true}]],
            slotData: [{selected: true}],
            minimumServiceProviderExperience: 5,
            maximumServiceProviderExperience: 50
          },
          getPatientAddressStatus: true,
          patientAddressType: [],
          DashboardState: {
            dashboardState: {
              lookupDetails: {
                scehduleType: "One Time",
                gender: [],
                recurringPattern: 23,
                slot: [],
                state: []
              }
            }
          }
        }
      }
    }),

     context = { store },
     wrapper = shallow(
      <SchedulePreferences onClickNext= {() => {}} changeActiveIndex={() => null}
      changeNextButtonClickFlag={() => null}
      slotType={[{}]} removeError={() => null} />,
      { context },
    );
    const inst = wrapper.dive().instance()
    inst.isSlotsValid()
    inst.checkAllFields()
    inst.onValidAddressSuccess()
    inst.onFailValidAddressCheck()
    inst.onClickButtonNext()
    inst.onPressArea(1)
    inst.onSelectGender(1)
    inst.selectedScheduleType({id: 1, name: "name"})
    inst.multiSliderValuesChange([0,1])
    inst.dateChanged("1990-01-01")
    inst.onReccuranceSlotSelection(0, {}, 0)
    // inst.onSlotSelection({}, 1)
    inst.onChangeEndType("type")
    inst.getMinDate()
    inst.onChangeReccuranceType({name: OCCURANCES.WEEKLY, id: 1})
    inst.onChangeReccuranceType({name: OCCURANCES.BI_MONTHLY,id: 2})
    inst.renderAddressErrors(VALIDATIONS.STREET)
    inst.renderError("key", "customError")
    inst.renderAddressErrors("key")
    inst.onChangeAddress({street: "street", city: "city", zip: "zip", state: ""})
    inst.componentWillReceiveProps({isNextButtonClicked: true, patientAddressType: []})
  });