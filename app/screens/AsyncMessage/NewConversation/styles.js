import { StyleSheet } from 'react-native';
import { setHeight, setValueBasedOnHeight, setValueBasedOnWidth } from '../../../utils/deviceDimensions';
const conversationstyles1 = StyleSheet.create({
    container: {
        height: setValueBasedOnHeight(78),
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#66307f' 
    },
    topContainer: {paddingLeft: setValueBasedOnWidth(18)},
    contentContainer: {paddingBottom: 20},
    addIcon: {
        flex: 2,
        height: '35%',
        width: '35%',
        marginLeft: '78%',
        position: 'absolute',
        zIndex: 1,
        marginTop: 23
    },
    TextboxContainer: {
        height: setValueBasedOnHeight(111),
        backgroundColor: "#fff"
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
        marginTop: setValueBasedOnHeight(19)
      
    },
    pickerTitle: {
        color: "#444444",
        fontSize: setValueBasedOnHeight(12),
        marginTop: setValueBasedOnHeight(14)
    },
    searchBar: {backgroundColor: "#f7f7f7"},
    ParticipantsListContainer: {
        backgroundColor: "#fff",
        height: 320
    },
  
    HeaderText: {
        fontSize: setValueBasedOnHeight(18),
        color: '#fff',
        alignSelf: 'center'
    },
   
    HeaderTextIos: {fontSize: 24, color: '#fff', textAlign: 'right', marginTop: 28, marginLeft: '5%'},
    Icon: {flex: 2},
    headerTextFlex: {flex: 6},
    button: {
        height: setValueBasedOnHeight(18),
        width: setValueBasedOnHeight(18),
        alignSelf: 'center'
    },
    rightIcon: {
        height: setValueBasedOnHeight(16),
        width: setValueBasedOnHeight(16)
    },
    rightIconIOS: {
        height: setValueBasedOnHeight(23),
        width: setValueBasedOnHeight(23),
        top: 40,
        marginLeft: setValueBasedOnWidth(18)
    },
    leftIcon: {
        height: setValueBasedOnHeight(16),
        width: setValueBasedOnHeight(16)
    },
    leftIconIOS: {
        height: setValueBasedOnHeight(20),
        width: setValueBasedOnHeight(20),
        top: 38,
        marginLeft: setValueBasedOnWidth(18)
    },
    planstyle: {
        height: setHeight(6.25),
        fontSize: setHeight(2.5),
        width: '100%'
    },
    message: {
        fontSize: setHeight(2.5),
        textAlign: 'center',
        color: '#373737'
    },
    titleText: {
        marginTop: 32,
        marginLeft: 7
    },
    searchIcon: {marginLeft: 5}
    
});


export default conversationstyles1;