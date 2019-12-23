import React, { PureComponent } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { getPatientImage, setCompleteUserData, updateIntroVideoLink } from '../../redux/auth/User/actions'
import { navigateToScreenMainStack } from '../../redux/navigation/actions'
import {
  updateTabNavigator, getPatientVisitDetail_Offline, getLookupDetails, resetVideoConferenceNotifications, getPatientStages
} from '../../redux/dashboard/Dashboard/actions';
import ServiceVisits from './ServiceVisits';
import { ModalUserAgreement, NavbarWithImage, CoreoImage } from '../../components';
import { OverlayLoaderWrapper, CoreoActiveIndicator } from '../../components/Base/Preloader/Preloader'
import { getUserInfo, updateEula } from '../../redux/auth/UserAgreement/actions';
import { PATH } from '../../routes';
import { extractRole } from '../../utils/roleUtil';
import { SCREENS, USER_TYPES } from '../../constants/constants';
import { isAPIFetching, isAPIRefreshFetching, isAPISuccess } from '../../utils/AppAPIUtils';
import { fetchLoginData } from '../../offline/Login';
import { getOfflineUserRelatedData } from '../../offline/UserRelatedDetail';
import { getPointService } from '../../redux/profile/PointService/actions';
import { getPersonalDetail, getGenderDetail, getCityDetail, getImage } from '../../redux/profile/PersonalDetail/actions';
import { getSelectedLanguages } from '../../redux/profile/Languages/actions';
import { getSelectedClinicalCondition } from '../../redux/profile/ClinicalCondition/actions';
import { getPatientVisitDetail, getPatientServiceRequestDetail, getServiceProviderDetail } from '../../redux/dashboard/Dashboard/actions';
import { getVisitServiceDetails } from '../../redux/visitSelection/VisitServiceDetails/actions';
import { getDashboardMessageCount, getMessageFallBackInterval } from '../../redux/asyncMessages/actions';
import { getMyConnections } from '../../redux/manageConnection/ManageConnectionData/actions';
import { REFRESH, INIT } from '../../constants/AppAPIConstants';
import { updateNetworkConnectivity } from '../../services/OfflineSyncing';
import { SafeView } from '../../components/LevelOne';
import {getUserInfo as userInfo}  from '../../utils/userUtil'
import NotificationTray from './NotificationTray';
import { setRoomId, joinVideoConference } from '../../redux/telehealth/actions';
import Guidelines from './Guidelines';
import { handleUrlClick } from '../../utils/appUtils';
import { SERVICE_PROVIDERS } from '../HomeTabs';
class Dashboard extends PureComponent {

  static navigationOptions = () => {
    return {
        tabBarOnPress({navigation, defaultHandler}) {
            if (navigation.isFocused()) {
                // same tab was tapped twice
                // reset inner state
                return;
              }
            navigation.state.params && navigation.state.params.onTabFocus && navigation.state.params.onTabFocus();
            defaultHandler()
        }
    }
}
IS_COMPONENT_MOUNTED = false

  constructor(props) {
    super(props);
    props.navigation && props.navigation.setParams({
      onTabFocus: this.handleTabFocus
    });
    this.state = {
      isOpen: props.isEulaUpdated,
      serviceRequestRole: extractRole(SCREENS.SERVICE_REQUEST),
      loading: true,
      isNotificationModalOpen: false    
    };
  };

  componentWillReceiveProps(nextProps){
    let isOpen = false
    let isNotificationModalOpen = false
    if(this.props.isEulaUpdated !== nextProps.isEulaUpdated){
      isOpen = nextProps.isEulaUpdated
    }
    if(!this.props.videoConferenceNotifications && nextProps.videoConferenceNotifications && nextProps.videoConferenceNotifications.length){
      isNotificationModalOpen =true
    }
    if(isOpen){
      this.setState({isOpen})
    }
    if(isNotificationModalOpen){
      this.setState({isNotificationModalOpen})
    }

    let isEulaContentSuccess = isAPISuccess(this.props.getEulaContentStatus)
    isEulaContentSuccess && !this.props.isEulaUpdated && !this.props.isVideoPlayed && handleUrlClick(this.props, SERVICE_PROVIDERS)
  }

    /**
   * Method: fetchDashboardAPI
   * Description: make server call to fetch serviceStatusDetail, serviceProvider visits, PatientServiceRequestDetail
   */
  fetchDashboardAPI() {
    // this.props.getPatientServiceRequestDetail(38);
    this.props.getPatientVisitDetail_Offline();
    this.props.getServiceProviderDetail()
  }
  /**
   * Method: fetchProfileApi
   * Description: make server call to fetch all profile information
   */

