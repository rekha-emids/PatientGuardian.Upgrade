
import FORM_CONSTANTS from '../FormConstants'
import {isValid} from '../../../../utils/validations'

const localValidations = (values) => {
    let errors = {},

    isHeightValid = isValid(values[FORM_CONSTANTS.HEIGHT]),
    isWeightValid = isValid(values[FORM_CONSTANTS.WEIGHT])
    
    if (isHeightValid.display_error) {
        errors[FORM_CONSTANTS.HEIGHT] = isHeightValid.error_msg + FORM_CONSTANTS.HEIGHT
    }

    if (isWeightValid.display_error) {
        errors[FORM_CONSTANTS.WEIGHT] = isWeightValid.error_msg + FORM_CONSTANTS.WEIGHT
    }

    return errors
}

export default localValidations
