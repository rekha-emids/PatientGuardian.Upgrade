import { PersonalDetails } from './actions'
import {normalizeData} from '../../../utils/appUtils'
import { API_INITIAL } from '../../../constants/AppAPIConstants';

const defaultState = {
  personalDetail: null,
  updatePersonalDetailSuccess: false,
  cityDetail: [],
  genderDetail: [],
  imageData: '',
  profilePercentage: 0,
  isUser: false,
  impersonatedDetails: {},
  isLoading: API_INITIAL,
  getProfileStatus: API_INITIAL
},

 PersonalDetailState = (state = defaultState, action) => {
  let impersonatedDetails = {}

  switch (action.type) {
    case PersonalDetails.setUser:
      return {
        ...state,
        patientId: action.data.patientId,
        userId: action.data.userId ? action.data.userId : state.userId,
        userType: action.data.userType,
        isUser: action.data.isUser
      }
    case PersonalDetails.getPersonalDetailSuccess:
      let currentDetails = {personalDetail: action.data.data}
     let updatedPersonalDetails = currentDetails

      if (Number(action.data.id) !== Number(global.currentUserPatientId)){
        updatedPersonalDetails = {
          impersonatedDetails: {
            ...state.impersonatedDetails,
            [action.data.id]: {
              ...state.impersonatedDetails[action.data.id],
              ...currentDetails
            }
          }
        }
      }
      return {
        ...state,
        ...updatedPersonalDetails
      }

    case PersonalDetails.updatePersonalDetailSuccess:
      return {
        ...state,
        updatePersonalDetailSuccess: action.isSuccess
      }

    case PersonalDetails.getCitySuccess:
      return {
        ...state,
        cityDetail: action.data
      }

    case PersonalDetails.uploadImgSuccess:
      return {
        ...state,
        imageData: action.data
      }
    case PersonalDetails.getImageSuccess:
    let imageDetails = {imageData: action.data.data}
    let updateImageDetails = imageDetails

    if (Number(action.data.id) !== Number(global.currentUserPatientId)){
      updateImageDetails = {
        impersonatedDetails: {
          ...state.impersonatedDetails,
          [action.data.id]: {
            ...state.impersonatedDetails[action.data.id],
            ...imageDetails
          }
        }
      }
    }
      return {
        ...state,
        ...updateImageDetails
      }
    case PersonalDetails.getGenderSuccess:
      return {
        ...state,
        genderDetail: action.data,
        genderList: normalizeData(action.data, "id")
      }
    case PersonalDetails.getPersonalDetailGuardianSuccess:
    let details = {
      personalDetail: {
        firstName: action.data.data.firstName,
        lastName: action.data.data.lastName,
        age: action.data.data.age,
        genderName: action.data.data.genderName,
        description: action.data.data.description,
        phoneNumber: action.data.data.contactNumber,
        gender: [],
        addresses: []
      }
    }
    let updatedGuardianDetails = details

      if (Number(action.data.id) !== Number(global.currentUserPatientId)){
        updatedGuardianDetails = {
          impersonatedDetails: {
            ...state.impersonatedDetails,
            [action.data.id]: {
              ...state.impersonatedDetails[action.data.id],
              ...details
            }
          }
        }
      }
      return {
        ...state,
       ...updatedGuardianDetails
      }
    
      case PersonalDetails.getProfilePercentageSuccess:
      let percentageDetails = {profilePercentage: action.data.data}
      let updatePercentageDetails = percentageDetails

      if (Number(action.data.id) !== Number(global.currentUserPatientId)){
        updatePercentageDetails = {
          impersonatedDetails: {
            ...state.impersonatedDetails,
            [action.data.id]: {
              ...state.impersonatedDetails[action.data.id],
              ...percentageDetails
            }
          }
        }
      }
        return {
          ...state,
          ...updatePercentageDetails
        }
    case PersonalDetails.loadingStatus:
        return {
          ...state,
          isLoading: action.data
        }
    case PersonalDetails.changeAPIStatus:
        return {
          ...state,
          getProfileStatus: action.data
        }
    default:
      return state
  }
}

export default PersonalDetailState
