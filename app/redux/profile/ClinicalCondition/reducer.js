import {
    ClinicalCondition
} from './actions'
import {normalizeData} from '../../../utils/appUtils'
import { API_INITIAL } from '../../../constants/AppAPIConstants';

const defaultState = {
    clinicalConditionList: [],
    selectedClinicalConditionList: [],
    selectedClinicalConditionsList: [],
    updateClinicalCondition: [],
    impersonatedClinicalDetails: {},
    isLoading: API_INITIAL
},

 ClinicalConditionState = (state = defaultState, action) => {
    let impersonatedClinicalDetails = {}

    switch (action.type) {
        case ClinicalCondition.getClinicalConditionSuccess:
            return {
                ...state,
                clinicalConditionList: action.data
            }; 
        case ClinicalCondition.getSelectedClinicalConditionDetails:
        let updatedClinicalDetails = {}
        let details = {
            selectedClinicalConditionsList: action.data.data,
            updateClinicalCondition: normalizeData(action.data.data, "attributeId"),
            patientId: action.data.id
        }

        updatedClinicalDetails = details
                if (Number(action.data.id) !== Number(global.currentUserPatientId)){
                    updatedClinicalDetails = {
                    impersonatedClinicalDetails: {
                        ...state.impersonatedClinicalDetails,
                        [action.data.id]: {
                        ...state.impersonatedClinicalDetails[action.data.id],
                        ...details
                        }
                        }
                    }
                }
            return {
                ...state,
               ...updatedClinicalDetails
            }; 

            case ClinicalCondition.addClinicalCondition:
            const {params} = action.data
            let clinicalCondition = {...state.updateClinicalCondition};

            if (params.id !== global.currentUserPatientId){
                clinicalCondition = {...state.impersonatedClinicalDetails[params.id].updateClinicalCondition}
            }
            if (!clinicalCondition[action.data.data.attributeId]) {
                clinicalCondition = {
                    ...clinicalCondition,
                    [action.data.data.attributeId]: action.data.data
                }
            } else {
                delete clinicalCondition[action.data.data.attributeId]
            }
            let updatedDetails = {updateClinicalCondition: clinicalCondition}

            if (params.id !== global.currentUserPatientId){
                updatedDetails = {
                    impersonatedClinicalDetails: {
                        [params.id]: {
                            ...state.impersonatedClinicalDetails[params.id],
                            updateClinicalCondition: clinicalCondition
                        }
                    }
                }
            }
            return {
                ...state,
                ...updatedDetails
            }
            case ClinicalCondition.resetUpdatedClinicalCondition:
                return {
                    ...state,
                    updateClinicalCondition: action.data
                }
            case ClinicalCondition.GET_SELECTED_CLINICAL_CONDITION_SUCCESS:           
            return {
                ...state,
                selectedClinicalConditionsList: action.data
            }; 
            case ClinicalCondition.loadingStatus:
                return {
                    ...state,
                    isLoading: action.data
                }
        default:
            return state;
    }
}

export default ClinicalConditionState;