
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
// import expect from 'expect' // You can use any testing library
import { impersinated, clearImpersination, setUserRoles, setCompleteUserData, getIndividualSuccess, getPatientDetailsSuccess, getPatientImageSuccess, setUserData, setAutoLogout, clearData, setSelectedPatient, setGuardianUserImage, setPatientUserImage, onSetPatientUserImage, onSetSelectedPatient, onSetGuardianUserImage, clearUserData, saveUserData, checkUserData } from './actions';
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

        store.dispatch(impersinated())
    })

    it('checks clearImpersination actions', () => {
        const store = mockStore({})

        store.dispatch(clearImpersination())
    })

    it('checks setUserRoles actions', () => {
        const store = mockStore({})

        store.dispatch(setUserRoles())
    })

    it('checks setCompleteUserData actions', () => {
        const store = mockStore({})

        store.dispatch(setCompleteUserData())
    })

    it('checks getIndividualSuccess actions', () => {
        const store = mockStore({})

        store.dispatch(getIndividualSuccess())
    })

    it('checks getPatientDetailsSuccess actions', () => {
        const store = mockStore({})

        store.dispatch(getPatientDetailsSuccess())
    })

    it('checks getPatientImageSuccess actions', () => {
        const store = mockStore({})

        store.dispatch(getPatientImageSuccess())
    })

    it('checks setUserData actions', () => {
        const store = mockStore({})

        store.dispatch(setUserData())
    })

    it('checks setAutoLogout actions', () => {
        const store = mockStore({})

        store.dispatch(setAutoLogout())
    })

    it('checks clearData actions', () => {
        const store = mockStore({})

        store.dispatch(clearData())
    })

    it('checks setSelectedPatient actions', () => {
        const store = mockStore({})

        store.dispatch(setSelectedPatient())
    })
    it('checks setGuardianUserImage actions', () => {
        const store = mockStore({})

        store.dispatch(setGuardianUserImage())
    })
    it('checks setPatientUserImage actions', () => {
        const store = mockStore({})

        store.dispatch(setPatientUserImage())
    })

    it('checks setPatientUserImage actions', () => {
        const store = mockStore({})

        store.dispatch(onSetPatientUserImage())
    })

    it('checks onSetSelectedPatient actions', () => {
        const store = mockStore({})

        store.dispatch(onSetSelectedPatient())
    })

    it('checks onSetGuardianUserImage actions', () => {
        const store = mockStore({})

        store.dispatch(onSetGuardianUserImage({}))
    })

    it('checks clearUserData actions', () => {
        const store = mockStore({})

        store.dispatch(clearUserData({}))
    })

    it('checks saveUserData actions', () => {
        const store = mockStore({})

        store.dispatch(saveUserData({}))
    })

    it('checks checkUserData actions', () => {
        const store = mockStore({})

        store.dispatch(checkUserData({}))
    })

    
    
})