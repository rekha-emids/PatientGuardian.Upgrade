import { API } from '../../../services/api';
import {ServiceRequestGet} from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { navigateToScreenMainStack } from '../../navigation/actions';
import { PATH } from '../../../routes';
// import { PATIENT_ID, STATUS } from '../../constants/constants';
import {changeSelectedServiceRequestId, getServiceProviders} from '../../serviceProvidersTab/requestsTab/actions'
import {SERVICE_PROVIDERS} from '../../../screens/HomeTabs/index'
import { API_FAILED,  LOAD_MORE, INIT } from '../../../constants/AppAPIConstants';
import { getStatusBasedOnRequestType } from '../../../utils/appUtils';
import { SERVICEPROVIDERS_REQUESTS } from '../../../screens/ServiceProvidersTab';
export const VisitServiceList = {
    getVisitServiceListSuccess: 'get_visit_service_list_success/visitservice',
    profileClick: 'profileClick/visitservice',
    seviceProvidersClick: 'seviceProvidersClick/visitservice',
    newServiceRequestClick: 'newServiceRequestClick/visitservice',
    changeStatus: "changeStatus/visitservice"
};

export const changeAPIStatus = (data) => ({
        type: VisitServiceList.changeStatus,
        data
    })


export const getVisitServiceListSuccess = (data) => ({
        type: VisitServiceList.getVisitServiceListSuccess,
        data
    })

export const profileClick = () => ({type: VisitServiceList.profileClick})

export const seviceProvidersClick = () => ({type: VisitServiceList.seviceProvidersClick})

export const newServiceRequestClick = () => ({type: VisitServiceList.newServiceRequestClick})

export function onProfileClick() {
    return (dispatch, getState) => {
        dispatch(profileClick())
        // dispatch(push(Path.serviceProviderProfile))
        dispatch(navigateToScreenMainStack(PATH.WELCOME_SCREEN));
    }
}

export function onSeviceProvidersClick(data, extraProps) {
    return (dispatch, getState) => {
        dispatch(seviceProvidersClick())
        dispatch(getServiceProviders(data, {pageNumber: 1, pageSize: 10, requestType: INIT}))
        dispatch(changeSelectedServiceRequestId(data))
        extraProps.navigate(SERVICE_PROVIDERS)
        extraProps.navigate(SERVICEPROVIDERS_REQUESTS)
    }
}

export function onNewServiceRequestClick() {
    return (dispatch, getState) => {
        dispatch(newServiceRequestClick())
        // dispatch(push(Path.serviceRequest))
        dispatch(navigateToScreenMainStack(PATH.WELCOME_SCREEN));
    }
}

export function getVisitServiceList(requestObject, data) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        dispatch(changeAPIStatus(getStatusBasedOnRequestType(requestObject.requestType)))
            let {patientId} = getState().authState.userState,
             pageNumber = requestObject && requestObject.pageNumber ? requestObject.pageNumber : 1,
             pageSize = requestObject && requestObject.pageSize ? requestObject.pageSize : 20

            ServiceRequestGet(`${API.getServiceRequestList}${patientId}/0/${pageNumber}/${pageSize}/${data.sortByColumn}/${data.sortByOrder}`).then((resp) => {
                let updatedData = [...resp.data]

                if (requestObject.requestType === LOAD_MORE){
                   let existingData = [...getState().visitSelectionState.VisitServiceListState.visitServiceList]

                   updatedData = existingData.concat(resp.data)
                }
                dispatch(getVisitServiceListSuccess(updatedData))
            dispatch(endLoading());
        })
.catch((err) => {
            dispatch(changeAPIStatus(API_FAILED))
            dispatch(endLoading());
        })
    }
}



