import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text ,Platform} from 'react-native'
import styles from './styles'
import { CoreoScrollView } from '../../../../components';
import Navbar from '../../../../components/LevelOne/Navbar';
import {_, getFirstCharOfString} from '../../../../utils/validations' 
import Icons from '../../../../assets/images/Icons';
import Icon from '../../../../components/Base/Icon';
import { setFontSize } from '../../../../utils/deviceDimensions';
import { SafeView } from '../../../../components/LevelOne';
import ErrorBoundaryHOC from '../../../../ErrorBoundaryHOC';
import { USER_TYPES } from '../../../../constants/constants';

export const Question = (props) => {
    const {index, question,selectedAnswer, answerTypeDescription, feedbackAlertStatus, feedbackAlertUserType} = props
    let answersComponents = <View style={[styles.optionContainer, feedbackAlertUserType && feedbackAlertStatus ? styles.alertQuestion : {}]}>
                            <Text style={styles.optionText}>{selectedAnswer}</Text>
                        </View>
    if(answerTypeDescription === "OpenText"){
        answersComponents = <View style={styles.inputStyle}>
                            <Text style={styles.optionText}>{selectedAnswer}</Text>
                        </View>
    }
    return (
        <View>
            <Text style={[styles.questionText, feedbackAlertUserType && feedbackAlertStatus ? styles.alertQuestionText : {}]}>
                {index + 1}. {question}
            </Text>
            {answersComponents}
        </View>
    )
}

class SubmittedFeedback extends Component{
    constructor(props){
        super(props)
        const {navigation} = props
        this.feedbackAlertUserType = navigation && navigation.state && navigation.state.params ? navigation.state.params.feedbackAlertUserType : {}
    }

    renderQuestions = () => {
        const {submittedResponse} = this.props
        let content = submittedResponse.map((question, index) => {
            return (
                <Question
                    {...question}
                    feedbackAlertUserType={this.feedbackAlertUserType}
                    index={index}
                />
            )
        })
        return content
    }

    rating = () => {
        const {submittedResponse} = this.props
        if(!submittedResponse) return null
        let starsCount = 5;
        let stars = []
        let selectedStar = Platform.OS === "ios" ? Icons.starIos : Icons.starAndroid
        let starOutline = Platform.OS === "ios" ? Icons.starAndroidOutling : Icons.starIosOutline
        for(let index = 0; index < starsCount; index++){
            if(index < submittedResponse[0].rating)
            {
                stars.push(
                <View style={styles.margin}>
                    <Icon {...selectedStar} color="#ffe623" size={setFontSize(24)} />
                </View>
            )
            }else{
                stars.push(
                <View style={styles.margin}>
                     <Icon {...starOutline} color="#ffe623" size={setFontSize(24)} /> 
                </View>)
            }
        }
        return (
            <View style={styles.stars}>
                {stars}
            </View>
        )
    }

    render(){
        const {hideNavbar, details} = this.props
        let {serviceProvider} = details
        serviceProvider = serviceProvider || {}
        const isServiceProvider = this.feedbackAlertUserType === USER_TYPES.SERVICE_PROVIDER
        return (
            <SafeView>
            <CoreoScrollView style={styles.mainContainer}>
                {!hideNavbar ? <Navbar showEmptyAdd title="Feedback" /> : null}
                <View style={styles.container}>
                    {isServiceProvider ? null : <Text style={styles.questionText}>Rated {serviceProvider.firstName} {serviceProvider.lastName && getFirstCharOfString(serviceProvider.lastName)}</Text>}
                    {isServiceProvider ? null : this.rating()}
                    {this.renderQuestions()}
                </View>
            </CoreoScrollView>
            </SafeView> 
        )
    }
}


function mapStateToProps(state) {
    return {
        submittedResponse:  state.visitHistoryState.vistServiceHistoryState.submittedResponse,
        details: state.visitSelectionState.VisitServiceProcessingState.SummaryState.SummaryDetails,
    };
};

export default ErrorBoundaryHOC(connect(mapStateToProps, null)(SubmittedFeedback));