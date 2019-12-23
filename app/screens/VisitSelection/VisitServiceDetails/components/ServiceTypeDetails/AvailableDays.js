import React, {Component} from 'react'
import {View, Text} from 'react-native'

import styles from './styles'

const Slot = (props) => {
    const {slotName, isActive} = props
    let dotStyle = isActive ? {} : {backgroundColor: "transparent"},
     textStyle = styles.disableTextStyle,
     containerStyle = {}

    if (isActive){
        textStyle = styles.activeTextStyle
        containerStyle = styles.selectedItemStyle    
    }
    return (
        <View style={[
styles.slotItem,
containerStyle
]}>
            <View style={[
styles.greenDot,
dotStyle
]} />
            <Text style={textStyle}>{slotName}</Text>
        </View>
    )
},

 AvailabilityItem = (props) => {
    const {filterDays} = props

   return Object.keys(filterDays).map((key) => <View style={styles.availabilityItem}>
                <View style={styles.itemTitleContainer}>
                    <Text style={styles.dayName}>{key}</Text>
                </View>
                <View style={styles.blueDivider} />
                <Slot slotName="Morning" isActive={ filterDays[key] && filterDays[key].indexOf("Morning") !== -1} />
                <Slot slotName="Afternoon" isActive={filterDays[key] && filterDays[key].indexOf("Afternoon") !== -1} />
                <Slot slotName="Evening" isActive={filterDays[key] && filterDays[key].indexOf("Evening") !== -1} />
            </View>)
       
}

class AvailabilityDays extends Component {
    render(){
        const {availableDays} = this.props

        let filterDays = {}

        availableDays && availableDays.map((day) => {
            let existingSlots = filterDays[day.day] ? filterDays[day.day] : []

            existingSlots.push(day.slotDescription)

            filterDays = {
                ...filterDays,
                [day.day]: existingSlots
            }   

        })

        let content = 
                <AvailabilityItem
                   filterDays={filterDays}
                />
        
        return (
            <View style={styles.slotsContainer}>
                {content}
            </View>
        )
    }
}

export default AvailabilityDays