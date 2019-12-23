import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import {
  TwilioVideo,
  TwilioVideoLocalView,
  TwilioVideoParticipantView
} from 'react-native-twilio-video-webrtc';
import moment from 'moment';
import { connect } from 'react-redux';
import { ModalPopup, CoreoText } from '../../../components';
import PopoverTooltip from 'react-native-popover-tooltip';
import InviteParticipantsTeleHealth from '../InviteParticipants';
import ViewParticipantsTeleHealth from '../ViewParticipants';
import TeleHealthVideoControls from './TeleHealthVideoControls';
import ParticipantView from './ParticipantView';
import {TeleHealthSettings} from '../../../constants/config';
import {switchCamera} from '../../../assets/images/TeleHealth';
import {generateToken, leaveVideoConference, endConference} from '../../../redux/telehealth/actions';
import styles from './styles';
import popoverStyle from '../Components/PopOver/styles';
import { OverlayLoaderWrapper } from '../../../components/Base/Preloader/Preloader';
import { isAPIFetching } from '../../../utils/AppAPIUtils';
import { isIOS } from '../../../utils/appUtils';

class VideoConference extends Component {

  state = {
    isAudioEnabled: true,
    isVideoEnabled: true,
    isLocalVideoEnabled: true,
    status: 'disconnected',
    participants: new Map(),
    videoTracks: new Map(),
    roomName: '',
    token: '',
    selectedTrack: '',
    identity: 'Me',
    sessionInactivePopup: false,
    timeStartedSeconds: 0,
    timeStarted: '',
    currentDateTime: moment().format('MM/DD/YYYY HH:mm'),
    inviteParticipantsView: false,
    participantsView: false,
    showLeaveConfModal: false
  }

    componentWillMount() {
      this._onGenerateTokenPress();
    }

    componentWillReceiveProps(nextprops) {
      if (this.props.telehealthToken !== nextprops.telehealthToken) {
        this._onConnectButtonPress(nextprops.telehealthToken);
      }
    }

    componentWillUnmount() {
      this.disconnectConversation();
    }
    
    _onGenerateTokenPress = () => {
      this.props.generateToken()
    }

  _onConnectButtonPress = (token) => {
    this.refs.twilioVideo && this.refs.twilioVideo.connect({ roomName: this.props.roomId, accessToken: token })
    this.setState({status: 'connecting'})
  }

  _onRoomDidConnect = () => {
    this.setState({status: 'connected'})
    this.checkMaxVideoCallHour();
    this.checkSessionInactive();
    this.checkTimeStarted();
  }

  _onRoomDidDisconnect = () => {
    this.setState({status: 'disconnected'})
  }

  _onRoomDidFailToConnect = () => {
    this.setState({status: 'disconnected'})
  }

  _onLeaveButtonPress = () => {
    this.disconnectConversation()
    if (this.props.initiator) {
      this.props.endConference();
    } else {
      this.props.leaveRoom()
    }
  }

  _onEndButtonPress = () => {
    this.disconnectConversation()
    this.props.endConference();

  }

  disconnectConversation = () => {
    if(this.state.status === 'connected') {
      this.refs.twilioVideo && this.refs.twilioVideo.disconnect()
    }
  }

  _onMuteButtonPress = () => {
    this.refs.twilioVideo && this.refs.twilioVideo.setLocalAudioEnabled(!this.state.isAudioEnabled)
      .then(isEnabled => this.setState({isAudioEnabled: isEnabled}))
  }

  _onParticipantAddedVideoTrack = ({participant, track}) => {
    const syncVideoTracks = this.state.videoTracks;
    for (const [key, value] of syncVideoTracks) {
      if (value.participantSid === participant.sid) {
        syncVideoTracks.delete(value.videoTrackSid);
      }
    }

    syncVideoTracks.set(track.trackSid, { participantSid: participant.sid, videoTrackSid: track.trackSid, identity: participant.identity });

    this.setState({
      videoTracks: syncVideoTracks
    });
  }

  _onParticipantRemovedVideoTrack = ({participant, track}) => {
    const syncVideoTracks = this.state.videoTracks;
    syncVideoTracks.delete(track.trackSid);

    this.setState({videoTracks: syncVideoTracks})
  }

