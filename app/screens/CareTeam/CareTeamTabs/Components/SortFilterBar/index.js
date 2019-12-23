import React, { Component } from "react";
import { connect } from 'react-redux';
import {View} from 'react-native';
import {
    CoreoOpacityButton
} from '../../../../../components';
import styles from './styles';

class SortFilterBar extends Component {
    render() {
        const {showFirstButton, textStyle} = this.props

        return (
            <View style={styles.sortFilterStyle}>
               {showFirstButton && <CoreoOpacityButton
                    style={styles.sort}
                    text={this.props.firstButtonTitle}
                    textStyle={styles.requestTitle}
                    onPress={this.props.toggleSort}
                />}
                <CoreoOpacityButton
                    style={styles.filter}
                    text={this.props.secondButtonTitle || 'Filter'}
                    textStyle={[
styles.requestTitle,
textStyle
]}
                    onPress={this.props.toggleFilter}
                />
            </View>
        )
    }
}


export default connect(null, null)(SortFilterBar);