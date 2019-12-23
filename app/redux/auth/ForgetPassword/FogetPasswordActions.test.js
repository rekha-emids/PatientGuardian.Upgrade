
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
    sendResetPasswordLink, clearErrorFlag, ForgetPassword, clearData, sendResetPasswordLinkError,
    sendResetPasswordLinkSuccess,
    backToForgotPassword
} from './actions'
import fetchMock from 'fetch-mock'
// import expect from 'expect' // You can use any testing library
import { API } from '../../../services/api';
import { defaultState } from './reducer';
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))

jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('@ptomasroos/react-native-multi-slider', () => ({rnmultislider: 'mockRNmultislider'}))

jest.mock('../../../utils/signalrUtility', () => ({signalrUtility: 'mocksignalrUtility'}))

jest.mock('../../../routes', () => ({
    routes: 'mockRoutes',
    PATH: {FORGET_PASSWORD_SCREEN: 'forgetPasswordScreen'}
}))

jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))
  


describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('creates sendResetPasswordLink_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.getOnce(API.SendResetPasswordLink, {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
        [{"type": "loading_start/loading"}, {"type": "send_verification_link_error/forgetPassword"}, {"type": "loading_end/loading"}]

        const store = mockStore(defaultState)

        return store.dispatch(sendResetPasswordLink({emailId: 'abc@gmail.com'})).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates clear_error_flag_SUCCESS when fetching has been done', () => {
        const expectedAction = {type: ForgetPassword.clearErrorFlag}

        expect(clearErrorFlag()).toEqual(expectedAction)
    })

    it('creates clear_Data_SUCCESS when fetching has been done', () => {
        const expectedAction = {type: ForgetPassword.clearData}

        expect(clearData()).toEqual(expectedAction)
    })

    it('creates sendResetPasswordLinkError when fetching has been done', () => {
        const expectedAction = {type: ForgetPassword.sendResetPasswordLinkError}

        expect(sendResetPasswordLinkError()).toEqual(expectedAction)
    })

    it('creates sendResetPasswordLinkSuccess when fetching has been done', () => {
        const expectedAction = {"data": {}, "emailId": "emailid@gmail.com", "type": "send_verification_link_success/forgetPassword"}

        expect(sendResetPasswordLinkSuccess({}, 'emailid@gmail.com')).toEqual(expectedAction)
    })

    it('calls backToForgotPassword', () => {
        let store = mockStore({})

        store.dispatch(backToForgotPassword());
    })

})