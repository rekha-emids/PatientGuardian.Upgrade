import { navigateToScreenMainStack, replace } from "../navigation/actions";
import { API } from "../../services/api";
import { PATH } from "../../routes";
import {
  AsyncGet,
  AsyncPost,
  AsyncPut,
  AsyncPutWithUrl,
  CareTeamPost
} from "../../services/http";
import moment from 'moment';
import { USER_TYPES } from "../../constants/constants";
import { getUserInfo, getCareTeamId, getSelectedPatientInfo, getUserIdAndType } from "../../utils/userUtil";
import { API_FETCHING, API_SUCCESS, API_FAILED } from "../../constants/AppAPIConstants";
import {invokeSignalr} from '../../utils/signalrUtility';
import {_} from '../../utils/validations'
let interval = null;

export const AsyncMessageActions = {
  setLoggedInUser: "set_loggedIn_User/asyncMessage",
  setConversationSummary: "set_conversation_summary/asyncMessage",
  newConversation: "new_conversation/asyncMessage",
  conversation: "conversation/asyncMessage",
  setUnreadCountDetails: "set_unread_count/asyncMessage",
  setLinkedParticipants: "set_linked_participants/asyncMessage",
  setLinkedPatients: "set_linked_patients/asyncMessage",
  setSelectedConversationId: "set_selected_conversation_id/asyncMessage",
  setconversation: "set_conversation/asyncMessage",
  setConversationCount: 'set_conversation_count/asyncMessage',
  clearCurrentCobversationState: "clear_current_conversation_state/asyncMessage",
  clearLinkedParticipantsState: "clear_linked_participants_state/asyncMessage",
  setConversationImage: "set_conversation_image/asyncMessage",
  clearConversationImageUrl: "clear_conversation_image_url/asyncMessage",
  pushConversation: "push_conversation/asyncMessage/asyncMessage",
  setCurrentOpenConversation: "set_current_open_conversation/asyncMessage",
  setRemoveParticipantConcurrency: 'setRemoveParticipantConcurrency/asyncMessage',
  setDashboardMessageCount: 'setDashboardMessageCount/asyncMessage',
  pushConversationMessage: 'push_conversation_asyncMessage/asyncMessage',
  loadingStatus: 'asyncMessage/isLoading',
  navigationLoadingStatus: 'asyncMessage/navigationLoadingStatus',
  pushUnreadConversation: 'pushUnreadConversation/asyncMessage',
  msgCallbackInterval: 'msgCallbackInterval/asyncMessage',
  setContext: 'setContext/asyncMessage'
};

export const msgCallbackInterval = (data) => ({
      type: AsyncMessageActions.msgCallbackInterval,
      data
  });

export const setContext = (data) => ({
      type: AsyncMessageActions.setContext,
      data
  });


export function setLinkedPatients() {
  return (dispatch, getState) => {
      const patientData = getState().authState.userState.selectedPatientInfo,
       currentPatient = {
          coreoHomeUserId: null,
          firstName: patientData.fullName,
          image: null,
          lastName: '',
          middleName: null,
          participantType: 'I',
          thumbNail: patientData.image,
          thumbNailByte: null,
          userId: patientData.patientId,
          userName: null
      }

      dispatch(getLinkedPatientsSuccess([currentPatient]));
  }
}

export function setLoggedInUser(data) {
  return (dispatch) => {
    dispatch(setLoggedInUserSuccess(data));
    dispatch(navigateToScreenMainStack(PATH.conversationSummary));
  };
}

export function gotoConversationSummary() {
  return (dispatch) => {
    dispatch(onFetchConversationSummary());
    dispatch(getUnreadMessageCounts());
    dispatch(onClearCurrentConversationState());
    dispatch(navigateToScreenMainStack(PATH.conversationSummary));
    dispatch(onClearLinkedParticipantsState());
  };
}

export function gotoEditTitle(data) {
  return (dispatch) => {
    dispatch(navigateToScreenMainStack(PATH && PATH.editTitle, {data}));
  };
}

export function gotoParticipantsList() {
  return (dispatch) => {
    dispatch(navigateToScreenMainStack(PATH.participantsList));
  };
}

