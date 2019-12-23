
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
// import expect from 'expect' // You can use any testing library
import {setNavigateToLogin} from './action'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))

jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('@ptomasroos/react-native-multi-slider', () => ({rnmultislider: 'mockRNmultislider'}))

jest.mock('../../../utils/signalrUtility', () => ({signalrUtility: 'mocksignalrUtility'}))

jest.mock('react-native-device-info', () => ({getUniqueID: () => 4}))

jest.mock('../../../routes', () => ({
    routes: 'mockRoutes',
    PATH: {
        WELCOME_SCREEN: 'WelcomeScreen',
        FORGET_PASSWORD_SCREEN: 'ForgetPasswordScreen'
    }
}))

jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))
function FormDataMock() {
    this.append = jest.fn()
}
global.FormData = FormDataMock

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('checks setNavigateToLogin actions', () => {
        const store = mockStore({})

         store.dispatch(setNavigateToLogin())

    })
})