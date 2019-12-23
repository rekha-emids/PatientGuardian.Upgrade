import {
    Requirements
} from './actions';
import { API_INITIAL } from '../../../constants/AppAPIConstants';

const defaultState = {
    requirementList: [],
    typeList: [],
    requirementObj: {},
    selectedServiceCategoryId: 1,
    getServiceCategoryStauts: API_INITIAL,
    getServiceTypesStatus: API_INITIAL
},

 requirementsState = (state = defaultState, action) => {
    switch (action.type) {
        case Requirements.getServiceCategorySuccess:
        return {
            ...state,
            requirementList: action.data,
            selectedServiceCategoryId: action.data[0].serviceCategoryId
        };
        case Requirements.getServiceTypeSuccess:
        case Requirements.getServiceTaskSuccess:
        return {
            ...state,
            typeList: {
                ...state.typeList,
                [action.data.categoryId]: action.data.data
            }
        };
        case Requirements.nextClick: {
            return {
                ...state,
                requirementObj: action.data
            };
        }
        case Requirements.onChangeSelectedCategoryId:
            return {
                ...state,
                selectedServiceCategoryId: action.data
            }
        case Requirements.onCheckServiceType:
        const {selectedServiceCategoryId} = state
        let typeList = {...state.typeList}
        let count = typeList[selectedServiceCategoryId][action.data].serviceTask && typeList[selectedServiceCategoryId][action.data].serviceTask.filter((task) => task.isDefault).length
        let selected = !typeList[selectedServiceCategoryId][action.data].selected
        let serviceTasks = typeList[selectedServiceCategoryId][action.data].serviceTask

        if (count === 0){
          serviceTasks = typeList[selectedServiceCategoryId][action.data].serviceTask.map((task) => ({
                    ...task,
                    isDefault: task.isByDefaultSelected
                }))
        }
        typeList[selectedServiceCategoryId] = {
            ...typeList[selectedServiceCategoryId],
            [action.data]: {
                ...typeList[selectedServiceCategoryId][action.data],
                selected,
                serviceTask: serviceTasks
            }
        }
            return {
                ...state,
                typeList
            }
        case Requirements.onCheckServiceTask:
            const {id, index} = action.data
            const categoryId = state.selectedServiceCategoryId
            let serviceTypes = {...state.typeList}

            serviceTypes[categoryId][id].serviceTask[index].isDefault = !serviceTypes[categoryId][id].serviceTask[index].isDefault
            let tasks = serviceTypes[categoryId][id].serviceTask && serviceTypes[categoryId][id].serviceTask.filter((task) => task.isDefault).length

            if (tasks === 0){
                serviceTypes[categoryId][id].selected = false
            }
            return {
                ...state,
                typeList: serviceTypes
            }
        case Requirements.changeAPIStatus: 
            return {
                ...state,
                [action.data.key]: action.data.status
            }
        case Requirements.cancelClick:
        return defaultState;
        case Requirements.setDefaultServiceType:
            let serviceCategoryId = Object.keys(state.typeList)[0]
            let serviceTypeId = state.typeList && state.typeList[serviceCategoryId] ? Object.keys(state.typeList[serviceCategoryId])[0] : null

            if (serviceTypeId){
                return {
                    ...state,
                    typeList: {
                        ...state.typeList,
                        [serviceCategoryId]: {
                            ...state.typeList[serviceCategoryId],
                            [serviceTypeId]: {
                                ...state.typeList[serviceCategoryId][serviceTypeId],
                                selected: true
                            }
                        }
                    }
                }
            }
            return state
        default:
        return state;
    }
}

export default requirementsState;