export function goBackToConversation() {
  return (dispatch) => {
    dispatch(navigateToScreenMainStack(PATH.conversation));
  };
}

export const isLoading = (data) => ({
    type: AsyncMessageActions.loadingStatus,
    data
  })

export const isNavigationLoading = (data) => ({
    type: AsyncMessageActions.navigationLoadingStatus,
    data
  })

export function gotoConversation(conversationId, onSuccess, replaceRoute, params = {}) {
  return (dispatch) => {
    dispatch(setSelectedConversationId(conversationId));
    replaceRoute ? dispatch(replace(PATH && PATH.conversation)) : dispatch(navigateToScreenMainStack(PATH && PATH.conversation, params));
    onSuccess && onSuccess()
  };
}

export function onRemoveParticipant(data) {
  return (dispatch) => {
    dispatch(isLoading(API_FETCHING));
    return AsyncPut(API.removeParticipant, data)
      .then((resp) => {
        dispatch(onFetchConversation(resp.data.conversationId));
        dispatch(getAllRelatedParticipants(resp.data.conversationId));
        dispatch(isLoading(API_SUCCESS));
      })
      .catch((err) => {
        if (err.response && err.response.status === 400){
            dispatch(setRemoveParticipantConcurrency(true));
        }
        dispatch(isLoading(API_FAILED));
      });
  };
}

export function gotoAddParticipants(conversationId) {
  return (dispatch) => {
    dispatch(onFetchConversation(conversationId));
    dispatch(navigateToScreenMainStack(PATH && PATH.addParticipants));
  };
}

export function gotoParticipantList(conversationId) {
  return (dispatch) => {
    dispatch(onFetchConversation(conversationId));
    dispatch(navigateToScreenMainStack(PATH.participantsList));
  };
}

export function gotoCreateConversation() {
  return (dispatch) => {
    dispatch(onClearCurrentConversationState());
    dispatch(onClearLinkedParticipantsState());
    dispatch(navigateToScreenMainStack(PATH.newConversation));
  };
}

export const setSelectedConversationId = (data) => ({
    type: AsyncMessageActions.setSelectedConversationId,
    data
  });

const setLoggedInUserSuccess = (data) => ({
    type: AsyncMessageActions.setLoggedInUser,
    data
  });

export function onFetchConversationSummary() {
  
  return (dispatch, getState) => {
    let authState = getState().authState

    if (authState && authState.userState && authState.userState.userInfo && getState().authState.userState.userInfo.userType === USER_TYPES.CARE_TEAM && 
      getState().authState.userState.userType === USER_TYPES.PATIENT){
      dispatch(onFetchConversationSummaryImpersonate());
    } else {
      let userId = getUserInfo() && getUserInfo().userId,
       userType = getUserInfo() && getUserInfo().userType === USER_TYPES.INDIVIDUAL_GUARDIAN ? USER_TYPES.GUARDIAN : getUserInfo() && getUserInfo().userType,
       pageNum = 1,
       pageSize = 10;

      dispatch(isLoading(API_FETCHING));
      return AsyncGet(`${API.getConversationSummary +
          userId}/${ 
          userType}/${ 
          pageNum}/${ 
          pageSize}`)
        .then((resp) => {
          dispatch(isLoading(API_SUCCESS));
          dispatch(getUnreadMessageCounts(true))
          dispatch(setConversationSummary(resp.data));
        })
        .catch((err) => {
          dispatch(isLoading(API_FAILED));
        });
    }
  };
}

