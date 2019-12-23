import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize, WIDTH } from '../../../../utils/deviceDimensions';
import {THEME_PRIMARY_COLOR} from '../../../../constants/theme'
export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: setValueBasedOnHeight(60),
        backgroundColor: THEME_PRIMARY_COLOR
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: setValueBasedOnWidth(15),
        paddingRight: setValueBasedOnWidth(15)
    },
    fontLarge: {
        fontSize: setValueBasedOnHeight(18),
        fontWeight: '600',
        color: '#ffffff'
    },
    fontMedium: {
        fontSize: setValueBasedOnHeight(14),
        fontWeight: '600',
        color: '#ffffff'
    },
    modalStyle: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff'
    },
    actionButtons: {
        borderTopColor: '#ebebeb',
        borderTopWidth: 1,
        alignSelf: "flex-end",
        height: setValueBasedOnHeight(50),
        flexDirection: 'row',
        backgroundColor: "white"
    },
    imageNotificationView: {
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    contentCenter: {alignSelf: 'center'},
    closeButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#e0e0e0',
        borderRightWidth: 1,
        backgroundColor: "white"
    },
    applyButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },
    closeNameStyle: {
        color: '#444444',
        fontSize: setValueBasedOnHeight(14)
    },
    applyNameStyle: {
        color: THEME_PRIMARY_COLOR,
        fontSize: setValueBasedOnHeight(14)
    },
    filterContainer: {
        flexDirection: "row",
        flex: 1
    },
    filters: {
        backgroundColor: "rgba(255, 255, 255, 0.13)",
        flex: 1,
        borderRightWidth: setValueBasedOnWidth(1),
        borderColor: "#c0c0c0"
    },
    content: {flex: 2},
    filterText: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans",
        flexWrap: "wrap",
        marginLeft: setValueBasedOnWidth(20)
    },
    selectedFilterBg: {backgroundColor: "#f9f7fb"},
    filterType: {
        height: setValueBasedOnHeight(53),
        alignItems: 'flex-start',
        justifyContent: 'center'
    }
})