import { StyleSheet } from 'react-native';
import {  WHITE, THEME_PRIMARY_COLOR } from '../../../constants/theme';
import { setHeight,  setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../utils/deviceDimensions';

export default StyleSheet.create({
    container: {
        marginTop: setValueBasedOnHeight(10),
        marginHorizontal: setValueBasedOnWidth(16)
    },
    topContainer: {
        marginHorizontal: setValueBasedOnWidth(16),
        backgroundColor: '#fff',
        marginBottom: setValueBasedOnHeight(27),
        marginTop: setValueBasedOnHeight(10),
        paddingTop: setValueBasedOnHeight(10)
    },
    selectView: {
        width: 150,
        marginTop: -15
    },
    colorSelect: {
 color: THEME_PRIMARY_COLOR, fontSize: setFontSize(12),
    marginRight: -setValueBasedOnWidth(10),
    width: setValueBasedOnWidth(130)
},
    text1: {
        marginLeft: setValueBasedOnWidth(5),
        fontSize: setFontSize(12)
    },
    seperator: {
        marginLeft: setValueBasedOnWidth(10),
        width: setValueBasedOnWidth(1),
        height: setValueBasedOnHeight(15)
    },
    text2: {
        marginLeft: setValueBasedOnWidth(23),
        width: setValueBasedOnWidth(1),
        height: setValueBasedOnHeight(15)
    },
    text3: {marginLeft: setValueBasedOnWidth(10)},
    text4: {
        left: setValueBasedOnWidth(175),
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(12)
    },
    textApplication: {color: THEME_PRIMARY_COLOR},
    textDescription1: {
        color: '#444444',
        fontSize: setFontSize(14),
        flexWrap: "wrap",
        flex: 1
    },
    textDescription2: {
        color: '#8c8c8c',
        fontSize: setFontSize(12)
    },
    activityContainer: {
        borderBottomWidth: 0.5,
        borderColor: '#e0e0e0',
        flexWrap: "wrap"
    },
    showMoreText: {
        alignSelf: 'center',
        color: THEME_PRIMARY_COLOR,
        marginVertical: setValueBasedOnHeight(10),
        marginRight: setValueBasedOnWidth(7)
    },
    footerText: {
        flex: 1,
        left: 8,
        flexDirection: 'row',
        marginTop: setValueBasedOnHeight(5)

    },
    heading: {
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(16),
        fontWeight: '600'
    },
    noInfoIcon: {height: setHeight(5)},
    noInfoBox: {},
    imageStyle: {
        height: setValueBasedOnHeight(30),
        width: setValueBasedOnWidth(30),
        marginTop: setValueBasedOnHeight(12),
        marginHorizontal: setValueBasedOnWidth(15)
    },
    dropdown: {width: setValueBasedOnWidth(5)},
    upperRow: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: setValueBasedOnHeight(5)
    },
  
    patientImgStyle: {
        height: setValueBasedOnWidth(24),
        borderRadius: setValueBasedOnWidth(12),
        width: setValueBasedOnWidth(24),
        // paddingLeft:setValueBasedOnWidth(10),
        // marginLeft: setValueBasedOnWidth(40),
        resizeMode: "cover"
    },
    nameText: {
        fontSize: setFontSize(14),
        color: "#444444",
        marginLeft: setValueBasedOnWidth(10),
        marginRight: setValueBasedOnWidth(20)
    },
    emptyCard: {
        backgroundColor: '#f9f4ff',
        width: setValueBasedOnWidth(250),
        height: setValueBasedOnHeight(70),
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,  
        elevation: 5,
        padding: setValueBasedOnWidth(5),
        marginVertical: setValueBasedOnHeight(4),
        marginHorizontal: setValueBasedOnWidth(2)
    },

    emptytextStyle: {
        marginHorizontal: setValueBasedOnWidth(10),
        fontFamily: 'OpenSans',
        fontSize: setFontSize(14),
        color: '#373737',
        alignSelf: 'center',
        textAlign: "center"
    },
    editImageStyle: {
        width: setValueBasedOnWidth(36),
        height: setValueBasedOnHeight(42)
    },
    emptyContainer: { 
        flexDirection: 'row',
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: setValueBasedOnHeight(10),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,  
        elevation: 5
        // marginHorizontal: setValueBasedOnWidth(14),
    },
    cardContainer: {
        width: setValueBasedOnWidth(284),
        height: setValueBasedOnHeight(100),
        backgroundColor: "#f1e7fb",
        borderRadius: setValueBasedOnWidth(4),
        marginHorizontal: setValueBasedOnWidth(10),
        backgroundColor: "white"
    },
    selectedBgColor: {
        backgroundColor: "#f1e7fb",
        borderWidth: setValueBasedOnWidth(1),
        borderColor: THEME_PRIMARY_COLOR
    },
    serviceDetailsContainer: {
        height: setValueBasedOnHeight(117),
        marginTop: setValueBasedOnHeight(15),
        backgroundColor: "white",
        borderRadius: setValueBasedOnWidth(4),
        flexDirection: 'column',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,  
        elevation: 5
    },
    icon: {
        alignItems: 'center',
        width: setValueBasedOnHeight(30),
        height: setValueBasedOnHeight(30),
        marginRight: setValueBasedOnWidth(16)
    },
    thickText: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans"
    },
    srMarginRight: {marginRight: setValueBasedOnWidth(50)},
    serviceDetailsText: {
        color: '#444444',
        fontSize: setValueBasedOnHeight(14),
        flexWrap: "wrap",
        flexShrink: 1,
        flex: 1
    },
    marginVertical10: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    greyText: {
        fontSize: setFontSize(12),
        color: "#8c8c8c",
        fontFamily: "OpenSans"
    },
    smallText: {
        fontSize: setFontSize(12),
        marginRight: 0,
        marginBottom: setValueBasedOnHeight(5)
    },
    slotDetailsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal: setValueBasedOnWidth(10),
        flex: 1.5
    },
    verticalDivider: {
        width: 1,
        height: setValueBasedOnHeight(14),
        backgroundColor: "#8c8c8c",
        marginHorizontal: setValueBasedOnWidth(5)
    },
    slotDetails: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: 'center',
        flex: 0.8
    },
    horizontalDivider: {},
    arrow: {
        position: "absolute",
        bottom: setValueBasedOnHeight(8),
        right: setValueBasedOnWidth(10)
    },
    picDetails: {flexDirection: "row"},
    selectRequest: {alignItems: "flex-end"},
    topContainerSR: {
        alignItems: 'center',
        height: setValueBasedOnHeight(76),
        borderBottomWidth: setValueBasedOnHeight(1),
        borderColor: '#e0e0e0',
        flexDirection: 'row'
    },
    paddingHorizontal: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: setValueBasedOnWidth(10),
        flex: 1
    },
    applicationText: {
        fontSize: setFontSize(13),
        color: THEME_PRIMARY_COLOR,
        fontWeight: '600',
        fontFamily: "OpenSans"
    },
    outerWrapper: {
        flexDirection: 'row',
        alignItems: "center",
        flex: 0.5,
        marginLeft: setValueBasedOnWidth(10)
        // marginRight:setValueBasedOnWidth(10)
    },
    emptyContentContainer: {
        backgroundColor: WHITE,
        flex: 1,
        alignItems: "center"
    },
    guideline1: {
        width: setValueBasedOnWidth(250),
        height: setValueBasedOnHeight(180),
        alignSelf: "center"
    }
});