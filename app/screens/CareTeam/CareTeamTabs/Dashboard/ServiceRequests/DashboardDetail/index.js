import React, { Component } from "react";
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
    CoreoText,
    CoreoOpacityButton
} from '../../../../../../components';
import { setValueBasedOnHeight } from '../../../../../../utils/deviceDimensions';
import styles from './styles';
import { goToServiceRequestItemDetail, getServiceRequestDashboardDetail } from '../../../../../../redux/careTeam/Dashboard/actions';
import {
     in_totalReverse,
    request_cancelledReverse,
    request_InTotalReverse,
    request_openReverse,
    need_approveReverse
} from '../../../../../../assets/images';
import CardList from '../../../Components/CardList';
import SortFilterBar from '../../../Components/SortFilterBar';
import TopCount from '../../../Components/TopCount';
import ServiceRequestFilter from "../../../../../VisitSelection/VisitServiceList/ServiceRequestFilter";
import { ServiceRequestFiltersData, ServiceRequestFiltersWithApprovalData, ServiceRequestFiltersWithoutStatusData } from "../../../../../../data/FiltersData";
import { getArrayFromNormalizedData, caseInsensitiveComparer } from "../../../../../../utils/appUtils";
import {  getCareTeamDefaultDates, getTimeZoneOffset } from '../../../../../../utils/momentUtil';
import { PATH } from "../../../../../../routes";
import { navigateToScreenMainStack } from "../../../../../../redux/navigation/actions";
import { ListScrollerAPIWrapper, SafeView, Navbar } from "../../../../../../components/LevelOne";
import { INIT, REFRESH } from "../../../../../../constants/AppAPIConstants";
import { SearchBar } from "../../../../../ServiceProvidersTab/Browse";
import { CARETEAM_SERVICE_REQUESTS, NEED_APPROVAL, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "../../../../../../constants/constants";

const initialState = {
    "serviceTypeIds": [
    ],
    "status": [
    ],
    "approvalStatus": [
    ],
    "recurringPattern": 0,
    "careTeamId": 0,
    "statusFilterId": 0,
    "pageNumber": 1,
    "pageSize": 10,
    "statusName": null,
    "sortOrder": "asc",
    "sortName": "modifieddate",
    "city": "",
    "lat": 0,
    "lon": 0,
    "range": 0,
    "searchText": "",
    "stateName": "",
    "streetAddress": "",
    "tabFilter": null,
    "zip": 0,
    "fromDate": getCareTeamDefaultDates().startDate,
    "toDate": getCareTeamDefaultDates().endDate,
    offset: getTimeZoneOffset(),

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

    getInitialData = () => {
        const { startDate, endDate } = getCareTeamDefaultDates();
        const { selectedCount } = this.props;
        let fromDate = this.props.fromDate;
        let toDate = this.props.toDate;
        return {
            ...initialState,
            "careTeamId": this.props.careTeamId,
            fromDate: fromDate ? fromDate : startDate,
            toDate: toDate ? toDate : endDate,
            "tabFilter": selectedCount && selectedCount.statusName || "null",
        }
    }

    apiCall = (requestObject, requestType = INIT) => {
        this.props.getServiceRequestDashboardDetail(requestObject, requestType)
    }

    onRefresh = () => {
        this.setState({data: this.getInitialData(), filterComponentKey:this.state.filterComponentKey + 1}, () => {
            this.apiCall({...this.state.data, pageNumber: DEFAULT_PAGE_NUMBER, pageSize: DEFAULT_PAGE_SIZE}, REFRESH)
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.fromDate !== this.props.fromDate || nextProps.toDate !== this.props.toDate) {
            let tempData = this.state.data;
            tempData.fromDate = nextProps.fromDate;
            tempData.toDate = nextProps.toDate;
            this.setState({
                data: tempData
            }, () => {
                this.apiCall({ ...this.getInitialData(), pageSize: 10, pageNumber: 1 })
            })
        }
    }

    onApplyFilter = (data) => {
        let selectedCount = this.props.selectedCount;
        let label = selectedCount && selectedCount.label.toLowerCase()
        let filteredServiceCategories = getArrayFromNormalizedData(data.selectedServiceCategories)
        let filterStatusData =  getArrayFromNormalizedData(data.careTeamStatusData)
        let filterNeedingApprovalData = data.needingApprovalData
        let requestObject = {
            ...this.state.data,
            serviceTypeIds: filteredServiceCategories,
            status: label === CARETEAM_SERVICE_REQUESTS.NEEDING_APPROVAL ? [] : filterStatusData,
            approvalStatus: filterNeedingApprovalData,
            recurringPattern:data.recurringPattern
        }
        if(!caseInsensitiveComparer(this.props.selectedCount.statusName, NEED_APPROVAL)){
            delete requestObject['tabFilter']
            requestObject['approvalStatus'] = [];
        }
        this.setState({ data: requestObject }, () => {
            this.apiCall({ ...requestObject, pageSize: 10, pageNumber: 1 })
        })
    }
    onClickApprove = (id) => {
        const params = {
            serviceRequestId: id,
            requestObject: this.state.data
        }
        this.props.goToServiceRequestDetails(params)
    }
    onResetFilter = () => {
        let requestObject = {
            ...initialState, 
            "requestType": "init",
            "careTeamId": this.props.careTeamId,
            "statusName": this.props.selectedCount.statusName === "Invalid" || !this.props.selectedCount.statusName? null : this.props.selectedCount.statusName,
            "tabFilter": this.props.selectedCount.statusName || "null",
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

    renderSwitch(param) {
        switch (param) {
            case 'In total In The Period':
                return request_InTotalReverse;
            case 'Cancelled In The Period':
                return request_cancelledReverse;
            case 'With Open Status':
                return request_openReverse;
            case 'Needing Approval':
                return need_approveReverse;
            default:
                return in_totalReverse;
        }
    }

    onInactivity = (onSuccess) => {
        this.setState({isFilterOpen: false}, onSuccess && onSuccess())
    }

    render() {
        let listItems = this.props.serviceRequestDashboardDetail && this.props.serviceRequestDashboardDetail.map((individual) => {
            return {
                name: individual.serviceRequestNumber,
                source: individual.thumbNail,
                data: "",
                ...individual
            }
        });
        let count = this.props.serviceRequestDashboardDetail ? this.props.serviceRequestDashboardDetail.length : this.props.serviceRequestDashboardDetail
        let filters = ServiceRequestFiltersData
        let selectedCount = this.props.selectedCount;
        let label = selectedCount && selectedCount.label.toLowerCase()
        if(caseInsensitiveComparer(label, CARETEAM_SERVICE_REQUESTS.CANCELLED_IN_THE_PERIOD) || caseInsensitiveComparer(label, CARETEAM_SERVICE_REQUESTS.WITH_OPEN_STATUS)){
            filters = ServiceRequestFiltersWithoutStatusData
        }else if(label === CARETEAM_SERVICE_REQUESTS.NEEDING_APPROVAL){
            filters = ServiceRequestFiltersWithApprovalData
        }
        let selectedCountDetails = selectedCount || {}
        return (
            <SafeView>
            <View style={styles.flexArea}>
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
                        data={listItems}
                        renderComponent={CardList}
                        isPaginationEnabled={true}
                        apiSaga={this.apiCall}
                        requestProps={this.state.data}
                        onPress={this.props.goToServiceRequestItemDetail}
                        extraProps={this.onClickApprove}
                        onEndReachedThreshold={0.5}
                        networkCallStatus={this.props.loadingStatus}
                        onRefresh={this.onRefresh}
                        canAutomaticRefresh={false}
                        requestObject={this.state.data}
                    />
                </View>
                <ServiceRequestFilter
                    isFilterOpen={this.state.isFilterOpen}
                    onClose={() => this.setState({ isFilterOpen: false })}
                    onApplyFilter={this.onApplyFilter}
                    filters={filters}
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
    let dashboardState = state.careTeamState && state.careTeamState.dashboardState;
    let authState = state.authState;
    return {
        selectedCount: dashboardState.selectedCount,
        serviceRequestDashboardDetail: dashboardState.serviceRequestDashboardDetail,
        fromDate: dashboardState.fromDate,
        toDate: dashboardState.toDate,
        careTeamId: authState && authState.userState.careTeamId,
        loadingStatus: dashboardState.isLoading,
        loggedInUser: authState && authState.userState.userInfo
    };
};

function mapDispatchToProps(dispatch) {
    return {
        goToServiceRequestItemDetail: (data, requestObject) => dispatch(goToServiceRequestItemDetail(data, requestObject)),
        getServiceRequestDashboardDetail: (data, requestType) => dispatch(getServiceRequestDashboardDetail(data, requestType)),
        goToServiceRequestDetails: (params) => dispatch(navigateToScreenMainStack(PATH ? PATH.SERVICE_REQUEST_DETAILS : '', params)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CareTeamDashboardDetail);