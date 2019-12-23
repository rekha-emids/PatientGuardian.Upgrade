import { StyleSheet } from 'react-native';
import { setHeight, setWidth, setFontSize } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';
export default StyleSheet.create({
    container: {
        paddingLeft: setWidth(5.27),
        paddingRight: setWidth(5.27)
    },
    title: {
        fontSize: setHeight(2.81),
        color: '#373737'
    },
    fontfamily: {fontFamily: "OpenSans"},
    modalStyle: {
        height: setHeight(30),
        width: setWidth(80)
    },
    message: {
        fontSize: setHeight(2.5),
        textAlign: 'center',
        color: '#373737'
    },
    support: {
        textAlign: 'center',
        color: '#222222',
        fontSize: setHeight(2.187)
    },
    supportView: {
        marginTop: setHeight(5),
        marginLeft: setWidth(20),
        marginRight: setWidth(20)
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
    line: {
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        opacity: 0.12
    },
    messageview: {marginTop: setHeight(3.12), flexDirection: 'row', justifyContent: 'flex-start'},
    icon: {width: setHeight(3.12), height: setHeight(3.12) },
    errormessage: {fontSize: setHeight(2.187), marginLeft: setWidth(2.77), color: '#dc3545'},
    planmargin: {marginTop: setHeight(1.87)},
    planstyle: { height: setHeight(6.25), fontSize: setHeight(2.5), width: '100%' },
    detailsmargin: {marginTop: setHeight(5.15)},
    memberstyle: {marginTop: setHeight(4.06), height: setHeight(7.08)},
    calendermargin: {marginTop: setHeight(4.06)},
    calendertext: {fontSize: setHeight(2.5), color: '#373737'},
    calenderheight: {height: setHeight(6.25)},
    resulttitle: {marginTop: setHeight(5.15)},
    listmargin: {marginTop: setHeight(2.5)},
    dateText: {fontSize: setFontSize(14)}
});