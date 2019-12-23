import React, {Component} from 'react'
import {View, ScrollView, Text, TouchableOpacity} from 'react-native'

import styles from './styles'
import EmptyText from '../EmptyText';

export const Slot = (props) => {
    const {isActive, slotName, isEditable, onPress, dayId} = props
    let textStyle = styles.disableTextStyle,
     containerStyle = {},
     dotStyle = isActive ? {} : {backgroundColor: "transparent"}

    if (isActive){
        textStyle = styles.activeTextStyle
        containerStyle = styles.selectedItemStyle    
    }
    let RenderComponent = isEditable ? TouchableOpacity : View
    const onPressSlot = () => {
        onPress && onPress(dayId, props.slotId)
    }

    return (
        <RenderComponent onPress={onPressSlot} style={[
styles.slotItem,
containerStyle
]}>
            <View style={[
styles.greenDot,
dotStyle
]} />
            <Text style={textStyle}>{slotName}</Text>
        </RenderComponent>
    )
}

 export const AvailabilityItem = (props) => {
     __DEV__ && console.log("PROPS FOR AVAILABILITYITEM is: ", props)
    const {isEditable, onPress, day} = props
    let activeSlotsCount = 0,
     slots = day.slots.map((slot, index) => {
        if (!isEditable && !slot.isActive) {
 return null 
}
        activeSlotsCount++
        return <Slot {...slot} key={index} isEditable={isEditable} onPress={onPress} dayId={day.dayId} />
    })

    if (!isEditable && activeSlotsCount < 1) {
return null
}
    return (
        <View style={styles.availabilityItem}>
            <View style={styles.itemTitleContainer}>
                <Text style={styles.dayName}>{day.dayName}</Text>
            </View>
            <View style={styles.blueDivider} />
            {slots}
        </View>
    )
}

class AvailabilityDays extends Component {
    render(){
        const {availableDays, isEditable, onPress, style} = this.props
        let content = availableDays && availableDays.days && availableDays.days.map((day, index) => <AvailabilityItem
                   key={index}
                   day={day}
                   isEditable={isEditable}
                   onPress={onPress}
                />),
         isContentAvailable = true

        if (availableDays && availableDays.days && !availableDays.days.length){
            isContentAvailable = false
            content = <EmptyText/>
        }
        return (
            <ScrollView horizontal style={[style]} contentContainerStyle={!isContentAvailable ? {justifyContent: "center", flex: 1, alignItems: "center"} : {}} >
                {content}
            </ScrollView>
        )
    }
}

export default AvailabilityDays