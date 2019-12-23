import {StyleSheet} from 'react-native'
import {setValueBasedOnHeight, setFontSize, setValueBasedOnWidth} from '../../../utils/deviceDimensions'
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';
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
        paddingVertical: setValueBasedOnHeight(20)
    },
    text: {
        fontFamily: "OpenSans",
        color: "#444444",
        fontSize: setFontSize(14)
    },
    rating: {marginLeft: setValueBasedOnWidth(4)},
    scheduleHeading: {
        fontFamily: "OpenSans",
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(14),
        fontWeight: '600'
    },
    itemTitleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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
    tasksContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    tabContent: {backgroundColor: "#f9f9f9"},
    marginVertical: {marginVertical: setValueBasedOnHeight(15)},
    divider: {
        flex: 1,
        height: setValueBasedOnHeight(1),
        backgroundColor: "#dcdcdc"
    },
    details: {
        flexDirection: "row",
        alignItems: "center"
    },
    image: {
        width: setValueBasedOnWidth(40),
        height: setValueBasedOnWidth(40),
        borderRadius: setValueBasedOnWidth(20),
        marginRight: setValueBasedOnWidth(12),
        resizeMode: "cover"
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderColor: "#dcdcdc",
        borderWidth: setValueBasedOnWidth(1),
        borderRadius: setValueBasedOnWidth(3),
        paddingHorizontal: setValueBasedOnWidth(12),
        paddingVertical: setValueBasedOnHeight(5),
        alignSelf: "flex-start",
        marginTop: setValueBasedOnHeight(5)
    },
    feedbackContainer: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap"
    },
    detailsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    marginTop: {marginTop: setValueBasedOnHeight(10)},
    service: {
        marginVertical: setValueBasedOnHeight(17),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    serviceDetails: {flexDirection: "row"},
    serviceIcon: {
        width: setValueBasedOnWidth(45),
        height: setValueBasedOnHeight(45),
        marginRight: setValueBasedOnWidth(22)
    },
    tasksStatus: {flexDirection: "row"},
    timerText: {
        fontWeight: '600',
        fontSize: setFontSize(15),
        marginTop: -setValueBasedOnHeight(3)
    },
    taskCompleted: {color: "#acacac"},
    dividerMargin: {marginBottom: setValueBasedOnHeight(5)}
})