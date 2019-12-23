import React, { Component } from "react";
import {Text} from 'react-native'
import { connect } from 'react-redux';
import { joinVideoConference } from '../../../redux/telehealth/actions';
import { ScreenCover, ModalPopup } from '../../../components';
import { navigateToScreenMainStack } from '../../../redux/navigation/actions';
import { PATH } from '../../../routes';

class InvitationAlert extends Component { 

    state = {
        showModal: true
    }

    joinVideoConference = () =>{
        this.setState({
            showModal: !this.state.showModal,
        })
        this.props.joinVideoConference();
    }

    onReject = () => {
        this.setState({
            showModal: !this.state.showModal,
        })
        this.props.goToHome();
    }

    render(){
        return (
            <ScreenCover>
                <ModalPopup
                    visible={this.state.showModal}
                    primaryButton="Accept"
                    secondaryButton="Reject"
                    primaryColor="#3c1053"
                    secondaryColor="#6c757d"
                    onConfirm={this.joinVideoConference}
                    onCancel={this.onReject}
                >
                    <Text>You have a new video conference invite.</Text>
                </ModalPopup>
            </ScreenCover>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        joinVideoConference: () => dispatch(joinVideoConference()),
        goToHome: () => dispatch(navigateToScreenMainStack(PATH ?PATH.HOME_SCREEN:null))
    }
};
  
export default connect(null, mapDispatchToProps)(InvitationAlert);
  