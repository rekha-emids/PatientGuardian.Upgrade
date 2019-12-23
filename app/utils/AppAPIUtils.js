
import {
  API_INITIAL,
  API_FETCHING,
  API_PAGINATION_FETCHING,
  API_SUCCESS,
  API_FAILED,
  API_CLIENT_ERROR,
  API_CLIENT_UNAUTH_ERROR,
  API_SERVER_ERROR,
  API_TIMEOUT_ERROR,
  API_CONNECTION_ERROR,
  API_NETWORK_ERROR,
  API_CANCEL_ERROR,
  API_PAGINATION_FINISHED,
  API_SCREEN_SPECIFIC_ERROR,
  LOAD_MORE,
  REFRESH,
  API_REFRESH_FETCHING,
  INIT
} from '../constants/AppAPIConstants'
import { API } from '../services/api';


/**
 * API Status Methods
 */

export function getLoadingStatusForRedux (requestType) {
  switch (requestType) {
    case LOAD_MORE:
      return API_PAGINATION_FETCHING
    case REFRESH:
      return API_REFRESH_FETCHING
    default:
      return API_FETCHING
  }
}

export function getUpdatedDataForRedux (requestType, data, response) {
  switch (requestType) {
    case LOAD_MORE:
      let updatedData = data.concat(response)

      return updatedData
    case REFRESH:
    default:
      return response
  }
}

export function isAPISuccess (...args) {
  const status = true

  return Array.from(args).reduce((returnStatus, item) => returnStatus && parseInt(item, 10) === API_SUCCESS, status)
}

export const isAPIFailed = (...args) => {
  // Checks if the given status matches any error code
  let status = true

  const standardErrors = [
    API_FAILED,
    API_CLIENT_ERROR,
    API_CLIENT_UNAUTH_ERROR,
    API_SERVER_ERROR,
    API_TIMEOUT_ERROR,
    API_CONNECTION_ERROR,
    API_NETWORK_ERROR,
    API_CANCEL_ERROR,
    API_SCREEN_SPECIFIC_ERROR
  ]

  return Array.from(args).reduce(
    (returnStatus, item) => returnStatus || parseInt(item, 10) === API_FAILED,
    status
  )
}

export const isAnyOfAPIFailed = (...args) => {
  let status = false
  const standardErrors = [
    API_FAILED,
    API_CLIENT_ERROR,
    API_CLIENT_UNAUTH_ERROR,
    API_SERVER_ERROR,
    API_TIMEOUT_ERROR,
    API_CONNECTION_ERROR,
    API_NETWORK_ERROR,
    API_CANCEL_ERROR,
    API_SCREEN_SPECIFIC_ERROR
  ]

  return Array.from(args).reduce(
    (returnStatus, item) => returnStatus || standardErrors.includes(parseInt(item, 10)),
    status
  )
}

/**
  Takes only network call status of multiple calls and
  returns true if any one of them is in loading condition
*/

export function isAPIFetching (...args) {
  const status = false

  return Array.from(args).reduce(
    (returnStatus, item) => returnStatus || parseInt(item, 10) === API_FETCHING,
    status
  )
}

export function isAPIPaginationFetching (...args) {
  const status = false

  return Array.from(args).reduce(
    (returnStatus, item) => returnStatus || parseInt(item, 10) === API_PAGINATION_FETCHING,
    status
  )
}

export function isAPIRefreshFetching (...args) {
  const status = false

  return Array.from(args).reduce(
    (returnStatus, item) => returnStatus || parseInt(item, 10) === API_REFRESH_FETCHING,
    status
  )
}

export function isAPIInitial (...args) {
  const status = false,
   initialStatus = Array.from(args).reduce(
    (returnStatus, item) => returnStatus || parseInt(item, 10) === API_INITIAL,
    status
  )

  return initialStatus
}

export function getLoadingProgressStatus (...args) {
  if (isAPIFailed(args)) {
    return API_FAILED
  }
  return API_SUCCESS
}

function getAPIFailedStatus (...args) {
  let status = API_FAILED,
   statusArray = Array.from(args)

  statusArray.map((statusValue) => {
    if (statusValue === API_NETWORK_ERROR) {
      status = API_NETWORK_ERROR
    }
  })
  return status
}

// Need to check if it works properly for more than two arguments

export function isAPIPaginationFinished (...args) {
  let status = API_PAGINATION_FINISHED,
   statusArray = Array.from(args),
   count = statusArray.reduce((n, statusValue) => n + (statusValue === status), 0)

  if (count === statusArray.length) {
    return status
  } else {
    return API_SUCCESS
  }
}

export const getStatusBasedOnRequestType = (requestType) => {
  switch (requestType){
      case INIT:
          return API_FETCHING
      case LOAD_MORE:
          return API_PAGINATION_FETCHING
      case REFRESH:
          return API_REFRESH_FETCHING
  }
}
  
export function getLoadingStatus (...args) {
  if (isAPISuccess(...args)) {
    return API_SUCCESS
  } else if (isAnyOfAPIFailed(...args)) {
    let status = getAPIFailedStatus(...args)

    return status
  } else if (isAPIFetching(...args)) {
    return API_FETCHING
  } else if (isAPIPaginationFetching(...args)) {
    return API_PAGINATION_FETCHING
  } else if (isAPIRefreshFetching(...args)) {
    return API_REFRESH_FETCHING
  } else if (isAPIInitial(...args)) {
    return API_FETCHING
  } else if (isAPIPaginationFinished(...args)) {
    return isAPIPaginationFinished(...args) // API_PAGINATION_FINISHED
  }
  return API_SUCCESS
}

export const encodeQueryData = (data) => {
  let ret = []

  for (let d in data) {
    ret.push(`${encodeURIComponent(d)}=${encodeURIComponent(data[d])}`)
  }
  return ret.join('&')
}

export default {
  getLoadingProgressStatus,
  getLoadingStatus,
  isAPIFailed,
  isAPISuccess,
  isAPIFetching
}

export const getAPIBasedOnUserType = (api, isPlanVisit) => {
  if (!isPlanVisit) {
 return api 
}
  if (api === API.getServiceRequestPerformTasks){
    return API.getServicePlanPerformTasks
  } else if (api === API.getSummaryDetails){
    return API.getServicePlanSummaryDetails
  } else if (api === API.saveAnswers){
    return API.saveServicePlanAnswers
  } else if (api === API.cancelServiceVisit){
      return API.cancelServicePlanVisit
  }
  return api
}