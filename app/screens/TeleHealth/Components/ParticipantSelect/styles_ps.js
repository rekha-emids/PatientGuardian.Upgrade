import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../../utils/deviceDimensions';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';
const conversationstyles_ps = StyleSheet.create({

    ps_outerWrap: {
        paddingVertical: setValueBasedOnHeight(10),
        backgroundColor: 'white',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingHorizontal: setValueBasedOnWidth(10)
    },
    ps_innerLeftWrap: {flexDirection: "row"},
    ps_innerMidWrap: {
        flex: 7,
        paddingLeft: setValueBasedOnWidth(30) 
    },
    ps_innerRightWrap: {
        flex: 1,   
        paddingRight: wp('3%') 
    },
    ps_innerRightWrapStatus: { 
        paddingRight: wp('3%'), 
        justifyContent: 'center'
    },
    profileIconinnerWrap: {
        width: setValueBasedOnWidth(28),
        height: setValueBasedOnWidth(28),
        borderRadius: setValueBasedOnWidth(14),
        borderColor: 'transparent',
        borderWidth: 1,
        resizeMode: "cover"
    },
    ps_badge: {
        alignSelf: 'flex-end',
        marginLeft: -setValueBasedOnWidth(7)
    },
    msglistmsgTitle: {
        flex: 1,
        fontSize: setFontSize(14),
        color: '#2b2b2b',
        marginLeft: setValueBasedOnHeight(15)

    },
    actionView: {
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6'
    },
    participantSelectIconWrap: {
        height: setValueBasedOnWidth(25),
        width: setValueBasedOnHeight(25),
        alignSelf: 'center'
   }


});


export default conversationstyles_ps;