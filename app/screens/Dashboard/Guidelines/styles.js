import {StyleSheet} from 'react-native'
import { WHITE, THEME_PRIMARY_COLOR, GREY } from '../../../constants/theme';
import { setValueBasedOnWidth, setValueBasedOnHeight, HEIGHT, setFontSize } from '../../../utils/deviceDimensions';
export default StyleSheet.create({
    mainContainer: {
        backgroundColor: WHITE,
        marginHorizontal: setValueBasedOnWidth(16),
        padding: setValueBasedOnWidth(10),
        height: HEIGHT - setValueBasedOnHeight(56) - setValueBasedOnHeight(50) - setValueBasedOnHeight(30),
        borderRadius: setValueBasedOnWidth(5)
    },
    stepsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    outerCircle: {
        width: setValueBasedOnWidth(60),
        height: setValueBasedOnWidth(60),
        borderRadius: setValueBasedOnWidth(30),
        borderWidth: 1,
        borderColor: THEME_PRIMARY_COLOR,
        alignItems: "center",
        justifyContent: "center"
    },
    innerCircle: {
        width: setValueBasedOnWidth(50),
        height: setValueBasedOnWidth(50),
        borderRadius: setValueBasedOnWidth(25),
        backgroundColor: THEME_PRIMARY_COLOR,
        alignItems: "center",
        justifyContent: "center"
    },
    stepText: {
        color: WHITE,
        fontSize: setFontSize(12)
    },
    step: {
        color: WHITE,
        fontWeight: "bold",
        fontSize: setFontSize(14)
    },
    title: {
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(14),
        textAlign: "center",
        marginTop: setValueBasedOnHeight(10),
        marginBottom: setValueBasedOnHeight(15)
    },
    content: {
        textAlign: "center",
        fontSize: setFontSize(12),
        paddingHorizontal: setValueBasedOnWidth(15),
        marginBottom: setValueBasedOnHeight(5)
    },
    stagesContainer: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    marginBottom: {marginBottom: setValueBasedOnHeight(30)},
    stageBox: {
        width: setValueBasedOnWidth(30),
        height: setValueBasedOnWidth(30),
        borderRadius: setValueBasedOnWidth(20),
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: THEME_PRIMARY_COLOR
    },
    connector: {
        flex: 1,
        height: setValueBasedOnHeight(1),
        backgroundColor: GREY
    },
    id: {
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(14),
        textAlign: "center",
        fontWeight: "500"
    },
    arrow: {
        width: setValueBasedOnHeight(17),
        height: setValueBasedOnHeight(17),
        alignSelf: "center"
    },
    image: {
        resizeMode: "contain",
        alignSelf: "center",
        paddingHorizontal: setValueBasedOnWidth(10),
        width: setValueBasedOnWidth(280),
        height: setValueBasedOnHeight(200)
    },
    flex: {
        flex: 1,
        alignItems: "center",
        marginHorizontal: setValueBasedOnWidth(15)
    },
    loaderContainer: {marginTop: HEIGHT},
    rightArrowStyle: {
        paddingRight: setValueBasedOnWidth(2),
        paddingLeft: setValueBasedOnWidth(40),
        paddingVertical: setValueBasedOnHeight(15)
    },
    leftArrowStyle: {
        paddingRight: setValueBasedOnWidth(40),
        paddingLeft: setValueBasedOnWidth(2),
        paddingVertical: setValueBasedOnHeight(15)
    }
})