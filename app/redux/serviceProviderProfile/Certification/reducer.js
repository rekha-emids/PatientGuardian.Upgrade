import {
    Certification
} from './actions'
import { API_INITIAL } from '../../../constants/AppAPIConstants';

const defaultState = {
    certificationList: null,
    getCertificationStatus: API_INITIAL
},

 CertificationState = (state = defaultState, action) => {
    switch (action.type) {

        case Certification.getCertificationSuccess:
            return {
                ...state,
                certificationList: action.data
            };

        case Certification.changeAPIStatus:
            return {
              ...state,
              getCertificationStatus: action.data
            }
        case Certification.clearCertificationState:
            return defaultState;

        default:
            return state;
    }
}

export default CertificationState;
