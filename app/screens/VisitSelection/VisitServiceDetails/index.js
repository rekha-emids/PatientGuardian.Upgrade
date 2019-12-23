import React, { Component } from "react";
import { connect } from 'react-redux';
import { View, Text, Platform, TouchableOpacity } from 'react-native'
import { Tabs, Tab } from 'native-base'
import { getVisitServiceDetails, resetVisitServiceDetails, cancelServiceRequest, cancelHiredServiceRequest } from '../../../redux/visitSelection/VisitServiceDetails/actions';
import { CoreoImage, CoreoScrollView, CoreoOpacityButton } from "../../../components";
import Icon from "../../../components/Base/Icon";
import { setFontSize, setValueBasedOnHeight } from "../../../utils/deviceDimensions";
import { getFormatedMonthAndDate } from "../../../utils/momentUtil"
import { onCreateNewConversation } from "../../../redux/asyncMessages/actions";
import Icons from "../../../assets/images/Icons";
import { createVideoConference } from '../../../redux/telehealth/actions'
import ServiceTypeDetails from './components/ServiceTypeDetails/index'
import ServiceScheduleDetails from './components/ServiceScheduleDetails/index'
import EligibilityStatus from './components/EligibilityStatus/index'
import { _ } from '../../../utils/validations'
import styles from "./styles";
import { SafeView, ModalPopup } from "../../../components/LevelOne";
import { OverlayLoaderWrapper } from "../../../components/Base/Preloader/Preloader";
import { isAPIFetching, isAPIInitial, isAPIFailed } from "../../../utils/AppAPIUtils";
import { CoreoProfileImage } from "../../../components/Base/Image/Image";
import images from "../../../assets/images";
import { HIRED_STATUS, OPEN_STATUS, IN_PROGRESS_STATUS, CANCEL_AVAILABILITY, USER_TYPES, APPROVAL_STATUS } from "../../../constants/constants";
import { onBack, navigateToScreenMainStack } from "../../../redux/navigation/actions";
import { showSyncServerModal } from "../../../redux/syncToServer/actions";
import { PATH } from "../../../routes";
import SortFilterBar from "../../CareTeam/CareTeamTabs/Components/SortFilterBar";
import { approveOrDeclineServiceRequest } from "../../../redux/careTeam/Dashboard/actions";
import { THEME_PRIMARY_COLOR } from "../../../constants/theme";
import { makeACall } from "../../../utils/communicationUtils";
import { isEmpty } from "../../../utils/EmptyObjCheck";
import { INIT } from "../../../constants/AppAPIConstants";
import AlertPopup from "../../../components/LevelOne/AlertPopup";


export const NavBar = (props) => {
    let icon = Icons.backArrowAndroid
    if (Platform.OS === 'ios') {
        icon = Icons.backArrowIos
    }
    return (
        <View style={[styles.navBarContainer, props.style]}>
            <TouchableOpacity onPress={props.onPress}>
                <Icon {...icon} size={setFontSize(20)} style={styles.arrow} />
            </TouchableOpacity>
            <Text style={styles.heading}>Request Id {props.data}</Text>
            {
                props.isEditable ?
                    <TouchableOpacity onPress={props.onEditPress}>
                        <CoreoImage source={Images.edit} style={styles.editIcon} />
                    </TouchableOpacity>
                    : <View style={styles.editIcon} />}
        </View>
    )
}


class VisitServiceDetails extends Component {
    serviceRequestId = -1
    requestObject = {}
    constructor(props) {
        super(props)
        this.state = {
            showMoreConversation: false,
            selectedTabIndex: 0,
            showModal: false,
            showNoNumber: false,
            visitInProgressModal: false,
        }
    }

    componentWillUnmount() {
        let fromDashboard = this.props.navigation.state.params.fromDashboard;
        if(fromDashboard){
            let _onRefresh = this.props.navigation.state.params._onRefresh
            _onRefresh && _onRefresh(INIT)
        }
    }


    componentDidMount() {
        const { navigation } = this.props
        const { serviceRequestId, requestObject } = navigation ? navigation.state.params : {}
        this.serviceRequestId = serviceRequestId
        this.requestObject = requestObject
        this.props.getVisitServiceDetails(serviceRequestId);
    }

