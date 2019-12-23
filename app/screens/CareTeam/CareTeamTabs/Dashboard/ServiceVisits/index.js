import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CoreoScrollView } from '../../../../../components';
import { request_cancelled, visits_lowTask,  in_visits, visits_overdueReverse } from '../../../../../assets/images';
import styles from './styles';
import {goToServiceVisitDashboardDetail, getServiceVisitCount} from '../../../../../redux/careTeam/Dashboard/actions';
import {getCareTeamDefaultDates, getFormatedDate, getTimeZoneOffset} from '../../../../../utils/momentUtil';
import QuickViewCard from '../../Components/QuickViewCard';
import { OverlayLoaderWrapper } from '../../../../../components/Base/Preloader/Preloader';
import { isAPIFetching } from '../../../../../utils/AppAPIUtils';
import { SERVICE_VISITS } from '..';

class ServiceVisits extends Component {
    IS_COMPONENT_MOUNTED = false
    constructor(props){ 
        super(props)
        const {startDate, endDate} = getCareTeamDefaultDates()
        this.state = {
            data: {
                "careTeamId": this.props.careTeamId,
                fromDate: this.props.fromDate ? this.props.fromDate : getFormatedDate(startDate, "MM/DD/YYYY"),
                toDate: this.props.toDate ? this.props.toDate : getFormatedDate(endDate, "MM/DD/YYYY"),
                "status": [
                  
                ],
                "serviceTypeIds": [
                  
                ],
                "sortName": "ModifiedDate",
                "sortOrder": "asc",
                "statusName": "",
                "pageNumber": 0,
                "pageSize": 0,
                "offset": getTimeZoneOffset()
              }
        }
    }

    handleTabFocus = () => {
        global.selectedCareTeamTab = SERVICE_VISITS
        if(this.IS_COMPONENT_MOUNTED) {
            this.props.getServiceVisitCount(this.state.data)
        }
        this.IS_COMPONENT_MOUNTED = true
    }

    componentDidMount(){
        this.props.getServiceVisitCount(this.state.data)
        this.props.navigation.addListener('didFocus', (route) => {
            this.handleTabFocus()
        });
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.fromDate !== this.props.fromDate || nextProps.toDate !== this.props.toDate){
            let tempData = this.state.data;
            tempData.fromDate = nextProps.fromDate;
            tempData.toDate = nextProps.toDate;
            this.setState({
                data: tempData
            })
            this.props.getServiceVisitCount(this.state.data)
        }
    }

    renderSwitch(param) {
        switch(param.toLowerCase()) {
            case 'in total in the network':
            return in_visits;
          case 'cancelled in the period':
            return request_cancelled;
          case 'with low task completion':
            return visits_lowTask;
          case 'overdue in the period':
            return visits_overdueReverse;
          default:
            return in_visits;
        }
      }

    render() {
        let count = this.props.serviceVisitCount && this.props.serviceVisitCount.map((servicevisit) => {
            return (
                <QuickViewCard
                    onPress={() => this.props.goToServiceVisitDashboardDetail(servicevisit)}
                    source={this.renderSwitch(servicevisit.label)}
                    totalCount={servicevisit.totalCount}
                    subText={servicevisit.subText}
                    label={servicevisit.label}
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
       serviceVisitCount: state.careTeamState.dashboardState.serviceVisitCount,
       fromDate: state.careTeamState.dashboardState.fromDate,
       toDate: state.careTeamState.dashboardState.toDate,
       careTeamId: state.authState.userState.careTeamId,
       isLoading: state.careTeamState.dashboardState.isLoading
    };
};

function mapDispatchToProps(dispatch){
  return {
      goToServiceVisitDashboardDetail: (data) => dispatch(goToServiceVisitDashboardDetail(data)),
      getServiceVisitCount: (data) => dispatch(getServiceVisitCount(data)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ServiceVisits);