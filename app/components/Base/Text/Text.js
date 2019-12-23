import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
    Text
} from 'react-native';
import styles from './styles';

class CoreoText extends Component {
  render() {
      const {style, ...other} = this.props

    return (
        <Text style={[
styles.text,
style
]} {...other}>
            {this.props.children}
        </Text>
    );
  }
}

CoreoText.propTypes = {
    style: PropTypes.any,
    text: PropTypes.string
}

export default CoreoText;