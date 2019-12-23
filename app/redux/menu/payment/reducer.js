import {
    paymentsCardList
} from './actions'
import { paymentStatus } from '../../../constants/constants';

const defaultState = {
    CardList: null,
    paymentStatus: paymentStatus.IN_PROGRESS
},

 PaymentsState = (state = defaultState, action) => {
    switch (action.type) {

        case paymentsCardList.getPaymentsCardListSuccess:
            return {
                ...state,
                CardList: action.data
            };
        default:
            return state;
    }
}

export default PaymentsState;