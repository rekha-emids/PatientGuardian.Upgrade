import { SubmissionError, reset } from 'redux-form'

import localValidations from './localValidations'
import FormConstants from '../FormConstants';


const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function submit(values, fields, props) {
    return sleep(10).then(() => {
        const editFormLocalValidations = localValidations(values)

        if (editFormLocalValidations && Object.keys(editFormLocalValidations).length > 0) {
            throw new SubmissionError(editFormLocalValidations)
        } else {
            const onSuccess = () => {
                props.onBack()
                props.dispatch(reset(FormConstants.EDIT_POINT_OF_SERVICE_FORM))
            }

            props.updatePointService({...values, addressId: props.addressId}, onSuccess)
        }
    })
}
export default submit
