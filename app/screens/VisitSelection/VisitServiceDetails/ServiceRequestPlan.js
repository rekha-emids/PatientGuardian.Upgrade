import React, {Component} from 'react';
import {connect} from 'react-redux';
import { TabNavigator } from 'react-navigation';
import { THEME_PRIMARY_COLOR, INACTIVE_TINT_COLOR } from '../../../constants/theme';
import ServiceScheduleDetails from './components/ServiceScheduleDetails';
import { getVisitServiceDetails, resetVisitServiceDetails, getFirstAndLastVisitOfRequest} from '../../../redux/visitSelection/VisitServiceDetails/actions';
import styles from './styles'
import { SafeView } from '../../../components/LevelOne';
import Navbar from '../../../components/LevelOne/Navbar';
import ServiceTypeDetails from './components/ServiceTypeDetails';
import MyProvider from './components/MyProvider/index'
import {_} from '../../../utils/validations'
import EligibilityStatus from './components/EligibilityStatus';
import { HIRED_STATUS } from '../../../constants/constants';
import { getUserIdAndType } from '../../../utils/userUtil';
export const REQUESTS = "Request"
export const MY_PLAN = " My Plan"
export const PROVIDER = "Provider"
export const ELIGIBILITY = "Eligibility"

const SCREENS = {
  [MY_PLAN]: { screen: ServiceScheduleDetails },
  [PROVIDER]: { screen: MyProvider }
}

const RenderComponent = (props) => {
  let Tabs = TabNavigator && TabNavigator(
  {
    ...props.serviceRequestId ? {[REQUESTS]: {screen: ServiceTypeDetails}} : {},
    ...SCREENS,
    ...(props.isHired && !props.isPlanVisit ?{[ELIGIBILITY]: {screen: EligibilityStatus}}:{})
  },
  {
    ...tabNavigantionProps,
    initialRouteName: props.isProvider ? PROVIDER : props.serviceRequestId ? REQUESTS : MY_PLAN

  }
);

  return <Tabs {...props} />
}


let tabNavigantionProps =  {
    ...TabNavigator.Presets.AndroidTopTabs,
    tabBarPosition: 'top',
    tabBarOptions: {
      activeTintColor: THEME_PRIMARY_COLOR,
      inactiveTintColor: INACTIVE_TINT_COLOR,
      style: styles.tabBarStyle,
      showIcon: false,
      activeTabStyle: styles.activeTabStyle,
      labelStyle: styles.labelStyle,
      indicatorStyle: styles.indicatorStyle,
      upperCaseLabel: false,
      scrollEnabled: true,
      allowFontScaling: false
    },
    animationEnabled: false,
    swipeEnabled: true,
    lazy: true
}
  
 class ServiceRequestPlan extends Component {
  componentDidMount() {

    const { navigation, serviceProviderId } = this.props
    const { serviceRequestId, patientId, isPlanVisit} = navigation.state.params

    this.props.getVisitServiceDetails(serviceRequestId, null, null, patientId, isPlanVisit);
    const requestObject = {
      patientId: getUserIdAndType().patientId,
      serviceProviderId,
      serviceRequestId: isPlanVisit ? 0 : serviceRequestId
    }

    this.props.getDates(requestObject)
  }
  
  componentWillUnmount(){
    this.props.resetVisitServiceDetails()
  }

    render(){
      const {VisitServiceDetails, navigation} = this.props
      const {statusId, isPlanVisit, isProvider, patientId, serviceRequestId} = navigation.state.params

      return (
        <SafeView>
            <Navbar title={"View Requests"} showEmptyAdd />
             <RenderComponent screenProps={{navigation, isPlanVisit, patientId}} isProvider= {isProvider}
             isHired = {VisitServiceDetails && VisitServiceDetails.statusId === HIRED_STATUS || statusId === HIRED_STATUS}
             isPlanVisit={isPlanVisit}
             serviceRequestId={serviceRequestId}
             /> 
      </SafeView>
      )
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      getVisitServiceDetails: (data, onSuccess, onFail, patientId, isPlanVisit) => dispatch(getVisitServiceDetails(data, onSuccess, onFail, patientId, isPlanVisit)),
      resetVisitServiceDetails: () => dispatch(resetVisitServiceDetails()),
      getDates: (data) => dispatch(getFirstAndLastVisitOfRequest(data))
    }
  }
  function mapStateToProps(state){
    return {
      getVisitServiceDetailsStatus: state.visitSelectionState.VisitServiceDetailsState.getServiceDetailsStatus,
      VisitServiceDetails: state.visitSelectionState.VisitServiceDetailsState.VisitServiceDetails,
      cancelServiceRequestStatus: state.visitSelectionState.VisitServiceDetailsState.cancelServiceRequestStatus,
      serviceProviderId: state.visitSelectionState.VisitServiceDetailsState.serviceProviderId
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(ServiceRequestPlan)
