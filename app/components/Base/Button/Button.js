import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
    Button
} from 'react-native';
class CoreoButton extends Component {
  render() {
    return (
        <Button
            onPress={this.props.onPress}
            title={this.props.title}
            color={this.props.color}
            accessibilityLabel={this.props.accessibilityLabel}
            disabled={this.props.disabled}
            style={this.props.style}
        />
    );
  }
}

CoreoButton.propTypes = {
    color: PropTypes.string,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    title: PropTypes.string,
    accessibilityLabel: PropTypes.string,
    style: PropTypes.func
}

export default CoreoButton;