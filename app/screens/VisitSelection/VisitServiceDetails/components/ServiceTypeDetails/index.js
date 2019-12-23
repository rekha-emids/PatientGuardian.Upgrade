import React, {Component} from 'react'
import {connect} from 'react-redux' 
import {ScrollView, View, Text} from 'react-native'
import styles from './styles'
import { CoreoImage, CoreoScrollView, CoreoOpacityButton } from '../../../../../components';
import { getServiceIcon} from '../../../../../utils/appUtils'
import AvailableDays from './AvailableDays'
import {_} from '../../../../../utils/validations'
import { getFormatedDate } from '../../../../../utils/momentUtil';
import { cancelServiceRequest } from '../../../../../redux/visitSelection/VisitServiceDetails/actions';
import { showSyncServerModal } from '../../../../../redux/syncToServer/actions';
import { approveOrDeclineServiceRequest } from '../../../../../redux/careTeam/Dashboard/actions';
import { isAPIFetching, isAPIInitial, isAPIFailed } from '../../../../../utils/AppAPIUtils';
import { isEmpty } from '../../../../../utils/EmptyObjCheck';
import { CANCEL_AVAILABILITY, APPROVAL_STATUS, DATE_FORMAT } from '../../../../../constants/constants';
import ServiceDetailsStyles from '../../styles'
import AlertPopup from '../../../../../components/LevelOne/AlertPopup';
import { FooterButtons } from '../../../../CareTeam/CareTeamTabs/Components/FooterButtons';
import { CoreoActiveIndicator } from '../../../../../components/Base/Preloader/Preloader';
const Service = (props) => {
    const style = props.isSelected ? styles.selectedService : styles.unSelectedService
    return (
        <View>
            <View style={style}>
                <CoreoImage source={getServiceIcon("serviceType" + props.serviceTypeId)} style={styles.serviceIcon} />
                <Text style={[styles.text, styles.serviceTypeText]}>{props.serviceTypeDescription}</Text>
            </View>
        </View>
    )
}

const Services = (props) => {
    const {serviceRequestTypeDetails, onPressService, selectedServiceId} = props
    serviceTypes = serviceRequestTypeDetails && serviceRequestTypeDetails.map((service, index) => {
        return <Service
         {...service} onPressService={onPressService} />
    })  
    return (
        <View>
            <Text style={styles.heading}>Service Types</Text>
            <View style={styles.section}>
                <ScrollView horizontal={true}>
                    {serviceTypes}
                </ScrollView>
            </View>
        </View>
    )
}


class ServiceTypeDetails extends Component {
    serviceRequestId = -1
    requestObject = {}
    constructor(props){
        super(props)
        this.state = {
            selectedServiceTypeId: -1
        }
    }

    componentDidMount() {
        const { navigation } = this.props.screenProps
        const { serviceRequestId, requestObject } = navigation ? navigation.state.params : {}
        this.serviceRequestId = serviceRequestId
        this.requestObject = requestObject
    }

    onCancelServiceRequest = () => {
        const { navigation } = this.props.screenProps
        const { serviceRequestId } = navigation ? navigation.state.params : {}
        this.props.cancelServiceRequest(serviceRequestId)
    }

    onPressApprove = () => {
        this.approvePopup.open()
    }

    onPressDecline = () => {
        this.declinePopup.open()
    }

    onPressDeclineWhileVisitInProgress = () => {
        if(this.props.visitServiceDetails.hasVisitStarted){
            this.visitInprogressModal.open()
        }else{
            this.onPressDecline();
        }
    }

    onApproveConfirm = () =>{
        this.props.onApproveOrDecline(this.serviceRequestId, true, this.requestObject)
    }

    onDeclineConfirm = () => {
        this.props.onApproveOrDecline(this.serviceRequestId,false  , this.requestObject)
    }

