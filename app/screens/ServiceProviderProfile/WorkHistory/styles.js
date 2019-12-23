import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../utils/deviceDimensions';
export default StyleSheet.create({
    cardContainer: {
        paddingVertical: setValueBasedOnHeight(23),
        paddingLeft: setValueBasedOnWidth(15),
        paddingRight: setValueBasedOnWidth(17),
        backgroundColor: "#ffffff"
    },
    icon: {
        width: setValueBasedOnWidth(34),
        height: setValueBasedOnHeight(34),
        marginRight: setValueBasedOnWidth(9)
    },
    editIcon: {
        width: setValueBasedOnWidth(16),
        height: setValueBasedOnHeight(26)
    },
    content: {flex: 1},
    companyName: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans",
        fontWeight: "bold"
    },
    companyDetails: {
     fontSize: setFontSize(14),
     color: "#444444",
     fontFamily: "OpenSans"
    },
    listItem: {
        flexDirection: "row",
        marginBottom: setValueBasedOnHeight(22)
    },
    divider: {
        height: setValueBasedOnHeight(1),
        flex: 1,
        backgroundColor: "#d8d8d8",
        marginLeft: setValueBasedOnWidth(43)
    },
    date: {
        fontSize: setFontSize(12),
        fontFamily: "OpenSans",
        color: "#444444",
        fontWeight: "bold"
    },
    companyLocation: {
        fontSize: setFontSize(12),
        color: "#444444",
        fontFamily: "OpenSans"
    },
    serviceName: {
        color: "#444444",
        fontSize: setFontSize(14),
        fontFamily: "OpenSans"
        },
    showDetails: {
        flexDirection: 'row',
        marginLeft: setValueBasedOnWidth(3)
    },
    arrowIcon: {
        marginLeft: setValueBasedOnWidth(8),
        resizeMode: 'contain'
    },
    description: {
        flexDirection: "row",
        marginBottom: setValueBasedOnHeight(22),
        alignItems: "center",
        justifyContent: "center"
    }
})