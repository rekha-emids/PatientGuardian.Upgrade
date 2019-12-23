import { StyleSheet, Platform } from 'react-native';
import { setHeight, setWidth } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';
export default StyleSheet.create({
    wizScreenContainer: {
        flex: 0,
        height: setHeight(80)
    },
    container: {
        marginLeft: setWidth(5.27),
        marginRight: setWidth(5.27)
    },
    button: {
        marginBottom: setHeight(2),
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
    header: {
        justifyContent: 'center',
        height: setHeight(14.21),
        backgroundColor: '#3b104f'
    },
    subheader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textStyle: {
        fontSize: setHeight(2.81),
        color: '#FFF'
    },
    imagestyle: {
        color: '#FFF',
        width: setHeight(4),
        height: setHeight(4)
    },
    message: {
        fontSize: setHeight(2.5),
        textAlign: 'center',
        color: '#444444'
    },
    iosStyle: {borderBottomColor: Platform.OS === 'ios' ? '#ff0000' : 'transparent'},
    screenCoverStyle: {flex: 1},
    modalcontainer: {backgroundColor: '#fff', flex: 1},
    modalView: { flex: 1, flexDirection: 'column', justifyContent: 'space-between', paddingLeft: setWidth(5.27), paddingRight: setWidth(5.27)},
    messageview: {marginTop: setHeight(3.12), flexDirection: 'row', justifyContent: 'flex-start'},
    icon: {width: setHeight(3.12), height: setHeight(3.12) },
    errormessage: {fontSize: setHeight(2.187), marginLeft: setWidth(2.77), color: '#dc3545'},
    tandctitle: {fontSize: setHeight(2.5), fontWeight: '600', color: '#373737'},
    tandcdesc: {fontSize: setHeight(2.187), color: '#5d5c5c'},
    margintop: {marginTop: setHeight(3.12)},
    circle: {backgroundColor: 'pink', height: setHeight(2.81), width: setHeight(2.81), borderRadius: setHeight(1.405)},
    memberstyle: {marginTop: setHeight(4.06), height: setHeight(7.08)},
    termsconditions: {marginTop: setHeight(4.06), flexDirection: 'row', justifyContent: 'flex-start'},
    termsmargin: {fontSize: setHeight(2.187), color: '#222222', marginLeft: setWidth(5), marginRight: setWidth(5)}
});