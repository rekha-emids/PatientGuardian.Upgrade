import React, { Component } from 'react';
import {  AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import HomeTabs, { REQUESTS, DASHBOARD } from '../HomeTabs/index'
import { onLogout, sendToken } from '../../redux/auth/Logout/actions';
import { ScreenCover } from '../../components';
import { PATH } from '../../routes';
import { _ } from "../../utils/validations";
import { NOTIFICATION_LINKS, USER_INFO, USER_TYPES } from '../../constants/constants';
import { gotoConversation } from '../../redux/asyncMessages/actions'
import { navigateToScreenMainStack } from '../../redux/navigation/actions'
import firebase from 'react-native-firebase';
import { setRoomId, joinVideoConference, rejectConference, leaveVideoConference, endConference } from '../../redux/telehealth/actions'
import { CHANNEL_ID, CHANNEL_DESCRIPTION, CHANNEL_NAME } from '../../constants/constants'
import { getPersonalDetail } from '../../redux/profile/PersonalDetail/actions';
import ErrorBoundary from '../../../ErrorBoundary'
import { getDashboardMessageCount } from '../../redux/asyncMessages/actions';
import { getUserInfo } from '../../utils/userUtil';
import AlertPopup from '../../components/LevelOne/AlertPopup';
import styles from './styles'
class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      roomNumber: null,
      initiatorName: ''
    }
  }

  onBtnPress = () => {
    this.props.onLogout();
  }

  joinVideoConference = () => {
    this.props.setRoomId(this.state.roomNumber)
    this.props.joinVideoConference(this.onFailure)
  }

  setTimeoutLeaveConf = () => {
    setTimeout(this.joinVideoConference, 1000);
  }

  onFailure = () => {
    this.alreadyEnded.open()
  }

  rejectConference = () => {
    this.acceptDecline.close()
    this.props.rejectConference(this.state.roomNumber);
  }

  acceptConference = () => {
    this.acceptDecline.close()
    this.joinOrEndOngoingCall();
  }
  
  showAlreadyEndedCallPopup = () =>{
    return <AlertPopup
    ref={ref => (this.alreadyEnded = ref)}
    alertText={'This video conference is no longer active.'}
    />
  }

  joinOrEndOngoingCall = () => {
    if(this.props.roomId){
      this.props.initiator ? this.props.endConference(this.setTimeoutLeaveConf) : this.props.leaveVideoConference(this.setTimeoutLeaveConf);
    }else{
      this.joinVideoConference();
    }
  }
  showModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    })
    this.joinOrEndOngoingCall();
  }
  onCancel = () => {
    this.setState({
      showModal: !this.state.showModal,
    })
    this.props.rejectConference(this.state.roomNumber);
  }
  showVideoConferencePopup = (personalDetails) => {
    return <AlertPopup
    primaryButtonText="Accept"
    secondaryButtonText="Decline"    
    alertText={`${this.state.initiatorName} is inviting you to join a video conference.`}
    ref={ref => (this.acceptDecline = ref)}
    onConfirm={this.acceptConference}
    onCancel={this.rejectConference} />
  }

  async componentDidMount() {
    this.props.getPersonalDetail()
    if(getUserInfo().userType === USER_TYPES.GUARDIAN){
      let params = {
        userType: USER_TYPES.GUARDIAN,
        id: getUserInfo().userId
      }
      this.props.getPersonalDetail(params)
    }
    const channel = new firebase.notifications.Android.Channel(CHANNEL_ID, CHANNEL_NAME, firebase.notifications.Android.Importance.Max)
      .setDescription(CHANNEL_DESCRIPTION);

    // Create the channel
    firebase.notifications().android.createChannel(channel);

    this.registerKilledListener();

    if (!await firebase.messaging().hasPermission()) {
      try {
        await firebase.messaging().requestPermission();
      } catch (e) {
      }
    }

    firebase.messaging().getToken().then(token => {
      let data = {...this.props.userInfo,
        firebaseToken:token
      }
      let StringValue = JSON.stringify(data)
      AsyncStorage.setItem(USER_INFO, StringValue).then(this.props.sendToken(token)).catch((err)=>{
      })
    
    });

    this.props.getDashboardMessageCount();

  }


  registerKilledListener() {

    // these callback will be triggered even when app is killed
    this.notificationListener = firebase.notifications().onNotification(notification => {
      
      this.displayNotificationFromCustomData(notification);
    })

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const notif = notificationOpen.notification.data;
      switch (notif.module) {
        case NOTIFICATION_LINKS.SERVICE_REQUESTS:
          return this.props.tabNavigation.navigate(REQUESTS)

        case NOTIFICATION_LINKS.VISIT_PROCESSING_PAGE:
        {
            let params = {
              serviceRequestVisitId:notif.serviceRequestVisitId,
              notificationAction: true
            }
            return this.props.gotoVisitProcessing(params)
        }

        case NOTIFICATION_LINKS.VIDEO_CONFERENCE: {
          this.acceptDecline.open()
          return this.setState({roomNumber: notif.roomnumber, initiatorName: notif.intiatorname })
        }

        case NOTIFICATION_LINKS.MY_SERVICE_REQUEST:
          return this.props.goToVisitServiceDetails({ serviceRequestId: notif.servicerequestid, notificationAction: true })

        case NOTIFICATION_LINKS.CONVERSATIONS:
          return this.props.gotoConversation(notif.conversationid, {notificationAction: true})

        case NOTIFICATION_LINKS.PAYMENT_PROCESSING_PAGE:
          return this.props.goToVisitHistory({notificationAction: true})

        case NOTIFICATION_LINKS.SERVICE_DETAILS_PAGE:
          return this.props.goToVisitServiceDetails({ serviceRequestId: notif.servicerequestid, notificationAction: true })

        default:
          return this.props.tabNavigation.navigate(DASHBOARD)

      }
    });

    this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(token => {
      let data = {...this.props.userInfo,
        firebaseToken:token
      }
      let StringValue = JSON.stringify(data)
      AsyncStorage.setItem(USER_INFO, StringValue).then(this.props.sendToken(token)).catch((err)=>{
      })

    });
  }

  componentWillUnmount(){
    this.onTokenRefreshListener()
    this.notificationOpenedListener()
    this.notificationListener()
  }

  displayNotificationFromCustomData(message) {
    if (message.data && message.data.title) {
      let notification = new firebase.notifications.Notification({
        sound: 'default',
        show_in_foreground: 'true'
      });
      notification = notification
        .setTitle(message.data.title)
        .setBody(message.data.body)
        .setData(message.data)
        .setSound("bell.mp3")
      notification.android.setAutoCancel(true);
      notification.android.setPriority(firebase.notifications.Android.Priority.High)
      notification.android.setChannelId(CHANNEL_ID)
      firebase.notifications().displayNotification(notification);
    }
  }

  render() {
    const { loggedInUserInfo } = this.props
    let props = {style: styles.marginTop}
    if(getUserInfo() && getUserInfo().userType === USER_TYPES.CARE_TEAM){
      props = {}
    }
    return (
        <ErrorBoundary>
          <ScreenCover {...props}>
            <HomeTabs screenProps={{ unreadMessagesCount: this.props.unreadMessageCount }}/>
            {this.showVideoConferencePopup(loggedInUserInfo)}
            {this.showAlreadyEndedCallPopup()}
          </ScreenCover>
        </ErrorBoundary>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    navigateToScreenMainStack: (url) => dispatch(navigateToScreenMainStack(url)),
    onLogout: () => dispatch(onLogout()),
    sendToken: (token) => dispatch(sendToken(token)),
    gotoConversation: (conversationId, params) => dispatch(gotoConversation(conversationId,null, null, params)),
    goToVisitServiceDetails: (params) => dispatch(navigateToScreenMainStack(PATH.VISIT_SERVICE_DETAILS, params)),
    goToStartVideoConference: () => dispatch(navigateToScreenMainStack(PATH.START_VIDEO_CONFERENCE_SCREEN)),
    goToPayments: () => dispatch(navigateToScreenMainStack(PATH.PAYMENT)),
    goToVisitHistory: (params) => dispatch(navigateToScreenMainStack(PATH.VISIT_HISTORY, params)),
    setRoomId: (data) => dispatch(setRoomId(data)),
    joinVideoConference: (onFailure) => dispatch(joinVideoConference(onFailure)),
    leaveVideoConference: (onSuccess) => dispatch(leaveVideoConference(false, onSuccess)),
    getPersonalDetail: (params) => dispatch(getPersonalDetail(params)),
    rejectConference: (data) => dispatch(rejectConference(data)),
    gotoVisitProcessing:(params)=> dispatch(navigateToScreenMainStack(PATH.VISIT_PROCESSING, params)),
    getDashboardMessageCount: () => dispatch(getDashboardMessageCount()),
    endConference: (onSuccess) => dispatch(endConference(onSuccess))

  }
}

function mapStateToProps(state) {
  let telehealthState = state.telehealthState;
  return {
    roomId: telehealthState && state.telehealthState.roomId,
    tabNavigation: state.dashboardState && state.dashboardState.dashboardState.tabNavigation,
    loggedInUserInfo: state.profileState && state.profileState.PersonalDetailState && state.profileState.PersonalDetailState.personalDetail,
    userInfo: state.authState && state.authState.userState.userInfo,
    unreadMessageCount: state.asyncMessageState && state.asyncMessageState.dashboardMessageCount,
    initiator: telehealthState && state.telehealthState.initiator
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
