import React from "react";
import { View } from 'react-native'
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import renderer from 'react-test-renderer';
import thunkMiddleware from 'redux-thunk';
import ModalPopup from "./ModalPopup";
import { CoreoButton } from '../..';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares);

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

    const store = mockStore({});
    const positiveScenario = renderer.create(
        <Provider store={store}>
            <ModalPopup
                visible={true}
                primaryButton={true}
                children={<View></View>}
                secondaryButton={true}
                isDisabled ={true}
            />
        </Provider>
    ).toJSON();

    expect(positiveScenario).toMatchSnapshot();
    const negativeScenario = renderer.create(
        <Provider store={store}>
            <ModalPopup
                visible={false}
                primaryButton={false}
                children={<View></View>}
                secondaryButton={false}
                isDisabled ={false}
            />
        </Provider>
    ).toJSON();

    expect(negativeScenario).toMatchSnapshot();
    const positiveButtonScenario = renderer.create(
        <CoreoButton
        onPress={() => {}}
        title={"Button"}
        color={"Green"}
        accessibilityLabel={"accessibilityLabel"}
        disabled ={true}
        style={{}}
        />
).toJSON();

expect(positiveButtonScenario).toMatchSnapshot();

const negativeButtonScenario = renderer.create(
        <CoreoButton
        onPress={() => {}}
        title={""}
        color={""}
        accessibilityLabel={""}
        disabled ={false}
        style={{}}
        />
).toJSON();

expect(negativeButtonScenario).toMatchSnapshot();
})
