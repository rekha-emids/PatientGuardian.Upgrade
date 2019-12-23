import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../../utils/deviceDimensions';

export default StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: setValueBasedOnHeight(15),
        justifyContent: "center",
        flex: 1
    },
    dateContainer: {flex: 2},
    remark: {
        flex: 3,
        fontSize: setFontSize(12),
        color: "#444444",
        fontFamily: "OpenSans",
        marginLeft: setValueBasedOnWidth(5)
    },
    editIcon: {
        width: setValueBasedOnWidth(15),
        height: setValueBasedOnHeight(15),
        marginLeft: setValueBasedOnWidth(5)
    },
    activeTextStyle: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans"
    },
    date: {
        fontSize: setFontSize(12),
        color: "#444444",
        fontFamily: "OpenSans",
        fontWeight: '500',
        marginRight: setValueBasedOnWidth(5)
    },
    text: {
        fontSize: setFontSize(12),
        color: "#444444",
        fontFamily: "OpenSans"
    },
    touchableArea: {
        width: setValueBasedOnWidth(20),
        height: setValueBasedOnHeight(20),
        marginRight: setValueBasedOnWidth(5),
        marginLeft: setValueBasedOnWidth(5)
    }

})