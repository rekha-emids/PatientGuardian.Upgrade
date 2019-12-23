import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, TouchableOpacity, Platform, TextInput} from 'react-native'
import {onBack} from '../../../../redux/navigation/actions'
import { getQuestionsList, saveAnswers } from '../../../../redux/visitSelection/VisitServiceProcessing/Feedback/actions';
import { CoreoScrollView, ModalPopup, CoreoHighlightButton } from '../../../../components';
import Navbar from '../../../../components/LevelOne/Navbar';
import {_} from '../../../../utils/validations' 
import Icons from '../../../../assets/images/Icons';
import Icon from '../../../../components/Base/Icon';
import { setFontSize } from '../../../../utils/deviceDimensions';
import styles from './styles'
import { SafeView } from '../../../../components/LevelOne';
import ErrorBoundaryHOC from '../../../../ErrorBoundaryHOC';
import { getUserIdAndType } from '../../../../utils/userUtil';

export const Question = (props) => {
    const {index, question,selectedAnswer, isClickedOnSubmit, answerTypeDescription, feedbackQuestionnaireId, answers} = props
    let answersComponents = answers.map((answer, index) => {
        if(answerTypeDescription === "OpenText"){
            return (
                <TextInput
                    onChangeText={(text) => props.onChangeAnswer(feedbackQuestionnaireId, text, answer.id)}
                    multiline={true}
                    maxLength={500}
                    placeholder={"Type your comments here"}
                    style={styles.inputStyle}
                    underlineColorAndroid={"transparent"}
                />
            )
        }
        const onPress = () => {
            props.onChangeAnswer(feedbackQuestionnaireId, answer.answerName, answer.id)
        }
        const isSelected = answer.answerName === selectedAnswer
        let radioButton = <View style={styles.unSelectedRadioButton} />
        if(isSelected){
            radioButton = 
            <View style={styles.selectedRadioButton}>
                <View style={styles.selectedButtonInnerCircle} />
            </View>
        }
        return (
            <TouchableOpacity onPress={onPress} style={[styles.optionContainer, isSelected ? styles.selectedOptionStyle: {}]}>
                {radioButton}
                <Text style={styles.optionText}>{answer.answerName}</Text>
            </TouchableOpacity>
        )
    })
    return (
        <View>
            <Text style={[styles.questionText, isClickedOnSubmit && (_.isNil(selectedAnswer) || !selectedAnswer.length) ? styles.error : {}]}>
                {index + 1}. {question}
            </Text>
            {answersComponents}
        </View>
    )
}

class Feedback extends Component{
    feedbackAPIMessage = null
    constructor(props){
        super(props)
        this.state = {
            questions: {},
            rating: -1,
            isModalOpen: false,
            ratingModel: false,
            feedbackAPIModal: false,
            isClickedOnSubmit: false
        }
    }

    componentWillReceiveProps(nextProps){
        const {FeedbackState} = this.props
        if(FeedbackState && _.isNil(FeedbackState.QuestionsList) && !_.isNil(nextProps.FeedbackState.QuestionsList) || Object.keys(this.state.questions).length === 0){
            const {QuestionsList} = nextProps.FeedbackState
            let questions = {}
            QuestionsList.map((question, index) =>{
                questions = {
                    ...questions,
                    [question.feedbackQuestionnaireId]: {
                        ...question
                    }
                }
            })
            this.setState({questions})
        }
    }
    componentDidMount(){
        this.props.getQuestionsList()
    }

    onChangeAnswer = (feedbackQuestionnaireId, answer, answerId) => {
        let questions = {...this.state.questions}
        questions = {
            ...questions,
            [feedbackQuestionnaireId]: {
                ...questions[feedbackQuestionnaireId],
                selectedAnswer: questions[feedbackQuestionnaireId].selectedAnswer === answer ? "" : answer,
                selectedAnswerId: questions[feedbackQuestionnaireId].selectedAnswerId === answerId ? -1 : answerId
            }
        }
        this.setState({questions})
    }

    renderQuestions = () => {
        const {questions} = this.state
        let content = Object.keys(questions).map((key, index) => {
            return (
                <Question
                    key={index}
                    {...questions[key]}
                    onChangeAnswer={this.onChangeAnswer}
                    index={index}
                    isClickedOnSubmit={this.state.isClickedOnSubmit}
                />
            )
        })
        return content
    }

    onSelectRating = (index) => {
        this.setState({rating: index})
    }

    onAPIFailure = (message) => {
        this.feedbackAPIMessage = message
        this.setState({feedbackAPIModal: true})
    }

    submitFeedback = () => {
        let questions = this.state.questions
        const {isPlanVisit, navigation} = this.props
        let isServicePlanVisit = navigation && navigation.state && navigation.state.params && navigation.state.params.isPlanVisit
        let answers = []
         Object.keys(questions).map(key => {
            if(questions[key].selectedAnswer && questions[key].selectedAnswer.length > 0){
                let answer = {
                    id: 0,
                    answerName: questions[key].selectedAnswer,
                    feedbackQuestionnaireId: questions[key].feedbackQuestionnaireId
                }
                answers.push(answer)
                }
            })
        const {SummaryDetails} = this.props
        let data = {
            serviceRequestVisitId:  SummaryDetails.serviceRequestVisitId,
            serviceRequestId: SummaryDetails.serviceRequestId,
            patientId: SummaryDetails.patient.patientId,
            rating: this.state.rating + 1,
            answers: answers
        }
        if(isPlanVisit || isServicePlanVisit){
            data = {
                patientId: getUserIdAndType().patientId,
                servicePlanVisitId: SummaryDetails.serviceRequestVisitId,
                planScheduleId: SummaryDetails.planScheduleId,
                answers: answers,
                isPlanVisit: isPlanVisit || isServicePlanVisit,
                rating: this.state.rating + 1
            }
        }
        this.props.saveAnswers(data, this.props.goBack, this.onAPIFailure);
        this.setState({ isModalOpen: false })
    }

