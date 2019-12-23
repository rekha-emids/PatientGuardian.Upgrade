import {StyleSheet} from 'react-native'
import { setValueBasedOnHeight, setFontSize, setValueBasedOnWidth } from '../../../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR, SELECTED_CARD_BACKGROUND } from '../../../../../constants/theme';


export default StyleSheet.create({
    container: {paddingVertical: setValueBasedOnHeight(10)},
    statusView: {
        paddingTop: setValueBasedOnHeight(20),
        paddingLeft: setValueBasedOnHeight(15),
        paddingRight: setValueBasedOnHeight(15)
    },
    text: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans",
        fontWeight: '600'

    },
    statusTextView: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    statusTitle: {
        fontSize: setFontSize(16),
        color: "#444444",
        marginLeft: setValueBasedOnWidth(20)
    },
    checkboxRow: {
        marginTop: setValueBasedOnHeight(20),
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    checkboxStyle: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    serviceAccordianContainer: {
        paddingVertical: setValueBasedOnHeight(12),
        paddingHorizontal: setValueBasedOnWidth(12),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans"
    },
    arrowIcon: {
        width: setValueBasedOnWidth(20),
        height: setValueBasedOnHeight(20)
    },
    skillItemContainer: {
        paddingHorizontal: setValueBasedOnWidth(10),
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
    divider: {
        marginHorizontal: setValueBasedOnWidth(10),
        height: 1,
        width: setValueBasedOnWidth(220),
        backgroundColor: "#ebebeb",
        alignItems: "center",
        marginBottom: setValueBasedOnHeight(10)
    }
})