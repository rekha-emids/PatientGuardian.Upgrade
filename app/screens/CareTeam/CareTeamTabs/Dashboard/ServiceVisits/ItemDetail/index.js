import React, { Component } from "react";
import { connect } from 'react-redux';
import {View, TouchableOpacity} from 'react-native';
import {
    CoreoText,
    CoreoImage
} from '../../../../../../components';
import {THEME_PRIMARY_COLOR} from '../../../../../../constants/theme'
import { setValueBasedOnWidth, setFontSize } from '../../../../../../utils/deviceDimensions';
import styles from './styles';
import {DasboardProfilePic} from '../../../../../../assets/images/index'
import {goBackToServiceVisitDashboardDetail,inpersinatePatient} from '../../../../../../redux/careTeam/Dashboard/actions';
import Icon from '../../../../../../components/Base/Icon';
import Icons from '../../../../../../assets/Icons';
import { PATH } from "../../../../../../routes";
import { navigateToScreenMainStack } from '../../../../../../redux/navigation/actions';
import { createVideoConference } from '../../../../../../redux/telehealth/actions'
import { onCreateNewConversation } from "../../../../../../redux/asyncMessages/actions";
import { getImage } from '../../../../../../redux/careTeam/Dashboard/actions';
import { isAPIFetching } from "../../../../../../utils/AppAPIUtils";
import { OverlayLoaderWrapper } from "../../../../../../components/Base/Preloader/Preloader";
import { PAYMENT_PENDING, TASK_PERCENTAGE, USER_TYPES, HIRED_STATUS } from "../../../../../../constants/constants";
import ProgressBar, { PROGRESSBAR_WIDTH } from "../../../../../../components/LevelOne/ProgressBar"
import { getFormatedMonthAndDateCareTeam} from '../../../../../../utils/momentUtil'
import { SafeView, Navbar } from "../../../../../../components/LevelOne";
import { caseInsensitiveComparer } from "../../../../../../utils/appUtils";
import { setSPDetails } from '../../../../../../redux/visitSelection/VisitServiceDetails/actions';

class ItemDetail extends Component {
    constructor(props) {
        super(props);
        this.itemDetail = props.itemDetail || {};
        this.state = {
            showCallModal: false
        }
    }
    componentDidMount() {
        this.props.getImage(this.itemDetail.patientId)
      }
    onPressConversation(){
        const {patientType} = this.props;
        const userDetails = {
            userId:this.itemDetail.individualId,
            participantType: patientType
        }
        const requestObject = {
            context: this.itemDetail.individualId,
            createdByType: patientType,
            participantList:[userDetails],
            title: null,
            createdBy: this.itemDetail.serviceProviderId
        }
        this.props.onCreateNewConversation(requestObject)
      }
    onTeleHealthPress() {
        let dataList = [
          {
            userId: this.itemDetail.individualId,
            participantType: USER_TYPES.PATIENT
          }
        ];
        this.props.createVideoConference(dataList);
      }

      onCallPopUp= async () => {
        this.setState({
           showCallModal: true
        })
     }

     onClickApprove= (hideApprove) => {
        
        const {requestObject} = this.props.navigation.state.params
        let params = {
            patientId: this.itemDetail.patientId,
            serviceRequestVisitId: this.itemDetail.serviceRequestVisitId,
            serviceRequestId: this.itemDetail.serviceRequestId,
            statusId: HIRED_STATUS,
            serviceProviderId: this.itemDetail.serviceProviderId
        }
        if(this.itemDetail.isPlanVisit){
            params = {
                ...params,
                serviceRequestId: this.itemDetail.serviceRequestId,
                servicePlanVisitId: this.itemDetail.serviceRequestVisitId,
                planScheduleId: this.itemDetail.serviceRequestId,
                isPlanVisit: true
            }
        }
       const data = {
           ...params,
           hideApprove,
           requestObject
       }
       this.props.setSPDetails(params.serviceProviderId)
       this.props.goToServiceRequestDetails(data)
     }

