import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, View, Text } from "react-native";
import { ELIBILITY_STATUS, EMPTY_ELIGBILITY } from "../../../../../constants/constants";
import { getVisitServiceEligibilityStatus } from "../../../../../redux/serviceProvidersTab/requestsTab/actions"
import styles from "./styles";
import { Spinner } from "../../../../../components/Base/Preloader/Preloader";
import { isAPIFetching } from "../../../../../utils/AppAPIUtils";
import { setValueBasedOnWidth } from "../../../../../utils/deviceDimensions";
class EligibilityStatus extends Component {
  componentDidMount = () => {
    if (
      this.props.VisitServiceDetails &&
      !this.props.VisitServiceEligibilityStatus
    ) {
      let data = {
        patientId: this.props.VisitServiceDetails.patientId,
        serviceRequestId: this.props.VisitServiceDetails.serviceRequestId,
        serviceProviderId: this.props.VisitServiceDetails.serviceProviderId
      };
      this.props.getVisitServiceEligibilityStatus(data);
    }
  };

  render() {
    let eligibilityComponent = null;
    if (this.props.VisitServiceDetails && this.props.VisitServiceElibilityStatus) {
      eligibilityComponent = Object.keys(ELIBILITY_STATUS).map(item => {
        return (
          <View style={styles.cardContainer}>
            <Text style={styles.label}>{ELIBILITY_STATUS[item]}</Text>
            <Text style={styles.value}>
              {item === "amount" ? "$" : ""}
              {this.props.VisitServiceElibilityStatus[item]===true?'Yes':this.props.VisitServiceElibilityStatus[item]===false?'No':this.props.VisitServiceElibilityStatus[item]}
              {item === "benefitPercent" ? "%" : ""}
            </Text>
          </View>
        );
      });
    }else{
      return (
          <Text style={[styles.label,{textAlign:'center', marginVertical: setValueBasedOnWidth(20),
        marginHorizontal: setValueBasedOnWidth(10)}]}>{EMPTY_ELIGBILITY}</Text>        
      );
    }
    let isLoading = isAPIFetching(this.props.eligibilityAPIStatus)
    if(isLoading) return <View style={styles.center}><Spinner /></View>
    return (
        <ScrollView style={styles.container}>
        {eligibilityComponent}
        </ScrollView>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getVisitServiceEligibilityStatus: data =>
      dispatch(getVisitServiceEligibilityStatus(data))
  };
};
function mapStateToProps(state) {
  let serviceProvidersTabState = state.serviceProvidersTabState;
  return {
    eligibilityAPIStatus: serviceProvidersTabState && state.serviceProvidersTabState.requestsState.eligibilityAPIStatus,
    VisitServiceDetails:  state.visitSelectionState && state.visitSelectionState.VisitServiceDetailsState.VisitServiceDetails,
    VisitServiceElibilityStatus: serviceProvidersTabState && state.serviceProvidersTabState.requestsState.VisitServiceElibilityStatus
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EligibilityStatus);
