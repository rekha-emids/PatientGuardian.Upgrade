import { StyleSheet, Platform } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';

export default StyleSheet.create({
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
    fontLarge: {
        fontSize: setValueBasedOnHeight(18),
        fontWeight: '600',
        color: '#ffffff'
    },
    textStyle: {
        fontSize: setValueBasedOnHeight(2.81),
        color: '#FFF'
    },
    imageProfileView: {
        width: setValueBasedOnHeight(40),
        height: setValueBasedOnHeight(40),
        borderRadius: setValueBasedOnHeight(20)
    },
    imageNotificationView: {
        width: setValueBasedOnHeight(40),
        height: setValueBasedOnHeight(40),
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    imageProfileSize: {
        width: setValueBasedOnHeight(40),
        height: setValueBasedOnHeight(40)
    },
    scrollviewStyle: {
        height: '100%',
        backgroundColor: '#F9F9F9',
        paddingLeft: setValueBasedOnWidth(15),
        paddingRight: setValueBasedOnWidth(15)
    },
    cardStyle: {
        backgroundColor: '#ffffff',
        marginTop: setValueBasedOnHeight(15),
        borderRadius: setValueBasedOnHeight(4),
        marginHorizontal: setValueBasedOnWidth(15),
        width: setValueBasedOnWidth(360 - 30),
        ...Platform.select({
            android: {elevation: 2},
            ios: {
                shadowColor: '#000000',
                shadowOpacity: 0.3,
                shadowRadius: 2,
                shadowOffset: {height: 2}
            }
        }),
        paddingBottom: setValueBasedOnHeight(8)
    },
    lineStyle: {
        height: 1,
        backgroundColor: '#e0e0e0'
    },
    cardPatientView: {
        flexDirection: 'row',
        marginTop: setValueBasedOnHeight(10),
        paddingLeft: setValueBasedOnWidth(15),
        paddingRight: setValueBasedOnWidth(15),
        justifyContent: "space-between",
        alignItems: 'center'
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
        height: setValueBasedOnWidth(32),
        width: setValueBasedOnWidth(32),
        borderRadius: setValueBasedOnWidth(16),
        resizeMode: "cover",
        marginRight: setValueBasedOnWidth(10)
    },
    imageItemSize: {
        height: setValueBasedOnWidth(30),
        width: setValueBasedOnHeight(30)
    },
    patientNameStyle: {
        color: '#444444',
        fontSize: setValueBasedOnHeight(14)
    },
    requestStatusViewStyle: {
        height: setValueBasedOnHeight(20),
        width: setValueBasedOnWidth(55),
        borderRadius: setValueBasedOnHeight(4),
        borderWidth: setValueBasedOnHeight(1),
        marginRight: setValueBasedOnWidth(20)
    },
    cardPatientViewRight: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    requestTitle: {
        color: '#444444',
        fontSize: setValueBasedOnHeight(13)
    },
    services: {
        color: '#444444',
        fontSize: setValueBasedOnHeight(13)
    },
    requestFrequency: {
        color: '#444444',
        fontSize: setValueBasedOnHeight(12)
    },
    divider: {
        width: setValueBasedOnWidth(1),
        height: setValueBasedOnHeight(14),
        backgroundColor: "#8c8c8c",
        marginHorizontal: setValueBasedOnWidth(11)
    },
    slotTimingsContainer: {
        flexDirection: "row",
        paddingTop: setValueBasedOnHeight(12),
        paddingBottom: setValueBasedOnHeight(15),
        paddingHorizontal: setValueBasedOnWidth(17),
        alignItems: "center"
    },
    tasksProgress: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: setValueBasedOnHeight(6)
    },
    postedDateName: {
        paddingLeft: setValueBasedOnWidth(12),
        flexDirection: "row",
        justifyContent: "space-between"
    },
    spStyle: {
        paddingRight: setValueBasedOnWidth(10),
        color: THEME_PRIMARY_COLOR,
        fontSize: setValueBasedOnHeight(14)
    },
    cardPatientViewLeft: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    requestStatusStyle: {
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center'
    },
    cardInformationView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: setValueBasedOnWidth(15),
        marginVertical: setValueBasedOnHeight(5)
    },
    descriptionView: {
        flex: 1,
        marginLeft: setValueBasedOnWidth(20),
        paddingTop: setValueBasedOnHeight(10),
        paddingBottom: setValueBasedOnHeight(10),
        flexDirection: 'column',
        justifyContent: 'space-around'
    },

    requestDescription: {
        color: '#8c8c8c',
        fontSize: setValueBasedOnHeight(12),
        marginTop: setValueBasedOnHeight(6)
    },
    dateSection: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    contentCenter: {justifyContent: 'center'},
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
    detailsContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    rowStyle: {flexDirection: 'row'},
    arrowStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
    
})