import { StyleSheet } from 'react-native';
import {setFontSize,  setValueBasedOnHeight, setValueBasedOnWidth} from '../../../utils/deviceDimensions';
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
        fontWeight: '500'
        // marginTop: 200,
    },
    subtitle: {

        fontSize: setFontSize(14),
        marginTop: 25
    },
    padding: {
        flex: 1.63,
        marginBottom: setValueBasedOnHeight(100)
    },
    loginForm: {
       alignItems: 'center',
        justifyContent: 'center'
    },
    loginHeader: {
        flex: 2,
        justifyContent: 'center',
        paddingHorizontal: setValueBasedOnWidth(24),
        marginTop: setValueBasedOnHeight(100)

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
    login: {flex: 0.60},
    loginfont: {
        fontSize: setFontSize(16)
        // fontWeight:'600'
    },
    textboxField: {
        color: '#FFF',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        paddingBottom: 0,
        fontSize: setFontSize(16),
        marginBottom: setValueBasedOnHeight(40),
        width: setValueBasedOnWidth(280)
    },
    frgPassword: {fontSize: setFontSize(16)},
    errormessage: {color: '#dc3545'},
    container: {flex: 4}
});
