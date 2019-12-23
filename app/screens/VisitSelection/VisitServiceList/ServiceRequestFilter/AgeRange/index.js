import React, {PureComponent} from 'react'
import {View} from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { CoreoText } from '../../../../../components';
import { setValueBasedOnWidth } from '../../../../../utils/deviceDimensions';
import styles from './styles'
import { THEME_PRIMARY_COLOR } from '../../../../../constants/theme';

class AgeRange extends PureComponent{
    render() {
        return (
            <View style={styles.container}>
                <CoreoText style={styles.title}>Select Preferred Age group</CoreoText>
                <MultiSlider
                    values={[
this.props.minAge,
this.props.maxAge
]}
                    sliderLength={setValueBasedOnWidth(200)}
                    onValuesChange={this.props.onAgeChange}
                    min={0}
                    max={120}
                    step={1}
                    allowOverlap
                    snapped
                    selectedStyle={{backgroundColor: THEME_PRIMARY_COLOR}}
                    unselectedStyle={{backgroundColor: '#d7d7d7'}}
                />
                <View style={styles.displayYears}>
                    <CoreoText style={styles.title}>{this.props.minAge} years - {this.props.maxAge} years</CoreoText>
                </View>
            </View>
        )
    }
}

export default AgeRange