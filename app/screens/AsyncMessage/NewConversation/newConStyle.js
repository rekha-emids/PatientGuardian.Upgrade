import { StyleSheet } from 'react-native';
import { setHeight, setValueBasedOnHeight, setValueBasedOnWidth, setFontSize, WIDTH } from '../../../utils/deviceDimensions';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';
const AsyncStyle = StyleSheet.create({

    wrapperView: {flex: 1},
    textWrapper: {flex: 1, justifyContent: 'center'},
    scrollStyle: {backgroundColor: 'white'},
    
    emptyText: {textAlign: 'center'},
    nCom_headerContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#66307f',
        paddingLeft: 15,
        paddingRight: 15,
        height: 70      
    },
    nCom_headerLeftWrap: {
        maxWidth: 60,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    nCom_headerMidWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nCom_headerRightWrap: {
        flex: 1,
        maxWidth: 70,        
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    },

    nCom_HeaderTextSd: {
        fontSize: 20,
        color: '#fff',
        alignSelf: 'center'
    },
    nCom_HeaderTextLd: {
        fontSize: 30,
        color: '#fff',
        alignSelf: 'center'
    },
    nCom_headerRightIcons: {
        width: 20,
        height: 20
    },
    nCom_contentContainer: {
        display: 'flex',
        flexDirection: 'column'
        
    },
    topContainerOne: {        
        backgroundColor: '#fff',
        padding: setValueBasedOnWidth(10)
    },
    topContainerTwo: {
        paddingLeft: setValueBasedOnWidth(15),
        paddingRight: setValueBasedOnWidth(15),             
        marginTop: setValueBasedOnHeight(10)
    },


    headerRightIcons: {
        width: 20,
        height: 20
    },
    topContainer: {},
    selectComp: {
        flex: 3,
        marginBottom: 0

    },    
    titleText: {
        marginTop: 10,
        marginLeft: 7

    },
    titleText_appParts: {marginTop: setValueBasedOnHeight(10)},
    pickerTitle: {
        color: "#444444",
        fontSize: setFontSize(12),
        marginTop: setValueBasedOnHeight(14)
    },
    planstyle: {
        fontSize: setFontSize(12),
        width: setValueBasedOnWidth(WIDTH - 20),
        marginLeft: -setValueBasedOnWidth(16),
        marginTop: setValueBasedOnHeight(10)
    },
    participantContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: setValueBasedOnHeight(111),
        backgroundColor: "#f7f7f7"
    },
    addPtext: {
        color: "#444444",
        fontSize: setFontSize(14)
        // marginLeft:15,
        
      
    },
    searchBar: {
        borderColor: 'transparent',
        marginVertical: setValueBasedOnHeight(12)
    },
    searchBarInput: {
        
        backgroundColor: '#fff',
        opacity: 0
        // position:'absolute',
        // top:0,
        // bottom:0,
        // left:0,
        // top:0,
    },
    rightIconIOS: {
        height: setValueBasedOnHeight(23),
        width: setValueBasedOnHeight(23),
        top: 40,
        marginLeft: setValueBasedOnWidth(18)
    },
    rightIcon: {
        height: setValueBasedOnHeight(16),
        width: setValueBasedOnHeight(16)
    },
    searchIcon: {marginLeft: 5},
    ParticipantsListContainer: {
        height: hp('55%'),
        backgroundColor: "#fff"
        
    },
    message: {
        fontSize: setHeight(2.5),
        textAlign: 'center',
        color: '#373737'
    },
    textWrapper: {
        flex: 1,
        justifyContent: 'center'
    },

     emptyText: {textAlign: 'center'}
})

export default AsyncStyle;