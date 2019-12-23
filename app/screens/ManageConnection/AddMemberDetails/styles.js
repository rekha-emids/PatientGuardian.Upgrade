import { StyleSheet } from 'react-native';
import { setHeight, setWidth, setValueBasedOnWidth, setValueBasedOnHeight} from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';
export default StyleSheet.create({
    HeaderContainer: {
        justifyContent: 'center',
        height: setValueBasedOnHeight(80),
        backgroundColor: '#3b104f'
    },
    contentCenter: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    iconStyle: {
        marginTop: setValueBasedOnHeight(25), 
        position: 'absolute',
        width: setValueBasedOnHeight(25),
        height: setValueBasedOnHeight(25),
        marginLeft: setValueBasedOnWidth(305)
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingLeft: setValueBasedOnWidth(15),
        paddingRight: setValueBasedOnWidth(15)
    },
    fontLarge: {
        alignSelf: 'center',
        fontSize: setValueBasedOnHeight(18),
        fontWeight: '600',
        color: '#ffffff'
    },
    container: {
        paddingLeft: setWidth(5.27),
        paddingRight: setWidth(5.27)
    },
    title: {
        fontSize: setHeight(2.81),
        color: '#373737',
        marginBottom: setValueBasedOnHeight(10)
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
    errormessage: {fontSize: setHeight(2.187), color: '#dc3545'},
    marginLeft: {marginLeft: setWidth(2.77)},
    planmargin: {marginTop: setHeight(1.87)},
    planstyle: { height: setHeight(6.25), fontSize: setHeight(2.5), width: '100%' },
    detailsmargin: {marginTop: setHeight(5.15)},
    memberstyle: {marginTop: setHeight(4.06), height: setHeight(7.08)},
    calendermargin: {marginTop: setHeight(4.06)},
    calendertext: {fontSize: setHeight(2.5), color: '#373737'},
    calenderheight: {height: setHeight(6.25)},
    resulttitle: {marginTop: setHeight(5.15), marginBottom: setValueBasedOnHeight(30)},
    listmargin: {marginTop: setHeight(2.5)},
    errorview: {marginTop: setHeight(2)}
});