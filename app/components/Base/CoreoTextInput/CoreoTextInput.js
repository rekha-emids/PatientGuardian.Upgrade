import React, { Component } from 'react';
import {
  TextInput
} from 'react-native';
import styles from './styles';

export default class CoreoTextInput extends Component {
  constructor(props){
    super(props)
    TextInput.defaultProps.allowFontScaling = false
  }

    render() {
      return (
        <TextInput
            secureTextEntry={this.props.secureTextEntry}
            editable={this.props.editable}
            maxLength={this.props.maxLength}
            style={[
styles.inputstyle,
this.props.inputStyle
]}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            keyboardType={this.props.keyboardType}
            onChangeText={this.props.onChangeText}
            underlineColorAndroid="transparent"
            placeholder={this.props.placeholder}
            placeholderTextColor={this.props.placeholderTextColor}
            value={this.props.value}
            blurOnSubmit
            autoCapitalize={this.props.secureTextEntry ? "none" : null}
            onSubmitEditing={this.props.onSubmitEditing}
            allowFontScaling={false}
        />
      );
    }
}