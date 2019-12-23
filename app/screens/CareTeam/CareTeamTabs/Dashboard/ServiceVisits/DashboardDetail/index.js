import React, { Component } from "react";
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
    CoreoText,
    CoreoOpacityButton,
    CoreoImage
} from '../../../../../../components';
import { setValueBasedOnHeight } from '../../../../../../utils/deviceDimensions';
import styles from './styles';
import { goToServiceVisitItemDetail, getServiceVisitDashboardDetail } from '../../../../../../redux/careTeam/Dashboard/actions';
import {
    in_visitsReverse,
    request_cancelledReverse,
    visits_lowTaskReverse,
    visits_overdue
} from '../../../../../../assets/images';
import CardList from '../../../Components/CardList';
import SortFilterBar from '../../../Components/SortFilterBar';
import TopCount from '../../../Components/TopCount';
import ServiceRequestFilter from "../../../../../VisitSelection/VisitServiceList/ServiceRequestFilter";
import { ServiceVisitFiltersData, ServiceVisitFiltersDataWithoutStatus } from "../../../../../../data/FiltersData";
import { getCareTeamDefaultDates, getTimeZoneOffset } from '../../../../../../utils/momentUtil';
import { getArrayFromNormalizedData } from "../../../../../../utils/appUtils";
import { ListScrollerAPIWrapper, SafeView, Navbar } from "../../../../../../components/LevelOne";
import { INIT, REFRESH } from "../../../../../../constants/AppAPIConstants";
import { SearchBar } from "../../../../../ServiceProvidersTab/Browse";
import { CARETEAM_SERVICE_VISITS, LOW_TASK, ALL_TEXT, CANCEL, OVERDUE, MODIFIEDDATE, SORT_ORDER } from "../../../../../../constants/constants";

const initialState = {
    "status": [],
    "careTeamId": 0,
    "serviceTypeIds": [],
    "statusName": null,
    "sortOrder": SORT_ORDER.DESC,
    "sortName": MODIFIEDDATE,
    "searchText": "",
    "fromDate": getCareTeamDefaultDates().startDate,
    "toDate": getCareTeamDefaultDates().endDate,
    "lat": 0,
    "lon": 0,
    "tabFilter":null
}

class CareTeamDashboardDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSortOpen: false,
            isFilterOpen: false,
            isNewest: true,
            data: this.getInitialData(),
            filterComponentKey: 0
        };
    };

    getSortOrderAndName = () => {
        const {label} = this.props.selectedCount || {}
        let statusName = ALL_TEXT
        let sortOrder = SORT_ORDER.DESC
        let sortName = MODIFIEDDATE
        if(label && label.toLowerCase() === CARETEAM_SERVICE_VISITS.WITH_LOW_TASK_COMPLETION){
            statusName = LOW_TASK
            sortOrder = SORT_ORDER.ASC
            sortName = LOW_TASK
        }else if(label && label.toLowerCase() === CARETEAM_SERVICE_VISITS.CANCELLED_IN_THE_PERIOD){
            statusName = CANCEL
        }else if(label && label.toLowerCase() === CARETEAM_SERVICE_VISITS.OVERDUE_IN_THE_PERIOD){
            statusName = OVERDUE
        }
        return {statusName, sortOrder, sortName}
    }


    getInitialData = () => {
        const { startDate, endDate } = getCareTeamDefaultDates()
        const {statusName, sortOrder, sortName} = this.getSortOrderAndName()
        return {
            ...initialState,
            "careTeamId": this.props.careTeamId,
            fromDate: this.props.fromDate ? this.props.fromDate : startDate,
            toDate:  this.props.toDate ? this.props.toDate : endDate,
            "tabFilter": this.props.selectedCount && this.props.selectedCount.statusName || "null",
            sortName,
            sortOrder,
            statusName
        }
    }


    onRefresh = () => {
        this.setState({data: this.getInitialData(), filterComponentKey: this.state.filterComponentKey + 1}, () => {
            this.apiCall({...this.state.data, pageNumber: 1, pageSize: 10}, REFRESH)
        })
    }


    apiCall = (requestObject, requestType = INIT) => {
        this.props.getServiceVisitDashboardDetail(requestObject, requestType);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.fromDate !== this.props.fromDate || nextProps.toDate !== this.props.toDate) {
            let tempData = this.state.data;
            tempData.fromDate = nextProps.fromDate;
            tempData.toDate = nextProps.toDate;
            this.setState({
                data: tempData
            }, () => {
                this.apiCall({ ...this.state.data, pageSize: 10, pageNumber: 1 })
            })
        }
    }

    onApplyFilter = (data) => {
        let filteredServiceCategories = getArrayFromNormalizedData(data.selectedServiceCategories)
        let filteredStatus = getArrayFromNormalizedData(data.serviceStatusData)
        const {sortOrder, sortName} = this.getSortOrderAndName()
        let requestObject = {
            ...this.state.data,
            serviceTypeIds: filteredServiceCategories,
            status: filteredStatus,
            statusName: null,
            sortOrder,
            sortName,
            offset: getTimeZoneOffset()
        }

        delete requestObject['tabFilter']
        delete requestObject['lat']
        delete requestObject['lon']

        this.setState({ data: requestObject, isFilterOpen: false }, () => {
            this.apiCall({ ...requestObject, pageSize: 10, pageNumber: 1 })
        })
    }

    renderSwitch(param) {
        switch (param && param.toLowerCase()) {
            case CARETEAM_SERVICE_VISITS.IN_TOTAL_IN_THE_NETWORK :
                return in_visitsReverse;
            case CARETEAM_SERVICE_VISITS.CANCELLED_IN_THE_PERIOD:
                return request_cancelledReverse;
            case CARETEAM_SERVICE_VISITS.WITH_LOW_TASK_COMPLETION:
                return visits_lowTaskReverse;
            case CARETEAM_SERVICE_VISITS.OVERDUE_IN_THE_PERIOD:
                return visits_overdue;
            default:
                return in_visitsReverse;
        }
    }

    onResetFilter = () => {
        const {statusName, sortOrder, sortName} = this.getSortOrderAndName()
        let requestObject = {
            ...initialState, 
            "requestType": "init",
            "careTeamId": this.props.careTeamId,
            "statusName": statusName,
            "tabFilter": this.props.selectedCount.statusName || "null",
            sortOrder,
            sortName
        }
        this.setState({ data: requestObject, isFilterOpen: false },()=>{
            this.apiCall({ ...requestObject, pageSize: 10, pageNumber: 1 })
        })
       
    }
    resetSearch = () => {
        this.setState({data: {...this.state.data, searchText: ""}}, () => {
            this.apiCall({...this.state.data, pageSize: 10, pageNumber: 1})
        })
    }
    onSearch = () => {
        this.apiCall({...this.state.data, pageSize: 10, pageNumber: 1})
    }

    onInactivity = (onSuccess) => {
        this.setState({isFilterOpen: false}, onSuccess && onSuccess())
    }

    render() {
        let listItems = this.props.serviceVisitDashboardDetail && this.props.serviceVisitDashboardDetail.map((individual) => {
            return {
                name: individual.serviceRequestVisitNumber,
                source: individual.thumbNail,
                ...individual
            }
        });
        let count = this.props.serviceVisitDashboardDetail ? this.props.serviceVisitDashboardDetail.length : this.props.serviceVisitDashboardDetail
        let filterData = ServiceVisitFiltersData
        if(this.props.selectedCount && this.props.selectedCount.label.toLowerCase() === CARETEAM_SERVICE_VISITS.CANCELLED_IN_THE_PERIOD || this.props.selectedCount && this.props.selectedCount.label.toLowerCase() === CARETEAM_SERVICE_VISITS.OVERDUE_IN_THE_PERIOD) {
            filterData = ServiceVisitFiltersDataWithoutStatus
        }
        return (
            <SafeView>
            <View style={{ flex: 1 }}>
                <Navbar title={"Dashboard"} showEmptyAdd />
                <View style={{marginVertical: setValueBasedOnHeight(5)}}>
                    <SearchBar
                        onChangeText={(text) => {this.setState({data: {...this.state.data, searchText: text}})}}
                        resetSearch={this.resetSearch}
                        onSearch={this.onSearch}
                        searchText={this.state.data.searchText}
                        placeholder="Enter keyword for global search"
                        onSubmitEditing={this.onSearch}
                    />
                </View>
                <SortFilterBar
                    toggleSort={() => this.setState({ isSortOpen: true })}
                    toggleFilter={() => this.setState({ isFilterOpen: true })}
                />
                <TopCount
                    totalCount={this.props.selectedCount && this.props.selectedCount.totalCount}
                    subText={this.props.selectedCount && this.props.selectedCount.subText}
                    label={this.props.selectedCount && this.props.selectedCount.label}
                    source={this.renderSwitch(this.props.selectedCount? this.props.selectedCount.label: null)}
                />
                <View style={styles.listView}>
                    <ListScrollerAPIWrapper
                        networkCallStatus={this.props.loadingStatus}
                        data={listItems}
                        renderComponent={CardList}
                        isPaginationEnabled={true}
                        apiSaga={this.apiCall}
                        requestProps={this.state.data}
                        onPress={this.props.goToServiceVisitItemDetail}
                        onRefresh={this.onRefresh}
                        canAutomaticRefresh={false}
                    />
                </View>
                <ServiceRequestFilter
                    isFilterOpen={this.state.isFilterOpen}
                    onClose={() => this.setState({ isFilterOpen: false })}
                    onApplyFilter={this.onApplyFilter}
                    filters={filterData}
                    onResetFilter={this.onResetFilter}
                    id={this.state.filterComponentKey}
                    onInactivity={this.onInactivity}
                />
            </View>
            </SafeView>
        )
    }
}

function mapStateToProps(state) {
    let careTeamState = state.careTeamState;
    return {
        selectedCount: careTeamState && state.careTeamState.dashboardState.selectedCount,
        serviceVisitDashboardDetail: careTeamState && state.careTeamState.dashboardState.serviceVisitDashboardDetail,
        fromDate: careTeamState && state.careTeamState.dashboardState.fromDate,
        toDate: careTeamState && state.careTeamState.dashboardState.toDate,
        careTeamId: state.authState && state.authState.userState.careTeamId,
        loadingStatus: careTeamState && state.careTeamState.dashboardState.isLoading
    };
};

function mapDispatchToProps(dispatch) {
    return {
        goToSPProfile: (params) => dispatch(navigateToScreenMainStack(PATH.SERVICE_PROVIDER_PROFILE, params)),
        goToServiceVisitItemDetail: (data) => dispatch(goToServiceVisitItemDetail(data)),
        getServiceVisitDashboardDetail: (data, requestType) => dispatch(getServiceVisitDashboardDetail(data, requestType)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CareTeamDashboardDetail);