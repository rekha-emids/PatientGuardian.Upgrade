import {StyleSheet, Platform} from 'react-native'
import { setFontSize, setValueBasedOnWidth, setValueBasedOnHeight } from '../../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR, WHITE } from '../../../../constants/theme';

export default StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingHorizontal: setValueBasedOnWidth(15),
        paddingVertical: setValueBasedOnHeight(22)
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
        margin: setValueBasedOnHeight(10),
        borderRadius: setValueBasedOnWidth(4)
    },
    cancelButtonContainer: {
        backgroundColor: WHITE,
        borderWidth: setValueBasedOnWidth(1),
        borderColor: THEME_PRIMARY_COLOR
    },
    cancelText: {color: THEME_PRIMARY_COLOR},
    cardContainer: {
        backgroundColor: "white",
        paddingHorizontal: setValueBasedOnWidth(15),
        paddingTop: setValueBasedOnHeight(18),
        paddingBottom: setValueBasedOnHeight(24),
        ...Platform.select({
            android: {elevation: 2},
            ios: {
                shadowColor: '#000000',
                shadowOpacity: 0.3,
                shadowRadius: 2,
                shadowOffset: {height: 2}
            }
        }),
        marginBottom: setValueBasedOnHeight(13)
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    buttonText: {
        fontSize: setFontSize(16),
        color: THEME_PRIMARY_COLOR,
        fontFamily: "OpenSans",
        fontWeight: '600',
        marginHorizontal: setValueBasedOnWidth(12)
    },
    align: {textAlign: "center"},
    error: {color: "red"},
    buttonWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
})