    PostedByContent = (props) => {
        let conversationDetails = null
        let icon = props.icon
        const { serviceProvider, onCreateNewConversation, showConversation, createdDate, VisitServiceDetails, hiredDate, startDate, createVideoConference, statusId, patientId, onPressCall, serviceProviderId } = props
        const isHired = (statusId === HIRED_STATUS);
        const isInProgress = (statusId === IN_PROGRESS_STATUS);
        let date = hiredDate ? getFormatedMonthAndDate(hiredDate) : ""
        let postedDate = createdDate ? getFormatedMonthAndDate(createdDate) : ""
        const onPressConversation = () => {
            let userDetails = [{
                userId: serviceProvider.coreoHomeUserId,
                participantType: USER_TYPES.SERVICE_PROVIDER,
                participantId: serviceProvider.serviceProviderId
            }]
            let requestObject = {
                participantList: userDetails,
                title: null,
                context: null
            }
            onCreateNewConversation(requestObject)
        }
    
        const onTeleHealthPress = () => {
            let dataList = [
                {
                    userId: serviceProvider.coreoHomeUserId,
                    participantType: USER_TYPES.SERVICE_PROVIDER,
                    participantId: serviceProvider.serviceProviderId,
                    firstName: serviceProvider.providerFirstName,
                    lastName: serviceProvider.providerLastName,
                    thumbNail: serviceProvider.providerThumbnail,
                }
            ];
            createVideoConference(dataList);
        }


        if (showConversation) {
            conversationDetails = <View>
                <View style={styles.divider} />
                <TouchableOpacity style={[styles.conversation]} onPress={onPressCall} >
                    <CoreoImage source={images.careteam_03} style={[styles.iconImage, styles.icon]} />
                    <Text style={styles.conversationText}>Phone Call</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity style={[styles.conversation]} onPress={onPressConversation} disabled = {!props.network}>
                    <CoreoImage source={images.conversationImage} style={[styles.iconImage, styles.icon]} />
                    <Text style={styles.conversationText}>Conversations</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity style={[styles.conversation]} onPress={onTeleHealthPress} disabled = {!props.network}>
                    <CoreoImage source={images.careteam_05} style={[styles.iconImage, styles.icon]} />
                    <Text style={styles.conversationText}>Video Call</Text>
                </TouchableOpacity>
            </View>
        }
        
        return (
            <View style={styles.postedContnet}>
    
                <Text style={styles.postedByText}>Service Provider</Text>
                <View style={styles.patientDetailsContainer}>
                    <View style={styles.picAndDetails}>
                        <TouchableOpacity activeOpacity={1} style={{flexDirection:'row'}}  onPress={()=>{isHired || isInProgress || serviceProviderId ? props.onPressImage() : null}}>
                            <CoreoProfileImage pic={serviceProvider && serviceProvider.image ? { uri: serviceProvider.image } : null} style={styles.pic} />
                        <View style={styles.detailsWrapper}>
                            {serviceProviderId ? <Text style={styles.name}>{serviceProvider.firstName} {serviceProvider.lastName}</Text> : null}
                            {statusId === HIRED_STATUS ? <Text style={styles.postendOnText}>Hired on {date}</Text> :
                                <Text style={styles.postendOnText}>Posted on {postedDate}</Text>
                            }
                        </View>
                        </TouchableOpacity>
                        {props.VisitServiceDetails && props.VisitServiceDetails.statusId && (isHired || isInProgress) ?
                            <TouchableOpacity onPress={this.onPress} style={styles.seeLessOrMore}>
                                <CoreoImage source={icon} style={styles.arrowLessMore} />
                            </TouchableOpacity> : null}
                    </View>
                    {conversationDetails}
                </View>
            </View>
        )
    }
    

    onPress = () => {
        this.setState({ showMoreConversation: !this.state.showMoreConversation })
    }

    onPressCall = () => {
        let phoneNo = this.props.VisitServiceDetails.phoneNumber
        let isPhoneNumber = _.isNil(this.props.VisitServiceDetails.phoneNumber)
      isPhoneNumber && this.showNoNumberModal();
      phoneNo && this.onCallPopUp(phoneNo);
    }

