import reducer, { defaultState } from './reducer'
jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))

jest.mock('@ptomasroos/react-native-multi-slider', () => ({reactNativeMultiSlider: 'mockRNMultiSlider'}))

  jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))

  jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))
  
  jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))
  
  jest.mock('react-navigation', () => ({ReactNavigation: 'ReactNavigation'}))

  jest.mock('react-navigation-redux-helpers', () => ({init: 'ReactNavigationReduxHelpers'}))
  jest.mock('../../../routes', () => ({routes: 'mockRoutes'}))
  jest.mock('../../../redux/store', () => ({Store: 'mockStore'}))

describe('aboutUs reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(defaultState)
    })

    it('should handle getAboutUsContentSuccess/AboutUs', () => {
        expect(
            reducer([], {
                type: 'careteam/dashboard/setSelectedCount',
                data: 1
            })
        ).toEqual(
            {selectedCount: 1}
        ) 

    })
    it('should handle getAboutUsContentSuccess/AboutUs', () => {
        expect(
            reducer([], {
                type: 'careteam/dashboard/setSelected_SR_DashboardDetail',
                data: {}
            })
        ).toEqual(
            {setSelectedDashboardDetail: {}}
        ) 
    })
    it('should handle getAboutUsContentSuccess/AboutUs', () => {
        expect(
            reducer([], {
                type: 'careteam/dashboard/getDashboardDetail',
                data: {}
            })
        ).toEqual(
            {dashboardDetail: {}}
        ) 
    })
    it('should handle getAboutUsContentSuccess/AboutUs', () => {
        expect(
            reducer([], {
                type: 'careteam/dashboard/setItemDetail',
                data: {}
            })
        ).toEqual(
            {itemDetail: {}}
        ) 
    })
    it('should handle getAboutUsContentSuccess/AboutUs', () => {
        expect(
            reducer([], {
                type: 'careteam/dashboard/getServiceProviderCount',
                data: 0,
                requestObject: {}
            })
        ).toEqual(
            {
                serviceProviderCount: 0,
                serviceProviderCountRequestObject: {}
            }
        ) 
    })
    it('should handle getAboutUsContentSuccess/AboutUs', () => {
        expect(
            reducer([], {
                type: 'careteam/dashboard/setSelectedServiceProviderCount',
                data: 1
            })
        ).toEqual(
            {selectedServiceProviderCount: 1}
        ) 
    })
    it('should handle getAboutUsContentSuccess/AboutUs', () => {
        expect(
            reducer([], {
                type: 'careteam/dashboard/getServiceVisitCount',
                data: 1,
                requestObject: {}
            })
        ).toEqual(
            {
                serviceVisitCount: 1,
                serviceVisitsCountRequestObject: {}
            }
        ) 
    })
    it('should handle getAboutUsContentSuccess/AboutUs', () => {
        expect(
            reducer([], {
                type: 'careteam/dashboard/getServiceRequestDashboardDetail',
                data: {}
            })
        ).toEqual(
            {serviceRequestDashboardDetail: {}}
        ) 
    })
    it('should handle getAboutUsContentSuccess/AboutUs', () => {
        expect(
            reducer([], {
                type: 'careteam/dashboard/getServiceVisitDashboardDetail',
                data: {}
            })
        ).toEqual(
            {serviceVisitDashboardDetail: {}}
        ) 
    })
    it('should handle getAboutUsContentSuccess/AboutUs', () => {
        expect(
            reducer([], {
                type: 'careteam/dashboard/getServiceProviderDashboardDetail',
                data: {}
            })
        ).toEqual(
            {serviceProviderDashboardDetail: {}}
        ) 
    })
    it('should handle careteam/dashboard/getContractSuccess', () => {
        expect(
            reducer([], {
                type: 'careteam/dashboard/getContractSuccess',
                data: []
            })
        ).toEqual(
            {contracts: []}
        ) 
    })
    it('should handle careteam/dashboard/getCohortsSuccess', () => {
        expect(
            reducer([], {
                type: 'careteam/dashboard/getCohortsSuccess',
                data: []
            })
        ).toEqual(
            {cohorts: []}
        ) 
    })
    it('should handle careteam/dashboard/getCareTeamClinicalConditions', () => {
        expect(
            reducer([], {
                type: 'careteam/dashboard/getCareTeamClinicalConditions',
                data: []
            })
        ).toEqual(
            {clinicalConditions: []}
        ) 
    })
    it('should handle careteam/dashboard/getServiceRequestDetailsSuccess', () => {
        expect(
            reducer([], {
                type: 'careteam/dashboard/getServiceRequestDetailsSuccess',
                data: {}
            })
        ).toEqual(
            {serviceRequestDetails: {}}
        ) 
    })
})