import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';
import { THEME_PRIMARY_COLOR } from '../../../../constants/theme';


export default class Badge extends Component{
    render() {
        
        return (
            <View style={this.props.label === 'I' ? styles.memBackground_I : this.props.label === 'G' ? styles.memBackground_G : styles.memBackground_S }>
                <Text style={styles.bdgCount}>{this.props.label}</Text>
            </View>
        ) 
}
}

const styles = StyleSheet.create({
    memBackground_I: {
        display: 'flex',
        width: wp('5.5%'),
        height: wp('5.5%'),
        borderRadius: wp('2.75%'),
        backgroundColor: '#3089d7',
        position: 'absolute',
        top: wp('6%'),
        left: wp('8%')
    },
    memBackground_G: {
        display: 'flex',
        width: wp('5.5%'),
        height: wp('5.5%'),
        borderRadius: wp('2.75%'),
        backgroundColor: '#ef6f48',
        position: 'absolute',
        top: wp('6%'),
        left: wp('8%')
    },
    memBackground_S: {
        display: 'flex',
        width: wp('5.5%'),
        height: wp('5.5%'),
        borderRadius: wp('2.75%'),
        backgroundColor: THEME_PRIMARY_COLOR,
        position: 'absolute',
        top: wp('6%'),
        left: wp('8%')
    },
    bdgCount: {
        fontSize: wp('3.33%'),
        textAlign: 'center',
        color: '#fff',
        marginTop: 1
    }
})