import { SubmissionError, reset } from 'redux-form'

import localValidations from './localValidations'
import FormConstants from '../FormConstants';

const MALE_ID = 6,

sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function submit(values, fields, props) {
    return sleep(10).then(() => {
        const editFormLocalValidations = localValidations(values, props)
        if (editFormLocalValidations && Object.keys(editFormLocalValidations).length > 0) {
            throw new SubmissionError(editFormLocalValidations)
        } else {
            const onSuccess = () => {
                props.onBack()
                props.dispatch(reset(FormConstants.EDIT_PERSONAL_DETAILS_FORM))
            },
             {genderList} = props,
             {personalDetails} = props.navigation.state.params,	
             coreoHomeUserId = personalDetails && personalDetails.coreoHomeUserId && personalDetails.coreoHomeUserId	
            let guardianUserId = coreoHomeUserId,
             gender = genderList[MALE_ID]

            if (genderList[values[FormConstants.GENDER]]) {
                gender = genderList[values[FormConstants.GENDER]]
            }
            props.updatePersonalDetail({...values, gender},
                onSuccess, guardianUserId)
        }
    })
}
export default submit
