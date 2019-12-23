import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';
  import { USER_TYPES } from '../../../../constants/constants';
import { setValueBasedOnWidth, setFontSize, setValueBasedOnHeight } from '../../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../../constants/theme';


export default class Badge extends Component{
    render() {
        let bgStyles = {backgroundColor: "#3089d7"}

        if (this.props.label === USER_TYPES.GUARDIAN){
            bgStyles = {backgroundColor: "#ef6f48"}
        } else if (this.props.label === USER_TYPES.SERVICE_PROVIDER){
            bgStyles = {backgroundColor: THEME_PRIMARY_COLOR}
        }
        return (
            <View style={[
styles.memBackground,
bgStyles,
this.props.style
]}>
                <Text style={styles.bdgCount}>{this.props.label}</Text>
            </View>
        )
}
}

const styles = StyleSheet.create({
    memBackground_I: {
        display: 'flex',
        width: setValueBasedOnHeight(18),
        height: setValueBasedOnHeight(18),
        borderRadius: setValueBasedOnHeight(9),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#3089d7',
        position: 'absolute',
        top: wp('6%'),
        left: wp('8%')
    },
    memBackground_G: {
        display: 'flex',
        width: setValueBasedOnHeight(18),
        height: setValueBasedOnHeight(18),
        borderRadius: setValueBasedOnHeight(9),
        alignItems: "center",
        justifyContent: "center",
         backgroundColor: '#ef6f48',
        position: 'absolute',
        top: wp('6%'),
        left: wp('8%')
    },
    memBackground_S: {
        display: 'flex',
        width: setValueBasedOnHeight(18),
        height: setValueBasedOnHeight(18),
        borderRadius: setValueBasedOnHeight(9),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: THEME_PRIMARY_COLOR,
        position: 'absolute',
        top: wp('6%'),
        left: wp('8%')
    },
    memBackground: {
        width: setValueBasedOnWidth(18),
        height: setValueBasedOnWidth(18),
        borderRadius: setValueBasedOnWidth(9),
        alignItems: "center",
        justifyContent: "center",
        top: setValueBasedOnHeight(5),
        left: -setValueBasedOnWidth(7),
        zIndex: 2
    },
    bdgCount: {
        fontSize: setFontSize(10),
        textAlign: 'center',
        color: '#fff'
    }
})