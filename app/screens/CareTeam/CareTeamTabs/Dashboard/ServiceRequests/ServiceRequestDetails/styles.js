import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setFontSize, setValueBasedOnWidth } from '../../../../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../../../../constants/theme';

const styles = StyleSheet.create({
    container: {flex: 1},
    scrollContainer: {},
    cardStyle: {
        backgroundColor: '#f8f8f8',
        paddingLeft: setValueBasedOnWidth(17),
        paddingBottom: setValueBasedOnHeight(20),
        paddingTop: setValueBasedOnHeight(20)

    },
    completedIcon: {
        height: setValueBasedOnHeight(19),
        width: setValueBasedOnWidth(19),
        position: 'absolute',
        top: setValueBasedOnHeight(8),
        right: setValueBasedOnWidth(8)
    },

    textStyle: {
        fontSize: setFontSize(16),
        fontFamily: "OpenSans",
        color: THEME_PRIMARY_COLOR
    },

    containerText: {
        color: '#ffffff',
        alignSelf: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 5
    },

    boldText: {fontWeight: '600'},

    bulletText: {
        height: setValueBasedOnWidth(16),
        width: setValueBasedOnWidth(16),
        borderRadius: setValueBasedOnWidth(8),
        backgroundColor: THEME_PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },

    taskText: {
        color: '#444444',
        fontSize: setFontSize(14),
        backgroundColor: '#ffffff',
        marginVertical: setValueBasedOnHeight(2)
    },

    itemContainer: {
        height: setValueBasedOnHeight(32),
        borderRadius: 8,
        backgroundColor: THEME_PRIMARY_COLOR,
        marginRight: setValueBasedOnWidth(10),
        marginTop: setValueBasedOnHeight(10),
        marginBottom: setValueBasedOnHeight(10)

    },
    whiteCardStyle: {backgroundColor: "white"},
    boxStyle: {
        height: setValueBasedOnHeight(142),
        width: setValueBasedOnWidth(118),
        borderRadius: 6,
        backgroundColor: '#ffffff',
        borderColor: THEME_PRIMARY_COLOR,
        borderWidth: 1,
        marginRight: setValueBasedOnWidth(10),
        marginTop: setValueBasedOnHeight(5),
        marginBottom: setValueBasedOnHeight(5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        color: '#444444',
        fontSize: setFontSize(14),
        backgroundColor: '#ffffff',
        fontWeight: "600",
        marginVertical: setValueBasedOnHeight(4)
    },
    slotsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start"
    },
    addressItem: {
        flexDirection: "row",
        marginTop: setValueBasedOnHeight(14)
    },
    addressValue: {
        fontFamily: "OpenSans",
        color: '#444444',
        fontSize: setFontSize(14),
        marginVertical: setValueBasedOnHeight(2),
        marginLeft: setValueBasedOnWidth(20)
    },
    countBg: {
        backgroundColor: THEME_PRIMARY_COLOR,
        width: setValueBasedOnWidth(20),
        height: setValueBasedOnWidth(20),
        borderRadius: setValueBasedOnWidth(10),
        alignItems: "center",
        justifyContent: "center",
        marginRight: setValueBasedOnWidth(10)
    },
    tasksContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    count: {
        fontSize: setFontSize(12),
        color: "white"
    },
    postedByText: {
        fontSize: setFontSize(18),
        fontFamily: "OpenSans",
        color: THEME_PRIMARY_COLOR,
        marginLeft: setValueBasedOnWidth(16)
    },
    patientDetailsContainer: {backgroundColor: "white"},
    picAndDetails: {
        flexDirection: "row",
        marginTop: setValueBasedOnHeight(20),
        marginBottom: setValueBasedOnHeight(26)
    },
    pic: {
        width: setValueBasedOnWidth(40),
        height: setValueBasedOnWidth(40),
        borderRadius: setValueBasedOnWidth(20),
        resizeMode: 'cover',
        marginLeft: setValueBasedOnWidth(17),
        marginRight: setValueBasedOnWidth(11)
    },
    name: {
        fontSize: setFontSize(16),
        color: "#444444",
        fontFamily: "OpenSans"
    },
    postendOnText: {
        fontSize: setFontSize(14),
        color: "#8c8c8c",
        fontFamily: "OpenSans"
    },
    postedContainer: {backgroundColor: "white"},
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: setValueBasedOnWidth(17),
        marginRight: setValueBasedOnWidth(11),
        marginTop: setValueBasedOnHeight(23),
        marginBottom: setValueBasedOnHeight(19)
    },
    slotTextStyleChecked: {color: '#4f4f4f', fontSize: setValueBasedOnHeight(14)},
    slotItemViewSelected: {alignItems: 'center', marginTop: setValueBasedOnHeight(2), height: setValueBasedOnHeight(24), backgroundColor: 'rgba(30,61,92,0.5)', flexDirection: 'row', justifyContent: 'flex-start'},
    slotItemViewNotSelected: {alignItems: 'center', marginTop: setValueBasedOnHeight(2), height: setValueBasedOnHeight(24), backgroundColor: '#ffffff', flexDirection: 'row', justifyContent: 'flex-start'},
    selectedSlotDot: {backgroundColor: '#39ae99', height: setValueBasedOnHeight(7), width: setValueBasedOnHeight(7), borderRadius: setValueBasedOnHeight(3.5)},
    emptyDot: {backgroundColor: "#4f4f4f"},
    dotView: {width: setValueBasedOnWidth(40), flexDirection: 'row', justifyContent: 'center'}
})

export default styles