    renderFooter = () => {
        const { navigation } = this.props.screenProps
        const {cancelServiceRequestStatus,getServiceScheduleStatus, getServiceDetailsStatus, getCareTeamLoadingStatus, visitServiceDetails} = this.props
        const {hideApprove} = navigation ? navigation.state.params : {}
        if(_.isNil(hideApprove) || (!_.isNil(hideApprove) && hideApprove) || isAPIFetching(getServiceScheduleStatus,getCareTeamLoadingStatus,getServiceDetailsStatus, cancelServiceRequestStatus)) return null
        let secondButtonTitle = "Approve"
        let firstButtonTitle = "Decline"
        let toggleSort = this.onPressDecline
        let toggleFilter = this.onPressApprove
        if(Number(this.props.visitServiceDetails.approvalStatus) === Number(APPROVAL_STATUS.APPROVED)){
            secondButtonTitle = "Decline"
            firstButtonTitle = null
            toggleFilter = this.onPressDeclineWhileVisitInProgress
        }else if(Number(this.props.visitServiceDetails.approvalStatus) === Number(APPROVAL_STATUS.DECLINED)){
            toggleFilter = this.onPressApprove
            firstButtonTitle = null
        }
        return (
            <FooterButtons
            firstButtonTitle={firstButtonTitle}
            secondButtonTitle={secondButtonTitle}
            thirdButtonTitle={"Cancel Request"}
            onThirdButtonPress={() =>  {!visitServiceDetails.visitInProgress && this.cancelRequest.open()}}
            onFirstButtonPress={toggleSort}
            onSecondButtonPress={toggleFilter}
            textStyle={styles.color}
            />
        )
    }


 
    renderServiceTasks = () => {
        const {selectedServiceTypeId} = this.state
        const {visitServiceDetails} = this.props
        let content = null
        let selectedServiceTasks = visitServiceDetails && visitServiceDetails.serviceRequestTypeDetails && 
        visitServiceDetails.serviceRequestTypeDetails.filter(service => service.serviceRequestTypeDetailsId === selectedServiceTypeId)
        if(selectedServiceTasks && selectedServiceTasks.length > 0){
            content = selectedServiceTasks[0].serviceRequestTypeTaskDetails.map((service, index) => {
                return (
                    <View style={styles.tasksContainer}>
                        <View style={styles.count}>
                            <Text style={styles.countText}>{index+1}</Text>
                        </View>
                        <Text style={styles.text}>{service.serviceTaskDescription}</Text>
                    </View>
                )
            })
        }
        return content
    }