  fetchProfileApi() {
    this.props.getPersonalDetail()
  }

  handleTabFocus = () => {
    if(this.IS_COMPONENT_MOUNTED && !isAPIFetching(this.props.getPatientVisitsStatus)){
        this._onRefresh(INIT)
    }
  };

  _onRefresh = (requestType = REFRESH) => {
      const {dashboardRequestObject, selectedStatusId} = this.props
      const {toDayDate, ...other} = dashboardRequestObject
      this.props.getPatientStages()
      this.props.getPatientVisitDetail(toDayDate, {...other, statusId: selectedStatusId}, requestType, updateNetworkConnectivity)
  }


  fetchServerData() {
    fetchLoginData()
      .then((loginResponse) => {
        getOfflineUserRelatedData().then((res) => {
          let userData = JSON.parse(res[0].userRelatedData);

          this.fetchDashboardAPI(); // fetch dashboard API
          this.fetchProfileApi();

          this.setState({
            loading: false
          })
        }).catch((err) => {

        })
      })
      .catch((err) => {
        this.setState({
          newUser: true
        })
      })
  }

  componentDidMount () {
    this.IS_COMPONENT_MOUNTED = true
    this.props.getLookupDetails()
    // if (!this.props.network) {
    //   this.fetchServerData();
    // }
    this.props.getUserInfo()
    this.props.getPatientImage()
    this.props.updateTabNavigator(this.props.navigation);
    this.props.getMessageFallBackInterval();
    this.props.getPatientStages()
    // this.props.getDashboardMessageCount();
  }


  onClickOk = () => {
    this.setState({isOpen: false})
    this.props.onClickOk()
    !this.props.isVideoPlayed && handleUrlClick(this.props, SERVICE_PROVIDERS)
  }
  handleBelliconPressed =()=>{
    this.props.navigateToNotification()
  }
  onClickJoinConference = (roomId) => {
    this.props.setRoomId(roomId)
    this.props.joinVideoConference()
    this.setState({isNotificationModalOpen: false})
  }
  render() {
    const {getPatientImageStatus, getPatientServiceRequestsStatus, getPatientVisitsStatus, getServiceProvidersStatus, getEulaContentStatus, isNavigationLoading,
      cancelServiceRequestStatus
    } = this.props
    let isLoading = isAPIFetching(cancelServiceRequestStatus,getPatientImageStatus, getPatientServiceRequestsStatus, getPatientVisitsStatus, getServiceProvidersStatus, getEulaContentStatus, isNavigationLoading)
    let RenderComponent = SafeView
    let props = {}
    if(userInfo() && userInfo().userType === USER_TYPES.CARE_TEAM){
      RenderComponent = View
      props = {style: styles.flex}
    }
    if(this.props.network && !this.props.isVideoPlayed && !this.state.isOpen){
      return <CoreoActiveIndicator/>
    }
    return (
      <RenderComponent {...props}>
      <OverlayLoaderWrapper isLoading={isLoading}>
        <View style={styles.container}>
          <NavbarWithImage showPullDownToRefresh showImage={true} title="Dashboard" showBellIcon={false} onbelliconPressed={this.handleBelliconPressed} />
          <ModalUserAgreement
            visible={this.state.isOpen}
            onPress={this.onClickOk}
            eulaContent={this.props.eulaContent}
            buttonText={"Agree"}
          />
          <ScrollView refreshControl={
            <RefreshControl
              refreshing={isAPIRefreshFetching(getPatientVisitsStatus)}
              onRefresh={this._onRefresh}
              />
          } >
            <ServiceVisits isLoading={isLoading} navigation={this.props.navigation} newSROnPress = {() => this.props.createServiceRequest({navigator: this.props.navigation})} _onRefresh = {this._onRefresh}/>
            <View style={styles.paddingCard}></View>
            <Guidelines isLoading={isLoading} navigation={this.props.navigation} />
          </ScrollView>
          {this.state.serviceRequestRole.Create && <TouchableOpacity disabled={!this.props.network} activeOpacity={0.5} onPress={() => this.props.createServiceRequest({navigator: this.props.navigation})} style={styles.TouchableOpacityStyle} >
            <CoreoImage style={styles.plusIcon} source={require('../../assets/images/Icons/plus.png')} />
          </TouchableOpacity>}
        </View>
       {this.state.isNotificationModalOpen && <NotificationTray
          notifications={this.props.videoConferenceNotifications}
          isModalOpen={this.state.isNotificationModalOpen}
          onClickCancel={() => {
            this.setState({isNotificationModalOpen: false}, this.props.resetVideoConferences)
          }}
          onClickJoin={this.onClickJoinConference}
          />}
      </OverlayLoaderWrapper>
      </RenderComponent>
    );
  };

};

