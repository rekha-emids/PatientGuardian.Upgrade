
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
    favouriteSp, getPatientRequests, getServiceProviders, getSortedServiceProviders,  getSkills, getGender, getPointOfServices
} from './actions'
import fetchMock from 'fetch-mock'
// import expect from 'expect' // You can use any testing library
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

    it('Favourite service provider has been done', () => {
        let resp = {}

        fetchMock.getOnce('Patient/FavouriteServiceProvider/', {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
        [{"data": 100, "type": "requestTab/isLoading"}, {"data": 400, "type": "requestTab/isLoading"}]
        const store = mockStore({})

        return store.dispatch(favouriteSp(0, true, null)).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })


    it('creates GET_PATIENT_REQUESTS when fetching has been done', () => {
        let resp = {}

        fetchMock.getOnce('ServiceRequest/ServiceRequests/1', {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
            [{
                "data": 100,
                "type": "requestTab/isLoading"
            },
            {
                "data": 400,
                "type": "requestTab/isLoading"
            }]

        const store = mockStore({})

        return store.dispatch(getPatientRequests(1)).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })


    it('creates GET_SERVICE_PROVIDERS when fetching has been done', () => {
        let resp = {}

        fetchMock.postOnce('Search/ServiceProviderDetailsByRequestId/1', {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })
        
        const expectedActions =
            [
                {
                    "data": 100,
                    "type": "requestTab/isLoading"
                },
                {
                    "data": 400,
                    "type": "requestTab/isLoading"
                }
            ]

        const store = mockStore({})

        return store.dispatch(getServiceProviders(1)).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })


    it('creates GET_Image_SUCCESS when fetching has been done', () => {
        let resp = {}

        fetchMock.getOnce('VisitProcessing/ServiceProviderList/1/default/default/1/50', {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
            [
                {"data": 100, "type": "requestTab/isLoading"}, 
                {"data": 400, "type": "requestTab/isLoading"}
            ]

        const store = mockStore({})

        return store.dispatch(getSortedServiceProviders(1, {})).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    
    it('creates GET_SKILLS when fetching has been done', () => {
        let resp = {}

        fetchMock.getOnce('ServiceProvider/Skill', {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
        [{"data": 100, "type": "requestTab/isLoading"}, {"data": [{"id": 1, "name": "Arthritis"}, {"id": 2, "name": "Bathing"}, {"id": 3, "name": "Companionship"}, {"id": 4, "name": "Continence"}, {"id": 5, "name": "Depression"}, {"id": 6, "name": "Food Prep"}, {"id": 7, "name": "General Transportation"}, {"id": 8, "name": "Hearing Disorder"}, {"id": 9, "name": "Home Health Care"}, {"id": 11, "name": "House Keeping"}, {"id": 10, "name": "Senior Care"}], "type": "get_skills"}, {"data": 200, "type": "requestTab/isLoading"}]

        const store = mockStore({})

        return store.dispatch(getSkills()).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates GET_GENDER when fetching has been done', () => {
        let resp = {}

        fetchMock.getOnce('ServiceProviderLookUp/gender', {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions =
      [{"data": 100, "type": "requestTab/isLoading"}, {"data": [{"id": 6, "name": "Male"}, {"id": 7, "name": "Female"}, {"id": 8, "name": "Others"}], "type": "get_gender"}, {"data": 200, "type": "requestTab/isLoading"}]

        const store = mockStore({})

        return store.dispatch(getGender()).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates Get_POINT_OF_SERVICE when fetching has been done', () => {
        let resp = {}

        fetchMock.getOnce('VisitProcessing/PatientAddress/', {
            body: resp,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = []

        const store = mockStore({})

        return store.dispatch(getPointOfServices()).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

})