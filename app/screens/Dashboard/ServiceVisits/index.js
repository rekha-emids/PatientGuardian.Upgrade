import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { CoreoText, CoreoImage, Select, CoreoHighlightButton } from '../../../components';
import { Popup } from '../../../components/Base/PopOver';
import {ModalPopup} from '../../../components/LevelOne/ModalPopup'
import Calendar from '../../../components/Base/calendar/Calendar';
import {PATH} from '../../../routes/index'
import { getPatientVisitDetail, clearPatientVisit } from '../../../redux/dashboard/Dashboard/actions'
import { navigateToScreenMainStack } from '../../../redux/navigation/actions'
import {  getStartAndEndDateForCalendar, formatYearDate, getTimeZoneOffset, getYearDropDownValues, getTodayDate,  getFormatedDate,  getCurrentDate } from '../../../utils/momentUtil';
import  images, { empty_request } from '../../../assets/images'
import { CoreoProfileImage } from '../../../components/Base/Image/Image';
import { createVideoConference } from "../../../redux/telehealth/actions";
import { onCreateNewConversation } from "../../../redux/asyncMessages/actions";
import {clearImpersination} from '../../../redux/auth/User/actions';
import { USER_TYPES, ALL, SERVICE_STATES, NEW_DATE_FORMAT, MM_YYYY, DATE_FORMATS, HIRED_STATUS, SERVICE_VISIT_STATUS } from '../../../constants/constants';
import { getSelectedPatientInfo, getUserInfo } from '../../../utils/userUtil';
import { THEME_PRIMARY_COLOR, POPUP_PRIMARY_COLOR, POPUP_SECONDARY_COLOR, BUTTON_COLOR_ENABLED } from '../../../constants/theme';
import { makeACall } from '../../../utils/communicationUtils';
import { updateNetworkConnectivity } from '../../../services/OfflineSyncing';
import { cancelServiceVisit, setSPDetails } from '../../../redux/visitSelection/VisitServiceDetails/actions';
import { setFontSize } from '../../../utils/deviceDimensions';
import { CombineVisitsObjectByDate } from '../../../utils/renderFields';
import Icons from '../../../assets/images/Icons';
import Icon from '../../../components/Base/Icon';
import { SERVICE_PROVIDERS } from '../../HomeTabs';
import { isEmpty } from '../../../utils/EmptyObjCheck';
import { LOAD_MORE, INIT } from '../../../constants/AppAPIConstants';



export const EmptyComponent = (props) => {
  return (
    <View style={styles.containerEmpty}>
      <View style={styles.emptyTextView}>
        <CoreoText style={styles.emptyCardText}>Click below to get started</CoreoText>
      </View>
      <TouchableOpacity onPress={props.createNewSR} style={styles.emptyCard} disabled={!props.network}>
        <CoreoImage style={styles.editImageStyle} source={empty_request} />
        <Text style={styles.emptytextStyle}>New Service Requests</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.browseServiceProviders} style={styles.emptyCard} disabled={!props.network}>
        <CoreoImage style={styles.editImageStyle} source={images.serviceProviderSelected} />
        <Text style={styles.emptytextStyle}>Browse Providers</Text>
      </TouchableOpacity>
    </View>
  )
}


class ServiceVisits extends PureComponent {
  selectedDayIndex = -1
  selectedServiceVisitId = null
  isPlanTypeVisit = false
  state = {
    users: [],
    selectedDate: '',
    monthlabel: getTodayDate(MM_YYYY),
    showall: false,
    daySelected: getCurrentDate(),
    slots: ['Morning', 'Afternoon', 'Evening'],
    showCallModal: false,
    isClickedOnTodayDate: false,
    showNoNumber:false,
    cancelVisitModal: false
  }

  onPressTodayIcon = () => {
    this.setState({monthlabel: getTodayDate(MM_YYYY), isClickedOnTodayDate: !this.state.isClickedOnTodayDate})
  }

