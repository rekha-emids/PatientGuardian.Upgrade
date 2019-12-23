import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../constants/theme';

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: setValueBasedOnHeight(60),
        backgroundColor: THEME_PRIMARY_COLOR
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
        borderRadius: setValueBasedOnHeight(20),
        backgroundColor: 'red'
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
        height: setValueBasedOnHeight(163),
        marginTop: setValueBasedOnHeight(15),
        borderRadius: setValueBasedOnHeight(4),
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
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
    sectionViewStyle: {
        flexDirection: 'row',
        marginTop: setValueBasedOnHeight(30),
        marginBottom: setValueBasedOnHeight(19),
        justifyContent: 'space-between'
    },
    sectionTextStyle: {
        color: THEME_PRIMARY_COLOR,
        marginLeft: setValueBasedOnWidth(17),
        fontSize: setFontSize(15.5)
    },
    sectionIconStyle: {marginRight: setValueBasedOnWidth(20)},
    thumbnailStyle: {
        width: setValueBasedOnWidth(72),
        height: setValueBasedOnWidth(72),
        borderRadius: setValueBasedOnWidth(36),
        resizeMode: 'cover'
    },
    cardMainTextStyle: {
        fontSize: setFontSize(14),
        color: '#444444',
        marginBottom: setValueBasedOnHeight(6)
    },
    cardSubTextStyle: {fontSize: setFontSize(12)},
   
    cardRightView: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: "center",
        marginRight: setValueBasedOnWidth(20)
    },
    cardRightViewFirstIcon: {
        resizeMode: 'contain',
        width: setValueBasedOnWidth(15),
        height: setValueBasedOnHeight(15),
        marginRight: setValueBasedOnWidth(20)   
    },
    patientNameText: {color: THEME_PRIMARY_COLOR},
    cardViewStyle: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        alignItems: 'center',
        borderBottomColor: '#e1e1e1',
        height: setValueBasedOnHeight(110)
    },
    popupText: {
        fontSize: setFontSize(16),
        textAlign: 'center'

    },
    firstCardView: {
        flex: 2, 
        marginLeft: setValueBasedOnWidth(17)
    },
    SecondCardView: {
        flex: 2, 
        marginLeft: setValueBasedOnWidth(19),
        marginRight: setValueBasedOnWidth(60),
        alignSelf: 'center'
    },
    saparator: {
        marginLeft: setValueBasedOnWidth(20),
        marginRight: setValueBasedOnWidth(20),
        height: setValueBasedOnHeight(1),
        backgroundColor: "#e1e1e1"
    }



})