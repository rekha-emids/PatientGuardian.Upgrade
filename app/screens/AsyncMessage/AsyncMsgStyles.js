import { StyleSheet, Platform} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';
import { setValueBasedOnHeight, setValueBasedOnWidth, WIDTH, setFontSize} from '../../utils/deviceDimensions';




const AMStyle = StyleSheet.create({
    wrapperView: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
    headerContainer: {
        height: setValueBasedOnHeight(56),
        width: WIDTH,
        flexDirection: "row",
        alignItems: "center",
        ...Platform.select({
         android: {elevation: 5},
         ios: {
             shadowOffset: {height: 2},
            shadowOpacity: 1,
             shadowColor: "rgba(0, 0, 0, 0.12)"
         },
         flex: 1
        })
        
    },
    LeftWrap: {
        width: wp('17.4%'),
        justifyContent: 'center',
        alignItems: 'center',
        height: wp('10%'),
        paddingTop: wp('5%')
    },
    MidWrap: {
        width: setValueBasedOnWidth(WIDTH - setValueBasedOnWidth(100)),
        justifyContent: 'center',
        height: setValueBasedOnHeight(50)
    },
    RightWrap: {
        width: wp('19.6%'),
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        height: wp('10%'),
        paddingTop: wp('5%')
    },
    
    inputFieldBtm: { 
        fontSize: setFontSize(14),
        backgroundColor: '#fff',
        borderColor: '#c8c8c8',
        borderWidth: 1,
        borderRadius: setValueBasedOnWidth(5),
        flex: 1,
        marginHorizontal: setValueBasedOnWidth(10),
        height: setValueBasedOnHeight(40),
        paddingTop: setValueBasedOnHeight(10)
        
    },



    headerLeftWrap: {
        width: wp('17.4%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerMidWrap: {
        width: wp('63.0%'),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    headerRightWrap: {
        width: wp('19.6%'),
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerRightIcons: {
        width: setValueBasedOnHeight(16),
        height: setValueBasedOnHeight(16)
    },
    contentContainer: {
        flex: 8,
        display: 'flex',
        flexDirection: 'column'       
    },
    padR30: {marginRight: 30},
    headerText: {
        fontFamily: 'OpenSans',
        fontSize: wp('5%'),
        fontWeight: '600',
        fontStyle: 'normal',
        lineHeight: 40,
        letterSpacing: -0.4,
        textAlign: 'left',
        color: '#ffffff'
    },
    HeaderTextSd: {
        fontSize: wp('5.5%'),
        color: '#fff',
        alignSelf: 'center'
    },
    HeaderTextLd: {
        fontSize: setValueBasedOnHeight(16),
       color: "white",
       fontWeight: '500',
       fontFamily: "OpenSans",
       textAlign: 'center',
       alignSelf: 'center'
    },
    msglistouterWrapMessage: {
      
        flexDirection: 'row',
        backgroundColor: "#f1f1fb"
    },
    msglistouterWrapMe: {
        height: hp('9.8%'),
        backgroundColor: '#f8f1ff',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        justifyContent: "center",
        alignItems: "center"
    },
    msglistouterWrap: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: setValueBasedOnHeight(7),
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    avtrHolderLeft: {
        width: wp('10.55%'),
        height: wp('10.55%'),
        borderRadius: wp('5.25%'),
        borderWidth: 1,
        borderColor: '#fff',
        position: 'absolute',
        left: '5%',
        top: '17%'
    },
    avtrHolderLeftBadge: {marginLeft: '-50'}
    

})

export default AMStyle;