     render() {
         let statusName = this.itemDetail.statusName || ""
         if(caseInsensitiveComparer(statusName, PAYMENT_PENDING)){
             statusName = "Payment Pending"
         }
         let schedule = this.itemDetail.schedule
         let scheduleDate = schedule.slice(0, 10);
         let scheduleDateFormat = getFormatedMonthAndDateCareTeam(scheduleDate) 
         let slotName = schedule.search("afternoon") ? "AFTE" :schedule.search("morning") ? "MORN" : "EVEN"
         let scheduleName = scheduleDateFormat + ', ' + slotName
        let dataArray = [
            {
                key: this.itemDetail.serviceRequestVisitId
                ? this.itemDetail.serviceRequestVisitNumber
                : "",
                value: "View details",
                canGoToRequestDetails: true
              },
            {key: 'SR ID', value: this.itemDetail.serviceRequestNumber ? this.itemDetail.serviceRequestNumber : ''},
            {key: 'Service Category', value: this.itemDetail.serviceCategoryDescription ? this.itemDetail.serviceCategoryDescription : ''},
            {key: 'Status', value: statusName},
            {key: 'Schedule', value: this.itemDetail.schedule ? 
            scheduleName  :
             ''},
            {key: 'Task %', value: (this.itemDetail.totalTask === 0 ? 0 : ((this.itemDetail.totalTaskCompleted * 100)/this.itemDetail.totalTask)).toFixed(2), type: TASK_PERCENTAGE},
            {key: 'Service Provider', value: this.itemDetail.providerName ? this.itemDetail.providerName : ''},
        ];
        let listItems = dataArray.map((item) => {
            let RenderComponent = View
            let onPress = () => {}
            let icon = null
            if(item.canGoToRequestDetails){
              RenderComponent = TouchableOpacity
              onPress = () => { this.onClickApprove(true)}
              icon = <Icon {...Icons.angleRight} size={setFontSize(20)} style={{marginLeft: setValueBasedOnWidth(7)}} color='#acacac' />
            }
            return (
                <RenderComponent onPress={onPress} style={styles.listItem}>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <View>
                            <CoreoText style={styles.requestTitle1}>{item.key}</CoreoText>
                        </View>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                    {item.type === TASK_PERCENTAGE ? <ProgressBar progressStyle={{width: (item.value * PROGRESSBAR_WIDTH) / 100}} /> : null}
                    <CoreoText style={[styles.requestTitle, item.canGoToRequestDetails ? {color: THEME_PRIMARY_COLOR, fontWeight: "600"} : {}]}>{item.type === TASK_PERCENTAGE ? `${item.value} %` : item.value}</CoreoText>
                    {icon}
                    </View>
                </RenderComponent>
            );
        });
        return (
            <SafeView>
            <View style={styles.overlayStyle}>

            <OverlayLoaderWrapper style={{justifyContent: "flex-start"}} isLoading={isAPIFetching(this.props.loadingStatus)}>
                <Navbar title="Dashboard" showEmptyAdd />
                <View style={styles.cardView}>
                    <View style={styles.profilePicture}>
                        <CoreoImage
                            source={this.props.patientImageData && this.props.patientImageData.image ? {uri: this.props.patientImageData.image} : DasboardProfilePic}
                            style={styles.imageProfileSize}
                        />
                    </View>
                    <CoreoText style={styles.subTitle}>{this.itemDetail.patientName}</CoreoText>
                </View>
                <View style={styles.listView}>
                    {listItems}
                </View>
                </OverlayLoaderWrapper>
                </View>
                </SafeView>
        )
    }
}

function mapStateToProps(state) {
    return {
        itemDetail: state.careTeamState.dashboardState.itemDetail,
        patientImageData: state.careTeamState.dashboardState.patientImageData,
        loadingStatus:state.careTeamState.dashboardState.isLoading,

    };
};

function mapDispatchToProps(dispatch){
    return {
        setSPDetails: (id) => dispatch(setSPDetails(id)),
        getImage: (data) => dispatch(getImage(data)),
        inpersinatePatient: () => dispatch(inpersinatePatient()),
        onCreateNewConversation: (data) => dispatch(onCreateNewConversation(data)),
        createVideoConference: data => dispatch(createVideoConference(data)),
        goBackToServiceVisitDashboardDetail: () => dispatch(goBackToServiceVisitDashboardDetail()),
        goToServiceRequestDetails: (params) => dispatch(navigateToScreenMainStack(PATH.VISIT_SERVICE_DETAILS, params)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);