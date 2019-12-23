import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Platform, TouchableOpacity,Text} from 'react-native'
import Navbar from '../../../components/LevelOne/Navbar';
import { CoreoScrollView, CoreoText, CoreoOpacityButton } from '../../../components';
import {SummaryPaymentDetails} from '../../VisitSelection/VisitProcessing/Summary/index'
import {PeformedTasks} from '../../VisitSelection/VisitProcessing/PerfomTasks/index'
import {navigateToScreenMainStack} from '../../../redux/navigation/actions'
import {getServiceProviderRating, resetVisitHistory, getQuestionsList, clearAssessmentState} from '../../../redux/visitHistory/VisitServiceDetails/actions'
import {getSummaryDetails} from '../../../redux/visitSelection/VisitServiceProcessing/Summary/actions'
import ProgressBar from '../../../components/LevelOne/ProgressBar';
import { setValueBasedOnWidth, setFontSize } from '../../../utils/deviceDimensions';
import {getPrintDateFormat} from '../../../utils/momentUtil'
import styles from './styles'
import Icon from '../../../components/Base/Icon';
import Icons from '../../../assets/images/Icons';
import { PATH } from '../../../routes';
import { SafeView } from '../../../components/LevelOne';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';
import withInterationManager from '../../../components/LevelOne/NavigationHOC/index'
import CoreoImage, { CoreoProfileImage } from '../../../components/Base/Image/Image';
import { isAPIFetching } from '../../../utils/AppAPIUtils';
import { CoreoActiveIndicator } from '../../../components/Base/Preloader/Preloader';
import { USER_TYPES } from '../../../constants/constants';
import { Question } from './AssesmentQuestion';
import {_} from '../../../utils/validations'
import { assessmentIcon } from '../../../assets/images';
import { getSlot } from '../../../utils/appUtils';

const PROGRESSBAR_WIDTH = setValueBasedOnWidth(150)

class VisitHistoryServiceDetails extends Component {
    constructor(props){
        super(props)
        this.state = {
            openedTasks: {},
            isAccordianOpen:false,
            selectedQuestionCount:0,
            totalQuestionCount:0
        }
    }

    componentDidMount(){
        const {navigation} = this.props
        const {serviceRequestVisitId, feedbackAlertUserType, isPlanVisit,isAssesmentVisit,serviceProviderId} = navigation.state.params
        this.props.getSummaryDetails(serviceRequestVisitId, isPlanVisit)
        isAssesmentVisit && this.props.getQuestionsList({serviceRequestVisitId,serviceProviderId})
        let data = {
            serviceVisitId: serviceRequestVisitId
        }
        this.props.getServiceProviderRating(data, feedbackAlertUserType, isPlanVisit)
    }

    componentWillReceiveProps(nextProps) {
        if(_.isNil(this.props.questionsList) && !_.isNil(nextProps.questionsList)){
            let totalQuestionCount = nextProps.questionsList.length
            let selectedQuestionCount = nextProps.questionsList.filter(question => 
                question.selectedAnswer && question.selectedAnswer.length>0 ).length

            this.setState({
                selectedQuestionCount,
                totalQuestionCount
            })
        }
    }

    componentWillUnmount(){
        this.props.resetState()
        this.props.clearAssessmentState();
    }

    onPressTask = (id) => {
        let openedTasks = {...this.state.openedTasks}
        if(openedTasks[id]){
            delete openedTasks[id]
            this.setState({openedTasks})
        }else{
            this.setState({openedTasks: {...openedTasks, [id]: id}})
        }
    }

    renderFeedback = () => {
        let selectedStar = Platform.OS === "ios" ? Icons.starIos : Icons.starAndroid
        const {submittedResponse, navigation} = this.props
        const {feedbackAlertUserType, isPlanVisit} = navigation && navigation.state && navigation.state.params
        if(submittedResponse && submittedResponse.length > 0){
            if(feedbackAlertUserType === USER_TYPES.SERVICE_PROVIDER){
                return (
                    <View style={styles.itemTitleContainer}>
                        <CoreoOpacityButton onPress={() => {this.props.goToSubmittedFeedback({feedbackAlertUserType})}} text={"Show Feedback"} textStyle={styles.scheduleHeading} />
                    </View>
                )
            }
            return (
                <View>
                    <View style={styles.itemTitleContainer}>
                        <CoreoText style={styles.text}>Submitted rating</CoreoText>
                        <CoreoOpacityButton onPress={()=>{this.props.goToSubmittedFeedback({feedbackAlertUserType})}} text={"Show Feedback"} textStyle={styles.scheduleHeading} />
                    </View>
                    <View style={styles.ratingContainer}>
                        <Icon {...selectedStar} color="#ffe623" size={setFontSize(20)} />
                        <CoreoText style={[styles.text, styles.rating]}>{submittedResponse[0].rating}</CoreoText>                   
                    </View>
                </View>
            )
        }
        return (
            <View style={styles.feedbackContainer}>
                <CoreoText style={styles.text}>Your Feedback is pending. Click</CoreoText>
                <CoreoOpacityButton onPress={() => {this.props.goToFeedback({isPlanVisit})}} textStyle={styles.scheduleHeading} text={" HERE "} />
                <CoreoText style={styles.text}>to submit feedback.</CoreoText>
            </View>
        )
    }