export function onFetchConversationSummaryPaging(data, updateNetworkOnResponse){
  let pageNum = data.pageNumber,
   {pageSize} = data;

  return (dispatch, getState) => {
    let authState = getState().authState;
    let network = getState().networkReducer && getState().networkReducer.network

    if (authState && authState.userState && authState.userState.userInfo && getState().authState.userState.userInfo.userType === USER_TYPES.CARE_TEAM && 
      getState().authState.userState.selectedPatientInfo.userType === USER_TYPES.PATIENT){
      dispatch(onFetchConversationSummaryImpersonate());
    } else {
      let userId = getUserInfo() && getUserInfo().userId,
       userType = getUserInfo() && getUserInfo().userType === USER_TYPES.INDIVIDUAL_GUARDIAN ? USER_TYPES.GUARDIAN : getUserInfo() && getUserInfo().userType;

      dispatch(isLoading(API_FETCHING));
      return AsyncGet(`${API.getConversationSummary +
        userId}/${ 
          userType}/${ 
          pageNum}/${ 
          pageSize}`)
        .then((resp) => {

          let {conversationSummary} = getState().asyncMessageState;

          if (pageNum > 1){
              conversationSummary = conversationSummary.concat(resp.data)
              dispatch(setConversationSummary(conversationSummary));
          } else {
              dispatch(setConversationSummary(resp.data));
          }
          dispatch(getUnreadMessageCounts())
          if (!network){
            updateNetworkOnResponse && updateNetworkOnResponse(true)
          }
        })
        .catch((err) => {
          dispatch(isLoading(API_FAILED));
        });
    }
  };
}

export function onFetchConversationSummaryImpersonate() {
  return (dispatch, getState) => {
      let contextId = getState().authState && getState().authState.userState.patientId;

      dispatch(isLoading(API_FETCHING));
      let pageNum = 1,
       pageSize = 200,
       userId = getUserInfo() && getUserInfo().userId

      return AsyncGet(`${API.getConversationSummaryImpersonate + 
          userId}/${ 
           contextId}/${
           pageNum}/${
           pageSize}`)
          .then((resp) => {
              dispatch(setConversationSummary(resp.data));
              dispatch(isLoading(API_SUCCESS));
            })
          .catch((err) => {
            dispatch(isLoading(API_FAILED));
          })
  }
}

export const setConversationSummary = (data) => ({
    type: AsyncMessageActions.setConversationSummary,
    data
  });

export function getUnreadMessageCounts(hideLoader) {
  return (dispatch) => {
    let {userId, userType} = getUserIdAndType()

    hideLoader ? null : dispatch(isLoading(API_FETCHING));
    return AsyncGet(`${API.getUnreadCount + userId}/${userType}`)
      .then((resp) => {
        dispatch(onUnreadCountSuccess(resp.data));
        hideLoader ? null : dispatch(isLoading(API_SUCCESS));
      })
      .catch((err) => {
        dispatch(isLoading(API_FAILED));
      });
  };
}

export const onUnreadCountSuccess = (data) => ({
    type: AsyncMessageActions.setUnreadCountDetails,
    data
  });

export function getLinkedParticipantsByPatients(data) {
  let serchText = data.searchText === "" ? null : data.searchText;

  return (dispatch) => {
    _.isNil(serchText) && dispatch(isLoading(API_FETCHING));
    let userId = getUserInfo() && getUserInfo().userId

    return AsyncGet(`${API.getParticipantsByContext +
        data.conversationId}/${ 
        userId}/${ 
        data.patientId}/${ 
        data.userType}/${ 
        serchText}`).then((resp) => {
        dispatch(getLinkedParticipantsByPatientsSuccess(resp.data));
        _.isNil(serchText) && dispatch(isLoading(API_SUCCESS));
      })
      .catch((err) => {
        _.isNil(serchText) && dispatch(isLoading(API_FAILED));
      });
  };
}

const getLinkedParticipantsByPatientsSuccess = (data) => ({
    type: AsyncMessageActions.setLinkedParticipants,
    data
  });

export function getLinkedPatients() {
  let userId = getUserInfo() && getUserInfo().userId

  return (dispatch) => {
        dispatch(isLoading(API_FETCHING));
        return AsyncGet(API.getContext + userId)
      .then((resp) => {
        dispatch(getLinkedPatientsSuccess(resp.data));
        dispatch(isLoading(API_SUCCESS));
      })
      .catch((err) => {
        dispatch(isLoading(API_FAILED));
      });
  };
}

const getLinkedPatientsSuccess = (data) => ({
    type: AsyncMessageActions.setLinkedPatients,
    data
  });

