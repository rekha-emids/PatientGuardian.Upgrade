import { StyleSheet, Platform } from 'react-native';
import { setValueBasedOnWidth, setValueBasedOnHeight, WIDTH } from '../../../utils/deviceDimensions';
import { OFFLINE_TEXT_BG } from '../../../constants/theme';
export default StyleSheet.create({
    navBar: {
        backgroundColor: OFFLINE_TEXT_BG,
        height: setValueBasedOnHeight(20),
        width: WIDTH,
        flexDirection: "row",
        alignItems: "center",
        ...Platform.select({
            android: {elevation: 5},
            ios: {
                shadowOffset: {height: 2},
                shadowOpacity: 1,
                shadowColor: "rgba(0, 0, 0, 0.12)"
            }
        }),
        paddingHorizontal: setValueBasedOnWidth(16),
        justifyContent: 'center'
    },
    textStyle: {
        color: "white",
        fontSize: 20,
        fontWeight: 'bold'
    }
})