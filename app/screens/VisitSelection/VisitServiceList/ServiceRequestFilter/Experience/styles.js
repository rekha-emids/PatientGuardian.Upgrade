import {StyleSheet} from 'react-native'
import { setValueBasedOnHeight, setFontSize, setValueBasedOnWidth } from '../../../../../utils/deviceDimensions';


export default StyleSheet.create({
    title: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans",
        fontWeight: '600',
        textAlign: "center"
    },
    container: {
        paddingVertical: setValueBasedOnHeight(12),
        paddingHorizontal: setValueBasedOnWidth(12)
    },
    margin: {marginVertical: setValueBasedOnHeight(12)},
    errorMsg: {
        fontSize: setValueBasedOnHeight(10),
        color: "#c04e59",
        marginHorizontal: setValueBasedOnWidth(5),
        fontFamily: "OpenSans"
    
      },
      errorMsgContainer: {
        flexDirection: "row",
        alignItems: "center"
      }
})