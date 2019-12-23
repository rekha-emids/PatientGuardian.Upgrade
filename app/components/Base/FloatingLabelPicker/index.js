import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import {Select} from '../Select/index'
import styles from './styles';

export default class FloatingLabelPicker extends Component {
    render() {
      const { editable, label, value, items, onChange, pickerStyle, containerStyle } = this.props;

      return (
        <View style={[
styles.padding,
containerStyle
]}>
          <Text style={styles.labelStyle}>
            {label}
          </Text>
        <Select
            placeholder={this.props.placeholder || ""}
            style={styles.picker}
            selectedValue={value}
            onValueChange={onChange}
            dataArray={items}
            itemStyle={styles.itemStyle}
            enabled={editable}
            pickerStyle={pickerStyle}
        />
        <View style={styles.border} />
        </View>
      );
    }
}