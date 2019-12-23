import { StyleSheet } from 'react-native';
import { setWidth, setFontSize, setValueBasedOnHeight, setHeight, setValueBasedOnWidth } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';

export default StyleSheet.create({
    common: {
        color: "#FFF",
        fontFamily: "OpenSans",
        textAlign: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: setFontSize(16),
        fontWeight: '600',
        marginBottom: setValueBasedOnHeight(10),
        width: setValueBasedOnWidth(280)
    },
    subtitle: {
        fontSize: setFontSize(14),
        marginTop: setValueBasedOnHeight(5)
    },
    padding: {
        paddingLeft: setWidth(5.27),
        paddingRight: setWidth(5.27)
    },
    loginForm: {
        flex: 1,
        paddingLeft: setValueBasedOnWidth(40),
        paddingRight: setValueBasedOnWidth(40),
        justifyContent: 'flex-start',
        marginBottom: 90
    },
    loginHeader: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingLeft: setValueBasedOnWidth(40),
        paddingRight: setValueBasedOnWidth(40),
        paddingBottom: setValueBasedOnHeight(40)

    },
    button: {
        justifyContent: 'center',
        backgroundColor: THEME_PRIMARY_COLOR,
        height: setValueBasedOnHeight(51),
        borderRadius: setValueBasedOnWidth(10),
        marginBottom: setValueBasedOnHeight(23),
        width: setValueBasedOnWidth(320),
        alignSelf: "center"
    },
    login: {       
        flex: 1,
        paddingTop: 100
    },
    loginfont: {
        fontSize: setHeight(2.3),
        fontWeight: '600'
    },
    textboxField: {
        color: '#FFF',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        paddingBottom: 0,
        fontSize: setFontSize(16),
        marginBottom: setValueBasedOnHeight(40),
        width: setValueBasedOnWidth(280),
        alignSelf: 'center'
    },
    errormessage: {color: '#dc3545'}
});
