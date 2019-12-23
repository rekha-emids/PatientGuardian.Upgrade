import * as actions from './actions'
import fetchMock from 'fetch-mock'
import expect from 'expect' 
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))

   jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

   jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

   jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

     jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))

     jest.mock('../../../routes', () => ({routes: 'mockRoutes'}))

describe('actions', () => {
    it('should create an action to getQuestionsListSuccess', () => {
        expect(actions.getQuestionsListSuccess()).toBeDefined()
      })
      it('should create an action to clearAssessmentState', () => {
        expect(actions.clearAssessmentState()).toBeDefined()
      })

})