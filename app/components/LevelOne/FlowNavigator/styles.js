import { StyleSheet } from 'react-native';
import { setHeight, setWidth, setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';

export default StyleSheet.create({
    container: {
        height: setValueBasedOnHeight(70),
        justifyContent: "center",
        width: setValueBasedOnWidth(360)
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: setWidth(5.27),
        paddingRight: setWidth(5.27)
    },
    textStyle: {
        fontSize: setFontSize(12),
        textAlign: 'center'
    },
    activeTextStyle: {color: THEME_PRIMARY_COLOR},
    imagestyle: {
        color: '#FFF',
        width: setHeight(4),
        height: setHeight(4)
    },
    connector: {
        height: setValueBasedOnWidth(1),
        backgroundColor: "#dcdcdc",
        width: setValueBasedOnWidth(240),
        alignSelf: 'center'
        // marginBottom: setValueBasedOnWidth(10),
        // // alignSelf: "center",
        // position: "absolute",
        // top: setValueBasedOnHeight(27)
    },
    lineView: {flexDirection: 'column', height: setValueBasedOnWidth(22), justifyContent: 'center'},
    emptyDot: {
        width: setValueBasedOnWidth(15),
        height: setValueBasedOnWidth(15),
        borderRadius: setValueBasedOnWidth(7.5),
        borderColor: "#dcdcdc",
        justifyContent: 'center',
        borderWidth: setValueBasedOnWidth(1),
        backgroundColor: "white"
    },
    activeDot: {
        width: setValueBasedOnWidth(15),
        height: setValueBasedOnWidth(15),
        borderRadius: setValueBasedOnWidth(7.5),
        borderColor: "#3b104f",
        borderWidth: setValueBasedOnWidth(1)
    },
    outLayer: {
        width: setValueBasedOnWidth(22),
        height: setValueBasedOnWidth(22),
        borderRadius: setValueBasedOnWidth(22 / 2),
        borderColor: "#3b104f",
        borderWidth: setValueBasedOnWidth(1),
        alignItems: "center",
        justifyContent: "center"
    },
    icon: {
        width: setValueBasedOnWidth(22),
        height: setValueBasedOnWidth(22)
    },
    contentContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: setValueBasedOnWidth(22),
        width: setValueBasedOnWidth(360)
    },
    contentTextContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    }
})