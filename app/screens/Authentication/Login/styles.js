import { StyleSheet } from 'react-native';
import { setFontSize, setValueBasedOnHeight, setValueBasedOnWidth, setHeight } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';

export default StyleSheet.create({
    common: {
        color: "#FFF",
        fontFamily: "OpenSans",
        textAlign: 'center',
        justifyContent: 'center'
    },
    title: {fontSize: setFontSize(34)},
    subtitle: {
        fontSize: setFontSize(16),
        marginTop: setValueBasedOnHeight(5)
    },
    padding: {},
    spaceBetUnPW: {
        marginTop: setValueBasedOnHeight(30),
        marginBottom: setValueBasedOnHeight(25),
        alignSelf: "center"
    },
    loginForm: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'flex-start'
        // paddingBottom: 45,
    },
    loginHeader: {
        flex: 2.5,
        justifyContent: 'center',
        alignItems: "center"
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
        flex: 0.7,
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
        marginBottom: setValueBasedOnHeight(5),
        width: setValueBasedOnWidth(280),
        alignSelf: 'center'
    },
    frgPassword: {fontSize: setFontSize(16)},
    errormessage: {
        color: '#db4b66',
        marginBottom: setValueBasedOnHeight(20),
        fontSize: setFontSize(12),
        textAlign: 'center'
    },
    errormessageOne: {
        color: '#db4b66',
        marginBottom: setValueBasedOnHeight(20),
        fontSize: setFontSize(12),
        textAlign: 'left'
        // marginRight:(105)
    },

    errormessageTwo: {
        color: '#db4b66',
        marginBottom: setValueBasedOnHeight(20),
        fontSize: setFontSize(12)
        // textAlign: 'left'
    },
    logo: {
        width: setValueBasedOnWidth(220),
        height: setValueBasedOnHeight(36)
    }
});
