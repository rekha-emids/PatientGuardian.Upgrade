import { StyleSheet } from 'react-native';
import { setHeight, setFontSize, setValueBasedOnHeight, setValueBasedOnWidth } from '../../../utils/deviceDimensions';

export default StyleSheet.create({
    label: {
        color: '#444444',
        fontSize: setHeight(1.875),
        fontFamily: "OpenSans"
    },
    textStyle: {
        padding: 0,
        paddingTop: setValueBasedOnHeight(3),
        color: "#373737",
        fontSize: setFontSize(16),
        paddingBottom: setValueBasedOnHeight(5)
    },
    calenderIcon: {
        height: setValueBasedOnWidth(15),
        width: setValueBasedOnWidth(15)
    },
    placeHoldertextStyle: {
        padding: 0,
        paddingTop: setValueBasedOnHeight(3),
        color: "#8c8c8c",
        fontSize: setFontSize(16),
        paddingBottom: setValueBasedOnHeight(5)

    },
    dateContainer: {flexDirection: 'row', justifyContent: 'space-between'},
    transparentContainer: {
        paddingLeft: setValueBasedOnWidth(18),
        paddingRight: setValueBasedOnWidth(12),
        backgroundColor: "transparent",
        width: setValueBasedOnWidth(20),
        // height:setValueBasedOnHeight(30),
        marginLeft: setValueBasedOnWidth(15)
      }
})