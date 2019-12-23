import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {formatDateMMDDYYYY} from '../../../../utils/momentUtil';
import {
    CoreoText
} from '../../../../components';
import { onLogout } from '../../../../redux/auth/Logout/actions'; 
import {ScreenCover, NavbarWithImage, ModalUserAgreement} from '../../../../components';
import { getUserInfo, updateEula, getEulaContent } from '../../../../redux/auth/UserAgreement/actions';
import { setValueBasedOnWidth } from '../../../../utils/deviceDimensions';
import {setFromDate, setToDate, getServiceVisitCount, getServiceRequestCount, getServiceProviderCount, getIndividualCount} from '../../../../redux/careTeam/Dashboard/actions';
import styles from './styles';

import Individuals from './Individuals';
import ServiceProviders from './ServiceProviders';
import ServiceRequests from './ServiceRequests';
import ServiceVisits from './ServiceVisits';

import { TabNavigator } from 'react-navigation';
import { THEME_PRIMARY_COLOR } from '../../../../constants/theme';
import {getMessageFallBackInterval} from '../../../../redux/asyncMessages/actions';
import { SafeView, Calendar } from '../../../../components/LevelOne';
import {
    updateTabNavigator
  } from '../../../../redux/dashboard/Dashboard/actions';
import { navigateToScreenMainStack } from '../../../../redux/navigation/actions';


export const INIDIVIDUALS = "Individuals"
export const SERVICE_PROVIDERS = "Service Providers"
export const SERVICE_REQUESTS = "Service Requests"
export const SERVICE_VISITS = "Service Visits"


const DashboardTabs = TabNavigator && TabNavigator(
    {
      [INIDIVIDUALS]: { screen: Individuals },
      [SERVICE_PROVIDERS]: { screen: ServiceProviders },
      [SERVICE_REQUESTS]: { screen: ServiceRequests },
      [SERVICE_VISITS]: { screen: ServiceVisits }
    },
    {
        ...TabNavigator.Presets.AndroidTopTabs,
      tabBarPosition: 'top',
      tabBarOptions: {
        activeTintColor: THEME_PRIMARY_COLOR,
        inactiveTintColor: "#8c8c8c",
        style: styles.tabBarStyle,
        showIcon : false,
        activeTabStyle : styles.activeTabStyle,
        labelStyle: styles.labelStyle,
        indicatorStyle: styles.indicatorStyle,
        upperCaseLabel: false,
        scrollEnabled: true,
        allowFontScaling:false
      },
      swipeEnabled: false,
      lazy: true
    }
  );
  

class Dashboard extends Component {
    static navigationOptions = () => {
        return {
          tabBarOnPress({ navigation, defaultHandler }) {
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
        let date = new Date()
        let fromDate = new Date(date.setMonth(date.getMonth()-3))
        this.state = {
            fromDate,
            toDate:new Date(),
            isOpen: props.isEulaUpdated
        };
    };

    componentWillReceiveProps(nextProps){
        if(this.props.isEulaUpdated !== nextProps.isEulaUpdated){
            this.setState({isOpen: nextProps.isEulaUpdated})
        }
    }

    handleTabFocus = () => {
        const {individualCountRequestObject, serviceProviderCountRequestObject, serviceRequestCountRequestObject, serviceVisitsCountRequestObject} = this.props
        if(this.IS_COMPONENT_MOUNTED){
          switch(global.selectedCareTeamTab){
              case INIDIVIDUALS:
                individualCountRequestObject && this.props.getIndividualCount(individualCountRequestObject)
                return
              case SERVICE_PROVIDERS:
              serviceProviderCountRequestObject && this.props.getServiceProviderCount(serviceProviderCountRequestObject)
                return
              case SERVICE_REQUESTS:
                 serviceRequestCountRequestObject && this.props.getServiceRequestCount(serviceRequestCountRequestObject)
                return
              case SERVICE_VISITS:
                 serviceVisitsCountRequestObject && this.props.getServiceVisitCount(serviceVisitsCountRequestObject)
                return
          }
        }
      };

    componentDidMount () {
        this.props.getUserInfo()
        this.props.getMessageFallBackInterval();
        this.props.updateTabNavigator(this.props.navigation);
        this.props.getEulaContent()
        this.IS_COMPONENT_MOUNTED = true
      }

  onBtnPress = () =>{
    this.props.onLogout();
  }
  
  getFromDateDefaultValues = () => {
    const {toDate} = this.state
    if(toDate){
        return {
            maxDate: toDate
        }
    }
    return {
        maxDate: new Date()
    }
}

getToDateDefaultValues = () => {
    const {fromDate} = this.state
    if(fromDate){
        return {
            minDate: fromDate,
            // maximumDate: new Date()
        }
    }
    return {
        minDate: new Date(1901, 0,1),
        // maximumDate: new Date()
    }
}
onClickOk = () => {
    this.setState({isOpen: false})
    this.props.onClickOk()
  }

onChangeFromDate = (date) => {
    this.setState({fromDate: date}, () => {
        this.props.setFromDate(formatDateMMDDYYYY(date, "YYYY-MM-DD"))
    })
}

onChangeToDate = (date) => {
    this.setState({toDate: date}, () => {
        this.props.setToDate(formatDateMMDDYYYY(date, "YYYY-MM-DD"))
    })
}

onPressTodayIcon = () => {
    this.onChangeFromDate(new Date())
    this.onChangeToDate(new Date())
}

  render() {
      let date = new Date()
      let fromDate = new Date(date.setMonth(date.getMonth()-3))
    return (
    <SafeView>
      <ScreenCover>
        <View style={styles.dashboardView}>
        <NavbarWithImage showImage={false} title="Dashboard" showBellIcon={false} onbelliconPressed={this.handleBelliconPressed} />
        <ModalUserAgreement
            visible={this.state.isOpen}
            onPress={this.onClickOk}
            eulaContent={this.props.eulaContent}
            buttonText={"Agree"}
          />
          <View style={styles.mainContainer}>
            <View style={styles.dateStyle}>
                <View style={{flexDirection: 'row', alignItems: "center"}}>
                    <View style={styles.datePartStyle}>
                        <CoreoText style={styles.fromToStyle}>From</CoreoText>
                        <Calendar
                            date={this.state.fromDate}
                            onDateChange={this.onChangeFromDate}
                            style={{width: setValueBasedOnWidth(190/2)}}
                            {...this.getFromDateDefaultValues()}
                            label={null}
                            dateText={styles.dateFont}
                        />
                    </View>
                    <View style={{ justifyContent: 'center'}}>
                        <CoreoText style={styles.dateSeperator}>|</CoreoText>
                    </View>
                    <View style={styles.datePartStyle}>
                        <CoreoText style={styles.fromToStyle}>To</CoreoText>
                        <Calendar
                            date={this.state.toDate}
                            style={{width: setValueBasedOnWidth(190/2)}}
                            {...this.getToDateDefaultValues()}
                            label={null}
                            onDateChange={this.onChangeToDate}
                            dateText={styles.dateFont}
                        />
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={this.onPressTodayIcon}>
                    <CoreoText style={styles.todayIcon}>Today</CoreoText>
                </TouchableOpacity>
            </View>
            <DashboardTabs />
        </View>
      </ScreenCover>
      </SafeView>
    );
  }
}

function mapStateToProps (state) {
    return {
      isEulaUpdated: state.authState.userAgreementState.isEulaUpdated,
      eulaContent: state.authState.userAgreementState.eulaContent,
      individualCountRequestObject:state.careTeamState.dashboardState.individualCountRequestObject,
      serviceProviderCountRequestObject:  state.careTeamState.dashboardState.serviceProviderCountRequestObject,
      serviceVisitsCountRequestObject: state.careTeamState.dashboardState.serviceVisitsCountRequestObject,
      serviceRequestCountRequestObject: state.careTeamState.dashboardState.serviceRequestCountRequestObject
    }
  }

function mapDispatchToProps(dispatch) {
  return{
    getUserInfo: () => dispatch(getUserInfo()),
    navigateToScreenMainStack: (url) => dispatch(navigateToScreenMainStack(url)),
    updateTabNavigator:(navigation)=> dispatch(updateTabNavigator(navigation)),
    onLogout:()=>dispatch(onLogout()),
    setFromDate:(data)=>dispatch(setFromDate(data)),
    onClickOk: () => dispatch(updateEula()),
    setToDate:(data)=>dispatch(setToDate(data)),
    getMessageFallBackInterval: () => dispatch(getMessageFallBackInterval()),
    getEulaContent: () => dispatch(getEulaContent()),
    getServiceVisitCount: (data) => dispatch(getServiceVisitCount(data)),
    getServiceRequestCount: (data) => dispatch(getServiceRequestCount(data)),
    getServiceProviderCount: (data) => dispatch(getServiceProviderCount(data)),
    getIndividualCount: (data) => dispatch(getIndividualCount(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);