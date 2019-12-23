import React, { Component } from "react";
import { connect } from 'react-redux';
import {View, Text, TouchableOpacity} from 'react-native';
import {
    CoreoText,
    CoreoImage,
    Navbar
} from '../../../../../../components';
import {ModalPopup} from '../../../../../../components/LevelOne/ModalPopup'
import { setValueBasedOnWidth, setValueBasedOnHeight } from '../../../../../../utils/deviceDimensions';
import styles from '../ItemDetail/styles';
import {DasboardProfilePic, careteam_02} from '../../../../../../assets/images/index'
import {inpersinatePatient, clearImageData, getFeedbackAlerts,getImage} from '../../../../../../redux/careTeam/Dashboard/actions'; 
import Icon from '../../../../../../components/Base/Icon';
import Icons from '../../../../../../assets/Icons';
import { setFontSize } from '../../../../../../utils/deviceDimensions';
import ActionButtons from '../../../Components/ActionButtons';
import { createVideoConference,setContext } from '../../../../../../redux/telehealth/actions'
import { onCreateNewConversation } from "../../../../../../redux/asyncMessages/actions";
import { getSPImage } from '../../../../../../redux/careTeam/Dashboard/actions';
import { USER_TYPES, TASK_PERCENTAGE, CARETEAM_SERVICE_PROVIDERS, OTHERS,  NOT_DISCLOSED } from "../../../../../../constants/constants";
import { OverlayLoaderWrapper } from "../../../../../../components/Base/Preloader/Preloader";
import ProgressBar, { PROGRESSBAR_WIDTH } from "../../../../../../components/LevelOne/ProgressBar";
import { makeACall } from "../../../../../../utils/communicationUtils";
import { SafeView, ListScrollerAPIWrapper } from "../../../../../../components/LevelOne";
import { navigateToScreenMainStack } from "../../../../../../redux/navigation/actions";
import { getFormatedDate } from "../../../../../../utils/momentUtil";
import {_} from '../../../../../../utils/validations'
import { INIT } from "../../../../../../constants/AppAPIConstants";
import { PATH } from "../../../../../../routes";


export const FeedbackAlertGridItem = (props) => {
    const goToVisitHistory = () => {props.goToVisitHistory(props.serviceRequestVisitId)} 
    return(
        
        <View style={styles.listItem}>
            <View style={{flex: 1}}>
                <CoreoText style={[styles.visitGridStyle]}>Visit Id</CoreoText>
                <CoreoText style={[styles.visitGridStyle]}>Visit Date</CoreoText>
            </View>
            <View style={styles.listValueItem}>
                <View style={styles.row}>
                    <View>
                        <CoreoText style={[styles.visitGridStyle, styles.textRight]} numberOfLines={1}>{props.serviceRequestVisitNumber}</CoreoText>     
                        <CoreoText style={[styles.visitGridStyle, styles.textRight]} numberOfLines={1}>{getFormatedDate(props.visitDate)}</CoreoText>          
                    </View>
                    <TouchableOpacity onPress={goToVisitHistory}>
                        <CoreoImage
                            source={careteam_02}
                            style={[styles.actionButton, styles.margin]}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export const FeedbackAlertGrid = (props) => {
    let icon = props.showFeedbackAlerts ? Icons.arrowUp : Icons.arrowDown
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.listItem]}>
                    <CoreoText style={[styles.requestTitle1, {flex: 1}]}>{props.name}</CoreoText>
                    <View style={styles.listValueItem}>
                        <CoreoText style={[styles.requestTitle1, { textAlign: "center"}]} numberOfLines={1}>{props.value}</CoreoText>
                        <View style={styles.row}>
                            <Icon {...Icons.bell} size={setFontSize(20)} />
                            <CoreoText style={[styles.requestTitle1, styles.rightMargin]}>{props.count}</CoreoText>
                            <Icon {...icon} size={setFontSize(20)} />
                        </View>
                    </View>
        </TouchableOpacity>
    )
}

