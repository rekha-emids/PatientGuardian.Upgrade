import {StyleSheet, Platform} from 'react-native'
import { setValueBasedOnWidth, setValueBasedOnHeight, setFontSize } from '../../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../../constants/theme';

export default StyleSheet.create({
    cardContainer: {
        backgroundColor: "white",
        paddingHorizontal: setValueBasedOnWidth(15),
        paddingTop: setValueBasedOnHeight(18),
        paddingBottom: setValueBasedOnHeight(24),
        ...Platform.select({
            android: {elevation: 2},
            ios: {
                shadowColor: '#000000',
                shadowOpacity: 0.3,
                shadowRadius: 2,
                shadowOffset: {height: 2}
            }
        }),
        marginBottom: setValueBasedOnHeight(13)
    },
    text: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans",
        marginBottom: setValueBasedOnHeight(12)
    },
    paymentText: {fontWeight: "600"},
    heading: {
        fontSize: setFontSize(16),
        color: THEME_PRIMARY_COLOR,
        fontFamily: "OpenSans",
        marginBottom: setValueBasedOnHeight(20)
    },
    divider: {
        flex: 1,
        height: setValueBasedOnHeight(1),
        backgroundColor: "#dcdcdc",
        marginBottom: setValueBasedOnHeight(10)
    },
    detailsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    progressContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    amount: {
        fontSize: setFontSize(14),
        color: THEME_PRIMARY_COLOR,
        fontFamily: "OpenSans"
    },
    border: {
        borderWidth: setValueBasedOnWidth(1),
        borderColor: THEME_PRIMARY_COLOR,
        borderRadius: setValueBasedOnWidth(4),
        paddingHorizontal: setValueBasedOnWidth(9),
        paddingVertical: setValueBasedOnHeight(15)
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    buttonText: {
        fontSize: setFontSize(16),
        color: THEME_PRIMARY_COLOR,
        fontFamily: "OpenSans",
        fontWeight: '600',
        marginHorizontal: setValueBasedOnWidth(12)
    },
    flex: {
        flex: 1,
        marginLeft: setValueBasedOnWidth(7),
        textAlign: 'right'
    },
    shadow: {
        ...Platform.select({
            android: {elevation: 0},
            ios: {
                shadowColor: '#000000',
                shadowOpacity: 0,
                shadowRadius: 0,
                shadowOffset: {height: 0}
            }
        })

    }
})