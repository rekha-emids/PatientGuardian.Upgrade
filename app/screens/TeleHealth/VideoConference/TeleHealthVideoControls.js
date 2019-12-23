import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import {CoreoText } from '../../../components';
import styles from './styles';

class TeleHealthVideoControls extends Component {
  render() {
      const {textStyle} = this.props

    return (
        <View style={styles.optionsContainer}>
            <View style={styles.optionView}>
                <TouchableOpacity
                    style={[
styles.optionButton,
!this.props.isAudioEnabled ? styles.activeButton : null
]}
                    onPress={this.props.controlAudio}>
                    <Image
                        style={styles.icon}
                        source={require('../../../assets/images/TeleHealth/Mute.png')}
                        resizeMode="contain"
                        on
                    />
                </TouchableOpacity>
                <CoreoText style={[
styles.optionText,
textStyle
]}>{this.props.isAudioEnabled ? "Mute Audio" : "Unmute Audio"}</CoreoText>
            </View>
            {/* <View style={styles.optionView}>
                <TouchableOpacity
                    style={[styles.optionButton, !this.props.isLocalVideoEnabled ? styles.activeButton : null]}
                    onPress={this.props.controlVideo}>
                    <Image
                        style={styles.icon}
                        source={require('../../../assets/images/TeleHealth/No_Video.png')}
                        resizeMode="contain"
                        on
                    />
                </TouchableOpacity>
                <CoreoText style={[styles.optionText, textStyle]}>{this.props.isLocalVideoEnabled ? "Hide Video" : "Show Video"}</CoreoText>
            </View> */}
            <View style={styles.optionView}>
                <TouchableOpacity
                    style={[
styles.optionButton,
this.props.initiator ? '' : styles.endCall
]}
                    onPress={this.props.leaveConference}>
                    <Image
                        style={styles.icon}
                        source={require('../../../assets/images/TeleHealth/Exit.png')}
                        resizeMode="contain"
                        on
                    />
                </TouchableOpacity>
                <CoreoText style={[
styles.optionText,
textStyle
]}>Leave Conf</CoreoText>
            </View>
            {this.props.initiator && <View style={styles.optionView}>
                <TouchableOpacity
                    style={[
styles.optionButton,
styles.endCall
]}
                    onPress={this.props.endConference}>
                    <Image
                        style={styles.icon}
                        source={require('../../../assets/images/TeleHealth/End_call.png')}
                        resizeMode="contain"
                        on
                    />
                </TouchableOpacity>
                <CoreoText style={[
styles.optionText,
textStyle
]}>End Conf</CoreoText>
            </View>}
        </View>
    );
  }
}

export default TeleHealthVideoControls;