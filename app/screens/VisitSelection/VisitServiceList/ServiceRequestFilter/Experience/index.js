import React, {PureComponent} from 'react'
import {View} from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { CoreoText } from '../../../../../components';
import { setValueBasedOnWidth } from '../../../../../utils/deviceDimensions';
import styles from './styles'
import { THEME_PRIMARY_COLOR } from '../../../../../constants/theme';
class Experience extends PureComponent {

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

    getErrors = () => {
        const {minExp, maxExp} = this.props
        let minExpError = null
        let maxExpError = null
        if(!_.isNil(minExp) && !_.isNil(maxExp) && parseInt(minExp) > parseInt(maxExp)){
            maxExpError = "Should be greater than minimum experience"
        }
        return maxExpError
    }

    render() {
        const {onChangeExp, minExp, maxExp} = this.props
        
        return (
            <View style={styles.container}>
            <CoreoText style={styles.title}>Select Preferred Experience</CoreoText>
            <MultiSlider
                values={[minExp, maxExp]}
                sliderLength={setValueBasedOnWidth(200)}
                onValuesChange={onChangeExp}
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
                <CoreoText style={styles.title}>{minExp} years - {maxExp} years</CoreoText>
            </View>
        </View>
        )
    }
}

export default Experience