export function onFetchConversation(conversationId, loadMore, hideLoader = false) {
  return (dispatch, getState) => {
    let authState = getState().authState

    if (authState && authState.userState && authState.userState.userInfo  && getState().authState.userState.userInfo.userType === USER_TYPES.CARE_TEAM && 
    authState.userState && getState().authState.userState.userType === USER_TYPES.PATIENT){
      dispatch(onFetchConversationImpersonate(conversationId, hideLoader));
    } else {
      let userId = getUserInfo() && getUserInfo().userId,
       userType = getUserInfo() && getUserInfo().userType === USER_TYPES.INDIVIDUAL_GUARDIAN ? USER_TYPES.GUARDIAN : getUserInfo() && getUserInfo().userType,
       isLoadMore = loadMore ? loadMore : 'top',
     context = getState().asyncMessageState && getState().asyncMessageState.selectedContext

    hideLoader ? null : dispatch(isLoading(API_FETCHING));
    return AsyncGet(`${API.getConversation +
        conversationId}/${ 
        userId}/${ 
        userType}/${ 
        isLoadMore}/${context}`).then((resp) => {
        dispatch(setConversationData(resp.data));
        dispatch(setCurrentOpenConversation(resp.data));
        hideLoader ? null : dispatch(isLoading(API_SUCCESS));
      })
      .catch((err) => {
        hideLoader ? null : dispatch(isLoading(API_FAILED));
      });
    }
  };
}

export function onFetchConversationImpersonate(id, hideLoader = false) {
  return (dispatch, getState) => {
    hideLoader ? null : dispatch(isLoading(API_FETCHING));
      let contextId = getState().authState && getState().authState.userState.patientId,
       state = getState(),
       pageSize = 400,
       pageNum = 1,
       conversationId = id ? id : state.asyncMessageState.currentConversation.conversationId,   
       userId = getUserInfo() && getUserInfo().userId;   

      return AsyncGet(`${API.getConversationImpersonate + 
          conversationId}/${ 
           userId}/${ 
           contextId}/${
           pageNum}/${
           pageSize}`)
          .then((resp) => {
              dispatch(setConversationData(resp.data));
              dispatch(setCurrentOpenConversation(resp.data));
              hideLoader ? null : dispatch(isLoading(API_SUCCESS));
            })
          .catch((err) => {
            hideLoader ? null : dispatch(isLoading(API_FAILED));
          })
  }
}

export const setCurrentOpenConversation = (data) => ({
    type: AsyncMessageActions.setCurrentOpenConversation,
    data
  });

export const setConversationData = (data) => ({
    type: AsyncMessageActions.setconversation,
    data
  });

export function updateReadStatus(data, hideLoader) {
  return (dispatch) => {
    let userId = getUserInfo() && getUserInfo().userId,
     userType = getUserInfo() && getUserInfo().userType === USER_TYPES.INDIVIDUAL_GUARDIAN ? USER_TYPES.GUARDIAN : getUserInfo() && getUserInfo().userType;

    hideLoader ? null : dispatch(isLoading(API_FETCHING));
    return AsyncPutWithUrl(`${API.updateReadStatus + userId}/${data.conversationId}/${userType}`)
      .then((resp) => {
        dispatch(getDashboardMessageCount(hideLoader));
        dispatch(getUnreadMessageCounts(hideLoader));
        hideLoader ? null : dispatch(isLoading(API_SUCCESS));
      })
      .catch((err) => {
        dispatch(isLoading(API_FAILED));
      });
  };
}

export const onClearCurrentConversationState = () => ({type: AsyncMessageActions.clearCurrentCobversationState});

export const onClearLinkedParticipantsState = () => ({type: AsyncMessageActions.clearLinkedParticipantsState});

export function onSaveTitle(data, onSuccess) {
  return (dispatch) => {
    dispatch(isLoading(API_FETCHING));
    return AsyncPut(API.saveTitle, data)
      .then((resp) => {
        dispatch(onSaveTitleSuccess(resp.data.conversationId, onSuccess));
        dispatch(isLoading(API_SUCCESS));
      })
      .catch((err) => {
        dispatch(isLoading(API_FAILED));
      });
  };
}

