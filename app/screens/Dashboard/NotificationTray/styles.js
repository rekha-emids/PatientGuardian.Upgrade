
import {StyleSheet, Platform} from 'react-native'
import {setValueBasedOnHeight, setValueBasedOnWidth, setFontSize} from '../../../utils/deviceDimensions'
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';
export default StyleSheet.create({
    transparentModal: {
        width: setValueBasedOnWidth(360),
        height: setValueBasedOnHeight(640),
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContainer: {
        width: setValueBasedOnWidth(330),
        height: setValueBasedOnHeight(350),
        backgroundColor: '#f8f8f8',
        borderRadius: setValueBasedOnWidth(4),
        paddingHorizontal: setValueBasedOnWidth(5),
        paddingTop: setValueBasedOnHeight(10),
        marginTop: setValueBasedOnHeight(125),
        alignSelf: "center"
    },
    notificationCardContainer: {
        width: setValueBasedOnWidth(300),
        padding: setValueBasedOnHeight(8),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        ...Platform.select({
            android: {elevation: setValueBasedOnHeight(7)},
            ios: {
                shadowColor: '#000000',
                shadowOpacity: 0.3,
                shadowRadius: setValueBasedOnHeight(2),
                shadowOffset: {height: setValueBasedOnHeight(2)}
            }
        }),
        marginBottom: setValueBasedOnHeight(8),
        borderRadius: setValueBasedOnWidth(4)
    },
    textContainer: {flex: 1},
    notificationText: {
        flex: 1,
        fontSize: setFontSize(14),
        color: "#444444"
    },
    cancelButton: {
        borderColor: THEME_PRIMARY_COLOR,
        borderWidth: setValueBasedOnWidth(1),
        backgroundColor: "white",
        alignSelf: "flex-end",
        paddingHorizontal: setValueBasedOnWidth(15)
    },
    textStyle: {
        color: 'white',
        fontSize: setFontSize(13),
        textAlign: "center"
    },
    footerContainer: {
        marginBottom: setValueBasedOnHeight(8),
        width: setValueBasedOnWidth(300),
        paddingTop: setValueBasedOnHeight(15)
    },
    flex: {
        flex: 1,
        alignItems: "center"
    },
    cancelText: {color: THEME_PRIMARY_COLOR},
    joinButton: {
        paddingHorizontal: setValueBasedOnWidth(10),
        paddingVertical: setValueBasedOnHeight(7),
        backgroundColor: THEME_PRIMARY_COLOR,
        borderRadius: setValueBasedOnWidth(5),
        marginLeft: setValueBasedOnWidth(7)
    },
    title: {
        fontSize: setFontSize(14),
        fontWeight: "600",
        paddingHorizontal: setValueBasedOnWidth(10),
        marginBottom: setValueBasedOnHeight(15),
        textAlign: "center",
        color: THEME_PRIMARY_COLOR
    },
    footer: {
        marginBottom: setValueBasedOnHeight(8),
        width: setValueBasedOnWidth(310),
        paddingTop: setValueBasedOnHeight(15),
        flexDirection: "row",
        justifyContent: "space-between"
    },
    wrapper: {
        flex: 1,
        alignItems: "flex-start"
    }
})