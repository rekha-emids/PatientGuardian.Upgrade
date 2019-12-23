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
import styles from './styles';
import ModalPreview from './ModalPreview';
import { getConversationImageWithImageId, clearConversationImageUrl } from '../../../redux/asyncMessages/actions';
import { DasboardProfilePic } from '../../../assets/images';
import { getUserInfo } from '../../../utils/userUtil';



class ConversationScreen extends Component {


    state = {
        asyncImgModal: false
    }

    static getDerivedStateFromProps(props, state) {
        return {
            asyncImgModal: props.messageUrl && props.messageUrl.length > 0 ? true : false
        };
    };

    displayImagePreview = () => {
        if (this.props.messageUrl.length === 0) {
            this.props.getConversationImageWithImageId(this.props.message.conversationMessageId);
        } else {
            this.props.clearConversationImageUrl();
        };
    };

    renderMessages = () => {
        let isHost = false;
        let userId = getUserInfo() && getUserInfo().userId ;
        if (this.props.message && this.props.message.createdBy === userId) {
            isHost = true;
        };

        return (
            <View style={[styles.msglistouterWrap_ConScrn, isHost ? { flexDirection: 'row-reverse', alignSelf: "flex-end" } : {}]}>
                <Image
                    style={styles.profileIconinnerWrap}
                    source={this.props.message && this.props.message.createdByThumbnail ? { uri: this.props.message.createdByThumbnail } : DasboardProfilePic}
                    resizeMode="cover"
                />
                <View style={[styles.msglistmsgWrap, isHost ? {borderTopRightRadius:0}:{borderTopLeftRadius: 0}]}>
                    <View style={[styles.msglistTitleWrap]}>
                        <Text style={styles.msglistmsgTitle} numberOfLines={1}>{this.props.message && (`${this.props.message.firstName} ${this.props.message.lastName}`)}</Text>
                        <Text style={styles.msglistmsgDate}>{this.props.message && formatDateAgo(this.props.message.createdDate)}</Text>
                    </View>
                    {this.props.message && this.props.message.messageType == MessageTypes.text ? <View style={styles.msgText}>
                        <Text style={styles.msglistmsgText}>{this.props.message.messageText}</Text>
                    </View> :
                        <TouchableOpacity onPress={this.displayImagePreview}>
                            <View>
                                <Image source={{ uri: this.props.message && this.props.message.thumbnail }} style={styles.imageThumbnail} />
                            </View>
                        </TouchableOpacity>}
                </View>
            </View>
        );
    };


    render() {
        let messages = this.renderMessages();
        return (
            <View>
                {messages}
                <ModalPreview
                    showPreviewModal={this.state.asyncImgModal}
                    closePreviewModal={this.displayImagePreview}
                    imagedata={this.props.messageUrl}
                />
            </View>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.authState.userState.userInfo,
        messageUrl: state.asyncMessageState.conversationImageUrl,
    };
}


function mapDispatchToProps(dispatch) {
    return {
        getConversationImageWithImageId: (messageId) => dispatch(getConversationImageWithImageId(messageId)),
        clearConversationImageUrl: () => dispatch(clearConversationImageUrl())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ConversationScreen);
