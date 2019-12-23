import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
    ScrollView
} from 'react-native';


class CoreoScrollView extends Component {
  render() {
      const {style, contentContainerStyle, horizontal, children, ...other} = this.props

    return (
        <ScrollView style={style} contentContainerStyle={contentContainerStyle} horizontal={horizontal} showsHorizontalScrollIndicator={false} {...other}>
           {children}
        </ScrollView>
    );
  } 
}

CoreoScrollView.propTypes = {
    style: PropTypes.any,
    onPress: PropTypes.func,
    textStyle: PropTypes.any,
    text: PropTypes.string
}

export default CoreoScrollView;