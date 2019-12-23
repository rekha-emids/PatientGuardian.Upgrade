import React, { Component } from "react";
import { connect } from 'react-redux';
import {View} from 'react-native';
import {
    CoreoImage,
    CoreoText
} from '../../../../../components';
import styles from './styles';

class TopCount extends Component {
    render() {
        return (
            <View style={styles.cardView}>
                <View style={styles.cardLeftView}>
                    <View style={styles.cardTitle}>
                        <CoreoText style={styles.title}><CoreoText style={styles.count}>{this.props.totalCount}</CoreoText> {this.props.subText}</CoreoText>
                        <CoreoText style={styles.subTitle}>{this.props.label}</CoreoText>
                    </View>
                </View>
                <View style={styles.cardLeftView}>
                    <CoreoImage
                        style={styles.center}
                        source={this.props.source}
                    />
                </View>
            </View>
        )
    }
}


export default connect(null, null)(TopCount);