import { StyleSheet } from 'react-native';
import { setHeight, setWidth, setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';
export default StyleSheet.create({
    wizScreenContainer: {
        flex: 0,
        height: setHeight(80)
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
    supportView: {marginTop: setHeight(5)},
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
    memberidstyle: {marginTop: setHeight(4.06), height: setHeight(7.08), justifyContent: 'space-between'},
    relationview: {
        marginTop: setHeight(5.15),
        marginBottom: setValueBasedOnHeight(20)
    },
    errorview: {marginTop: setHeight(1.2)},
    iconStyle: {
        marginTop: setValueBasedOnHeight(25), 
        position: 'absolute',
        width: setValueBasedOnHeight(25),
        height: setValueBasedOnHeight(25),
        marginLeft: setValueBasedOnWidth(305)
    },
    popcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
      },
      transparentContainer: {
        paddingLeft: setValueBasedOnWidth(18),
        paddingRight: setValueBasedOnWidth(12),
        backgroundColor: "transparent",
        width: setValueBasedOnWidth(360),
        height: setValueBasedOnHeight(640),
        marginLeft: setValueBasedOnWidth(15)
      },
      screenCoverStyle: {flex: 1},
      dateText: {fontSize: setFontSize(14)}
     
});
