
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
    onLogin, checkUserData, loginSuccess, clearData, onBackWelcomeScreen, onForgotPassordLinkClick, saveUserData, onLoginSuccess, compareCredentialsLocalDb
} from './actions'
import fetchMock from 'fetch-mock'
// import expect from 'expect' // You can use any testing library
import { API } from '../../../services/api';
import { defaultState } from './reducer';
import {userState} from './mockData'
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

    it('creates ONLOGIN_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.getOnce(API.Login, {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
            [{ "type": "loading_start/loading" }, { "data": "Invalid Login Email or Password. Please try again.", "type": "fetch_failed/login" }, { "type": "loading_end/loading" }]

        const store = mockStore(defaultState)

        return store.dispatch(onLogin({})).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('checks checkUserData actions', () => {
        const store = mockStore({authState: userState[3]})

        return store.dispatch(checkUserData())

    })

    it('checks checkUserData actions', () => {
        const store = mockStore({authState: userState[3]})
        let userTypedCredential = {
            username: 'lori.whitfoot@mailinator.com',
            password: 'Emids@500'
        }

        return compareCredentialsLocalDb(userTypedCredential)

    })

    it('checks clearData actions', () => {
        const store = mockStore({authState: userState[3]})

         store.dispatch(clearData())

    })

    it('checks onBackWelcomeScreen actions', () => {
        const store = mockStore({authState: userState[3]})

         store.dispatch(onBackWelcomeScreen())

    })

    it('checks onForgotPassordLinkClick actions', () => {
        const store = mockStore({authState: userState[3]})

         store.dispatch(onForgotPassordLinkClick())

    })

    it('checks loginSuccess actions', () => {
        const store = mockStore({authState: userState[3]})

         store.dispatch(loginSuccess({}))

    })

    it('checks saveUserData actions', () => {
        const store = mockStore({authState: userState[3]})
        let data = {userData: {}}

         store.dispatch(saveUserData(data))

    })

    it('checks onLoginSuccess actions', () => {
        const store = mockStore({authState: userState[3]})
        let data = {userData: {}}
        let response = {data: {}}
        let credentails = {
            username: 'lori.whitfoot@mailinator.com',
            password: 'Emids@500'
        }

         store.dispatch(onLoginSuccess(data, response, credentails))

    })

    it('calls onLoginSuccess when updating has been done', () => {
        let data =  { 
        username: 'lori.whitfoot@mailinator.com',
        password: 'Emids@500',
        defaultErrorMsg: 'Please enter valid username and password',
        usernameError: null,
        passwordError: null 
    }

        fetchMock.putOnce('https://PFTest-oauth-api.coreoflowsandbox.com/connect/token', {
            body: data,
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjA2RDNFNDZFOTEwNzNDNUQ0QkMyQzk5ODNCRTlGRjQ0OENGNjQwRDQiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJCdFBrYnBFSFBGMUx3c21ZTy1uX1JJejJRTlEifQ.eyJuYmYiOjE1NjA0MDQ4MDUsImV4cCI6MTU2Mjk5NjgwNSwiaXNzIjoiaHR0cHM6Ly9wZnRlc3Qtb2F1dGgtYXBpLmNvcmVvZmxvd3NhbmRib3guY29tIiwiYXVkIjpbImh0dHBzOi8vcGZ0ZXN0LW9hdXRoLWFwaS5jb3Jlb2Zsb3dzYW5kYm94LmNvbS9yZXNvdXJjZXMiLCJhcGkxIl0sImNsaWVudF9pZCI6IlBhdGllbnRHdWFyZGlhbiIsInN1YiI6IkxvcmkuV2hpdGZvb3RAbWFpbGluYXRvci5jb20iLCJhdXRoX3RpbWUiOjE1NjA0MDQ4MDQsImlkcCI6ImxvY2FsIiwidXNlcm5hbWUiOiJMb3JpLldoaXRmb290QG1haWxpbmF0b3IuY29tIiwiZW1haWwiOiJMb3JpLldoaXRmb290QG1haWxpbmF0b3IuY29tIiwidXNlcmlkIjoiMTE4IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIklzRXVsYVVwZGF0ZWQiOiJUcnVlIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsImFwaTEiXSwiYW1yIjpbInB3ZCJdfQ.YNG4qO5UDnlGOCpKslrSJIoRBsvbA9p_SNyZ2gWhclTa0FAVc9un15W5QgmTVWwx3jOOuOfpPml3KmtzxtCifW96vT2FBc46iL1yzNEudUxEoKErMN_jwICpoq8-Mg63lf2QcdTpL3bIHfejDvacecZb_KxBcX852Am3JFzu31C90TnQZkut1HxffMEni-C0zA4umlmSrE6A2OMOJf4nNiCBsKBbQRr1TOsUlFzHVSp4vj8qD4OURVAWCQLzYqBT7-0nIVRlNcrPTqTGpaO7ypE0z2JCigGyOEUqyqBDTp8tWtE5nYPgAW1rQl0fGto85MOZP4fkZUEgGoNfQiDelg'
            }
        })

        const expectedActions =
            [{"type": "loading_start/loading"}, {"data": "Invalid Login Email or Password. Please try again.", "type": "fetch_failed/login"}, {"type": "loading_end/loading"}]

        store = mockStore({})


        return store.dispatch(onLogin(data)).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('check onLogin fn', () => {  
        const store = mockStore({
            userData: {user: {}},
            loading: false,
            error: {
                message: '',
                code: ''
            }
        })

        let data =  { 
            username: 'lori.whitfoot@mailinator.com',
            password: 'Emids@500',
            defaultErrorMsg: 'Please enter valid username and password',
            usernameError: null,
            passwordError: null 
        }

        return store.dispatch(onLogin(data))
      })


})