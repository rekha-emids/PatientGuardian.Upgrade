import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
    TouchableOpacity,View
} from 'react-native';
import styles from './styles';
import {CheckBox} from '../../External';
import {CoreoText} from '../';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';

class CoreoCheckBox extends Component {
  render() {
    return (
        <TouchableOpacity onPress={this.props.onPress} style={this.props.style}>
            <View style={this.props.checkBoxStyle ? this.props.checkBoxStyle : {}}>
                <CheckBox 
                    onPress={this.props.onPress}
                    checked={this.props.checked} 
                    color={this.props.checkboxColor || THEME_PRIMARY_COLOR}
                />
            </View>
            <View style={this.props.statusTextView ? this.props.statusTextView : {}}>
                <CoreoText style={this.props.textStyle}>{this.props.children}</CoreoText>
            </View>
        </TouchableOpacity>
    );
  }
}

CoreoCheckBox.propTypes = {
    style: PropTypes.any,
    onPress: PropTypes.func,
    textStyle: PropTypes.any,
    checkboxColor: PropTypes.string
}

export default CoreoCheckBox;