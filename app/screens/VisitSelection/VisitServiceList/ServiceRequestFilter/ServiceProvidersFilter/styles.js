import {StyleSheet} from 'react-native'
import { setValueBasedOnHeight, setFontSize, setValueBasedOnWidth } from '../../../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../../../constants/theme';
export default StyleSheet.create({
    container: {
        paddingVertical: setValueBasedOnHeight(12),
        marginHorizontal: setValueBasedOnWidth(12)
    },
      text: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans",
        textAlign: "center",
        fontWeight: '600'
    },
    margin: {marginBottom: setValueBasedOnHeight(20)},
    spDetails: {
        flexDirection: "row",
        alignItems: "center"
    },
    pic: {
        width: setValueBasedOnWidth(30),
        height: setValueBasedOnWidth(30),
        borderRadius: setValueBasedOnWidth(15),
        resizeMode: "cover",
        marginLeft: setValueBasedOnWidth(7),
        marginRight: setValueBasedOnWidth(10)
    },
    emptyCheckbox: {
        width: setValueBasedOnHeight(15),
        height: setValueBasedOnHeight(15),
        borderRadius: 3,
        borderColor: "#ebebeb",
        borderWidth: 1
    },
    checkboxView: {justifyContent: 'center', height: setValueBasedOnHeight(20), width: setValueBasedOnHeight(20)}
})