import React, { Component } from 'react';
import { Modal, View, TouchableOpacity, Image } from 'react-native';
import styles from './ModalPreviewStyles';

class ModalPreview extends Component {
    render() {
        let isUrlString = false;

        if (typeof this.props.imagedata === 'string'){
            isUrlString = true
        }
        return (
            <Modal
                transparent={true}
                animationType="none"
                visible={this.props.showPreviewModal}
                onRequestClose={this.props.onClose}
            >
                <View style={styles.modalStyle}>
                    <View style={styles.closeModalView}>
                        <TouchableOpacity
                            onPress={this.props.closePreviewModal}
                        >
                            <Image
                                style={styles.imageSize}
                                source={require('../Images/close.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 8 }}>
                        <Image
                            style={styles.previewImage}
                            source={{ uri: isUrlString ? this.props.imagedata : `data:${this.props.imagedata ? this.props.imagedata.mime : null};base64,${(this.props.imagedata ? this.props.imagedata.data : null)}` }}
                            resizeMode="contain"
                        />
                    </View>
                    {this.props.sendButtom ? <View style={styles.sendButton}>
                        <TouchableOpacity
                            onPress={this.props.sendImageMessage}
                        >
                            <Image
                                style={styles.imageSize}
                                source={require('../Images/send.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View> : null}
                </View>
            </Modal>
        );
    }
}

export default ModalPreview;