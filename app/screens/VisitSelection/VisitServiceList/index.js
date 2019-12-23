import React, { Component } from "react";
import moment from 'moment'
import { connect } from 'react-redux';
import {Modal, TouchableOpacity} from 'react-native';
import { getVisitServiceList, onNewServiceRequestClick } from '../../../redux/visitSelection/VisitServiceList/actions';
import ServiceRequestCard from '../VisitServiceList/ServiceRequestCard/index';
import ServiceRequestFilter from '../VisitServiceList/ServiceRequestFilter/index';
import {Filters} from '../../../data/FiltersData'
import {getSortFilter, getSort} from "../../../redux/visitSelection/ServiceRequestSorting/actions";
import styles from './ServiceRequestCard/styles';
import {
    View
  } from 'react-native';
import {
    CoreoText,
    CoreoOpacityButton,
    NavbarWithImage,
    CoreoImage
} from '../../../components';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { setValueBasedOnHeight, setValueBasedOnWidth } from '../../../utils/deviceDimensions';
import { ListScrollerAPIWrapper, SafeView } from "../../../components/LevelOne";
const bellIcon = <MaterialIcon name="bell-outline" size={setValueBasedOnHeight(25)} color="#ffffff" />
const checkIcon = <MaterialIcon name="check" size={setValueBasedOnHeight(20)} color="#5d2976" />
import { PATH } from '../../../routes';
import {navigateToScreenMainStack, replace} from '../../../redux/navigation/actions'
import { INIT, REFRESH } from "../../../constants/AppAPIConstants";
import {_} from '../../../utils/validations'
import { extractRole } from "../../../utils/roleUtil";
import { SCREENS, OFFLINE_SCREENS, USER_TYPES, PENDING_APPROVAL, DATE_FORMATS, DEFAULT_FROM_DATE, DEFAULT_TO_DATE, CANCELLED, SERVICE_REQUEST_STATUS } from "../../../constants/constants";
import { getTodayDate, getTimeZoneOffset } from "../../../utils/momentUtil";
import { getArrayFromNormalizedData } from "../../../utils/appUtils";
import { isAPIFetching } from "../../../utils/AppAPIUtils";
import { store } from "../../../redux/store";
import { updateNetworkConnectivity } from "../../../services/OfflineSyncing";
import {getUserInfo} from '../../../utils/userUtil'
import { empty_request } from "../../../assets/images";
import { SERVICE_PROVIDERS } from "../../CareTeam/CareTeamTabs/Dashboard";

const apiPageSize = 10;
export const initialState = {
  fromDate: "1900-01-01",
  toDate: "2100-01-01",
  Status: [],
  pageNumber: 1,
  pageSize:apiPageSize,
  sortByOrder: "default",
  sortByColumn: "default",
  requestType: INIT
}

export const getServiceRequest = (requestObject, requestType) => {
    let updatedRequestObject = requestObject
        updatedRequestObject = {
            ...requestObject,
            pageNumber: requestObject.pageNumber,
            pageSize: requestObject.pageSize,
            requestType: requestObject.requestType,
            Status: global.selectedStatusId? [global.selectedStatusId]: []
         }
         store && store.dispatch(getSortFilter(updatedRequestObject, updateNetworkConnectivity))
}

class VisitServiceList extends Component {

