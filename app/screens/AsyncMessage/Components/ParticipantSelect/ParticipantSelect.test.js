import React from "react";
import ParticipantSelect from "./index";
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });





jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

  jest.mock('../../../../redux/store', () => ({Store: 'mockStore'}))

  jest.mock('../../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))


  it('should be handling ParticipantSelect with positive scenario', () => {

    let item = {
      thumbNail: "thumbNail",
      participantType: 'G',
      selected: true
    }

    function onSelection(){

    }
    const component = shallow(<ParticipantSelect item={item} onSelection={onSelection} />),
     value = 'someValue';

    component.instance().onSelect()

  });

  
  it('should be handling ParticipantSelect with negative scenario', () => {

    let item = {
      thumbNail: "",
      participantType: 'G',
      selected: false
    }

    function onSelection(){

    }
    const component = shallow(<ParticipantSelect item={item} onSelection={onSelection} />),
     value = 'someValue';

    component.instance().onSelect()

  });