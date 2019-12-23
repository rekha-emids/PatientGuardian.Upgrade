import { StyleSheet, Platform } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9'
    },
    navbarStyles: {
        marginTop: setValueBasedOnHeight(15),
        marginBottom: setValueBasedOnHeight(15)
    },
    scrollViewStyle: {height: setValueBasedOnHeight(550)},
    openStatusStyle: {height: setValueBasedOnHeight(500)},
    postedByText: {
        marginTop: setValueBasedOnHeight(10),
        fontSize: setFontSize(18),
        fontFamily: "OpenSans",
        color: THEME_PRIMARY_COLOR,
        marginLeft: setValueBasedOnWidth(16)
    },
    patientDetailsContainer: {},
    picAndDetails: {
        flexDirection: "row",
        marginVertical: setValueBasedOnHeight(10),
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    pic: {
        width: setValueBasedOnWidth(40),
        height: setValueBasedOnWidth(40),
        borderRadius: setValueBasedOnWidth(20),
        resizeMode: 'cover',
        marginLeft: setValueBasedOnWidth(17),
        marginRight: setValueBasedOnWidth(11)
    },
    name: {
        fontSize: setFontSize(16),
        color: "#444444",
        fontFamily: "OpenSans"
    },
    postendOnText: {
        fontSize: setFontSize(14),
        color: "#8c8c8c",
        fontFamily: "OpenSans"
    },
    divider: {
        marginHorizontal: setValueBasedOnWidth(17),
        width: setValueBasedOnWidth(326),
        height: 1,
        backgroundColor: "#dcdcdc"
    },
    conversation: {
        flexDirection: "row",
        marginHorizontal: setValueBasedOnWidth(17),
        paddingVertical: setValueBasedOnHeight(14)
    },
    icon: {marginRight: setValueBasedOnWidth(24)},
    iconImage: {
        width: setValueBasedOnWidth(24),
        height: setValueBasedOnHeight(24)
    },
    conversationText: {
        fontSize: setFontSize(14),
        color: "#371047" 
    },
    seeLessOrMore: {
        marginTop: setValueBasedOnHeight(5),
        marginBottom: setValueBasedOnHeight(10),
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        marginRight: setValueBasedOnWidth(20)
    },
    text: {
        fontSize: setFontSize(14),
        color: "#373737",
        marginRight: setValueBasedOnWidth(15)
    },
    tabBgStyle: {
        backgroundColor: "transparent",
        height: 0,
        paddingTop: 0,
        paddingRight: 0,
        paddingLeft: 0
    },
    tabStyle: {backgroundColor: "white"},
    tabTextStyle: {
        fontSize: setFontSize(16),
        fontFamily: "OpenSans",
        color: "#8c8c8c"
    },
    activeTextStyle: {
        fontSize: setFontSize(16),
        fontFamily: "OpenSans",
        color: THEME_PRIMARY_COLOR,
        fontWeight: '300'
    },
    tabBarUnderlineStyle: {
        height: setValueBasedOnHeight(3),
        backgroundColor: THEME_PRIMARY_COLOR
    },
    cancelVisitContainer: {
        marginTop: setValueBasedOnHeight(10),
        paddingVertical: setValueBasedOnHeight(15)
    },
    postedContnet: {width: setValueBasedOnWidth(360)},
    sortFilterStyle: {
        borderTopColor: '#ebebeb',
        borderTopWidth: 1,
        alignSelf: "flex-end",
        height: setValueBasedOnHeight(56),
        flexDirection: 'row',
        backgroundColor: "white"
    },
    sort: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: '#e0e0e0'
    },
    cancelStyle: {
        borderTopColor: '#ebebeb',
        borderTopWidth: 1,
        alignSelf: "flex-start",
        height: setValueBasedOnHeight(50),
        flexDirection: 'row',
        backgroundColor: "white"
    },
    cancelButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: '#e0e0e0'
    },
    wrapperView: {height: setValueBasedOnHeight(534)},
    requestTitle: {
        fontSize: setFontSize(14),
        color: THEME_PRIMARY_COLOR,
        fontFamily: "OpenSans"
    },
    message: {
        textAlign: 'center',
        fontSize: setFontSize(14)
    },
    cancelViewStyle: {
        borderTopColor: '#ebebeb',
        borderTopWidth: 1,
        alignSelf: "flex-end",
        height: setValueBasedOnHeight(50),
        flexDirection: 'row',
        backgroundColor: "white"
    },
    cancelButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: '#e0e0e0'
    },
    bg: {
        position: "absolute",
        width: setValueBasedOnWidth(249),
        height: setValueBasedOnHeight(249),
        transform: [{ rotate: '180deg'}],
        resizeMode: 'stretch',
        top: setValueBasedOnHeight(-249 / 2),
        left: setValueBasedOnWidth(-40)
    },
    navBarContainer: {
        flexDirection: 'row',
        marginTop: setValueBasedOnHeight(20),
        marginBottom: setValueBasedOnHeight(19),
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    arrow: {padding: setValueBasedOnWidth(14)},
    heading: {
        fontSize: setFontSize(18),
        color: "#444444",
        fontWeight: '600',
        fontFamily: "OpenSans"
    },
    editIcon: {
        width: setValueBasedOnWidth(16),
        height: setValueBasedOnHeight(16),
        margin: setValueBasedOnHeight(14),
        resizeMode: 'contain'
     },
    arrowLessMore: {
        height: setValueBasedOnHeight(24),
        width: setValueBasedOnHeight(24)
    },
    detailsWrapper: {justifyContent: "center"},
    iconStyles: {
        width: setValueBasedOnHeight(22),
        height: setValueBasedOnHeight(22)
    },
    tabBarStyle: {
        backgroundColor: "white",
        ...Platform.select({
            android: {height: setValueBasedOnHeight(53)},
            ios: {height: setValueBasedOnHeight(30)}
        })
        
    },
    activeTabStyle: {
        borderBottomWidth: setValueBasedOnWidth(1),
        borderColor: THEME_PRIMARY_COLOR
        
    },
    indicatorStyle: {backgroundColor: THEME_PRIMARY_COLOR},
    labelStyle: {
        fontSize: setFontSize(16),
        ...Platform.select({
            ios: {
                padding: 0,
                margin: 0
            }
        })    
    },
    emptyCard: {
        width: setValueBasedOnWidth(250),
        height: setValueBasedOnWidth(50),
        alignSelf: "center"
    },
    flexSize: {flex: 1}
});  

export default styles;