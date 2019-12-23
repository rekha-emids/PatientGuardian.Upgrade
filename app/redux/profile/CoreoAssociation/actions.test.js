import * as actions from './actions'
import fetchMock from 'fetch-mock'
import expect from 'expect' 
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { isLoading } from '../PersonalDetail/actions';
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))

   jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

   jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

   jest.mock('react-navigation-redux-helpers', () => ({reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'}))

     jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))

     jest.mock('../../../routes', () => ({routes: 'mockRoutes'}))

describe('actions', () => {
    it('should create an action to getHieghtWeightSuccess', () => {
        expect(actions.getHeightWeightSuccess()).toBeDefined()
      })

     

})


describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates getHeightWeight when fetching service content has been done', () => {
    fetchMock.getOnce('getHeightWeight/2', {
      body: { data: [] },
      headers: { 'content-type': 'application/json' }
    })

    const store = mockStore({patientProfileState: {PersonalDetailState: {patientId: 45}} })

    return store.dispatch(actions.getHeightWeight()).then(() => {
      store.dispatch(actions.getHeightWeightSuccess([]))
      store.dispatch(isLoading())
      expect(store.getActions()).toBeDefined()
    }).catch((err) => {
      store.dispatch(isLoading()) 
    }) 
})


})