function mapDispatchToProps (dispatch) {
  return {
    getUserInfo: () => dispatch(getUserInfo()),
    onClickOk: () => dispatch(updateEula()),
    getPatientImage: () => dispatch(getPatientImage()),
    createServiceRequest: (params) => dispatch(navigateToScreenMainStack(PATH ? PATH.REQUIREMENTS_SCREEN : null, params)),
    setCompleteUserData: (data) => dispatch(setCompleteUserData(data)),
    getPatientVisitDetail: (toDayDate, requestobject, requestType, updateNetworkOnResponse) => dispatch(getPatientVisitDetail(toDayDate, requestobject, requestType, updateNetworkOnResponse)),
    getPatientVisitDetail_Offline: () => dispatch(getPatientVisitDetail_Offline()),
    getPatientServiceRequestDetail: (data) => dispatch(getPatientServiceRequestDetail(data)),
    getServiceProviderDetail: () => dispatch(getServiceProviderDetail()),
    getPointService: () => dispatch(getPointService()),
    getPersonalDetail: () => dispatch(getPersonalDetail()),
    getGenderDetail: () => dispatch(getGenderDetail()),
    getCityDetail: () => dispatch(getCityDetail()),
    getImage: () => dispatch(getImage()),
    getSelectedLanguages: () => dispatch(getSelectedLanguages()),
    getSelectedClinicalCondition: () => dispatch(getSelectedClinicalCondition()),
    getVisitServiceDetails: data => dispatch(getVisitServiceDetails(data)),
    navigateToNotification: () => dispatch(navigateToScreenMainStack(PATH ? PATH.NOTIFICATIONS_SCREEN : null)),
    updateTabNavigator:(navigation)=> dispatch(updateTabNavigator(navigation)),
    getDashboardMessageCount: () => dispatch(getDashboardMessageCount()),
    getMyConnections: () => dispatch(getMyConnections()),
    getLookupDetails: () => dispatch(getLookupDetails()),
    getMessageFallBackInterval: () => dispatch(getMessageFallBackInterval()),
    setRoomId: (id) => dispatch(setRoomId(id)),
    joinVideoConference: () => dispatch(joinVideoConference()),
    resetVideoConferences: () => dispatch(resetVideoConferenceNotifications()),
    getPatientStages: () => dispatch(getPatientStages()),
    updateIntroVideoLink: (data) => dispatch(updateIntroVideoLink(data))
  }
}

function mapStateToProps (state) {
  return {
    conversationDetail: state.dashboardState.dashboardState.conversationDetail,
    isEulaUpdated: state.authState.userAgreementState.isEulaUpdated,
    eulaContent: state.authState.userAgreementState.eulaContent,
    patientImage: state.authState.userState.patientImage? state.authState.userState.patientImage.image: null,
    getPatientImageStatus: state.authState.userState.getPatientImageStatus,
    getPatientVisitsStatus: state.dashboardState.dashboardState.getPatientVisitsStatus,
    getPatientServiceRequestsStatus: state.dashboardState.dashboardState.getPatientServiceRequestsStatus,
    getServiceProvidersStatus: state.dashboardState.dashboardState.getServiceProvidersStatus,
    getEulaContentStatus: state.authState.userAgreementState.getEulaContentStatus,
    isLoading: state.loadingState.isLoading,
    isNavigationLoading: state.asyncMessageState.isNavigationLoading,
    network: state.networkReducer.network,
    dashboardRequestObject: state.dashboardState.dashboardState.dashboardRequestObject,
    selectedStatusId: state.dashboardState.dashboardState.selectedStatusId,
    videoConferenceNotifications: state.dashboardState.dashboardState.videoConferenceNotifications,
    cancelServiceRequestStatus: state.visitSelectionState.VisitServiceDetailsState.cancelServiceRequestStatus,
    videoUrl: state.authState.userState.introVideoUrl,
    isVideoPlayed: state.authState.userState.isVideoPlayed,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