export function onSaveTitleSuccess(conversationId, onSuccess) {
  return (dispatch) => {
    onSuccess && onSuccess()
    dispatch(setSelectedConversationId(conversationId));
    dispatch(navigateToScreenMainStack(PATH.conversation));
  };
}

export function checkConversationCreated(conversation) {
  return (dispatch, getState) => {
      let state = getState();

      dispatch(getDashboardMessageCount(true));
      if (state.asyncMessageState.openedAsyncPage === 'conversationSummary') {
       let {userId, userType} = getUserIdAndType()

        conversation.participantList.map((data) => {
            if (data.userId === userId && data.participantType === userType) {
                dispatch(getConversationSummaryItemSignalR(conversation.conversationId))
            }
        });
      }
  }
}

export function checkConversationExist(conversationId){
  return (dispatch, getState) => {
      dispatch(getDashboardMessageCount(true));
      let state = getState();

      state && state.asyncMessageState && state.asyncMessageState.conversationSummary && 
      state.asyncMessageState.conversationSummary.map((data) => {          
        if (data.conversationId === conversationId) {
            dispatch(onFetchExistingConversation(conversationId))
            dispatch(getConversationSummaryItemSignalR(conversationId))
          }
      });
  }
}

export function onCreateNewConversation(data, onSuccess, replaceRoute) {
  return (dispatch) => {
    dispatch(isNavigationLoading(API_FETCHING));
    dispatch(isLoading(API_FETCHING));
    let asyncData = {};

    if (getUserInfo() && getSelectedPatientInfo()){
      const userInfo = getUserInfo();
      let id = userInfo.userId;
      let patientId = getSelectedPatientInfo().patientId ? getSelectedPatientInfo().patientId : getUserInfo().patientId;
      let context = data.context ? data.context : patientId;
      let userType = userInfo.userType === USER_TYPES.INDIVIDUAL_GUARDIAN ? USER_TYPES.GUARDIAN : userInfo.userType;

      if (getUserInfo().patientId === context && userType !== USER_TYPES.CARE_TEAM) {
          userType = USER_TYPES.PATIENT
      }
      asyncData = {
          createdBy: id,
          createdByType: userType,
          title: data.title,
          context,
          participantList: [
              {
                  userId: id,
                  participantType: userType,
                  participantId: userInfo.userType === USER_TYPES.CARE_TEAM ? getCareTeamId() : userInfo.patientId
              },
              ...data.participantList
          ]
      };
    }
    return AsyncPost(API.createNewConversation, asyncData)
      .then((resp) => {
        dispatch(onClearLinkedParticipantsState());
        dispatch(setContext(resp.data.context))
        dispatch(gotoConversation(resp.data.conversationId, onSuccess, replaceRoute));
        dispatch(isNavigationLoading(API_SUCCESS));
        dispatch(isLoading(API_SUCCESS));
      })
      .catch((err) => {
        dispatch(isNavigationLoading(API_FAILED));
        dispatch(isLoading(API_FAILED));
      });
  };
}

export function onSendNewMessage(data) {
  return (dispatch) => {
    dispatch(isLoading(API_FETCHING));
    return AsyncPost(API.sendMessage, data)
      .then((resp) => {
        let list = resp.data.result.participantList.map((participant) => ({
                userId: participant.userId,
                participantType: participant.participantType
            }));
        const model = {
            participantList: list,
            conversationId: resp.data.result.conversationId,
            conversationMessageId: resp.data.result.conversationMessageId
        }

        invokeSignalr('UpdateChat', model)
        dispatch(verifyIsConversationMessageExistSendMessage(resp.data.result))
        dispatch(isLoading(API_SUCCESS));
      })
      .catch((err) => {
        dispatch(isLoading(API_FAILED));
      });
  };
}


const verifyIsConversationMessageExistSendMessage = (data) => (dispatch, getState) => {
      let state = getState(),
       conversationMessageData = [...state.asyncMessageState.conversation.messages];
      const index = conversationMessageData.indexOf(conversationMessageData.filter((el) => el.conversationMessageId === data.conversationMessageId)[0]);

      if (index === -1){
          dispatch(pushConversationMessage(data));
      }
  };

