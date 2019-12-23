import React, { PureComponent } from 'react';
import {
    View,
    Text
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import styles from './styles';
import { calendarIcon } from '../../../assets/images';
import {setFontSize, setValueBasedOnWidth } from '../../../utils/deviceDimensions';

class Calendar extends PureComponent {
    render() {
        let maxDateProps = this.props.maxDate ? {maxDate: this.props.maxDate} : {}

        return (
            <View>
                {this.props.label && <Text style={styles.label}>{this.props.label}</Text> }
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <DatePicker
                        style={[
{width: setValueBasedOnWidth(320) },
this.props.style
]}
                        date={this.props.date && this.props.date || null}
                        mode="date"
                        placeholder={this.props.placeholder}
                        iconSource={calendarIcon}
                        minDate={this.props.minDate ? new Date(this.props.minDate) : new Date(1900, 1, 1)}
                        {...maxDateProps}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon = {true}
                        customStyles={{
                        dateTouchBody: {justifyContent: 'space-between'},
                            dateIcon: {
                                marginRight: 0,
                            height: setValueBasedOnWidth(15),
                            width: setValueBasedOnWidth(15)
                        },
                        dateInput: {
                            flex: 2,
                            alignSelf: 'flex-start',
                            height: 40,
                            borderWidth: 0,
                            alignItems: 'flex-start',
                            justifyContent: 'center'

                        },
                        dateText: [
{fontSize: setFontSize(12)},
this.props.dateText
],
                        disabled: {backgroundColor: "transparent"}
                        }}
                        onDateChange={this.props.onDateChange}
                        disabled={this.props.disabled}
                        allowFontScaling={false}
                    />
                    </View>
            </View>
            
        );
    }
}

export default Calendar;
