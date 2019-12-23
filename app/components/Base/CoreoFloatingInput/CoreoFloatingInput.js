import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text
} from 'react-native';
import { setHeight, setFontSize } from '../../../utils/deviceDimensions';
import styles from './CoreoFloatingInputStyle';
import FormConstants from '../../../screens/EditProfile/EditPersonalDetails/FormConstants';
import { extractNumbers, normalizePhone } from '../../../utils/renderFields';
import {caseInsensitiveComparer} from '../../../utils/appUtils'
export default class CoreoFloatingInput extends Component {
    constructor(props) {
        super(props);
        TextInput.defaultProps.allowFontScaling = false
        this.state = {
          isFocused: false  
        };
    };
    onChangeText = (text) => {
      let updatedText = text
      if(this.props.keyboardType === "numeric"){
        updatedText = extractNumbers(text)
      }
      if((caseInsensitiveComparer(this.props.name,FormConstants.PHONE) || caseInsensitiveComparer(this.props.name, FormConstants.EMERGENCY_CONTACT)) && text && text.toString().length > 0 && text.toString().includes("+1")){
        updatedText = text.split("+1")[1]
      }
    this.props.onChangeText(updatedText)
    }
    handleFocus = () => {
      this.setState({ isFocused: true });
    }
    handleBlur = () => {
      this.setState({ isFocused: false });
      this.props.onBlur && this.props.onBlur();
    }
    render() {
      const { label, style,name, ...props } = this.props;
      const { isFocused } = this.state;
      const labelStyle = {
        position: 'absolute',
        top: !isFocused && !this.props.value && !this.props.placeholder ? setHeight(2.81) : 0,
        fontSize: !isFocused && !this.props.value && !this.props.placeholder ? setFontSize(14) : setFontSize(12),
        color: isFocused || this.props.value ? '#373737' : '#444444',
      };
      let updatedValue =  this.props.value && this.props.value.toString().length && (caseInsensitiveComparer(FormConstants.PHONE, name) || caseInsensitiveComparer(FormConstants.EMERGENCY_CONTACT, name)) ? normalizePhone(this.props.value) : this.props.value
      return (
        <View style={styles.padding} >
          <Text style={labelStyle}>
            {label}
          </Text>
          <TextInput
            {...props}
            placeholder={this.props.placeholder}
            secureTextEntry={(this.props.type == 'password') ? true : false}
            editable={this.props.editable}
            maxLength={this.props.maxLength}
            style={this.props.selected === false?[styles.unselectedInputStyle, style] : [styles.inputstyle, style] }
            onFocus={this.handleFocus}
            onBlur={this.props.onBlur || this.handleBlur}
            keyboardType={this.props.keyboardType}
            onChangeText={this.onChangeText}
            blurOnSubmit
            value={updatedValue}
            contextMenuHidden={(this.props.contextMenuHidden) ? true : false}
            underlineColorAndroid={this.props.passwordMatch ?'#B8B3B3':'#dc3545'}
            multiline = {this.props.multiline}
            numberOfLines = {this.props.numberOfLines}
            autoCorrect={false}
            autoCapitalize={this.props.type == 'password' ? "none" : null}
            textAlignVertical={'top'}
          />
        </View>
      )
    }
}


CoreoFloatingInput.defaultProps ={
  passwordMatch:true,
  passwordCombination:true
}
