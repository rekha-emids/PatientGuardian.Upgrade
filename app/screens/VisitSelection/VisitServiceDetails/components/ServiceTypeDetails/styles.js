import {StyleSheet} from 'react-native'
import {setValueBasedOnHeight, setFontSize, setValueBasedOnWidth} from '../../../../../utils/deviceDimensions'
import { THEME_PRIMARY_COLOR, CHECKBOX_COLOR } from '../../../../../constants/theme';
export default StyleSheet.create({
    heading: {
        marginTop: setValueBasedOnHeight(23),
        marginBottom: setValueBasedOnHeight(19),
        fontSize: setFontSize(18),
        fontFamily: "OpenSans",
        color: THEME_PRIMARY_COLOR,
        marginLeft: setValueBasedOnWidth(16)
    },
    section: {
        backgroundColor: "white",
        paddingHorizontal: setValueBasedOnWidth(16),
        paddingVertical: setValueBasedOnHeight(10)
    },
    servicesContainer: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    unSelectedService: {
        borderColor: "#b7b7b7",
        borderWidth: 1,
        borderRadius: setValueBasedOnWidth(6),
        alignItems: "center",
        justifyContent: "center",
        width: setValueBasedOnWidth(118),
        height: setValueBasedOnHeight(127),
        marginBottom: setValueBasedOnHeight(10),
        marginRight: setValueBasedOnWidth(10)
    },
    selectedService: {
        borderColor: THEME_PRIMARY_COLOR,
        borderWidth: 1,
        borderRadius: setValueBasedOnWidth(6),
        alignItems: "center",
        justifyContent: "center",
        width: setValueBasedOnWidth(118),
        height: setValueBasedOnHeight(127),
        marginBottom: setValueBasedOnHeight(10),
        marginRight: setValueBasedOnWidth(10)

    },
    serviceIcon: {
        width: setValueBasedOnWidth(40),
        height: setValueBasedOnHeight(40)
    },
    text: {
        fontFamily: "OpenSans",
        color: "#444444",
        fontSize: setFontSize(14)
    },
    scheduleHeading: {
        fontFamily: "OpenSans",
        color: "#444444",
        fontSize: setFontSize(14),
        fontWeight: '600',
        marginBottom: setValueBasedOnHeight(15)
    },
    count: {
        width: setValueBasedOnWidth(20),
        height: setValueBasedOnWidth(20),
        borderRadius: setValueBasedOnWidth(10),
        backgroundColor: THEME_PRIMARY_COLOR,
        alignItems: "center",
        justifyContent: "center",
        marginRight: setValueBasedOnWidth(15)
    },
    countText: {
        fontSize: setFontSize(12),
        color: "white"
    },
    availabilityItem: {
        width: setValueBasedOnWidth(151),
        height: setValueBasedOnHeight(151),
        borderRadius: setValueBasedOnWidth(8),
        borderWidth: 1,
        borderColor: "#e2e2e2",
        paddingTop: setValueBasedOnHeight(14),
        paddingBottom: setValueBasedOnHeight(23),
        marginRight: setValueBasedOnWidth(8),
        marginVertical: setValueBasedOnHeight(6)
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
        fontFamily: "OpenSans",
        alignSelf: 'center'
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
        alignItems: 'center',
        marginRight: setValueBasedOnWidth(18),
        marginLeft: setValueBasedOnWidth(23)
    },
    addressContainer: {
        flexDirection: "row",
        marginBottom: setValueBasedOnHeight(10)
    },
    addressHeading: {
        fontFamily: "OpenSans",
        color: "#444444",
        fontSize: setFontSize(12),
        fontWeight: '600',
        width: setValueBasedOnWidth(120)
    },
    addressValue: {
        fontSize: setFontSize(12),
        fontFamily: "OpenSans",
        color: "#444444"
    },
    tasksContainer: {
        flexDirection: "row",
        marginBottom: setValueBasedOnHeight(12)
    },
    tabContent: {backgroundColor: "#f9f9f9"},
    recurringPattern: {marginTop: setValueBasedOnHeight(15)},
    slotsContainer: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    selectedItemStyle: {
        backgroundColor: CHECKBOX_COLOR
    },
    blueDivider: {
        width: setValueBasedOnWidth(17),
        height: 1,
        backgroundColor: THEME_PRIMARY_COLOR,
        marginTop: setValueBasedOnHeight(7),
        marginBottom: setValueBasedOnHeight(16),
        marginLeft: setValueBasedOnWidth(16)
    },
    dayName: {fontSize: setFontSize(14)},
    occuranceText: {
        fontFamily: "OpenSans",
        color: "#444444",
        fontSize: setFontSize(14)
    },
    serviceTypeText: {
        textAlign: 'center',
        paddingHorizontal: setValueBasedOnWidth(7)
    },
    color: {color: THEME_PRIMARY_COLOR}
})