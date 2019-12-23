import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View} from 'react-native'
import {CoreoOpacityButton } from '../../../components';
import {getVisitServiceDetails, getSort, updateVisitHistoryFilterState, getFilteredData} from '../../../redux/visitHistory/VisitServiceDetails/actions'
import {navigateToScreenMainStack} from '../../../redux/navigation/actions'
import VisitServiceCard from './VisitServiceCard';
import ServiceRequestFilter from '../../VisitSelection/VisitServiceList/ServiceRequestFilter/index'
import styles from './styles'
import { PATH } from '../../../routes';
import {VisitHistoryFilters} from '../../../data/FiltersData'
import { ListScrollerAPIWrapper, Navbar, SafeView } from '../../../components/LevelOne';
import {getArrayFromNormalizedData} from '../../../utils/appUtils'
import {getFormatedDate, getTimeZoneOffset, getCurrentTime} from '../../../utils/momentUtil'
import {_} from '../../../utils/validations'
import { INIT } from '../../../constants/AppAPIConstants';
import { updateNetworkConnectivity } from '../../../services/OfflineSyncing';
import {  DEFAULT_DATES, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, DEFAULT_FROM_DATE,  SERVICE_VISIT_STATUS } from '../../../constants/constants';

let initialState = {
    sortByOrder: "asc",
    sortByColumn: "visitDate"
}

class VisitServicesList extends Component {
    apiRequestObject = initialState
    constructor(props) {
        super(props);
        this.state = {
            serviceRequestId: '',
            isSortOpen: false,
            isFilterOpen: false,
            newest: true,
            posted: true,
            filterComponentKey: 0,
            isFilterApplied: false,
            filterData: {       
                serviceTypeList:[],
                fromDate:DEFAULT_FROM_DATE,
                toDate: getCurrentTime(),
                serviceProviderList:[],
                offset:0
            },
        };
    };


    apiCall = (requestObject, requestType) => {
        let updatedRequestObject = requestObject
        if(_.isNil(updatedRequestObject)){
            updatedRequestObject = {
                pageNumber: 1,
                pageSize: 10,
                requestType: INIT
            }
        }
        let { serviceTypeList, status, serviceProviderList, offset, fromDate, toDate} = this.state.filterData

        let data = {
            serviceTypeList,
            fromDate,
            toDate,
            status,
            serviceProviderList,
            offset
        }
        this.props.getVisitServiceDetails(updatedRequestObject, data, updateNetworkConnectivity)
    }

    onApplyFilter = (updatedFilterData) => {
        let now = new Date();
        const {fromDate, toDate} = updatedFilterData.seletedDateRange
        let filteredServiceCategories = getArrayFromNormalizedData(updatedFilterData.selectedServiceCategories)
        let filteredServiceProviders = getArrayFromNormalizedData(updatedFilterData.selectedServiceProviderIds)
        var data = {
            fromDate: fromDate ? getFormatedDate(fromDate) : DEFAULT_DATES.fromDate,
            toDate: toDate ? getFormatedDate(toDate) : getCurrentTime(),
        }
        if(filteredServiceCategories.length > 0 || filteredServiceProviders.length > 0 || updatedFilterData.seletedDateRange){
            let requestObject = {
                pageNumber: DEFAULT_PAGE_NUMBER,
                pageSize: DEFAULT_PAGE_SIZE,
            }
            data = {
                ...data,
                serviceTypeList: filteredServiceCategories?filteredServiceCategories:[],
                serviceProviderList: filteredServiceProviders,
                offset: getTimeZoneOffset()
            }
            this.props.getVisitServiceDetails(requestObject, data, updateNetworkConnectivity)
            this.setState({
                isFilterApplied: true,
                filterData: data,
                isFilterOpen:false
            })
        }else{
            this.setState({ isFilterApplied: false,isFilterOpen: false }, this.apiCall)
        }
    }

    onClickServiceVisitCard = (id,data) => {
        let {servicePlanVisitId, visitTypeId,serviceProviderId} = data 
        let params = {
            serviceRequestVisitId: servicePlanVisitId?servicePlanVisitId:id,
            isPlanVisit:servicePlanVisitId?true:false,
            serviceProviderId,
            isAssesmentVisit:visitTypeId === SERVICE_VISIT_STATUS.assesmentVisitStatus,
            isESP:visitTypeId === SERVICE_VISIT_STATUS.assesmentVisitStatus || visitTypeId ===SERVICE_VISIT_STATUS.schedule
        }
        this.props.goToServiceDetails(params)
    }

    onInactivity = (onSuccess) => {
        this.setState({isFilterOpen: false}, onSuccess && onSuccess())
    }

    onRefresh = () => {
        this.setState({filterComponentKey: this.state.filterComponentKey + 1,isFilterApplied: false, isFilterOpen:false,
            filterData: {       
                serviceTypeList:[],
                fromDate:DEFAULT_FROM_DATE,
                toDate: getCurrentTime(),
                serviceProviderList:[],
                offset:0
            }
        },this.apiCall)
    }

    render(){
        const {visitHistory, getVisitServicesListStatus} = this.props
        return (
            <SafeView>
            <View style={{flex: 1}}>
                <Navbar showPullDownToRefresh title="Visit History" showEmptySave={true}/>
                <View style={styles.sortFilterStyle}>
                    <CoreoOpacityButton
                        style={styles.filter}
                        text='Filters'
                        textStyle={styles.requestTitle}
                        onPress={() => this.setState({isFilterOpen: true})}
                    />
                </View>
                <View style={{flex: 1}}>
                <ListScrollerAPIWrapper
                    data={visitHistory}
                    renderComponent={VisitServiceCard}
                    isPaginationEnabled={true}
                    apiSaga={this.apiCall}
                    networkCallStatus={getVisitServicesListStatus}
                    onPress={this.onClickServiceVisitCard}
                    onRefresh = {this.onRefresh}
                    canAutomaticRefresh={false}
                    noItemsText={"No results found for the criteria"}
                />
                </View>
                <ServiceRequestFilter
                    isFilterOpen={this.state.isFilterOpen}
                    onClose={() => this.setState({isFilterOpen: false})}
                    onApplyFilter={this.onApplyFilter}
                    filters={VisitHistoryFilters}
                    onResetFilter={this.onRefresh}
                    onInactivity={this.onInactivity}
                    id={this.state.filterComponentKey}
                />
            </View>
            </SafeView>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getVisitServiceDetails: (requestObject, data, updateNetworkOnResponse) => dispatch(getVisitServiceDetails(requestObject, data, updateNetworkOnResponse)),
        goToServiceDetails: (params) => dispatch(navigateToScreenMainStack(PATH ? PATH.VISIT_HISTORY_SERVICE_DETAILS : null, params)),
        updateFilterState: (data) => dispatch(updateVisitHistoryFilterState(data)),
        getSort: (data) => dispatch(getSort(data)),
        getFilteredData: (data, updateNetworkOnResponse) => dispatch(getFilteredData(data, updateNetworkOnResponse))
    }
};

function mapStateToProps(state) {
    let visitHistoryState = state.visitHistoryState;
    return {
        visitHistory: visitHistoryState && state.visitHistoryState.vistServiceHistoryState.VisitServiceHistory,
        getVisitServicesListStatus: visitHistoryState && state.visitHistoryState.vistServiceHistoryState.getVisitServicesListStatus,
        isLoading: state.loadingState && state.loadingState.isLoading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VisitServicesList)
