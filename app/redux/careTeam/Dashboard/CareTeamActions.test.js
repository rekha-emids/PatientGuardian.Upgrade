
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
    getVisitDashboardDetail, getServiceRequestDetails, getInTotalDashboardDetail,
    getImage, getSPImage, approveOrDeclineServiceRequest, getServiceRequestDashboardDetail,
    getServiceVisitDashboardDetail, getServiceProviderDashboardDetail, getFeedbackAlerts, getIndividualCount,
    getServiceProviderCount, getServiceRequestCount, getServiceVisitCount, getCohort, getContract,
     getDiagnosisCode, postDiagnosisCode, postAuthNo
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


describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('creates GET_SERVICE_REQUEST_DETAILS_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.getOnce('ServiceRequest/ServiceRequestDetails/1001', {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
            [{
                "data": 100,
                "type": "careTeam/dashboard/isLoading"
            },
            {
                "data": 400,
                "type": "careTeam/dashboard/isLoading"
            }]

        const store = mockStore(defaultState)

        return store.dispatch(getServiceRequestDetails("1001")).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })


    it('creates GET_IN_TOTAL_DASHBOARD_DETAILS_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.postOnce('ServiceRequest/ServiceRequestDetails/', {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
            [{
                "data": undefined,
                "type": "careTeam/dashboard/isLoading"
            },
            {
                "data": 400,
                "type": "careTeam/dashboard/isLoading"
            }]

        const store = mockStore(defaultState)

        return store.dispatch(getInTotalDashboardDetail({}, {})).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })


    it('creates GET_Visit_DASHBOARD_DETAILS_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.postOnce('CareTeam/Individual/VisitList', {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
            [
                {
                    "data": 100,
                    "type": "careTeam/dashboard/isLoading"
                },
                {
                    "data": 400,
                    "type": "careTeam/dashboard/isLoading"
                }
            ]

        const store = mockStore(defaultState)

        return store.dispatch(getVisitDashboardDetail({})).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })


    it('creates GET_Image_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.getOnce('Patient/Image/', {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
            [
                {"data": 100, "type": "careTeam/dashboard/isLoading"}, 
                {"data": 400, "type": "careTeam/dashboard/isLoading"}
            ]

        const store = mockStore(defaultState)

        return store.dispatch(getImage('id')).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates GET_SP_Image_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.getOnce('ServiceProvider/Image/', {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
            [
                {"data": 100, "type": "careTeam/dashboard/isLoading"}, 
                {"data": 400, "type": "careTeam/dashboard/isLoading"}
            ]

        const store = mockStore(defaultState)

        return store.dispatch(getSPImage('id')).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates approveOrDeclineServiceRequest_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.getOnce('CareTeam/ServiceRequest/Approve/', {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
            [
                {"data": 100, "type": "careTeam/dashboard/isLoading"}, 
                {"data": 400, "type": "careTeam/dashboard/isLoading"}
            ]

        const store = mockStore(defaultState)

        return store.dispatch(approveOrDeclineServiceRequest('10', '10', {})).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates getServiceRequestDashboardDetail_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.getOnce('CareTeam/ServiceRequest/List', {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
            [
                {"data": undefined, "type": "careTeam/dashboard/isLoading"}, 
                {"data": {}, "type": "careteam/dashboard/setSelected_SR_DashboardDetail"}, 
                {"data": 400, "type": "careTeam/dashboard/isLoading"}
            ]

        const store = mockStore(defaultState)

        return store.dispatch(getServiceRequestDashboardDetail({}, {})).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates getServiceVisitDashboardDetail_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.getOnce('CareTeam/ServiceVisit/List', {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
            [
                {"data": undefined, "type": "careTeam/dashboard/isLoading"}, 
                {"data": 400, "type": "careTeam/dashboard/isLoading"}
            ]

        const store = mockStore(defaultState)

        return store.dispatch(getServiceVisitDashboardDetail({}, {})).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates getServiceProviderDashboardDetail_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.getOnce('CareTeam/ServiceProvider/List', {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
            [
                {"data": undefined, "type": "careTeam/dashboard/isLoading"}, 
                {"data": 400, "type": "careTeam/dashboard/isLoading"}  
            ]

        const store = mockStore(defaultState)

        return store.dispatch(getServiceProviderDashboardDetail({}, {})).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates getFeedbackAlerts_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.getOnce('CareTeam/ServiceProvider/FeedbackVisit/', {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
            [
                {"data": undefined, "type": "careTeam/dashboard/isLoading"},
                {"data": 400, "type": "careTeam/dashboard/isLoading"}
            ]

        const store = mockStore(defaultState)

        return store.dispatch(getFeedbackAlerts('id', 'userType', {}, 'requestType')).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates getIndividualCount_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.getOnce('CareTeam/Individual/Count', {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
            [
                {"data": 100, "type": "careTeam/dashboard/isLoading"}, 
                {"data": 400, "type": "careTeam/dashboard/isLoading"}
            ]

        const store = mockStore(defaultState)

        return store.dispatch(getIndividualCount({})).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates getServiceProviderCount_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.getOnce('CareTeam/ServiceProvider/Count', {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
            [
                {"data": 100, "type": "careTeam/dashboard/isLoading"}, 
                {"data": 400, "type": "careTeam/dashboard/isLoading"}
            ]

        const store = mockStore(defaultState)

        return store.dispatch(getServiceProviderCount({})).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates getServiceRequestCount_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.getOnce('CareTeam/ServiceRequest/Count', {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
            [
                {"data": 100, "type": "careTeam/dashboard/isLoading"}, 
                {"data": 400, "type": "careTeam/dashboard/isLoading"}
            ]

        const store = mockStore(defaultState)

        return store.dispatch(getServiceRequestCount({})).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })


    it('creates getServiceVisitCount_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.postOnce('CareTeam/ServiceVisit/Count', {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
            [
                {"data": 100, "type": "careTeam/dashboard/isLoading"}, 
                {"data": 400, "type": "careTeam/dashboard/isLoading"}
            ]

        const store = mockStore(defaultState)

        return store.dispatch(getServiceVisitCount({})).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    
    it('creates getCohort_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.getOnce(API.getCohorts, {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
            [
                {"data": 100, "type": "careTeam/dashboard/isLoading"}, 
                {"data": 400, "type": "careTeam/dashboard/isLoading"}
            ]

        const store = mockStore(defaultState)

        return store.dispatch(getCohort('1', '10')).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates getContract_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.getOnce(API.getContracts, {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
            [
                {"data": 100, "type": "careTeam/dashboard/isLoading"}, 
                {"data": 400, "type": "careTeam/dashboard/isLoading"}
            ]

        const store = mockStore(defaultState)

        return store.dispatch(getContract()).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates getDiagnosisCode_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.getOnce(API.getDiagnosisCode, {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
            [
                {"data": 100, "type": "careTeam/dashboard/isLoading"}, 
                {"data": 400, "type": "careTeam/dashboard/isLoading"} 
            ]

        const store = mockStore(defaultState)

        return store.dispatch(getDiagnosisCode('abc')).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates postDiagnosisCode_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.postOnce(API.postDiagnosisCode, {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
            [
                {"data": 100, "type": "careTeam/dashboard/isLoading"}, 
                {"data": 400, "type": "careTeam/dashboard/isLoading"} 
            ]

        const store = mockStore(defaultState)

        return store.dispatch(postDiagnosisCode('abc', {})).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates postAuthNo_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.postOnce(API.postAuthNo, {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
            [
                {"type": "loading_start/loading"}, {"type": "loading_end/loading"}
            ]

        const store = mockStore(defaultState)

        return store.dispatch(postAuthNo({})).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

})