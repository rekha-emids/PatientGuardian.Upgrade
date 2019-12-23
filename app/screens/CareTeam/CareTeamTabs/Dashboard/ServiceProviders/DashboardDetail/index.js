import React, { Component } from "react";
import { connect } from 'react-redux';
import { View, Modal, TouchableOpacity } from 'react-native';
import {
    CoreoText,
    CoreoOpacityButton,
} from '../../../../../../components';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { setValueBasedOnHeight } from '../../../../../../utils/deviceDimensions';
import styles from './styles';
import { goToDashboard, goToServiceProviderItemDetail, getServiceProviderDashboardDetail, clearDashboardDetail } from '../../../../../../redux/careTeam/Dashboard/actions';
import {
    sp_inTotalReverse,
    sp_feedbackReverse,
    sp_LowRateReverse,
    visits_lowTaskReverse,
    in_visitsReverse
} from '../../../../../../assets/images';
const checkIcon = <MaterialIcon name="check" size={setValueBasedOnHeight(20)} color="#5d2976" />
import CardList from '../../../Components/CardList';
import SortFilterBar from '../../../Components/SortFilterBar';
import TopCount from '../../../Components/TopCount';
import ServiceRequestFilter from "../../../../../VisitSelection/VisitServiceList/ServiceRequestFilter";
import { ServiceProvidersFiltersData } from "../../../../../../data/FiltersData";
import { getCareTeamDefaultDates } from '../../../../../../utils/momentUtil';
import { getArrayFromNormalizedData, getArrayFromNormalizedDataKey } from "../../../../../../utils/appUtils";
import { ListScrollerAPIWrapper, Navbar, SafeView } from "../../../../../../components/LevelOne";
import { INIT, REFRESH } from "../../../../../../constants/AppAPIConstants";
import { SearchBar } from "../../../../../ServiceProvidersTab/Browse";
import { LOW_RATING, FEEDBACK_ALERTS } from "../../../../../../constants/constants";

