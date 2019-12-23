import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, TouchableOpacity} from 'react-native'
import {getSummaryDetails} from '../../../../redux/visitSelection/VisitServiceProcessing/Summary/actions'
import styles from './styles';
import ProgressBar from '../../../../components/LevelOne/ProgressBar';
import { setValueBasedOnWidth } from '../../../../utils/deviceDimensions';
import { SafeView } from '../../../../components/LevelOne';
import { isAPIFetching } from '../../../../utils/AppAPIUtils';
import { CoreoActiveIndicator } from '../../../../components/Base/Preloader/Preloader';
import {getPrintDateFormat } from '../../../../utils/momentUtil';

const PROGRESSBAR_WIDTH = setValueBasedOnWidth(100)


 export const ServiceVisitDetails = (props) => {
    const {summaryDetails, CalculationsData} = props
    let serviceCategories = ""

    summaryDetails.serviceRequestTypeVisits.map((service, index) => {
        let prefix = index !== summaryDetails.serviceRequestTypeVisits.length - 1 ? ", " : ""

        serviceCategories += service.serviceTypeDescription + prefix
    })
    const percentage = Math.round(summaryDetails.totalTaskCompleted / summaryDetails.totalTask * 100)
    let progressBarWidth = PROGRESSBAR_WIDTH * (percentage / 100)
    const {totalChargableTime} = CalculationsData
    const isEntity = summaryDetails.serviceProvider && (summaryDetails.serviceProvider.isEntityServiceProvider || summaryDetails.serviceProvider.isEntityUser)
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.heading}>{props.isAssessment || isEntity ? "Service Details" : "Service Visit Details"}</Text>
            <View style={[styles.detailsContainer]}>
                <Text style={styles.text}>Service Type(s)</Text>
                <Text style={[styles.text, styles.flex]} numberOfLines={1}>{props.isAssessment ? "Assessment" : serviceCategories}</Text>
            </View>
            {props.isAssessment ? null : <View style={styles.detailsContainer}>
                <Text style={styles.text}>Service Category</Text>
                <Text style={styles.text}>{summaryDetails.serviceCategoryDescription}</Text>
            </View>}
            <View style={styles.detailsContainer}>
                <Text style={styles.text}>Visit Length (HH:MM)
                </Text>
                <Text style={styles.text}>{totalChargableTime}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.text}>Tasks</Text>
                <View style={styles.progressContainer}>
                    <ProgressBar containerStyle={{width: PROGRESSBAR_WIDTH}} progressStyle={{width: progressBarWidth}} />
                    <Text style={styles.text}>{percentage} %</Text>
                </View>
            </View>
        </View>
    )
}

export const SummaryPaymentDetails = (props) => {
    const {summaryDetails, removeTitle} = props
    let paymentDetails = getPrintDateFormat(summaryDetails.paymentDate)

    return (
        <View style={[styles.cardContainer, styles.shadow]}>
            {removeTitle ? null : <Text style={styles.heading}>Payment Details</Text>}
            <View style={styles.detailsContainer}>
                <Text style={[styles.text]}>Payment Date
                </Text>
                <Text style={[styles.text]}>{paymentDetails}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.text}>Billable Time (HH:MM)
                </Text>
                <Text style={styles.text}>{summaryDetails.billedTotalDuration.substring(0, 5)}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.text}>Hourly Rate</Text>
                <Text style={styles.text}>${summaryDetails.hourlyRate ? parseFloat(summaryDetails.hourlyRate).toFixed(2) : "0.00"}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.text}>Total Visit Cost</Text>
                <Text style={styles.text}>${parseFloat(summaryDetails.billedPerService).toFixed(2)}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.text}>Taxes and Fees</Text>
                <Text style={styles.text}>${parseFloat(summaryDetails.taxPaid).toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailsContainer}>
                <Text style={styles.text}>Total Cost</Text>
                <Text style={styles.text}>${parseFloat(summaryDetails.billedPerService + summaryDetails.taxPaid).toFixed(2)}</Text>
            </View>
            <View style={styles.border}>
            <View style={styles.detailsContainer}>
                <Text style={styles.text}> Estimated Claim</Text>
                <Text style={styles.text}>${summaryDetails.estimatedClaim ? parseFloat(summaryDetails.estimatedClaim.toFixed(2)) : "0.00"}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.text}>Credit Card Payment</Text>
                <Text style={styles.text}>${summaryDetails.outOfPocketAmount ? parseFloat(summaryDetails.outOfPocketAmount.toFixed(2)) : "0.00"}</Text>
            </View>
            </View>
        </View>
    )
}

