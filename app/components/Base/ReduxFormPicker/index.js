import React from 'react';
import { View, Text, Platform } from 'react-native';
import FloatingLabelPicker from '../FloatingLabelPicker/index'
import Icon from '../Icon/index'
import styles from './styles';
import Icons from '../../../assets/images/Icons';

import {setFontSize} from '../../../utils/deviceDimensions'
 
/**
 * to be wrapped with redux-form Field component
 */
export default function ReduxFormPicker(props) {

  const { disabled, input, meta, label, style, type, onChangeText, ...inputProps } = props,


   onChange = (text) => {
    if (props.screen === "profile"){
      props.onFormInputChange();
    }
    input.onChange(text)
    onChangeText && onChangeText(text)
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
    <View>
        <FloatingLabelPicker
            type={type}
            label={label}
            editable={!disabled}
            maxLength={100}
            value={input.value}
            onChange={onChange}
            items={props.items}
            placeholder={props.placeholder}
        />
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
