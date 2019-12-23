import {API, serviceRequestURL} from '../../../services/api';
import {ServiceRequestPost, Put} from '../../../services/http';
import { onBack } from '../../navigation/actions';
import { DATE_FORMAT, ONE_TIME, RECCURING, DAYS, OCCURANCES, USER_TYPES, ALL, OPEN_STATUS, MINIMUM_EXPERIENCE, MAXIMUM_EXPERIENCE } from '../../../constants/constants';
import { normalizeData } from '../../../utils/appUtils';
import { getDayOfDate, getFormatedDate } from '../../../utils/momentUtil';
import { getPatientRequests } from '../../serviceProvidersTab/requestsTab/actions';
import {AddDays, AddMonths, formatDateMMDDYYYY} from '../../../utils/momentUtil'
import { API_FETCHING, API_SUCCESS, API_FAILED } from '../../../constants/AppAPIConstants';
import { getSortFilter } from '../../visitSelection/ServiceRequestSorting/actions';
import { initialState } from '../../../screens/VisitSelection/VisitServiceList';
import { SERVICEPROVIDERS_REQUESTS } from '../../../screens/ServiceProvidersTab';
import { getPatientServiceRequestDetail } from '../../dashboard/Dashboard/actions';
export const Review = {
    cancelClick: 'cancel_click/review',
    nextClick: 'next_click/review',
    previousClick: 'cancel_click/review',
    changeAPIStatus: "changeAPIStatus/review"
}; 

dateSwitch = (param, startDate, value) => {
    switch (param){
        case OCCURANCES.WEEKLY:
         return AddDays(startDate, 7 * value, DATE_FORMAT);
        case OCCURANCES.BI_WEEKLY:
         return AddDays(startDate, 14 * value, DATE_FORMAT);
        case OCCURANCES.MONTHLY:
         return AddMonths(startDate, Number(value), DATE_FORMAT);
         case OCCURANCES.BI_MONTHLY:
         return AddMonths(startDate, 2 * value, DATE_FORMAT);
         default: 
          return "11/11/1990"
}
}
export function onCancelClick() {
    return (dispatch) => {
        dispatch(cancelClick());
        dispatch(onBack());
    }
}

export function onPreviousClick(){
    return (dispatch) => {
        dispatch(previousClick());
    }
}

export function changeAPIStatus (status) {
    return {
        type: Review.changeAPIStatus,
        data: status
    }
}

export function GenerateServiceRequestSucess(){
    return (dispatch) => {
        // dispatch(push(Path.root));
    }
}
export function GotoServiceProvider(){
    return (dispatch) => {
    }
}

export const cancelClick = () => ({type: Review.cancelClick})

export const nextClick = (data) => ({
        type: Review.nextClick,
        data
    })

export const previousClick = () => ({type: Review.previousClick})


export function engageSp(srId, spId, onSuccessApprovalRequest, onSuccessPostedRequest){
    return (dispatch, getState) => {
        const data = {
            serviceProviderId: spId,
            serviceRequestId: srId,
            engagedBy: getState().authState.userState.userInfo.userType
        };

        Put(API.hireServiceProvider, data, serviceRequestURL).then((response) => {
            onSuccessPostedRequest && onSuccessPostedRequest()
            dispatch(changeAPIStatus(API_SUCCESS))
        }).catch((error) => {
            if (error.message){
                onSuccessApprovalRequest && onSuccessApprovalRequest()
            }
            dispatch(changeAPIStatus(API_FAILED))
        })
    }
}



