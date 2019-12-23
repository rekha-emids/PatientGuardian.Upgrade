import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
    TouchableOpacity
} from 'react-native';
import {CoreoText} from '../Text';
import styles from './styles';

class CoreoOpacityButton extends Component {
  render() {
    return (
        <TouchableOpacity
            style={this.props.style ? this.props.style : styles.style}
            onPress={this.props.onPress}
            disabled={this.props.disabled ? this.props.disabled : false}
        >
            <CoreoText
                style={this.props.textStyle}
            >
                {this.props.text}
            </CoreoText>
        </TouchableOpacity>
    );
  }
}

CoreoOpacityButton.propTypes = {
    style: PropTypes.any,
    onPress: PropTypes.func,
    textStyle: PropTypes.any,
    text: PropTypes.any
}

export default CoreoOpacityButton;