  _onsetLocalVideoEnabled = () => {
    this.refs.twilioVideo&& this.refs.twilioVideo.setLocalVideoEnabled(!this.state.isLocalVideoEnabled)
      .then(isEnabled => this.setState({isLocalVideoEnabled: isEnabled}))
  }

  _onFlipButtonPress = () => {
    this.refs.twilioVideo&& this.refs.twilioVideo.flipCamera();
  }

  checkTimeStarted = () => {
    setInterval(() => {
        let timeStarted = moment("2015-01-01").startOf('day')
        .seconds(this.state.timeStartedSeconds + 1)
        .format('HH:mm:ss');
        this.setState({
            timeStarted: timeStarted, 
            timeStartedSeconds: this.state.timeStartedSeconds + 1,
            currentDateTime: moment().format('MM/DD/YYYY HH:mm')
        });
    }, 1000);
  }

  checkSessionInactive = () => {
    setTimeout(() => {
     this.setState({sessionInactivePopup: true});
    }, TeleHealthSettings.sessionInactiveInMs);
  }

  checkMaxVideoCallHour = () => {
      setTimeout(() => {
          this._onEndButtonPress();
      }, TeleHealthSettings.maxVideoCallHourInMs);
  }

  onleaveConf = () => {
    this.setState({
      showLeaveConfModal: !this.state.showLeaveConfModal,
    })
    this._onLeaveButtonPress()
  }

  OnNotLeaveConf = () => {
    this.setState({
      showLeaveConfModal: !this.state.showLeaveConfModal,
    })
  }

  onElapsedCancel = () => {
    this.setState({
        sessionInactivePopup: !this.state.sessionInactivePopup,
    })
    this.checkSessionInactive();
  }

  onElapsedLeave = () => {
    this.setState({
        sessionInactivePopup: !this.state.sessionInactivePopup,
    })
    this._onLeaveButtonPress()
  }

  showLeaveConfModal = () => {this.setState({showLeaveConfModal: true})}

  goBackParticipantView = () => {this.setState({participantsView: false})}

  goBackInviteParticipantView = () => {this.setState({inviteParticipantsView: false})}

  resetSelectedTrack = () => this.setState({selectedTrack: ''})

  pressViewParticiapnt = () => {this.setState({participantsView: true})}

  pressInviteParticipantView = () => {this.setState({inviteParticipantsView: true})}

