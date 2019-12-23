import {StyleSheet} from 'react-native'
import {setValueBasedOnHeight, setValueBasedOnWidth} from '../../../utils/deviceDimensions'
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';
export default StyleSheet.create({
    progressBarContainer: {
        width: setValueBasedOnHeight(120),
        height: setValueBasedOnHeight(6),
        borderRadius: setValueBasedOnWidth(3),
        backgroundColor: "#dcdcdc",
        marginHorizontal: setValueBasedOnWidth(10)
    },
    progress: {
        position: "absolute",
        top: 0,
        left: 0,
        borderRadius: setValueBasedOnWidth(3),
        height: setValueBasedOnHeight(6),
        backgroundColor: THEME_PRIMARY_COLOR
    }
})