import React, { Component } from "react";
import { connect } from 'react-redux';
import {View, TouchableOpacity} from 'react-native';
import {
    CoreoText,
} from '../../../../../components';
import styles from './styles';
import Icon from '../../../../../components/Base/Icon';
import Icons from '../../../../../assets/Icons';
import { setFontSize } from '../../../../../utils/deviceDimensions';
import { CARETEAM_SERVICE_PROVIDERS } from "../../../../../constants/constants";

class CardList extends Component {
    cardListOnPress = () => this.props.onPress(this.props, this.props.requestObject)
    render() {
        return (
            <TouchableOpacity style={styles.listItem} onPress={this.cardListOnPress}>
                <View style={styles.rowStyle}>
                    <View style={styles.contentCenter}>
                        <CoreoText style={styles.requestTitle}>{this.props.name}</CoreoText>
                    </View>
                </View>
                <View style={styles.rightContent}>
                    <CoreoText style={[styles.requestTitle, styles.marginRight]}>{this.props.data}</CoreoText>
                    {this.props.label === CARETEAM_SERVICE_PROVIDERS.WITH_FEEDBACK_ALERTS ?
                        <View style={styles.row}>
                            <Icon {...Icons.bell} size={setFontSize(20)} />
                            <CoreoText style={[styles.requestTitle, styles.margin]}>{this.props.feedback}</CoreoText>
                        </View>
                    : null}
                    <Icon {...Icons.angleRight} size={setFontSize(20)} color='#acacac' />
                </View>
            </TouchableOpacity>
        )
    }
}


export default connect(null, null)(CardList);