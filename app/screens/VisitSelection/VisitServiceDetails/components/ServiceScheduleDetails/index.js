import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, TouchableOpacity} from 'react-native'
import {getFormatedDate, isFutureDay, convert24To12HoursFormat} from '../../../../../utils/momentUtil'
import Icon from '../../../../../components/Base/Icon';
import Icons from '../../../../../assets/images/Icons';
import { setFontSize } from '../../../../../utils/deviceDimensions';
import {navigateToScreenMainStack} from '../../../../../redux/navigation/actions'
import {PATH} from '../../../../../routes/index'
import styles from './styles';
import { SERVICE_STATES, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, DATE_FORMATS, DEFAULT_TIME_DURATION, DEFAULT_DATES, SERVICE_VISIT_STATUS, OPEN_STATUS } from '../../../../../constants/constants';
import {  CoreoText, CoreoOpacityButton, CoreoImage } from '../../../../../components';
import { cancelServiceVisit, getVisitServiceSchedule, DEFAULT_REQUEST_OBJECT, getEspPlanVisits } from '../../../../../redux/visitSelection/VisitServiceDetails/actions';
import { ModalPopup } from '../../../../../components/LevelOne/SyncModalPopup';
import { ListScrollerAPIWrapper } from '../../../../../components/LevelOne';
import ServiceRequestFilter from '../../../VisitServiceList/ServiceRequestFilter';

import { normalizeData, getServiceIcon } from '../../../../../utils/appUtils';
import { MyPlanFiltersDataForEsp, MyPlanFiltersDataForSP } from '../../../../../data/FiltersData';

import images from '../../../../../assets/images';
import { getUserIdAndType } from '../../../../../utils/userUtil';
import { INIT } from '../../../../../constants/AppAPIConstants';

const IconWithText = (props) => {
    return (
        <View style={styles.iconWithText}>
            {props.hideIcon ? null : <Icon {...Icons.eye} style={styles.icon} size={setFontSize(18)} />}
            <Text style={styles.visitStatus}>{props.text}</Text>
        </View>
    )
}

export const getTimeInHoursAndMins = (time) => {
    let hms = time ? time.split(":") : DEFAULT_TIME_DURATION
    return hms[0] + ":" + hms[1]
}


const VisitCard = (props) => {
    const {scheduleTypeId,duration, isPaymentModeEnabled, assignedServiceProviderId, visitDate, slot,serviceRequestVisitId, servicePlanVisitId, serviceTypes, visitStatusName,onClickSummary, visitStatusId, visitStartTime, onPressStartVisit, visitEndTime, billedTotalDuration, originalTotalDuration,startTime,isPlanVisit} = props
    let visitStatusComponent = null
    let borderStyle = {}
    let disableStyle = {}
    let date = getFormatedDate(visitDate, DATE_FORMATS.MMM_DD)
    let isFutureVisit = isFutureDay(visitDate)
    let timeDiff = ""
    switch(Number(visitStatusId)){
        case SERVICE_STATES.YET_TO_START:
            visitStatusComponent = isFutureVisit ? <TouchableOpacity onPress={() => props.cancelServiceVisit(serviceRequestVisitId || servicePlanVisitId)} disabled ={!props.network}>
            <IconWithText hideIcon text="Cancel Visit" />
        </TouchableOpacity> : null
            break;
        case SERVICE_STATES.COMPLETED:
            visitStatusComponent = 
            <TouchableOpacity onPress={() => onClickSummary(serviceRequestVisitId || servicePlanVisitId)} disabled = {!props.network}>
                <IconWithText hideIcon text="Summary" />
            </TouchableOpacity>
            timeDiff = getTimeInHoursAndMins(billedTotalDuration || originalTotalDuration) + " (HH:MM)"
            break;
        case SERVICE_STATES.PAYMENT_PENDING:
            timeDiff = getTimeInHoursAndMins(billedTotalDuration || originalTotalDuration) + " (HH:MM)"
            let statusName = "Payment Pending"
            if(!isPaymentModeEnabled){
                statusName = "In-progress"
            }
            visitStatusComponent  = 
            <TouchableOpacity onPress={() => onPressStartVisit(serviceRequestVisitId || servicePlanVisitId, scheduleTypeId, assignedServiceProviderId)} disabled = {!props.network}>
                <IconWithText hideIcon text={statusName} />
            </TouchableOpacity>
            borderStyle = styles.border
            break
        case SERVICE_STATES.IN_PROGRESS:
            visitStatusComponent  = 
            <TouchableOpacity onPress={() => onPressStartVisit(serviceRequestVisitId || servicePlanVisitId, scheduleTypeId, assignedServiceProviderId)} disabled = {!props.network}>
                <IconWithText hideIcon text="In-progress" />
            </TouchableOpacity>
            borderStyle = styles.border
            break
        case "Missed":
            disableStyle = {opacity: 0.7}
            break;
        default:
            visitStatusComponent = null
            break;
    }

    const renderServiceTypes = (tasks) => {
        let selectedServiceTypes = tasks ?  [...tasks] : []
        let initialServiceTypes = selectedServiceTypes ? selectedServiceTypes.length>3 ? selectedServiceTypes.slice(0,2):selectedServiceTypes.slice(0,3) : []
        let types = initialServiceTypes.map(type => {
            return <CoreoImage style={styles.type} source={getServiceIcon(`serviceType${type.serviceTypeId}`)} />
        })
        let remainingCount = selectedServiceTypes && selectedServiceTypes.length>3 ? 
         <View style={styles.countBg}><Text style={styles.count}>3+</Text></View> : null
        return (
            <View style={styles.serviceTypesContainer}>
                {types}
                {remainingCount}
            </View>
        )    
    }


    const getVisitStartTime = () => {
        if(visitStatusId === SERVICE_STATES.PAYMENT_PENDING || visitStatusId === SERVICE_STATES.IN_PROGRESS || visitStatusId === SERVICE_STATES.COMPLETED){
            return getFormatedDate(startTime, DATE_FORMATS.HH_MM_A)
        }
        return ""
    }

    return (
        
             <View style={[styles.cardContainer, borderStyle, disableStyle]}>
            <View style={styles.textContainer}>
                {renderServiceTypes(serviceTypes)}
                <Text style={styles.text}>{convert24To12HoursFormat(startTime)}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{date}</Text>
                <Text style={styles.text}>{duration || timeDiff}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.textContainer}>
                <Text style={[styles.text, styles.purple]}>{visitStatusName}</Text>
                {visitStatusComponent}
            </View>
        </View>
       
    )
}

