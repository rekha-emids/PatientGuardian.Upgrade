import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ModalPopup } from '../../LevelOne/ModalPopup';
import { onRemoveParticipant } from '../../../redux/asyncMessages/actions';
import { connect } from 'react-redux';
import styles from './styles';
import  { Popup }  from '../PopOver';
import { USER_TYPES } from '../../../constants/constants';
import { navigateToScreenMainStack } from '../../../redux/navigation/actions'
import { PATH } from '../../../routes';
class Dots extends Component {

    state = {
        showModalOnCancel: false,
        touchable: null
    };

    cancelModel = () => {
        this.setState({ showModalOnCancel: true });
    }

    showModal = () => {
        setTimeout(this.cancelModel, 500);

    };

   viewProfile = () => {
       let params ={
           id : this.props.spId,
           userType: this.props.participantType,
           canEditable: false
       }
    if(this.props.participantType === USER_TYPES.SERVICE_PROVIDER){
        this.props.navigateToScreenMainStack(PATH.SERVICE_PROVIDER_PROFILE, params )
    }else{
        this.props.navigateToScreenMainStack(PATH.PROFILE, params)
    }
   }
    onRemoveParticipant = () => {
        let userId = this.props.loggedInUser.userId;
        let userType = this.props.loggedInUser.userType === USER_TYPES.INDIVIDUAL_GUARDIAN ? USER_TYPES.GUARDIAN : this.props.loggedInUser.userType;
        let participanList = [{
            userId: this.props.participant.userId,
            firstName: this.props.firstName,
            lastName: this.props.lastName
        }];
        let data = {
            conversationId: parseInt(this.props.conversationId),
            participants: parseInt(this.props.participant.userId),
            modifiedBy: userId,
            participantList: participanList,
            modifiedByType: userType,
            participantType: this.props.participantType,

        };

        this.props.onRemoveParticipant(data);
    };

    onCancel = () => this.setState({
        showModalOnCancel: !this.state.showModalOnCancel,
    })


    render() {

        return (
            <View style={styles.container}>
                <Popup showModal={this.showModal} isActive={this.props.isActive} userType={this.props.loggedInUser?this.props.loggedInUser.userType:''} viewProfile={this.viewProfile} />
                <ModalPopup
                    visible={this.state.showModalOnCancel}
                    primaryButton="Remove"
                    secondaryButton="Cancel"
                    primaryColor="#3c1053"
                    secondaryColor="#6c757d"
                    onConfirm={this.onRemoveParticipant}
                    onCancel={this.onCancel}
                >
                    <Text>Are you sure you want to remove {this.props.firstName} {this.props.lastName} from the conversation?</Text>
                </ModalPopup>
            </View>

        );
    }
}



function mapDispatchToProps(dispatch) {
    return {
        onRemoveParticipant: (data) => dispatch(onRemoveParticipant(data)),
        navigateToScreenMainStack: (url, params) => dispatch(navigateToScreenMainStack(url, params))
    }
};

function mapStateToProps(state) {
    const conversationState = state.asyncMessageState
    const authState = state.authState
    return {
        conversation: conversationState && conversationState.conversation,
        loggedInUser: authState && authState.userState.userInfo,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dots);