import { API } from '../../../services/api';
import { Get } from '../../../services/http';
import { API_FAILED, LOAD_MORE } from '../../../constants/AppAPIConstants';
import { getStatusBasedOnRequestType } from '../../../utils/appUtils';

export const Favourite = {
    getFavouriteServiceProvidersSuccess: "getFavouriteServiceProvider/favourite",
    changeAPIStatus: "changeAPIStatus-id/favourite"
}


const getFavouriteServiceProvidersSuccess = (data) => ({
        type: Favourite.getFavouriteServiceProvidersSuccess,
        data
    }),

 changeAPIStatus = (data) => ({
        type: Favourite.changeAPIStatus,
        data
    })

 

export function getFavouriteServiceProviders(requestObject){
    return (dispatch, getState) => {
        dispatch(changeAPIStatus({key: "getFavSPStatus", status: getStatusBasedOnRequestType(requestObject.requestType)}))
        let patientId = getState().authState && getState().authState.userState.patientId,
         pageNumber = requestObject && requestObject.pageNumber ? requestObject.pageNumber : 1,
         pageSize = requestObject && requestObject.pageSize ? requestObject.pageSize : 20

        Get(`${API.getFavouriteServiceProviders + patientId}/${pageNumber}/${pageSize}/favorite`).then((response) => {
            let updatedData = [...response.data]

            if (requestObject.requestType === LOAD_MORE){
               let existingData = [...getState().serviceProvidersTabState.favoriteState.serviceProviders]

               updatedData = existingData.concat(response.data)
            }
            dispatch(getFavouriteServiceProvidersSuccess(updatedData))
        })
.catch((error) => {
            dispatch(changeAPIStatus({key: "getFavSPStatus", status: API_FAILED}))
        })
    }
}

