import { StyleSheet } from 'react-native';
import { setValueBasedOnWidth, setValueBasedOnHeight, setFontSize } from '../../../utils/deviceDimensions';
import {THEME_PRIMARY_COLOR, SELECTED_CARD_BACKGROUND} from '../../../constants/theme'

export default StyleSheet.create({
    container: {flex: 1},
    skillItemContainer: {
        paddingHorizontal: setValueBasedOnWidth(10),
        paddingVertical: setValueBasedOnHeight(4),
        borderRadius: setValueBasedOnWidth(18),
        borderWidth: setValueBasedOnWidth(1),
        borderColor: "#b7b7b7",
        marginRight: setValueBasedOnWidth(9),
        marginLeft: setValueBasedOnWidth(18),
        marginBottom: setValueBasedOnHeight(11),
        backgroundColor: "#ffffff",
        flexDirection: "row",
        alignItems: "center"
    },
    skillItem: {
        fontSize: setFontSize(14),
        fontFamily: "OpenSans",
        color: "#444444"
    },
    selectedItem: {
        backgroundColor: SELECTED_CARD_BACKGROUND,
        borderColor: THEME_PRIMARY_COLOR
    },
    content: {
        alignItems: "flex-start",
        paddingBottom: setValueBasedOnHeight(20)
    },
    scrollViewStyle: {flex: 1},
    flag: {
        marginRight: setValueBasedOnWidth(7),
        width: setValueBasedOnWidth(16),
        height: setValueBasedOnHeight(10)
    },
    containerStyle: {backgroundColor: "white"},
    flag: {
        marginRight: setValueBasedOnWidth(7),
        width: setValueBasedOnWidth(16),
        height: setValueBasedOnHeight(10)
    },
    searchBarContianer: {
        borderRadius: setValueBasedOnWidth(4),
        marginHorizontal: setValueBasedOnWidth(18),
        width: setValueBasedOnWidth(360 - 36),
        marginBottom: setValueBasedOnHeight(5)
    },
    buttonContainer: {
        backgroundColor: THEME_PRIMARY_COLOR,
        width: setValueBasedOnWidth(55),
        height: setValueBasedOnHeight(28),
        alignItems: "center",
        justifyContent: "center",
        marginRight: setValueBasedOnWidth(8)
    },
    textStyle: {
        color: "white",
        fontSize: setFontSize(13),
        fontWeight: "600"
    }
})