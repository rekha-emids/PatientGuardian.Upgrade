import { StyleSheet, Platform } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth} from '../../../utils/deviceDimensions'
export default StyleSheet.create({
    container: {
        width: setValueBasedOnWidth(106),
        height: setValueBasedOnWidth(106)
    },
    image: {
        width: setValueBasedOnWidth(106),
        height: setValueBasedOnWidth(106),
        borderRadius: setValueBasedOnWidth(53),
        resizeMode: "cover"
    },
    circularButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: setValueBasedOnWidth(30),
        height: setValueBasedOnWidth(30),
        borderRadius: setValueBasedOnWidth(15),
        ...Platform.select({
            android: {elevation: 7},
            ios: {
                shadowColor: '#000000',
                shadowOpacity: 0.3,
                shadowRadius: 2,
                shadowOffset: {height: 2}
            }
        }),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white"
    },
    icon: {
        width: setValueBasedOnWidth(13),
        height: setValueBasedOnHeight(13),
        resizeMode: "contain"
    }
})