import React, { Component } from "react";
import { View, TouchableOpacity} from "react-native";
import {
  CoreoText,
  CoreoOpacityButton,
  CoreoImage,
  CoreoTextInput,
  CoreoScrollView,
  Navbar
} from "../../../../../../components";
import {ModalPopup} from '../../../../../../components/LevelOne/ModalPopup'
import { setValueBasedOnWidth } from "../../../../../../utils/deviceDimensions";
import styles from "./styles";
import {DasboardProfilePic} from '../../../../../../assets/images/index';
import {postAuthNo} from "../../../../../../redux/careTeam/Dashboard/actions";
import Icon from "../../../../../../components/Base/Icon";
import Icons from "../../../../../../assets/Icons";
import { setFontSize } from "../../../../../../utils/deviceDimensions";
import {THEME_PRIMARY_COLOR} from '../../../../../../constants/theme'
import { navigateToScreenMainStack, onBack } from '../../../../../../redux/navigation/actions';
import {connect} from 'react-redux'
import { onCreateNewConversation } from "../../../../../../redux/asyncMessages/actions";
import { getImage } from '../../../../../../redux/careTeam/Dashboard/actions';
import { PATH } from "../../../../../../routes";
import { createVideoConference } from '../../../../../../redux/telehealth/actions'
import { OverlayLoaderWrapper } from "../../../../../../components/Base/Preloader/Preloader";
import { isAPIFetching } from "../../../../../../utils/AppAPIUtils";
import { SafeView } from "../../../../../../components/LevelOne";
import { VISIT_SERVICE_STATUS_CLOSED, USER_TYPES, SERVICE_REQUEST_STATUS } from "../../../../../../constants/constants";
import { caseInsensitiveComparer, getFullName } from "../../../../../../utils/appUtils";
import { setSPDetails } from "../../../../../../redux/visitSelection/VisitServiceDetails/actions";

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.itemDetail = props.itemDetail || {};
    this.state = {
        showCallModal: false,
        authNo :  this.itemDetail ? this.itemDetail.authorizationNumber : ''
    }
}
  componentDidMount() {
    this.props.getImage(this.itemDetail.patientid)
  }
  onPressConversation(){
    const {patientType} = this.props;
    let userDetails = {
        userId:this.itemDetail.individualId,
        participantType: patientType
    }
    let requestObject = {
        context: this.itemDetail.individualId,
        createdByType: patientType,
        participantList:[userDetails],
        title: null,
        createdBy: this.itemDetail.serviceProviderId
    }
    this.props.onCreateNewConversation(requestObject)
  }
  onTeleHealthPress() {
    let dataList = [
      {
        userId: this.itemDetail.individualId,
        participantType: USER_TYPES.PATIENT
      }
    ];
    this.props.createVideoConference(dataList);
  }

  onCallPopUp= async () => {
    this.setState({
       showCallModal: true
    })
 }

 onBlurAuthNo = data => {
  let model = {
    patientId: this.itemDetail.patientid,
    diagnosisCodes: this.itemDetail.diagnosisCode? [this.itemDetail.diagnosisCode] : [],
    serviceRequestId:this.itemDetail.serviceRequestId,
    approvalStatus: true,
    AuthorizationNumber: this.state.authNo
  }
  this.props.postAuthNo(model, this.itemDetail.serviceRequestId)
 }

 onClickApprove= (hideApprove) => {
   const {requestObject} = this.props.navigation.state.params
  const params = {
      patientId: this.itemDetail.patientid,
      serviceRequestId: this.itemDetail.serviceRequestId,
      hideApprove,
      requestObject,
      isPlanVisit: this.itemDetail.serviceProviderType === USER_TYPES.EU
    }
  this.props.setSPDetails(this.itemDetail.serviceProviderId)
  this.props.goToServiceRequestDetails(params)
}

  render() {
    let dataArray = [
      {
        key: this.itemDetail.serviceRequestId
        ? this.itemDetail.serviceRequestNumber
        : "",
        value: "View details",
        canGoToRequestDetails: true
      },
      {
        key: "Service Category",
        value: this.itemDetail.serviceCategoryDescription
          ? this.itemDetail.serviceCategoryDescription
          : ""
      },
      {
        key: "Service Type",
        value: this.itemDetail.serviceType
          ? this.itemDetail.serviceType.join(', ')
          : ""
      },
      {
        key: "Status",
        value: this.itemDetail.statusName ? this.itemDetail.statusName : ""
      },
      {
        key: "Service Provider",
        value:
          this.itemDetail.providerFirstName ||
          this.itemDetail.providerLastName
            ? getFullName(this.itemDetail.providerFirstName, this.itemDetail.providerLastName)
            : "Not Assigned"
      }
    ];

    let listItems = dataArray.map(item => {
      let RenderComponent = View
      let onPress = () => {}
      let icon = null
      if(item.canGoToRequestDetails){
        RenderComponent = TouchableOpacity
        onPress = () => { this.onClickApprove(true)}
        icon = <Icon {...Icons.angleRight} size={setFontSize(20)} style={{marginLeft: setValueBasedOnWidth(7)}} color='#acacac' />
      }
      return (
        <RenderComponent onPress={onPress} style={styles.listItem}>
          <View style={styles.itemKeyView}>
              <CoreoText style={styles.requestTitle1}>{item.key}</CoreoText>
          </View>
          <View style={styles.itemValueView}>
            <CoreoText numberOfLines={1} style={[styles.requestTitle, item.canGoToRequestDetails ? {color: THEME_PRIMARY_COLOR, fontWeight: "600"} : {}]}>{item.value}</CoreoText>
            {icon}
          </View>
        </RenderComponent>
      );
    });

    let AuthorizationItem = (
      <View style={styles.listItem}>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <CoreoText style={styles.requestTitle1}>Authorization</CoreoText>
        </View>
        <CoreoTextInput
          style={styles.contentFlexEnd}
          placeholder="Auth No."
          value={this.state.authNo}
          editable={!(caseInsensitiveComparer(this.itemDetail.statusName, 'Closed' )) ? true : false}
          maxLength={100}
          onBlur={this.onBlurAuthNo}
          inputStyle={styles.textBox}
          placeholderTextColor="#ccc"
          onChangeText={(text) => {
            this.setState({ authNo: text });
          }}
        />
      </View>
    );
    let DiagnosisCode = (
      <View style={styles.listItem}>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <CoreoText style={styles.requestTitle1}>Diagnosis Code</CoreoText>
        </View>
      <View><CoreoOpacityButton
          text={ this.itemDetail.diagnosisCode ? this.itemDetail.diagnosisCode :'ICD Code'}
          onPress={!(caseInsensitiveComparer(this.itemDetail.statusName, 'Closed' )) ? this.props.goToDiagnosisCode : ()=>{}}
          textStyle={styles.modalSecondaryBtnText}
          style={styles.modalSecondaryBtn}
        /></View>
       </View>
    );
    let Approval = (
      <View style={styles.listItem}>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <CoreoText style={styles.requestTitle1}>Approval</CoreoText>
        </View>
        <CoreoOpacityButton
          text={this.itemDetail.statusName === SERVICE_REQUEST_STATUS.pendingApproval.title? 'Review': this.itemDetail.statusName === SERVICE_REQUEST_STATUS.declined.title?"Declined": "Approved"}
          onPress={() => {this.onClickApprove(false)}}
          textStyle={styles.srDetailButton}
          style={styles.modalSecondaryBtn}
        />
      </View>
    );
    let statusName = this.itemDetail.statusName;
    const {patientImageData} = this.props;
    return (
      <SafeView>
      <View style={styles.itemFlexSize}>
        <OverlayLoaderWrapper style={styles.itemFlexSize} isLoading={isAPIFetching(this.props.loadingStatus)}>
        <Navbar title="Dashboard" showEmptyAdd />
        <View style={styles.cardView}>
          <View style={styles.profilePicture}>
            <CoreoImage
              source={patientImageData && patientImageData.image ? {uri: patientImageData.image} : DasboardProfilePic}
              style={styles.imageProfileSize}
            />
          </View>
          <CoreoText style={styles.subTitle}>
            {getFullName(this.itemDetail.patientFirstName, this.itemDetail.patientLastName)}
          </CoreoText>
        </View>
        <CoreoScrollView style={styles.listView}>
          {listItems}
          {(!caseInsensitiveComparer(statusName, VISIT_SERVICE_STATUS_CLOSED)) ?
            <View>
              {AuthorizationItem}
              {DiagnosisCode}
              {Approval}
              </View>
           : null}
        </CoreoScrollView>
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
                    <CoreoText style={styles.message}>+919876543210</CoreoText>
                </ModalPopup>

        </OverlayLoaderWrapper>
      </View>
      </SafeView>
    );
  }
}

function mapStateToProps(state) {
  let dashboardState = state.careTeamState && state.careTeamState.dashboardState;
  return {
    itemDetail:  dashboardState.itemDetail,
    dashboardState:  dashboardState,
    serviceRequestDashboardDetail:  dashboardState.serviceRequestDashboardDetail,
    patientImageData:  dashboardState.patientImageData,
    setSelectedDashboardDetail:  dashboardState.setSelectedDashboardDetail,
    loadingStatus: dashboardState.isLoading,

  };
}

function mapDispatchToProps(dispatch) {
  return {
      getImage: (data) => dispatch(getImage(data)),
      onCreateNewConversation: (data) => dispatch(onCreateNewConversation(data)),
      createVideoConference: data => dispatch(createVideoConference(data)),
      postAuthNo : (data, serviceRequestId) => dispatch(postAuthNo(data, serviceRequestId)),
      goBack: () => dispatch(onBack()),
      goToServiceRequestDetails: (params) => dispatch(navigateToScreenMainStack(PATH.VISIT_SERVICE_DETAILS, params)),
      goToDiagnosisCode: () => dispatch(navigateToScreenMainStack(PATH.CARE_TEAM_DIAGNOSIS_CODE)),
      setSPDetails : (id) => dispatch(setSPDetails(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetail);
