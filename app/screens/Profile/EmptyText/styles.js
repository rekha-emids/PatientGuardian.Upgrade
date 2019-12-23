import {StyleSheet} from 'react-native'
import {setValueBasedOnHeight, setValueBasedOnWidth, setFontSize} from '../../../utils/deviceDimensions'

export default StyleSheet.create({
    container: {
        marginVertical: setValueBasedOnHeight(15),
        alignItems: "center",
        justifyContent: "center",
        // flexWrap: "wrap",
        flex: 1,
        paddingHorizontal: setValueBasedOnWidth(20)
    },
    text: {
        color: "#9e9e9e",
        fontSize: setFontSize(14),
        textAlign: "center"
    },
    icon: {
        width: setValueBasedOnWidth(12),
        height: setValueBasedOnHeight(12),
        resizeMode: "contain",
        alignSelf: 'center'
    },
    image: {
        width: setValueBasedOnWidth(30),
        height: setValueBasedOnHeight(30),
        resizeMode: 'contain',
        alignSelf: 'center'
    }
})