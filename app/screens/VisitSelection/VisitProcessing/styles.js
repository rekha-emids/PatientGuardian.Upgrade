import { StyleSheet, Platform } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR, THEME_SECONDARY_COLOR } from '../../../constants/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9'
    },
    patientDetailsContainer: {
        backgroundColor: "white",
        paddingTop: setValueBasedOnWidth(15),
        paddingHorizontal: setValueBasedOnWidth(15),
        ...Platform.select({
            android: {elevation: 2},
            ios: {
                shadowColor: '#000000',
                shadowOpacity: 0.3,
                shadowRadius: 2,
                shadowOffset: {height: 2}
            }
        })
    },
    detailsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: setValueBasedOnHeight(15),
        alignItems: "center"
    },
    patientDetails: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    pic: {
        width: setValueBasedOnWidth(60),
        height: setValueBasedOnWidth(60),
        borderRadius: setValueBasedOnWidth(30),
        resizeMode: "cover",
        marginRight: setValueBasedOnWidth(10)
    },
    cancelVisit: {
        borderColor: "#e2e2e2",
        borderRadius: setValueBasedOnWidth(3),
        borderWidth: setValueBasedOnWidth(1),
        paddingHorizontal: setValueBasedOnWidth(8),
        paddingVertical: setValueBasedOnHeight(4)
    },
    text: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans"
    },
    tasksStatus: {flexDirection: "row"},
    name: {width: setValueBasedOnWidth(130)},
    slotDetailsText: {
        fontSize: setFontSize(12),
        color: "#444444",
        fontFamily: "OpenSans"
    },
    tasksContainer: {
        backgroundColor: "white",
        paddingTop: setValueBasedOnHeight(18),
        marginBottom: setValueBasedOnHeight(15)
    },
    divider: {
        flex: 1,
        height: setValueBasedOnHeight(1),
        backgroundColor: "#dcdcdc"
    },
    timerText: {fontWeight: '600'},
    inCompletedTaskText: {
        color: "#444444",
        fontSize: setFontSize(13),
        fontFamily: "OpenSans"
    },
    completedTaskText: {
        color: "#28a745",
        fontSize: setFontSize(13),
        fontFamily: "OpenSans"
    },
    serviceContianer: {marginHorizontal: setValueBasedOnWidth(18)},
    service: {
        marginVertical: setValueBasedOnHeight(17),
        flexDirection: "row",
        justifyContent: "space-between"
    },
    serviceDetails: {flexDirection: "row"},
    serviceIcon: {
        width: setValueBasedOnWidth(45),
        height: setValueBasedOnHeight(45),
        marginRight: setValueBasedOnWidth(22)
    },
    taskPercentageContainer: {
        paddingVertical: setValueBasedOnHeight(22),
        paddingLeft: setValueBasedOnWidth(18),
        backgroundColor: "white"
    },
    leftBorder: {
        borderLeftWidth: setValueBasedOnWidth(1),
        borderColor: THEME_SECONDARY_COLOR,
        borderStyle: "dotted",
        marginLeft: setValueBasedOnWidth(15)
    },
    dot: {
        width: setValueBasedOnWidth(15),
        height: setValueBasedOnWidth(15),
        borderRadius: setValueBasedOnWidth(7.5),
        backgroundColor: THEME_SECONDARY_COLOR,
        position: "absolute",
        alignSelf: "center",
        left: setValueBasedOnWidth(15 / 2),
        top: setValueBasedOnHeight(20)
    },
    subTask: {
        flexDirection: "row",
        marginVertical: setValueBasedOnHeight(18),
        alignItems: "center"
    },
    progresssBarContainer: {
        paddingVertical: setValueBasedOnHeight(20),
        paddingHorizontal: setValueBasedOnWidth(20),
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    margin: {marginHorizontal: setValueBasedOnWidth(15)},
    taskSummary: {
        flexDirection: "row",
        alignItems: "center"
    },
    buttonText: {
        fontSize: setFontSize(16),
        color: THEME_PRIMARY_COLOR,
        fontFamily: "OpenSans",
        fontWeight: '600'
    }
})

export default styles