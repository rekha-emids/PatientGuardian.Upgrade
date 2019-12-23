import React from 'react'
import {Linking} from 'react-native'
import Images from '../assets/images/index'
import {Platform} from 'react-native'
import { INIT, API_FETCHING, LOAD_MORE, API_PAGINATION_FETCHING, REFRESH, API_REFRESH_FETCHING } from '../constants/AppAPIConstants';
import { SLOT_FORMAT, USER_TYPES, WEEKLY_ID, DEFAULT_DAILY_ID } from '../constants/constants';
import { _ } from './validations';

export const isIOS = () => Platform.OS === 'ios'

export const removeDuplicateElementsFromArray = (arr) => arr.filter((v, i) => arr.indexOf(v) === i)

export const checkKitkat = () => Platform.Version > 19



export const caseInsensitiveComparer = (param1, param2) =>{
    if(_.isNil(param1) || _.isNil(param2)) return false;
    return param1.toString().toLowerCase() === param2.toString().toLowerCase();
}

export const getSlot = (slot) => {
    if (slot && slot.length){
        switch (slot.toString().toLowerCase()){
            case SLOT_FORMAT.MORNING:
                return "9:00 AM"
            case SLOT_FORMAT.AFTERNOON:
                return "12:00 PM"
            case SLOT_FORMAT.EVENING:
                return "5:00 PM"
            default:
                return "9:00 AM"
        }
    }
}

export const numericComparer = (param1, param2) => param1 === param2

export const getFullName = (firstName, lastNname) => `${firstName} ${lastNname}`

export const normalizeData = (data, key) => {
    let normalizedData = {}

   data && data.map((item, index) => {
        let objectKey = item[key]

        normalizedData = {
                ...normalizedData,
                [objectKey]: item 
            }
    })
    return normalizedData;
}

export const getArrayFromNormalizedData = (data) => {
    let arrayData = [];

    if (data){
        Object.keys(data).map((key) => {
            arrayData.push(data[key])
        })
    }
    return arrayData;
}

export const getArrayFromNormalizedDataKey = (data) => {
    let arrayData = [];

    if (data){
        Object.keys(data).map((key) => {
            arrayData.push(data[key].id)
        })
    }
    return arrayData;
}

export const generatePickerValues = (data, labelKey, valueKey) => {
    let pickerData = []

    if (labelKey && valueKey && data) {
        data.map((item) => {
            if (item.id != DEFAULT_DAILY_ID){
                pickerData.push({
 label: item[labelKey],
                    value: item[valueKey]
                })
            }
        })
    }
    return pickerData
}

export const getServiceOfferedImage = (serviceType) => {
    if (Images.ServiceOffered[serviceType]){
        return Images.ServiceOffered[serviceType]
    } else if (serviceType === "Food Delivery"){
        return Images.ServiceOffered.Food
    }
    return Images.ServiceOffered.Bathing
}

export const getServiceRequestCategoryImage = (id) => {
    if (Images.serviceRequestIcons[`serviceCategoryId${id}`]){
        return Images.serviceRequestIcons[`serviceCategoryId${id}`]
    }
    return Images.serviceRequestIcons.serviceCategoryId1
}

export const getServiceIcon = (service) => {
    if (Images.serviceIcons[service]){
        return Images.serviceIcons[service]
    }
    return Images.serviceIcons.serviceType12
}

export const getStatusBasedOnRequestType = (requestType) => {
    switch (requestType){
        case INIT:
            return API_FETCHING
        case LOAD_MORE:
            return API_PAGINATION_FETCHING
        case REFRESH:
            return API_REFRESH_FETCHING
        default:
            return API_FETCHING
    }
}
export const isEqualArray = (array1, array2) => {
    let is_same = array1.length == array2.length && array1.every((element, index) => element === array2[index]);

    return is_same
}

export const validateCoordinates = (address) => address.latitude && address.longitude

export function pushSpliceHandler(arr, value){
    let data = [...arr]
    let index = data.indexOf(value);

    index > -1 ? data.splice(index, 1) : data.push(value)
    return data
}

export function handleUrlClick(props, screen){
    let url = props.videoUrl
    const http = "http://";

    if (url){
        if (url && !url.trim().startsWith(http) || !url.trim().startsWith(http)){
            url = `${http}${url}`
        }
    
        Linking.canOpenURL(url).then((supported) => {
            if (supported) {
              Linking.openURL(url);
              props && screen && props.navigation.navigate(screen)
              props.updateIntroVideoLink(true)
            } 
          });
    }
}


export const isPlanVisit = (data) => {
    if (data && data.serviceProviderType === USER_TYPES.EU || data.planScheduleId || data.servicePlanVisitId) {
return true 
}
    return false
}

export const getServiceVisitId = (data) => data.serviceRequestVisitId || data.servicePlanVisitId

export const getServiceRequestId = (data) => data.serviceRequestId || data.patientId