class ServiceScheduleDetails extends Component {
    selectedServiceVisitId = -1
    constructor(props){
        super(props)
        this.filterRequestObject = {
            ...DEFAULT_REQUEST_OBJECT, 
            patientId: props.screenProps.patientId || getUserIdAndType().patientId,
        }
        this.state = {
            showModal: false,
            isFilterOpen: false
        }
    }

    apiCall = (requestObject={pageNumber: DEFAULT_PAGE_NUMBER, pageSize: DEFAULT_PAGE_SIZE}, requestType) => {
        const {isPlanVisit} = this.props.screenProps
        if(isPlanVisit){
            this.props.getEspPlanVisits({...this.filterRequestObject, ...requestObject}, requestType)
        }else{
            let requestData = {
                ...this.filterRequestObject,
                serviceRequestId: this.props.visitServiceDetails ? this.props.visitServiceDetails.serviceRequestId : 0,
                pageNumber: requestObject.pageNumber,
                pageSize: requestObject.pageSize,
                requestType
            }
           this.props.getVisitServiceSchedule(requestData, null, null)
        }
    }

    onCancelVisit = (serviceRequestVisitId) => {
        this.selectedServiceVisitId = serviceRequestVisitId
        this.setState({showModal: true})
    }

    onClickSummaryDetails = (id) => {
        const {isPlanVisit} = this.props.screenProps
        let params = {
            serviceRequestVisitId: id,
            isPlanVisit
        }
        this.props.goToServiceDetails(params)
    }

    onPressStartVisit = (id, scheduleTypeId, spId) => {
        const {isPlanVisit} = this.props.screenProps
        let params = {
            serviceRequestVisitId: id,
            isPlanVisit
        }
        if(scheduleTypeId === SERVICE_VISIT_STATUS.assesmentVisitStatus){
            params = {
                ...params,
                serviceProviderId: spId,
            }
            this.props.goToAssessmengtVisitProcessing(params)
        }else{
            this.props.goToVisitProcessing(params)
        }
    }
    onReset = () => {
        const {patientId} = this.props.screenProps
        this.filterRequestObject = {...DEFAULT_REQUEST_OBJECT, patientId: patientId || getUserIdAndType().patientId}
        this.setState({ isFilterOpen: false},()=>{
            this.apiCall()
        })
    }
    emptyView = () => {
        return (
            <View style={styles.emptyViewContainer}>
                <CoreoImage source={images.blankMyPlan} style={styles.blankView} />
                <CoreoText style={styles.noResults}>No Results</CoreoText>
                <CoreoText style={styles.message}>Lorem ipsum dolar sit amet, consectetuer adipiscing elit, sed diam nonummy. Lorem ipsum dollar sit amet, consectetuer adipscing elit.</CoreoText>
            </View>
        )
    }

