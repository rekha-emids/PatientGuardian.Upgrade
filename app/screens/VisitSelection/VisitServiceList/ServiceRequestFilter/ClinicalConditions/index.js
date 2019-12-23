import React, {Component} from 'react'
import {connect} from 'react-redux'
import {TouchableOpacity, View} from 'react-native'
import styles from './styles'
import {getCareTeamClinicalConditions} from '../../../../../redux/careTeam/Dashboard/actions'
import { CoreoText, CoreoScrollView } from '../../../../../components';
import {_} from '../../../../../utils/validations'

class ClinicalConditions extends Component {

    componentDidMount(){
        const {clinicalConditions} = this.props
        if(!clinicalConditions){
            this.props.getCareTeamClinicalConditions()
        }
    }

    renderClinicalConditions = () => {
        const {clinicalConditions, selectedClinics, onClickClinicalCondition} = this.props
        let clinicItems = clinicalConditions && clinicalConditions.map((clinic, iter) => {
            return (
                <TouchableOpacity onPress={() => onClickClinicalCondition(clinic.attributeId)} style={[styles.skillItemContainer, !_.isNil(selectedClinics[clinic.attributeId]) ? styles.selectedItem : {}]} key={iter}>
                    <CoreoText style={styles.skillItem}>{clinic.attributeName}</CoreoText>
                </TouchableOpacity>
            )  
        })
        return <View style={styles.items}>{clinicItems}</View>
    }

    render(){
        return (
            <View style={styles.container}>
                <CoreoText style={styles.title}>Select Clinical Conditions</CoreoText>
                <CoreoScrollView>
                {this.renderClinicalConditions()}
                </CoreoScrollView>
            </View>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        getCareTeamClinicalConditions: () => dispatch(getCareTeamClinicalConditions()),
    }
}

function mapStateToProps(state){
    let careteamState = state.careTeamState
    return {
        clinicalConditions: careteamState ? careteamState.dashboardState.clinicalConditions : []
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClinicalConditions)