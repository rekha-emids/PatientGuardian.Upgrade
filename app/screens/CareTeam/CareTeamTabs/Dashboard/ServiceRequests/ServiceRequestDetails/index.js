import React, { Component } from 'react';
import { View, Text } from 'react-native';
import CoreoCard from '../../../../../../components/LevelOne/CoreoCard';
import { CoreoText,  CoreoImage, CoreoScrollView, Navbar } from '../../../../../../components';
import styles from './styles'
import {  setFontSize } from '../../../../../../utils/deviceDimensions';
import { getServiceOfferedImage } from '../../../../../../utils/appUtils'
import {connect} from 'react-redux'
import { DATE_FORMATS } from '../../../../../../constants/constants';
import AvailableDays from '../../../../../../screens/VisitSelection/VisitServiceDetails/components/ServiceTypeDetails/AvailableDays.js'
import {getServiceRequestDetails, approveOrDeclineServiceRequest} from '../../../../../../redux/careTeam/Dashboard/actions'
import {_} from '../../../../../../utils/validations'
import { getFormatedDate, getFormatedMonthAndDate } from '../../../../../../utils/momentUtil';
import SortFilterBar from '../../../Components/SortFilterBar';
import { THEME_PRIMARY_COLOR } from '../../../../../../constants/theme';
import images from '../../../../../../assets/images';
import { SafeView } from '../../../../../../components/LevelOne';

const PostedByContent = (props) => {
    const {serviceProvider, requestDate, serviceRequestId} = props
    let date = getFormatedMonthAndDate(requestDate)
    return (
        <View style={styles.postedContainer}>
        <View style={styles.header}>
            <Text style={styles.postedByText}>Service Provider</Text>
            <CoreoText style={styles.name}>SR{serviceRequestId}</CoreoText>
        </View>
            <View style={styles.patientDetailsContainer}>
                <View style={styles.picAndDetails}>
                    <CoreoImage source={serviceProvider.image ? {uri: serviceProvider.image}: images.profile_icon} style={styles.pic} />
                    <View>
                        <Text style={styles.name}>{serviceProvider.firstName} {serviceProvider.lastName}</Text>
                        <Text style={styles.name}>Posted on {date}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

class ServiceRequestDetails extends Component {
    serviceRequestId = -1
    requestObject = {}
    constructor(props){
        super(props)
        this.state = {
            selectedServiceTypeId: -1
        }
    }
    componentDidMount(){
        const {navigation} = this.props
        const {serviceRequestId, requestObject} = navigation && navigation.state.params || {}
        this.serviceRequestId = serviceRequestId
        this.requestObject = requestObject
        this.props.getServiceRequestDetails(this.serviceRequestId)
    }

    onPressApprove = () => {
        this.props.onApproveOrDecline(this.serviceRequestId, 1, this.requestObject)
    }

    onPressDecline = () => {
        this.props.onApproveOrDecline(this.serviceRequestId,0, this.requestObject)
    }


    renderSPPreferences = () => {
        const {serviceRequestDetails} = this.props
        const {genderPreference, minimumServiceProviderExperience, maximumServiceProviderExperience} = serviceRequestDetails
        return (
                <View>
                    <CoreoText style={[styles.heading]}>
                        Geneder
                </CoreoText>
                    <CoreoText style={[styles.taskText]}>
                        {genderPreference}
                </CoreoText>
                <CoreoText style={[styles.heading]}>
                        Experience
                </CoreoText>
                    <CoreoText style={[styles.taskText]}>
                        {minimumServiceProviderExperience} - {maximumServiceProviderExperience} yrs
                </CoreoText>
            </View>
        )
    }

    renderAddress = () => {
        const {serviceRequestDetails} = this.props
        const {patientAddressId, patient} = serviceRequestDetails
        let addresses = patient.patientAddresses.filter(address => address.patientAddressId === patientAddressId)
        let address = addresses.length > 0 ? addresses[0] : {}
        return(
            <View>
                <View style={styles.addressItem}>
                <CoreoText style={[styles.heading]}>Street</CoreoText>
                <CoreoText style={[styles.addressValue]}>{address.streetAddress}</CoreoText>
                </View>
                <View style={styles.addressItem}>
                <CoreoText style={[styles.heading]}>City</CoreoText>
                <CoreoText style={[styles.addressValue]}>{address.city}</CoreoText></View>
                <View style={styles.addressItem}><CoreoText style={[styles.heading]}>State</CoreoText>
                <CoreoText style={[styles.addressValue]}>{address.stateName}
                </CoreoText>
                </View>
                <View style={styles.addressItem}>
                <CoreoText style={[styles.heading]}>Zip
                </CoreoText>
                <CoreoText style={[styles.addressValue]}>{address.zipCode}
                </CoreoText>
                </View>
            </View>
        )
    }

    renderServiceTasks = () => {
        if(this.state.selectedServiceTypeId === -1) return null
        const {serviceRequestDetails} = this.props
        const {serviceRequestTypeDetails} = serviceRequestDetails
        let serviceTasks = serviceRequestTypeDetails.filter(service => service.serviceTypeId === this.state.selectedServiceTypeId)[0]
        let taskList = null
        let counter = 0;
        taskList = serviceTasks && serviceTasks.serviceRequestTypeTaskDetails && serviceTasks.serviceRequestTypeTaskDetails.map((task, i) => {
            counter++
            return (
                <View style={styles.tasksContainer}>
                    <View style={styles.countBg}>
                        <CoreoText style={styles.count}>{counter}</CoreoText>
                    </View>
                    <CoreoText style={styles.taskText}>{task.serviceTaskDescription}</CoreoText>
                </View>
            )
        })
        if (!taskList) return null
        return (
            <View>
                {taskList}
            </View>
        )
    }

    render() {
        const {serviceRequestDetails, navigation} = this.props
        const {hideApprove} = navigation.state.params
        const srDetailsTitle = "Request ID "+this.serviceRequestId
        if(_.isNil(serviceRequestDetails)) return null
        const {serviceRequestTypeDetails, serviceRequestDescription,occurence, isRecurring} = serviceRequestDetails

        const serviceTypeCard = serviceRequestTypeDetails && serviceRequestTypeDetails.map((service, i) => {
            return (
                <View key={i} style={styles.boxStyle}>
                    <CoreoImage
                        source={getServiceOfferedImage("serviceType" + service.serviceTypeId)}
                    />
                    <CoreoText style={[styles.textStyle, { fontSize: setFontSize(12), color: '#444444' }]}>{service.serviceTypeDescription}</CoreoText>
                </View>
            )
        })
        let scheduleType = "One time schedule"
        let occurance = getFormatedDate(ServiceRequestDetails.startDate, DATE_FORMATS.MMM_DD_YYYY)
        if(isRecurring){
            scheduleType = "Recurring schedule"
            if(occurence > 0){
                occurance = getFormatedDate(ServiceRequestDetails.startDate, DATE_FORMATS.MMM_DD_YYYY) + " - "  + occurence + " occurrences"
            }else {
                occurance = getFormatedDate(ServiceRequestDetails.startDate, DATE_FORMATS.MMM_DD_YYYY) + " - "  + getFormatedDate(ServiceRequestDetails.endDate, DATE_FORMATS.MMM_DD_YYYY)
            }
        }
        return (
        <SafeView>
        <View style={styles.container}>
            <Navbar title={hideApprove ? srDetailsTitle : "Approve Request"} />
            <CoreoScrollView style={styles.scrollContainer}>
            <PostedByContent
                serviceProvider={serviceRequestDetails.serviceProvider}
                requestDate={serviceRequestDetails.requestDate}
                serviceRequestId={this.serviceRequestId}
            />
                <CoreoCard style={styles.cardStyle}>
                    <CoreoText style={styles.textStyle}>
                        Service Category
                    </CoreoText>
                </CoreoCard>
                <CoreoCard style={[styles.cardStyle, { backgroundColor: '#ffffff' }]}>
                    <CoreoText style={[styles.textStyle, styles.taskText]}>
                        {serviceRequestDetails.serviceCategoryDescription}
                    </CoreoText>
                </CoreoCard>

                <CoreoCard style={styles.cardStyle}>
                    <CoreoText style={styles.textStyle}>
                        Service Type
                    </CoreoText>
                </CoreoCard>

                <CoreoCard style={[styles.cardStyle, { backgroundColor: '#ffffff' }]}>
                    <CoreoScrollView horizontal={true} style={{flexDirection:'row'}}>
                    {serviceTypeCard}
                    </CoreoScrollView>
                </CoreoCard>

                <CoreoCard style={styles.cardStyle}>
                        <CoreoText style={styles.textStyle}>
                            Additional Information
                    </CoreoText>
                </CoreoCard>

                <CoreoCard style={[styles.cardStyle, { backgroundColor: '#ffffff' }]}>
                        <CoreoText style={[styles.textStyle, styles.taskText]}>
                         {serviceRequestDescription}
                        </CoreoText>
                </CoreoCard>

                <CoreoCard style={styles.cardStyle}>
                        <CoreoText style={styles.textStyle}>
                            Schedule and Frequency
                        </CoreoText>
                </CoreoCard>

                <CoreoCard style={[styles.cardStyle,styles.whiteCardStyle]}>
                    <CoreoText style={styles.heading}>{scheduleType}</CoreoText>
                    <CoreoText style={styles.taskText}>{occurance}</CoreoText>
                    <AvailableDays availableDays={serviceRequestDetails.serviceRequestSlot && serviceRequestDetails.serviceRequestSlot} />
                </CoreoCard>

                <CoreoCard style={styles.cardStyle}>
                        <CoreoText style={styles.textStyle}>
                            Point Of Service
                        </CoreoText>
                </CoreoCard>

                <CoreoCard style={[styles.cardStyle,styles.whiteCardStyle]}>
                    {this.renderAddress()}
                </CoreoCard>
            </CoreoScrollView>
            {hideApprove ? null : <SortFilterBar
            firstButtonTitle="Decline"
            secondButtonTitle="Approve"
            toggleSort={this.onPressDecline}
            toggleFilter={this.onPressApprove}
            showFirstButton={true}
            textStyle={{color: THEME_PRIMARY_COLOR}}
        />}
        </View>
        </SafeView>
            )
    }
}

function mapDispatchToProps(dispatch) {
    return{
        getServiceRequestDetails: (id) => dispatch(getServiceRequestDetails(id)),
        onApproveOrDecline: (id, status, requestObject) => dispatch(approveOrDeclineServiceRequest(id, status, requestObject))
    }
}

function mapStateToProps(state) {
    return {
        serviceRequestDetails: state.careTeamState && state.careTeamState.dashboardState.serviceRequestDetails,
    };
}
        
export default connect (mapStateToProps,mapDispatchToProps)(ServiceRequestDetails)