import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { CoreoImage, CoreoText } from '../../../../../components';
import Icon from '../../../../../components/Base/Icon';
import Icons from '../../../../../assets/Icons';
import { setFontSize } from '../../../../../utils/deviceDimensions';
import styles from './styles';

class QuickViewCard extends Component {

    render() {
        return (
            <TouchableOpacity
                style={styles.cardView}
                onPress={this.props.onPress}
            >
                <View style={styles.cardLeftView}>
                    <CoreoImage
                        style={styles.center}
                        source={this.props.source}
                    />
                    <View style={styles.cardTitle}>
                        <View style={styles.countWrap}>
                        <CoreoText style={styles.count}>{this.props.totalCount}</CoreoText>
                        <CoreoText style={styles.title}> {this.props.subText}</CoreoText>
                        </View>
                        <CoreoText style={styles.subTitle}>{this.props.label}</CoreoText>
                    </View>
                </View>
                <View style={styles.arrow}>
                    <Icon {...Icons.angleRight} size={setFontSize(20)} color="#acacac" />
                </View>
            </TouchableOpacity>
        );
    }
}


export default connect(null, null)(QuickViewCard);