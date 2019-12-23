import React, { Component } from 'react';
import {
    TextInput,
    View,
    Text
} from 'react-native';
import styles from './style';

class Input extends Component {
    render() {
        return (
            <View>
                <Text>{this.props.label}</Text> 
                <TextInput 
                    secureTextEntry={this.props.secureTextEntry}
                    style={this.props.style ? this.props.style : styles.input}
                    value={this.props.value}
                    editable={this.props.editable}
                    maxLength={this.props.maxLength}
                    multiline={this.props.multiline}
                    onBlur={this.props.onBlur}
                    onChange={this.props.onChange}
                    onChangeText={this.props.onChangeText}
                    onKeyPress={this.props.onKeyPress}
                    placeholder={this.props.placeholder}
                    onFocus={this.props.onFocus}
                    placeholderTextColor={this.props.placeholderTextColor}
                    underlineColorAndroid={this.props.underlineColorAndroid}
                />
            </View>
        );
    }
}

export default Input;