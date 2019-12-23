import { StyleSheet } from 'react-native';
import {setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../utils/deviceDimensions';

export default StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center"
    },
    selectedValue: {
        fontSize: setFontSize(14),
        color: "#8c8c8c"
    },
    icon: {marginLeft: setValueBasedOnWidth(5)},
    pickerContianer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    contentContainerStyle: {
        justifyContent: "center",
        flex: 1,
        width: setValueBasedOnWidth(300)
    },
    option: {
        borderBottomWidth: 1,
        backgroundColor: "white",
        flexDirection: "row",
        borderColor: 'rgba(0,0,0,0.1)',
        paddingHorizontal: setValueBasedOnWidth(7),
        paddingBottom: setValueBasedOnHeight(12),
        paddingTop: setValueBasedOnHeight(10),
        alignItems: "center"
    },
    content: {
        maxHeight: setValueBasedOnHeight(300),
        borderRadius: setValueBasedOnWidth(5)
    },
    optionText: {
        color: '#8c8c8c',
        fontSize: setFontSize(14)
    },
    selectedOption: {},
    image: {
        width: setValueBasedOnWidth(22),
        height: setValueBasedOnWidth(22),
        borderRadius: setValueBasedOnWidth(11),
        resizeMode: 'cover',
        marginRight: setValueBasedOnWidth(7),
        alignSelf: "center"
    }
})