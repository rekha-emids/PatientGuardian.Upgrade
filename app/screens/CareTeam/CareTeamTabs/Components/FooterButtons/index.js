import React from "react";
import {View} from 'react-native';
import {
    CoreoOpacityButton
} from '../../../../../components';
import styles from './styles';

export const  FooterButtons = (props) => {
        const {firstButtonTitle, onFirstButtonPress, secondButtonTitle, onSecondButtonPress, thirdButtonTitle, onThirdButtonPress, textStyle} = props

        return (
            <View style={styles.sortFilterStyle}>
               {firstButtonTitle && <CoreoOpacityButton
                    style={styles.sort}
                    text={firstButtonTitle}
                    textStyle={[styles.requestTitle, textStyle]}
                    onPress={onFirstButtonPress}
                />}
                {secondButtonTitle && <CoreoOpacityButton
                    style={styles.sort}
                    text={secondButtonTitle}
                    textStyle={[styles.requestTitle, textStyle]}
                    onPress={onSecondButtonPress}
                />}
                {thirdButtonTitle && <CoreoOpacityButton
                    style={styles.filter}
                    text={thirdButtonTitle}
                    textStyle={[styles.requestTitle, textStyle]}
                    onPress={onThirdButtonPress}
                />}
            </View>
        )
    }


