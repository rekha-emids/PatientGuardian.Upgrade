import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {View, TouchableOpacity} from 'react-native'
import { CoreoText } from '../../../../../components';
import { isIOS } from '../../../../../utils/appUtils';
import Icon from '../../../../../components/Base/Icon';
import Icons from '../../../../../assets/Icons';
import {getCohort} from '../../../../../redux/careTeam/Dashboard/actions'
import {_} from '../../../../../utils/validations'
import styles from './styles'
import { setFontSize, setValueBasedOnHeight } from '../../../../../utils/deviceDimensions';
import { ListScrollerAPIWrapper } from '../../../../../components/LevelOne';

const Cohort = (props) => {
    let icon = isIOS() ? Icons.checkboxIos : Icons.checkboxAndroid
    const { name, selectedCohortIds, id, onPress} = props
    const onClickCohort = () => {
        onPress(id)
    }
    let checkBox = selectedCohortIds && !_.isNil(selectedCohortIds[id]) ? <Icon {...icon} size={setFontSize(18)} /> : <View style={styles.emptyCheckbox} />
    return (
        <TouchableOpacity onPress={onClickCohort} style={[styles.spDetails, styles.margin]}>
            {checkBox}
            <CoreoText style={[styles.text, styles.paddingText]}>{name}</CoreoText>
        </TouchableOpacity>
    )
}


class Cohorts extends PureComponent {
    apiCall = (requestObject) => {
        this.props.getCohort(requestObject.pageNumber, requestObject.pageSize)
    }

    render(){
        const {cohorts, onPress, selectedCohortIds} = this.props;
        return(
            <View style={styles.container}>
                <CoreoText style={styles.title}>Select Cohorts</CoreoText>
                <View style={{marginBottom: setValueBasedOnHeight(22)}}>
                <ListScrollerAPIWrapper
                    data={cohorts}
                    renderComponent={Cohort}
                    hasPaginationEnded={true}
                    apiSaga={this.apiCall}
                    onPress={onPress}
                    selectedCohortIds={selectedCohortIds}
                    pageSize={1000}
                /> 
                </View>
            </View>
        )
    }
}

function mapStateToProps(state){
    let careteamState = state.careTeamState
    return {
        cohorts: careteamState ? careteamState.dashboardState.cohorts : []
    }
}

function mapDispatchToProps(dispatch){
    return {
        getCohort: (pageNumber, pageSize) => dispatch(getCohort(pageNumber, pageSize))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cohorts)