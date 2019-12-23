import { StyleSheet } from 'react-native';
import { setValueBasedOnWidth, setValueBasedOnHeight } from '../../../utils/deviceDimensions';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: "center",
        backgroundColor: 'transparent'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    customLoader: {
        position: "absolute",
        top: 0,
        bottom: 0,
        width: setValueBasedOnWidth(360),
        height: setValueBasedOnHeight(640),
        backgroundColor: "rgba(255,255,255,0.5)",
        alignSelf: "center"
    },
    spinner: {
        width: setValueBasedOnWidth(60),
        height: setValueBasedOnHeight(60),
        alignSelf: "center"
    },
    center: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    spinnerView: {marginBottom: setValueBasedOnHeight(10)}
})