  componentDidMount() {
    const {startDate, endDate} = getStartAndEndDateForCalendar()
    let requestObject = {
      statusId: ALL,
      pageNumber: 1,
      pageSize: 10,
      sortByOrder: 'default',
      sortByColumn: 'default',
      startDate,
      endDate,
      conversationParticipantType: getSelectedPatientInfo() && getSelectedPatientInfo().userType || getUserInfo() && getUserInfo().userType,
      offset: getTimeZoneOffset(),
      method: 'POST'
  }

    this.props.getPatientVisitDetail(formatYearDate(NEW_DATE_FORMAT),requestObject,INIT, updateNetworkConnectivity);
    this.selectedDayIndex = new Date().getDate() - 1
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.impersinated) {
      const {startDate, endDate} = getStartAndEndDateForCalendar()
      let requestObject = {
        statusId: ALL,
        pageNumber: 1,
        pageSize: 10,
        sortByOrder: 'default',
        sortByColumn: 'default',
        startDate,
        endDate,
        conversationParticipantType: getSelectedPatientInfo() && getSelectedPatientInfo().userType || getUserInfo() && getUserInfo().userType,
        method: 'POST'
    }
      this.props.getPatientVisitDetail(formatYearDate(NEW_DATE_FORMAT), requestObject, INIT, updateNetworkConnectivity);
      this.props.clearImpersination()
    }
  }

  slicedData(data) {
    let sliceData = [...data];
    return sliceData
  };

  onSelectDate = (date, dayIndex) => {
    this.selectedDayIndex = dayIndex

    let currentDate = dayIndex + 1;
    if(currentDate.toString().length < 2){
      currentDate = "0" + currentDate
    }
    let formatDate = this.state.monthlabel.slice(3, 8) + '-' + this.state.monthlabel.slice(0, 2) + '-' + currentDate
    this.setState({
      selectedDate: formatDate,
    }, () => {

      const requestObject = {
        pageNumber: 1,
        pageSize: 10,
        method: 'GET'
    }
      this.props.clearPatientVisit()
      this.props.getPatientVisitDetail(formatDate, requestObject, INIT, updateNetworkConnectivity);
    })
  };
  showallText = () => {
    this.setState({ showall: !this.state.showall });
  }

  goToSPProfile = (id) => {
    let params = {
        id
    }
    this.props.goToSPProfile(params);
}

  onchangeDropdown = (value) => {
    this.setState({ monthlabel: value }, () => {
      this.onSelectDate(null, this.selectedDayIndex)
    }); 
  }
  onTeleHealthPress(data) {
    let dataList = [
      {
        userId: data.serviceProvider.entitySpCoreoHomeUserId,
        participantType: USER_TYPES.SERVICE_PROVIDER,
        participantId: data.serviceProvider.serviceProviderId,
        firstName: data.serviceProvider.firstName,
        lastName: data.serviceProvider.lastName,
        thumbNail: data.serviceProvider.image
      }
    ];
    this.props.createVideoConference(dataList);
  }
  calendarComponent = () => {
    let showMonthsCount = this.state.monthlabel.slice(0, 2);
    let showYearCount = this.state.monthlabel.slice(3, 8);
    return <Calendar
    monthlabel={this.state.monthlabel}
    serviceVisitCount={this.props.serviceVisitCount} 
    onSelectDate={this.onSelectDate} 
    showMonthsCount={showMonthsCount} 
    showYearCount={showYearCount} 
    currentDate={new Date(showYearCount ,showMonthsCount - 1 , getCurrentDate() )} 
    dayIndex={this.state.monthlabel}
    visitData={this.props.patientVisit}
    internet = {this.props.network}
    isClickedOnTodayDate={this.state.isClickedOnTodayDate}
    />;
  }
  onPressConversation(data){
    let userDetails = [{
      userId: data.serviceProvider.entitySpCoreoHomeUserId,
      participantType: USER_TYPES.SERVICE_PROVIDER,
      participantId: data.serviceProvider.serviceProviderId
    }]
    let conversationRequestObject = {
        participantList:userDetails,
        title: null,
        context: null
    }
    this.props.onCreateNewConversation(conversationRequestObject)
  }

  timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onPhonePress = async (data) => {
    if(data === null || data === '' ){
      this.showNoNumberModal();
    }else{
      makeACall(data)
    }
}

  showNoNumberModal = () => {
    this.setState({showNoNumber : true})
}