    onInactivity = (onSuccess) => {
        this.setState({ isFilterOpen: false }, onSuccess && onSuccess())
    }
    onApplyFilter = (updatedFilterData) => {
        const {isPlanVisit, patientId} = this.props.screenProps
        let visitStatus = updatedFilterData.visitStatusData.filter(item => item.status)
        this.filterRequestObject = {
            serviceRequestId: isPlanVisit ? 0 : this.props.visitServiceDetails.serviceRequestId,
            patientId: patientId || getUserIdAndType().patientId,
            startDate: updatedFilterData.seletedDateRange.fromDate || DEFAULT_DATES.fromDate,
            endDate: updatedFilterData.seletedDateRange.toDate || DEFAULT_DATES.toDate,
            visitStatuses: Object.keys(normalizeData(visitStatus, "id")),
            serviceTypes: Object.keys(updatedFilterData.selectedServiceCategories),
            pageNumber: DEFAULT_PAGE_NUMBER,
            pageSize: DEFAULT_PAGE_SIZE,
            planScheduleIds: [0],
            entityServiceProviders:[]
        }
        this.setState({ isFilterOpen: false }, this.apiCall)
    }

    render(){
        const {visitServiceSchedule, visitServiceDetails,getServiceScheduleStatus, firstAndLastVisitDates} = this.props
        const {isPlanVisit} = this.props.screenProps
        return (
            <View style={styles.mainContainer}>
                {visitServiceDetails && visitServiceDetails.statusId === OPEN_STATUS ? null : <View style={styles.sortFilterStyle}>
                    <CoreoOpacityButton
                        style={styles.filter}
                        text='Filters'
                        textStyle={styles.requestTitle}
                        onPress={() => this.setState({ isFilterOpen: true })}
                    />
                </View>}
                <View style={styles.scrollviewStyle}>
                    <ListScrollerAPIWrapper
                        getVisitServiceSchedule={this.props.getVisitServiceSchedule}
                        cancelServiceVisit={this.onCancelVisit}
                        onClickSummary={this.onClickSummaryDetails}
                        onPressStartVisit={this.onPressStartVisit}
                        apiSaga={this.apiCall}
                        network ={this.props.network}
                        data={visitServiceSchedule}
                        renderComponent={VisitCard}
                        pageSize={DEFAULT_PAGE_SIZE}
                        isPaginationEnabled={true}
                        networkCallStatus={getServiceScheduleStatus}
                        emptyViewComponent={this.emptyView}
                        isPlanVisit={isPlanVisit}
                    />
                </View>
                <ModalPopup
                    visible={this.state.showModal}
                    primaryButton="YES"
                    secondaryButton="NO"
                    onConfirm={() => {
                        this.props.cancelServiceVisit(this.selectedServiceVisitId, isPlanVisit, () => {                        
                        this.apiCall({pageNumber: DEFAULT_PAGE_NUMBER, pageSize: DEFAULT_PAGE_SIZE, requestType: INIT}, INIT)                        })
                        this.setState({ showModal: false })
                    }}
                    onCancel={() => this.setState({
                        showModal: !this.state.showModal,
                    })}
                >
                    <Text style={styles.message}>Do you want to cancel the visit?</Text>
                </ModalPopup>
                <ServiceRequestFilter
                    isFilterOpen={this.state.isFilterOpen}
                    onClose={() => this.setState({ isFilterOpen: false })}
                    onApplyFilter={this.onApplyFilter}
                    filters={isPlanVisit ? MyPlanFiltersDataForEsp : MyPlanFiltersDataForSP}
                    onResetFilter={this.onReset}
                    onInactivity={this.onInactivity}
                    id={this.state.filterComponentKey}
                    validDateChecks={true}
                    selectedFilterState={{seletedDateRange: {
                        fromDate: firstAndLastVisitDates.startVisitDate,
                        toDate: firstAndLastVisitDates.endVisitDate
                    },}}
                />
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getVisitServiceSchedule: (data, onAPISuccess, onAPIFailure, requestObject) => dispatch(getVisitServiceSchedule(data, onAPISuccess, onAPIFailure, requestObject)),
        cancelServiceVisit: (serviceVisitId,isPlanVisit, onSuccess) => dispatch(cancelServiceVisit(serviceVisitId,isPlanVisit, onSuccess)),
        goToVisitProcessing: (data) => dispatch(navigateToScreenMainStack(PATH ? PATH.VISIT_PROCESSING: null, data)),
        goToServiceDetails: (params) => dispatch(navigateToScreenMainStack(PATH ? PATH.VISIT_HISTORY_SERVICE_DETAILS: null, params)),    
        goToAssessmengtVisitProcessing: (data) => dispatch(navigateToScreenMainStack(PATH ? PATH.ASSESSMENT_VISIT_PROCESSING : null, data)),
        getEspPlanVisits: (data, requestType) => dispatch(getEspPlanVisits(data, requestType))    
    }
}

const mapStateToProps = (state) => {
    let visitServiceDetailsState = state.visitSelectionState && state.visitSelectionState.VisitServiceDetailsState;
    return {
        network: state.networkReducer.network,
        visitServiceDetails: visitServiceDetailsState.VisitServiceDetails,
        visitServiceSchedule: visitServiceDetailsState.VisitServiceSchedule,
        firstAndLastVisitDates: visitServiceDetailsState.firstAndLastVisitDates,
        getServiceScheduleStatus: visitServiceDetailsState.getServiceScheduleStatus,

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceScheduleDetails)
