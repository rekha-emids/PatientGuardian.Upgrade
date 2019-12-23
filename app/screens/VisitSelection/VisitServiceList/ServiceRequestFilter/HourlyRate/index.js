import React, {PureComponent} from 'react'
import {View} from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { CoreoText } from '../../../../../components';
import { setValueBasedOnWidth } from '../../../../../utils/deviceDimensions';
import styles from './styles'
import { THEME_PRIMARY_COLOR } from '../../../../../constants/theme';
class HourlyRate extends PureComponent {

    renderError = (error) => {
        let icon = Icons.closeCircleAndroid
        if(Platform.OS === 'ios'){
          icon = Icons.closeCircleIos
        }
        if(error && error.length > 0){
            return (
                <View style={styles.errorMsgContainer}>
                <Icon {...icon} size={setFontSize(18)} color="#c04e59" />
                <CoreoText style={styles.errorMsg}>{error}</CoreoText>
                </View>
            )
        }
        return null
    }

    render() {
        const {onChangeRating, minRate, maxRate} = this.props
        
        return (
            <View style={styles.container}>
            <CoreoText style={styles.title}>Select Range for Hourly Rate($/hr)</CoreoText>
            <MultiSlider
                values={[minRate, maxRate]}
                sliderLength={setValueBasedOnWidth(200)}
                onValuesChange={onChangeRating}
                min={0}
                max={50}
                step={1}
                allowOverlap
                snapped
                selectedStyle={{
                    backgroundColor: THEME_PRIMARY_COLOR,
                }}
                unselectedStyle={{
                    backgroundColor: '#d7d7d7',
                }}
            />
            <View style={styles.displayYears}>
                <CoreoText style={styles.title}>${minRate} - ${maxRate}</CoreoText>
            </View>
        </View>
        )
    }
}

export default HourlyRate