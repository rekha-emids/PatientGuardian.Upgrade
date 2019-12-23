import { API } from '../../../../services/api';
import {Put, Get, Post, serviceUrl} from '../../../../services/http'
import { push } from '../../../navigation/actions';
import { Path } from '../../../../routes';
import { API_FETCHING, API_FAILED } from '../../../../constants/AppAPIConstants';
import { getAPIBasedOnUserType } from '../../../../utils/AppAPIUtils';

export const PerformTasks = {
    getPerformTasksListSuccess: 'get_perform_tasks_list_success/performtasks',
    changeAPIStatus: "changeAPIStatus/performtasks",
    resetPerformTasksState: "resetPerformTasksState/performtasks"
};

export const getPerformTasksListSuccess = (data) => ({
        type: PerformTasks.getPerformTasksListSuccess,
        data
    })

export const changeAPIStatus = (data) => ({
        type: PerformTasks.changeAPIStatus,
        data
    })

export const resetPerformTasksState = () => ({type: PerformTasks.resetPerformTasksState})


export function getPerformTasksList(data, isPlanVisit) {
    return (dispatch) => {
        dispatch(changeAPIStatus(API_FETCHING))
        Get(getAPIBasedOnUserType(API.getServiceRequestPerformTasks, isPlanVisit) + data, serviceUrl).then((resp) => {
            dispatch(getPerformTasksListSuccess(resp.data))
        })
.catch((err) => {
            dispatch(changeAPIStatus(API_FAILED))
        })
    }
}

export function addPerformedTask(data) {
    return (dispatch) => {
        Put(API.savePerformedTask + data, serviceUrl).then((resp) => {
            dispatch(push(Path.feedback))
        })
.catch((err) => {
            dispatch(push(Path.feedback))
        })
    }
}


export function cancelVisit(data){
    return (dispatch) => {
        Post(API.cancelVisit, data, serviceUrl).then((resp) => {
        })
.catch((err) => {
        })
    }
}



