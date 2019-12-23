import React, {Component} from 'react'
import {View} from 'react-native'
import styles from './styles'
import { CoreoText, CoreoCheckBox } from '../../../../../components';
import {_} from '../../../../../utils/validations'
import { THEME_PRIMARY_COLOR } from '../../../../../constants/theme';
import {connect} from 'react-redux'
import { updateRiskGroup } from '../../../../../redux/careTeam/Dashboard/actions';


class RiskGroup extends Component{
    constructor(props) {
        super(props)
    }

    onPress = (id) => {
        this.props.updateRiskGroup(id)
    }

    render(){
       let riskGroupList = this.props.riskGroup.map((item, index) => {
            return (
                <CoreoCheckBox
                    style={styles.checkboxRow}
                    checked={item.selected}
                    checkboxColor={THEME_PRIMARY_COLOR}
                    checkBoxStyle={styles.checkboxStyle}
                    textStyle={styles.statusTitle}
                    statusTextView={styles.statusTextView}
                    onPress={() => this.onPress(item.id)}
                >
                    {item.name}
                </CoreoCheckBox>
            )
        })
        return (
            <View style={styles.statusView}>
                <CoreoText style={styles.text}>Select Risk Group</CoreoText>
                {riskGroupList}
            </View>
        )
    }
}

const mapStateToProps = (state) =>{
    let careTeamState = state.careTeamState.dashboardState
    return {
        riskGroup: careTeamState.riskGroup
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        updateRiskGroup: (id) => dispatch(updateRiskGroup(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RiskGroup)