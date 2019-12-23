import { StyleSheet } from 'react-native';
import { setHeight, setWidth, setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';
export default StyleSheet.create({
    modalStyle: {
        marginTop: setHeight(35),
        alignSelf: 'center',
        borderRadius: setHeight(1),
        borderWidth: 2,
        borderColor: '#DCDCDC',
        height: setHeight(30),
        width: setWidth(86),
        backgroundColor: 'white'
    },
    content: {
        flex: 1,
        marginHorizontal: setValueBasedOnWidth(20),
        marginVertical: setValueBasedOnHeight(10),
        flexDirection: 'column',
        justifyContent: 'space-between'

    },
    confirmationMessage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    controls: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonMargin: {
        flex: 1,
        margin: 10
    },
    modalSecondaryBtn: {
        height: setValueBasedOnHeight(41),
        width: setValueBasedOnWidth(120),
        borderWidth: 1,
        borderColor: THEME_PRIMARY_COLOR,
        backgroundColor: "white",
        borderRadius: setValueBasedOnWidth(5),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: "center"
    },
    modalPrimaryBtn: {
        height: setValueBasedOnHeight(41),
        width: setValueBasedOnWidth(120),
        borderWidth: 1,
        borderColor: THEME_PRIMARY_COLOR,
        backgroundColor: THEME_PRIMARY_COLOR,
        borderRadius: setValueBasedOnWidth(5),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: "center"
    },
    modalPrimaryBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: setFontSize(12),
        textAlign: "center",
        alignSelf: 'center'
    },

    modalSecondaryBtnText: {
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(12),
        textAlign: "center"
    },
    textStyle: {textAlign: "center"}
})