onPressStartVisit = (id, _onRefresh, isPlanVisit, visitTypeId, spId) => {
  let params = {
      serviceRequestVisitId: id,
      fromDashboard: true,
      _onRefresh: _onRefresh,
      isPlanVisit
  }
  if(visitTypeId === SERVICE_VISIT_STATUS.assesmentVisitStatus){
    params = {
      ...params,
      serviceProviderId: spId,
    }
    this.props.goToAssessmentVisitProcessing(params)
  }else{
    this.props.goToVisitProcessing(params)
  }
}
onClickSummaryDetails = (id, _onRefresh, isPlanVisit) => {
  const params = {
      serviceRequestVisitId: id,
      fromDashboard: true,
      _onRefresh: _onRefresh,
      isPlanVisit
  }
  this.props.goToServiceRequestDetails(params)
}
goToServiceRequestDetails = (params) => {
  this.props.setSPDetails(params.serviceProviderId)
  PATH && this.props.navigateToScreenMainStack(PATH.VISIT_SERVICE_DETAILS, params)
}

hideModal = () => {
  this.setState({
      showNoNumber: false,
  })
}
cancelVisit = (id,isPlanVisit) => {
  this.props.cancelServiceVisit(id, isPlanVisit, () => {
    this.onSelectDate(null, this.selectedDayIndex)
  })
} 
 
  lapsList(data, network, _onRefresh) {
    return this.slicedData(data).map((item) => {
      let serviceTypes = item.servicecategories[0] && item.servicecategories[0].serviceType.map(value => value.serviceTypeDescription)
      serviceTypes = serviceTypes ? serviceTypes.join(', ') : ""
      let params = {
        serviceRequestVisitId: item.serviceRequestVisitId,
        serviceRequestId: item.serviceRequestId,
        _onRefresh: _onRefresh,
        fromDashboard: true,
        statusId: HIRED_STATUS,
        serviceProviderId: item.serviceProvider.serviceProviderId
      }
      if(item.servicePlanVisitId){
        params = {
          ...params,
          servicePlanVisitId: item.servicePlanVisitId,
          planScheduleId: item.planScheduleId,
          isPlanVisit: true
        }
      }
      let visitStatus = null
      let visitProcess = null
      switch(item.visitStatusId){
        case SERVICE_STATES.YET_TO_START:
          visitStatus = "Cancel Visit"
          visitProcess = (id) => {
            this.selectedServiceVisitId = id
            this.isPlanTypeVisit = params.isPlanVisit
            setTimeout(() => {
              this.setState({cancelVisitModal: true})
            }, 1000)
          }
          break
        case SERVICE_STATES.IN_PROGRESS:
          visitStatus = "In-progress"
          visitProcess = this.onPressStartVisit
          break
        case SERVICE_STATES.PAYMENT_PENDING:
          visitStatus = "Payment Pending"
          if(!item.isPaymentModeEnabled){
            visitStatus = "In-progress"
          }
          visitProcess = this.onPressStartVisit
          break
        case SERVICE_STATES.COMPLETED:
          visitStatus = "Visit Summary"
          visitProcess = this.onClickSummaryDetails
          break
        case SERVICE_STATES.CANCELLED:
          visitStatus = "Cancelled"
          visitProcess = () => null
        default:
          break
      }
      let visitTime = getFormatedDate(item.visitStartTime, DATE_FORMATS.HH_MM_A)
      return (
        <TouchableOpacity onPress={() => this.goToServiceRequestDetails(params)} style={styles.topContainer}>
            <View style = {styles.visitTimeView}>
                <Text style = {styles.visitTime}>{visitTime}</Text>
            </View>
            <View style={styles.separatorLine}/>
            <View style={styles.categoryContainer}>
              <View style={styles.upperText}>
                <Text style={styles.categoryText1} numberOfLines={1}>{serviceTypes}</Text>
              </View>
              <TouchableOpacity style={styles.fottorContainer}  onPress={() => this.goToServiceRequestDetails({...params,isProvider:true})}>
                <CoreoProfileImage style={styles.picStyle} pic={item.serviceProvider.entityProviderImage ? { uri: item.serviceProvider.entityProviderImage } : null} />
                <Text style={styles.nameText} numberOfLines={1}>{`${item.serviceProvider.entityProviderFirstName} ${item.serviceProvider.entityProviderLastName}`}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dotsImage}>
              <Popup showModal={true} label1='Phone Call'
                onPhonePress={() => item.serviceProvider && this.onPhonePress(item.serviceProvider.phoneNumber)}
                label2='Conversation' onAsyncPress={() => this.onPressConversation(item)}
                label3='Video Conference' onTelePress={() => this.onTeleHealthPress(item)}
                network={network}
                label4={visitStatus}
                visitProcess={() => { visitProcess((item.serviceRequestVisitId || item.servicePlanVisitId), _onRefresh, item.servicePlanVisitId !== 0, item.visitTypeId, item.serviceProvider && item.serviceProvider.entityProviderId ) }}
              />
            </View>
        </TouchableOpacity>
      )
    })

  }

  getVisitCard(allVisits, props) {
    let visitsObj = CombineVisitsObjectByDate(allVisits)
    if(isEmpty(visitsObj)){
      let currentDateKey = new Date()
      visitsObj[currentDateKey] = []
    }
    let visitEntries = Object.entries(visitsObj);
    return visitEntries.map((item)=>{
      let formattedDate = getFormatedDate(item[0], DATE_FORMATS.MMM_DD_DDD)
      return (
        <View>
          <View style={styles.visitsContainer}>
            <Text style={styles.textContainer}>{formattedDate}</Text>
          </View>
          {item[1].length ? this.lapsList(item[1], this.props.network , this.props._onRefresh)
            :
            !props.isLoading && <EmptyComponent createNewSR={this.props.newSROnPress} navigation={props.navigation} network={props.network} browseServiceProviders = {() =>this.props.navigation.navigate(SERVICE_PROVIDERS)}/>

          }

        </View>
      )
    })
  }

  showMore = () =>{
    const {dashboardRequestObject, selectedStatusId} = this.props
    const {toDayDate} = dashboardRequestObject
    const requestObject = {
      pageSize: 10
    }
    this.props.getPatientVisitDetail(toDayDate,requestObject,LOAD_MORE, updateNetworkConnectivity)
  }

  newServiceRequestBtn(newSROnPress){
    return(
      <CoreoHighlightButton disabled={!this.props.network} onPress={newSROnPress} style={styles.cancelButton} textStyle={styles.textStyle} text={"+ New Request"} />
    )
  }


  render() {
    const monthList= getYearDropDownValues()
    let allVisits = [];
    allVisits = allVisits.concat(this.props.morningVisits, this.props.afternoonVisits, this.props.eveningVisits)
    return (
      <View style={styles.container}>
          {this.newServiceRequestBtn(this.props.newSROnPress)}
          <View style={styles.upperRow}>
            <CoreoText style = {styles.fromText}>From: </CoreoText>
            <Select
                selectedValue={this.state.monthlabel}
                onValueChange={this.onchangeDropdown}
                dataArray={monthList}
                placeholder="Select date"
                enabled={this.props.network}
                selectedLabelColor={THEME_PRIMARY_COLOR}
              />
              <TouchableOpacity style={styles.flex} onPress={this.onPressTodayIcon}>
               <CoreoText style={styles.today}>Today</CoreoText>
              </TouchableOpacity>
        </View>
        {this.calendarComponent()}
        {this.getVisitCard(this.props.patientVisit, this.props)}

        {this.props.network && !this.props.visitCompleted && this.props.patientVisit.length
          ?
          <TouchableOpacity onPress={this.showMore} style={styles.showMoreView}>
            <Text style={styles.showMoreText}>Show More</Text>
            <Icon {...Icons.arrowDown} size={setFontSize(14)} color={BUTTON_COLOR_ENABLED} />
          </TouchableOpacity>
          : null} 
          <ModalPopup
                        visible={this.state.showNoNumber}
                        primaryButton="OK"
                        onConfirm={this.hideModal}
                    >
                        <Text style={styles.message}>No number found.</Text>
                    </ModalPopup>
                    <ModalPopup
                    visible={this.state.cancelVisitModal}
                    primaryButton="YES"
                    secondaryButton="NO"
                    primaryColor={POPUP_PRIMARY_COLOR}
                    secondaryColor={POPUP_SECONDARY_COLOR}
                    onConfirm={() => {
                        this.cancelVisit(this.selectedServiceVisitId, this.isPlanTypeVisit)
                        this.setState({ cancelVisitModal: false })
                    }}
                    onCancel={() => this.setState({
                        cancelVisitModal: !this.state.cancelVisitModal,
                    })}
                >
                    <Text style={styles.message}>Do you want to cancel the visit?</Text>
                </ModalPopup>
      </View>
    );
  };

};


