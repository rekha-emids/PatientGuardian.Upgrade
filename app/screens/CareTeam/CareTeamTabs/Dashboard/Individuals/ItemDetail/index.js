import React, { Component } from "react";
import { connect } from 'react-redux';
import {View, Text} from 'react-native';
import {
    CoreoText,
    CoreoImage,
    CoreoScrollView
} from '../../../../../../components';
import {ModalPopup} from '../../../../../../components/LevelOne/ModalPopup'
import {DasboardProfilePic} from '../../../../../../assets/images/index';
import styles from './styles';
import {goBackToIndividualDashboardDetail, inpersinatePatient, clearImageData} from '../../../../../../redux/careTeam/Dashboard/actions'; 
import ActionButtons from '../../../Components/ActionButtons';
import { createVideoConference, setContext } from '../../../../../../redux/telehealth/actions'
import { onCreateNewConversation } from "../../../../../../redux/asyncMessages/actions";
import { getImage } from '../../../../../../redux/careTeam/Dashboard/actions';
import { USER_TYPES, INDIVIDUAL_LABELS, OTHERS, NOT_DISCLOSED} from "../../../../../../constants/constants";
import { SafeView, Navbar } from "../../../../../../components/LevelOne";
import { OverlayLoaderWrapper } from "../../../../../../components/Base/Preloader/Preloader";
import { isAPIFetching } from "../../../../../../utils/AppAPIUtils";
import { makeACall } from "../../../../../../utils/communicationUtils";
import { navigateToScreenMainStack } from "../../../../../../redux/navigation/actions";
import { PATH } from "../../../../../../routes";
import { caseInsensitiveComparer } from "../../../../../../utils/appUtils";


class ItemDetail extends Component {
    constructor(props) {
        super(props);
        this.itemDetail = props.itemDetail || {};
        this.state = {
            showCallModal: false,
            showNoNumber : false
        }
    }
    componentWillUnmount(){
        this.props.clearImageData()
    }
    componentDidMount() {
        this.itemDetail && this.props.getImage(this.itemDetail)
    }
    onPressConversation(){
        let userDetails = [{
            userId:  this.itemDetail.coreoHomeUserId,
            participantType: USER_TYPES.PATIENT,
            participantId: this.itemDetail.individualId
        }]
        let requestObject = {
            context:  this.itemDetail.individualId,
            participantList: userDetails,
            title: null
        }
        this.props.onCreateNewConversation(requestObject)
      }
    onTeleHealthPress() {
        let dataList = [
          {
            userId:  this.itemDetail.coreoHomeUserId,
            participantType: USER_TYPES.PATIENT,
            participantId:  this.itemDetail.individualId,
            firstName:  this.itemDetail.individualName,
            lastName: '',
            thumbNail:  this.itemDetail.thumbNail
          }
        ];
        this.props.setContext(this.itemDetail? this.itemDetail.individualId: null)
        this.props.createVideoConference(dataList);
      }

      onCallPopUp = async (value) => { 
        if(value === null || value === '' ){
            this.showNoNumberModal();
        }else{
            makeACall(value)
        }
        
      }

      showNoNumberModal = () => {
        this.setState({showNoNumber : true})
    }

