import { _ } from '../../../utils/validations'
import FormConstants from '../../../screens/EditProfile/EditPersonalDetails/FormConstants'
import { getSelectedPatientInfo } from '../../../utils/userUtil';
export const ACTION_MODEL = {
  UPDATE_DATA: 'UPDATE_DATA',
  ADD_DATA: 'ADD_DATA',
  UPDATE_DATA_GUARDIAN: 'UPDATE_DATA_GUARDIAN'
}

export const getModal = (data, action, getState) => {
  let updatedPhoneNumber = data[FormConstants.PHONE]
  let updatedEmergencyNumber = data[FormConstants.EMERGENCY_CONTACT]
  if (!_.isNil(updatedPhoneNumber) && updatedPhoneNumber.length) {
    updatedPhoneNumber = updatedPhoneNumber.replace(/-/g, "")
  }
  if (!_.isNil(updatedEmergencyNumber) && updatedEmergencyNumber.length) {
    updatedEmergencyNumber = updatedEmergencyNumber.replace(/-/g, "")
  }
  switch (action) {
    case ACTION_MODEL.UPDATE_DATA:
      let PATIENT_ID = getState().authState.userState.patientId;

      return {
        patientId: PATIENT_ID,
        description: data[FormConstants.DESCRIPTION],
        firstName: data[FormConstants.FIRST_NAME],
        lastName: data[FormConstants.LAST_NAME],
        genderId: data.gender.id ? data.gender.id.toString() : "",
        genderName: data.gender.name,
        phoneNumber: updatedPhoneNumber,
        isActive: true,
        rowversionId: '',
        age: data[FormConstants.AGE],
        emergencyContact:updatedEmergencyNumber
      }
    case ACTION_MODEL.UPDATE_DATA_GUARDIAN:
      let USER_ID = getState().authState.userState.userId;

      return {
        coreoHomeUserId: USER_ID,
        age: data[FormConstants.AGE],
        description: data[FormConstants.DESCRIPTION],
        firstName: data[FormConstants.FIRST_NAME],
        genderId: data.gender.id ? data.gender.id.toString() : "",
        genderName: data.gender.name,
        isActive: true,
        lastName: data[FormConstants.LAST_NAME],
        patientId: getSelectedPatientInfo().patientId,
        contactNumber: updatedPhoneNumber,
        rowversionId: ""
      }
    default:
      return {}
  }
}
