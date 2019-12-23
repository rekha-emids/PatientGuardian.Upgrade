import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {onRemoveParticipant, onFetchConversationSummary, onFetchConversationSummaryPaging, onFetchConversationSummaryImpersonate, getUnreadMessageCounts, getLinkedParticipantsByPatients, getLinkedPatients, onFetchConversation, onFetchConversationImpersonate, updateReadStatus, onSaveTitle, onCreateNewConversation, onSendNewMessage, leaveConversation, onAddParticipant, getConversationImageWithImageId, updateReadStatusSignalR, getCareTeamIndividualsList, getDashboardMessageCount, getMessageFallBackInterval, getConversationCount, AsyncMessageActions, msgCallbackInterval, setContext, isLoading, isNavigationLoading, setSelectedConversationId} from './actions'
import fetchMock from 'fetch-mock'
// import expect from 'expect' // You can use any testing library
import { getCareTeamId } from '../../utils/userUtil';
import moment from 'moment';
const middlewares = [thunk],
 mockStore = configureMockStore(middlewares)

jest.mock('jsencrypt', () => ({encryptPassword: 'mockJSEncrypt'}))

jest.mock('react-native-background-task', () => ({rnbt: 'mockRNBackgroundTask'}))


jest.mock('react-native-firebase', () => ({rnfb: 'mockRNFirebase'}))

jest.mock('rn-fetch-blob', () => ({reactNativeFetchBlob: 'mockRNFetchBlob'}))

jest.mock('@ptomasroos/react-native-multi-slider', () => ({rnmultislider: 'mockRNmultislider'}))

jest.mock('../../utils/signalrUtility', () => ({signalrUtility: 'mocksignalrUtility'}))

jest.mock('../store', () => ({rootReducer: 'mockrootReducer'}))


describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates ASYNC_MESSAGE_SUCCESS when updating has been done', () => {
      let resp = {}

    fetchMock.putOnce('conversation/participant/remove', {
        body: resp,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = 
      [
{
        "data": 100,
        "type": "asyncMessage/isLoading"
        },
         {
          "data": 400,
        "type": "asyncMessage/isLoading"
        }
],
    
     store = mockStore({})

    return store.dispatch(onRemoveParticipant("1001")).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchObject(expectedActions)
    })
  })
})



describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates ASYNC_MESSAGE_SUCCESS when updating has been done', () => {
      let resp = {}

    fetchMock.putOnce('conversation/participant/remove', {
        body: resp,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = 
      [
{
        "data": 100,
        "type": "asyncMessage/isLoading"
        },
         {
          "data": 400,
        "type": "asyncMessage/isLoading"
        }
],
    
     store = mockStore({})

    return store.dispatch(onFetchConversationSummary()).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchObject(expectedActions)
    })
  })
})

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates ASYNC_MESSAGE_SUCCESS when updating has been done', () => {
      let resp = {}

    fetchMock.getOnce('conversation/user/100/1/15', {
        body: resp,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = 
      [
{
        "data": 100,
        "type": "asyncMessage/isLoading"
        },
         {
          "data": 400,
        "type": "asyncMessage/isLoading"
        }
],
    
     store = mockStore({})
    let data = 1001,
    updateNetworkOnResponse = () => {
        __DEV__ && console.log("mocked network state upate")
    }

    return store.dispatch(onFetchConversationSummaryPaging(data, updateNetworkOnResponse)).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchObject(expectedActions)
    })
  })
})


describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('gets CONVERSATION_SUMMARY_IMPERSONATE when updating has been done', () => {
      let resp = {}

    fetchMock.getOnce('Conversation/CareTeam/100/1/1/15', {
        body: resp,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = 
      [
{
        "data": 100,
        "type": "asyncMessage/isLoading"
        },
         {
          "data": 400,
        "type": "asyncMessage/isLoading"
        }
],
         store = mockStore({})

    return store.dispatch(onFetchConversationSummaryImpersonate()).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchObject(expectedActions)
    })
  })
})

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('gets CONVERSATION_SUMMARY_IMPERSONATE when updating has been done', () => {
      let resp = {}

    fetchMock.getOnce('Conversation/Unread/User/100/I', {
        body: resp,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = 
      [
{
        "data": 100,
        "type": "asyncMessage/isLoading"
        },
         {
          "data": 400,
        "type": "asyncMessage/isLoading"
        }
],
         store = mockStore({})

    return store.dispatch(getUnreadMessageCounts(false)).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchObject(expectedActions)
    })
  })
})

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('gets LINKED_PARTICIPANTS_LIST_BY_PATIENT when updating has been done', () => {
      let resp = {}

    fetchMock.getOnce('conversation/ParticipantByContext/1495/120/1023/I/null', {
        body: resp,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = 
      [
{
        "data": 100,
        "type": "asyncMessage/isLoading"
        },
         {
          "data": 400,
        "type": "asyncMessage/isLoading"
        }
],
         store = mockStore({})
        let data = {
          searchText: "",
          conversationId: 1495,
          patientId: 1023,
          userType: 'I'
        }

    return store.dispatch(getLinkedParticipantsByPatients(data)).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchObject(expectedActions)
    })
  })
})

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('gets LINKED_PARTICIPANTS_LIST when updating has been done', () => {
      let resp = {}

    fetchMock.getOnce('conversation/context/120', {
        body: resp,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = 
      [
{
        "data": 100,
        "type": "asyncMessage/isLoading"
        },
         {
          "data": 400,
        "type": "asyncMessage/isLoading"
        }
],
         store = mockStore({})

    return store.dispatch(getLinkedPatients()).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchObject(expectedActions)
    })
  })
})

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('gets FETCH_CONVERSATION when updating has been done', () => {
      let resp = {}

    fetchMock.getOnce('conversation/1495/120/I/false/null', {
        body: resp,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = 
      [
{
        "data": 100,
        "type": "asyncMessage/isLoading"
        },
         {
          "data": 400,
        "type": "asyncMessage/isLoading"
        }
],
         store = mockStore({})

    return store.dispatch(onFetchConversation(1495, false)).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchObject(expectedActions)
    })
  })
})

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('gets FETCH_CONVERSATION_IMPERSONATE when updating has been done', () => {
      let resp = {}

    fetchMock.getOnce('Conversation/CareTeam/ConversationMessage/1495/120/100/1/10', {
        body: resp,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = 
      [
{
        "data": 100,
        "type": "asyncMessage/isLoading"
        },
         {
          "data": 400,
        "type": "asyncMessage/isLoading"
        }
],
         store = mockStore({})

    return store.dispatch(onFetchConversationImpersonate(1495)).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchObject(expectedActions)
    })
  })
})

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('gets UPDATE_READ_STATUS when updating has been done', () => {
      let resp = {}

    fetchMock.getOnce('Conversation/UpdateRead/120/1495/I', {
        body: resp,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = 
      [
{
        "data": 100,
        "type": "asyncMessage/isLoading"
        },
         {
          "data": 400,
        "type": "asyncMessage/isLoading"
        }
],
         store = mockStore({})
        let data = {conversationId: 1495}

    return store.dispatch(updateReadStatus(data, false)).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchObject(expectedActions)
    })
  })
})

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('gets UPDATE_READ_STATUS when updating has been done', () => {
      let resp = {}

    fetchMock.getOnce('Conversation/UpdateRead/120/1495/I', {
        body: resp,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = 
      [
{
        "data": 100,
        "type": "asyncMessage/isLoading"
        },
         {
          "data": 400,
        "type": "asyncMessage/isLoading"
        }
],
         store = mockStore({})
        let data = {conversationId: 1495},
        onSuccess = () => {
          __DEV__ && console.log("API SUCCEED")
        }

    return store.dispatch(onSaveTitle(data, onSuccess)).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchObject(expectedActions)
    })
  })
})

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('CREATE_NEW_CONVERSATION when updating has been done', () => {
      let resp = {}

    fetchMock.getOnce('Conversation/UpdateRead/120/1495/I', {
        body: resp,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = 
    [
{"data": 100, "type": "asyncMessage/navigationLoadingStatus"}, 
    {"data": 100, "type": "asyncMessage/isLoading"}, 
    {"data": 400, "type": "asyncMessage/navigationLoadingStatus"}, 
    {"data": 400, "type": "asyncMessage/isLoading"}
],
         store = mockStore({})
        let data = {
          context: null,
          title: 'Add title',
          participantList: []
        },
        onSuccess = () => {
          __DEV__ && console.log("API SUCCEED")
        },
         replaceRoute = () => {
          __DEV__ && console.log("replaceRoute")
        }

    return store.dispatch(onCreateNewConversation(data, onSuccess, replaceRoute)).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchObject(expectedActions)
    })
  })
})


describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('gets SEND_NEW_MESSAGE when updating has been done', () => {
    let data = ""

    fetchMock.postOnce('conversation/message', {
        body: data,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = 
      [
{
        "data": 100,
        "type": "asyncMessage/isLoading"
        },
         {
          "data": 400,
        "type": "asyncMessage/isLoading"
        }
],
         store = mockStore({})
        
    return store.dispatch(onSendNewMessage(data)).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchObject(expectedActions)
    })
  })
})

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('LEAVE_CONVERSATION when updating has been done', () => {


    fetchMock.putOnce('Conversation/leave/120/1495/G', {
        body: data,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = 
      [
{
        "data": 100,
        "type": "asyncMessage/isLoading"
        },
         {
          "data": 400,
        "type": "asyncMessage/isLoading"
        }
],
         store = mockStore({})
        let data = {conversationId: 1495}
        
    return store.dispatch(leaveConversation(data)).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchObject(expectedActions)
    })
  })
})

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('ADD_PARTICIPANT when updating has been done', () => {


    fetchMock.putOnce('Conversation/leave/120/1495/G', {
        body: data,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = 
      [
{
        "data": 100,
        "type": "asyncMessage/isLoading"
        },
         {
          "data": 400,
        "type": "asyncMessage/isLoading"
        }
],
         store = mockStore({})
        let data = {conversationId: 1495}
        
    return store.dispatch(onAddParticipant(data)).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchObject(expectedActions)
    })
  })
})


describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('CONVERSATION_IMAGE_WITH_IMAGE_ID when updating has been done', () => {


    fetchMock.getOnce('Conversation/Message/1495', {
        body: data,
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = 
      [
{
        "data": 100,
        "type": "asyncMessage/isLoading"
        },
         {
          "data": 400,
        "type": "asyncMessage/isLoading"
        }
],
         store = mockStore({})
        let data = 1495
        
    return store.dispatch(getConversationImageWithImageId(data)).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchObject(expectedActions)
    })
  })
})

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('UPDATE_READ_STATUS_SIGNALR when updating has been done', () => {


    fetchMock.putOnce('Conversation/UpdateRead/120/1495/I', {
        body: {},
      headers: { 'content-type': 'application/json', 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjA2RDNFNDZFOTEwNzNDNUQ0QkMyQzk5ODNCRTlGRjQ0OENGNjQwRDQiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJCdFBrYnBFSFBGMUx3c21ZTy1uX1JJejJRTlEifQ.eyJuYmYiOjE1NTY3OTE5OTAsImV4cCI6MTU1OTM4Mzk5MCwiaXNzIjoiaHR0cHM6Ly9jaHFhLW9hdXRoLWFwaS5jb3Jlb2Zsb3dzYW5kYm94LmNvbSIsImF1ZCI6WyJodHRwczovL2NocWEtb2F1dGgtYXBpLmNvcmVvZmxvd3NhbmRib3guY29tL3Jlc291cmNlcyIsImFwaTEiXSwiY2xpZW50X2lkIjoiUGF0aWVudEd1YXJkaWFuIiwic3ViIjoibHlvbkBtYWlsaW5hdG9yLmNvbSIsImF1dGhfdGltZSI6MTU1Njc5MTk5MCwiaWRwIjoibG9jYWwiLCJ1c2VybmFtZSI6Imx5b25AbWFpbGluYXRvci5jb20iLCJlbWFpbCI6Imx5b25AbWFpbGluYXRvci5jb20iLCJ1c2VyaWQiOiIzMzciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiSXNFdWxhVXBkYXRlZCI6IlRydWUiLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiYXBpMSJdLCJhbXIiOlsicHdkIl19.oSduok-CXh1fzHF5P9fpUprejHOG1CaQdCvQQIlrW_FmDKSeGeTHjutD7K2NZogc6zsv2rXbs_6rV9LDOamYM_xAPw3HIN97NHxK3bTRkxv6q9ZT0mMVf2dhQ4z7KnP3RWX34_MNlTv9ZD4dBRnGLU87O9EHBZx3oTa7qenY8yPaOoeKH4e8faoFSf_GDeaCWWcueP5SdcF85TODJo350PDEO9uLQr21Ql1_CaqW8kb5Y5sJof4q7rh-D_U3uTAq8Yk76zu8IuoWtGlh4RFS9FCmE5ewHZoHyoIw8d3IZfZyVkvSnP8a1-jxnrWLbP1FhNkKAZahj4Skbmlu1j8nZQ' }
    })

    const expectedActions = 
      [],
         store = mockStore({})
        let data = {conversationId: 1495}
        
    return store.dispatch(updateReadStatusSignalR(data)).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchObject(expectedActions)
    })
  })
})

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('GET_CARETEAM_INDIVIDUAL_LIST when updating has been done', () => {

    const data = {
      attributeProviders: [],
      careTeamId: getCareTeamId(),
      clinicalConditions: [],
      cohorts: [],
      contracts: [],
      fromDate: "01/01/1999",
      gender: 0,
      maximumAge: 0,
      memberContractId: 0,
      minimumAge: 0,
      pageNumber: 1,
      pageSize: 1000000,
      rating: 0,
      sortName: "ModifiedDate",
      sortOrder: "asc",
      statusName: "All",
      toDate: moment(moment().toDate()).format('l')
  }

    fetchMock.postOnce('CareTeam/Individual/List', {
        body: data,
      headers: { 'content-type': 'application/json', 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjA2RDNFNDZFOTEwNzNDNUQ0QkMyQzk5ODNCRTlGRjQ0OENGNjQwRDQiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJCdFBrYnBFSFBGMUx3c21ZTy1uX1JJejJRTlEifQ.eyJuYmYiOjE1NTY3OTE5OTAsImV4cCI6MTU1OTM4Mzk5MCwiaXNzIjoiaHR0cHM6Ly9jaHFhLW9hdXRoLWFwaS5jb3Jlb2Zsb3dzYW5kYm94LmNvbSIsImF1ZCI6WyJodHRwczovL2NocWEtb2F1dGgtYXBpLmNvcmVvZmxvd3NhbmRib3guY29tL3Jlc291cmNlcyIsImFwaTEiXSwiY2xpZW50X2lkIjoiUGF0aWVudEd1YXJkaWFuIiwic3ViIjoibHlvbkBtYWlsaW5hdG9yLmNvbSIsImF1dGhfdGltZSI6MTU1Njc5MTk5MCwiaWRwIjoibG9jYWwiLCJ1c2VybmFtZSI6Imx5b25AbWFpbGluYXRvci5jb20iLCJlbWFpbCI6Imx5b25AbWFpbGluYXRvci5jb20iLCJ1c2VyaWQiOiIzMzciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiSXNFdWxhVXBkYXRlZCI6IlRydWUiLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiYXBpMSJdLCJhbXIiOlsicHdkIl19.oSduok-CXh1fzHF5P9fpUprejHOG1CaQdCvQQIlrW_FmDKSeGeTHjutD7K2NZogc6zsv2rXbs_6rV9LDOamYM_xAPw3HIN97NHxK3bTRkxv6q9ZT0mMVf2dhQ4z7KnP3RWX34_MNlTv9ZD4dBRnGLU87O9EHBZx3oTa7qenY8yPaOoeKH4e8faoFSf_GDeaCWWcueP5SdcF85TODJo350PDEO9uLQr21Ql1_CaqW8kb5Y5sJof4q7rh-D_U3uTAq8Yk76zu8IuoWtGlh4RFS9FCmE5ewHZoHyoIw8d3IZfZyVkvSnP8a1-jxnrWLbP1FhNkKAZahj4Skbmlu1j8nZQ' }
    })

    const expectedActions = [
      {"data": 100, "type": "asyncMessage/isLoading"}, 
    {"data": 400, "type": "asyncMessage/isLoading"}
  ],
         store = mockStore({})
        
    return store.dispatch(getCareTeamIndividualsList()).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchObject(expectedActions)
    })
  })
})


describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('GET_DASHBOARD_MESSAGE_COUNT when updating has been done', () => {

    fetchMock.getOnce('Conversation/Dashboard/ConversationCount/120/G', {headers: { 'content-type': 'application/json'}})

    const expectedActions = [
      {"data": 100, "type": "asyncMessage/isLoading"}, 
    {"data": 400, "type": "asyncMessage/isLoading"}
  ],
         store = mockStore({})
        
    return store.dispatch(getDashboardMessageCount(false)).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchObject(expectedActions)
    })
  })
})


describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('GET_COONVERSATION_COUNT when updating has been done', () => {

    fetchMock.getOnce('Conversation/Dashboard/ConversationCount/120/G', {headers: { 'content-type': 'application/json'}})

    const expectedActions = [
      {"data": 100, "type": "asyncMessage/isLoading"}, 
    {"data": 400, "type": "asyncMessage/isLoading"}
  ],
         store = mockStore({})
        
    return store.dispatch(getConversationCount(1459)).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchObject(expectedActions)
    })
  })
})

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('GET_COONVERSATION_COUNT when updating has been done', () => {

    fetchMock.getOnce('Common/LookupConfig/MessageFallBackInterval', {headers: { 'content-type': 'application/json'}})

    const expectedActions = [],
         store = mockStore({})
        
    return store.dispatch(getMessageFallBackInterval()).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchObject(expectedActions)
    })
  })
})


it('should create an action on msgCallbackInterval', () => {
  let data = {}
  const expectedAction = {
    type: AsyncMessageActions.msgCallbackInterval,
    data
}

  expect(msgCallbackInterval({})).toEqual(expectedAction)
})


it('should create an action on msgCallbackInterval', () => {
  let data = {}
  const expectedAction = {
    type: AsyncMessageActions.setContext,
    data
}

  expect(setContext({})).toEqual(expectedAction)
})

it('should create an action on msgCallbackInterval', () => {
  let data = {}
  const expectedAction = {
    type: AsyncMessageActions.loadingStatus,
    data
  }

  expect(isLoading({})).toEqual(expectedAction)
})

it('should create an action on msgCallbackInterval', () => {
  let data = {}
  const expectedAction = {
    type: AsyncMessageActions.navigationLoadingStatus,
    data
  }

  expect(isNavigationLoading({})).toEqual(expectedAction)
})

it('should create an action on msgCallbackInterval', () => {
  let data = {}
  const expectedAction = {
    type: AsyncMessageActions.setSelectedConversationId,
    data
  }

  expect(setSelectedConversationId({})).toEqual(expectedAction)
})