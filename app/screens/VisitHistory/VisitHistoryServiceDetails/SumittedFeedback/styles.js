import {StyleSheet} from 'react-native'
import { setFontSize, setValueBasedOnWidth, setValueBasedOnHeight } from '../../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../../constants/theme';

export default StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingHorizontal: setValueBasedOnWidth(15),
        paddingVertical: setValueBasedOnHeight(22),
        flex: 1
    },
    questionText: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans",
        marginBottom: setValueBasedOnHeight(18)
    },
    optionText: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans",
        marginLeft: setValueBasedOnWidth(15)
    },
    optionContainer: {
        flexDirection: "row",
        borderWidth: setValueBasedOnWidth(1),
        borderRadius: setValueBasedOnWidth(4),
        borderColor: "#dcdcdc",
        flex: 1,
        paddingVertical: setValueBasedOnHeight(10),
        paddingHorizontal: setValueBasedOnWidth(17),
        alignItems: "center",
        marginBottom: setValueBasedOnHeight(12)
    },
    alertQuestion: {borderColor: THEME_PRIMARY_COLOR},
    selectedOptionStyle: {borderColor: THEME_PRIMARY_COLOR},
    unSelectedRadioButton: {
        width: setValueBasedOnWidth(20),
        height: setValueBasedOnWidth(20),
        borderRadius: setValueBasedOnWidth(10),
        borderColor: "#444444",
        borderWidth: setValueBasedOnWidth(2)
    },
    selectedRadioButton: {
        width: setValueBasedOnWidth(20),
        height: setValueBasedOnWidth(20),
        borderRadius: setValueBasedOnWidth(10),
        borderColor: THEME_PRIMARY_COLOR,
        borderWidth: setValueBasedOnWidth(2),
        alignItems: "center",
        justifyContent: "center"
    },
    selectedButtonInnerCircle: {
        width: setValueBasedOnWidth(10),
        height: setValueBasedOnWidth(10),
        backgroundColor: THEME_PRIMARY_COLOR,
        borderRadius: setValueBasedOnWidth(5)
    },
    stars: {
        flexDirection: "row",
        marginBottom: setValueBasedOnHeight(22)
    },
    margin: {marginHorizontal: setValueBasedOnWidth(8)},
    inputStyle: {
        height: 92,
        flex: 1,
        borderColor: "#444444",
        borderWidth: setValueBasedOnWidth(1),
        borderRadius: setValueBasedOnWidth(4)
    },
    textStyle: {
        color: "white",
        fontWeight: '500',
        fontSize: setFontSize(16),
        textAlign: "center",
        fontFamily: "OpenSans"
    },
    buttonContainer: {
        backgroundColor: THEME_PRIMARY_COLOR,
        paddingVertical: 9,
        flex: 1,
        marginVertical: setValueBasedOnHeight(10),
        borderRadius: setValueBasedOnWidth(4)
    },
    mainContainer: {backgroundColor: "white"},
    alertQuestionText: {
        fontWeight: "600",
        color: THEME_PRIMARY_COLOR
    }
})