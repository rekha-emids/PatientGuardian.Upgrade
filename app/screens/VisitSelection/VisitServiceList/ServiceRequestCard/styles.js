import { StyleSheet } from 'react-native';
import {isIOS} from '../../../../utils/appUtils'
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../../utils/deviceDimensions';
import { DEFAULT_STATUS_COLOR, THEME_PRIMARY_COLOR } from '../../../../constants/theme';

export default StyleSheet.create({
    mainContainer: {flex: 1},
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
        flex: 1,
        paddingLeft: setValueBasedOnWidth(15),
        paddingRight: setValueBasedOnWidth(15)
    },
    cardStyle: {
        backgroundColor: '#ffffff',
        height: setValueBasedOnHeight(120),
        marginTop: setValueBasedOnHeight(15),
        borderRadius: setValueBasedOnHeight(4),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: isIOS() ? 0.4 : 0.1,
        shadowRadius: isIOS() ? 5 : 2,
        elevation: isIOS() ? 2 : 1
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
        borderRadius: setValueBasedOnHeight(16),
        resizeMode: 'cover'
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
        alignItems: "center",
        justifyContent: "center",
        marginRight: setValueBasedOnWidth(20)
    },
    requestStatusStyle: {
        color: DEFAULT_STATUS_COLOR,
        fontSize: setFontSize(12),
        fontWeight: '600',
        textAlign: 'center',
        paddingHorizontal: setValueBasedOnWidth(3)
    },
    cardPatientViewRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    cardInformationView: {
        height: setValueBasedOnHeight(70),
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
    imageMarginTop: {
        height: '100%',
        justifyContent: 'center'
    },
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
    TouchableOpacityStyle: {   
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: setValueBasedOnWidth(15),
        bottom: setValueBasedOnHeight(13)
      },
    plusIcon: {
        width: setValueBasedOnWidth(40), 
        height: setValueBasedOnWidth(40)
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
    patientNameStyle: {
        color: '#444444',
        fontSize: setValueBasedOnHeight(14)
    },
    patientDetails: {
        flexDirection: "row",
        alignItems: "center"
    },
    emptyContainer: { 
        backgroundColor: '#ffffff',
        height: setValueBasedOnHeight(163),
        marginTop: setValueBasedOnHeight(15),
        borderRadius: setValueBasedOnHeight(4),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: isIOS() ? 0.4 : 0.1,
        shadowRadius: isIOS() ? 5 : 2,
        elevation: isIOS() ? 2 : 1
    },

    editImageStyle: {
        width: setValueBasedOnWidth(36),
        height: setValueBasedOnHeight(42),
        alignSelf: 'center'
    },

    emptytextStyle: {
        marginHorizontal: setValueBasedOnWidth(10),
        fontFamily: 'OpenSans',
        fontSize: setFontSize(14),
        color: '#373737',
        alignSelf: 'center',
        textAlign: "center"
    },

    emptyCard: {
        backgroundColor: '#ffffff',
        height: setValueBasedOnHeight(163),
        marginTop: setValueBasedOnHeight(15),
        borderRadius: setValueBasedOnHeight(4),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: isIOS() ? 0.4 : 0.1,
        shadowRadius: isIOS() ? 5 : 2,
        elevation: isIOS() ? 2 : 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    isOpenStyle: {
        flexDirection: 'row', 
        justifyContent: 'flex-start'
    }
})