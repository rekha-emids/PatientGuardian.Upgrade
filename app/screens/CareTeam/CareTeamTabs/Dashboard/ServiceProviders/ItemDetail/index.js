import React, { Component } from "react";
import { connect } from 'react-redux';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {
    CoreoText,
    CoreoImage,
    Navbar
} from '../../../../../../components';
import {ModalPopup} from '../../../../../../components/LevelOne/ModalPopup'
import {  setValueBasedOnWidth } from '../../../../../../utils/deviceDimensions';
import styles from './styles';
import {DasboardProfilePic} from '../../../../../../assets/images/index'
import {goBackToServiceProviderDashboardDetail,inpersinatePatient, clearImageData} from '../../../../../../redux/careTeam/Dashboard/actions'; 
import Icon from '../../../../../../components/Base/Icon';
import ActionButtons from '../../../Components/ActionButtons';
import { createVideoConference } from '../../../../../../redux/telehealth/actions'
import { onCreateNewConversation } from "../../../../../../redux/asyncMessages/actions";
import { getSPImage } from '../../../../../../redux/careTeam/Dashboard/actions';
import { USER_TYPES, TASK_PERCENTAGE, CARETEAM_SERVICE_PROVIDERS, RATING, ENTITY_SERVICE_PROVIDER, UserProfileType } from "../../../../../../constants/constants";
import { OverlayLoaderWrapper } from "../../../../../../components/Base/Preloader/Preloader";
import { isAPIFetching } from "../../../../../../utils/AppAPIUtils";
import ProgressBar, { PROGRESSBAR_WIDTH } from "../../../../../../components/LevelOne/ProgressBar";
import { makeACall } from "../../../../../../utils/communicationUtils";
import { SafeView } from "../../../../../../components/LevelOne";
import { isIOS, caseInsensitiveComparer } from "../../../../../../utils/appUtils";
import { navigateToScreenMainStack } from "../../../../../../redux/navigation/actions";
import { PATH } from "../../../../../../routes";

class ItemDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCallModal: false,
            showNoNumber: false,
            showFeedbackAlerts: false
        }
    }
    componentWillUnmount(){
        this.props.clearImageData()
    }
    componentDidMount() {
        this.props.itemDetail && this.props.getSPImage(this.props.itemDetail.serviceProviderId)
    }
    onPressConversation = () =>{
        let userDetails = [{
            userId: this.props.itemDetail && this.props.itemDetail.coreoHomeUserId,
            participantType: USER_TYPES.SERVICE_PROVIDER,
            participantId: this.props.itemDetail && this.props.itemDetail.serviceProviderId
        }]
        let requestObject = {
            participantList: userDetails,
            title: null,
            context: null
        }
        this.props.onCreateNewConversation(requestObject)
      }
    onTeleHealthPress = () => {
        let dataList = [
          {
            userId: this.props.itemDetail && this.props.itemDetail.coreoHomeUserId,
            participantType: USER_TYPES.SERVICE_PROVIDER,
            participantId: this.props.itemDetail && this.props.itemDetail.serviceProviderId,
            firstName: this.props.itemDetail && this.props.itemDetail.firstName,
            lastName: this.props.itemDetail && this.props.itemDetail.lastName
          }
        ];
        this.props.createVideoConference(dataList);
      }

      onCallPopUp= async (data) => {
        if(data === null || data === '' ){
            this.showNoNumberModal();
        }else{
            makeACall(data)
        }  
     }
     showNoNumberModal = () => {
        this.setState({showNoNumber : true})
    }

    changeModalPopup = () =>{
            this.setState({
                showNoNumber: false,
            })
    }
    makePoneCall = () =>{
        this.onCallPopUp(this.props.itemDetail.phoneNumber)
    }

    onClickSp = () => {
        let params = {
            id: this.props.itemDetail.serviceProviderId,
            IsEntityUser : caseInsensitiveComparer(this.props.itemDetail.type, UserProfileType.Individual)
        }
        this.props.goToSpProfile(params)
    }

     render() {
         let itemDetails = this.props.itemDetail
         let serviceCategories = itemDetails && this.props.itemDetail.serviceCategories && this.props.itemDetail.serviceCategories.map(category => category)
         let serviceTypes = itemDetails && this.props.itemDetail.serviceTypes && this.props.itemDetail.serviceTypes.map(serviceType => serviceType)
         let dataArray = [
            {key: 'Type', value: itemDetails && this.props.itemDetail.type ? this.props.itemDetail.type : ''},
            {key: 'Affiliation', value: itemDetails && this.props.itemDetail.affiliation ? this.props.itemDetail.affiliation : ''},
            {key: 'Service Category', value: serviceCategories ? serviceCategories.join(", ") : ''},
            {key: 'Service Type', value: serviceTypes ? serviceTypes.join(", ") : ''},
            {key: 'Feedback', value: itemDetails && this.props.itemDetail.feedback ? this.props.itemDetail.feedback : 0},
            {key: 'Rating', value: itemDetails && this.props.itemDetail.rating},
        ];
        if(this.props.selectedCount && this.props.selectedCount.label !== CARETEAM_SERVICE_PROVIDERS.IN_TOTAL_IN_THE_NETWORK && this.props.selectedCount.label !== CARETEAM_SERVICE_PROVIDERS.WITH_LOW_RATINGS){
            dataArray.push({key: "Task %", value: this.props.itemDetail.percentage, type: TASK_PERCENTAGE})
        }
        if(this.props.selectedCount && this.props.selectedCount.label === CARETEAM_SERVICE_PROVIDERS.WITH_FEEDBACK_ALERTS){
            dataArray.push({key: "SR ID", value: this.props.itemDetail.srid ? this.props.itemDetail.srid : ""});
            dataArray.push({key: "Visit ID", value: this.props.itemDetail.vid ? this.props.itemDetail.vid : ""});
        }
        let listItems = dataArray.map((item) => {
           
            return (
                <TouchableOpacity onPress={() => {this.setState({showFeedbackAlerts: !this.state.showFeedbackAlerts})}} style={[styles.listItem]}>
                    <CoreoText style={[styles.requestTitle1, {flex: 1}]}>{item.key}</CoreoText>
                    <View style={styles.listItemView}>
                        {item.type === TASK_PERCENTAGE ? <ProgressBar containerStyle={{width: setValueBasedOnWidth(120)}} progressStyle={{width: PROGRESSBAR_WIDTH * (item.value / 100)}} /> : <View />}
                        {item.key === RATING? <Icon name={isIOS() ? 'md-star' : 'ios-star'} style={styles.starIcon} />: null}
                        <CoreoText style={[styles.requestTitle1, { textAlign: "center"}]} numberOfLines={1}>{item.type === TASK_PERCENTAGE ? `${item.value} %` : item.value}</CoreoText>
                    </View>
                </TouchableOpacity>
            );
        });
        return (
            <SafeView>
            <View style={styles.topViewStyle}>
                <OverlayLoaderWrapper style={styles.overlayStyle} isLoading={isAPIFetching(this.props.loadingStatus)}>
                <Navbar title="Dashboard" showEmptyAdd />
                <View style={styles.cardView}>
                    <TouchableOpacity style={styles.profilePicture} onPress={this.onClickSp}>
                        <CoreoImage
                            source={this.props.providerImageData && this.props.providerImageData.image ? {uri: this.props.providerImageData.image} : DasboardProfilePic}
                            style={styles.imageProfileSize}
                        />
                    </TouchableOpacity>
                    <CoreoText style={styles.subTitle}>{itemDetails && (this.props.itemDetail.firstName + " " + this.props.itemDetail.lastName)}</CoreoText>
                </View>
                <ScrollView style={{marginBottom: 70}}>
                <View style={styles.listView}>
                    {listItems}
                </View>
                </ScrollView>
                <ActionButtons
                    disabled={this.props.itemDetail.type === ENTITY_SERVICE_PROVIDER}
                    onPressCall={this.makePoneCall}
                    onPressConversation={this.onPressConversation}
                    onPressVideocall={this.onTeleHealthPress}
                />
                    <ModalPopup
                        visible={this.state.showNoNumber}
                        primaryButton="OK"
                        primaryColor="#3c1053"
                        onConfirm={this.changeModalPopup}
                    >
                        <Text style={styles.message}>No number found.</Text>
                    </ModalPopup>
                </OverlayLoaderWrapper>
            </View>
            </SafeView>
        )
    }
}

function mapStateToProps(state) {
    let careTeamState = state.careTeamState
    return {
        itemDetail: careTeamState && state.careTeamState.dashboardState.itemDetail,
        providerImageData: careTeamState && state.careTeamState.dashboardState.providerImageData,
        loadingStatus: careTeamState && state.careTeamState.dashboardState.isLoading,
        selectedCount: careTeamState && state.careTeamState.dashboardState.selectedCount,
    };
};

function mapDispatchToProps(dispatch){
    return {
        clearImageData: () => dispatch(clearImageData()),
        getSPImage: (spId) => dispatch(getSPImage(spId)),
        onCreateNewConversation: (data) => dispatch(onCreateNewConversation(data)),
        createVideoConference: data => dispatch(createVideoConference(data)),
        goBackToServiceProviderDashboardDetail: () => dispatch(goBackToServiceProviderDashboardDetail()),
        inpersinatePatient: () => dispatch(inpersinatePatient()),
        goToVisitHistoryDetails: (params) => dispatch(navigateToScreenMainStack(PATH.VISIT_HISTORY_SERVICE_DETAILS, params)),
        goToSpProfile: (params) => dispatch(navigateToScreenMainStack(PATH.SERVICE_PROVIDER_PROFILE, params))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);