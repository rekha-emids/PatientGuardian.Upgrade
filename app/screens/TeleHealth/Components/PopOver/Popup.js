import React, { Component } from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import PopoverTooltip from 'react-native-popover-tooltip';

class Popup extends Component {
    
    render() {

        let itemsShow = [
            {
                label: 'View Participants',
                onPress: this.props.viewParticipants
            },
            {
                label: 'Invite Participants',
                onPress: this.props.inviteParticipants
            }
        ]

        return (
            <PopoverTooltip
                ref="tooltip1"
                tooltipContainerStyle={{ borderRadius: 0 }}
                allItemContainer={styles.allItemContainer}
                triangleUp={styles.triangle}
                triangleDown={styles.triangle}
                triangleOffset={0}
                labelSeparatorColor={'#fff'}
                buttonComponent={
                    <View>
                        <Image style={styles.image}
                            source={require('../../../../assets/images/TeleHealth/Dots_white.png')}
                            resizeMode="contain"
                        />
                    </View>
                }
                labelContainerStyle={styles.labelContainerStyle}
                delayLongPress={0}
                items={itemsShow}
            />
        );
    }
}


export default Popup;