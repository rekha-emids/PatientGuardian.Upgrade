import { StyleSheet } from 'react-native';
import { setHeight, setWidth, setFontSize, setValueBasedOnHeight } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';

export default StyleSheet.create({
    container: {
        flexDirection: 'column',
        display: 'flex',
        backgroundColor: 'rgba(30,61,92,0.5)'
    },
    backgroundimage: {
        width: setWidth(100),
        height: setHeight(100)
    },
    titleView: {},
    common: {
        color: "#FFF",
        fontFamily: "OpenSans",
        textAlign: 'center'
    },
    title: {
        fontSize: setFontSize(14),
        marginTop: setValueBasedOnHeight(10)
    },
    padding: {},
    loginForm: {
        flex: 0.75,
        justifyContent: 'center'
    },
    loginHeader: {
        flex: 0.25,
        justifyContent: 'flex-end' 
    },
    button: {
        justifyContent: 'center',
        backgroundColor: THEME_PRIMARY_COLOR,
        borderRadius: 6,
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 20
    },

    semibold: {fontWeight: '600'},
    login: {paddingTop: 100},
    loginfont: {fontSize: setHeight(2.3)},
    inputField: {color: '#fff'},
    textboxField: {
        color: '#FFF',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        paddingBottom: 0,
        fontSize: 16,
        marginBottom: 30
    },
    frgPassword: {fontSize: 18},
    icon: {width: setHeight(8.43), height: setHeight(8.43) },
    iconview: {marginTop: setHeight(7.65), alignSelf: 'center'}
});
