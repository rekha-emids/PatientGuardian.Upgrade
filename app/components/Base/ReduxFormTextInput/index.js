import React from 'react';
import { View, Text, Platform } from 'react-native';
import {CoreoFloatingInput} from '../CoreoFloatingInput'
import Icon from '../Icon'
import styles from './styles';
import Icons from '../../../assets/images/Icons';
import FormConstants from '../../../screens/EditProfile/EditPersonalDetails/FormConstants'

import {setFontSize} from '../../../utils/deviceDimensions'
import { normalizePhone, normalizeZip, extractNumbers, changeToDecimal, extractNumbersAndDot, changeToWeightDecimal } from '../../../utils/renderFields';
import { PATH } from '../../../routes';
import VitalConstants from "../../../screens/EditProfile/EditHeightWeightDetails/FormConstants"
import { caseInsensitiveComparer } from '../../../utils/appUtils';
 
/**
 * to be wrapped with redux-form Field component
 */
export default function ReduxFormTextInput(props) {

  const { disabled, input, meta, label, containerStyle, type, onChangeText, ...inputProps } = props,

   onBlur = () => input.onBlur(input.value)

   onChange = (text) => {
    if (props.screen === "profile" || props.screen === PATH.PROFILE){
      props.onFormInputChange();
    }
    let updatedText = text

    if ((caseInsensitiveComparer(FormConstants.PHONE, input.name) || caseInsensitiveComparer(FormConstants.EMERGENCY_CONTACT, input.name)) && !props.decimalKeyboard){
      updatedText = normalizePhone(text)
    } else if (FormConstants.ZIP_CODE === input.name && !props.decimalKeyboard){
      updatedText = normalizeZip(text);
    }
    if (caseInsensitiveComparer(props.keyboardType, "numeric") && (FormConstants.PHONE !== input.name && FormConstants.EMERGENCY_CONTACT !== input.name) && !props.decimalKeyboard){
      updatedText = extractNumbers(text)
    }

    if(props.decimalKeyboard){
      updatedText = input.name === VitalConstants.WEIGHT ?changeToWeightDecimal(text):changeToDecimal(text,3)
    }

    props.onChangeInput && props.onChangeInput()
    input.onChange(updatedText)
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
    <View style={containerStyle}>
        <CoreoFloatingInput
            type={type}
            label={label}
            editable={!disabled}
            value={input.value}
            onChangeText={onChange}
            name={input.name}
            keyValue = {props.updateTextInput ? '0' : '1'}
            onBlur={onBlur}
            selected = {!error}
            {...inputProps}
            multiline ={props.multiline}
            numberOfLines = {props.numberOfLines}
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

