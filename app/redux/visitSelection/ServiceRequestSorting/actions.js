import { API } from '../../../services/api';
import { ServiceRequestPost, ServiceRequestGet } from '../../../services/http';
import {getVisitServiceListSuccess} from '../VisitServiceList/actions';
import { LOAD_MORE, API_FAILED } from '../../../constants/AppAPIConstants';
import {changeAPIStatus} from '../VisitServiceList/actions'
import { getStatusBasedOnRequestType } from '../../../utils/appUtils';
import { DEFAULT_VALUE } from '../../../constants/constants';

export function getSortFilter(data, updateNetworkOnResponse) {
    return (dispatch, getState) => {
        let {patientId} = getState().authState.userState,
         {network} = getState().networkReducer
        const {requestType, ...other} = data

        dispatch(changeAPIStatus(getStatusBasedOnRequestType(requestType)))
        ServiceRequestPost(`${API.serviceRequestSortAndFilter}`, {...other, patientId}).then((resp) => {
            let updatedData = [...resp.data]

                if (requestType === LOAD_MORE){
                   let existingData = [...getState().visitSelectionState.VisitServiceListState.visitServiceList]

                   updatedData = existingData.concat(resp.data)
                }
                if (data && updatedData.length < data.pageNumber * data.pageSize && updatedData.filter((request) => request.serviceRequestId === DEFAULT_VALUE).length === 0){
                    updatedData.push({serviceRequestId: DEFAULT_VALUE})
                }
                if (!network){
                    updateNetworkOnResponse && updateNetworkOnResponse(true)
                }
            dispatch(getVisitServiceListSuccess(updatedData))
        })
.catch((err) => {
            dispatch(changeAPIStatus(API_FAILED))
        })
    }
}

export function getSort(data) {
    return (dispatch, getState) => {
        ServiceRequestGet(`${API.getSortServiceRequest}/${patientId}/0/1/10/${data.sortByColumn}/${data.sortByOrder}`).then((resp) => {
            dispatch(getVisitServiceListSuccess(resp.data))
        })
.catch((err) => {
        })
    }
}