    render() {
        const { navigation } = this.props.screenProps
        const {visitServiceDetails,getDatesStatus,cancelServiceRequestStatus, visitServiceSchedule, getServiceScheduleStatus, getServiceDetailsStatus}  = this.props
        let loading = isAPIFetching(getServiceScheduleStatus,getServiceDetailsStatus) || isAPIInitial(getServiceScheduleStatus,getServiceDetailsStatus) || isAPIFailed(getServiceScheduleStatus, getServiceDetailsStatus) ;
        let showSyncModal = (_.isNil(visitServiceDetails) || isEmpty(visitServiceDetails)  || _.isNil(visitServiceSchedule)) &&  loading === true && !this.props.network;
        showSyncModal? this.props.showSyncServerModal(true): this.props.showSyncServerModal(false)
        if(isAPIFetching(getServiceDetailsStatus, getDatesStatus, cancelServiceRequestStatus)) return <CoreoActiveIndicator />
        if(!visitServiceDetails) return null
        const {requestObject} = navigation && navigation.state ? navigation.state.params : {}
        const {patientAddresses} = visitServiceDetails.patient
        const address = patientAddresses && patientAddresses.length > 0 ? patientAddresses[patientAddresses.length - 1] : {}
        let scheduleType = "One Time Schedule"
        let occurance = getFormatedDate(visitServiceDetails.startDate, DATE_FORMAT)
        if(visitServiceDetails.isRecurring){
            scheduleType = "Recurring Schedule"
            if(visitServiceDetails.occurence){
                occurance = getFormatedDate(visitServiceDetails.startDate, DATE_FORMAT) + " - "  + visitServiceDetails.occurence + " occurrences"
            }else {
                occurance = getFormatedDate(visitServiceDetails.startDate, DATE_FORMAT) + " - "  + getFormatedDate(visitServiceDetails.endDate, DATE_FORMAT)
            }
        }
        return (
            <View style={{flex: 1}}>
            <CoreoScrollView style={styles.tabContent}>
                <Text style={styles.heading}>Service Category</Text>
                <Text style={[styles.section, styles.text]}>{visitServiceDetails.serviceCategoryDescription}</Text>
                <Services selectedServiceId={this.state.selectedServiceTypeId} serviceRequestTypeDetails={visitServiceDetails.serviceRequestTypeDetails} />
                <Text style={styles.heading}>Additional Information</Text>
                <Text style={[styles.section, styles.text]}>{visitServiceDetails.serviceRequestDescription}</Text>
                <Text style={styles.heading}>Schedule and Frequency</Text>
                <View style={styles.section}>
                    <Text style={styles.scheduleHeading}>{scheduleType}</Text>
                    <Text style={styles.occuranceText}>{occurance}</Text>
                    {visitServiceDetails.isRecurring ? 
                    <View>
                    <Text style={[styles.scheduleHeading, styles.recurringPattern]}>Recurring Pattern</Text>
                    <Text style={styles.text}>{visitServiceDetails.recurringPatternDescription}</Text>
                    </View> : null}
                    <AvailableDays availableDays={visitServiceDetails.serviceRequestSlot} />
                </View>
                <Text style={styles.heading}>Point of Service</Text>
                <View style={styles.section}>
                    {address.addressTypeId ? <View style={styles.addressContainer}>
                        <Text style={styles.addressHeading}>Address Type</Text>
                        <Text style={styles.addressValue}>{address && address.addressTypeId}</Text>
                    </View> : null}
                    <View style={styles.addressContainer}>
                        <Text style={styles.addressHeading}>Street</Text>
                        <Text style={styles.addressValue}>{address && address.streetAddress}</Text>
                    </View>
                    <View style={styles.addressContainer}>
                        <Text style={styles.addressHeading}>City</Text>
                        <Text style={styles.addressValue}>{address && address.city}</Text>
                    </View>
                    <View style={styles.addressContainer}>
                        <Text style={styles.addressHeading}>State</Text>
                        <Text style={styles.addressValue}>{address && address.stateName}</Text>
                    </View>
                    <View style={styles.addressContainer}>
                        <Text style={styles.addressHeading}>Zip</Text>
                        <Text style={styles.addressValue}>{address && address.zipCode}</Text>
                    </View>
                </View>
            </CoreoScrollView>
            {visitServiceDetails && (CANCEL_AVAILABILITY.indexOf(visitServiceDetails.statusId) !== -1) && this.props.network && _.isNil(requestObject) ?
                     <View style={ServiceDetailsStyles.sortFilterStyle}>
                    <CoreoOpacityButton
                        style={ServiceDetailsStyles.sort}
                        text='Cancel Request'
                        textStyle={[ServiceDetailsStyles.requestTitle, visitServiceDetails.visitInProgress ? {opacity: 0.5} : {}]}
                        onPress={() =>  {!visitServiceDetails.visitInProgress && this.cancelRequest.open()}}
                    />
                </View>: this.renderFooter()}
                <AlertPopup
                    primaryButtonText="Yes"
                    secondaryButtonText="No"    
                    alertText={"Do you want to cancel the Service Request?"}
                    ref={ref => (this.cancelRequest = ref)}
                    onConfirm={this.onCancelServiceRequest}
                     />
                <AlertPopup
                        ref={ref => (this.declinePopup = ref)}
                        alertText={'Do you want to decline the Service Request?'}
                        primaryButtonText="YES"
                        secondaryButtonText="NO"
                        onConfirm={this.onDeclineConfirm}
                    />
                <AlertPopup
                        ref={ref => (this.approvePopup = ref)}
                        alertText={'Do you want to approve the Service Request?'}
                        primaryButtonText="YES"
                        secondaryButtonText="NO"
                        onConfirm={this.onApproveConfirm}
                    />
                <AlertPopup
                    primaryButtonText="Ok"
                    alertText={"Service request cannot be declined as the service visits have already started. Please cancel the request to avoid any further transaction."}
                    ref={ref => (this.visitInprogressModal = ref)}
                     />
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        cancelServiceRequest: (requestId) => dispatch(cancelServiceRequest(requestId)),
        showSyncServerModal: (data) => dispatch(showSyncServerModal(data)),
        onApproveOrDecline: (id, status, requestObject) => dispatch(approveOrDeclineServiceRequest(id, status, requestObject))
    }
};
function mapStateToProps(state){
    let visitServiceDetailsState = state.visitSelectionState && state.visitSelectionState.VisitServiceDetailsState;
    return {
        visitServiceDetails: state.visitSelectionState.VisitServiceDetailsState.VisitServiceDetails,
        visitServiceSchedule: visitServiceDetailsState.VisitServiceSchedule,
        getServiceDetailsStatus: visitServiceDetailsState.getServiceDetailsStatus,
        getDatesStatus: visitServiceDetailsState.getDatesStatus,
        cancelServiceRequestStatus: visitServiceDetailsState.cancelServiceRequestStatus,
        network: state.networkReducer && state.networkReducer.network,  
        getServiceScheduleStatus: visitServiceDetailsState.getServiceScheduleStatus,
        getCareTeamLoadingStatus:state.careTeamState && state.careTeamState.dashboardState.isLoading,
        patientId: state.authState && state.authState.userState.patientId,
        isSyncComplete: state.syncServerState && state.syncServerState.isSyncComplete

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceTypeDetails)
