import React, { PureComponent } from 'react';
import {Modal, View, WebView} from 'react-native';
import { CoreoText, CoreoHighlightButton } from '../..';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { NAVBAR_COLOR1, NAVBAR_COLOR2 } from '../../../constants/theme';
import { SafeView } from '..';

 class ModalUserAgreement extends PureComponent {
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                animationType="none"
                visible={this.props.visible}
            >
            <SafeView>
                <View style={styles.modalcontainer}>
                    <LinearGradient colors={[
NAVBAR_COLOR1,
NAVBAR_COLOR2
]} style={styles.header}>
                        <View style={[
styles.subheader,
styles.container
]}>
                            <View style={styles.justifyContent}>
                                <View>
                                    <CoreoText style={styles.textStyle}>End User License Agreement</CoreoText>
                                </View>
                            </View>
                            {/* <CoreoImage
                                style={styles.imagestyle}
                                source={elayer}
                            /> */}
                        </View>
                    </LinearGradient>
                    <View style={styles.modalView}>
                        <WebView
                            originWhitelist={['*']}
                            source={{html: this.props.eulaContent}}
                        />
                        <CoreoHighlightButton
                            style={styles.button}
                            onPress={this.props.onPress}
                            textStyle={styles.common}
                            text="Acknowledge and Accept"
                        />
                    </View>
                </View>
                </SafeView>
            </Modal>
        );
    }
}

export default ModalUserAgreement;