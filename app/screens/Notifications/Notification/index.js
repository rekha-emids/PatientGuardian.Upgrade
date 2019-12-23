import React, { Component } from 'react'
import { View } from 'react-native'
import CoreoCard from '../../../components/LevelOne/CoreoCard/index'
import styles from './styles';
import { CoreoText, Navbar } from '../../../components';
import {connect} from 'react-redux'
import {getNotificationList} from '../../../redux/Notifications/NotificationList/actions'
import { ListScrollerAPIWrapper } from '../../../components/LevelOne';
import { getFormatedDate } from '../../../utils/momentUtil';

export const NotificationCard = (props) => {
    return (
        <CoreoCard style={styles.cardStyle}>
            {/* {false ? <CoreoText style={styles.BoldText}>Push Notification</CoreoText> : null} */}
            <CoreoText style={styles.subheadingText}>
                {props.messageContent}
            </CoreoText>
            <CoreoText style={styles.time}>
                {getFormatedDate(props.createDate, "hh:mm")}
            </CoreoText>
            <View style={styles.horizontalLine} />
        </CoreoCard>
    )
}
const NotificationSection = (props) => {
    return (
        <View>
            <CoreoText style={styles.date}>
                {props.label}
            </CoreoText>
            <ListScrollerAPIWrapper
                data={props.notifications}
                renderComponent={NotificationCard}
                isPaginationEnabled={false}
            />
        </View>)
}
class Notification extends Component {
    apiCall=(requestObject)=>{
        this.props.getNotificationList(requestObject)
    }

    render() {
        let keys = [];
        for (let index = 0; index < this.props.notificationList && this.props.notificationList.length; index++) {
            keys.push(this.props.notificationList[index].customDate);
        }
        let uniqueItems = Array.from(new Set(keys))
        let dataArray = {};
        for (let i = 0; i < uniqueItems && uniqueItems.length; i++) {
            for (let index = 0; index < this.props.notificationList && this.props.notificationList.length; index++) {
                if(uniqueItems[i] === this.props.notificationList[index].customDate) {
                    let tempArray = dataArray[uniqueItems[i]] ? [...dataArray[uniqueItems[i]]] : []
                    dataArray = {
                        ...dataArray,
                        [uniqueItems[i]]: tempArray.concat(this.props.notificationList[index])
                    }
                }
            }
        }
        let data = Object.keys(dataArray).map(key => {
            return {notifications: dataArray[key], label: key}
        })
        return (
            <CoreoCard style={styles.mainCard}>
                <Navbar title={'Notifications'} showEmptyAdd={true} />
                <ListScrollerAPIWrapper
                    data={data}
                    renderComponent={NotificationSection}
                    networkCallStatus={this.props.loadingStatus}
                    isPaginationEnabled={true}
                    apiSaga={this.apiCall}
                />
            </CoreoCard>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        getNotificationList: (requestObject) => dispatch(getNotificationList(requestObject)),
    }
};

function mapStateToProps(state) {
    let notificationState = state.NotificationState;
    return {
        notificationList: notificationState && state.NotificationState.NotificationListState.notificationList,
        loadingStatus: notificationState && state.NotificationState.NotificationListState.isLoading

    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Notification)