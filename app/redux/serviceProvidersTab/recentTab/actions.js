import { API } from '../../../services/api';
import { Get } from '../../../services/http';
import { API_FAILED, LOAD_MORE } from '../../../constants/AppAPIConstants';
import { getStatusBasedOnRequestType } from '../../../utils/appUtils';

export const Recent = {
    getRecentServiceProviderSuccess: "getFavouriteServiceProvider/recent",
    changeAPIStatus: "changeAPIStatus-id/recent"
}




const getRecentServiceProviderSuccess = (data) => ({
        type: Recent.getRecentServiceProviderSuccess,
        data
    }),

 changeAPIStatus = (data) => ({
        type: Recent.changeAPIStatus,
        data
    })

 

export function getRecentServiceProvider(requestObject){
    return (dispatch, getState) => {
        dispatch(changeAPIStatus({key: "getRecentSpStatus", status: getStatusBasedOnRequestType(requestObject.requestType)}))
        let patientId = getState().authState && getState().authState.userState.patientId,
         pageNumber = requestObject && requestObject.pageNumber ? requestObject.pageNumber : 1,
         pageSize = requestObject && requestObject.pageSize ? requestObject.pageSize : 20

        Get(`${API.getRecentServiceProviders + patientId}/${pageNumber}/${pageSize}/recent`).then((response) => {
            let updatedData = [...response.data]

            if (requestObject.requestType === LOAD_MORE){
               let existingData = [...getState().serviceProvidersTabState.recentState.serviceProviders]

               updatedData = existingData.concat(response.data)
            }
            dispatch(getRecentServiceProviderSuccess(updatedData))
        })
.catch((error) => {
            dispatch(changeAPIStatus({key: "getRecentSpStatus", status: API_FAILED}))
        })
    }
}

