import React, {Component} from 'react'
import {View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import styles from './styles';
import { CoreoText } from '../../../../../components';
import {getGender} from '../../../../../redux/serviceProvidersTab/requestsTab/actions'
import { PREFERENCE_ID, NOT_DISCLOSED, NO_PREFERENCE } from '../../../../../constants/constants';


class Gender extends Component{
    componentDidMount(){
        this.props.getGender()
    }

    render(){
        const {genderDetails, showNotDisclosedGender, selectedGender, onChangeSelectedGender, showOthersGender} = this.props
       let genders = genderDetails && genderDetails.map((gender, index) => {
           let isSelected = selectedGender === gender.name || selectedGender === NOT_DISCLOSED,
            genderType = gender.name

           if (Number(gender.id) === PREFERENCE_ID){
            genderType = NO_PREFERENCE
            if (showOthersGender){
                genderType = gender.name
            }
            if (showNotDisclosedGender){
                genderType = NOT_DISCLOSED
            }
           }
            return (
                <TouchableOpacity onPress={() => onChangeSelectedGender(gender)} style={[
styles.serciceAreaItem,
isSelected ? styles.selectedItem : {}
]} key={index}>
                    {isSelected
                            ? <View style={styles.areaSelected}>
                                <View style={styles.selected}/>
                            </View>
                         : <View style={styles.areaNotSelected}/>
                    }
                    <View style={styles.dataView}>
                        <CoreoText style={styles.text}>{genderType}</CoreoText>
                    </View>
                    
                </TouchableOpacity>
            )
        })

        return (
            <View style={styles.container}>
                <CoreoText style={styles.title}>Select Gender</CoreoText>
                <View style={styles.areaMarginTop}>
                    {genders}
                </View>
            </View>
        )
    }
}

function mapStateToProps(state){
    let serviceProvidersTabState = state.serviceProvidersTabState

    return {genderDetails: serviceProvidersTabState ? state.serviceProvidersTabState.requestsState.gender : []}
}

function mapDispatchToProps(dispatch){
    return {getGender: () => dispatch(getGender())}
}

export default connect(mapStateToProps, mapDispatchToProps)(Gender)