export function onNextClick(onNxt, spId, onSuccessApprovalRequest, onSuccessPostedRequest){
    return (dispatch, getState) => {
        dispatch(changeAPIStatus(API_FETCHING))
        const currstate = getState();
        let schedulePreferencesObj = currstate.servicerequestState.schedulepreferencesState.schedulePreferencesObj;
        let daysType = currstate.DashboardState.dashboardState.lookupDetails.days
        let requirementObj = currstate.servicerequestState.requirementsState.requirementObj;
        let typeList = currstate.servicerequestState.requirementsState.typeList
        let selectedServiceCategoryId = currstate.servicerequestState.requirementsState.selectedServiceCategoryId
        let categoryTypes = typeList[selectedServiceCategoryId]
        let serviceTypes = []

        Object.keys(categoryTypes).map((key) => {
            if (categoryTypes[key].selected){
                serviceTypes.push(categoryTypes[key])
            }
        })
        let selectedServiceTypes = serviceTypes.map((type) => {
            let serviceTasks = type.serviceTask.filter((task) => task.isDefault)

            return {
                serviceTypeId: type.serviceTypeId,
                serviceTypeDescription: type.serviceTypeDescription,
                serviceTask: serviceTasks
            };
        }),
         serviceTypesFiltered = selectedServiceTypes.filter((type) => type.serviceTask.length > 0),
         slots = [],
         normalizedDays = normalizeData(daysType, "name"),
         date = getFormatedDate(schedulePreferencesObj.selectedDate)

        if (schedulePreferencesObj.selectedScheduleType === RECCURING){
            date = getFormatedDate(schedulePreferencesObj.startDate)
            schedulePreferencesObj.reccuranceSlotData.map((day, index) => {
                day.map((slot, iter) => {
                    if (slot.selected && normalizedDays[DAYS[index]]){
                        let slotType = {
                            dayOfWeek: normalizedDays[DAYS[index]].id,
                            slotId: slot.id
                        }

                        slots.push(slotType)
                    }
                })
            })
        } else {
            let day = getDayOfDate(schedulePreferencesObj.selectedDate)

            schedulePreferencesObj.slotData.map((slot) => {
                if (slot.selected && normalizedDays[day]){
                    let slotType = {
                        dayOfWeek: normalizedDays[day].id,
                        slotId: slot.id
                    }

                    slots.push(slotType) 
                }
            })
        }
        let startDate = !date ? "1/1/1990" : date,
         occurrences = !schedulePreferencesObj.occurances ? 0 : Number(schedulePreferencesObj.occurances),
         endDate = !schedulePreferencesObj.endDate ? "11/11/1990" : getFormatedDate(schedulePreferencesObj.endDate);

        if (occurrences > 0){
            endDate = formatDateMMDDYYYY(dateSwitch(schedulePreferencesObj.recurringPatternLabel, startDate, occurrences));
            }
        let minimumServiceProviderExperience = Number(schedulePreferencesObj.minimumServiceProviderExperience) === MINIMUM_EXPERIENCE ? 0 : schedulePreferencesObj.minimumServiceProviderExperience, 
         maximumServiceProviderExperience = Number(schedulePreferencesObj.maximumServiceProviderExperience) === Number(MAXIMUM_EXPERIENCE) ? 50 : schedulePreferencesObj.maximumServiceProviderExperience, 
         genderPreference = !schedulePreferencesObj.selectedGenderKey ? 0 : schedulePreferencesObj.selectedGenderKey, 
         isRecurring = schedulePreferencesObj.selectedScheduleType !== ONE_TIME,
         additionalDescription = !requirementObj.selectedCatagoryDescription ? "" : requirementObj.selectedCatagoryDescription,
         recurringPattern = !isRecurring ? 0 : schedulePreferencesObj.recurringPattern 

        const {patientAddressType} = currstate.servicerequestState.schedulepreferencesState
        let address = null

        if (schedulePreferencesObj.selectedAddressKey === -1){
            address = {
                addressType: schedulePreferencesObj.addressType,
                street: schedulePreferencesObj.street,
                stateName: schedulePreferencesObj.state,
                city: schedulePreferencesObj.city,
                zip: schedulePreferencesObj.zip,
                stateId: schedulePreferencesObj.selectedStateKey.toString()
            }
        } else {
            address = patientAddressType.filter((address) => address.addressId === schedulePreferencesObj.selectedAddressKey)
            address = address && address.length > 0 ? address[0] : {}
        }
        let addressType = !address.addressType ? "" : address.addressType,
         street = !address.street ? 0 : address.street,
         city = !address.city ? 0 : address.city,
         zip = !address.zip ? 0 : address.zip,
         state = !address.stateId ? 0 : address.stateId.toString(),
         {userState} = getState().authState,
         {patientId} = userState;

        if (userState.userInfo.userType === USER_TYPES.CARE_TEAM){
            patientId = userState.selectedPatientInfo.patientId
        }
        let postData = {
            "serviceRequestDescription": additionalDescription,
            "serviceCategoryId": selectedServiceCategoryId,
            patientId,
            "serviceProviderId": 0,
            "statusId": 1,
            isRecurring,
            recurringPattern,
            startDate,
            endDate,
            "occurence": occurrences,
            genderPreference,
            "isActive": true,
            "minimumServiceProviderExperience": minimumServiceProviderExperience === 5 ? 0 : minimumServiceProviderExperience,
            maximumServiceProviderExperience,
            "serviceTypes": serviceTypesFiltered,
            "serviceRequestSlot": slots,
            "patientAddress": {
                "addressTypeId": addressType,
                "streetAddress": street,
                city,
                "zipCode": zip,
                "stateId": state
            },
            "patientAddressId": schedulePreferencesObj.selectedAddressKey >= 0 ? schedulePreferencesObj.selectedAddressKey : "0"
          
        }

        ServiceRequestPost(API.servicerequest, postData).then((resp) => {
            if (spId){
                dispatch(engageSp(resp.data, spId, onSuccessApprovalRequest, onSuccessPostedRequest))
            } else {
                onNxt && onNxt()
                dispatch(changeAPIStatus(API_SUCCESS))
            }
            if (resp && resp.data){
                if (global.selectedTab === SERVICEPROVIDERS_REQUESTS) {
                    dispatch(getPatientRequests())
                } else {
                    const {selectedStatusId} = getState.dashboardState.dashboardState

                     if (selectedStatusId === ALL || selectedStatusId === OPEN_STATUS){
                         dispatch(getPatientServiceRequestDetail(selectedStatusId))
                     }
                     dispatch(getSortFilter(initialState))
                }
            }
        })
.catch((err) => {
            dispatch(changeAPIStatus(API_FAILED));
        })
    }
}
