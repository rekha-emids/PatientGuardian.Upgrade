import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../../utils/deviceDimensions';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';
const conversationstyles_ps = StyleSheet.create({

    ps_outerWrap: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: setValueBasedOnHeight(60)
        // paddingLeft: setValueBasedOnWidth(18),
        // paddingRight: setValueBasedOnWidth(18),
    },
    ps_innerLeftWrap: {
        flex: 1,
        width: 80        
    },
    ps_innerMidWrap: {
        flex: 10, 
        paddingLeft: wp('3%')   
    },
    ps_innerRightWrap: {
        flex: 1,   
        paddingRight: wp('3%') 
    },
    profileIconinnerWrap: {
        height: wp('8%'),
        width: wp('8%'),
        zIndex: 0,
        alignSelf: 'center',
        top: '25%',
        position: 'absolute',
        left: 15
    },
    ps_badge: {
        alignSelf: 'flex-end',
        marginLeft: -setValueBasedOnWidth(7)
    },
    msglistmsgTitle: {
        flex: 1,
        fontSize: setFontSize(12),
        color: '#2b2b2b',
        marginLeft: setValueBasedOnHeight(15)

    },
    actionView: {},
    participantSelectIconWrap: {
        height: setValueBasedOnWidth(20),
        width: setValueBasedOnWidth(20)
   }


});


export default conversationstyles_ps;