    onAccordianPress  = () => {
        this.setState({
            isAccordianOpen:!this.state.isAccordianOpen
        })
    }

    renderQuestionaire = () => {
        const { questionsList } = this.props
        return questionsList && questionsList.map((question,index) => {
            return  <Question
            key={index}
            {...question}
            index={index}
            editable={false}/>
        })

    }

    getAssessmentTask = () => {
        let icon = Icons.arrowDown
        let content = null
        if(this.state.isAccordianOpen){
            icon = Icons.arrowUp
            content = this.renderQuestionaire()
        }

        return <View>
            <TouchableOpacity onPress={this.onAccordianPress} style={styles.service}>
                <View style={styles.serviceDetails}>
                    <CoreoImage source={assessmentIcon} style={styles.serviceIcon} />
                    <View>
                        <Text style={styles.text}>Assesment</Text>
                        <View style={styles.tasksStatus}>
                            <Text style={[styles.text, styles.timerText]}>{this.state.selectedQuestionCount}</Text>
                            <Text style={styles.text}>/{this.state.totalQuestionCount}
                                <Text style={styles.taskCompleted}> task(s) completed</Text>
                            </Text>
                        </View>
                    </View>
                </View>
                <Icon {...icon} size={setFontSize(18)} />
            </TouchableOpacity>
            {this.state.isAccordianOpen && <View style={[styles.divider,styles.dividerMargin]} />}
            <View>
                {content}
            </View>
            <View style={styles.divider} />
        </View>
    }

