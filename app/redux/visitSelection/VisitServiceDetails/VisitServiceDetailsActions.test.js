
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {cancelServiceRequest, cancelHiredServiceRequest, getVisitServiceDetails, getVisitServiceSchedule} from './actions'
import fetchMock from 'fetch-mock'
import * as actions from './actions';
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


describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('should create an action to dummy', () => { 
        const data = {}
        const expectedAction = {
            type: 'setSPDetails/visitServiceDetails',
            data
        }      

        expect(actions.setSPDetails(data)).toEqual(expectedAction)
    })
    it('should create an action to firstAndLastVisitDatesSuccess', () => { 
        const data = {}
        const expectedAction = {
            type: 'firstAndLastVisitDatesSuccess/visitServiceDetails',
            data
        }      

        expect(actions.firstAndLastVisitDatesSuccess(data)).toEqual(expectedAction)
    })
    it('should create an action to resetVisitServiceDetails', () => { 
        const data = {}
        const expectedAction = {type: 'resetVisitServiceDetails/visitservicedetails'}      

        expect(actions.resetVisitServiceDetails(data)).toEqual(expectedAction)
    })
    it('should create an action to getVisitServiceDetailsSuccess', () => { 
        const data = {}
        const expectedAction = {
            type: 'get_visit_service_details_success/visitservicedetails',
            data
        }      

        expect(actions.getVisitServiceDetailsSuccess(data)).toEqual(expectedAction)
    })
    it('should create an action to getVisitServiceScheduleSuccess', () => { 
        const data = {}
        const expectedAction = {
            type: 'get_visit_service_schedule_success/visitservicedetails',
            data
        }      

        expect(actions.getVisitServiceScheduleSuccess(data)).toEqual(expectedAction)
    })


    
    it('creates cancelServiceRequest_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.getOnce(API.cancelHiredServiceRequest, {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =  [{"data": {"key": "cancelServiceRequestStatus", "value": 100}, "type": "changeAPIStatus/VisitServiceDetails"}, {"data": {"key": "cancelServiceRequestStatus", "value": 400}, "type": "changeAPIStatus/VisitServiceDetails"}, {"type": "loading_end/loading"}]
        const store = mockStore(defaultState)

        return store.dispatch(cancelServiceRequest()).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates cancelHiredServiceRequest_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.getOnce(API.cancelHiredServiceRequest, {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =  [{"type": "loading_end/loading"}]

        const store = mockStore(defaultState)

        return store.dispatch(cancelHiredServiceRequest()).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates getVisitServiceDetails_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.getOnce(API.getServiceRequestDetails, {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =  [{"data": {"key": "getServiceDetailsStatus", "value": 100}, "type": "changeAPIStatus/VisitServiceDetails"}, {"type": "loading_end/loading"}, {"data": 400, "type": "changeAPIStatus/VisitServiceDetails"}, {"data": {"key": "getServiceDetailsStatus", "value": 400}, "type": "changeAPIStatus/VisitServiceDetails"}]
        const store = mockStore(defaultState)

        return store.dispatch(getVisitServiceDetails({})).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    
    it('creates getVisitServiceSchedule_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.getOnce(API.getServiceRequestSchedule, {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =  [{"data": {"key": "getServiceScheduleStatus", "value": 100}, "type": "changeAPIStatus/VisitServiceDetails"}, {"type": "loading_end/loading"}, {"data": {"key": "getServiceScheduleStatus", "value": 400}, "type": "changeAPIStatus/VisitServiceDetails"}]
        const store = mockStore(defaultState)

        return store.dispatch(getVisitServiceSchedule({})).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

})