    onCallPopUp = async (value) => {
        value && makeACall(value)
    }

    onCancelServiceRequest = () => {
        const { navigation } = this.props
        const { serviceRequestId } = navigation ? navigation.state.params : {}
        this.props.cancelServiceRequest(serviceRequestId)
    }
    onChangeTab = ({ i }) => {
        this.setState({ selectedTabIndex: i })

    }
    showNoNumberModal = () => {
        this.setState({showNoNumber : true})
    }

    goToSp = () => {
        let id = this.props.VisitServiceDetails.serviceProviderId

        let params = {
            id,
            IsEntityUser: false
        }
        this.props.goToSPProfile(params);

    }


    onPressApprove = () => {
        this.props.onApproveOrDecline(this.serviceRequestId, true, this.requestObject)
    }

    onPressDecline = () => {
        this.props.onApproveOrDecline(this.serviceRequestId,false  , this.requestObject)
    }

    onPressDeclineWhileVisitInProgress = () => {
        if(this.props.VisitServiceDetails.hasVisitStarted){
            this.setState({visitInProgressModal: true});
        }else{
            this.showDeclineModalfun();
        }
    }
    showApproveModalfun = () => {
        this.approvePopup && this.approvePopup.open()
    }

    showDeclineModalfun = () => {
        this.declinePopup && this.declinePopup.open()
    }

    renderFooter = () => {
        const {navigation,cancelServiceRequestStatus,getServiceScheduleStatus, getServiceDetailsStatus, getCareTeamLoadingStatus} = this.props
        const {hideApprove} = navigation ? navigation.state.params : {}
        if(_.isNil(hideApprove) || (!_.isNil(hideApprove) && hideApprove) || isAPIFetching(getServiceScheduleStatus,getCareTeamLoadingStatus,getServiceDetailsStatus, cancelServiceRequestStatus)) return null
        let secondButtonTitle = "Approve"
        let firstButtonTitle = "Decline"
        let toggleSort = this.showDeclineModalfun
        let toggleFilter = this.showApproveModalfun
        let showFirstButton = true
        if(Number(this.props.VisitServiceDetails.approvalStatus) === Number(APPROVAL_STATUS.APPROVED)){
            secondButtonTitle = "Decline"
            firstButtonTitle = null
            toggleFilter = this.onPressDeclineWhileVisitInProgress
            showFirstButton = false
        }else if(Number(this.props.VisitServiceDetails.approvalStatus) === Number(APPROVAL_STATUS.DECLINED)){
            toggleFilter = this.showApproveModalfun
            showFirstButton = false
            firstButtonTitle = null
        }
        return (
            <SortFilterBar
            firstButtonTitle={firstButtonTitle}
            secondButtonTitle={secondButtonTitle}
            toggleSort={toggleSort}
            toggleFilter={toggleFilter}
            showFirstButton={showFirstButton}
            textStyle={{color: THEME_PRIMARY_COLOR}}
        />
        )
    }

