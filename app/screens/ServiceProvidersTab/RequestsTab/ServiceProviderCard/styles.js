import { StyleSheet, Platform } from 'react-native'
import { setValueBasedOnWidth, setValueBasedOnHeight, setFontSize } from '../../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../../constants/theme';

export default StyleSheet.create({
    cardContianer: {
        marginHorizontal: setValueBasedOnWidth(16),
        marginBottom: setValueBasedOnHeight(10),
        borderRadius: setValueBasedOnWidth(4),
        paddingBottom: setValueBasedOnHeight(10),
        ...Platform.select({
            android: {elevation: 5},
            ios: {
                shadowOffset: {height: 2},
                shadowOpacity: 1,
                shadowColor: "rgba(0, 0, 0, 0.12)"
            }
        })
    },
    marginSpace: {
        marginBottom: setValueBasedOnHeight(5),
        marginTop: setValueBasedOnHeight(5)
    },
    detailsContainer: {
        paddingLeft: setValueBasedOnWidth(10),
        flexDirection: "row",
        paddingTop: setValueBasedOnWidth(10)
    },
    picOuterLayer: {
        width: setValueBasedOnWidth(80),
        height: setValueBasedOnWidth(80),
        borderColor: "#dcdcdc",
        borderWidth: 2,
        borderRadius: setValueBasedOnWidth(40),
        alignItems: "center",
        justifyContent: "center"
    },
    pic: {
        width: setValueBasedOnWidth(70),
        height: setValueBasedOnWidth(70),
        borderRadius: setValueBasedOnWidth(35),
        resizeMode: "cover"
    },
    picWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: setValueBasedOnWidth(10)
    },
    greyText: {
        fontSize: setFontSize(12),
        color: "#8c8c8c",
        fontFamily: "OpenSans"
    },
    smallText: {fontSize: setFontSize(12)},
    thickText: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans"
    },
    dot: {
        width: setValueBasedOnWidth(5),
        height: setValueBasedOnWidth(5),
        borderRadius: setValueBasedOnWidth(2.5),
        backgroundColor: "#dcdcdc",
        marginHorizontal: setValueBasedOnWidth(10)
    },
    serviceDetailsText: {
        color: '#444444',
        fontSize: setValueBasedOnHeight(14),
        flexWrap: "wrap",
        flexShrink: 1,
        flex: 1
    },
    costAndFavouriteContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: setValueBasedOnWidth(23),
        marginRight: setValueBasedOnHeight(16),
        alignItems: "center"
    },
    nameAndConstContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: setValueBasedOnHeight(10),
        alignItems: "center"
    },
    horizontalDivider: {
        height: 1,
        flex: 1,
        backgroundColor: "#e0e0e0",
        marginBottom: setValueBasedOnHeight(10)
    },
    spStatusContainer: {
        width: setValueBasedOnWidth(60),
        height: setValueBasedOnHeight(28),
        borderColor: THEME_PRIMARY_COLOR,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: setValueBasedOnWidth(4)
    },
    buttonContianer: {
        backgroundColor: THEME_PRIMARY_COLOR,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: setValueBasedOnWidth(7),
        paddingVertical: setValueBasedOnHeight(5)
    },
    buttonText: {
        fontSize: setFontSize(14),
        color: "white",
        fontWeight: "600",
        fontFamily: "OpenSans"
    },
    constText: {
        fontSize: setFontSize(14),
        color: THEME_PRIMARY_COLOR,
        fontFamily: "OpenSans",
        fontWeight: '600'

    },
    hourText: {
        fontSize: setFontSize(12),
        fontFamily: "OpenSans",
        fontWeight: '600',
        color: THEME_PRIMARY_COLOR
    },
    name: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans",
        fontWeight: "600",
        maxWidth: setValueBasedOnWidth(170)
    },
    marginVertical10: {marginVertical: setValueBasedOnHeight(7)},
    rowCenter: {
        flexDirection: "row",
        alignItems: "center"
    },
    likeIcon: {
        width: setValueBasedOnWidth(20),
        height: setValueBasedOnHeight(17)
    },
    statusText: {
        fontSize: setFontSize(12),
        color: THEME_PRIMARY_COLOR,
        fontFamily: "OpenSans"
    },
    engageButton: {
        alignSelf: "flex-end",
        marginRight: setValueBasedOnWidth(10)
    },
    srCard: {marginHorizontal: setValueBasedOnWidth()},
    cancelButton: {
        paddingHorizontal: setValueBasedOnWidth(10),
        paddingVertical: setValueBasedOnHeight(7),
        borderWidth: 1,
        borderColor: THEME_PRIMARY_COLOR,
        backgroundColor: "white",
        borderRadius: setValueBasedOnWidth(5),
        alignSelf: 'center',
        marginLeft: setValueBasedOnWidth(7)
    },
    textStyle: {
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(12),
        textAlign: "center"
    },
    hireButton: {
        paddingHorizontal: setValueBasedOnWidth(10),
        paddingVertical: setValueBasedOnHeight(7),
        backgroundColor: THEME_PRIMARY_COLOR,
        marginLeft: setValueBasedOnWidth(8),
        borderRadius: setValueBasedOnWidth(5),
        alignSelf: 'center'
    },
    modalContainer: {
        width: setValueBasedOnWidth(350),
        height: setValueBasedOnHeight(400),
        backgroundColor: '#f8f8f8',
        borderRadius: setValueBasedOnWidth(4),
        alignSelf: "center",
        paddingHorizontal: setValueBasedOnWidth(5),
        paddingTop: setValueBasedOnHeight(10),
        marginTop: setValueBasedOnHeight((640 - 400) / 2)
    },
    footer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingVertical: setValueBasedOnHeight(14),
        paddingHorizontal: setValueBasedOnWidth(12)
    },
    transparentModal: {
        width: setValueBasedOnWidth(360),
        height: setValueBasedOnHeight(640),
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    topText: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    fixWitdh: {flex: 1},
    dotsImage: {
        position: 'absolute',
        right: setValueBasedOnHeight(1)
    },
    bottomRowStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        flex: 1,
        paddingLeft: setValueBasedOnWidth(33),
        paddingRight: setValueBasedOnWidth(10),
        paddingVertical: setValueBasedOnHeight(8)
    },
    flexContainer: {flex: 1, justifyContent: 'center', marginLeft: setValueBasedOnWidth(10)},
    footerContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    hourTextWrapper: {
        flexDirection: 'row',
        alignItems: "center"
    },
    waterMarkContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    waterMark: {
        fontSize: setFontSize(14),
        textAlign: "center",
        color: "#9e9e9e"
    },
    marginBottom: { marginBottom: setValueBasedOnHeight(5) },
    message: {textAlign: 'center'},
    purpleText: {
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(16),
        fontWeight: 'bold'
    },
    flexCenter: {
        flex: 1,
        justifyContent: 'center'
    }
})