export function leaveConversation(data) {
  return (dispatch) => {
    let userId = getUserInfo() && getUserInfo().userId,
     userType = getUserInfo() && getUserInfo().userType === USER_TYPES.INDIVIDUAL_GUARDIAN ? USER_TYPES.GUARDIAN : getUserInfo() && getUserInfo().userType;

    dispatch(isLoading(API_FETCHING));
    return AsyncPutWithUrl(`${API.leaveConversation +
        userId 
        }/${ 
        data.conversationId 
        }/${ 
        userType}`)
      .then((resp) => {
        dispatch(onFetchConversation(resp.data.conversationId));
        dispatch(gotoConversation(resp.data.conversationId));
        dispatch(isLoading(API_SUCCESS));
      })
      .catch((err) => {
        dispatch(isLoading(API_FAILED));
      });
  };
}

export function onAddParticipant(data) {
  return (dispatch) => {
    dispatch(isLoading(API_FETCHING));
    return AsyncPost(API.addParticipant, data)
      .then((resp) => {
        dispatch(onFetchConversation(resp.data.conversationId));
        dispatch(gotoConversation(resp.data.conversationId));
        dispatch(isLoading(API_SUCCESS));
      })
      .catch((err) => {
        dispatch(isLoading(API_FAILED));
      });
  };
}

export function getConversationImageWithImageId(messageId) {
  return (dispatch) => {
    dispatch(isLoading(API_FETCHING));
    return AsyncGet(API.getConversationImage + messageId)
      .then((resp) => {
        dispatch(isLoading(API_SUCCESS));
        dispatch(onGetConversationImageWithImageIdSuccess(resp.data));
      })
      .catch((err) => {
        dispatch(isLoading(API_FAILED));
      });
  };
}

const onGetConversationImageWithImageIdSuccess = (data) => ({
    type: AsyncMessageActions.setConversationImage,
    data
  });

export function clearConversationImageUrl() {
  return (dispatch) => {
    dispatch(onClearConversationImageUrl());
  };
}

const onClearConversationImageUrl = () => ({type: AsyncMessageActions.clearConversationImageUrl});

export function getConversationSummaryItemSignalR(conversationId) {
  return (dispatch, getState) => {
    let state = getState();

    if (state.asyncMessageState.openedAsyncPage === "conversationSummary") {
        let {userType, userId} = getUserIdAndType()

        AsyncGet(`${API.getConversationSummary +
          conversationId 
          }/${ 
          userId 
          }/${ 
          userType}`)
        .then((resp) => {
          dispatch(getConversationSummaryItemSignalRSuceess(resp.data));
        })
        .catch((err) => {
        });
    }
  };
}

const getConversationSummaryItemSignalRSuceess = (data) => (dispatch, getState) => {
    let state = getState(),
     conversationSummaryData = [...state.asyncMessageState.conversationSummary];
    const index = conversationSummaryData.indexOf(conversationSummaryData.filter((el) => el.conversationId === data.conversationId)[0]);

    if (index !== -1) {
      conversationSummaryData.splice(index, 1);
      conversationSummaryData = [
data,
...conversationSummaryData
];
    } else {
      let {userType, userId} = getUserIdAndType()

      data.participantList.map((participant) => {
          if (participant.userId === userId && participant.participantType === userType) {
              conversationSummaryData = [
data,
...conversationSummaryData
];
          }
      });
    }
    dispatch(setConversationSummary(conversationSummaryData));
    dispatch(getUnreadMessageCounts(true));
  };

export function getConversationItemSignalR(conversationId, messageId) {
  return (dispatch, getState) => {
    let state = getState();

    if (
      state.asyncMessageState.openedAsyncPage === "conversation" &&
      state.asyncMessageState.currentConversation.conversationId ===
        conversationId
    ) {
      let {userId, userType} = getUserIdAndType(),
       data = { conversationId };

      AsyncGet(`${API.getConversationMessage +
          messageId 
          }/${ 
          conversationId 
          }/${ 
          userId 
          }/${ 
          userType}`)
        .then((resp) => {
          dispatch(verifyIsConversationMessageExist(resp.data));
          dispatch(updateReadStatusSignalR(data));

        })
        .catch((err) => {

        });
    }
  };
}

