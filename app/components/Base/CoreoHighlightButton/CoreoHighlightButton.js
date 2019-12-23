import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
    TouchableHighlight
} from 'react-native';
import {CoreoText} from '../Text';
import styles from './styles';

class CoreoHighlightButton extends Component {
  render() {
    const {disabled} = this.props
    let disabledStyle = disabled ? {opacity: 0.6} : {}

    return (
        <TouchableHighlight
            style={[
styles.style,
this.props.style,
disabledStyle
]}
            onPress={this.props.onPress}
            disabled={this.props.disabled}
        >
            <CoreoText
                style={this.props.textStyle}
            >
                {this.props.text}
            </CoreoText>
        </TouchableHighlight>
    );
  }
}

CoreoHighlightButton.propTypes = {
    style: PropTypes.any,
    onPress: PropTypes.func,
    textStyle: PropTypes.any,
    text: PropTypes.string
}

export default CoreoHighlightButton;