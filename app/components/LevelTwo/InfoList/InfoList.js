import React, { Component } from 'react';
import moment from 'moment';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import {completed} from '../../../assets/images';
import styles from './styles';
class InfoList extends Component {
    render() {
        const textColor = this.props.profile.selected ? "#f1e7f7" : "#ffffff";

        return (
            <TouchableOpacity style={styles.marginitem} onPress={this.props.onSelectProfile}>
                <View style={[
styles.container,
{backgroundColor: textColor}
]}>
                    <View style={styles.membername}>
                        <Text style={styles.name}>{`${this.props.profile.firstName} ${this.props.profile.lastName}`}</Text>
                        {this.props.profile.selected ? <Image
                            style={styles.selected}
                            source={completed}
                        /> : null}
                    </View>
                    <View style={styles.data}>
                        <Text style={styles.textstyle}>{this.props.profile.memberId}</Text>
                        <Text style={styles.textstyle}>{this.props.profile.gender.charAt(0)}</Text>
                        <Text style={styles.textstyle}>{moment(new Date(this.props.profile.dob.toString())).format('MM-DD-YYYY')}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default InfoList;