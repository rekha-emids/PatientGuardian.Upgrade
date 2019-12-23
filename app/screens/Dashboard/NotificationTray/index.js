import React from 'react'
import {Modal, View} from 'react-native'
import ListScrollerAPIWrapper from '../../../components/LevelOne/ListScroller/ListScrollerAPIWrapper'
import styles from './styles'
import { ConferenceNotification } from './ConferenceNotification';
import { CoreoHighlightButton, CoreoText } from '../../../components';

class NotificationTray extends React.PureComponent {
    render(){
        const {goToStartVideoConference, onClickCancel, notifications, onClickJoin, canStartVideoConference} = this.props

        return (
            <Modal transparent={true} visible={this.props.isModalOpen}>
             <View style={styles.transparentModal}>
                 <View style={styles.modalContainer}>
                 <CoreoText style={[styles.title]}>Active video calls</CoreoText>
                    <View style={styles.flex}>
                        <ListScrollerAPIWrapper
                            data={notifications || []}
                            renderComponent={ConferenceNotification}
                            onClickJoin={onClickJoin}
                        />
                    </View>
                        <View style={styles.footer}>
                            <View style={styles.wrapper}>
                                {canStartVideoConference ? <CoreoHighlightButton style={[styles.joinButton]} onPress={goToStartVideoConference} textStyle={[styles.textStyle]} text={"Start Video Conference"} /> : null}
                            </View>                            
                            <CoreoHighlightButton style={[styles.joinButton, styles.cancelButton]} onPress={onClickCancel} textStyle={[styles.textStyle, styles.cancelText]} text={"Close"} />
                        </View>
                 </View>
             </View>
         </Modal>
        )
    }
}

export default NotificationTray