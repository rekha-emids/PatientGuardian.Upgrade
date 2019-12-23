import {StyleSheet} from 'react-native'
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR, SELECTED_CARD_BACKGROUND } from '../../../../../constants/theme';

export default StyleSheet.create({
    skillItemContainer: {
        paddingHorizontal: setValueBasedOnHeight(10),
        paddingVertical: setValueBasedOnHeight(4),
        borderRadius: setValueBasedOnWidth(18),
        borderWidth: setValueBasedOnWidth(1),
        borderColor: "#b7b7b7",
        marginRight: setValueBasedOnWidth(9),
        marginLeft: setValueBasedOnWidth(18),
        marginBottom: setValueBasedOnHeight(11),
        backgroundColor: "#ebebeb"
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
    items: {alignItems: "flex-start"},
    title: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans",
        marginBottom: setValueBasedOnHeight(15),
        fontWeight: '600'

    },
    container: {
        paddingVertical: setValueBasedOnHeight(12),
        paddingHorizontal: setValueBasedOnWidth(12)
    }
})