export function checkLatestMessages(conversationId, hideLoader){
  return (dispatch, getState) => {
      let state = getState();

      if (state.asyncMessageState.currentConversation.conversationId && state.asyncMessageState.openedAsyncPage === 'conversation' && 
      state.asyncMessageState.currentConversation.conversationId === conversationId){
          let messages = state.asyncMessageState.conversation && state.asyncMessageState.conversation.messages,
           messageId = messages && messages.length > 0 && messages[messages.length - 1].conversationMessageId,
           lastMessageId = messageId ? messageId : 0,
           {userType, userId} = getUserIdAndType(),
           data = {conversationId};

          AsyncGet(`${API.getLatestMessages + 
              conversationId}/${
               lastMessageId}/${
               userId}/${
               userType}`).then((resp) => {
              dispatch(verifyIsConversationMessagesExist(resp.data.messages));
              dispatch(updateReadStatus(data, hideLoader));
          })
.catch((err) => { 
              // console.log(err)
          })
      }
  }
}

export function getUnreadConversationByUserId(conversationId) {
  return (dispatch, getState) => {
    let state = getState();

    if (
      state.asyncMessageState.openedAsyncPage === "conversation" &&
      state.asyncMessageState.currentConversation.conversationId ===
        conversationId
    ) {
      let {userType, userId} = getUserIdAndType(),
       data = { conversationId };

      dispatch(isLoading(API_FETCHING));
      AsyncGet(`${API.getUnreadConversationsByUserId +
          conversationId 
          }/${ 
          userId 
          }/${ 
          userType}`)
        .then((resp) => {
          dispatch(verifyIsConversationMessagesExist(resp.data));
          dispatch(updateReadStatusSignalR(data));
          dispatch(isLoading(API_SUCCESS));

        })
        .catch((err) => {
          dispatch(isLoading(API_FAILED));

        });
    }
  };
}

export function joinGroup(conversationId){
  return (dispatch) => {
      if (conversationId) {
          invokeSignalr('JoinRoom', conversationId)
          dispatch(getLatestMessages(conversationId));
      }
  }
}

export function getLatestMessages(conversationId){
  return (dispatch, getState) => {
      let state = getState();

      if (interval) {
          clearInterval(interval);
      }
      dispatch(onFetchExistingConversation(conversationId));
      interval = setInterval(() => {
          dispatch(checkLatestMessages(conversationId, true));
      }, state.asyncMessageState.callbackInterval);
  }
}
export function onFetchExistingConversation(id) {
  return (dispatch, getState) => {
      let userType = getUserInfo() && getUserInfo().userType === USER_TYPES.INDIVIDUAL_GUARDIAN ? USER_TYPES.GUARDIAN : getUserInfo() && getUserInfo().userType;
      let state = getState();
      let userId = getUserInfo() && getUserInfo().userId;

      if (state.asyncMessageState.currentConversation && state.asyncMessageState.currentConversation.conversationId && state.asyncMessageState.openedAsyncPage === 'conversation' && 
      state.asyncMessageState.currentConversation.conversationId === id){
          let context = state.asyncMessageState.currentConversation.context

          AsyncGet(`${API.getConversation + 
              id}/${ 
               userId}/${ 
               userType}/all/${context}`)
              .then((resp) => {
                  dispatch(setConversationData(resp.data));
                  dispatch(setCurrentOpenConversation(resp.data));
              })
              .catch((err) => {
              })
      }
  }
}

export function removeFromGroup(conversationId){
  return () => {
      if (interval) {
          clearInterval(interval);
      }
      if (conversationId) {
          invokeSignalr('LeaveRoom', conversationId)
      }
  }
}