    render () {
        const {SummaryDetails, CalculationsData, getSummaryDetailsStatus, navigation} = this.props
        const {feedbackAlertUserType,serviceRequestVisitId,isAssesmentVisit, isESP} = navigation.state.params
        if(isAPIFetching(getSummaryDetailsStatus)) return <CoreoActiveIndicator />
        if(!SummaryDetails) return null
        let titleData = SummaryDetails.serviceRequestTypeVisits.map((item) => {
            return item.serviceTypeDescription;
        });
        let visitDetails = SummaryDetails.slotDescription ? `${getPrintDateFormat(SummaryDetails.visitDate)}, ${getSlot(SummaryDetails.slotDescription)}` : getPrintDateFormat(SummaryDetails.visitDate) 
        let visitStartDetails = getPrintDateFormat(SummaryDetails.visitStartTime)        
        const percentage = Math.round((SummaryDetails.totalTaskCompleted/SummaryDetails.totalTask) * 100)
        let progressBarWidth = PROGRESSBAR_WIDTH * (percentage / 100)
        let onClickProfilePicture =  () =>{}
        let image = null
        let name = ''
        if(SummaryDetails && SummaryDetails.serviceProvider){
            let serviceProvider = SummaryDetails.serviceProvider
            onClickProfilePicture = () => {
                this.props.goToSp({id: serviceProvider.serviceProviderId, IsEntityUser: false})
            }
            image = serviceProvider.image
            name = serviceProvider.firstName + " " + serviceProvider.lastName
        }
      
        if(feedbackAlertUserType && SummaryDetails && feedbackAlertUserType === USER_TYPES.SERVICE_PROVIDER) {
            let patient = SummaryDetails.patient
            onClickProfilePicture = () => {
                let params = {
                    id: patient.patientId,
                    userType: USER_TYPES.PATIENT,
                    canEditable: false
                }
                this.props.goToPatientProfile(params)
            }
            image = patient.imageString || null
            name = patient.firstName + " " +patient.lastName
        }

        const isEntity = SummaryDetails.serviceProvider && (SummaryDetails.serviceProvider.isEntityServiceProvider || SummaryDetails.serviceProvider.isEntityUser)
        return(
            <SafeView>
                <Navbar showEmptyAdd title={"Visit Id " + (SummaryDetails.serviceRequestVisitNumber || "")} />
                <CoreoScrollView style={styles.tabContent}>
                    <View style={styles.section}>
                        <View style={styles.itemTitleContainer}>
                            <CoreoText style={styles.text}>{visitDetails}</CoreoText>
                        </View>
                        <View style={styles.marginVertical}>
                            <View style={styles.divider} />
                        </View>
                        <TouchableOpacity onPress={onClickProfilePicture} style={styles.details}>
                            <CoreoProfileImage 
                            pic={{uri: image}}
                            style={styles.image} />
                            <CoreoText style={styles.text}>{name}</CoreoText>
                        </TouchableOpacity>
                    </View>
                    <CoreoText style={styles.heading}>{isEntity ? "Service Details" :  "Service Visit Details"}</CoreoText>
                    <View style={styles.section}>
                        <CoreoText style={styles.text}>{titleData.join(', ')}</CoreoText>
                        {/* <CoreoText style={styles.disableTextStyle}>{SummaryDetails.serviceCategoryDescription}</CoreoText> */}
                        <View style={styles.marginVertical}>
                            <View style={styles.detailsContainer}>
                                <CoreoText style={styles.text}>Actual Visit Date</CoreoText>
                                <CoreoText style={styles.text}>{visitStartDetails}</CoreoText>
                            </View>
                            <View style={styles.detailsContainer}>
                                <CoreoText style={styles.text}>Visit Duration (HH:MM)</CoreoText>
                                <CoreoText style={styles.text}>{CalculationsData.uiTotalChargableTime}</CoreoText>
                            </View>
                            <View style={styles.detailsContainer}>
                                <CoreoText style={styles.text}>Tasks</CoreoText>
                                <View style={styles.tasksContainer}>
                                    <ProgressBar progressStyle={{width: progressBarWidth, backgroundColor: THEME_PRIMARY_COLOR }} containerStyle={{width: PROGRESSBAR_WIDTH}} />
                                    <CoreoText style={styles.text}>{isNaN(percentage)?0:percentage} %</CoreoText>
                                </View>
                            </View>
                        </View>
                        <View style={styles.divider} />
                        {isAssesmentVisit ? this.getAssessmentTask() :<PeformedTasks 
                            imageKey={"serviceTypeId"} 
                            openedTasks={this.state.openedTasks} 
                            onPressTask={this.onPressTask} 
                            performTasksList={SummaryDetails} />}
                    </View>
                    {!isESP && <View><CoreoText style={styles.heading}>Payment Details</CoreoText>
                                <SummaryPaymentDetails
                                    CalculationsData={CalculationsData}
                                    summaryDetails={SummaryDetails}
                                    removeTitle={true}
                                />
                            </View>}
                    <CoreoText style={[styles.heading, styles.marginTop]}>Feedback</CoreoText>
                    <View style={styles.section}>
                        {this.renderFeedback()}
                    </View>
                </CoreoScrollView>
            </SafeView>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getQuestionsList: (data) => dispatch(getQuestionsList(data)),
        clearAssessmentState: () => dispatch(clearAssessmentState()),
        resetState:() => dispatch(resetVisitHistory()),
        goToSp : (data) => dispatch(navigateToScreenMainStack(PATH.SERVICE_PROVIDER_PROFILE, data)),
        getSummaryDetails: (data, isPlanVisit) => dispatch(getSummaryDetails(data, isPlanVisit)),
        goToFeedback: (params) => dispatch(navigateToScreenMainStack(PATH.FEEDBACK, params)),
        goToSubmittedFeedback: (params) => dispatch(navigateToScreenMainStack(PATH.SUBMITTED_FEEDBACK, params)),
        getServiceProviderRating: (data, feedbackAlertUserType, isPlanVisit) => dispatch(getServiceProviderRating(data, feedbackAlertUserType, isPlanVisit)),
        goToPatientProfile: (params) => dispatch(navigateToScreenMainStack(PATH.PROFILE, params))
    }
}

const mapStateToProps = (state) => {
    let visitSelectionState = state.visitSelectionState
    return {
        questionsList: state.visitHistoryState.vistServiceHistoryState.questionsList,
        getSummaryDetailsStatus: visitSelectionState && state.visitSelectionState.VisitServiceProcessingState.SummaryState.getSummaryDetailsStatus,
        SummaryDetails: visitSelectionState && state.visitSelectionState.VisitServiceProcessingState.SummaryState.SummaryDetails,
        CalculationsData: visitSelectionState && state.visitSelectionState.VisitServiceProcessingState.SummaryState.CalculationsData,
        submittedResponse:  state.visitHistoryState && state.visitHistoryState.vistServiceHistoryState.submittedResponse,
        isLoading: state.loadingState && state.loadingState.isLoading,

    }
}

export default withInterationManager(connect(mapStateToProps, mapDispatchToProps)(VisitHistoryServiceDetails))
