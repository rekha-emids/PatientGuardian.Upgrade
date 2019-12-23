import React, {PureComponent} from 'react'
import {View, Text} from 'react-native'
import {getFormatedDate} from '../../../../utils/momentUtil'
import styles from './styles'
class BlockoutDay extends PureComponent {
    
    getBlockoutData = () => {
        const {startDate, endDate} = this.props
        let day = getFormatedDate(startDate, 'dddd');
        let dateStart = getFormatedDate(startDate, 'MMM DD YYYY');
        let dateEnd = getFormatedDate(endDate, "MMM DD YYYY");

        let currentDate = getFormatedDate(new Date(), "YYYY-MM-DD"), disabledEdit = false;
        if (currentDate > getFormatedDate(startDate, "YYYY-MM-DD") && currentDate > getFormatedDate(endDate, "YYY-MM-DD")) {
            disabledEdit = true;
        }
        var timeDiff = Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
        let date = diffDays > 1 ? `${dateStart} - ${dateEnd}` : dateStart;
        let noOfDays = diffDays <= 0 ? day : `${diffDays} day`
        noOfDays = diffDays > 1 ? noOfDays + 's' : noOfDays
        let disableStartDate = currentDate > new Date(startDate)
        return {
            date,
            noOfDays,
            diffDays,
            disabledEdit,
            disableStartDate
        } 
    }
    
    render(){
        const {remarks, onPress, isActive, isEditable, onDelete} = this.props
        if(!isActive) return null
       const {date, noOfDays, disabledEdit, disableStartDate} = this.getBlockoutData()
        return (
            <View style={styles.container}>
                <View style={styles.dateContainer}>
                    <Text style={styles.date}>{date}</Text>
                    <Text style={styles.text}>{noOfDays}</Text>
                </View>
                <Text style={styles.remark}>{remarks}</Text>
            </View>
        )
    }
}
export default BlockoutDay