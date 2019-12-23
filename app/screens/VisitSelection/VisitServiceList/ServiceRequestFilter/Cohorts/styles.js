import {StyleSheet} from 'react-native'
import { setValueBasedOnHeight, setFontSize, setValueBasedOnWidth } from '../../../../../utils/deviceDimensions';


export default StyleSheet.create({
    title: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans",
        fontWeight: '600',
        marginBottom: setValueBasedOnHeight(7)
    },
    container: {
        paddingVertical: setValueBasedOnHeight(12),
        paddingHorizontal: setValueBasedOnWidth(12)
    },
    margin: {marginBottom: setValueBasedOnHeight(20)},
    text: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans",
        textAlign: "center"
    },
    paddingText: {marginLeft: setValueBasedOnWidth(7)},
    spDetails: {
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    emptyCheckbox: {
        width: setValueBasedOnHeight(15),
        height: setValueBasedOnHeight(15),
        borderRadius: 3,
        borderColor: "#ebebeb",
        borderWidth: 1
    }  
})