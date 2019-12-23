
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
// import expect from 'expect' // You can use any testing library
import { API } from '../../../services/api';
import { formDirty, resetPasswordSuccess, resetPasswordError, getEmailIdSuccess, getEmailIdError, resetPassword, getEmailId } from './actions'
import { userState } from './mockedData'
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

        store.dispatch(formDirty())
    })

    it('checks resetPasswordSuccess actions', () => {
        const store = mockStore({})

        store.dispatch(resetPasswordSuccess({}))
    })

    it('checks resetPasswordError actions', () => {
        const store = mockStore({})

        store.dispatch(resetPasswordError({}))
    })


    it('checks getEmailIdSuccess actions', () => {
        const store = mockStore({})

        store.dispatch(getEmailIdSuccess({}))
    })

    it('checks getEmailIdError actions', () => {
        const store = mockStore({})

        store.dispatch(getEmailIdError({}))
    })

    it('checks getEmailIdError actions', () => {
        let resp = {}

        fetchMock.putOnce(API.ResetPassword, {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })
        const expectedActions =
            [{ "data": {}, "type": "updateToken/login" }, { "type": "loading_start/loading" }, { "type": "loading_end/loading" }]

        const store = mockStore({
            loadingState: {isLoading: false},
            authState: {resetPasswordState: userState[3].loginState.resetPasswordState},
            networkReducer: {network: true}
        })

        return store.dispatch(resetPassword({})).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('checks getEmailIdError actions', () => {
        let resp = {}

        fetchMock.putOnce(API.ResetPassword, {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })
        const expectedActions =
        []

        const store = mockStore({
            loadingState: {isLoading: false},
            authState: {resetPasswordState: userState[3].loginState.resetPasswordState},
            networkReducer: {network: true}
        })

        return store.dispatch(getEmailId()).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })



})