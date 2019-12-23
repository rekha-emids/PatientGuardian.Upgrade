import React, {Component} from 'react'
import {View} from 'react-native'
import { setValueBasedOnWidth } from '../../../utils/deviceDimensions';
import styles from './styles';

export const PROGRESSBAR_WIDTH = setValueBasedOnWidth(120)
class ProgressBar extends Component {
    render(){
        const {containerStyle, progressStyle} = this.props

        return (
            <View style={[
styles.progressBarContainer,
containerStyle
]}>
                <View style={[
styles.progress,
progressStyle
]} />
            </View>
        )
    }
}

export default ProgressBar