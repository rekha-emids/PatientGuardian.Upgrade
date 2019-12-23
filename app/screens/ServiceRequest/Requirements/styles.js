import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setFontSize, setValueBasedOnWidth } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR, SELECTED_CARD_BACKGROUND } from '../../../constants/theme';

const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: '#f8f8f8',
        paddingLeft: setValueBasedOnWidth(17),
        paddingVertical: setValueBasedOnHeight(17)
    },
    completedIcon: {
        height: setValueBasedOnHeight(19),
        width: setValueBasedOnWidth(19)
    },
    categoryIcon: {
        width: setValueBasedOnWidth(45),
        height: setValueBasedOnHeight(45),
        marginTop: setValueBasedOnHeight(25),
        marginBottom: setValueBasedOnHeight(15)
    },
    checkBoxContainer: {
        position: "absolute",
        top: setValueBasedOnHeight(9),
        right: setValueBasedOnWidth(9),
        flex: 1
    },
    textStyle: {
        // textAlign: 'center',
        fontSize: setFontSize(12),
        fontFamily: "OpenSans",
        color: '#444444'
    },
    textAdditionalInfoStyle: {
        fontSize: setFontSize(16),
        fontFamily: "OpenSans",
        color: THEME_PRIMARY_COLOR,
        // paddingTop: setValueBasedOnHeight(19),
        paddingBottom: setValueBasedOnHeight(1)
    },
    heading: {
        fontSize: setFontSize(14),
        fontFamily: "OpenSans",
        color: '#444444',
        fontWeight: '400',
        marginBottom: setValueBasedOnHeight(16)
    },

    containerText: {
        color: '#ffffff',
        alignSelf: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },

    boldText: {fontWeight: '600'},
    purpleText: {color: THEME_PRIMARY_COLOR},
    normalText: {
        paddingTop: setValueBasedOnHeight(1),
        paddingBottom: setValueBasedOnHeight(17)
    },

    taskText: {
        color: '#444444',
        fontSize: setFontSize(14),
        paddingTop: setValueBasedOnHeight(19),
        paddingBottom: setValueBasedOnHeight(1),
        fontWeight: '600'
    },

    itemContainer: {
        borderRadius: setValueBasedOnWidth(8),
        backgroundColor: THEME_PRIMARY_COLOR,
        marginRight: setValueBasedOnWidth(5),
        paddingHorizontal: setValueBasedOnWidth(10),
        paddingTop: setValueBasedOnHeight(10),
        paddingBottom: setValueBasedOnHeight(7)
    },

    boxStyle: {
        height: setValueBasedOnHeight(142),
        width: setValueBasedOnWidth(118),
        borderRadius: 6,
        backgroundColor: '#ffffff',
        borderColor: SELECTED_CARD_BACKGROUND,
        borderWidth: 1,
        marginRight: setValueBasedOnWidth(10),
        alignItems: 'center'
    },
    emptyCheckBox: {
        height: setValueBasedOnWidth(19),
        width: setValueBasedOnWidth(19),
        borderRadius: setValueBasedOnWidth(19 / 2),
        borderColor: "#e0e0e0",
        borderWidth: setValueBasedOnWidth(1),
        position: "absolute",
        top: setValueBasedOnHeight(9),
        right: setValueBasedOnWidth(9)
    },
    checkedBoxStyle: {borderColor: THEME_PRIMARY_COLOR},
    selectedBoxStyle: {borderColor: THEME_PRIMARY_COLOR},
    checkBoxText: {
        marginLeft: setValueBasedOnWidth(15),
         alignSelf: 'center', color: '#444444', fontFamily: "OpenSans",
        fontSize: setFontSize(14)
    },
    inputStyle: {
        width: setValueBasedOnWidth(326),
        height: setValueBasedOnHeight(150)
    },
    flowNavigatorStyle: {
        width: setValueBasedOnWidth(360),
        // paddingHorizontal: setValueBasedOnWidth(30),
        backgroundColor: "white"
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
    loaderWrapper: {
        position: "absolute",
        top: 0,
        bottom: 0,
        width: '100%',
        height: '100%'
    },
    selectTaskContainer: { flexDirection: 'row', marginBottom: setValueBasedOnHeight(19), alignItems: "center", marginLeft: -setValueBasedOnWidth(9)},
    bgContainer: {
        flex: 1,
        flexDirection: 'column',
        display: 'flex',
        backgroundColor: 'rgba(30,61,92,0.5)',
        borderRadius: setValueBasedOnWidth(6)
    },
    categoryText: {
        fontSize: setFontSize(12),
        color: "white",
        fontWeight: "500",
        textAlign: "center",
        alignSelf: "center",
        marginTop: setValueBasedOnHeight(73)
    },
    categoryImage: {
        width: setValueBasedOnHeight(118),
        height: setValueBasedOnHeight(119),
        marginRight: setValueBasedOnWidth(9),
        borderRadius: setValueBasedOnWidth(6),
        flex: 1,
        flexDirection: "column"
    },
    innerBorder: {
        width: setValueBasedOnHeight(110),
        height: setValueBasedOnHeight(109),
        marginHorizontal: setValueBasedOnWidth(4),
        marginVertical: setValueBasedOnHeight(4),
        borderWidth: setValueBasedOnWidth(0.7),
        borderColor: "white",
        borderRadius: setValueBasedOnWidth(4),
        alignSelf: "center",
        flexDirection: "row",
        position: "absolute",
        top: 0,
        bottom: 0
    },
    disclaimer: {
        marginTop: setValueBasedOnHeight(10),
        marginBottom: setValueBasedOnHeight(30),
        flexDirection: "row",
        marginRight: setValueBasedOnWidth(8)
    },
    disclaimerText: {
        fontSize: setFontSize(12),
        color: "#444444"
    },
    disclaimerHead: {
        fontSize: setFontSize(12),
        color: "#444444",
        fontWeight: "600"
    },
    popupTextStyle: {
        fontSize: setFontSize(16),
        fontFamily: "OpenSans",
        color: '#444444',
        textAlign: 'center'
    },
    messageTextCenter: {textAlign: 'center'},
    connectorStyle: { top: setValueBasedOnWidth(11) },
    description: { fontSize: setFontSize(12), color: '#444444', textAlign: 'center' }
})

export default styles
