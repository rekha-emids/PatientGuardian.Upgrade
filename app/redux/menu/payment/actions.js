import { API, paymentAPIUrl } from '../../../services/api';
import { Get, Delete, Put, asyncURL } from '../../../services/http';
import { startLoading, endLoading } from '../../loading/actions';
import { getSelectedPatientInfo, getUserInfo } from '../../../utils/userUtil';

export const paymentsCardList = {
    getPaymentsCardListSuccess: 'get_paymentsCardList_success/performtasks',
    changePaymentStatus: "change_payment_status/payment"
};

export const getPaymentsCardListSuccess = (data) => ({
        type: paymentsCardList.getPaymentsCardListSuccess,
        data
    })

export const changePaymentStatus = (data) => ({
        type: paymentsCardList.changePaymentStatus,
        data
    })

export function getpaymentsCardList(onSuccess, updateNetworkOnResponse) {
    return (dispatch, getState) => {
        let network = getState().networkReducer && getState().networkReducer.network;
        let PATIENT_ID = getSelectedPatientInfo() && getSelectedPatientInfo().patientId || getUserInfo() && getUserInfo().patientId

        Get(API.getSavedCards + PATIENT_ID, paymentAPIUrl).then((resp) => {
            if (!network){
                updateNetworkOnResponse && updateNetworkOnResponse(true)
            }
            dispatch(getPaymentsCardListSuccess(resp.data))
            onSuccess && onSuccess(resp.data)
        })
.catch((err) => {
        })
    }
}

export function deleteCard (id, isPrimary, onSuccess) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        const {patientId} = getState().authState && getState().authState.userState || {}

        Delete(`${API.deleteCard}${id}/${patientId}/${isPrimary}`, paymentAPIUrl).then((resp) => {
            dispatch(getpaymentsCardList())
            onSuccess && onSuccess()
            dispatch(endLoading());
        })
.catch((err) => {
            dispatch(endLoading());
        })
    }
}


export function primaryCard(id, isPrimary){
    return (dispatch, getState) => {
        const {patientId} = getState().authState && getState().authState.userState || {}

        dispatch(startLoading())
        Put(`${API.makePrimaryCard}${id}/${patientId}`, null, asyncURL).then((resp) => {
            dispatch(getpaymentsCardList())
        })
.catch((err) => {
            dispatch(endLoading())
        })
    }
}