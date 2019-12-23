import React, {Component} from 'react'
import {View, TouchableOpacity} from 'react-native'
import { CoreoText } from '../../../components';
import styles from './styles'
import { DAYS, SLOTS } from '../../../constants/constants';

export const DayComponent = (props) => <View style={[
styles.slotBox,
styles.slotBoxMargin
]}>
        <View style={styles.boxStyle}>
            <CoreoText style={styles.dayStyle}>{props.day}</CoreoText>
        </View>
        <View style={styles.blueDivider} />
        <View style={styles.slotViewMargin}>
        {SLOTS.map((slot, index) => <View key={index}>
                <View style={props.slotDescription === slot ? styles.slotItemViewSelected : styles.slotItemViewNotSelected}>
                        <View style={styles.dotView}>
                        <View style={[
styles.selectedSlotDot,
props.slotDescription === slot ? {} : styles.emptyDot
]}/>
                        </View>
                        <CoreoText style={styles.slotTextStyleChecked}>{props.slotDescription}</CoreoText>
                    </View>
            </View>)}
        </View>
        </View>
    


export const Slot = (props) => <View style={[
styles.slotBox,
styles.slotBoxMargin
]}>
        <View style={styles.boxStyle}>
            <CoreoText style={styles.dayStyle}>{props.day}</CoreoText>
        </View>
        <View style={styles.blueDivider} />
        <View style={styles.slotViewMargin}>
            {props.slotData.map((item, iter) => <TouchableOpacity
                    onPress={() => {
props.onSlotSelection && props.onSlotSelection(props.index, item, iter)
}}
                    key={`${iter}_${props.index}`}
                > 
                    <View style={item.selected ? styles.slotItemViewSelected : styles.slotItemViewNotSelected}>
                        <View style={styles.dotView}>
                            <View style={[
styles.selectedSlotDot,
item.selected ? {} : styles.emptyDot
]}/>
                        </View>
                        <CoreoText style={styles.slotTextStyleChecked}>{item.name}</CoreoText>
                    </View>
                </TouchableOpacity>)}
        </View>
    </View>
    

class Slots extends Component {
    render() {
        if (!this.props.slotData || this.props.slotData.length === 0) {
 return null 
}
        const slots = DAYS.map((day, index) => <Slot index={index} day={day} onSlotSelection={this.props.onSlotSelection} slotData={this.props.slotData[index]} key={index} />)

        return (
            <View style={styles.slotsContainer}>
                {slots}
            </View>
        )
    }
}
export default Slots
