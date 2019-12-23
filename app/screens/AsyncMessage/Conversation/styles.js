import { StyleSheet, Dimensions } from 'react-native'
import { setHeight, setValueBasedOnHeight, setValueBasedOnWidth, WIDTH, setFontSize } from '../../../utils/deviceDimensions';
GetHeightFunction = () =>  { 
    const Height_Holder = Dimensions.get('window').height;
    const inputHeight = Height_Holder / 10;

    return inputHeight;
  }

  export const getOnKeyBoardStyle = () => ({
        height: setValueBasedOnHeight(80), // 80,
        backgroundColor: "#f1f1fb",
        justifyContent: 'flex-start',
        alignItems: 'center'
    })
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';


export default StyleSheet.create({
  container: {
      height: setValueBasedOnHeight(78),
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#66307f'
  },
  topContainer: {
      paddingLeft: setValueBasedOnWidth(18),
      paddingRight: setValueBasedOnWidth(18)
  },
  viewContainer: {backgroundColor: "#fff", height: '100%'},
  msglistouterWrap: {
      flex: 1,
      flexDirection: 'row'
  },
  msglistouterWrap_ConScrn: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: setValueBasedOnHeight(5),
    width: '80%'

  },
  leftDig: {
    marginRight: '25%',    
    alignSelf: 'flex-start',
    justifyContent: 'flex-start'
  },
  rightDig: {
    marginLeft: '25%',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end'
  },
 
  avtrHolderImageWrap_ConScrn: {
    width: wp('12.6%'),
    justifyContent: 'flex-start'
  },
  profileIconinnerWrap: {
    width: setValueBasedOnWidth(27),
    height: setValueBasedOnWidth(27),
   borderRadius: setValueBasedOnWidth(13.5),
   marginHorizontal: setValueBasedOnWidth(7)
},
  
  avtrHolderRight: {
    width: wp('9.72%'),
    height: wp('9.72%'),
    marginTop: hp('3.125%'),
   
    borderRadius: hp('3.125%'),
    borderWidth: 1,
    borderColor: '#fff',
    position: 'relative',
    marginRight: hp('1.125%')
},


  
  avtrHolderLeft: {
      width: wp('9.72%'),
      height: wp('9.72%'),
      marginTop: hp('3.125%'),
      borderRadius: hp('3.125%'),
      borderWidth: 1,
      borderColor: '#fff',
      position: 'relative',
      left: hp('1.125%')
  },
  msglistmsgWrap: {
      justifyContent: 'center',
      backgroundColor: '#f1f1fb',
      borderRadius: setValueBasedOnWidth(20),
      minWidth: '55%'
  },
  msglistmsgWrapMe: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#989ad7',
    borderRadius: hp('3.125%'),
    marginTop: hp('3.125%'),
    borderTopRightRadius: 0,
    minWidth: wp('55.55%'),
    width: 'auto'
},
  sendmsgWrap: {flex: 1},
  msglistTitleWrap: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: setValueBasedOnWidth(10)
  },
  msglistmsgTitle: {
      fontSize: setFontSize(12),
      color: '#6c6c6c'
  },
  msgText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontSize: hp('2.1%'),
      marginBottom: hp('1.562%') //10,
  },
  imageThumbnail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1.562%'), 
    width: hp('10%'),
    height: hp('10%'),
    marginLeft: wp('5%')
},
  msglistmsgText: {
    fontSize: hp('2.1%'),
      marginLeft: wp('3.333%'), // 12,
      marginRight: wp('4.167%'), // 15,
      color: '#3c1053'
  },
  msglistmsgDate: {
    fontSize: setFontSize(12),
      color: '#b3b2b2'
  },
  msglistmsgDate_ConScrn: {
    fontSize: hp('1.8%'),
    color: '#3c1053',
    textAlign: 'right',
    marginRight: wp('4.167%')
},
  chatView: {
     flex: 1,
     backgroundColor: "#fff"
  },
  sendContainer: {
      height: setValueBasedOnHeight(50), // 80,
      backgroundColor: "#f1f1fb",
      alignItems: 'center',
      justifyContent: 'center'
     
  }, 

  sendContainerAtKeyBoardOpen: {
    flex: 2,
    height: hp('12.5%'), // 80,
    backgroundColor: "#fff"
},
  leftWrap: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    rightWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerWrap: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: hp('4.687%'), //30,
        height: GetHeightFunction.inputHeight
    },

    inputField: { 
        // height: setValueBasedOnHeight(42), 
        fontSize: setValueBasedOnHeight(16),
        backgroundColor: '#fff',
        borderColor: '#c8c8c8',
        borderWidth: 1,
        flex: 1,
        borderRadius: setValueBasedOnHeight(10)
        
    },
    actionButtons: {
        height: setValueBasedOnHeight(16),
        width: setValueBasedOnHeight(16)
    },
    message: {
        fontSize: setHeight(2.5),
        textAlign: 'center',
        color: '#373737'
    },
    modalStyle: {
        alignSelf: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        flex: 1,
        flexDirection: 'column'
    },

    headerContainer: {
        flexDirection: 'row',
        backgroundColor: THEME_PRIMARY_COLOR,
        height: setValueBasedOnHeight(56),
        width: WIDTH,
        alignItems: 'center'
    },
    sendBottonWrap: {
        alignSelf: 'center',
        marginHorizontal: setValueBasedOnWidth(10)
    },
    loadMore: {justifyContent: 'center'},
      alignCenter: {textAlign: 'center'}

})