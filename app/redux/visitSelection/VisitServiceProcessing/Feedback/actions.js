import { API } from '../../../../services/api';
import { startLoading, endLoading } from '../../../loading/actions';
import { Get, Post, serviceUrl } from '../../../../services/http';
import {getServiceProviderRating} from '../../../visitHistory/VisitServiceDetails/actions'
import { getAPIBasedOnUserType } from '../../../../utils/AppAPIUtils';
export const QuestionsList = {getQuestionsListSuccess: 'get_questions_list_success/performtasks'};

export const getQuestionsListSuccess = (data) => ({
        type: QuestionsList.getQuestionsListSuccess,
        data
    })

export function getQuestionsList() {
    return (dispatch) => {
        dispatch(startLoading());
        Get(API.getQuestionsList, serviceUrl).then((resp) => {
            dispatch(getQuestionsListSuccess(resp.data))
            dispatch(endLoading());
        })
.catch((err) => {
            dispatch(endLoading());
        })
    }
}

export function saveAnswers(data, onSuccess, onFailure) {
    return (dispatch) => {
        dispatch(startLoading());
        Post(getAPIBasedOnUserType(API.saveAnswers, data.isPlanVisit), data, serviceUrl).then((resp) => {
            dispatch(getServiceProviderRating({serviceVisitId: data.serviceRequestVisitId}, null, data.isPlanVisit))
            if (resp.data.value && !resp.data.value.isAdded && resp.data.value.message){
                onFailure && onFailure(resp.data.value.message)
            } else {
                onSuccess && onSuccess()
            }
            dispatch(endLoading());
        })
.catch((err) => {
            dispatch(endLoading());
        })
    }
}



