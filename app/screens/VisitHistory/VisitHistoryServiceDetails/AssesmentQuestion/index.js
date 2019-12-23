import React from 'react'
import { caseInsensitiveComparer } from "../../../../utils/appUtils";
import { TextInput, View, TouchableOpacity, Text } from "react-native";
import styles from './styles'
import {_} from '../../../../utils/validations'

export const Question = (props) => {
    const { index, question, isSubmitClicked, editable, selectedAnswer, answerTypeDescription, assessmentQuestionnaireId, answers } = props
    let answersComponents = answers.map((answer) => {
        if (caseInsensitiveComparer(answerTypeDescription, "OpenText")) {
            return (
                <TextInput
                    onChangeText={(text) => props.onChangeAnswer(assessmentQuestionnaireId, text ? text.trim() : "", answer.id)}
                    multiline={true}
                    maxLength={500}
                    placeholder={"Type your comments here"}
                    style={styles.inputStyle}
                    underlineColorAndroid={"transparent"}
                    editable={editable}
                    value={selectedAnswer ? selectedAnswer : ''}
                />
            )
        }
        const onPress = () => {
            props.onChangeAnswer(assessmentQuestionnaireId, answer.answerName, answer.id)
        }
        const isSelected = answer.answerName === selectedAnswer
        let radioButton = <View style={styles.unSelectedRadioButton} />

        if (isSelected) {
            radioButton =
                <View style={styles.selectedRadioButton}>
                    <View style={styles.selectedButtonInnerCircle} />
                </View>
        }
        return (
            <TouchableOpacity disabled={!editable} onPress={onPress} style={[styles.optionContainer, isSelected ? styles.selectedOptionStyle : {}]}>
                {radioButton}
                <Text style={styles.optionText}>{answer.answerName}</Text>
            </TouchableOpacity>
        )
    })

    return (
        <View>
            <Text style={[styles.questionText, isSubmitClicked && (_.isNil(selectedAnswer) || !selectedAnswer.length) ? styles.error : {}]}>
                {index + 1}. {question}
            </Text>
            {answersComponents}
        </View>
    )
}