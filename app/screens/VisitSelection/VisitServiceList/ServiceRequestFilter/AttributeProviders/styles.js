import {StyleSheet} from 'react-native'
import { setValueBasedOnHeight, setFontSize, setValueBasedOnWidth } from '../../../../../utils/deviceDimensions';
export default StyleSheet.create({
    container: {
        paddingVertical: setValueBasedOnHeight(12),
        marginHorizontal: setValueBasedOnWidth(12),
        flex: 1
    },
    text: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans",
        textAlign: "center",
        fontWeight: '600'
    },
    paddingText: {marginLeft: setValueBasedOnWidth(7)},
    margin: {marginBottom: setValueBasedOnHeight(20)},
    spDetails: {
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    pic: {
        width: setValueBasedOnWidth(30),
        height: setValueBasedOnWidth(30),
        borderRadius: setValueBasedOnWidth(15),
        resizeMode: "cover"
    },
    emptyCheckbox: {
        width: setValueBasedOnHeight(15),
        height: setValueBasedOnHeight(15),
        borderRadius: 3,
        borderColor: "#ebebeb",
        borderWidth: 1
    },
    searchBarContianer: {
        borderRadius: setValueBasedOnWidth(4),
        marginBottom: setValueBasedOnHeight(5)
    }
})