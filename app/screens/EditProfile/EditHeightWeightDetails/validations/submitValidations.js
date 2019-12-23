import { SubmissionError, reset } from 'redux-form'

import localValidations from './localValidations'
import FormConstants from '../FormConstants';

sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function submit(values, fields, props) {
    return sleep(10).then(() => {
        const editFormLocalValidations = localValidations(values)

        if (editFormLocalValidations && Object.keys(editFormLocalValidations).length > 0) {
            throw new SubmissionError(editFormLocalValidations)
        } else {
            const onSuccess = () => {
                props.onBack()
                props.dispatch(reset(FormConstants.EDIT_HEIGHTWEIGHT_DETAILS_FORM))
            }
            const data = {
                height: parseFloat(values[FormConstants.HEIGHT]).toFixed(2),
                weight: parseFloat(values[FormConstants.WEIGHT]).toFixed(2)
            }

            props.updateHeightWeightDetails(data, onSuccess)
        }
    })
}
export default submit
