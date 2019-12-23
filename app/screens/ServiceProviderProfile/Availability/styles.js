import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../utils/deviceDimensions';
import {THEME_PRIMARY_COLOR} from '../../../constants/theme'
export default StyleSheet.create({
    cardContainer: {
        paddingVertical: setValueBasedOnHeight(23),
        paddingLeft: setValueBasedOnWidth(15),
        backgroundColor: "#ffffff"
    },
    headerStyle: {paddingRight: setValueBasedOnWidth(17)},
    availabilityItem: {
        width: setValueBasedOnWidth(151),
        height: setValueBasedOnHeight(151),
        borderRadius: setValueBasedOnWidth(8),
        borderWidth: 1,
        borderColor: "#e2e2e2",
        paddingTop: setValueBasedOnHeight(14),
        paddingBottom: setValueBasedOnHeight(23),
        marginRight: setValueBasedOnWidth(9)
    },
    itemTitleContainer: {
        marginLeft: setValueBasedOnWidth(17),
        marginRight: setValueBasedOnWidth(11),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    slotItem: {
        paddingTop: setValueBasedOnHeight(6),
        paddingBottom: setValueBasedOnHeight(3),
        alignItems: "center",
        flexDirection: "row",
        marginVertical: setValueBasedOnHeight(1)
    },
    activeTextStyle: {
        fontSize: setFontSize(13.5),
        color: "#4f4f4f",
        fontFamily: "OpenSans"
    },
    disableTextStyle: {
        color: "rgba(79, 79, 79, 0.5)",
        fontSize: setFontSize(13.5),
        fontFamily: "OpenSans"
    },
    greenDot: {
        width: setValueBasedOnWidth(7),
        height: setValueBasedOnWidth(7),
        borderRadius: setValueBasedOnWidth(7 / 2),
        backgroundColor: "#39ae99",
        marginRight: setValueBasedOnWidth(18),
        marginLeft: setValueBasedOnWidth(16)
    },
    blockOutDayContainer: {
        flexDirection: "row",
        marginTop: setValueBasedOnHeight(11),
        alignItems: "center"
    },
    blockOutText: {
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(12),
        fontFamily: "OpenSans"
    },
    blueDivider: {
        width: setValueBasedOnWidth(17),
        height: 1,
        backgroundColor: THEME_PRIMARY_COLOR,
        marginTop: setValueBasedOnHeight(7),
        marginBottom: setValueBasedOnHeight(16),
        marginLeft: setValueBasedOnWidth(16)
    },
    selectedItemStyle: {backgroundColor: "rgba(122, 50, 159, 0.1)"},
    dayName: {
        fontSize: setFontSize(13.5),
        color: "#494949",
        fontFamily: "OpenSans"
    },
    arrow: {
        marginLeft: setValueBasedOnWidth(8),
        alignSelf: "center"
    },
    blockoutDays: {margin: setValueBasedOnWidth(15)},
    contentStyle: {
        backgroundColor: "white",
        flex: 1
    }
})