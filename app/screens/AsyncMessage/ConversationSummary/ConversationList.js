import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { formatDateAgo } from '../../../utils/momentUtil';
import { MessageTypes } from '../../../constants/asyncMessage';
import { gotoCreateConversation } from '../../../redux/asyncMessages/actions';
import { stringHelper } from '../../../utils/stringHelper';
import conversationstyles from './styles';
import { DasboardProfilePic } from '../../../assets/images';

class ConversationList extends Component {

    getPartcipitantHeader = (participants) => {
        __DEV__ && console.log("participants are: ",participants)
        let header = "";
        if (participants && participants.length > 0) {
            participants.map(participant => {
                header += stringHelper(participant.firstName) + ', ';
            });
            header = header.slice(0, -2);
        }
        return header;
    };

    participantsContent = (participants) => {
        let extraParticipants = (participants.length - 1);
        let totalParticipants = participants.length;
        if (totalParticipants > 0) {
            let leftUserImage = participants[0].thumbNail;
            if (totalParticipants == 1) {
                return (
                
                    <Image
                        style={conversationstyles.avtrHolderWrap}
                        source={leftUserImage ? { uri: leftUserImage } : DasboardProfilePic}
                        resizeMode="cover"
                    />
                )
            }
            else if (extraParticipants == 1) {
                let rightUserImage = participants[1].thumbNail;
                return (
                    <View style={conversationstyles.imageViewWrap}>
                        <Image
                            style={conversationstyles.avtrHolderWrap}
                            source={leftUserImage ? { uri: leftUserImage } : DasboardProfilePic}
                            resizeMode="cover"
                        />
                        <Image
                            style={[conversationstyles.avtrHolderWrap, conversationstyles.extraIcon]}
                            source={rightUserImage ? { uri: rightUserImage } : DasboardProfilePic}
                            resizeMode="cover"
                        />
                    </View>)
            } else {
                return (
                    <View style={conversationstyles.imageViewWrap}>
                        <Image
                            style={conversationstyles.avtrHolderWrap}
                            source={leftUserImage ? { uri: leftUserImage } : DasboardProfilePic}
                            resizeMode="cover"
                        />
                        <View style={[conversationstyles.avtrHolderWrap, conversationstyles.avtrHolderRight]}>
                            <Text style={conversationstyles.avtrCountText}>{'+' + extraParticipants}</Text>
                        </View>
                    </View>
                )
            }
        };
    };

    messageList = (msgThread) => {
        let msgHeader = null;
        let unreadMessages = null;
        let isReadMessage = true;
        let createdDate = msgThread.createdDate;
        if (msgThread.unreadCount) {
            isReadMessage = false;
            unreadMessages = <View style={conversationstyles.unreadHolder}>
                <Text style={conversationstyles.unreadText}>{msgThread.unreadCount}</Text>
            </View>
        };

        if (!msgThread.title) {
            msgHeader = this.getPartcipitantHeader(msgThread.participantList);
        } else {
            msgHeader = msgThread.title;
        };

        return (
            <View style={conversationstyles.msglistouterWrapUnread}>
                <View style={conversationstyles.fixLeftWidth}>
                {this.participantsContent(msgThread.participantList)}
                </View>
                <View style={conversationstyles.msglistmsgWrap}>
                        <Text style={conversationstyles.msglistmsgTitle} numberOfLines={1}>{msgHeader}</Text>
                    {msgThread.messageType === MessageTypes.image ?
                        <View style={conversationstyles.msglistAttachWrap}>
                                <Image
                                    style={conversationstyles.attachIcon}
                                    source={require('../../../assets/images/Attach.png')}
                                />
                            <Text style={conversationstyles.msglistImgText}>Image</Text>
                        </View> :
                            <Text style={conversationstyles.msglistmsgText} numberOfLines={1}>{msgThread.messageText}</Text>
                        }
                </View>
                <View style={conversationstyles.msgliststatsWrap}>
                    {unreadMessages}
                        <Text style={conversationstyles.dateText}>{formatDateAgo(createdDate)}</Text>
                </View>
            </View>
        )
    };

    gotoConversation = () => {
            this.props.requestProps? this.props.requestProps.gotoConversation(this.props): null
    }

    render() {
        __DEV__ && console.log("this.props in conversationList is: ",this.props)
        let messageThreads = this.messageList(this.props);
        return (
            <TouchableOpacity 
                onPress = {this.gotoConversation}
            >
                {messageThreads}
            </TouchableOpacity>
        )
    };
};


function mapDispatchToProps(dispatch) {
    return {
        gotoCreateConversation: () => dispatch(gotoCreateConversation())
    }
};

function mapStateToProps(state) {
    return {
        isLoading: state.asyncMessageState.isLoading,
        loggedInUser: state.authState.userState.userInfo,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationList);