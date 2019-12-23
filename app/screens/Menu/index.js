import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TouchableHighlight, Text } from 'react-native'
import Icons from '../../assets/Icons'
import {NavbarWithImage} from '../../components';
import { CoreoImage, CoreoListItem } from '../../components';
import { MENU_NAVIGATION, MENU_TYPES, USER_TYPES, GUARDIAN_MENU_NAVIGATION } from '../../constants/constants'
import styles from './styles'
import {getPatientDetails, getPatientImage} from '../../redux/auth/User/actions'
import {navigateToScreenMainStack} from '../../redux/navigation/actions'
import Icon from '../../components/Base/Icon';
import {setFontSize} from '../../utils/deviceDimensions'
import { PATH } from '../../routes';
import {extractRole} from '../../utils/roleUtil';
import { onLogout} from '../../redux/auth/Logout/actions';
import {getImage, getPersonalDetail} from '../../redux/profile/PersonalDetail/actions'
import { DasboardProfilePic } from '../../assets/images';
import { getSelectedPatientInfo, getUserInfo } from '../../utils/userUtil';
import { SafeView } from '../../components/LevelOne';
import NotificationTray from '../Dashboard/NotificationTray';
import { resetVideoConferenceNotifications, getVideoConferenceNotifications } from '../../redux/dashboard/Dashboard/actions';
import { setRoomId, joinVideoConference } from '../../redux/telehealth/actions';
import { OverlayLoaderWrapper } from '../../components/Base/Preloader/Preloader';
import { isAPIFetching } from '../../utils/AppAPIUtils';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
           isNotificationModalOpen: false
        };
    };

    componentDidMount() {
        this.props.getPatientDetails();
    }
    componentWillReceiveProps(nextProps){
        if(!this.props.videoConferenceNotifications && nextProps.videoConferenceNotifications && nextProps.videoConferenceNotifications.length){
          this.setState({isNotificationModalOpen: true})
        }else if(nextProps.videoConferenceNotifications && nextProps.videoConferenceNotifications.length === 0){
            this.props.goToStartVideoConference()
            this.props.resetVideoConferences()
        }
      }

    componentWillMount() {
        let params = {
            id : getUserInfo() && getUserInfo().patientId,
            userType : this.props.userType
        }
        if(this.props.userType === USER_TYPES.GUARDIAN){
         params = {
            id : this.props.userId,
            userType : this.props.userType
        }}

        else if(this.props.userType === USER_TYPES.CARE_TEAM){
            params = {
               id : this.props.cTIndividualId,
               userType : this.props.userType
           }}
        this.props.getImage(params)
        this.props.getPersonalDetail(params)
    }  

    onPressPayment = () => {
        this.props.goToPayments()
    }

    goToManageConnection(manageConnectionPrams){
        __DEV__ && console.log("manageConnectionPrams: ",manageConnectionPrams)
        this.props.goToManageConnection(manageConnectionPrams)
    }
    onClickJoinConference = (roomId) => {
        this.props.setRoomId(roomId)
        this.props.joinVideoConference()
        this.setState({isNotificationModalOpen: false}, this.props.resetVideoConferences)
      }

    onPressMenuItem = (type)=> {
        __DEV__ && console.log("type is: ",type)
        switch(type){
            case MENU_TYPES.PAYMENT:
                return this.onPressPayment
            case MENU_TYPES.CONNECTIONS:
                let manageConnectionPrams = {id: getUserInfo() &&getUserInfo().patientId, userType: getUserInfo() && getUserInfo().userType}
                if(getUserInfo() && getUserInfo().userType === USER_TYPES.CARE_TEAM){
                    manageConnectionPrams = {
                        id: getSelectedPatientInfo() && getSelectedPatientInfo().patientId,
                        userType: getSelectedPatientInfo() && getSelectedPatientInfo().userType
                    }
                }
                return this.goToManageConnection.bind(this, manageConnectionPrams)
            case MENU_TYPES.VIDEO_CONFERENCE:
                return getUserInfo() && getUserInfo().userType !== USER_TYPES.CARE_TEAM ? () => this.props.getVideoConferenceNotifications(true) : this.props.goToStartVideoConference
            case MENU_TYPES.ABOUT_US:
                return this.props.goToAboutUs
            case MENU_TYPES.SETTINGS:
                return this.props.goToNotificationSettings
            case MENU_TYPES.VISIT_HISTORY:
                return this.props.goToVisitHistory
            case MENU_TYPES.SUPPORT:
                return this.props.goToHelp
        }
    }

    onPressProfileSelection = () => {
        const selectedUserType = getSelectedPatientInfo() && getSelectedPatientInfo().userType
        if (this.props.userType === USER_TYPES.PATIENT) {
            let params = {
                id: global.currentUserPatientId,
                userType: USER_TYPES.PATIENT
            }
            this.props.goToProfile(params);
        } else if (this.props.userType === USER_TYPES.GUARDIAN ||
            this.props.userType === USER_TYPES.INDIVIDUAL_GUARDIAN) {
                let params = {
                    navigator: this.props.navigation
                }
            this.props.goToSelectIndividuals(params);
        } else if (this.props.userType === USER_TYPES.CARE_TEAM &&  selectedUserType === USER_TYPES.PATIENT ) {
            let params = {
                id: getSelectedPatientInfo().patientId,
                userType: USER_TYPES.PATIENT
            }
            this.props.goToProfile(params);
        }
    }

    startConference = () => {
        this.setState({isNotificationModalOpen: false}, () => {
            this.props.goToStartVideoConference()
            this.props.resetVideoConferences()
        })
    }

    render() {
        __DEV__ && console.log("MENU RENDER")
        const {patientImage, patientName} = this.props
        let userInfo = getUserInfo()
        let guardianImage = this.props.userImage ? {uri: this.props.userImage} : DasboardProfilePic ;
        let firstName = this.props.personalDetail ? this.props.personalDetail.firstName : ""
        let lastName = this.props.personalDetail ? this.props.personalDetail.lastName : ""
        const selectedUserInfo = getSelectedPatientInfo()
        if(userInfo && userInfo.userType === USER_TYPES.CARE_TEAM){
            firstName = selectedUserInfo.fullName
            lastName = ""
        }
        let menuActions = MENU_NAVIGATION
        if(getUserInfo() && getUserInfo().userType === USER_TYPES.GUARDIAN){
            menuActions = GUARDIAN_MENU_NAVIGATION
        }
        let RenderComponent = SafeView
        if(getUserInfo() && getUserInfo().userType === USER_TYPES.CARE_TEAM){
          RenderComponent = View
        }
        return (
            <RenderComponent>
            <OverlayLoaderWrapper style={styles.loadingStyle} isLoading={isAPIFetching(this.props.getOngoingVideoConferenceStatus)} >
            <NavbarWithImage showImage={false} title="Menu" showPowerIcon={true} onpowericonPressed={this.props.logout} />
            <TouchableHighlight onPress={this.onPressProfileSelection}>
                <View style={styles.profileCardView}>
                    <View style={styles.profileContent}>
                        <CoreoImage style={styles.profileImageStyle} source={this.props.userType === USER_TYPES.GUARDIAN || this.props.userType === USER_TYPES.INDIVIDUAL_GUARDIAN ? guardianImage && guardianImage : (patientImage ? {uri: patientImage} : DasboardProfilePic)} />
                        {/* <Text style={styles.profileTextStyle}>{selectedUserInfo.firstName || patientName.firstName} {selectedUserInfo.lastName || patientName.lastName}</Text> */}
                        <Text style={styles.profileTextStyle}>{firstName} {lastName}</Text>
                    </View>
                    <Icon {...Icons.angleRight} size={setFontSize(24)} color="#444444" />
                </View> 
            </TouchableHighlight>
            
            {menuActions.map((item) => (
                (item.permission === undefined || extractRole(item.permission).Read) &&
                <CoreoListItem
                    key={item.title}
                    text={item.title}
                    icon={item.icon}
                    type={item.type}
                    onPress={this.onPressMenuItem(item.type)}
                />))}
                {this.state.isNotificationModalOpen && <NotificationTray
                    notifications={this.props.videoConferenceNotifications}
                    isModalOpen={this.state.isNotificationModalOpen}
                    onClickCancel={() => {
                        this.setState({isNotificationModalOpen: false}, this.props.resetVideoConferences)
                    }}
                    onClickJoin={this.onClickJoinConference}
                    goToStartVideoConference={this.startConference}
                    canStartVideoConference={true}
                    />}
        </OverlayLoaderWrapper>
        </RenderComponent>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        goToManageConnection: (manageConnectionPrams) => dispatch(navigateToScreenMainStack(PATH? PATH.MANAGE_CONNECTION: null,manageConnectionPrams)),
        getPatientDetails: () => dispatch(getPatientDetails()),
        getPatientImage: () => dispatch(getPatientImage()),
        getImage: (data) => dispatch(getImage(data)),
        getPersonalDetail: (data) => dispatch(getPersonalDetail(data)),
        goToPayments: () => dispatch(navigateToScreenMainStack(PATH? PATH.PAYMENT: null)),
        goToConversationScreen: () => dispatch(navigateToScreenMainStack(PATH ? PATH.conversationSummary : null)),
        goToStartVideoConference: () => dispatch(navigateToScreenMainStack(PATH ? PATH.START_VIDEO_CONFERENCE_SCREEN: null)),
        goToSelectIndividuals: (params) => dispatch(navigateToScreenMainStack(PATH? PATH.SELECT_INDIVIDUAL_SCREEN: null,params)),
        goToNotificationSettings: () => dispatch(navigateToScreenMainStack(PATH ? PATH.NOTIFICATION_SETTINGS_SCREEN : null)),
        goToProfile: (params) => dispatch(navigateToScreenMainStack(PATH? PATH.PROFILE: null, params)),
        goToAboutUs: () => dispatch(navigateToScreenMainStack(PATH ? PATH.ABOUT_US: null)),
        navigateToNotification:()=>dispatch(navigateToScreenMainStack(PATH ? PATH.NOTIFICATION_SETTINGS_SCREEN: null)),
        logout: () => dispatch(onLogout()),
        goToHelp: () => dispatch(navigateToScreenMainStack(PATH ? PATH.HELP : null)),
        goToVisitHistory: () => dispatch(navigateToScreenMainStack(PATH ? PATH.VISIT_HISTORY : null)),
        resetVideoConferences: () => dispatch(resetVideoConferenceNotifications()),
        setRoomId: (roomId) => dispatch(setRoomId(roomId)),
        joinVideoConference: () => dispatch(joinVideoConference()),
        getVideoConferenceNotifications: (isFromMenu) => dispatch(getVideoConferenceNotifications(isFromMenu))
    }
}

function mapStateToProps(state) {
    const authState = state.authState && state.authState.userState
    const dashboardState = state.dashboardState && state.dashboardState.dashboardState
    return {
        patientImage: authState && authState.patientImage ? authState.patientImage.image: null,
        patientName: authState && authState.patientName,
        userType: authState && authState.userInfo.userType,
        userId: authState && authState.userInfo.coreoHomeUserId,
        userImage:authState && authState.userImage,
        personalDetail: state.profileState && state.profileState.PersonalDetailState.personalDetail,
        cTIndividualId : state.careTeamState && state.careTeamState.dashboardState && state.careTeamState.dashboardState.itemDetail.individualId,
        videoConferenceNotifications: dashboardState && dashboardState.menuVideoConferenceNotifications,
        getOngoingVideoConferenceStatus: dashboardState && dashboardState.getOngoingVideoConferenceStatus
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
