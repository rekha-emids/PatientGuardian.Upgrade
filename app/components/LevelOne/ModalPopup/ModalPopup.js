import React, { Component } from 'react';
import {Modal, View} from 'react-native';
import {CoreoOpacityButton, CoreoButton } from '../..';
import styles from './styles';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';

 class ModalPopup extends Component {
    state = {
        modalVisible: false,
      };
    render() {
        return (
            <Modal
                transparent={true}
                animationType="none"
                visible={this.props.visible}
                onRequestClose={this.props.onClose}
            >
                <View style={styles.modalStyle}>
                    <View style={styles.content}>
                        <View style={styles.confirmationMessage}>{this.props.children}</View>
                        <View style={styles.controls}>
                           {this.props.secondaryButton 
                           ? <View style={styles.buttonMargin}>

                                {this.props.customBtnFlag?<CoreoOpacityButton
                                    style={styles.modalSecondaryBtn}
                                    textStyle={styles.modalSecondaryBtnText}
                                    text= {this.props.secondaryButton}
                                    onPress={this.props.onCancel}
                                    disabled={false}
                                    color={THEME_PRIMARY_COLOR}/>:
                                <CoreoButton
                                    onPress={this.props.onCancel}
                                    title={this.props.secondaryButton}
                                    disabled={false}
                                    color={THEME_PRIMARY_COLOR}
                                />}
                            </View>
                            : null}

                            {this.props.primaryButton && <View style={styles.buttonMargin}>
                            {this.props.customBtnFlag?<CoreoOpacityButton
                                    style={styles.modalPrimaryBtn}
                                    textStyle={styles.modalPrimaryBtnText}
                                    text= {this.props.primaryButton}
                                    onPress={this.props.onConfirm}
                                    disabled={this.props.isDisabled ? this.props.isDisabled  : false}
                                    color={THEME_PRIMARY_COLOR}/>:<CoreoButton
                                    onPress={this.props.onConfirm}
                                    title={this.props.primaryButton}
                                    color={THEME_PRIMARY_COLOR}
                                />}
                            </View>}
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

ModalPopup.defaultProps = {
    customBtnFlag: true
}

export default ModalPopup;