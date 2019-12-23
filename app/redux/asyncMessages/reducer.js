import { AsyncMessageActions } from "./actions";
import { API_INITIAL } from "../../constants/AppAPIConstants";

const defaultState = {
  isLoading: API_INITIAL,
  isNavigationLoading: API_INITIAL,
  conversationSummary: [],
  unreadCounts: [],
  loggedInUser: {},
  linkedParticipants: [],
  conversation: {},
  selectedConversationId: null,
  linkedPatients: [],
  conversationImageUrl: "",
  openedAsyncPage: null,
  currentConversation: {},
  removeParticipantConcurrencyExist: false,
  conversationTitle: "",
  dashboardMessageCount: 0,
  callbackInterval: 9000,
  selectedContext: 0,
  conversationCount: 0
},

 asyncMessageState = (state = defaultState, action) => {
  switch (action.type) {
    case AsyncMessageActions.loadingStart:
      return {...state};
    case AsyncMessageActions.loadingEnd:
      return {...state};
    case AsyncMessageActions.setLoggedInUser:
      return {
        ...state,
        loggedInUser: action.data
      };
    case AsyncMessageActions.setConversationSummary:
      return {
        ...state,
        conversationSummary: action.data,
        openedAsyncPage: "conversationSummary"
      };
    case AsyncMessageActions.setUnreadCountDetails:
      return {
        ...state,
        unreadCounts: action.data
      };
    case AsyncMessageActions.setLinkedParticipants:
      return {
        ...state,
        linkedParticipants: action.data
      };
    case AsyncMessageActions.setLinkedPatients:
      return {
        ...state,
        linkedPatients: action.data
      };
    case AsyncMessageActions.setSelectedConversationId:
      return {
        ...state,
        selectedConversationId: action.data
      };
    case AsyncMessageActions.setconversation:
      return {
        ...state,
        conversation: action.data,
        conversationTitle: action.data.title,
        openedAsyncPage: "conversation"
      };
    case AsyncMessageActions.clearCurrentCobversationState:
      return {
        ...state,
        conversation: {},
        selectedConversationId: null
      };
    case AsyncMessageActions.clearLinkedParticipantsState:
      return {
        ...state,
        linkedParticipants: [],
        linkedPatients: []
      };
    case AsyncMessageActions.setConversationImage:
      return {
        ...state,
        conversationImageUrl: action.data
      };
    case AsyncMessageActions.clearConversationImageUrl:
      return {
        ...state,
        conversationImageUrl: ""
      };
    case AsyncMessageActions.pushConversation:
      return {
        ...state,
        conversation: {
          ...state.conversation,
          messages: [
...state.conversation.messages,
action.data.messages[0]
],
          participantList: action.data.participantList,
          title: action.data.title,
          isActive: action.data.isActive,
          canEdit: action.data.canEdit
        }
      };
    case AsyncMessageActions.pushUnreadConversation:
      return {
        ...state,
        conversation: {
          ...state.conversation,
          messages: [
...state.conversation.messages,
...action.data
]
        }
      };
    case AsyncMessageActions.setCurrentOpenConversation:
      return {
        ...state,
        currentConversation: action.data
      };
    case AsyncMessageActions.pushConversationMessage:
      return {
        ...state,

        conversation: {
          ...state.conversation,

          messages: [
...state.conversation.messages,
action.data
],

          participantList: action.data.participantList
        }
      };
    case AsyncMessageActions.setRemoveParticipantConcurrency:
      return {
        ...state,
        removeParticipantConcurrencyExist: action.data
      };
    case AsyncMessageActions.setDashboardMessageCount:
      return {
        ...state,
        dashboardMessageCount: action.data
      };
    case AsyncMessageActions.loadingStatus:
      return {
        ...state,
        isLoading: action.data
      };
    case AsyncMessageActions.navigationLoadingStatus:
      return {
        ...state,
        isNavigationLoading: action.data
      };
    case AsyncMessageActions.msgCallbackInterval:
      return {
        ...state,
        callbackInterval: action.data
      };
    case AsyncMessageActions.setContext:
      return {
        ...state,
        selectedContext: action.data
      };

    case AsyncMessageActions.setConversationCount:
      return {
        ...state,
        conversationCount: action.data
      };
    default:
      return state;
  }
};

export default asyncMessageState;
