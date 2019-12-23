import React, { Component } from "react";
import { connect } from 'react-redux';
import {View, Modal, TouchableOpacity} from 'react-native';
import {
    CoreoText,
    CoreoOpacityButton
    
} from '../../../../../../components';
import {IndividualFilters} from '../../../../../../data/FiltersData'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { setValueBasedOnHeight } from '../../../../../../utils/deviceDimensions';
import styles from './styles';
import {goToDashboard, goToItemDetail, getInTotalDashboardDetail, getVisitDashboardDetail,clearDashboardDetail, getRiskGroup, resetRiskGroup } from '../../../../../../redux/careTeam/Dashboard/actions'; 
import {in_CraditReverse,
        in_visitsReverse,
        in_totalReverse,
        
        sp_feedbackReverse
        } from '../../../../../../assets/images';
const checkIcon = <MaterialIcon name="check" size={setValueBasedOnHeight(20)} color="#5d2976" />
import CardList from '../../../Components/CardList';
import SortFilterBar from '../../../Components/SortFilterBar';
import TopCount from '../../../Components/TopCount';
import ServiceRequestFilter from "../../../../../VisitSelection/VisitServiceList/ServiceRequestFilter";
import { getCareTeamDefaultDates, getTimeZoneOffset} from '../../../../../../utils/momentUtil';
import { getArrayFromNormalizedData } from "../../../../../../utils/appUtils";
import { ListScrollerAPIWrapper, SafeView, Navbar } from "../../../../../../components/LevelOne";
import { INIT, REFRESH } from "../../../../../../constants/AppAPIConstants";
import { SearchBar } from "../../../../../ServiceProvidersTab/Browse";
import { MAXIMUM_AGE, INDIVIDUAL_LABELS } from "../../../../../../constants/constants";

const initialState = {
    "memberContractId": 0,
    "cohorts": [],
    "attributeProviders": [],
    "clinicalConditions": [],
    "contracts": [],
    "minimumAge": 0,
    "maximumAge": 0,
    "gender": 0,
    "rating": 0,
    "sortName": "ModifiedDate",
    "sortOrder": "asc",
    "careTeamId": 0,
    "city": "",
    "range": 0,
    "searchText": "",
    "stateName": "",
    "statusName": null,
    "streetAddress": "",
    "zip": 0,
    "lat":0,
    "lon":0,
    "fromDate": getCareTeamDefaultDates().startDate,
    "toDate": getCareTeamDefaultDates().endDate,
}

class CareTeamDashboardDetail extends Component {
    
    constructor(props) {
        super(props);
        const {startDate, endDate} = getCareTeamDefaultDates()
        this.state = {
            isSortOpen: false,
            isFilterOpen: false,
            isNewest: true,
            data: this.getInitialData(),
            filterComponentKey: 0,
        };
    };

    componentDidMount() {
        this.props.getRiskGroup()
    }

    getInitialData = () => {
        const {startDate, endDate} = getCareTeamDefaultDates()
        return {
            ...initialState,
            "careTeamId": this.props.careTeamId,
            "fromDate": this.props.fromDate ? this.props.fromDate : startDate,
            "toDate": this.props.toDate ? this.props.toDate : endDate,
            "statusName": this.props.selectedCount && !this.props.selectedCount.statusName?null: this.props.selectedCount && this.props.selectedCount.statusName        }
    }

    apiCall = (requestObject, requestType = INIT) => {
            this.props.getInTotalDashboardDetail(requestObject, requestType);
    }

