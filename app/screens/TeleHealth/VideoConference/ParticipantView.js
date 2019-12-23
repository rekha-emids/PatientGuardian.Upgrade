import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView
} from 'react-native-twilio-video-webrtc';
import { CoreoText } from '../../../components';
import styles from './styles';
import { isIOS } from '../../../utils/appUtils';
import { SafeView } from '../../../components/LevelOne';

class ParticipantView extends Component {
  render() {
      let textStyles = {}

      if (!isIOS()){
          textStyles = {color: "black"}
      }
    return (
        <SafeView>
        <View style={styles.callContainer}>
        {
            this.props.status === 'connected' &&
            <View style={styles.remoteGrid}>
                <ScrollView horizontal={true}>
                    <TouchableOpacity onPress={this.props.resetSelectedTrack}> 
                        <TwilioVideoLocalView
                            enabled={true}
                            style={styles.remoteVideo}
                        />
                        <CoreoText style={textStyles}>Me</CoreoText>
                    </TouchableOpacity>
                    {
                        Array.from(this.props.videoTracks, ([
trackId,
track
]) => {
                            let name = '';

                            this.props.participantList.map((existingParticipant) => {
                                if (parseInt(track.identity, 10) === existingParticipant.userId) {
                                    name = `${existingParticipant.firstName} ${existingParticipant.lastName}`;
                                }
                            });
                            return (
                                <TouchableOpacity onPress={() => this.props.selectedTrack(track)}>
                                    <TwilioVideoParticipantView
                                        style={[
styles.remoteVideo,
styles.remoteParticipant
]}
                                        key={trackId}
                                        trackIdentifier={{
                                            participantSid: track.participantSid,
                                            videoTrackSid: trackId
                                        }}
                                        trackSid={trackId}
                                    />
                                    <CoreoText style={textStyles}>{name}</CoreoText>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>
          }
        </View>
        </SafeView>
    );
  }
}

export default ParticipantView;