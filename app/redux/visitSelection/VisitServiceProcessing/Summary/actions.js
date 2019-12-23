import { API } from '../../../../services/api';
import {Get, Put, serviceUrl} from '../../../../services/http'
import { startLoading, endLoading } from '../../../loading/actions';
import moment from 'moment'
import { API_FETCHING, API_FAILED, API_SUCCESS } from '../../../../constants/AppAPIConstants';
import { DEFAULT_TIME_DURATION } from '../../../../constants/constants';
import { getAPIBasedOnUserType } from '../../../../utils/AppAPIUtils';

export const SummaryDetails = {
    getSummaryDetailsSuccess: 'get_summary_details_success/summarydetails',
    getCalculationsData: 'get_calculations_data/summarydetails',
    saveOriginalTimeDiff: 'save_original_time_diff/summarydetails',
    saveActualTimeDiff: 'save_actual_time_diff/summarydetails',
    changeAPIStatus: "changeAPIStatus/summarydetails"
};

const getDoubleDigitTime = (value) => {
    let updatedValue = value

    if (updatedValue.toString().length < 2){
        updatedValue = `0${updatedValue}`
    }
    return updatedValue
}

export const getSummaryDetailsSuccess = (data) => ({
        type: SummaryDetails.getSummaryDetailsSuccess,
        data
    })

export const getCalculationsData = (data) => ({
        type: SummaryDetails.getCalculationsData,
        data
    })

export const saveOriginalTimeDiff = (data) => ({
        type: SummaryDetails.saveOriginalTimeDiff,
        data
    })

export const saveActualTimeDiff = (data) => ({
        type: SummaryDetails.saveActualTimeDiff,
        data
    })

export const changeAPIStatus = (data) => ({
        type: SummaryDetails.changeAPIStatus,
        data
    })

export function getSummaryDetails(data, isPlanVisit) {
    return (dispatch) => {
        dispatch(changeAPIStatus(API_FETCHING))
        Get(getAPIBasedOnUserType(API.getSummaryDetails, isPlanVisit) + data, serviceUrl).then((resp) => {
            dispatch(getSummaryDetailsSuccess(resp.data));
            dispatch(calculationsFirstTime(resp.data))
            dispatch(changeAPIStatus(API_SUCCESS))
        })
.catch((err) => {
            dispatch(changeAPIStatus(API_FAILED))
        })
    }
}

export function calculationActualData(data) {
    return (dispatch, getState) => {

        const currState = getState().visitSelectionState.VisitServiceProcessingState.SummaryState;
        let duration = moment.duration(currState.actualTimeDiff),

         hours = duration.days() * 24 + duration.hours(),

         min = duration.minutes(),
         sec = duration.seconds(),


         totalChargableTime = `${getDoubleDigitTime(hours)}:${getDoubleDigitTime(min)}`, //+ ":" + getDoubleDigitTime(sec)

         hoursinMin = duration.asMinutes();
        
        duration = moment.duration(currState.originalTimeDiff)
        hours = duration.days() * 24 + duration.hours();
        min = duration.minutes();
        let uiTotalChargableTime = `${getDoubleDigitTime(hours)}:${getDoubleDigitTime(min)}`, //+ ":" + getDoubleDigitTime(sec)

         totalVisitCost = currState.hourlyRate / 60 * hoursinMin;

        if (totalVisitCost < 1){
            totalVisitCost = 1
        }
        if (data && data.serviceProvider && data.serviceProvider.isEntityServiceProvider){
            totalVisitCost = 0
        }
        
        let taxes = totalVisitCost * currState.taxPaid / 100,

         grandTotalAmount = parseFloat(totalVisitCost.toFixed(2)) + parseFloat(taxes.toFixed(2));

        const calculationdata = {
            totalChargableTime,
            totalVisitCost: totalVisitCost.toFixed(2),
            taxes: taxes.toFixed(2),
            grandTotalAmount: grandTotalAmount.toFixed(2),
            totalHours: hours,
            totalMinutes: min,
            uiTotalChargableTime
        }

        dispatch(getCalculationsData(calculationdata));
    }
}

export function calculationsFirstTime(data) {
    return (dispatch) => {
        const startTime = data.visitStartTime,
         endTime = data.visitEndTime;

        let startTimeinMs = moment(startTime),
         endTimeinMs = moment(endTime),

         timediffms,
         originalTimeDiff

        if (data.billedTotalDuration !== DEFAULT_TIME_DURATION) {
            let hms = data.billedTotalDuration,
             splits = hms.split(":")

            timediffms = (Number(splits[0]) * 60 * 60 + Number(splits[1]) * 60 + Number(splits[2])) * 1000
        } else {
            
            timediffms = endTimeinMs.diff(startTimeinMs, "milliseconds")
            
         }
         if (data.originalTotalDuration !== DEFAULT_TIME_DURATION){
            let hms = data.originalTotalDuration,
             splits = hms ? hms.split(":") : DEFAULT_TIME_DURATION.split(":")

            originalTimeDiff = (Number(splits[0]) * 60 * 60 + Number(splits[1]) * 60 + Number(splits[2])) * 1000
        } else {
            originalTimeDiff = timediffms
        }
        let dataObj = {
            timediffms,
            hourlyRate: data.hourlyRate,
            taxPaid: data.taxAmount,
            originalTimeDiff
        }

        dispatch(saveOriginalTimeDiff(dataObj));
        dispatch(calculationActualData(data));
    }
}

export function onUpdateTime(data) {
    return (dispatch) => {
        let min = data.hour * 60 + data.min,
         timediffms = moment.duration(min, 'm').asMilliseconds();

        dispatch(saveActualTimeDiff(timediffms));
        dispatch(calculationActualData());
    }
}

export function saveSummaryDetails(data) {
    return (dispatch) => {
        dispatch(startLoading());
        Put(`${API.saveSummaryDetails}/${data.serviceRequestVisitId}${data}`, serviceUrl).then((resp) => {
            dispatch(endLoading());
        })
.catch((err) => {
            dispatch(endLoading());
        })
    }
}



