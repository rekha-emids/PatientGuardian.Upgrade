import { StyleSheet } from 'react-native';
import { setHeight, setWidth, setValueBasedOnWidth, setValueBasedOnHeight, setFontSize } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';
export default StyleSheet.create({
    container: {flex: 1},
    backgroundimage: {
        width: setValueBasedOnWidth(360),
        height: setValueBasedOnHeight(640)
    },
    titleView: {flex: 1},
    content: {
        flex: 6,
        justifyContent: 'flex-start'
    },
    childComponent: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    account: {marginBottom: setValueBasedOnHeight(7)},
     common: {
        color: "#FFF",
        fontFamily: "OpenSans",
        textAlign: 'center',
        justifyContent: 'center'
    },
    title: {
        flex: 4,
        marginTop: setHeight(12.03),
        alignItems: "center",
        justifyContent: "center"
    },
    subtitle: {
        fontSize: setFontSize(18),
        fontWeight: '600',
        marginBottom: setValueBasedOnHeight(10)
    },
    description: {
        fontSize: setFontSize(14),
        paddingHorizontal: setValueBasedOnWidth(16)
    },
    padding: {
        paddingLeft: setWidth(5.27),
        paddingRight: setWidth(5.27)
    },
    loginButton: {
        justifyContent: 'center',
        height: setValueBasedOnHeight(51),
        borderRadius: setValueBasedOnWidth(10),
        marginBottom: setValueBasedOnHeight(23),
        width: setValueBasedOnWidth(320),
        alignSelf: "center",
        borderWidth: setValueBasedOnHeight(1),
        borderColor: '#ffffff'
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
    semibold: {fontWeight: '600'},
    login: {marginTop: setHeight(3.59)},
    loginfont: {fontSize: setHeight(2.3)},
    bigFont: {fontSize: setFontSize(16)},
    logo: {
        width: setValueBasedOnWidth(220),
        height: setValueBasedOnHeight(36),
        marginTop: setValueBasedOnHeight(55),
        alignSelf: "center",
        marginBottom: setValueBasedOnHeight(220)
    },
    buttonsContainer: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        marginTop: setValueBasedOnHeight(400)
    },
    message: {fontSize: setFontSize(14)},
    network: {
        height: setHeight(5),
        marginBottom: setValueBasedOnHeight(2)
    },
    onBoardingfont: {
        fontSize: setHeight(2.0),
        alignSelf: 'center',
        color: "#dc3545",
        fontFamily: "OpenSans",
        textAlign: 'center',
        justifyContent: 'center'
    },
    emptyButton: {
        height: setValueBasedOnHeight(51)
    },
});
