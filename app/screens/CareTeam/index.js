import React, { Component } from 'react';
import { connect } from 'react-redux';
import CareTeamTabs from './CareTeamTabs/index'
import ErrorBoundary from '../../../ErrorBoundary';
import { Text } from 'react-native';
import { onLogout } from '../../redux/auth/Logout/actions';
import { ScreenCover, ModalPopup } from '../../components';
import { _ } from "../../utils/validations";
import { setRoomId, joinVideoConference, rejectConference } from '../../redux/telehealth/actions'

class CareTeam extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      roomNumber: null,
      initiatorName: ''
    }
  }

  onBtnPress = () => {
    this.props.onLogout();
  }

  onConfirm = () => {
    this.setState({
      showModal: !this.state.showModal,
    })
    this.props.setRoomId(this.state.roomNumber)
    this.props.joinVideoConference()
  }

  onCancel = () => {
    this.setState({
      showModal: !this.state.showModal,
    })
    this.props.rejectConference(this.state.roomNumber);
  }

  showVideoConferencePopup = (personalDetails) => {
    const { firstName, lastName } = personalDetails || {}
    return <ModalPopup
      visible={this.state.showModal}
      primaryButton="Accept"
      secondaryButton="Decline"
      primaryColor="#3c1053"
      secondaryColor="#6c757d"
      onConfirm={this.onConfirm}
      onCancel={this.onCancel}
    >
      <Text>{this.state.initiatorName} is inviting you to join a video conference.</Text>
    </ModalPopup>
  }

  render() {
    const { loggedInUserInfo } = this.props

    return (
      <ScreenCover>
        <ErrorBoundary >
          <CareTeamTabs />
          {this.showVideoConferencePopup(loggedInUserInfo)}
        </ErrorBoundary>
      </ScreenCover>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch(onLogout()),
    setRoomId: (data) => dispatch(setRoomId(data)),
    joinVideoConference: () => dispatch(joinVideoConference()),
    rejectConference: (data) => dispatch(rejectConference(data)),
  }
}


function mapStateToProps(state) {
  return {
    loggedInUserInfo: state.profileState.PersonalDetailState.personalDetail,
    userInfo: state.authState.userState.userInfo,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CareTeam);