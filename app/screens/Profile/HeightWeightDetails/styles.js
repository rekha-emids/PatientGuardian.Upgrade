import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../utils/deviceDimensions';
export default StyleSheet.create({
    cardContainer: {
        paddingVertical: setValueBasedOnHeight(23),
        paddingLeft: setValueBasedOnWidth(15),
        paddingRight: setValueBasedOnWidth(17),
        backgroundColor: "#ffffff"
    
    },
    fieldTitle: {
        color: "#444444",
        fontSize: setFontSize(14),
        fontWeight: '600',
        fontFamily: "OpenSans",
        marginVertical: setValueBasedOnHeight(3)
    },
    fieldValue: {
        color: "#444444",
        fontSize: setFontSize(14),
        fontFamily: "OpenSans",
        marginVertical: setValueBasedOnHeight(3)
    }
})