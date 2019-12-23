
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
// import expect from 'expect' // You can use any testing library
import { API } from '../../../services/api';
import { logoutStart, logoutEnd, logoutFail, logoutSuccess, clearData, onLogout, onTimeout, sendToken } from './actions';
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

    it('checks logoutEnd actions', () => {
        const store = mockStore({})

         store.dispatch(logoutEnd())

    })

    it('checks logoutStart actions', () => {
        const store = mockStore({})

         store.dispatch(logoutStart())

    })

    it('checks logoutFail actions', () => {
        const store = mockStore({})

         store.dispatch(logoutFail())

    })

    it('checks logoutSuccess actions', () => {
        const store = mockStore({})

         store.dispatch(logoutSuccess({}))

    })

    it('checks clearData actions', () => {
        const store = mockStore({})

         store.dispatch(clearData())

    })

    it('checks onLogout actions', () => {
        const store = mockStore({})

         store.dispatch(onLogout())

    })

    it('checks onTimeout actions', () => {
        const store = mockStore({})

         store.dispatch(onTimeout())

    })

    it('creates sendToken when fetching has been done', () => {
        let resp = {}

        fetchMock.putOnce(API.sendDeviceToken, {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
        [{"data": {}, "type": "updateToken/login"}, {"type": "loading_start/loading"}, {"type": "loading_end/loading"}]

        const store = mockStore({})

        return store.dispatch(sendToken({})).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })
})