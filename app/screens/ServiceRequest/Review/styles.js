import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setFontSize, setValueBasedOnWidth } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR, WHITE } from '../../../constants/theme';

const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: '#f8f8f8',
        paddingLeft: setValueBasedOnWidth(17),
        paddingBottom: setValueBasedOnHeight(20),
        paddingTop: setValueBasedOnHeight(20)

    },
    serviceTakss: {
        paddingBottom: setValueBasedOnHeight(5),
        paddingTop: setValueBasedOnHeight(5)
    }, 
    taskBorder: {
        paddingHorizontal: setValueBasedOnWidth(8),
        borderRadius: setValueBasedOnWidth(7.4),
        backgroundColor: '#ffffff',
        borderColor: THEME_PRIMARY_COLOR,
        borderWidth: 1,
        marginBottom: setValueBasedOnHeight(10),
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: setValueBasedOnHeight(3)
    },
    completedIcon: {
        height: setValueBasedOnHeight(19),
        width: setValueBasedOnWidth(19),
        position: 'absolute',
        top: setValueBasedOnHeight(8),
        right: setValueBasedOnWidth(8)
    },
    categoryIcon: {
        width: setValueBasedOnWidth(40),
        height: setValueBasedOnHeight(40),
        marginVertical: setValueBasedOnHeight(10)
    },
    textStyle: {
        fontSize: setFontSize(16),
        fontFamily: "OpenSans",
        color: '#444444'
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
        backgroundColor: WHITE,
        borderColor: THEME_PRIMARY_COLOR,
        borderWidth: 1,
        marginRight: setValueBasedOnWidth(10),
        alignItems: 'center',
        justifyContent: "center"
    },
    heading: {
        flex: 1,
        color: '#444444',
        fontSize: setFontSize(14),
        backgroundColor: '#ffffff',
        fontWeight: "600",
        marginVertical: setValueBasedOnHeight(1)
    },
    slotsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start"
    },
    addressItem: {
        flexDirection: "row",
        marginTop: setValueBasedOnHeight(10)
    },
    addressValue: {
        fontFamily: "OpenSans",
        color: '#444444',
        fontSize: setFontSize(14),
        marginVertical: setValueBasedOnHeight(1),
        flex: 2
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
        alignItems: "center",
        marginBottom: setValueBasedOnHeight(2)
    },
    count: {
        fontSize: setFontSize(12),
        color: "white"
    },
    popupText: {
        fontSize: setFontSize(14),
        textAlign: "center"
    },
    marginBottom: {marginBottom: setValueBasedOnHeight(10)},
    textColor: {color: THEME_PRIMARY_COLOR}
})

export default styles