    render() {
        const {VisitServiceDetails, VisitServiceSchedule,cancelServiceRequestStatus, navigation,getServiceScheduleStatus, getServiceDetailsStatus, getCareTeamLoadingStatus,patientId} = this.props
        let loading = isAPIFetching(getServiceScheduleStatus,getServiceDetailsStatus) || isAPIInitial(getServiceScheduleStatus,getServiceDetailsStatus) || isAPIFailed(getServiceScheduleStatus, getServiceDetailsStatus) ;
        let showSyncModal = (_.isNil(VisitServiceDetails) || isEmpty(VisitServiceDetails)  || _.isNil(VisitServiceSchedule)) &&  loading === true && !this.props.network;
        showSyncModal? this.props.showSyncServerModal(true): this.props.showSyncServerModal(false)
        const {serviceRequestId, requestObject} = navigation ? navigation.state.params : {}
        let text = "See More"
        let icon = Icons.arrowDown
        if (this.props.network === false && (_.isNil(VisitServiceDetails) || _.isNil(VisitServiceSchedule))){
            return <NavBar onPress={this.props.popRoute} isEditable={false}/>;
        }
        if(_.isNil(VisitServiceDetails) || isEmpty(VisitServiceDetails) || _.isNil(VisitServiceSchedule) || isEmpty(VisitServiceDetails)) return null
        if(this.state.showMoreConversation){
            text = "See Less"
            icon = Icons.arrowUp
        }
        if (this.state.selectedTabIndex === 1 && VisitServiceSchedule && VisitServiceSchedule.length === 0) {
            scrollEnabled = false
        }
        return (
            <OverlayLoaderWrapper isLoading={isAPIFetching(getServiceScheduleStatus,getCareTeamLoadingStatus,getServiceDetailsStatus, cancelServiceRequestStatus)}>
            <SafeView style={styles.container}>
                <CoreoImage source={images.CircularBg} style={styles.bg} />
                <NavBar onPress={this.props.popRoute} isEditable={false}
                   data={VisitServiceDetails.serviceRequestNumber}
                   style={styles.navbarStyles}
                />
                {this.PostedByContent({
                                showConversation:this.state.showMoreConversation,
                                serviceProvider:VisitServiceDetails.serviceProvider,
                                patient: VisitServiceDetails.patient,
                                serviceProviderId:VisitServiceDetails.serviceProviderId,
                                hiredDate:VisitServiceDetails.hiredDate,
                                startDate:VisitServiceDetails.startDate,
                                onCreateNewConversation:this.props.onCreateNewConversation,
                                createVideoConference:this.props.createVideoConference,
                                patientId:this.props.patientId,
                                onPressCall:this.onPressCall,
                                onPressImage:this.goToSp,
                                createdDate:VisitServiceDetails.requestDate,
                                statusId:VisitServiceDetails.statusId,
                                VisitServiceDetails:VisitServiceDetails,
                                icon:icon,
                                showNoNumberModal:this.showNoNumberModal,
                                network: this.props.network
                            })}
                            { VisitServiceDetails.statusId !== OPEN_STATUS && VisitServiceDetails.serviceProviderId>0 ?
                 <TouchableOpacity onPress={this.onPress} style={styles.seeLessOrMore}>
                    <Text style={styles.text}>{text}</Text>
                    <Icon {...icon} size={setFontSize(18)} />
                 </TouchableOpacity> : null}
                    <Tabs onChangeTab={this.onChangeTab} locked tabContainerStyle={{height: setValueBasedOnHeight(30)}}  tabBarUnderlineStyle={styles.tabBarUnderlineStyle}>
                        <Tab activeTabStyle={styles.tabStyle} tabStyle={styles.tabStyle}
                            textStyle={styles.tabTextStyle}
                            activeTextStyle={styles.activeTextStyle} heading="Details">
                            <CoreoScrollView>
                                <ServiceTypeDetails VisitServiceDetails={VisitServiceDetails}  />
                            </CoreoScrollView>
                        </Tab>
                        <Tab activeTabStyle={styles.tabStyle}
                            tabStyle={styles.tabStyle}
                            textStyle={styles.tabTextStyle}
                            activeTextStyle={styles.activeTextStyle} heading="Schedule">
                            <ServiceScheduleDetails serviceProvider={VisitServiceDetails.serviceProvider} VisitServiceSchedule={VisitServiceSchedule}
                            serviceRequestId={VisitServiceDetails.serviceRequestId} />
                        </Tab>
                        {/* {HIRED_STATUS === VisitServiceDetails.statusId?<Tab activeTabStyle={styles.tabStyle}
                            tabStyle={styles.tabStyle}
                            textStyle={styles.tabTextStyle}
                            activeTextStyle={styles.activeTextStyle} heading="Eligibility">
                            <EligibilityStatus />
                        </Tab>:null} */}
                    </Tabs>
                    {VisitServiceDetails && (CANCEL_AVAILABILITY.indexOf(VisitServiceDetails.statusId) !== -1) && this.props.network && _.isNil(requestObject) ?
                     <View style={styles.sortFilterStyle}>
                    <CoreoOpacityButton
                        style={styles.sort}
                        text='Cancel Request'
                        textStyle={[styles.requestTitle, VisitServiceDetails.visitInProgress ? {opacity: 0.5} : {}]}
                        onPress={() =>  {!VisitServiceDetails.visitInProgress && this.setState({showModal: true})}}
                    />
                </View>: this.renderFooter()}
                <ModalPopup
                    visible={this.state.showModal}
                    primaryButton="YES"
                    secondaryButton="NO"
                    primaryColor="#3c1053"
                    secondaryColor="#6c757d"
                    onConfirm={() => {
                        this.onCancelServiceRequest()
                        this.setState({ showModal: false })
                    }}
                    onCancel={() => this.setState({
                        showModal: !this.state.showModal,
                    })}
                >
                    <Text style={styles.message}>Do you want to cancel the Service Request?</Text>
                </ModalPopup>
                
                    <AlertPopup
                        ref={ref => (this.declinePopup = ref)}
                        alertText={'Do you want to decline the Service Request'}
                        primaryButtonText="YES"
                        secondaryButtonText="NO"
                        onConfirm={this.onPressDecline}
                    />
                    <AlertPopup
                        ref={ref => (this.approvePopup = ref)}
                        alertText={'Do you want to approve the Service Request?'}
                        primaryButtonText="YES"
                        secondaryButtonText="NO"
                        onConfirm={this.onPressApprove}
                    />
                <ModalPopup
                    visible={this.state.showNoNumber}
                    primaryButton="OK"
                    primaryColor="#3c1053"
                    onConfirm={() => {
                        this.setState({
                            showNoNumber: false,
                        })
                    }}
                >
                    <Text style={styles.message}>No number found.</Text>
                </ModalPopup>
                <ModalPopup
                    visible={this.state.visitInProgressModal}
                    primaryButton="OK"
                    primaryColor="#3c1053"
                    onConfirm={() => {
                        this.setState({
                            visitInProgressModal: false,
                        })
                    }}
                >
                    <Text style={styles.message}>Service Request cannot be declined as the visits are already been started.</Text>
                </ModalPopup>
            </SafeView>
            </OverlayLoaderWrapper>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        resetVisitServiceDetails: () => dispatch(resetVisitServiceDetails()),
        getVisitServiceDetails: data => dispatch(getVisitServiceDetails(data)),
        cancelServiceRequest: (requestId) => dispatch(cancelServiceRequest(requestId)),
        cancelHiredServiceRequest: (requestId) => dispatch(cancelHiredServiceRequest(requestId)),
        onCreateNewConversation: (data) => dispatch(onCreateNewConversation(data)),
        createVideoConference: data => dispatch(createVideoConference(data)),
        popRoute: () => dispatch(onBack()),
        showSyncServerModal: (data) => dispatch(showSyncServerModal(data)),
        goBack: () => dispatch(onBack()),
        goToSPProfile: (params) => dispatch(navigateToScreenMainStack(PATH ? PATH.SERVICE_PROVIDER_PROFILE : null, params)),
        onApproveOrDecline: (id, status, requestObject) => dispatch(approveOrDeclineServiceRequest(id, status, requestObject))
    }
};

function mapStateToProps(state) {
    let VisitServiceDetailsState = state.visitSelectionState && state.visitSelectionState.VisitServiceDetailsState;
    return {
        VisitServiceDetails: VisitServiceDetailsState.VisitServiceDetails,
        VisitServiceSchedule: VisitServiceDetailsState.VisitServiceSchedule,
        getServiceDetailsStatus: VisitServiceDetailsState.getServiceDetailsStatus,
        cancelServiceRequestStatus: VisitServiceDetailsState.cancelServiceRequestStatus,
        network: state.networkReducer && state.networkReducer.network,  
        getServiceScheduleStatus: VisitServiceDetailsState.getServiceScheduleStatus,
        getCareTeamLoadingStatus: state.careTeamState && state.careTeamState.dashboardState.isLoading,
        patientId: state.authState && state.authState.userState.patientId,
        isSyncComplete: state.syncServerState && state.syncServerState.isSyncComplete
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VisitServiceDetails);
