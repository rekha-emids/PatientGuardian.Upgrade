import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CoreoScrollView } from '../../../../../components';
import {in_total, request_InTotal,
        request_cancelled,
        request_open,
        need_approve,
    } from '../../../../../assets/images';
import styles from './styles';
import {goToServiceRequestDashboardDetail, getServiceRequestCount} from '../../../../../redux/careTeam/Dashboard/actions';
import { getCareTeamDefaultDates, getTimeZoneOffset} from '../../../../../utils/momentUtil';
import QuickViewCard from '../../Components/QuickViewCard';
import { OverlayLoaderWrapper } from '../../../../../components/Base/Preloader/Preloader';
import { isAPIFetching } from '../../../../../utils/AppAPIUtils';
import { SERVICE_REQUESTS } from '..';

class ServiceRequests extends Component {
    IS_COMPONENT_MOUNTED = false
    constructor(props){
        super(props)
        const {startDate, endDate} = getCareTeamDefaultDates()
        this.state = {
            data: {
                "careTeamId": this.props.careTeamId,
                fromDate: this.props.fromDate ? this.props.fromDate : startDate,
                toDate: this.props.toDate ? this.props.toDate : endDate,
                "offset": getTimeZoneOffset()
            }
        }
    }

    handleTabFocus = () => {
        global.selectedCareTeamTab = SERVICE_REQUESTS
        if(this.IS_COMPONENT_MOUNTED){
            this.props.getServiceRequestCount(this.state.data)
        }
        this.IS_COMPONENT_MOUNTED = true
    }

    componentDidMount(){
        this.props.getServiceRequestCount(this.state.data)
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
            this.props.getServiceRequestCount(this.state.data)
        }
    }

    renderSwitch(param) {
        switch(param) {
            case 'In total In The Period':
            return request_InTotal;
            case 'Cancelled In The Period':
            return request_cancelled;
            case 'With Open Status':
            return request_open;
            case 'Needing Approval':
            return need_approve;
          default:
            return in_total;
        }
      }

    render() {
        let count = this.props.serviceRequestCount && this.props.serviceRequestCount.map((serviceRequest) => {
            return (
                <QuickViewCard
                    onPress={() => this.props.goToServiceRequestDashboardDetail(serviceRequest)}
                    source={this.renderSwitch(serviceRequest.label)}
                    totalCount={serviceRequest.totalCount}
                    subText={serviceRequest.subText}
                    label={serviceRequest.label}
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
        serviceRequestCount: state.careTeamState.dashboardState.serviceRequestCount,
        fromDate: state.careTeamState.dashboardState.fromDate,
        toDate: state.careTeamState.dashboardState.toDate,
        careTeamId: state.authState.userState.careTeamId,
        isLoading: state.careTeamState.dashboardState.isLoading

    };
};

function mapDispatchToProps(dispatch){
  return {
      goToServiceRequestDashboardDetail: (data) => dispatch(goToServiceRequestDashboardDetail(data)),
      getServiceRequestCount: (data) => dispatch(getServiceRequestCount(data)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ServiceRequests);