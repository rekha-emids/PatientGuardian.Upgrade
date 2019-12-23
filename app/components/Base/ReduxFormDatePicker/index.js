import React from 'react';
import { View, Text, Platform } from 'react-native';
import Icon from '../Icon/index'
import styles from './styles';
import Icons from '../../../assets/images/Icons';
import {Calendar} from '../../LevelOne/Calendar/index'

import {setFontSize} from '../../../utils/deviceDimensions'
 import {getFormatedDate} from '../../../utils/momentUtil'

/**
 * to be wrapped with redux-form Field component
 */
export default function ReduxFormDatePicker(props) {

  const { input, meta, label, format, defaultDate, minimumDate, maximumDate, onChangeText, disabled, ...inputProps } = props,


   onChange = (text) => {
    input.onChange(getFormatedDate(text))
    onChangeText && onChangeText(getFormatedDate(text))
  }

  // do not display warning if the field has not been touched or if it's currently being edited
  let error = null,
   validationStyles = null

  if (meta.touched && !meta.active) {
    if (meta.valid) {
      validationStyles = styles.valid
    } else {
      validationStyles = styles.invalid
      error = meta.error
    }
  }
  let icon = Icons.closeCircleAndroid

  if (Platform.OS === 'ios'){
    icon = Icons.closeCircleIos
  }
  return (
    <View style={styles.padding}>
      <Calendar
        placeholder={defaultDate ? "" : "Select Date"}
        onDateChange={onChange}
        date={defaultDate}
        format={format}
        minDate={minimumDate}
        maxDate={maximumDate}
        textStyle={styles.textStyle}
        placeHolderTextStyle={styles.textStyle}
        label={label}
        disabled={disabled}
        />
        <View style={styles.valueContainer} />      
        {
          error && error.length > 0
            ? <View style={styles.errorMsgContainer}>
              <Icon {...icon} size={setFontSize(18)} color="#c04e59" />
              <Text style={styles.errorMsg}>{error}</Text>
            </View>
         : null
        }
    </View>
  );
}