    isFilledCompletely = () => {
        let answeredQuestions = 0
        const {questions} = this.state
        Object.keys(questions).map(key => {
            if(questions[key].selectedAnswer && questions[key].selectedAnswer.length > 0){
                answeredQuestions++
            }
        })
        return answeredQuestions === Object.keys(questions).length && this.state.rating !== -1
    }

    onSubmit = () => {
        if(!this.isFilledCompletely()){
            this.setState({isModalOpen: true, isClickedOnSubmit: true})
        }else{
            this.submitFeedback()
        }
    }

    rating = () => {
        let starsCount = 5;
        let stars = []
        let selectedStar = Platform.OS === "ios" ? Icons.starIos : Icons.starAndroid
        let starOutline = Platform.OS === "ios" ? Icons.starAndroidOutling : Icons.starIosOutline
        for(let index = 0; index < starsCount; index++){
            if(index <= this.state.rating)
            {
                stars.push(
                <TouchableOpacity style={styles.margin} onPress={ () => {this.onSelectRating(index)}}>
                    <Icon {...selectedStar} color="#ffe623" size={setFontSize(24)} />
                </TouchableOpacity>
            )
            }else{
                stars.push(
                <TouchableOpacity style={styles.margin} onPress={ () => {this.onSelectRating(index)}}>
                     <Icon {...starOutline} color="#ffe623" size={setFontSize(24)} /> 
                </TouchableOpacity>)
            }
        }
        return (
            <View style={styles.stars}>
                {stars}
            </View>
        )
    }

    render(){
        const {SummaryDetails, hideNavbar, onClickPrev} = this.props || {}
        let {serviceProvider} = SummaryDetails || {}
        serviceProvider = serviceProvider || {}
        const {isClickedOnSubmit, rating} = this.state
        return (
            <SafeView>
            <CoreoScrollView>
                {hideNavbar ? null : <Navbar showEmptyAdd title="Feedback" />}
                <View style={styles.container}>
                    <Text style={[styles.questionText, isClickedOnSubmit && rating === -1 ? styles.error : {}]}>Click stars to rate your experience with {serviceProvider.firstName} {serviceProvider.lastName}</Text>
                    {this.rating()}
                    {this.renderQuestions()}
                    <View style={styles.buttonWrapper}>
                    <CoreoHighlightButton
                    onPress={this.props.goBack}
                    textStyle={[styles.textStyle, styles.cancelText]}
                    text="Cancel"
                    style={[styles.buttonContainer, styles.cancelButtonContainer]}
                    />
                    <CoreoHighlightButton
                    onPress={this.onSubmit}
                    textStyle={styles.textStyle}
                    text="Submit"
                    style={[styles.buttonContainer]}
                    />
                    </View>
                </View>
                {
                    hideNavbar ? 
                    <View style={[styles.cardContainer, styles.buttonsContainer]}>
                   <TouchableOpacity onPress={onClickPrev}>
                        <Text style={styles.buttonText}>Prev</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={this.props.goBack}>
                        <Text style={styles.buttonText}>Skip</Text>
                    </TouchableOpacity>
                </View> : null
                }
                <ModalPopup
                    visible={this.state.isModalOpen}
                    primaryButton="Ok"
                    centered={true}
                    onConfirm={() => this.setState({
                        isModalOpen: !this.state.isModalOpen,
                    })}
                >
                <Text style={[styles.questionText, styles.align]}>
                  Please answer all the above questionnaire.
                </Text>
                </ModalPopup>
                <ModalPopup
                    visible={this.state.ratingModel}
                    primaryButton="Ok"
                    centered={true}
                    onConfirm={() => this.setState({
                        ratingModel: !this.state.ratingModel,
                    })}
                >
                <Text style={[styles.questionText, styles.align]}>
                    Please provide rating to service provder.
                </Text>
                </ModalPopup>
                <ModalPopup
                    visible={this.state.feedbackAPIModal}
                    primaryButton="Ok"
                    centered={true}
                    onConfirm={() => this.setState({
                        feedbackAPIModal: !this.state.feedbackAPIModal,
                    })}
                >
                <Text style={styles.questionText}>
                    {this.feedbackAPIMessage}
                </Text>
                </ModalPopup>
            </CoreoScrollView>
            </SafeView>

        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getQuestionsList: () => dispatch(getQuestionsList()),
        saveAnswers: (data, onSucess, onAPIFailure) => dispatch(saveAnswers(data, onSucess, onAPIFailure)),
        goBack: () => dispatch(onBack())
    }
}

function mapStateToProps(state) {
    return {
        SummaryDetails:  state.visitSelectionState.VisitServiceProcessingState.SummaryState.SummaryDetails,
        FeedbackState:  state.visitSelectionState.VisitServiceProcessingState.FeedbackState,
    };
};

export default ErrorBoundaryHOC(connect(mapStateToProps, mapDispatchToProps)(Feedback));