import {API} from '../../../services/api';
import {ServiceRequestGet} from '../../../services/http';
import {startLoading, endLoading} from '../../loading/actions';
import { onBack } from '../../navigation/actions';
import { API_FETCHING, API_SUCCESS, API_FAILED } from '../../../constants/AppAPIConstants';


export const Requirements = {
    getServiceCategorySuccess: 'get_requirements_success/requirements',
    getServiceTypeSuccess: 'get_type_success/requirements',
    getServiceTaskSuccess: 'get_task_success/requirements',
    nextClick: 'next_click/requirements',
    cancelClick: 'cancel_click/requirements',
    onChangeSelectedCategoryId: "on_change_selected_category_id",
    onCheckServiceType: "on_check_serviec_type",
    onCheckServiceTask: "on_check_service_task",
    changeAPIStatus: "changeAPIStatus/create_service_request",
    setDefaultServiceType: "setDefaultServiceType/requirements"
};

export const setDefaultServiceType = () => ({type: Requirements.setDefaultServiceType})


export const onCheckServiceTask = (id, index) => ({
        type: Requirements.onCheckServiceTask,
        data: {id, index}
    })
export const onCheckServiceType = (data) => ({
        type: Requirements.onCheckServiceType,
        data
    })

export const onChangeSelectedCategoryId = (id) => ({
        type: Requirements.onChangeSelectedCategoryId,
        data: id
    })

export const getServiceCategorySuccess = (data) => ({
        type: Requirements.getServiceCategorySuccess,
        data
    })

export const getServiceTypeSuccess = (data) => ({
        type: Requirements.getServiceTypeSuccess,
        data
    })

export const getServiceTaskSuccess = (data, categoryId) => ({
        type: Requirements.getServiceTaskSuccess,
        data: {data, categoryId}
    })
export const nextClick = (data) => ({
        type: Requirements.nextClick,
        data
    })

export const changeAPIStatus = (data) => ({
        type: Requirements.changeAPIStatus,
        data
    })

export const cancelClick = () => ({type: Requirements.cancelClick})

export function onNextClick(data){
    return (dispatch) => {
        dispatch(nextClick(data));        
    }
}

export function onCancelClick() {
    return (dispatch) => {
        dispatch(cancelClick());
        dispatch(onBack());
    }
}

export function handleServiceTask(data) {
    return (dispatch, getState) => {
        let currstate = getState();
        const typeList = currstate.servicerequestState.requirementsState.typeList.map((type) => {
            if (type.serviceTypeId === data.serviceTypeId) {
                data.selected = true;
                return data
            }
            return type;
        });

        dispatch(getServiceTaskSuccess(typeList));
    }
}

export function getServiceCategory() {
    return (dispatch) => {
        dispatch(startLoading());
        dispatch(changeAPIStatus({key: "getServiceCategoryStauts", status: API_FETCHING}))
        ServiceRequestGet(`${API.servicerequest}ServiceCategory`).then((resp) => {
            dispatch(getServiceCategorySuccess(resp.data))
            dispatch(changeAPIStatus({key: "getServiceCategoryStauts", status: API_SUCCESS}))
            dispatch(endLoading());
        })
.catch((err) => {
            dispatch(endLoading());
            dispatch(changeAPIStatus({key: "getServiceCategoryStauts", status: API_FAILED}))

        })

    }
}

function getAllServiceTasks(data, serviceCategoryId){
    return async (dispatch) => {
        let serviceTypes = {},
         allIndexes = {}

       await data.map((service, index) => {
            allIndexes = {
                ...allIndexes,
                [service.serviceTypeId]: service.serviceTypeId
            }
            ServiceRequestGet(`${API.servicerequest}ServiceTask/${service.serviceTypeId}`).then((resp) => {
                let duplicateServiceTasks = resp.data.map((task) => ({
                        ...task,
                        isByDefaultSelected: task.isDefault
                    })),
                 serviceType = {
                    ...service,
                    serviceTask: duplicateServiceTasks,
                    selected: false
                }

                serviceTypes = {
                    ...serviceTypes,
                    [service.serviceTypeId]: serviceType
                }
                delete allIndexes[service.serviceTypeId]
                if (Object.keys(allIndexes).length === 0){
                    dispatch(getServiceTaskSuccess(serviceTypes, serviceCategoryId))
                    dispatch(changeAPIStatus({key: "getServiceTypesStatus", status: API_SUCCESS}))
                }
            })
.catch((error) => {
            })
        })
        }
}

export function getServiceType(data) {
    return (dispatch) => {
        let serviceCategoryId = data;

        dispatch(changeAPIStatus({key: "getServiceTypesStatus", status: API_FETCHING}))
        ServiceRequestGet(`${API.servicerequest}ServiceType/${serviceCategoryId}`).then((resp) => {
           dispatch(getAllServiceTasks(resp.data, serviceCategoryId))
        })
.catch((err) => {
            dispatch(changeAPIStatus({key: "getServiceTypesStatus", status: API_FAILED}))
        })

    }
}