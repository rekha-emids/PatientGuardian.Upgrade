import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ScrollView, Text, View} from 'react-native'
import {getPerformTasksList, resetPerformTasksState} from '../../../redux/visitSelection/VisitServiceProcessing/PerformTasks/actions'
import Navbar from '../../../components/LevelOne/Navbar';
import { FlowNavigator, CoreoImage } from '../../../components';
import {AssessmentVisitProcessingNavigationData} from '../../../data/VisitProcessingData'
import {getFormatedDate} from '../../../utils/momentUtil'
import PerformTasks from './PerfomTasks/index'
import Summary from '../VisitProcessing/Summary/index'
import styles from './styles'; 
import { SafeView } from '../../../components/LevelOne';
import { Feedback, SubmittedFeedback } from '../..';
import { setValueBasedOnWidth } from '../../../utils/deviceDimensions';
import { isAPIFetching } from '../../../utils/AppAPIUtils';
import { CoreoActiveIndicator } from '../../../components/Base/Preloader/Preloader';
import ErrorBoundaryHOC from '../../../ErrorBoundaryHOC';
import { INIT } from '../../../constants/AppAPIConstants';
import { getServiceProviderRating, getQuestionsList } from '../../../redux/visitHistory/VisitServiceDetails/actions';
import { DATE_FORMATS } from '../../../constants/constants';


export const PatientDetails = (props) => {
    const {serviceProvider, visitDate, slot, disableStyle, onCancelVisit,serviceRequestId} = props
    if(!serviceProvider) return null
    let visitDetails = `${getFormatedDate(visitDate, DATE_FORMATS.DDD)}, ${getFormatedDate(visitDate, DATE_FORMATS.DD_MMM)}`
    return (
        <View style={styles.patientDetailsContainer}>
            <View style={styles.detailsContainer}>
                <Text style={styles.text}>{visitDetails}</Text>
                <Text style={styles.text}>{serviceRequestId}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.patientDetails}>
                <CoreoImage source={{uri: serviceProvider.image}} style={styles.pic} />
                <Text style={[styles.text, styles.name]} numberOfLines={1}>{serviceProvider.firstName} {serviceProvider.lastName}</Text>
                </View>           
            </View>
        </View>
    )
}


class AssessmentVisitProcessing extends Component{
    constructor(props){
        super(props)
        this.state = {
            activeFlowId: 0
        }
    }
    componentWillUnmount(){
        this.props.resetPerformTasksState && this.props.resetPerformTasksState()
        let fromDashboard = this.props.navigation.state.params.fromDashboard;
        let _onRefresh = this.props.navigation.state.params._onRefresh
        if(fromDashboard){
            _onRefresh && _onRefresh(INIT)
        }
    }
    componentDidMount(){
        const {navigation} = this.props
        const {serviceProviderId, serviceRequestVisitId, isPlanVisit} = navigation && navigation.state.params || {}
        this.props.getPerformTasksList(serviceRequestVisitId, isPlanVisit)
        let data = {
            serviceVisitId: serviceRequestVisitId
        }
        this.props.getServiceProviderRating(data, isPlanVisit)
        this.props.getQuestionsList({serviceRequestVisitId,serviceProviderId})
    }

    getRenderComponent = () => {
        const {activeFlowId} = this.state
        const {PerformTasksList, navigation} = this.props
        const {serviceRequestVisitId, isPlanVisit} = navigation.state.params
        switch(activeFlowId){
            case 0:
                return  <PerformTasks questionsList={this.props.questionsList} isPlanVisit={isPlanVisit} onClickNext={this.onClickNext} PerformTasksList={PerformTasksList} />
            case 1:
                return <Summary isPlanVisit={isPlanVisit}  onClickPrev={this.onClickPrev} onClickNext={this.onClickNext} id={serviceRequestVisitId} isAssessment/>
            case 2:
                const {submittedResponse} = this.props
                if(submittedResponse && submittedResponse.length > 0){
                    return <SubmittedFeedback isPlanVisit={isPlanVisit}  hideNavbar={true} />
                }else{
                    return <Feedback isPlanVisit={isPlanVisit}  onClickPrev={this.onClickPrev} hideNavbar={true} />
                }
            }
    }

    onClickPrev = () => {
        const {activeFlowId} = this.state
        this.setState({activeFlowId: activeFlowId > 0 ? activeFlowId-1 : 0})
    }

    onClickNext = () => {
        const {activeFlowId} = this.state
        this.setState({activeFlowId: activeFlowId + 1})
    }

    render(){
        const {PerformTasksList, getPerformTasksStatus} = this.props
        if(isAPIFetching(getPerformTasksStatus)) return <CoreoActiveIndicator />
        if(!PerformTasksList) return null
        const {visitStartTime} = PerformTasksList
        let disableStyle = {}
        if(visitStartTime){
            disableStyle = {opacity: 0.5}
        }
        return(
            <SafeView style={styles.container}>
                <Navbar title="Visit Process" showEmptySave={true} />
                <ScrollView>
                    <PatientDetails
                    visitDate={PerformTasksList.visitDate}
                    slot={PerformTasksList.slot}
                    serviceRequestId={PerformTasksList.serviceRequestVisitNumber || ""}
                     patientDetails={PerformTasksList.patient}
                     disableStyle={disableStyle}
                     serviceProvider={PerformTasksList.serviceProvider}
                     onCancelVisit = {this.onCancelVisit} />
                    <FlowNavigator coreoWizNavigationData={AssessmentVisitProcessingNavigationData} activeFlowId={this.state.activeFlowId}
                    connectorStyle={{ top: setValueBasedOnWidth(11) }}
                     />
                    {this.getRenderComponent()}
                </ScrollView>
            </SafeView>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getQuestionsList: (data) => dispatch(getQuestionsList(data)),
        resetPerformTasksState: () => dispatch(resetPerformTasksState()),
        getPerformTasksList: (data, isPlanVisit) => dispatch(getPerformTasksList(data, isPlanVisit)),
        cancelVisit: (data) => dispatch(cancelVisit(data)),
        getServiceProviderRating: (data, isPlanVisit) => dispatch(getServiceProviderRating(data, null, isPlanVisit))
    }
};

function mapStateToProps(state) {
    let visitSelectionState = state.visitSelectionState;
    return {
        questionsList: state.visitHistoryState && state.visitHistoryState.vistServiceHistoryState.questionsList,
        submittedResponse:  state.visitHistoryState && state.visitHistoryState.vistServiceHistoryState.submittedResponse,
        PerformTasksList: visitSelectionState && state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.PerformTasksList,
        getPerformTasksStatus: visitSelectionState && state.visitSelectionState.VisitServiceProcessingState.PerformTasksState.getPerformTasksStatus
    };
};

export default ErrorBoundaryHOC(connect(mapStateToProps, mapDispatchToProps)(AssessmentVisitProcessing));
