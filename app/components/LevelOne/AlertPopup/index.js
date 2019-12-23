import React, { Component } from 'react';
import { Modal, View } from 'react-native';
import { CoreoOpacityButton, CoreoText } from '../..';
import styles from '../ModalPopup/styles';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';

class AlertPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal:false
        }
    }

    open = () =>{
        this.setState({showModal:true})
    }

    close = () => {
        this.setState({showModal:false})
    }

    onCancel = () =>{
        const {onCancel} = this.props
        this.close()
        onCancel && onCancel()
    }

    onConfirm = () =>{
        const {onConfirm} = this.props
        this.close()
        onConfirm && onConfirm()
    }


    render() {
        const {alertText } = this.props
        return (
            <Modal
                transparent={true}
                animationType="none"
                visible={this.state.showModal}
            >
                <View style={styles.modalStyle}>
                <View style={styles.content}>

                    <View style={styles.confirmationMessage}><CoreoText style={styles.textStyle}>{alertText}</CoreoText></View>
                    <View style={styles.controls}>
                        {this.props.secondaryButtonText
                            ? <View style={styles.buttonMargin}>

                              <CoreoOpacityButton
                                    style={styles.modalSecondaryBtn}
                                    textStyle={styles.modalSecondaryBtnText}
                                    text={this.props.secondaryButtonText}
                                    onPress={this.onCancel}
                                    disabled={false}
                                    color={THEME_PRIMARY_COLOR} />
                            </View>
                            : null}

                        <View style={styles.buttonMargin}>
                            <CoreoOpacityButton
                                style={styles.modalPrimaryBtn}
                                textStyle={styles.modalPrimaryBtnText}
                                text={this.props.primaryButtonText || 'OK'}
                                onPress={this.onConfirm}
                                color={THEME_PRIMARY_COLOR} />
                        </View>
                    </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default AlertPopup;