import {StyleSheet} from 'react-native'
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../../../utils/deviceDimensions';

export default StyleSheet.create({
    stars: {
        flexDirection: "row",
        marginBottom: setValueBasedOnHeight(22),
        marginTop: setValueBasedOnHeight(10)
    },
    title: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans",
        fontWeight: '600'
    },
    container: {
        paddingVertical: setValueBasedOnHeight(12),
        paddingHorizontal: setValueBasedOnWidth(12)
    },
    margin: {padding: setValueBasedOnWidth(7)}
})