import React from "react";
import { connect } from 'react-redux';
import {View, Text, TouchableOpacity,InteractionManager} from 'react-native'
import Icon from '../../../components/Base/Icon'
import Header from '../Header/index'
import {CoreoImage} from '../../../components'
import { setFontSize } from '../../../utils/deviceDimensions';
import {getWorkHistory} from "../../../redux/serviceProviderProfile/WorkHistory/actions";
import styles from './styles'
import Images from "../../../assets/images";
import _ from 'lodash'
import Icons from "../../../assets/images/Icons";
import {getFormatedYear} from '../../../utils/momentUtil'
import EmptyText from '../EmptyText/index'
import { THEME_PRIMARY_COLOR } from "../../../constants/theme";

const SELECTED_WORK_HISTORY_ID = -1

class WorkHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedWorkHistoryId: SELECTED_WORK_HISTORY_ID
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.getWorkHistory(this.props.spId);
        });
    }

    onChangeSelectedWorkHistoryId = (id) => {
        let selectedId = id === this.state.selectedWorkHistoryId ? SELECTED_WORK_HISTORY_ID : id;
        this.setState({selectedWorkHistoryId: selectedId});
    }

    render() {
        let content = this.props.workhistoryList && this.props.workhistoryList.map((WorkHistoryList, i) => {
            let toDate = getFormatedYear(WorkHistoryList.toDate);
            let description = null;
            if(_.isNil(WorkHistoryList.toDate) || WorkHistoryList.currentlyWorking)
            {
                toDate = "Present"
            }

            let displayText = "See Description";
            let showOrHideDescription = null
            let icon =  Icons.arrowDown;
            if(this.state.selectedWorkHistoryId === WorkHistoryList.workHistoryId)
            {
                displayText = "Hide Description"
                icon = Icons.arrowUp;
                description = <Text style={styles.companyLocation}>{WorkHistoryList.description}</Text>
            }
            if(!_.isNil(WorkHistoryList.description) && WorkHistoryList.description.length > 0)
            {
                showOrHideDescription =  
                    <TouchableOpacity  onPress={() => 
                        this.onChangeSelectedWorkHistoryId(WorkHistoryList.workHistoryId)}
                        style={styles.showDetails}>

                        <Text style={styles.serviceName}>{displayText}</Text>
                        <View style={styles.arrowIcon}>
                            <Icon {...icon} size={setFontSize(18)} color={THEME_PRIMARY_COLOR} />  
                        </View>

                    </TouchableOpacity>
            }
            return (
                <View>
                    <View style={styles.listItem}>
                        <CoreoImage style={styles.icon} source={Images.work} />
                        <View style={styles.content}>
                            <Text style={styles.companyName}>
                                {WorkHistoryList.company}
                            </Text>
                            <Text style={styles.companyDetails}>
                            {WorkHistoryList.designation}
                            </Text>
                            <Text style={styles.companyLocation}>
                            {WorkHistoryList.location}
                            </Text>
                            <Text style={styles.date}>
                            {getFormatedYear(WorkHistoryList.fromDate)} - {toDate}
                            </Text>
                            {description}
                        </View>
                        </View>
                    <View style={styles.description}>
                        <View style={styles.divider} />
                        {showOrHideDescription}
                    </View>
                </View>
            )
        });

        if(this.props.isLoading){
            return null
        }
        if((_.isNil(this.props.workhistoryList) || this.props.workhistoryList.length <= 0)){
            content = <EmptyText/>
        }
        return (
         <View style={styles.cardContainer}>
            <Header title="Work History" showIcon={this.props.isEditable}/>
            {content}
         </View>
        )
    }

}

function mapDispatchToProps(dispatch) {
    return {
        getWorkHistory: (spId) => dispatch(getWorkHistory(spId))
    }
};

function mapStateToProps(state) {
    return {
        workhistoryList: state.impersonateProfileState && state.impersonateProfileState.WorkHistoryState.workhistoryList
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkHistory);