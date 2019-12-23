import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CoreoScrollView } from '../../../../../components';
import {sp_inTotal, in_visits, sp_LowRate, sp_feedback, visits_lowTask} from '../../../../../assets/images';
import styles from './styles';
import {goToServiceProviderDashboardDetail, getServiceProviderCount} from '../../../../../redux/careTeam/Dashboard/actions';
import { getCareTeamDefaultDates, getTimeZoneOffset} from '../../../../../utils/momentUtil';
import QuickViewCard from '../../Components/QuickViewCard';
import { OverlayLoaderWrapper } from '../../../../../components/Base/Preloader/Preloader';
import { isAPIFetching } from '../../../../../utils/AppAPIUtils';
import { SERVICE_PROVIDERS } from '..';
import { CARETEAM_SERVICE_PROVIDERS } from '../../../../../constants/constants';

class ServiceProviders extends Component {
    IS_COMPONENT_MOUNTED = false
    constructor(props){
        super(props)
        const {startDate, endDate} = getCareTeamDefaultDates()
        this.state = {
            data: {
                careTeamId: this.props.careTeamId,
                fromDate: this.props.fromDate ? this.props.fromDate : startDate,
                toDate: this.props.toDate ? this.props.toDate : endDate,
                "offset": getTimeZoneOffset()
            }
        }
    }

    handleTabFocus = () => {
        if(this.IS_COMPONENT_MOUNTED){
            this.props.getServiceProviderCount(this.state.data)
        }
        global.selectedCareTeamTab = SERVICE_PROVIDERS
        this.IS_COMPONENT_MOUNTED = true
    }

    componentDidMount(){
        this.props.navigation.addListener('didFocus', (route) => {
            this.handleTabFocus()
        });
        this.props.getServiceProviderCount(this.state.data)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.fromDate !== this.props.fromDate || nextProps.toDate !== this.props.toDate){
            let tempData = this.state.data;
            tempData.fromDate = nextProps.fromDate;
            tempData.toDate = nextProps.toDate;
            this.setState({
                data: tempData
            })
            this.props.getServiceProviderCount(this.state.data)
        }
    }

    renderSwitch(param) {
        switch(param) {
            case CARETEAM_SERVICE_PROVIDERS.IN_TOTAL_IN_THE_NETWORK:
            return sp_inTotal;
        case CARETEAM_SERVICE_PROVIDERS.WITH_LOW_RATINGS:
            return sp_LowRate;
        case 'With Feedback Alerts':
            return sp_feedback;
        case 'With Visits In The Period':
            return in_visits;
        case 'With Low Task Completion':
            return visits_lowTask;
        default:
            return sp_inTotal;
        }
    }

    render() {
        let count = this.props.serviceProviderCount && this.props.serviceProviderCount.map((serviceprovider) => {
            return (
                <QuickViewCard
                    onPress={() => this.props.goToServiceProviderDashboardDetail(serviceprovider)}
                    source={this.renderSwitch(serviceprovider.label)}
                    totalCount={serviceprovider.totalCount}
                    subText={serviceprovider.subText}
                    label={serviceprovider.label}
                />
            );
        });
        return (
            <OverlayLoaderWrapper isLoading={isAPIFetching(this.props.isLoading)}>
            <CoreoScrollView style={styles.tabData}>
                {count}
            </CoreoScrollView>
            </OverlayLoaderWrapper>
        );
    }
}

function mapStateToProps(state) {
    return {
       serviceProviderCount: state.careTeamState.dashboardState.serviceProviderCount,
       fromDate: state.careTeamState.dashboardState.fromDate,
       toDate: state.careTeamState.dashboardState.toDate,
       careTeamId: state.authState.userState.careTeamId,
       isLoading: state.careTeamState.dashboardState.isLoading

    };
};

function mapDispatchToProps(dispatch){
  return {
      goToServiceProviderDashboardDetail: (data) => dispatch(goToServiceProviderDashboardDetail(data)),
      getServiceProviderCount: (data) => dispatch(getServiceProviderCount(data)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ServiceProviders);