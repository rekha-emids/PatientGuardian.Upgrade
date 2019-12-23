import { StyleSheet } from 'react-native';
import { setHeight, setWidth, setFontSize } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';
export default StyleSheet.create({
 
    container: {
        paddingLeft: setWidth(5.27),
        paddingRight: setWidth(5.27),
        height: setHeight(67),
        flexDirection: 'column'
        // justifyContent: 'space-between'
    },
    navtabs: {
        height: setHeight(10),
        top: -15,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        marginTop: setHeight(3.12),
        justifyContent: 'center',
        backgroundColor: THEME_PRIMARY_COLOR,
        height: setHeight(7.97),
        borderRadius: setHeight(1.56),
        fontSize: setHeight(2.3)
    },
    common: {
        color: "#FFF",
        textAlign: 'center',
        fontSize: setHeight(2.3),
         fontWeight: '600'
    },
    message: {
        fontSize: setHeight(2.5),
        textAlign: 'center',
        color: '#373737'
    },
    screenCoverStyle: {flex: 1},
    messageview: {marginTop: setHeight(4.06), flexDirection: 'row', justifyContent: 'flex-start'},
    icon: {width: setHeight(2.5), height: setHeight(2.5) },
    successmessage: {marginLeft: setWidth(2.77), color: '#277d25', fontSize: setHeight(2.187)},
    errormessage: {marginLeft: setWidth(2.77), color: '#dc3545', fontSize: setHeight(2.187)},
    infoview: {marginTop: setHeight(4.06)},
    info: {fontSize: setFontSize(15.5), fontFamily: "OpenSans", color: "#8c8c8c"},
    inputstyle: {height: setHeight(6.25), borderBottomColor: '#B8B3B3', borderBottomWidth: 1}
});