     render() {
         let contractName = "";
         
         if( this.itemDetail.contracts && this.itemDetail.contracts[0]){
             contractName = this.itemDetail.contracts[0].contractName
         }
         let extrafields = []

         if(caseInsensitiveComparer(this.props.selectedCount.label, INDIVIDUAL_LABELS.WITH_NO_INVALID_CREDIT_CARD)){
            extrafields = [
                {key: 'Email', value: this.itemDetail.emailId ? this.itemDetail.emailId : ''},
                {key: 'Contact', value: this.itemDetail.phoneNumber  ?  this.itemDetail.phoneNumber : ''},   
            ]
         }else if(caseInsensitiveComparer(this.props.selectedCount.label, INDIVIDUAL_LABELS.WITH_VISITS_IN_THE_PERIOD)){
            extrafields = [
                {key: 'Visits', value: this.itemDetail.visitCount ? this.itemDetail.visitCount : ''},   
            ]
         }

         let cohortNames =  this.itemDetail.cohorts && this.itemDetail.cohorts.map(cohort => cohort.cohortName)
         let allCohort = cohortNames && cohortNames.length ? cohortNames.join(', ') : ""
         let gender =  this.itemDetail.gender || ""
         if(caseInsensitiveComparer(gender, OTHERS)){
            gender = NOT_DISCLOSED
         }
         let dataArray = [
            {key: 'MPI', value:  this.itemDetail.mpi ?  this.itemDetail.mpi : ''},
            {key: 'Gender', value: gender},
            {key: 'Age', value:  this.itemDetail.age ?  this.itemDetail.age : ''},
            {key: 'Contract', value: contractName},
            {key: 'Attributed Provider', value:  this.itemDetail.attributeProvider ?  this.itemDetail.attributeProvider : ''},
            {key: 'Risk Group', value: this.itemDetail.riskGroup ? this.itemDetail.riskGroup : '' },
            {key: 'Cohorts', value: allCohort},
            // {key: 'Rating', value: this.itemDetail.patientRating ? this.itemDetail.patientRating : ''},
            // {key: 'Visits', value: this.itemDetail.visitCount ? this.itemDetail.visitCount : ''},
        ];
        dataArray = dataArray.concat(extrafields)

        let listItems = dataArray.map((item) => {
            return (
                <View style={styles.listItem}>
                    <CoreoText style={[styles.requestTitle1, {flex: 1}]} numberOfLines={1}>{item.key}</CoreoText>
                    <CoreoText style={[styles.requestTitle2, {flex: 2, textAlign: "right"}]} numberOfLines={1}>{item.value}</CoreoText>
                </View>
            );
        });
        return (
            <SafeView>
            <OverlayLoaderWrapper style={{flex: 1}} isLoading={isAPIFetching(this.props.loadingStatus)}>

            <View style={{flex: 1, backgroundColor: '#e1e1e1'}}>
                <Navbar title="Dashboard" showEmptyAdd/>
                <View style={styles.cardView}>
                    <View style={styles.profilePicture}>
                        <CoreoImage
                            source={this.props.patientImageData && this.props.patientImageData.image ? {uri: this.props.patientImageData.image} : DasboardProfilePic}
                            style={styles.imageProfileSize}
                        />
                    </View>
                    <CoreoText style={styles.subTitle}>{this.itemDetail && this.itemDetail.individualName}</CoreoText>
                </View>
               
                <CoreoScrollView style={styles.listView}>
                    {listItems}
                </CoreoScrollView>
                <ActionButtons
                    onPressInpersinate={() => {this.props.inpersinatePatient()}}
                    onPressCall={() => this.onCallPopUp(this.itemDetail.phoneNumber)}
                    onPressConversation={() => this.onPressConversation()}
                    onPressVideocall={() => this.onTeleHealthPress()}
                />
                  <ModalPopup
                    visible={this.state.showCallModal}
                    primaryButton="OK"
                    primaryColor="#3c1053"
                    onConfirm={() => {
                        this.setState({
                            showCallModal: !this.state.showCallModal,
                        })
                    }}
                >
                    <CoreoText style={styles.message}>{this.itemDetail && this.itemDetail.phoneNumber}</CoreoText>
                </ModalPopup>
                <ModalPopup
                        visible={this.state.showNoNumber}
                        primaryButton="OK"
                        primaryColor="#3c1053"
                        onConfirm={() => {
                            this.setState({
                                showNoNumber: false,
                            })
                        }}
                    >
                        <Text style={styles.message}>No number found.</Text>
                    </ModalPopup>
                    
            </View>
            </OverlayLoaderWrapper>
            </SafeView>
        )
    }
}

function mapStateToProps(state) {
    let careTeamDashboardState = state.careTeamState && state.careTeamState.dashboardState
    return {
        itemDetail:careTeamDashboardState? careTeamDashboardState.itemDetail:{},
        patientImageData:careTeamDashboardState? careTeamDashboardState.patientImageData:null,
        selectedCount:careTeamDashboardState? careTeamDashboardState.selectedCount:{},
        loadingStatus:careTeamDashboardState? careTeamDashboardState.isLoading:0,
    };
};

function mapDispatchToProps(dispatch){
    return {
        clearImageData: () => dispatch(clearImageData()),
        onCreateNewConversation: (data) => dispatch(onCreateNewConversation(data)),
        createVideoConference: data => dispatch(createVideoConference(data)),
        goBackToIndividualDashboardDetail: () => dispatch(goBackToIndividualDashboardDetail()),
        inpersinatePatient: () => dispatch(inpersinatePatient()),
        getImage: (data) => dispatch(getImage(data)),
        setContext: (data) => dispatch(setContext(data)),
        goToVisitHistory: (params) => dispatch(navigateToScreenMainStack(PATH.VISIT_HISTORY_SERVICE_DETAILS, params))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);