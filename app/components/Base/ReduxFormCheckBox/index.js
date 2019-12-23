import React from 'react';
import CoreoCheckBox from '../CoreoCheckBox';
import {View} from 'react-native'
import {setValueBasedOnWidth} from '../../../utils/deviceDimensions'

/**
 * to be wrapped with redux-form Field component
 */
export default function ReduxFormCheckBox(props) {
  const { input, title, disable, style } = props
  
  onChange = (text) => {
    if (props.screen === "profile") {
      props.onFormInputChange();
    }
    input.onChange(text)
  }

  return <View style={{paddingLeft: setValueBasedOnWidth(5)}}><CoreoCheckBox text={title} style={style} disable={disable} isSelected={input.value} onChange={onChange} /></View>
}

