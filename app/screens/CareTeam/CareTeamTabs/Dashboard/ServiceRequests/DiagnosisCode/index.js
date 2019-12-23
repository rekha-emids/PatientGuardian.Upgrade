import React, { Component } from "react";
import { View, Platform, Image, Text, TouchableOpacity,ScrollView} from "react-native";
import { CoreoCard} from "../../../../../../components/LevelOne";
import { CoreoText} from "../../../../../../components";
import Navbar from "../../../../../../components/LevelOne/Navbar";
import {SafeView} from "../../../../../../components/LevelOne";
import styles from "./style";
import { Header, Item, Icon, Input, Button } from "native-base";
import { getDiagnosisCode,updateDiagnosisCodeSuccess,postDiagnosisCode, resetSelectedIcdCodes } from "../../../../../../redux/careTeam/Dashboard/actions";
import { connect } from "react-redux";
import { _ } from "../../../../../../utils/validations";
import { THEME_PRIMARY_COLOR } from "../../../../../../constants/theme";
import Icons from '../../../../../../components/Base/Icon';
import IconImg from '../../../../../../assets/images/Icons';
import {
  setFontSiz
} from "../../../../../../utils/deviceDimensions";
import { isIOS } from "../../../../../../utils/appUtils";
import {isAPIFetching} from '../../../../../../utils/AppAPIUtils'
import { OverlayLoaderWrapper } from "../../../../../../components/Base/Preloader/Preloader";
class DiagnosisCode extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      searchText: ''
    };
  }
  componentDidMount = () => {
    this.props.getDiagnosisCode();
  };

  componentWillUnmount(){
    this.props.resetSelectedIcdCodes()
  }

  onSearchTextChange = value => {
    this.setState({ searchText: value });
    this.props.getDiagnosisCode(value);
  }
  
  handleSelectPress = () => {
    let model = {
      patientId: this.props.itemDetail.patientid,
      diagnosisCodes: this.props.selectedIcdCodes,
      serviceRequestId:this.props.serviceRequestId,
      approvalStatus: true,
      AuthorizationNumber: this.props.itemDetail.authorizationNumber
    }
    let selectedDashboardDetailquest = this.props.setSelectedDashboardDetail
    let srCount = this.props.dashboardState.serviceRequestDashboardDetail.length
    let requestModal = {
      careTeamId: selectedDashboardDetailquest.careTeamId,
      fromDate: selectedDashboardDetailquest.fromDate,
      pageNumber: 1,
      pageSize: srCount,
      recurringPattern: selectedDashboardDetailquest.recurringPattern,
      requestType: "init",
      serviceTypeIds: selectedDashboardDetailquest.serviceTypeIds,
      sortName: selectedDashboardDetailquest.sortName,
      sortOrder: selectedDashboardDetailquest.sortOrder,
      status: selectedDashboardDetailquest.status,
      statusFilterId: selectedDashboardDetailquest.statusFilterId,
      statusName: selectedDashboardDetailquest.statusName,
      tabFilter: selectedDashboardDetailquest.tabFilter,
      toDate: selectedDashboardDetailquest.toDate
    }
    this.props.postDiagnosisCode(model, requestModal)
  };
  
  render() {

    let diagnosisCodeComponent = null;
    let icon = isIOS() ? IconImg.checkMarkIos : IconImg.checkMarkAndroid
    if (!_.isEmpty(this.props.diagnosisCodeData)) {
      diagnosisCodeComponent = this.props.diagnosisCodeData.map(
        (item, index) => {
          return (
            <View style={styles.listItem} key={index}>
              <View style={styles.itemView}>
                <CoreoText style={[...styles.requestTitle]}>
                  {item.diagnosisCodes}
                </CoreoText>
              </View>
              <View style={styles.descView}>
                <CoreoText style={styles.requestTitle}>
                  {item.icdCodeDescription}
                </CoreoText>
              </View>
              <View style={styles.itemView}>
              <TouchableOpacity style={styles.checkStyle} onPress={() => this.props.updateDiagnosisCodeSuccess(item.diagnosisCodes,!item.selected)}>
                    {item.selected ?
                    <Icons {...icon} style={{backgroundColor: THEME_PRIMARY_COLOR}} color={THEME_PRIMARY_COLOR} size={setFontSize(22)} />
                    : <View style={styles.emptyCheckMark} />
                    }
                </TouchableOpacity>
              </View>
            </View>
          );
        }
      );
    }
    return (
      <SafeView>
      <View style={styles.container}>
        <CoreoCard style={styles.mainCard}>
          <Navbar title={"Select Diagnosis Code"} showEmptyAdd />
          <Header searchBar rounded style={styles.searchBar}>
            <Item>
              {[
                !isIOS() ? (
                  <Image
                    style={[
                      isIOS()
                        ? styles.rightIconIOS
                        : styles.rightIcon,
                      { marginLeft: 5, height: 30, width: 30 }
                    ]}
                    source={require("../../../../../../assets/images/search.png")}
                  />
                ) : (
                  <Icon name="ios-search" />
                )
              ]}

              <Input
                placeholder="Search"
                onChangeText={this.onSearchTextChange}
              />
            </Item>

            {[
              Platform.OS == "android" ? (
                <Button transparent>
                  <Text>Search</Text>
                </Button>
              ) : null
            ]}
          </Header>
          <OverlayLoaderWrapper isLoading={isAPIFetching(this.props.loadingStatus)}>
          <ScrollView>{diagnosisCodeComponent}</ScrollView>
          </OverlayLoaderWrapper>
        </CoreoCard>
        <TouchableOpacity
          onPress={this.handleSelectPress}
          style={styles.button}
        >
          <Text style={styles.buttonTextStyle}>OK</Text>
        </TouchableOpacity>
      </View></SafeView>
    );
  }
}
function mapStateToProps(state) {
  let careTeamState = state.careTeamState;
  return {
    serviceRequestId: careTeamState && state.careTeamState.dashboardState.itemDetail.serviceRequestId,
    diagnosisCodeData: careTeamState && state.careTeamState.dashboardState.diagnosisCode,
    selectedIcdCodes: careTeamState && state.careTeamState.dashboardState.selectedIcdCodes,
    itemDetail: careTeamState && state.careTeamState.dashboardState.itemDetail,
    dashboardState: careTeamState && state.careTeamState.dashboardState,
    setSelectedDashboardDetail: careTeamState && state.careTeamState.dashboardState.setSelectedDashboardDetail,
    loadingStatus: careTeamState && state.careTeamState.dashboardState.isLoading,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateDiagnosisCodeSuccess:(diagnosisCode,selected)=>dispatch(updateDiagnosisCodeSuccess({diagnosisCode,selected})),
    getDiagnosisCode: (data) => dispatch(getDiagnosisCode(data)),
    postDiagnosisCode:(data, requestModal) => dispatch(postDiagnosisCode(data, requestModal)),
    resetSelectedIcdCodes: () => dispatch(resetSelectedIcdCodes())
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiagnosisCode);
