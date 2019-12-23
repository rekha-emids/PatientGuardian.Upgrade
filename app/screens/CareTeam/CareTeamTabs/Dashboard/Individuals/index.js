import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  CoreoScrollView } from '../../../../../components';
import {in_total, in_visits, in_Cradit, sp_feedback} from '../../../../../assets/images';
import styles from './styles';
import {goToDashboardDetail, getIndividualCount} from '../../../../../redux/careTeam/Dashboard/actions';
import {getCareTeamDefaultDates, getTimeZoneOffset} from '../../../../../utils/momentUtil';
import QuickViewCard from '../../Components/QuickViewCard';
import {getLookupDetails} from '../../../../../redux/dashboard/Dashboard/actions'
import { INDIVIDUAL_LABELS } from '../../../../../constants/constants';
import { isAPIFetching } from '../../../../../utils/AppAPIUtils';
import { OverlayLoaderWrapper } from '../../../../../components/Base/Preloader/Preloader';
import { INIDIVIDUALS } from '..';


class Individuals extends Component {
    IS_COMPONENT_MOUNTED = false
    constructor(props){
        super(props)
        const {startDate, endDate} = getCareTeamDefaultDates()
        this.state = {
            data: {
                "memberContractId": 0,
                "cohorts": [0],
                "serviceProviders": [],
                "clinicalConditions": [0],
                "contracts": [0],
                "minimumAge": 0,
                "maximumAge": 0,
                "gender": 0,
                "rating": 0,
                "fromDate": this.props.fromDate ? this.props.fromDate : startDate,
                "toDate": this.props.toDate ? this.props.toDate : endDate,
                "statusName": "",
                "pageNumber": 0,
                "pageSize": 0,
                "sortName": "ModifiedDate",
                "sortOrder": "asc",
                "careTeamId": this.props.careTeamId,
                "offset": getTimeZoneOffset()
              }
        }
    }

    handleTabFocus = () => {
        global.selectedCareTeamTab = INIDIVIDUALS
        if(this.IS_COMPONENT_MOUNTED){
            this.props.getIndividualCount(this.state.data);
        }
        this.IS_COMPONENT_MOUNTED = true
    }

    componentDidMount(){
        this.props.getIndividualCount(this.state.data);
        this.props.getLookupDetails()
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
            this.props.getIndividualCount(this.state.data);
        }
    }
    
    
    renderSwitch(param) {
        switch(param) {
            case INDIVIDUAL_LABELS.IN_TOTAL_IN_THE_PERIOD:
                return in_total;
            case INDIVIDUAL_LABELS.WITH_NO_INVALID_CREDIT_CARD:
                return in_Cradit;
            case INDIVIDUAL_LABELS.WITH_VISITS_IN_THE_PERIOD:
                return in_visits;
            case INDIVIDUAL_LABELS.WITH_FEEDBACK_ALERTS:
                return sp_feedback
            default:
                return in_total;
        }
      }

    render() {
        let count = this.props.individualCount && this.props.individualCount.map((individual) => {
            return (
                <QuickViewCard
                    onPress={() => this.props.goToDashboardDetail(individual)}
                    source={this.renderSwitch(individual.label)}
                    totalCount={individual.totalCount}
                    subText={individual.subText}
                    label={individual.label}
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
        individualCount: state.careTeamState.dashboardState.individualCount,
        fromDate: state.careTeamState.dashboardState.fromDate,
        toDate: state.careTeamState.dashboardState.toDate,
        careTeamId: state.authState.userState.careTeamId,
        isLoading: state.careTeamState.dashboardState.isLoading
    };
};

function mapDispatchToProps(dispatch){
  return {
      goToDashboardDetail: (data) => dispatch(goToDashboardDetail(data)),
      getIndividualCount: (data) => dispatch(getIndividualCount(data)),
      getLookupDetails: () => dispatch(getLookupDetails())

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Individuals);