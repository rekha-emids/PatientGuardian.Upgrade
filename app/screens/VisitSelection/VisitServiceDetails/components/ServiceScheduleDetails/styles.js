import {StyleSheet, Platform} from 'react-native'
import {setValueBasedOnHeight, setFontSize, setValueBasedOnWidth} from '../../../../../utils/deviceDimensions'
import { THEME_PRIMARY_COLOR, WHITE, GRAY_INACTIVE } from '../../../../../constants/theme';
export default StyleSheet.create({
    mainContainer: {
        flex: 1, 
        paddingBottom: setValueBasedOnHeight(15)
    },
    container: {
        paddingHorizontal: setValueBasedOnWidth(16),
        paddingVertical: setValueBasedOnHeight(19),
        backgroundColor: "#f9f9f9"
    },
    cardContainer: {
        flex: 1,
        borderRadius: setValueBasedOnWidth(4),
        backgroundColor: "white",
        marginBottom: setValueBasedOnHeight(18),
        paddingTop: setValueBasedOnHeight(21),
        marginHorizontal: setValueBasedOnWidth(15),
        ...Platform.select({
            android: {elevation: 2},
            ios: {
                shadowColor: '#000000',
                shadowOpacity: 0.3,
                shadowRadius: 2,
                shadowOffset: {height: 2}
            }
        })
    },
    text: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans"
    },
    divider: {
        flex: 1,
        height: setValueBasedOnHeight(1),
        backgroundColor: "#dcdcdc",
        marginBottom: setValueBasedOnHeight(17)
    },
    visitStatus: {
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(14),
        fontFamily: "OpenSans"
    },
    iconWithText: {
        flexDirection: "row",
        paddingHorizontal: setValueBasedOnWidth(7),
        borderWidth: 1,
        borderColor: THEME_PRIMARY_COLOR,
        paddingVertical: setValueBasedOnHeight(3),
        borderRadius: setValueBasedOnWidth(3)
        
    },
    icon: {marginRight: setValueBasedOnWidth(9)},
    textContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: setValueBasedOnWidth(17),
        marginBottom: setValueBasedOnHeight(16)
    },
    border: {
        borderLeftWidth: setValueBasedOnWidth(3),
        borderColor: THEME_PRIMARY_COLOR
    },
    message: {
        fontSize: setFontSize(14),
        textAlign: "center",
        color: GRAY_INACTIVE
    },
    sortFilterStyle: {
        height: setValueBasedOnHeight(40),
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
        marginBottom: setValueBasedOnHeight(8)
    },
    requestTitle: {
        color: '#444444',
        fontSize: setValueBasedOnHeight(13)
    },
    filterContainer: {
        height: setValueBasedOnHeight(50),
        borderRadius: setValueBasedOnWidth(4),
        borderWidth: 1,
        borderColor: THEME_PRIMARY_COLOR,
        flexDirection: "row",
        margin: setValueBasedOnWidth(10)
    },
    filterTextStyle: {
        color: WHITE,
        fontSize: setFontSize(14)
    },
    filerButtonStyle: {
        flex: 1,
        backgroundColor: THEME_PRIMARY_COLOR,
        alignItems: "center",
        justifyContent: "center"
    },
    requestTitle: {
        color: '#444444',
        fontSize: setValueBasedOnHeight(13)
    },
    filter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    purple: {color: THEME_PRIMARY_COLOR},
    blankView: {
        width: setValueBasedOnWidth(200),
        height: setValueBasedOnHeight(150),
        alignSelf: "center"
    },
    emptyViewContainer: {
        alignItems: "center",
        paddingTop: setValueBasedOnHeight(20),
        backgroundColor: WHITE,
        flex: 1
    },
    noResults: {
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(14)
    },
    type: {
        width: setValueBasedOnWidth(30),
        height: setValueBasedOnWidth(30),
        resizeMode: "contain",
        marginHorizontal: setValueBasedOnWidth(2)
    },
    countBg: {
        width: setValueBasedOnWidth(30),
        height: setValueBasedOnWidth(30),
        backgroundColor: THEME_PRIMARY_COLOR,
        borderRadius: setValueBasedOnWidth(15),
        alignItems: "center",
        justifyContent: "center"
    },
    count: {
        fontSize: setFontSize(14),
        color: WHITE
    },
    serviceTypesContainer: {flexDirection: "row"},
    scrollviewStyle: {
        flex: 1,
        backgroundColor: WHITE
    },
    blankView: {
        width: setValueBasedOnWidth(300),
        height: setValueBasedOnHeight(150),
        alignSelf: "center",
        resizeMode: 'contain'
    },
    emptyViewContainer: {
        alignItems: "center",
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        zIndex: 0
        
    },
    noResults: {
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(14)
    }
})