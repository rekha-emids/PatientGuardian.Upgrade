import { StyleSheet } from 'react-native';
import { setHeight, setWidth, setValueBasedOnHeight } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';
export default StyleSheet.create({
    container: {
        paddingLeft: setWidth(5.27),
        paddingRight: setWidth(5.27)
    },
    memberstyle: {marginTop: setHeight(4.06), height: setHeight(7.08)},
    title: {
        fontSize: setHeight(2.81),
        color: '#373737',
        fontFamily: "OpenSans"
    },
    sidemargin: {
        paddingLeft: setWidth(5.27),
        paddingRight: setWidth(5.27)
    },
    listmargin: {marginTop: setHeight(1.56)},
    relationview: {marginTop: setHeight(5.15)},
    planstyle: { height: setHeight(6.25), fontSize: setHeight(2.5), width: '100%' },
    line: {
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        opacity: 0.12,
        marginTop: setValueBasedOnHeight(7)
    },
    button: {
        marginTop: setHeight(3.12),
        justifyContent: 'center',
        backgroundColor: THEME_PRIMARY_COLOR,
        height: setHeight(7.97),
        borderRadius: setHeight(1.56),
        fontWeight: '600',
        fontSize: setHeight(2.3)
    },
    common: {
        color: "#FFF",
        textAlign: 'center',
        fontSize: setHeight(2.3),
        fontWeight: '600'
    },
    errormessage: {fontSize: setHeight(2.187), color: '#dc3545'},
    errorview: {marginTop: setHeight(1.2)},
    messageview: {marginTop: setHeight(4.06), flexDirection: 'row', justifyContent: 'flex-start'},
    icon: {width: setHeight(2.5), height: setHeight(2.5) },
    successmessage: {marginLeft: setWidth(2.77), color: '#277d25', fontSize: setHeight(2.187)},
    message: {
        fontSize: setHeight(2.5),
        textAlign: 'center',
        color: '#373737'
    }
});