export function updateReadStatusSignalR(data) {
  return (dispatch) => {
    let userId = getUserInfo() && getUserInfo().userId,
     userType = getUserInfo() && getUserInfo().userType === USER_TYPES.INDIVIDUAL_GUARDIAN ? USER_TYPES.GUARDIAN : getUserInfo() && getUserInfo().userType;

    return AsyncPutWithUrl(`${API.updateReadStatus + userId}/${data.conversationId}/${userType}`)
      .then((resp) => {
      })
      .catch((err) => {
      });
  };
}

export const pushConversation = (data) => ({
    type: AsyncMessageActions.pushConversation,
    data
  });

export const pushUnreadConversation = (data) => ({
      type: AsyncMessageActions.pushUnreadConversation,
      data
  });

const verifyIsConversationMessageExist = (data) => (dispatch, getState) => {
    let state = getState(),
     conversationData = [...state.asyncMessageState.conversation.messages];
    const index = conversationData.indexOf(conversationData.filter((el) => el.conversationMessageId === data.messages[0].conversationMessageId)[0]);

    if (index === -1 && data.messages.length > 0) {
      dispatch(pushConversation(data));
    }
  },

 verifyIsConversationMessagesExist = (data) => (dispatch, getState) => {
    let state = getState(),
     conversationData = [...state.asyncMessageState.conversation.messages],
     unreadMessages = [];

    data.map((message) => {
        let msgFound = false;

        conversationData.map((msg) => {
            if (message.conversationMessageId === msg.conversationMessageId) {
                msgFound = true;
            }
        });
        if (!msgFound) {
            unreadMessages.push(message)
        }
    });
    if (unreadMessages.length > 0){
        dispatch(pushUnreadConversation(unreadMessages));
    }
  };


export const pushConversationMessage = (data) => ({
    type: AsyncMessageActions.pushConversationMessage,
    data
    });

    
 export function getCareTeamIndividualsList() {
  return (dispatch) => {
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

      dispatch(isLoading(API_FETCHING));
      return CareTeamPost(API.getIndividualsList, data).then((resp) => {
          let patients = resp.data && resp.data.map((patient) => ({
                  coreoHomeUserId: null,
                  firstName: patient.individualName,
                  image: null,
                  lastName: '',
                  middleName: null,
                  participantType: 'I',
                  thumbNail: patient.thumbNail,
                  thumbNailByte: null,
                  userId: patient.individualId,
                  userName: null
              }));

          dispatch(getLinkedPatientsSuccess(patients));
          dispatch(isLoading(API_SUCCESS));
        })
.catch(() => {
          dispatch(isLoading(API_FAILED));
        })
  }
}


export function getDashboardMessageCount(hideLoader) {
  return (dispatch) => {
      let {userId, userType} = getUserIdAndType()

      hideLoader ? null : dispatch(isLoading(API_FETCHING));

      return AsyncGet(`${API.getDashboardMessageCount + userId}/${userType}`)
          .then((resp) => {
              dispatch(getDashboardCountSuccess(resp.data));
              hideLoader ? null : dispatch(isLoading(API_SUCCESS));

          })
          .catch((err) => {
            dispatch(isLoading(API_FAILED));

          })
  }
}

const getDashboardCountSuccess = (data) => ({
      type: AsyncMessageActions.setDashboardMessageCount,
      data
  });


export function setRemoveParticipantConcurrency (data){
  return {
      type: AsyncMessageActions.setRemoveParticipantConcurrency,
      data
  }
}

export function getMessageFallBackInterval(){
  return (dispatch) => AsyncGet(API.getMessageFallBackInterval)
          .then((resp) => {
              resp.data && resp.data.length > 0 && dispatch(msgCallbackInterval(parseInt(resp.data[0].value, 10)))
          })
          .catch((err) => {
          })
}

export function getConversationCount(conversationId) {
  return (dispatch) => {
    dispatch(isLoading(API_FETCHING));
      return AsyncGet(API.getConversationCount + 
          conversationId)
          .then((resp) => {
              dispatch(getConversationCountSuccess(resp.data));
              dispatch(isLoading(API_SUCCESS));
            })
          .catch((err) => {
            dispatch(isLoading(API_FAILED));
          })
  }
}

const getConversationCountSuccess = (data) => ({
      type: AsyncMessageActions.setConversationCount,
      data
  })