export const PaymentDetails = (props) => {
    const {isAssessment, CalculationsData, summaryDetails} = props
    const isEntity = summaryDetails.serviceProvider && (summaryDetails.serviceProvider.isEntityServiceProvider || summaryDetails.serviceProvider.isEntityUser)

    if(isAssessment){
        return (
            <View style={styles.cardContainer}>
                <Text style={styles.heading}>Visit Details</Text>
                <View style={styles.detailsContainer}>
                    <Text style={styles.text}>Billable Time (HH:MM)
                    </Text>
                    <Text style={styles.text}>{CalculationsData.totalChargableTime}</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.heading}>{isEntity ? "Visit Details" : "Payment Details"}</Text>
            <View style={styles.detailsContainer}>
            <Text style={styles.text}>{isEntity ? "Total Duration" : "Billable Time"} (HH:MM) </Text>
            <Text style={styles.text}>{CalculationsData.totalChargableTime}</Text>
            </View>

            {isEntity ? null :
            <View>
            <View style={styles.detailsContainer}>
                <Text style={styles.text}>Hourly Rate</Text>
                <Text style={styles.text}>${summaryDetails.hourlyRate ? parseFloat(summaryDetails.hourlyRate).toFixed(2) : "0.00"}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.text}>Total Visit Cost</Text>
                <Text style={styles.text}>${parseFloat(CalculationsData.totalVisitCost).toFixed(2)}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.text}>Taxes and Fees</Text>
                <Text style={styles.text}>${parseFloat(CalculationsData.taxes).toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailsContainer}>
                <Text style={styles.text}>Total Cost</Text>
                <Text style={styles.text}>${parseFloat(CalculationsData.grandTotalAmount).toFixed(2)}</Text>
            </View>
            <View style={styles.border}>
                <View style={styles.detailsContainer}>
                    <Text style={styles.text}> Estimated Claim</Text>
                    <Text style={styles.text}>${summaryDetails.estimatedClaim ? parseFloat(summaryDetails.estimatedClaim.toFixed(2)) : "0.00"}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.text}>Credit Card Payment</Text>
                    <Text style={styles.text}>${summaryDetails.outOfPocketAmount ? parseFloat(summaryDetails.outOfPocketAmount.toFixed(2)) : "0.00"}</Text>
                </View>
            </View>
            </View>}
        </View>
    )
}

class Summary extends Component {
    componentDidMount(){
        this.props.getSummaryDetails(this.props.id, this.props.isPlanVisit)
    }

    render(){
        const {getSummaryDetailsStatus, SummaryDetails, CalculationsData, onClickPrev, onClickNext} = this.props

        if (isAPIFetching(getSummaryDetailsStatus)) {
            return <CoreoActiveIndicator />
        }
        if (!SummaryDetails) {
            return null 
        }
        return (
            <SafeView>
                <ServiceVisitDetails summaryDetails={SummaryDetails} CalculationsData={CalculationsData} isAssessment={this.props.isAssessment}/>
                <PaymentDetails CalculationsData={CalculationsData} summaryDetails={SummaryDetails} isAssessment={this.props.isAssessment}/>
                <View style={[styles.cardContainer, styles.buttonsContainer]}>
                   <TouchableOpacity onPress={onClickPrev}>
                        <Text style={styles.buttonText}>Prev</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={onClickNext}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </SafeView>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {getSummaryDetails: (data, isPlanVisit) => dispatch(getSummaryDetails(data, isPlanVisit))}
}

function mapStateToProps(state) {
    let visitSelectionState = state.visitSelectionState

    return {
        getSummaryDetailsStatus: visitSelectionState && state.visitSelectionState.VisitServiceProcessingState.SummaryState.getSummaryDetailsStatus,
        SummaryDetails: visitSelectionState && state.visitSelectionState.VisitServiceProcessingState.SummaryState.SummaryDetails,
        CalculationsData: visitSelectionState && state.visitSelectionState.VisitServiceProcessingState.SummaryState.CalculationsData
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary)