class FeedbackAlerts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCallModal: false,
            showNoNumber: false,
            showFeedbackAlerts: false,
        }
    }

    componentWillUnmount(){
        this.props.clearImageData()
    }
    isSp = () =>{
        return !_.isNil(this.props.itemDetail.serviceProviderId)
    }
    componentDidMount() {
        this.isSp() ?this.props.getSPImage(this.props.itemDetail.serviceProviderId) :
        this.props.getPGImage(this.props.itemDetail.individualId)
    }
    getUserInfo =  () => {
        let userType = this.isSp() ? USER_TYPES.SERVICE_PROVIDER : USER_TYPES.PATIENT
        let participantId = this.isSp() ? this.props.itemDetail.serviceProviderId :this.props.itemDetail.individualId

        return {
            userType,
            participantId
        }
    }
    onPressConversation = () =>{

        let userDetails = [{
            userId:this.props.itemDetail.coreoHomeUserId,
            participantType: this.getUserInfo().userType,
            participantId:  this.getUserInfo().participantId
        }]

        let requestObject = {
            participantList: userDetails,
            title: null,
            context: this.isSp()?null:this.getUserInfo().participantId
        }

        this.props.onCreateNewConversation(requestObject)
      }
    onTeleHealthPress = () => {
        let dataList = [
          {
            userId:this.props.itemDetail.coreoHomeUserId,
            participantType: this.getUserInfo().userType,
            participantId:this.getUserInfo().participantId,
            firstName:this.isSp()? this.props.itemDetail.firstName:this.props.itemDetail.individualName,
            lastName:this.isSp()? this.props.itemDetail.lastName:'',
            thumbNail:this.isSp()?null: this.props.itemDetail.thumbNail
          }
        ];
        !this.isSp() && this.props.setContext(this.getUserInfo().participantId)
        this.props.createVideoConference(dataList);
      }

      onCallPopUp= async () => {
        let data = this.props.itemDetail.phoneNumber
        if(data === null || data === '' ){
            this.showNoNumberModal();
        }else{
            makeACall(data)
        }  
     }
     showNoNumberModal = () => {
        this.setState({showNoNumber : true})
    }

    goToVisitHistoryDetails = (visitId) => {
        let params = {
            serviceRequestVisitId: visitId,
            feedbackAlertUserType: this.getUserInfo().userType
        }
        this.props.goToVisitHistoryDetails(params)
    }

    apiCall = (requestObject, requestType = INIT) => {
        let participantId = this.getUserInfo().participantId
        let userType = this.getUserInfo().userType
        this.props.getFeedbackAlerts(participantId, userType, requestObject, requestType)
    }
    onHeaderItemPress= () => {this.setState({showFeedbackAlerts: !this.state.showFeedbackAlerts})}
    header = () => {
        let serviceCategories = this.props.itemDetail.serviceCategories && this.props.itemDetail.serviceCategories.map(category => category)
        let serviceTypes = this.props.itemDetail.serviceTypes && this.props.itemDetail.serviceTypes.map(serviceType => serviceType)
        let dataArray = [
           {key: 'Type', value: this.props.itemDetail.type ? this.props.itemDetail.type : ''},
           {key: 'Affiliation', value: this.props.itemDetail.affiliation ? this.props.itemDetail.affiliation : ''},
           {key: 'Rating', value: this.props.itemDetail.rating ? this.props.itemDetail.rating : ""},
       ];
       dataArray.push({key: 'Feedback', value: this.props.itemDetail.feedback ? this.props.itemDetail.feedback : 0})
       let listItems = dataArray.map((item) => {
        
           return (
               <TouchableOpacity onPress={this.onHeaderItemPress} style={[styles.listItem]}>
                   <CoreoText style={[styles.requestTitle1, {flex: 1}]}>{item.key}</CoreoText>
                   <View style={styles.listValueItem}>
                       {item.type === TASK_PERCENTAGE ? <ProgressBar containerStyle={{width: setValueBasedOnWidth(120)}} progressStyle={{width: PROGRESSBAR_WIDTH * (item.value / 100)}} /> : <View />}
                       <CoreoText style={[styles.requestTitle1, { textAlign: "center"}]} numberOfLines={1}>{item.type === TASK_PERCENTAGE ? `${item.value} %` : item.value}</CoreoText>
                   </View>
               </TouchableOpacity>
           );
       });
       return <View>{listItems}</View>
    }

    headerPatient = () => {
        let contractName = ""
        if(this.props.itemDetail.contracts && this.props.itemDetail.contracts[0]){
            contractName = this.props.itemDetail.contracts[0].contractName
        }
        let extrafields = []
       
        let cohortNames = this.props.itemDetail.cohorts && this.props.itemDetail.cohorts.map(cohort => cohort.cohortName)
        let allCohort = cohortNames && cohortNames.length ? cohortNames.join(', ') : ""
        let gender = this.props.itemDetail.gender || ""
        if(gender && gender.toLowerCase() === OTHERS.toLowerCase()){
           gender = NOT_DISCLOSED
        }
        let dataArray = [
           {key: 'MPI', value: this.props.itemDetail.mpi ? this.props.itemDetail.mpi : ''},
           {key: 'Gender', value: gender},
           {key: 'Age', value: this.props.itemDetail.age ? this.props.itemDetail.age : ''},
           {key: 'Contract', value: contractName},
           {key: 'Attributed Provider', value: this.props.itemDetail.attributeProvider ? this.props.itemDetail.attributeProvider : ''},
           {key: 'Cohorts', value: allCohort},
           // {key: 'Rating', value: this.props.itemDetail.patientRating ? this.props.itemDetail.patientRating : ''},
           // {key: 'Visits', value: this.props.itemDetail.visitCount ? this.props.itemDetail.visitCount : ''},
       ];
       dataArray = dataArray.concat(extrafields)

       if(this.props.selectedCount.label === CARETEAM_SERVICE_PROVIDERS.WITH_FEEDBACK_ALERTS){
           dataArray.push({key: "Feedback", value:this.props.itemDetail.feedback ? this.props.itemDetail.feedback : 0})
       }        
      
       let listItems = dataArray.map((item) => {
                    return (
               <View style={styles.listItem}>
                   <CoreoText style={[styles.requestTitle1, {flex: 1}]} numberOfLines={1}>{item.key}</CoreoText>
                   <CoreoText style={[styles.requestTitle2, {flex: 2, textAlign: "right"}]} numberOfLines={1}>{item.value}</CoreoText>
               </View>
           );
       });

       return <View>{listItems}</View>
    }
    inpersinateClick = () => {this.props.inpersinatePatient()}
    onConfirm = () => {
        this.setState({
            showNoNumber: false,
        })
    }

     render() {
        return (
            <SafeView>
            <View style={styles.topViewStyle}>
                <OverlayLoaderWrapper style={styles.overlayStyle}>
                <Navbar title="Dashboard" showEmptyAdd />
                <View style={styles.cardView}>
                    <View style={styles.profilePicture}>
                        {this.isSp()? <CoreoImage
                            source={this.props.providerImageData && this.props.providerImageData.image ? {uri: this.props.providerImageData.image} : DasboardProfilePic}
                            style={styles.imageProfileSize}
                        />:
                        <CoreoImage
                        source={this.props.patientImageData && this.props.patientImageData.image ? {uri: this.props.patientImageData.image} : DasboardProfilePic}
                        style={styles.imageProfileSize}
                        />
                        }
                    </View>
                    <CoreoText style={styles.subTitle}>{this.isSp()?this.props.itemDetail.firstName + " " + this.props.itemDetail.lastName : this.props.itemDetail.individualName}</CoreoText>
                </View>
                <View style={{flex:1, paddingBottom: setValueBasedOnHeight(65)}}>
                <ListScrollerAPIWrapper
                    networkCallStatus={this.props.loadingStatus}
                    header={this.isSp()? this.header:this.headerPatient}
                    renderComponent={FeedbackAlertGridItem}
                    goToVisitHistory={this.goToVisitHistoryDetails}
                    data={this.props.feedbackAlerts}
                    isPaginationEnabled={true}
                    apiSaga={this.apiCall}
                    />
                </View>
                <ActionButtons
                    onPressInpersinate={this.isSp()?null : this.inpersinateClick}
                    onPressCall={this.onCallPopUp}
                    onPressConversation={this.onPressConversation}
                    onPressVideocall={this.onTeleHealthPress}
                />
                    <ModalPopup
                        visible={this.state.showNoNumber}
                        primaryButton="OK"
                        primaryColor="#3c1053"
                        onConfirm={this.onConfirm}
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
    let dashboardState = state.careTeamState && state.careTeamState.dashboardState
    return {
        itemDetail:  dashboardState.itemDetail,
        providerImageData:  dashboardState.providerImageData ,
        patientImageData:  dashboardState.patientImageData,
        loadingStatus:  dashboardState.isLoading ,
        selectedCount:  dashboardState.selectedCount,
        fromDate:  dashboardState.fromDate ,
        toDate:  dashboardState.toDate ,
        genderDetails: state.serviceProvidersTabState.requestsState.gender,
        careTeamId:  state.authState.userState.careTeamId,
        feedbackAlerts:  dashboardState.feedbackAlerts,
    };
};

function mapDispatchToProps(dispatch){
    return {
        clearImageData: () => dispatch(clearImageData()),
        getSPImage: (spId) => dispatch(getSPImage(spId)),
        getPGImage : (pgID) => dispatch(getImage(pgID)),
        setContext: (data) => dispatch(setContext(data)),
        onCreateNewConversation: (data) => dispatch(onCreateNewConversation(data)),
        createVideoConference: data => dispatch(createVideoConference(data)),
        inpersinatePatient: () => dispatch(inpersinatePatient()),
        goToVisitHistoryDetails: (params) => dispatch(navigateToScreenMainStack(PATH?PATH.VISIT_HISTORY_SERVICE_DETAILS:null, params)),
        getFeedbackAlerts: (id, userType, requestObject, requestType) => dispatch(getFeedbackAlerts(id, userType, requestObject, requestType)),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FeedbackAlerts);