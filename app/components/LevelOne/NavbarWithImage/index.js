import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { setValueBasedOnHeight, setValueBasedOnWidth } from '../../../utils/deviceDimensions';
import { navigateToScreenMainStack, onBack } from '../../../redux/navigation/actions';
import { PATH } from '../../../routes';
import CoreoImage, { CoreoProfileImage } from '../../Base/Image/Image';
import { extractRole } from '../../../utils/roleUtil';
import { SCREENS, USER_TYPES } from '../../../constants/constants';
import { setUser } from '../../../redux/profile/PersonalDetail/actions'
import LinearGradient from 'react-native-linear-gradient'
import { NAVBAR_COLOR1, NAVBAR_COLOR2 } from '../../../constants/theme';
import { getUserInfo, getSelectedPatientInfo } from '../../../utils/userUtil';
import { notificationsImg } from '../../../assets/images';
import OfflineHeaderText from '../OfflineHeader/OfflineHeaderText';
import { showSyncServerModal } from '../../../redux/syncToServer/actions';
import { ModalPopup } from '../SyncModalPopup';
import { CoreoText } from '../../Base';
import { CoreoActiveIndicator } from '../../Base/Preloader/Preloader';
import { PullDownRefreshComponent } from '../Navbar';

const powerIcon = () => {
    return (
        <MaterialIcon name="power" size={setValueBasedOnHeight(25)} color="#ffffff" />
    )
}

class NavbarWithImage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isDiscardModalOpen: false,
            profileRole: extractRole(SCREENS.PROFILE)
        }
    }
    profileView = () => {
        let currentUserInfo = getUserInfo();
        let userInfo = getSelectedPatientInfo()
        if (currentUserInfo && currentUserInfo.userType === USER_TYPES.PATIENT) {
            userInfo = currentUserInfo
        }
        let params = {
            id: Number(userInfo && userInfo.patientId),
            userType: userInfo && userInfo.userType
        }
        this.props.setUser(true)
        this.props.goToProfile(params)
    }
    render() {
        const { title, showBellIcon, showPowerIcon, showImage } = this.props
        return (
            <View>
                <LinearGradient
                    colors={[NAVBAR_COLOR1, NAVBAR_COLOR2]}
                    style={styles.navBar}
                >
                    {showImage ?
                        <TouchableOpacity onPress={this.state.profileRole.Read && this.profileView}  >
                            <CoreoProfileImage style={styles.pic} pic={this.props.patientImage ? { uri: this.props.patientImage } : null} />
                        </TouchableOpacity> :
                        <View style={styles.pic} />
                    }
                    <Text style={styles.title}>{title}</Text>
                    {showBellIcon ?
                        <TouchableOpacity
                            onPress={this.props.onbelliconPressed}
                        >
                            <CoreoImage source={notificationsImg} style={styles.iconStyle} />
                        </TouchableOpacity> :
                        <View style={styles.empty} />
                    }
                    {showPowerIcon ?
                        <TouchableOpacity
                            style={{ marginHorizontal: setValueBasedOnWidth(15) }}
                            onPress={this.props.onpowericonPressed}
                            style={{ paddingRight: setValueBasedOnWidth(16) }}
                        >
                            {powerIcon()}
                        </TouchableOpacity> :
                        <View style={styles.empty} />
                    }
                </LinearGradient>
                {!this.props.network && <OfflineHeaderText />}
                {this.props.network && this.props.showPullDownToRefresh && <PullDownRefreshComponent />}
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
                        :
                        null
                }
            </View>
        )
    }
}

function mapStateToProps(state) {
    let syncServerState = state.syncServerState;
    return {
        patientImage: state.authState && state.authState.userState.patientImage ?state.authState.userState.patientImage.image: null,
        network: state.networkReducer && state.networkReducer.network,
        showSyncModal: syncServerState && state.syncServerState.showSyncServerModal,
        isSyncSuccess: syncServerState && state.syncServerState.isSyncSuccess,
        isSyncComplete: syncServerState && state.syncServerState.isSyncComplete
    }
}

function mapDispatchToProps(dispatch) {
    return {
        goToProfile: (params) => dispatch(navigateToScreenMainStack(PATH ? PATH.PROFILE : '', params)),
        setUser: (data) => dispatch(setUser(data)),
        showSyncServerModal: (data) => dispatch(showSyncServerModal(data)),
        goBack: () => dispatch(onBack())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarWithImage)