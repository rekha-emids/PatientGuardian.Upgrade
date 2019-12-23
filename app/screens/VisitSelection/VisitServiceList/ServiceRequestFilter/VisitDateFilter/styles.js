import {StyleSheet} from 'react-native'
import { setValueBasedOnHeight, setFontSize, setValueBasedOnWidth } from '../../../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../../../constants/theme';
export default StyleSheet.create({
    container: {paddingVertical: setValueBasedOnHeight(10)},
    calendar: {marginHorizontal: setValueBasedOnWidth(10)},
    divider: {
        height: 1,
        width: setValueBasedOnWidth(220),
        backgroundColor: "#ebebeb",
        alignItems: "center",
        marginBottom: setValueBasedOnHeight(10)
    },
      text: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans",
        textAlign: "center",
        fontWeight: '600',
        marginBottom: setValueBasedOnHeight(20)
    }
})