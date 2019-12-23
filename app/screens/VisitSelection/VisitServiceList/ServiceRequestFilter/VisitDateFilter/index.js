import React, {Component} from 'react'
import {View} from 'react-native'
import styles from './styles'
import { Calendar, CoreoText } from '../../../../../components';

class VisitDateFilter extends Component {
    onChangeFromDate = (date) => {
        const {onChangeFromDate} = this.props
        onChangeFromDate(date)
    }

    onChangeToDate = (date) => {
        const {onChangeToDate} = this.props
        onChangeToDate(date)
    }

    goFromDateDefaultValues = () => {
        const {defaultToDate} = this.props
        if(defaultToDate){
            return {
                maxDate: defaultToDate
            }
        }
        return {
        }
    }

    getToDateDefaultValues = () => {
        const {defaultFromDate} = this.props
        if(defaultFromDate){
            return {
                minDate: defaultFromDate,
            }
        }
        return {
            minDate: new Date(1901, 0,1),
        }
    }

    render(){
        const {defaultFromDate, defaultToDate} = this.props
        return (
            <View style={styles.container}>
                <CoreoText style={styles.text}>Select Service Date range</CoreoText>
                <View style={styles.calendar}>
                    <Calendar
                        placeholder={defaultFromDate ? "" : "Select Date"}
                        onDateChange={this.onChangeFromDate}
                        date={defaultFromDate || null}
                        {...this.goFromDateDefaultValues()}
                        label={"From Date"}
                        key={defaultFromDate ? "FromDatePicker" : "EmptyFromDatePicker"}
                    />
                    <View style={styles.divider} />
                    <Calendar
                        placeholder={defaultToDate ? "" : "Select Date"}
                        onDateChange={this.onChangeToDate}
                        date={defaultToDate || null}
                        label={"To Date"}
                        {...this.getToDateDefaultValues()}
                        key={defaultToDate ? "ToDatePicker" : "EmptyToDatePicker"}
                    />
                    <View style={styles.divider} />
                </View>
            </View>
        )
    }
}

export default VisitDateFilter