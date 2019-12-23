import React, {Component} from 'react'
import {connect} from 'react-redux'
import {TouchableOpacity} from 'react-native'
import {getServiceCategories} from '../../../../../redux/visitHistory/VisitServiceDetails/actions'
import { CoreoText, CoreoScrollView, FloatingLabelPicker } from '../../../../../components';
import {_} from '../../../../../utils/validations'
import styles from './styles'
import { generatePickerValues, normalizeData } from '../../../../../utils/appUtils';

class ServiceCategoryFilters extends Component{
    componentDidMount(){
        const {serviceCategories} = this.props
        if(_.isNil(serviceCategories)){
            this.props.getServiceCategories()
        }
    }

    renderFilter = () => {
        const {serviceCategories, selectedServiceCategoryId, onChangeCategory, editable} = this.props
        if(_.isNil(serviceCategories)) return null
        let normalizedCategories = normalizeData(serviceCategories, "serviceCategoryId")
        return(
            <FloatingLabelPicker
             editable={editable}
             placeholder="Select category"
             items={generatePickerValues(serviceCategories, "serviceCategoryDescription", "serviceCategoryId")}
             value={selectedServiceCategoryId}
             onChange={(item) => {normalizedCategories[item] && onChangeCategory(normalizedCategories[item])}}
            />
        )
    }

    render(){
       const {selectedServiceCategories,editable, serviceCategories,selectedServiceCategoryId, onPressCategory} = this.props
       let serviceItems = null;
       serviceCategories && serviceCategories.map((service, index) => {
           if(service.serviceTypeTasks && service.serviceTypeTasks.length === 0) return null
           if(selectedServiceCategoryId === service.serviceCategoryId){
                serviceItems =  service.serviceTypeTasks.map((serviceType, iter) => {
                return editable || (!editable && !_.isNil(selectedServiceCategories[serviceType.serviceTypeId])) ? <TouchableOpacity key={index} onPress={() => editable && onPressCategory(serviceType.serviceTypeId)} style={[styles.skillItemContainer, !_.isNil(selectedServiceCategories[serviceType.serviceTypeId]) ? styles.selectedItem : {}]} key={iter}>
                        <CoreoText style={styles.skillItem}>{serviceType.serviceTypeDescription}</CoreoText>
                    </TouchableOpacity> : null
            })
           }
        })
        return (
            <CoreoScrollView style={[styles.container,styles.horizontalPadding]}>
                <CoreoText style={styles.text}>Select Service Category</CoreoText>
                {this.renderFilter()}
                {serviceItems}
            </CoreoScrollView>
        )
    }
}

function mapStateToProps(state) {
    let vistServiceHistoryState = state.visitHistoryState && state.visitHistoryState.vistServiceHistoryState
    return {
        serviceCategories: vistServiceHistoryState ? vistServiceHistoryState.serviceCategories : []
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getServiceCategories: () => dispatch(getServiceCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceCategoryFilters)

