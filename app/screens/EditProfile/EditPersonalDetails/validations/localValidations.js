import FORM_CONSTANTS from '../FormConstants'
import {isValid} from '../../../../utils/validations'

const localValidations = (values,props) => {
    const { isPatient } = props.navigation.state.params
    let errors = {},
     isFirstNameValid = isValid(values[FORM_CONSTANTS.FIRST_NAME]),
     isLastNameValid = isValid(values[FORM_CONSTANTS.LAST_NAME]),
     isPhoneValid = isValid(values[FORM_CONSTANTS.PHONE]),
     isEmergencyContactValid = isValid(values[FORM_CONSTANTS.EMERGENCY_CONTACT])
    
    if (isFirstNameValid.display_error) {
        errors[FORM_CONSTANTS.FIRST_NAME] = isFirstNameValid.error_msg + FORM_CONSTANTS.FIRST_NAME
    }

    if (isLastNameValid.display_error) {
        errors[FORM_CONSTANTS.LAST_NAME] = isLastNameValid.error_msg + FORM_CONSTANTS.LAST_NAME
    }
    
    if (isPhoneValid.display_error) {
        errors[FORM_CONSTANTS.PHONE] = isPhoneValid.error_msg + FORM_CONSTANTS.PHONE
    } else if (values[FORM_CONSTANTS.PHONE] && values[FORM_CONSTANTS.PHONE].length < 12) {
        errors[FORM_CONSTANTS.PHONE] = `Please enter valid ${FORM_CONSTANTS.PHONE}`
    }
    if (values[FORM_CONSTANTS.AGE] && values[FORM_CONSTANTS.AGE].length > 2 && Number(values[FORM_CONSTANTS.AGE]) > 100){
        errors[FORM_CONSTANTS.AGE] = "Age must be below 100"
    }

    if (isPatient && isEmergencyContactValid.display_error) {
        errors[FORM_CONSTANTS.EMERGENCY_CONTACT] = isEmergencyContactValid.error_msg + FORM_CONSTANTS.EMERGENCY_CONTACT
    } else if (isPatient && values[FORM_CONSTANTS.EMERGENCY_CONTACT].length < 12) {
        errors[FORM_CONSTANTS.EMERGENCY_CONTACT] = `Please enter valid ${FORM_CONSTANTS.EMERGENCY_CONTACT}`
    }
    
    return errors
}

export default localValidations
