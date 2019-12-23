import {StyleSheet} from 'react-native'
import { setValueBasedOnWidth, setFontSize, setValueBasedOnHeight, setHeight } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR, SELECTED_CARD_BACKGROUND } from '../../../constants/theme';

export default StyleSheet.create({
    mainContainer: {
        marginHorizontal: setValueBasedOnWidth(18),
        alignItems: "center",
        marginBottom: setValueBasedOnHeight(56)
    },
    cardContainer: {
        borderColor: "#d1d1d1",
        borderWidth: 1,
        borderRadius: setValueBasedOnWidth(4),
        padding: setValueBasedOnWidth(14),
        marginVertical: setValueBasedOnHeight(5),
        width: setValueBasedOnWidth(320)
    },
    primaryCardStyles: {
        borderColor: THEME_PRIMARY_COLOR,
        backgroundColor: SELECTED_CARD_BACKGROUND
    },
    radioButtonOuterCircle: {
        borderColor: THEME_PRIMARY_COLOR,
        borderWidth: 1,
        width: setValueBasedOnHeight(20),
        height: setValueBasedOnHeight(20),
        borderRadius: setValueBasedOnHeight(10),
        alignItems: "center",
        justifyContent: "center",
        marginRight: setValueBasedOnWidth(11)
    },
    innerCircle: {
        backgroundColor: "white",
        width: setValueBasedOnWidth(8),
        height: setValueBasedOnWidth(8),
        borderRadius: setValueBasedOnWidth(4)
    },
    selectedOuterCircle: {borderColor: THEME_PRIMARY_COLOR},
    selectedInnerCircle: {backgroundColor: THEME_PRIMARY_COLOR},
    cardNumberTextStyle: {
        color: "#444444",
        fontSize: setFontSize(14),
        fontFamily: "OpenSans",
        marginBottom: setValueBasedOnHeight(11)
    },
    emptyTextStyle: {
        color: "#444444",
        fontSize: setFontSize(14),
        fontFamily: "OpenSans",
        textAlign: 'center',
        marginTop: setValueBasedOnHeight(100)
    },
    expiryText: {
        color: "#8c8c8c",
        fontSize: setFontSize(12),
        fontFamily: "OpenSans"
    },
    cardImage: {
        width: setValueBasedOnWidth(40),
        height: setValueBasedOnHeight(25)
    },
    cardDetails: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button: {
        marginVertical: setHeight(10.62),
        justifyContent: 'center',
        backgroundColor: THEME_PRIMARY_COLOR,
        height: setValueBasedOnHeight(50),
        width: setValueBasedOnWidth(321),
        borderRadius: setHeight(1.56)
    },
    semibold: {fontWeight: '600'},
    login: {marginTop: setHeight(3.59)},
    loginfont: {fontSize: setHeight(2.3)},
    common: {
        color: "#FFF",
        fontFamily: "OpenSans",
        textAlign: 'center'
    },
    row: {
        flexDirection: "row",
        justifyContent: "center"
    }
})