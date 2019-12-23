
import FORM_CONSTANTS from '../FormConstants'


import {isValid} from '../../../../utils/validations'

const localValidations = (values) => {
    let errors = {},
     isStreetValid = isValid(values[FORM_CONSTANTS.STREET]),
     isCityValid = isValid(values[FORM_CONSTANTS.CITY]),
     isStateValid = isValid(values[FORM_CONSTANTS.STATE]),
     isZipCodeValid = isValid(values[FORM_CONSTANTS.ZIP_CODE])
    // let isValidAddressType = isValid(values[FORM_CONSTANTS.ADDRESS_TYPE])

    // if(isValidAddressType.display_error){
    //     errors[FORM_CONSTANTS.ADDRESS_TYPE] = isValidAddressType.error_msg + FORM_CONSTANTS.ADDRESS_TYPE
    // }

    if (isStreetValid.display_error){
        errors[FORM_CONSTANTS.STREET] = isStreetValid.error_msg + FORM_CONSTANTS.STREET
    }

    if (isCityValid.display_error){
        errors[FORM_CONSTANTS.CITY] = isCityValid.error_msg + FORM_CONSTANTS.CITY
    }

    if (isStateValid.display_error){
        errors[FORM_CONSTANTS.STATE] = isStateValid.error_msg + FORM_CONSTANTS.STATE
    }

    if (isZipCodeValid.display_error){
        errors[FORM_CONSTANTS.ZIP_CODE] = isZipCodeValid.error_msg + FORM_CONSTANTS.ZIP_CODE
    }

  
    if (values[FORM_CONSTANTS.ZIP_CODE] && values[FORM_CONSTANTS.ZIP_CODE].length !== 5){
        errors[FORM_CONSTANTS.ZIP_CODE] = "Zip code must be 5 digit number"
    }

    return errors
}

export default localValidations
