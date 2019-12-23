import { StyleSheet } from 'react-native';
import { setHeight, setValueBasedOnHeight, setValueBasedOnWidth } from '../../../utils/deviceDimensions';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';
const AsyncStyle = StyleSheet.create({

    wrapperView: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
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
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
        
    },
    topContainerOne: {
        paddingLeft: 15,
        paddingRight: 15,
        display: 'flex',
        backgroundColor: '#fff'
    },
    topContainerTwo: {
        paddingLeft: 15,
        paddingRight: 15,             
        display: 'flex',
        height: setValueBasedOnHeight(100),
        flexDirection: 'column',
        marginTop: setValueBasedOnHeight(10)
    },


    headerRightIcons: {
        width: 20,
        height: 20
    },
    topContainer: {
        paddingLeft: 15,
        paddingRight: 15
    },
    
    titleText: {
        marginTop: 10,
        marginLeft: 7

    },
    titleText_appParts: {marginBottom: 0},
    pickerTitle: {
        color: "#444444",
        fontSize: setValueBasedOnHeight(12),
        marginTop: setValueBasedOnHeight(14)
    },
    planstyle: {
        height: setHeight(6.25),
        fontSize: setHeight(2.5),
        width: '100%'
    },
    participantContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: setValueBasedOnHeight(111),
        backgroundColor: "#f7f7f7"
    },
    addPtext: {
        color: "#444444",
        fontSize: setValueBasedOnHeight(16),
        marginBottom: 15
        // marginLeft:15,
        
      
    },
    searchBar: {
        flex: 2,        
        borderColor: 'transparent'
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
    ParticipantsListIndividualContainer: {
        flex: 1,
        backgroundColor: "#fff"
        
    },
    ParticipantsListGaurdianContainer: {
        flex: 1,
        backgroundColor: "#fff"
        
    },
    message: {
        fontSize: setHeight(2.5),
        textAlign: 'center',
        color: '#373737'
    },

    button: {
        justifyContent: 'center',
        backgroundColor: THEME_PRIMARY_COLOR,
        height: setHeight(7.97),
        borderRadius: setHeight(1.56)
    },
    buttonText: {
        color: "#FFF",
        fontFamily: "OpenSans",
        textAlign: 'center',
        fontSize: setHeight(2.3),
        fontWeight: '600'
    },

    textWrapper: {
        flex: 1,
        justifyContent: 'center'
    },

     emptyText: {textAlign: 'center'}
})

export default AsyncStyle;