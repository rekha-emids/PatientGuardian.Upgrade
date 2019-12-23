import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize, WIDTH } from '../../../utils/deviceDimensions';
import {THEME_PRIMARY_COLOR} from '../../../constants/theme'
export default StyleSheet.create({
    cardContainer: {paddingVertical: setValueBasedOnHeight(23)},
    serviceAccordianContainer: {
        flex: 1,
        paddingVertical: setValueBasedOnHeight(13),
        paddingHorizontal: setValueBasedOnWidth(15),
        flexDirection: "row",
        justifyContent: "center"
    },
    divider: {
        flex: 1,
        height: setValueBasedOnHeight(1),
        backgroundColor: "#d8d8d8",
        marginHorizontal: setValueBasedOnWidth(14)
    },
    count: {
        width: setValueBasedOnWidth(18),
        height: setValueBasedOnWidth(18),
        borderRadius: setValueBasedOnWidth(9),
        backgroundColor: THEME_PRIMARY_COLOR,
        marginRight: setValueBasedOnWidth(15),
        alignItems: "center",
        justifyContent: "center"
    },
    countText: {
        fontSize: setFontSize(12),
        fontWeight: '600',
        color: "white"
    },
    title: {
        fontSize: setFontSize(16),
        color: "#444444",
        flex: 1,
        fontFamily: "OpenSans"
    },
    serviceItem: {
        alignItems: "center",
        justifyContent: 'center',
        marginHorizontal: setValueBasedOnWidth(10),
        alignSelf: 'center',
        marginBottom: setValueBasedOnHeight(14),
        width: setValueBasedOnWidth(150),
        height: setValueBasedOnHeight(120),
        flexDirection: 'column',
        borderWidth: setValueBasedOnWidth(1),
        borderRadius: setValueBasedOnWidth(6),
        borderColor: '#b7b7b7'

    },
    serviceItems: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: 'center'
    },
    serviceItemsContentContainer: {marginVertical: setValueBasedOnHeight(20)},
    serviceItemImage: {
        width: setValueBasedOnWidth(41),
        height: setValueBasedOnHeight(41),
        marginBottom: setValueBasedOnHeight(4)
    },
    itemTitle: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans",
        textAlign: 'center'
    },
    selectedItemStyle: {backgroundColor: "#ffffff"},
    arrowIcon: {
        width: setValueBasedOnWidth(20),
        height: setValueBasedOnHeight(20)
    },
    headerStyle: {paddingHorizontal: setValueBasedOnWidth(15)},
    checkMark: {
        width: setValueBasedOnWidth(15),
        height: setValueBasedOnHeight(15),
        position: "absolute",
        top: setValueBasedOnHeight(10),
        right: setValueBasedOnWidth(10)
    },
    divider: {
        borderBottomWidth: setValueBasedOnWidth(1),
        borderBottomColor: "#d8d8d8"
    },
    emptyText: {paddingLeft: setValueBasedOnWidth(15)}
})