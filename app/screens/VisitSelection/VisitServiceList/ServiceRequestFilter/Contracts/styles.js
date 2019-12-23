import {StyleSheet} from 'react-native'
import { setValueBasedOnHeight, setFontSize, setValueBasedOnWidth } from '../../../../../utils/deviceDimensions';

export default StyleSheet.create({
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
    itemContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: setValueBasedOnHeight(8)
    }
})