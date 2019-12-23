import {StyleSheet} from 'react-native'
import { setValueBasedOnWidth, setValueBasedOnHeight, setFontSize } from '../../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../../constants/theme';

export default StyleSheet.create({
    cardContainer: {
        width: setValueBasedOnWidth(284),
        height: setValueBasedOnHeight(90),
        backgroundColor: "#f1e7fb",
        borderRadius: setValueBasedOnWidth(4),
        marginLeft: setValueBasedOnWidth(16),
        backgroundColor: "white"
    },
    selectedBgColor: {
        backgroundColor: "#f1e7fb",
        borderWidth: setValueBasedOnWidth(1),
        borderColor: THEME_PRIMARY_COLOR
    },
    serviceDetailsContainer: {
        flexDirection: "row",
        marginLeft: setValueBasedOnWidth(16),
        marginTop: setValueBasedOnHeight(16),
        marginRight: setValueBasedOnWidth(10)
    },
    icon: {
        width: setValueBasedOnWidth(30),
        height: setValueBasedOnHeight(30),
        marginRight: setValueBasedOnWidth(15)
    },
    thickText: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans"
    },
    serviceDetailsText: {
        color: '#444444',
        fontSize: setValueBasedOnHeight(14),
        flexWrap: "wrap",
        flexShrink: 1,
        flex: 1
    },
    marginVertical10: {marginVertical: setValueBasedOnHeight(10)},
    greyText: {
        fontSize: setFontSize(12),
        color: "#8c8c8c",
        fontFamily: "OpenSans"
    },
    smallText: {fontSize: setFontSize(12)},
    slotDetailsContainer: {flexDirection: "row"},
    verticalDivider: {
        width: 1,
        height: setValueBasedOnHeight(14),
        backgroundColor: "#8c8c8c",
        marginHorizontal: setValueBasedOnWidth(12)
    },
    slotDetails: {flexDirection: "row"},
    horizontalDivider: {},
    arrow: {
        position: "absolute",
        right: 0,
        paddingLeft: setValueBasedOnWidth(7),
        paddingRight: setValueBasedOnWidth(10),
        paddingVertical: setValueBasedOnHeight(3)
    },
    serviceTypes: {width: setValueBasedOnWidth(220)}
})