  render() {

    let selectedName = 'Me';
    this.props.participantList && this.props.participantList.map((existingParticipant) => {
        if (this.state.selectedTrack.identity && parseInt(this.state.selectedTrack.identity, 10) === existingParticipant.userId) {
            selectedName = existingParticipant.firstName + ' ' + existingParticipant.lastName;
        }
    });

    let textStyle = {}
    if(!isIOS()){
      textStyle = {
        color: "black"
      }
    }
    let fullView =
      <View style={styles.localVideo}>
        {!this.state.selectedTrack ?
          <TwilioVideoLocalView
            enabled={true}
            style={styles.localInteralVideo}
          />:
          <TwilioVideoParticipantView
            style={styles.localInteralVideo}
            key={this.state.selectedTrack.videoTrackSid}
            trackIdentifier={{
              participantSid: this.state.selectedTrack.participantSid,
              videoTrackSid: this.state.selectedTrack.videoTrackSid
            }}
            trackSid={this.state.selectedTrack.videoTrackSid}
          />
        }
        {/* All other parts */}
        <View style={styles.localVideoTopRight}>
          <TouchableOpacity onPress={this._onFlipButtonPress}>
            <Image
                style={styles.icon}
                source={switchCamera}
                resizeMode="contain"
                on
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if(this.refs['tooltip']) {
                this.refs['tooltip'].toggle();
              }
            }}>
            <PopoverTooltip
                  ref={'tooltip'}
                  tooltipContainerStyle={{ borderRadius: 0 }}
                  allItemContainer={popoverStyle.allItemContainer}
                  triangleUp={popoverStyle.triangle}
                  triangleDown={popoverStyle.triangle}
                  triangleOffset={0}
                  labelSeparatorColor={'#fff'}
                  buttonComponent={
                      <View>
                          <Image style={popoverStyle.image}
                            source={require('../../../assets/images/TeleHealth/Dots_white.png')}
                            resizeMode="contain"
                          />
                      </View>
                  }
                  labelContainerStyle={popoverStyle.labelContainerStyle}
                  delayLongPress={0}
                  items={[
                    {
                        label: 'View Participants',
                        onPress: this.pressViewParticiapnt
                    },
                    {
                        label: 'Invite Participants',
                        onPress: this.pressInviteParticipantView
                    }
                ]}
              />
          </TouchableOpacity>
        </View>
        <View style={styles.localVideoTopLeft}>
          <CoreoText style={styles.localVideoTopTxt}>{this.state.timeStarted}</CoreoText>
          <CoreoText style={styles.localVideoTopTxt}>{this.state.currentDateTime}</CoreoText>
        </View>
        <View style={styles.localVideoCenter}>
          <CoreoText  style={styles.localVideoCenterText}>{selectedName}</CoreoText>
        </View>
        {
          (this.state.status === 'connected' || this.state.status === 'connecting') &&
            <ParticipantView
              resetSelectedTrack={this.resetSelectedTrack}
              identity={this.state.identity}
              videoTracks={this.state.videoTracks}
              selectedTrack={(track) => this.setState({selectedTrack: track})}
              status={this.state.status}
              participantList={this.props.participantList}
            />
        }
      </View>

    return (
      <View style={styles.fullContainer}>
        <OverlayLoaderWrapper style={{flex: 1}} isLoading={isAPIFetching(this.props.loadingStatus)}>

        {
          this.state.inviteParticipantsView ?
          <InviteParticipantsTeleHealth goBack={this.goBackInviteParticipantView}/> :
          (this.state.participantsView ? 
          <ViewParticipantsTeleHealth goBack={this.goBackParticipantView}/> :
          <View style={styles.container}>
              {fullView}
              <TeleHealthVideoControls
                isAudioEnabled={this.state.isAudioEnabled}
                controlAudio={this._onMuteButtonPress}
                isLocalVideoEnabled={this.state.isLocalVideoEnabled}
                controlVideo={this._onsetLocalVideoEnabled}
                initiator={this.props.initiator}
                leaveConference={this.showLeaveConfModal}
                endConference={this._onEndButtonPress}
                textStyle={textStyle}
              />
          </View>)
        }
        <TwilioVideo
          ref="twilioVideo"
          onParticipantAddedVideoTrack={ this._onParticipantAddedVideoTrack }
          onParticipantRemovedVideoTrack= { this._onParticipantRemovedVideoTrack }
          onRoomDidConnect={ this._onRoomDidConnect }
          onRoomDidDisconnect={ this._onRoomDidDisconnect }
          onRoomDidFailToConnect= { this._onRoomDidFailToConnect }
        />

        <ModalPopup
            visible={this.state.sessionInactivePopup}
            primaryButton="Cancel"
            secondaryButton="Leave"
            customBtnFlag={true}
            onConfirm={this.onElapsedCancel}
            onCancel={this.onElapsedLeave}
          >
            <CoreoText style={styles.message}>30 mins has elapsed. Would you like to continue?</CoreoText>
        </ModalPopup>
        <ModalPopup
            visible={this.state.showLeaveConfModal}
            primaryButton="Cancel"
            secondaryButton="Leave"
            customBtnFlag={true}
            onConfirm={this.OnNotLeaveConf}
            onCancel={this.onleaveConf}
          >
            <CoreoText style={styles.message}>This will leave you out from ongoing video conference. Are you sure you want to continue?</CoreoText>
        </ModalPopup>
        </OverlayLoaderWrapper>
      </View>
      
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
      generateToken: () => dispatch(generateToken()),
      leaveRoom: () => dispatch(leaveVideoConference(false)),
      endConference: () => dispatch(endConference())
  }
}

function mapStateToProps(state) {
  let telehealthState = state.telehealthState;
  return {
      telehealthToken: telehealthState && state.telehealthState.token,
      roomId: telehealthState && state.telehealthState.roomId,
      participantList: telehealthState && state.telehealthState.participantsByConferenceId,
      initiator: telehealthState && state.telehealthState.initiator,
      loadingStatus: telehealthState && state.telehealthState.isLoading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoConference);