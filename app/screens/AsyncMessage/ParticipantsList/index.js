import React, { Component } from 'react';
import {
    View,
    Text,
    Platform,
    Image,
    FlatList,
    TouchableOpacity,

} from 'react-native';
import { connect } from 'react-redux';
import {
    gotoConversation,
    leaveConversation,
    gotoAddParticipants,
    setRemoveParticipantConcurrency
} from '../../../redux/asyncMessages/actions';
import Participants from './Participants';
import styles from './styles';
import AsyncStyle from '../AsyncStyle';
import { ModalPopup } from '../../../components';
import { USER_TYPES } from '../../../constants/constants';
import LinearGradient from 'react-native-linear-gradient';
import { NAVBAR_COLOR1, NAVBAR_COLOR2 } from '../../../constants/theme';
import { onBack } from '../../../redux/navigation/actions';
import { SafeView } from '../../../components/LevelOne';
import { OverlayLoaderWrapper } from '../../../components/Base/Preloader/Preloader';
import { isAPIFetching } from '../../../utils/AppAPIUtils';
class ParticipantsList extends Component {
    state = {
        showModalOnCancel: false,
        isDisabled: false
    };

    _keyExtractor = (item, index) => item.userId.toString();

    sortParticipantList = () => {
        let userId = this.props.loggedInUser && this.props.loggedInUser.userId;
        let participantsList = this.props.conversation && this.props.conversation.participantList;
        let index = -1;
        let isActive = false
        if (participantsList && participantsList.length > 0) {
            index = participantsList.indexOf(
                participantsList.filter(el => el.userId === userId)[0]
            );
        }

        if (index > -1) {
            let currentUser = participantsList[index];
            currentUser.firstName = 'Me';
            participantsList.splice(index, 1);
            participantsList.push(currentUser);
            isActive = true
        };
        return {participantsList, isActive};
    };

    gotoConversation = () => {
        this.props.gotoConversation(this.props.selectedConversationId);
    };

    gotoAddParticipants = () => {
        this.props.gotoAddParticipants(this.props.selectedConversationId);
    };

    leaveConversation = () => {
        this.setState({isDisabled: true});
        let userId = this.props.loggedInUser.userId;
        let data = {
            conversationId: this.props.conversation.conversationId,
            userId: userId
        };
        this.props.leaveConversation(data);
    };

    showModalOnCancel = () => this.setState({
        showModalOnCancel: !this.state.showModalOnCancel,
    })
    render() {
        let {participantsList, isActive} = this.sortParticipantList();
        let isEditable = this.props.conversation && this.props.conversation.isActive
        if(this.props.loggedInUser && this.props.loggedInUser.userType === USER_TYPES.CARE_TEAM){
            isEditable = this.props.conversation.isActive || (this.props.conversation.createdByType === USER_TYPES.CARE_TEAM && this.props.conversation.createdByType === this.props.loggedInUser.userId)
        }
        return (
            <SafeView>
            <OverlayLoaderWrapper style={{flex: 1}} isLoading={isAPIFetching(this.props.loadingStatus)}>
            <View style={AsyncStyle.wrapperView}>
                <LinearGradient colors={[NAVBAR_COLOR1, NAVBAR_COLOR2]} style={AsyncStyle.headerContainer}>
                    <View style={AsyncStyle.headerLeftWrap}>
                        <TouchableOpacity
                            onPress={this.props.goBack}>
                            <Image style={AsyncStyle.headerRightIcons}
                                source={require('../Images/back.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={AsyncStyle.headerMidWrap}>
                        <Text style={AsyncStyle.HeaderTextLd}>
                            Participants
                        </Text>
                    </View>
                    <View style={AsyncStyle.headerRightWrap}>
                    {isEditable &&
                      <TouchableOpacity
                            onPress={this.gotoAddParticipants}>
                            <Image style={AsyncStyle.headerRightIcons}
                                source={require('../Images/Add_Participants.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity> }
                    </View>
                </LinearGradient>

                <View style={AsyncStyle.contentContainer}>
                    <View style={styles.participantContainer}>
                        <FlatList
                            data={participantsList}
                            renderItem={({ item }) =>
                                <Participants
                                    participant={item}
                                    conversationId={this.props.conversation.conversationId}
                                    loggedInUser={this.props.loggedInUser}
                                    isActive={isActive}
                                />}
                            keyExtractor={this._keyExtractor}
                        />
                    </View>
                </View>
                {isEditable && 
                <TouchableOpacity
                    style={styles.leaveButton}
                    onPress={() => (this.setState({ showModalOnCancel: true }))}
                    disabled={!this.props.conversation.isActive}>
                    <Image style={[Platform.OS == 'ios' || Platform.OS == 'ipad' ? styles.buttonIcon : styles.buttonIcon]}
                        source={require('../Images/leave_conversation.png')}
                        resizeMode="contain"
                    />
                    <Text style={styles.buttonText}>Leave conversation</Text>
                </TouchableOpacity>}
               

                <ModalPopup
                    visible={this.state.showModalOnCancel}
                    primaryButton="Confirm"
                    secondaryButton="Cancel"
                    primaryColor="#3c1053"
                    secondaryColor="#6c757d"
                    onConfirm={this.leaveConversation}
                    isDisabled={this.state.isDisabled}
                    onCancel={this.showModalOnCancel}
                >
                    <Text style={styles.message}>Are you sure you want to leave this conversation?</Text>
                </ModalPopup>

                <ModalPopup
                    visible={this.props.removeParticipantConcurrencyExist}
                    primaryButton="OK"
                    primaryColor="#3c1053"
                    onConfirm={() => this.props.setRemoveParticipantConcurrency(false)}
                >
                    <Text style={styles.message}>Please note that your information was unable to be saved due to another user updating the same information at the same time. Return to further update as needed.</Text>
                </ModalPopup>

            </View>
            </OverlayLoaderWrapper>
            </SafeView>
        )
    };
};

function mapDispatchToProps(dispatch) {
    return {
        goBack: () => dispatch(onBack()),
        gotoConversation: (id) => dispatch(gotoConversation(id)),
        leaveConversation: (data) => dispatch(leaveConversation(data)),
        gotoAddParticipants: (conversationId) => dispatch(gotoAddParticipants(conversationId)),
        setRemoveParticipantConcurrency: (data ) => dispatch(setRemoveParticipantConcurrency(data)),
    }
};

function mapStateToProps(state) {
    return {
        conversation: state.asyncMessageState && state.asyncMessageState.conversation,
        loggedInUser: state.authState && state.authState.userState.userInfo,
        selectedConversationId: state.asyncMessageState && state.asyncMessageState.selectedConversationId,
        removeParticipantConcurrencyExist: state.asyncMessageState && state.asyncMessageState.removeParticipantConcurrencyExist,
        loadingStatus: state.asyncMessageState && state.asyncMessageState.isLoading,
        currentUser: state.authState && state.authState.userState

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantsList);