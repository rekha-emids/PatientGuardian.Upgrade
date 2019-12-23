import { StyleSheet } from 'react-native';
import { setHeight, setWidth, setFontSize, setValueBasedOnHeight, setValueBasedOnWidth} from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';
export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        display: 'flex',
        backgroundColor: 'rgba(128,0,128,0.3)'
    },
    backgroundimage: {
        width: setWidth(100),
        height: setHeight(100)
    },
    button: {
        marginTop: setValueBasedOnWidth(34),
        marginLeft: setValueBasedOnWidth(19),
        marginRight: setValueBasedOnWidth(19),
        justifyContent: 'center',
        backgroundColor: THEME_PRIMARY_COLOR,
        width: setValueBasedOnWidth(322),
        height: setValueBasedOnHeight(51),
        paddingTop: setValueBasedOnHeight(15),
        paddingBottom: setValueBasedOnHeight(15)
    },
    screenCoverStyle: {flex: 1},
    common: {
        color: "#FFF",
        fontFamily: "OpenSans",
        textAlign: 'center'
    },
    title: {
        paddingTop: setValueBasedOnHeight(29),
        fontSize: setFontSize(16)
    },
    subtitle: {fontSize: setFontSize(23)},
    loginForm: {
        flex: 3,
        justifyContent: 'center'
    },
    semibold: {fontWeight: '600'},
    login: {flex: 1},
    loginfont: {fontSize: setHeight(2.3)},
    icon: {width: setValueBasedOnWidth(66), height: setValueBasedOnHeight(64) },
    iconview: {marginTop: setValueBasedOnHeight(221), alignSelf: 'center'}
});