function mapDispatchToProps(dispatch) {
  return {
    onCreateNewConversation: (data) => dispatch(onCreateNewConversation(data)),
    createVideoConference: data => dispatch(createVideoConference(data)),
    getPatientVisitDetail: (date, requestObject, requestType, updateNetworkOnResponse) => dispatch(getPatientVisitDetail(date, requestObject, requestType, updateNetworkOnResponse)),
    navigateToScreenMainStack: (url, params) => dispatch(navigateToScreenMainStack(url, params)),
    goToSPProfile: (params) => dispatch(navigateToScreenMainStack(PATH ? PATH.SERVICE_PROVIDER_PROFILE: null, params)),
    clearImpersination: () => dispatch(clearImpersination()),
    goToVisitProcessing: (data) => dispatch(navigateToScreenMainStack(PATH ? PATH.VISIT_PROCESSING : null, data)),
    goToAssessmentVisitProcessing: (params) => dispatch(navigateToScreenMainStack(PATH ? PATH.ASSESSMENT_VISIT_PROCESSING : null, params)),
    goToServiceRequestDetails: (params) => dispatch(navigateToScreenMainStack(PATH ? PATH.VISIT_HISTORY_SERVICE_DETAILS : null, params)),    
    cancelServiceVisit: (serviceVisitId, isPlanVisit, onSuccess) => dispatch(cancelServiceVisit(serviceVisitId, isPlanVisit, onSuccess)),
    clearPatientVisit: () => dispatch(clearPatientVisit()),
    setSPDetails: (id) => dispatch(setSPDetails(id))
  }
}

function mapStateToProps(state) {
  const dashboardState = state.dashboardState.dashboardState;
  const authState = state.authState.userState
  return {
    patientType:authState.userType,
    patientId: authState.patientId,
    patientVisit: dashboardState.patientVisit,
    morningVisits: dashboardState.morningVisits,
    eveningVisits: dashboardState.eveningVisits,
    afternoonVisits: dashboardState.afternoonVisits,
    serviceVisitCount: dashboardState.serviceVisitCount,
    impersinated: authState.impersinated,
    network: state.networkReducer.network,
    visitCompleted: dashboardState.visitCompleted,
    dashboardRequestObject: state.dashboardState.dashboardState.dashboardRequestObject

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceVisits);
