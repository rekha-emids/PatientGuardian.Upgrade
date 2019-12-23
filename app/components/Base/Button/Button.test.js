import React from "react";
import renderer from 'react-test-renderer';
import CoreoButton from "./Button";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../../utils/encryptPassword', () => ({encryptPassword: 'mockencryptPassword'}))

jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))


jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))

jest.mock('../../../routes', () => ({routes: 'mockRoutes'}))
jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))
test('renders correctly', () => {
    renderer.create(
            <CoreoButton
            onPress={() => {}}
            title={"Button"}
            color={"Green"}
            accessibilityLabel={"accessibilityLabel"}
            disabled ={true}
            style={{}}
            />
    ).toJSON();

    renderer.create(
            <CoreoButton
            onPress={() => {}}
            title={""}
            color={""}
            accessibilityLabel={""}
            disabled ={false}
            style={{}}
            />
    ).toJSON();
})
