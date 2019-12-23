import React, {Component} from 'react'
import {connect} from 'react-redux'
import {TouchableOpacity, View} from 'react-native'
import styles from './styles'
import {getSkills} from '../../../../../redux/serviceProvidersTab/requestsTab/actions'
import { CoreoText, CoreoScrollView } from '../../../../../components';
import {_} from '../../../../../utils/validations'
import { setValueBasedOnHeight } from '../../../../../utils/deviceDimensions';

class Skills extends Component {
    renderSkills = () => {
        const {skills, selectedSkills, onClickSkill} = this.props
        let skillItems = skills && skills.map((skill, iter) => {
            return (
                <TouchableOpacity onPress={() => onClickSkill(skill)} style={[styles.skillItemContainer, !_.isNil(selectedSkills[skill.id]) ? styles.selectedItem : {}]} key={iter}>
                    <CoreoText style={styles.skillItem}>{skill.name}</CoreoText>
                </TouchableOpacity>
            )  
        })
        return <View style={styles.items}>{skillItems}</View>
    }

    render(){
        return (
            <View style={styles.container}>
                <CoreoText style={styles.title}>Select Skills</CoreoText>
                <CoreoScrollView style={{marginBottom:setValueBasedOnHeight(13)}}>
                {this.renderSkills()}
                </CoreoScrollView>
            </View>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        getSkills: () => dispatch(getSkills()),
    }
}

function mapStateToProps(state){
    return {
        skills: state.DashboardState && state.DashboardState.dashboardState.lookupDetails.skill,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Skills)