import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { onSendNewMessage } from '../../../redux/asyncMessages/actions';
import { MessageTypes } from '../../../constants/asyncMessage';
import styles from './styles';
import ModalPreview from './ModalPreview';
import ImagePicker from 'react-native-image-crop-picker';
import { checkSpace } from '../../../utils/validations';
import { ImageFormats, USER_TYPES } from '../../../constants/constants';
import { ModalPopup } from '../../../components';
import AMStyle from '../AsyncMsgStyles';

class SendMessage extends Component {
    state = {
        messageText: '',
        uploadedImageFile: [],
        showPreviewModal: false,
        imagedata: null,
        showInvalidImagePopUp: false,
    };

    onClickSendMessage = () => {
        let participants = [];
        let userId = this.props.loggedInUser.userId;
        let userType = this.props.loggedInUser.userType === USER_TYPES.INDIVIDUAL_GUARDIAN ? USER_TYPES.GUARDIAN : this.props.loggedInUser.userType;
        if (this.props.conversation && this.props.conversation.participantList) {
            this.props.conversation.participantList.map(participant => {
                participants.push(participant.userId);
            });
            let data = {
                conversationId: this.props.conversation.conversationId,
                messageType: this.state.imagedata ? MessageTypes.image : MessageTypes.text,
                messageText: this.state.imagedata ? '' : this.state.messageText.trim(),
                images: this.state.imagedata ? `data:${this.state.imagedata.mime};base64,${(this.state.imagedata.data)}` : null,
                participants: participants.toString(),
                createdBy: userId,
                createdByType: userType
            };
            this.props.sendMessage(data);
            this.setState({
                messageText: '',
                imagedata: null
            });
            this.props.updateMessageText('');
        };
    };

    updateMessageText = (text) => {
        this.setState({ messageText: text });
        this.props.updateMessageText(text);
    };

    onClickAttachment = () => {
        ImagePicker && ImagePicker.openPicker({
            mediaType: 'photo',
            includeBase64: true
        }).then(image => {
            if (image.size <= 2097152 && (image.mime === ImageFormats.JPG ||
                image.mime === ImageFormats.PNG ||
                image.mime === ImageFormats.JPEG ||
                image.mime === ImageFormats.GIF)) {
                this.setState({
                    imagedata: image,
                    showPreviewModal: true,
                });
            } else {
                this.setState({ showInvalidImagePopUp: true })
            }
        });
    };

    sendImageMessage = () => {
        this.setState({ showPreviewModal: false });
        this.onClickSendMessage();
    };

    closePreviewModal = () => {
        this.setState({ showPreviewModal: false });
    };

    render() {
        return (
            <View style={AMStyle.msglistouterWrapMessage}>
                <TouchableOpacity disabled={this.props.isDisabled} onPress={this.onClickAttachment}
                style={styles.sendBottonWrap}
                >
                    <Image
                        style={styles.actionButtons}
                        source={require('../Images/Attach_maroon.png')}
                        resizeMode="contain" />
                </TouchableOpacity>
                <TextInput style={AMStyle.inputFieldBtm}
                    underlineColorAndroid='transparent'
                    value={this.state.messageText}
                    onChangeText={this.updateMessageText}
                    editable={!this.props.isDisabled}
                    selectTextOnFocus={this.props.conversation && this.props.conversation.isActive}
                    multiline={true}
                />
                <TouchableOpacity
                    onPress={this.onClickSendMessage}
                    disabled={!checkSpace(this.state.messageText) || this.props.isDisabled}
                    style={styles.sendBottonWrap}
                    >
                    <Image
                        style={styles.actionButtons}
                        source={require('../Images/send.png')}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <ModalPreview
                    showPreviewModal={this.state.showPreviewModal}
                    closePreviewModal={this.closePreviewModal}
                    imagedata={this.state.imagedata}
                    sendButtom={true}
                    sendImageMessage={this.sendImageMessage}
                />
                <ModalPopup
                    visible={this.state.showInvalidImagePopUp}
                    primaryButton="Ok"
                    primaryColor="#3c1053"
                    secondaryColor="#6c757d"
                    onConfirm={() => this.setState({ showInvalidImagePopUp: !this.state.showInvalidImagePopUp })}>
                    <Text style={styles.message}>Please select a valid image. Image format should be JPEG / GIF / PNG and file should be less than 2 MB.</Text>
                </ModalPopup>
            </View>
        );
    }
};

function mapDispatchToProps(dispatch) {
    return {
        sendMessage: (data) => dispatch(onSendNewMessage(data)),
    }
};

const mapStateToProps = (state) => {
    return {
        conversation: state.asyncMessageState && state.asyncMessageState.conversation,
        loggedInUser: state.authState && state.authState.userState.userInfo,
        currentUser: state.authState && state.authState.userState
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendMessage);