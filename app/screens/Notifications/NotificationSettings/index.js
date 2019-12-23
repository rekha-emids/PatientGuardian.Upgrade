import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getVisitNotificationSettings, updateLastSyncedDate, updateNotificationState, updateEmailState, updateVisitNotificationSettings } from '../../../redux/Notifications/NotificationSettings/actions';
import CoreoCard from '../../../components/LevelOne/CoreoCard/index'
import Navbar from '../../../components/LevelOne/Navbar';
import styles from './styles';
import { CoreoText, CoreoImage, CoreoFlatList, CoreoScrollView, ScreenCover, CoreoOpacityButton } from '../../../components';
import { completed } from '../../../assets/images';
import { SafeView } from '../../../components/LevelOne';
import { syncToServerComplete } from '../../../redux/syncToServer/actions';
import { fetchServerData, updateNetworkConnectivity } from '../../../services/OfflineSyncing';
import { handleUrlClick } from '../../../utils/appUtils';
import { updateIntroVideoLink } from '../../../redux/auth/User/actions';

class NotificationSettings extends Component {
    constructor(props) {
        super(props)
    }

    componentWillUnmount(){
        global.isSyncing = false
    }

    getCardNotification = ({ item, index }, email) => {
        return (
            <CoreoCard style={styles.cardStyle}>
                {index === 0 ? <CoreoText style={email ? styles.BoldTextEmail : styles.BoldText}>{email ? 'Email' : 'Push Notification'}</CoreoText> : null}
                <View style={styles.viewStyle}>
                    <CoreoText style={styles.headingTextStyle}>
                        {item.applicationModuleDescription}
                    </CoreoText>
                    <TouchableOpacity onPress={this.handleCheckIcon.bind(this, item, email)}>
                        {item.isChecked ? <CoreoImage
                            style={styles.imagestyle}
                            source={completed}
                        /> : <View style={styles.blankView} />}
                    </TouchableOpacity>
                </View>
                <CoreoText style={styles.subheadingText}>
                    {item.moduledescription}
                </CoreoText>

                <View style={styles.horizontalLine} />
            </CoreoCard>
        )
    }


    componentDidMount() {
        this.props.getVisitNotificationSettings(updateNetworkConnectivity)
        this.props.updateLastSyncedDate()
    }

    handleCheckIcon = (item, email) => {

        if (email) {

            this.props.updateEmailState(item.userPrefrencesApplicationModuleID)
        } else {

            this.props.updateNotificationState(item.userPrefrencesApplicationModuleID)
        }
    }

    onCheckClick = () => {
        const { pushNotification, emailNotification } = this.props
        if (pushNotification.length > 0 && emailNotification.length > 0)
            this.props.updateVisitNotificationSettings({
                pushNotification,
                emaiNotificationNotification: emailNotification
            })
    }
    onClickSync = () => {
        this.props.syncToServerComplete(false)
        fetchServerData()
    }

    onClickVideo = () => {
        handleUrlClick(this.props)
    }
    
    render() {
        const isLoading = global.isSyncing
        __DEV__ && console.log("IS SYNCING", isLoading)
        return (
            <SafeView>
                <CoreoCard style={styles.mainCard}>
                    <Navbar title={"Notification Settings"} onCheckClick={this.onCheckClick}
                        showSave={true}
                    />
                    <ScreenCover isLoading={isLoading} showHeader={false}>

                        <CoreoScrollView>
                            <CoreoFlatList
                                data={this.props.pushNotification}
                                renderItem={({ item, index }) => this.getCardNotification({ item, index }, false)}
                                itemKey={'userPrefrencesApplicationModuleID'}
                                scrollEnabled={false}
                            />
                            <CoreoFlatList
                                data={this.props.emailNotification}
                                renderItem={({ item, index }) => this.getCardNotification({ item, index }, true)}
                                itemKey={'userPrefrencesApplicationModuleID'}
                                scrollEnabled={false}
                            />
                            <CoreoCard style={styles.cardStyle}>
                                <CoreoText style={styles.BoldTextEmail}>General</CoreoText>
                                <View style={styles.viewStyle}>
                                    <View style={styles.manualSyncDate}>
                                        <CoreoText style={styles.headingTextStyle}>
                                            Manual Syncing
                            </CoreoText>
                            <CoreoText style={styles.subheadingText}>{this.props.lastSyncedDate? this.props.lastSyncedDate: 'Not Yet Synced'}</CoreoText>
                                    </View>
                                    <CoreoOpacityButton
                                        text={"Sync"}
                                        onPress={this.onClickSync}
                                        textStyle={styles.buttonText}
                                    />
                                </View>

                                <View style={styles.viewStyle}>
                                    <View style={styles.manualSyncDate}>
                                        <CoreoText style={styles.headingTextStyle}>
                                            Introduction Video
                            </CoreoText>
                            <CoreoText style={styles.subheadingText}>View introduction video</CoreoText>
                                    </View>
                                    <CoreoOpacityButton
                                        text={"Video"}
                                        onPress={this.onClickVideo}
                                        textStyle={styles.buttonText}
                                    />
                                </View>
                            </CoreoCard>
                        </CoreoScrollView>
                    </ScreenCover>

                </CoreoCard>
            </SafeView>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        getVisitNotificationSettings: (updatenetworkOnResponse) => dispatch(getVisitNotificationSettings(updatenetworkOnResponse)),
        updateVisitNotificationSettings: (data) => dispatch(updateVisitNotificationSettings(data)),
        updateNotificationState: (id) => dispatch(updateNotificationState(id)),
        updateEmailState: (id) => dispatch(updateEmailState(id)),
        syncToServerComplete: (data) => dispatch(syncToServerComplete(data)),
        updateLastSyncedDate: () => dispatch(updateLastSyncedDate()),
        updateIntroVideoLink: (data) => dispatch(updateIntroVideoLink(data))

    }
};

function mapStateToProps(state) {
    let notificationState = state.NotificationState;
    return {
        pushNotification: state.NotificationState.NotificationSettingsState.pushNotification,
        emailNotification: state.NotificationState.NotificationSettingsState.emailNotification,
        userId: state.authState.userState.userId,
        isLoading: state.loadingState.isLoading,
        lastSyncedDate: state.NotificationState.NotificationSettingsState.lastSyncedDate,
        videoUrl: state.authState.userState.introVideoUrl,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSettings) 