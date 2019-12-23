import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import Icon from '../../../components/Base/Icon'
import Icons from '../../../assets/images/Icons'
import { setFontSize } from '../../../utils/deviceDimensions';
import { onBack, replace, resetStack } from '../../../redux/navigation/actions'
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient'
import { NAVBAR_COLOR1, NAVBAR_COLOR2 } from '../../../constants/theme';
import { CoreoText } from '../..';
import OfflineHeaderText from '../OfflineHeader/OfflineHeaderText';
import { PATH } from '../../../routes';
import { showSyncServerModal, syncToServerComplete } from '../../../redux/syncToServer/actions';
import { ModalPopup } from '../SyncModalPopup';
import { CONVERSATION_SUMMARY, SERVICE_REQUESTS, SERVICE_PROVIDERS } from '../../../constants/constants';
import { CoreoActiveIndicator } from '../../Base/Preloader/Preloader';
import { isIOS } from '../../../utils/appUtils';

export const PullDownRefreshComponent = (props) => {
    return null
    let arrowicon = isIOS() ? Icons.downArrowIOS : Icons.downArrowAndroid
    return (
        <View style={styles.pullContainer}>
            <Icon {...arrowicon} size={setFontSize(15)} />
            <CoreoText style={styles.pullText}>Pull to refresh</CoreoText>
        </View>
    )
}

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDiscardModalOpen: false
        }
    }

    onClickBackButton = () => {
        if (this.props.screenName === CONVERSATION_SUMMARY || this.props.screenName === SERVICE_REQUESTS || this.props.screenName === SERVICE_PROVIDERS) {
            this.props.resetStack(PATH.HOME_SCREEN)
        }
        const { onClickBackButton } = this.props
        if (!onClickBackButton) {
            this.props.goBack()
        } else {
            onClickBackButton && onClickBackButton()
        }
    }

    render() {
        let icon = Icons.backArrowAndroid
        let add = Icons.addAndroid
        let checkMark = Icons.checkMarkAndroid

        if (Platform.OS === 'ios') {
            icon = Icons.backArrowIos
            add = Icons.addIos
            checkMark = Icons.checkmarkIos
        }
        const { title, showAdd, onClickAdd, showBackButton, showSave, onCheckClick, showEmptyAdd, showEmptySave, disabled } = this.props
        return (
            <View>
                <LinearGradient
                    colors={[NAVBAR_COLOR1, NAVBAR_COLOR2]}
                    style={styles.navBar}
                >
                    {showBackButton ?
                        <View style={styles.touchableArea} /> :
                        <TouchableOpacity style={styles.touchableArea} onPress={this.onClickBackButton}>
                            <Icon {...icon} size={setFontSize(20)} color="#ffffff" />
                        </TouchableOpacity>
                    }
                    <Text style={styles.title}>{title}</Text>
                    {showAdd ?
                        <TouchableOpacity style={styles.touchableArea} onPress={onClickAdd}>
                            <Icon {...add} size={setFontSize(20)} color="#ffffff" />
                        </TouchableOpacity>
                        : <View style={showEmptyAdd ? styles.touchableArea : {}} />
                    }
                    {showSave ?
                        <TouchableOpacity style={styles.touchableArea} onPress={onCheckClick}>
                            <CoreoText style={styles.saveText}>Save</CoreoText>
                        </TouchableOpacity>
                        : <View style={showEmptySave ? styles.touchableArea : {}} />
                    }
                </LinearGradient>
                {!this.props.network && <OfflineHeaderText />}
                {this.props.network && this.props.showPullDownToRefresh && <PullDownRefreshComponent />}
                {/* {
                    this.props.showSyncModal
                        ?
                        <ModalPopup
                            visible={true}
                            primaryButton="OK"
                            secondaryButton="CANCEL"
                            primaryColor="#3c1053"
                            secondaryColor="#6c757d"
                            onConfirm={() =>{
                                this.props.goBack()
                                this.props.showSyncServerModal(false)
                            } }
                            onCancel={() => this.props.showSyncServerModal(false)}
                        >
                            <Text style={styles.message}>No Data available! Please go online and Sync with the server.</Text>
                        </ModalPopup>
                        :
                        null
                } */}

                {
                    this.props.showSyncModal
                        ?
                        <ModalPopup
                            visible={true}
                            primaryButton="Ok"
                            primaryColor="#3c1053"
                            onConfirm={() => {
                                this.props.goBack();
                                this.props.showSyncServerModal(false)
                            }}
                        >
                        {/* {this.props.isSyncComplete === true? this.props.goBack(): null} */}
                            <CoreoText style={styles.message}>
                                "No Data available! Please go online and Sync with the server."
                            </CoreoText>
                            {
                                this.props.isSyncComplete !== null && !this.props.isSyncComplete
                                    ?
                                    <CoreoActiveIndicator isLoading={this.props.isSyncComplete === null ? false : !this.props.isSyncComplete}>
                                    </CoreoActiveIndicator>
                                    :
                                    null
                            }
                        </ModalPopup>
                        // <ModalPopup
                        //     visible={true}
                        //     primaryButton="SYNC"
                        //     secondaryButton="CANCEL"
                        //     primaryColor="#3c1053"
                        //     secondaryColor="#6c757d"
                        //     isPrimaryButtonDisabled = {this.props.network === false? true :this.props.isSyncComplete === false? true: false }
                        //     isSecondaryButtondisabled = {this.props.isSyncComplete === false? true: false }
                        //     onConfirm={() => {
                        //         this.props.syncToServerComplete(false)
                        //         fetchServerData()
                        //     }}
                        //     onCancel={() => {
                        //         this.props.goBack();
                        //         this.props.showSyncServerModal(false)
                        //     }}
                        // >
                        // {this.props.isSyncComplete === true? this.props.goBack(): null}
                        //     <CoreoText style={styles.message}>
                        //         {
                        //             this.props.isSyncSuccess === null
                        //                 ?
                        //                 !this.props.network ?
                        //                     "No Data available! Please go online and Sync with the server."
                        //                     :
                        //                     "No Data available! Sync with the server."
                        //                 :

                        //                 this.props.isSyncSuccess === true
                        //                     ?
                        //                     "Data Sync successfully completed"
                        //                     :
                        //                     this.props.isSyncSuccess === false
                        //                         ?
                        //                         "Problem in syncing data with server. Please Try after some Time"
                        //                         :
                        //                         null
                        //         }
                        //     </CoreoText>
                        //     {
                        //         this.props.isSyncComplete !== null && !this.props.isSyncComplete
                        //             ?
                        //             <CoreoActiveIndicator isLoading={this.props.isSyncComplete === null ? false : !this.props.isSyncComplete}>
                        //             </CoreoActiveIndicator>
                        //             :
                        //             null

                        //     }


                        // </ModalPopup>
                        :
                        null
                }
                
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        goBack: () => dispatch(onBack()),
        replace: (data) => dispatch(replace(data)),
        resetStack: (data) => dispatch(resetStack(data)),
        showSyncServerModal: (data) => dispatch(showSyncServerModal(data)),
        syncToServerComplete: (data) => dispatch(syncToServerComplete(data))
    }
}

const mapStateToProps = (state) => {
    let networkReducer = state.networkReducer
    let syncServerState = state.syncServerState
    return {
        network: networkReducer && networkReducer.network,
        showSyncModal: syncServerState && syncServerState.showSyncServerModal,
        isSyncSuccess: syncServerState && syncServerState.isSyncSuccess,
        isSyncComplete: syncServerState && syncServerState.isSyncComplete
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)