const initialState = {
    "serviceTypeIds": [],
    "minHourlyRate": 0,
    "maxHourlyRate": 0,
    "skills": [],
    "genderId": 0,
    "minExperience": 0,
    "maxExperience": 0,
    "ratings": 0,
    "agencies": [],
    "streetName": "null",
    "city": "null",
    "stateName": "",
    "sortName": "rating",
    "zip": 0,
    "lat": 0,
    "lon": 0,
    "range": 0,
    "searchText": "",
    "streetName": "",
    "tabFilter": "null",
    "sortOrder": "desc",
    "fromDate": getCareTeamDefaultDates().startDate,
    "toDate": getCareTeamDefaultDates().endDate,
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
        const { startDate, endDate } = getCareTeamDefaultDates()
        return {
            ...initialState,
            "careTeamId": this.props.careTeamId,
            fromDate: this.props.fromDate ? this.props.fromDate : startDate,
            toDate: this.props.toDate ? this.props.toDate : endDate,
            "tabFilter": this.props.selectedCount.statusName || "null",
            sortOrder: this.props.selectedCount.statusName === LOW_RATING ? "asc" : "desc",
            sortName: this.props.selectedCount.statusName === FEEDBACK_ALERTS ? "feedback": (this.props.selectedCount.statusName === LOW_RATING ? "rating" : "modifiedDate")
        }
    }

    apiCall = (requestObject, requestType = INIT) => {
        this.props.getServiceProviderDashboardDetail(requestObject, requestType)
    }

    onRefresh = () => {
        this.setState({
            data: this.getInitialData(),
            filterComponentKey: this.state.filterComponentKey + 1
        }, () => {
            this.apiCall({...this.state.data, pageNumber: 1, pageSize: 10},REFRESH)
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
                this.apiCall({ ...this.state.data, pageSize: 10, pageNumber: 1 })
            })
        }
    }
    onResetFilter = () => {
        let requestObject = {
            ...initialState, 
            "requestType": "init",
            "careTeamId": this.props.careTeamId,
            "statusName":  this.props.selectedCount.statusName === "Invalid"||!this.props.selectedCount.statusName?null:this.props.selectedCount.statusName,
            "tabFilter": this.props.selectedCount.statusName || "null",
        }

        this.setState({ data: requestObject, isFilterOpen: false }, () => {
           
            this.apiCall({ ...requestObject, pageSize: 10, pageNumber: 1 })

        })
       
    
    }

    onSortChange = (newest) => {
        this.setState({
            isNewest: newest,
            isSortOpen: false
        });
        let requestObject = {
            ...this.state.data,
            sortOrder: newest ? "asc" : "desc"
        }
        this.setState({ data: requestObject }, () => {
            this.apiCall({ ...requestObject, pageSize: 10, pageNumber: 1 })
        })
    }

    renderSwitch(param) {
        switch (param) {
            case 'In Total In The Network':
                return sp_inTotalReverse;
            case 'With Low Ratings':
                return sp_LowRateReverse;
            case 'With Feedback Alerts':
                return sp_feedbackReverse;
            case 'With Visits In The Period':
                return in_visitsReverse;
            case 'With Low Task Completion':
                return visits_lowTaskReverse;
            default:
                return sp_inTotalReverse;
        }
    }

    onApplyFilter = (data) => {
        const { genderDetails } = this.props
        let filteredServiceCategories = getArrayFromNormalizedData(data.selectedServiceCategories)
        let filteredSkills = getArrayFromNormalizedDataKey(data.selectedSkills)
        let requestObject = {
            ...this.state.data,
            serviceTypeIds: filteredServiceCategories,
            minHourlyRate: data.minRate || 0,
            maxHourlyRate: data.maxRate || 0,
            skills: filteredSkills,
            genderId: data.selectedGenderId,
            minExperience: data.minExp || 0,
            maxExperience: data.maxExp || 0,
            ratings: data.rating || 0,
            pageNumber: 1,
            pageSize: 10,
            range: data.range || 0,
            lat: data.lat || 0,
            long: data.long || 0,
            zip: data.zip || 0,
            streetAddress: data.streetAddress || '',
            city: data.city || '',
            stateName: data.stateName || '',
            tabFilter: null
        }
        delete requestObject['sortName']
        delete requestObject['sortOrder']
        this.setState({ data: requestObject }, () => {
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
        let listItems = this.props.serviceProviderDashboardDetail && this.props.serviceProviderDashboardDetail.map((individual) => {

            return {
                name: individual.firstName + " " + individual.lastName,
                source: individual.thumbNail,
                label:this.props.selectedCount.label,
                ...individual
            }
        });
        let count = this.props.serviceProviderDashboardDetail ? this.props.serviceProviderDashboardDetail.length : this.props.serviceProviderDashboardDetail
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
                        onPress={this.props.goToServiceProviderItemDetail}
                        canAutomaticRefresh={false}
                        onRefresh={this.onRefresh}
                        label={this.props.selectedCount.label}
                    />
                </View>
                <Modal
                    transparent={true}
                    animationType="none"
                    closeOnClick={true}
                    visible={this.state.isSortOpen}
                    onRequestClose={() => this.setState({ isSortOpen: false })}
                >
                    <TouchableOpacity onPress={() => this.setState({ isSortOpen: false })} style={styles.transparentContainer} >
                        <View style={styles.modalStyle}>
                            <View style={styles.lineStyle} />
                            <View style={styles.sortModalTitle}>
                                <CoreoText style={styles.patientNameStyle}>SORT BY</CoreoText>
                            </View>
                            <View style={styles.lineStyle} />
                            <View style={styles.newestOldest}>
                                <View style={styles.dateSection}>
                                    <CoreoOpacityButton
                                        textStyle={this.state.isNewest ? styles.selectedSortStyle : styles.patientNameStyle}
                                        text='Newest'
                                        onPress={() => this.onSortChange(true)}
                                    />
                                    {this.state.isNewest ? checkIcon : null}
                                </View>
                                <View style={styles.dateSection}>
                                    <CoreoOpacityButton
                                        textStyle={!this.state.isNewest ? styles.selectedSortStyle : styles.patientNameStyle}
                                        text='Oldest'
                                        onPress={() => this.onSortChange(false)}
                                    />
                                    {!this.state.isNewest ? checkIcon : null}
                                </View>
                            </View>
                            <View style={styles.lineStyle} />
                        </View>
                    </TouchableOpacity>
                </Modal>
                <ServiceRequestFilter
                    isFilterOpen={this.state.isFilterOpen}
                    onClose={() => this.setState({ isFilterOpen: false })}
                    onApplyFilter={this.onApplyFilter}
                    filters={ServiceProvidersFiltersData}
                    onResetFilter={this.onResetFilter}
                    id={this.state.filterComponentKey}
                    onInactivity={this.onInactivity}
                    showOthersGender={true}
                />
            </View>
            </SafeView>
        )
    }
}

function mapStateToProps(state) {
    let dashboardState = state.careTeamState && state.careTeamState.dashboardState
    return {
        selectedCount: dashboardState ?dashboardState.selectedCount : 0,
        serviceProviderDashboardDetail: dashboardState ?dashboardState.serviceProviderDashboardDetail : [],
        fromDate: dashboardState ?dashboardState.fromDate : null,
        toDate: dashboardState ?dashboardState.toDate : null,
        genderDetails: dashboardState ? state.serviceProvidersTabState.requestsState.gender : null,
        careTeamId: dashboardState ? state.authState.userState.careTeamId : 0,
        loadingStatus:dashboardState ?dashboardState.isLoading : null
    };
};

function mapDispatchToProps(dispatch) {
    return {
        goToDashboard: () => dispatch(goToDashboard()),
        goToServiceProviderItemDetail: (data) => dispatch(goToServiceProviderItemDetail(data)),
        getServiceProviderDashboardDetail: (data, requestType) => dispatch(getServiceProviderDashboardDetail(data, requestType)),
        clearDashboardDetail: () => dispatch(clearDashboardDetail())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CareTeamDashboardDetail);