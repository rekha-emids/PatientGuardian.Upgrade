import React from 'react'
import {View} from 'react-native'
import {CoreoText, CoreoHighlightButton} from '../../../components/Base/index'
import styles from './styles';


export class ConferenceNotification extends React.PureComponent{
    btnPress = () => {
        this.props.onClickJoin(this.props.roomNumber) 
       }
    render(){
        const {notificationMessage, roomNumber, onClickJoin} = this.props

        return (
            <View style={styles.notificationCardContainer}>
                <View style={styles.textContainer}>
                    <CoreoText style={styles.notificationText}>
                        {notificationMessage}
                    </CoreoText>
                </View>
                <CoreoHighlightButton style={styles.joinButton} onPress={this.btnPress} textStyle={styles.textStyle} text={"Join"} />
            </View>
        )
    }
}