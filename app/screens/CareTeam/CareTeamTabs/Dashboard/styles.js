import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../../constants/theme';

export default StyleSheet.create({
    dashboardView: {
        backgroundColor: '#f9f9f9',
        height: '100%'
    },
    mainContainer: {
        flexDirection: "row", justifyContent: "space-between",
        alignItems: "center",
        marginTop: setValueBasedOnHeight(10)
    },
    container: {
        justifyContent: 'center',
        height: setValueBasedOnHeight(80),
        backgroundColor: '#3b104f'
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: setValueBasedOnWidth(15),
        paddingRight: setValueBasedOnWidth(15)
    },
    imageProfileView: {
        width: setValueBasedOnHeight(40),
        height: setValueBasedOnHeight(40),
        borderRadius: setValueBasedOnHeight(20),
        backgroundColor: '#fff'
    },
    imageNotificationView: {
        width: setValueBasedOnHeight(40),
        height: setValueBasedOnHeight(40),
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    calendarView: {justifyContent: 'center'},
    imageProfileSize: {
        width: setValueBasedOnHeight(40),
        height: setValueBasedOnHeight(40)
    },
    fontLarge: {
        fontSize: setValueBasedOnHeight(18),
        fontWeight: '600',
        color: '#ffffff'
    },
    contentCenter: {justifyContent: 'center'},
    dateStyle: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        height: setValueBasedOnHeight(47),
        marginHorizontal: setValueBasedOnWidth(6),
        marginBottom: setValueBasedOnHeight(7),
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2
    },
    datePartStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center",
        marginHorizontal: setValueBasedOnWidth(5)
    },
    calendertext: {fontSize: setValueBasedOnHeight(14), color: '#8c8c8c'},
    calenderDateTextStyle: {fontSize: setValueBasedOnHeight(14), color: '#444444'},
    fromToStyle: {alignSelf: 'center', fontSize: setValueBasedOnHeight(11), fontWeight: '600', color: THEME_PRIMARY_COLOR},
    dateValue: { color: "#444444", fontSize: setValueBasedOnHeight(14) },
    datePlaceholder: { color: "#d3d3d3", fontSize: setValueBasedOnHeight(14) },
    dateSeperator: { opacity: 0.2, color: '#000000', fontSize: setValueBasedOnHeight(25)},
    tabBgStyle: {
        marginLeft: setValueBasedOnHeight(15),
        backgroundColor: "#f9f9f9",
        height: 0
    },
    tabBarUnderlineStyle: {
        height: setValueBasedOnHeight(3),
        backgroundColor: THEME_PRIMARY_COLOR
    },
    tabStyle: {backgroundColor: "#f9f9f9"},
    tabTextStyle: {
        fontSize: setFontSize(14),
        fontFamily: "OpenSans",
        fontWeight: '600',
        color: "#444444"
    },
    activeTextStyle: {
        fontSize: setFontSize(14),
        fontFamily: "OpenSans",
        color: THEME_PRIMARY_COLOR,
        fontWeight: '600'
    },

    
    scrollviewStyle: {
        height: '100%',
        backgroundColor: '#F9F9F9',
        paddingLeft: setValueBasedOnWidth(15),
        paddingRight: setValueBasedOnWidth(15)
    },
    cardStyle: {
        backgroundColor: '#ffffff',
        height: setValueBasedOnHeight(163),
        marginTop: setValueBasedOnHeight(15),
        borderRadius: setValueBasedOnHeight(4),
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 2
    },
    lineStyle: {
        height: setValueBasedOnHeight(1),
        backgroundColor: '#e0e0e0'
    },
    cardPatientView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: setValueBasedOnWidth(15),
        paddingRight: setValueBasedOnWidth(15)
    },
    imageItemView: {
        width: setValueBasedOnHeight(32),
        height: setValueBasedOnHeight(32),
        borderRadius: setValueBasedOnHeight(16)
    },
    imagePatientView: {
        width: setValueBasedOnHeight(32),
        height: setValueBasedOnHeight(32),
        borderRadius: setValueBasedOnHeight(16)
    },
    imagePatientSize: {
        height: setValueBasedOnHeight(32),
        width: setValueBasedOnHeight(32),
        borderRadius: setValueBasedOnHeight(16)
    },
    imageItemSize: {
        height: setValueBasedOnHeight(32),
        width: setValueBasedOnHeight(32)
    },
    postedDateName: {paddingLeft: setValueBasedOnWidth(12)},
    patientNameStyle: {
        color: '#444444',
        fontSize: setValueBasedOnHeight(14)
    },
    spStyle: {
        paddingRight: setValueBasedOnWidth(10),
        color: THEME_PRIMARY_COLOR,
        fontSize: setValueBasedOnHeight(14)
    },
    cardPatientViewLeft: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    requestStatusViewStyle: {
        height: setValueBasedOnHeight(20),
        width: setValueBasedOnWidth(55),
        borderRadius: setValueBasedOnHeight(4),
        borderWidth: setValueBasedOnHeight(1),
        marginRight: setValueBasedOnWidth(20)
    },
    requestStatusStyle: {
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center'
    },
    cardPatientViewRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    cardInformationView: {
        height: setValueBasedOnHeight(100),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: setValueBasedOnWidth(15),
        paddingRight: setValueBasedOnWidth(15)
    },
    descriptionView: {
        flex: 1,
        marginLeft: setValueBasedOnWidth(20),
        paddingTop: setValueBasedOnHeight(10),
        paddingBottom: setValueBasedOnHeight(10),
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    requestTitle: {
        color: '#444444',
        fontSize: setValueBasedOnHeight(14)
    },
    requestDescription: {
        color: '#8c8c8c',
        fontSize: setValueBasedOnHeight(12)
    },
    requestFrequency: {
        color: '#444444',
        fontSize: setValueBasedOnHeight(12)
    },
    dateSection: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageMarginTop: {marginTop: setValueBasedOnHeight(22)},
    sortFilterStyle: {
        height: setValueBasedOnHeight(40),
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3
    },
    sort: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: '#e0e0e0'
    },
    filter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalStyle: {
        alignSelf: 'center',
        height: setValueBasedOnHeight(187),
        width: '100%',
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        backgroundColor: '#ffffff'
    },
    sortModalTitle: {
        height: setValueBasedOnHeight(40),
        justifyContent: 'center',
        paddingLeft: setValueBasedOnWidth(15),
        paddingRight: setValueBasedOnWidth(15)
    },
    postedVisit: {
        height: setValueBasedOnHeight(73),
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingLeft: setValueBasedOnWidth(15),
        paddingRight: setValueBasedOnWidth(15)
    },
    newestOldest: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingLeft: setValueBasedOnWidth(15),
        paddingRight: setValueBasedOnWidth(15)
    },
    selectedSortStyle: {
        color: '#5d2976',
        fontSize: setValueBasedOnHeight(14)
    },
    tabBarStyle: {
        height: setValueBasedOnHeight(53),
        backgroundColor: "white"
    },
    activeTabStyle: {
        borderBottomWidth: setValueBasedOnWidth(1),
        borderColor: THEME_PRIMARY_COLOR
    },
    indicatorStyle: {backgroundColor: THEME_PRIMARY_COLOR},
    labelStyle: {fontSize: setFontSize(14)},
    todayIcon: {
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(14),
        marginRight: setValueBasedOnHeight(10)

    },
    dateFont: {
        fontSize: setFontSize(11),
        fontFamily: "OpenSans",
        color: "#444444"
    }
})