    onRefresh = () => {
        this.setState({
            data: this.getInitialData(),
            filterComponentKey: this.state.filterComponentKey + 1
        }, () => {
            this.apiCall({...this.state.data, pageNumber: 1, pageSize: 10}, REFRESH)
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.fromDate !== this.props.fromDate || nextProps.toDate !== this.props.toDate){
            let tempData = this.state.data;
            tempData.fromDate = nextProps.fromDate;
            tempData.toDate = nextProps.toDate;
            this.setState({
                data: tempData
            })
            this.apiCall({...this.state.data, pageSize: 10, pageNumber: 1})
        }
    }

    onSortChange = (newest) =>{
        this.setState({
            isNewest: newest,
            isSortOpen: false
        });
        let requestObject = {
            ...this.state.data,
            sortOrder: newest ? "asc" : "desc"
        }
        this.setState({data: requestObject},() => {
            this.apiCall({...requestObject, pageSize: 10, pageNumber: 1})
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

    onResetFilter = () => {
        let requestObject = this.getInitialData()
        this.props.resetRiskGroup()
        this.setState({data:requestObject, isFilterOpen: false},()=>{
            this.apiCall({...requestObject, pageSize: 10, pageNumber: 1})
        })
    }

    renderSwitch(param) {
        switch(param) {
          case INDIVIDUAL_LABELS.IN_TOTAL_IN_THE_PERIOD:
            return in_totalReverse;
            case INDIVIDUAL_LABELS.WITH_NO_INVALID_CREDIT_CARD:
            return in_CraditReverse;
            case INDIVIDUAL_LABELS.WITH_VISITS_IN_THE_PERIOD:
            return in_visitsReverse;
            case INDIVIDUAL_LABELS.WITH_FEEDBACK_ALERTS:
            return sp_feedbackReverse;
          default:  
            return in_totalReverse;
        }
      }

    getSelectedRiskGroups (riskGroups) {
        let risks = []
        riskGroups.map((item,index)=>{
            item.selected && risks.push(item.name)
        })
        return risks
    }
    onApplyFilter = (data) => {
        let filteredContractIds = []
        //  filteredContractIds[0] = data.selectedContractId
        let filteredServiceCategories = getArrayFromNormalizedData(data.selectedServiceCategories)
        let attributeProviders = getArrayFromNormalizedData(data.selectedServiceProviderIds)
        let cohorts = getArrayFromNormalizedData(data.selectedCohortIds)
        let requestObject = {
            ...this.state.data,
            city: data.otherLocation.city || "",
            streetAddress: data.otherLocation.street || "",
            stateName: data.otherLocation.stateName || "",
            zip: data.otherLocation.zip || 0,
            clinicalConditions: getArrayFromNormalizedData(data.selectedClinics),
            serviceTypeIds: filteredServiceCategories,
            minimumAge: data.minAge,
            attributeProviders,
            cohorts,
            maximumAge: data.maxAge === MAXIMUM_AGE ? 0 : data.maxAge,
            gender: data.selectedGenderId,
            pageNumber: 1,
            pageSize: 10,
            contracts: filteredContractIds,
            memberContractId: data.selectedContractId,
            offset: getTimeZoneOffset(),
            statusName: null,
            risks:this.getSelectedRiskGroups(data.riskGroup)
        }
        this.setState({data: requestObject},() => {
            this.apiCall({...requestObject, pageSize: 10, pageNumber: 1})
        })
    }
    onInactivity = (onSuccess) => {
        this.setState({isFilterOpen: false}, onSuccess && onSuccess())
    }
    render() {
        __DEV__ && console.log("careTeamState is: ",this.props)
        let listItems = this.props.dashboardDetail && this.props.dashboardDetail.map((individual) => {
            return {
                name: individual.individualName,
                source: individual.thumbNail,
                data : "", // this.props.selectedCount.statusName === 'All' ?'': individual.visitCount + ' Visits',
                label:this.props.selectedCount.label,
                ...individual
            }
        });

        let count = this.props.dashboardDetail ? this.props.dashboardDetail.length : this.props.dashboardDetail
        return (
            <SafeView>
            <View style={{flex: 1}}>
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
                    toggleSort={() => this.setState({isSortOpen: true})}
                    toggleFilter={() => this.setState({isFilterOpen: true})}
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
                        onPress={this.props.goToItemDetail}
                        networkCallStatus={this.props.loadingStatus}
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
                    onRequestClose={() => this.setState({isSortOpen: false})}
                >
                  <TouchableOpacity onPress={() => this.setState({isSortOpen: false})} style={styles.transparentContainer} >
                    <View style={styles.modalStyle}>
                        <View style={styles.lineStyle}/>
                        <View style={styles.sortModalTitle}>
                            <CoreoText  style={styles.patientNameStyle}>SORT BY</CoreoText> 
                        </View>
                        <View style={styles.lineStyle}/>
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
                        <View style={styles.lineStyle}/>
                    </View>
                    </TouchableOpacity>
                </Modal>
              
                <ServiceRequestFilter
                    isFilterOpen={this.state.isFilterOpen}
                    onClose={() => this.setState({isFilterOpen: false})}
                    onApplyFilter={this.onApplyFilter}
                    filters={IndividualFilters}
                    onResetFilter={this.onResetFilter}
                    id={this.state.filterComponentKey}
                    onInactivity={this.onInactivity}
                    showNotDisclosedGender={true}
                />
            </View>
            </SafeView>
        )
    }
}

function mapStateToProps(state) {
    let careTeamDashboardState = state.careTeamState && state.careTeamState.dashboardState

    return {
        selectedCount:careTeamDashboardState? careTeamDashboardState.selectedCount:0,
        dashboardDetail: careTeamDashboardState? careTeamDashboardState.dashboardDetail:[],
        fromDate: careTeamDashboardState? careTeamDashboardState.fromDate:null,
        toDate: careTeamDashboardState? careTeamDashboardState.toDate:null,
        genderDetails: careTeamDashboardState? state.serviceProvidersTabState.requestsState.gender:null,
        loadingStatus: careTeamDashboardState? careTeamDashboardState.isLoading:null,
        careTeamId:careTeamDashboardState? state.authState.userState.careTeamId :null
    };
};

function mapDispatchToProps(dispatch){
    return {
        goToDashboard: () => dispatch(goToDashboard()),
        goToItemDetail: (data) => dispatch(goToItemDetail(data)),
        getInTotalDashboardDetail: (data, requestType) => dispatch(getInTotalDashboardDetail(data, requestType)),
        getVisitDashboardDetail: (data) => dispatch(getVisitDashboardDetail(data)),
        clearDashboardDetail: () => dispatch(clearDashboardDetail()),
        getRiskGroup: () => dispatch(getRiskGroup()),
        resetRiskGroup:() => dispatch(resetRiskGroup())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CareTeamDashboardDetail);