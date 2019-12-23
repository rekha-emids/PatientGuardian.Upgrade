import { StyleSheet } from 'react-native';
import {setValueBasedOnWidth, setValueBasedOnHeight, setFontSize} from '../../../utils/deviceDimensions'

export default StyleSheet.create({
    container: {
       flexDirection: "row",
       alignItems: "center",
       marginTop: setValueBasedOnHeight(16)
    },
    checkBoxContainer: {marginRight: setValueBasedOnWidth(12)},
    text: {
        fontSize: setFontSize(14),
        fontFamily: "OpenSans"
    },
    emptyCheckBox: {
        width: setFontSize(14),
        height: setFontSize(14),
        borderWidth: setValueBasedOnWidth(1),
        borderColor: "#b7b7b7",
        borderRadius: setValueBasedOnWidth(1)
    },
    disableStyle: {opacity: 0.7}
})