    static navigationOptions = () => {
        return {
            tabBarOnPress({navigation, defaultHandler}) {
                global.selectedStatusId = null

                getServiceRequest(initialState);
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

    isSortAndFilterApplied = false
    apiRequestObject = initialState
    IS_COMPONENT_MOUNTED = false
    constructor(props) {
        super(props);
        props.navigation.setParams({
            onTabFocus:  this.handleTabFocus
          });
        this.state = {
            serviceRequestRole: extractRole(SCREENS.SERVICE_REQUEST),
            serviceRequestId: '',
            isSortOpen: false,
            isFilterOpen: false,
            newest: true,
            posted: true,
            filterComponentKey: 0
        };
    };

    handleTabFocus = () => {
        this.apiRequestObject = initialState
        this.setState({filterComponentKey: this.state.filterComponentKey + 1})
      };

    componentWillMount(){
        if(!this.props.network){
            this.props.replace(OFFLINE_SCREENS.REQUEST_SCREEN)
        }
    }
    componentDidMount(){
        this.IS_COMPONENT_MOUNTED = true
    }
    apiCall = (requestObject, requestType) => {
        let updatedRequestObject = requestObject
            updatedRequestObject = {
                Status:global.selectedStatusId? [global.selectedStatusId]:[SERVICE_REQUEST_STATUS.open.id, SERVICE_REQUEST_STATUS.hire.id, SERVICE_REQUEST_STATUS.cancelled.id, SERVICE_REQUEST_STATUS.pendingApproval.id],
                ...this.apiRequestObject,
                pageNumber: requestObject.pageNumber,
                pageSize: requestObject.pageSize,
                requestType: requestObject.requestType,
             }
        this.props.getSortFilter(updatedRequestObject, updateNetworkConnectivity)
    }

    onNewServiceRequestClick = () => {
        this.props.onNewServiceRequestClick();
    }

    onApplyFilter = (data) => {
        let requestObject = {
            fromDate : data.seletedDateRange.fromDate ? moment(data.seletedDateRange.fromDate).format(DATE_FORMATS.YYYY_MM_DD) : DEFAULT_FROM_DATE,
            toDate: data.seletedDateRange.toDate ? moment(data.seletedDateRange.toDate).format(DATE_FORMATS.YYYY_MM_DD) : DEFAULT_TO_DATE,
            Status: getArrayFromNormalizedData(data.statusData),
            pageNumber: 1,
            pageSize:apiPageSize,
            sortByOrder: "default",
            sortByColumn: "default",
            requestType: INIT,
            offset: getTimeZoneOffset()
        }
        global.selectedStatusId = null
        this.apiRequestObject = requestObject
        this.props.getSortFilter(requestObject, updateNetworkConnectivity)
    }

    onSortChange = (posted, newest) =>{
        var data={
          sortByOrder : newest ? "Newest" : "Oldest",
          sortByColumn: posted ? "PostedDate" : "HiredDate",
          fromDate : "1900-01-01",
          toDate: "2100-01-01",
          pageNumber: 1,
          pageSize: 15,
          requestType: INIT,
          Status:[35, 38, 42, 47, 106, 107]
        }
        this.apiRequestObject = data
        this.props.getSortFilter(data, updateNetworkConnectivity)
        this.setState({
            newest: (newest !== null ? newest : this.state.newest),
            posted: (posted !== null ? posted : this.state.posted),
            isSortOpen: false
        });
    }

    onResetFilter = () => {
        this.setState({isFilterOpen: false}, this.refreshScreen)
    }

    onRefresh = () => {
           global.selectedStatusId = null
           this.props.getSortFilter({...initialState, requestType: REFRESH}, updateNetworkConnectivity)
           this.setState({filterComponentKey: this.state.filterComponentKey + 1})
    }

    refreshScreen = () => {
        global.selectedStatusId = null
        this.apiRequestObject = initialState
        this.apiCall({pageNumber: 1,pageSize: 15, requestType: REFRESH})
    }
    onInactivity = (onSuccess) => {
        this.setState({isFilterOpen: false}, onSuccess && onSuccess())
    }
    render() {
        let RenderComponent = SafeView
    if(getUserInfo && getUserInfo() && getUserInfo().userType === USER_TYPES.CARE_TEAM){
      RenderComponent = View
    }
        return (
            <RenderComponent style={styles.mainContainer}>
            <View style={styles.mainContainer}>
                <NavbarWithImage
                    showPullDownToRefresh
                    title="View Requests"
                    showBellIcon={false}
                />
                <View style={styles.sortFilterStyle}>
                    <CoreoOpacityButton
                        disabled = {!this.props.network}
                        style={styles.filter}
                        text='Filters'
                        textStyle={styles.requestTitle}
                        onPress={() => this.setState({isFilterOpen: true})}
                    />
                </View>
                <View style={styles.scrollviewStyle}>
                <ListScrollerAPIWrapper
                       data={this.props.visitServiceList}
                       renderComponent={ServiceRequestCard}
                       isPaginationEnabled={true}
                       apiSaga={this.apiCall}
                       navigation={this.props.navigation}
                       networkCallStatus={this.props.getServiceRequestsStatus}
                       onRefresh = {this.onRefresh}
                       canAutomaticRefresh={false}
                       pageSize={apiPageSize}
                       noItemsText={"Click on + button to begin"}
                />
                        {this.state.serviceRequestRole.Create && (
                            <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() =>
                                this.props.createServiceRequest({
                                navigator: this.props.navigation
                                })
                            }
                            style={styles.TouchableOpacityStyle}
                            >
                            <CoreoImage
                                style={styles.plusIcon}
                                source={require("../../../assets/images/Icons/plus.png")}
                            />
                            </TouchableOpacity>
                        )}
                 </View>
                 <Modal
                    transparent={true}
                    animationType="none"
                    closeOnClick={true}
                    visible={this.state.isSortOpen}
                    onRequestClose={() => this.setState({isSortOpen: false})}
                >
                    <View style={styles.modalStyle}>
                        <View style={styles.lineStyle}/>
                        <View style={styles.sortModalTitle}>
                            <CoreoText  style={styles.patientNameStyle}>SORT BY</CoreoText> 
                        </View>
                        <View style={styles.lineStyle}/>
                        <View style={styles.postedVisit}>
                            <View style={styles.dateSection}>
                                <CoreoOpacityButton
                                    textStyle={this.state.posted ? styles.selectedSortStyle : styles.patientNameStyle}
                                    text='Posted Date'
                                    onPress={() => this.onSortChange(true, this.state.newest)}
                                />
                                {this.state.posted ? checkIcon : null}
                            </View>
                            {/* <View style={styles.dateSection}>
                                <CoreoOpacityButton
                                    textStyle={!this.state.posted ? styles.selectedSortStyle : styles.patientNameStyle}
                                    text='Hired Date'
                                    onPress={() => this.onSortChange(false, this.state.newest)}
                                />
                                {!this.state.posted ? checkIcon : null}
                            </View> */}
                        </View>
                        <View style={styles.lineStyle}/>
                        <View style={styles.newestOldest}>
                            <View style={styles.dateSection}>
                                <CoreoOpacityButton
                                    textStyle={this.state.newest ? styles.selectedSortStyle : styles.patientNameStyle}
                                    text='Newest'
                                    onPress={() => this.onSortChange(this.state.posted, true)}
                                />
                                {this.state.newest ? checkIcon : null}
                            </View>
                            <View style={styles.dateSection}>
                                <CoreoOpacityButton
                                    textStyle={!this.state.newest ? styles.selectedSortStyle : styles.patientNameStyle}
                                    text='Oldest'
                                    onPress={() => this.onSortChange(this.state.posted, false)}
                                />
                                {!this.state.newest ? checkIcon : null}
                            </View>
                        </View>
                        <View style={styles.lineStyle}/>
                    </View>
                </Modal>
                <ServiceRequestFilter
                    isFilterOpen={this.state.isFilterOpen}
                    onClose={() => this.setState({isFilterOpen: false})}
                    onApplyFilter={this.onApplyFilter}
                    filters={Filters}
                    onResetFilter={this.onResetFilter}
                    onInactivity={this.onInactivity}
                    id={this.state.filterComponentKey}
                />
            </View>
            </RenderComponent>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onNewServiceRequestClick: () => dispatch(onNewServiceRequestClick()),
        getSortFilter:(data, updateNetworkOnResponse)  => dispatch(getSortFilter(data, updateNetworkOnResponse)),
        createServiceRequest: (params) => dispatch(navigateToScreenMainStack(PATH.REQUIREMENTS_SCREEN, params)),
        replace: (screen) => dispatch(replace(screen))
    }
};

function mapStateToProps(state) {
    return {
        visitServiceList: state.visitSelectionState.VisitServiceListState.visitServiceList,
        getServiceRequestsStatus: state.visitSelectionState.VisitServiceListState.getServiceRequestsStatus,
        patientImage: state.authState.userState.patientImage,
        network: state.networkReducer.network
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VisitServiceList);