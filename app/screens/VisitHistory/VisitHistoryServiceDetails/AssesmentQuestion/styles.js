import {StyleSheet} from 'react-native'
import { setFontSize, setValueBasedOnWidth, setValueBasedOnHeight } from '../../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR, WHITE } from '../../../../constants/theme';

export default StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingHorizontal: setValueBasedOnWidth(15),
        paddingTop: setValueBasedOnHeight(22)
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
    selectedOptionStyle: {borderColor: THEME_PRIMARY_COLOR},
    unSelectedRadioButton: {
        width: setValueBasedOnWidth(12),
        height: setValueBasedOnWidth(12),
        borderRadius: setValueBasedOnWidth(6),
        borderColor: "#444444",
        borderWidth: setValueBasedOnWidth(1)
    },
    selectedRadioButton: {
        width: setValueBasedOnWidth(12),
        height: setValueBasedOnWidth(12),
        borderRadius: setValueBasedOnWidth(6),
        borderColor: THEME_PRIMARY_COLOR,
        borderWidth: setValueBasedOnWidth(1),
        alignItems: "center",
        justifyContent: "center"
    },
    selectedButtonInnerCircle: {
        width: setValueBasedOnWidth(7),
        height: setValueBasedOnWidth(7),
        backgroundColor: THEME_PRIMARY_COLOR,
        borderRadius: setValueBasedOnWidth(7 / 2)
    },
    stars: {
        flexDirection: "row",
        marginBottom: setValueBasedOnHeight(22)
    },
    margin: {marginHorizontal: setValueBasedOnWidth(8)},
    inputStyle: {
        height: setValueBasedOnHeight(92),
        flex: 1,
        borderColor: "#dcdcdc",
        borderWidth: setValueBasedOnWidth(1),
        borderRadius: setValueBasedOnWidth(4),
        fontSize: setFontSize(14)
    },
    textStyle: {
        color: THEME_PRIMARY_COLOR,
        fontWeight: '500',
        fontSize: setFontSize(16),
        width: setValueBasedOnWidth(70),
        height: setValueBasedOnHeight(35),
        alignSelf: "center"
    },
    buttonText: {
        color: THEME_PRIMARY_COLOR,
        fontWeight: '500',
        fontSize: setFontSize(16),
        alignSelf: "center",
        color: "white"
    },
    buttonContainer: {
        backgroundColor: THEME_PRIMARY_COLOR,
        paddingVertical: 9,
        flex: 1,
        margin: setValueBasedOnHeight(10),
        borderRadius: setValueBasedOnWidth(4),
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: setValueBasedOnWidth(5)
    },
    cancelButtonContainer: {
        backgroundColor: WHITE,
        borderWidth: setValueBasedOnWidth(1),
        borderColor: THEME_PRIMARY_COLOR
    },
    cancelText: {color: THEME_PRIMARY_COLOR},
    buttonWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    wrapperView: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
    bottomButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: setValueBasedOnHeight(20),
        backgroundColor: "white",
        alignItems: "center",
        paddingVertical: setValueBasedOnHeight(7)
    },
    error: {color: "red"},
    align: {textAlign: "center"},
    submittedButtonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        backgroundColor: "white",
        paddingVertical: setValueBasedOnHeight(7)
    },
    progressContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: setFontSize(12),
        color: "#444444",
        fontFamily: "OpenSans"
    },
    detailsContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginVertical: setValueBasedOnHeight(10)

    },
    flexRow: {flexDirection: "row", alignItems: "center"},
    tasksContainer: {
        backgroundColor: WHITE,
        paddingTop: setValueBasedOnHeight(18),
        marginBottom: setValueBasedOnHeight(15),
        flex: 1
    }
})