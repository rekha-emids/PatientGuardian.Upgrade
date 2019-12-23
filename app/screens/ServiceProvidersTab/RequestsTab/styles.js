import {StyleSheet} from 'react-native'
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';

export default StyleSheet.create({
    requestsContainer: {marginVertical: setValueBasedOnHeight(10)},
    message: {
        fontSize: setFontSize(12),
        textAlign: 'center',
        color: '#373737'
    },
    scrollStyle: {
        marginVertical: setValueBasedOnHeight(2),
        alignItems: "center",
        flexDirection: "row"
    },
    container: {
        height: '100%',
        flex: 1,
        paddingTop: setValueBasedOnHeight(10)
    },
    mainContainer: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        paddingBottom: setValueBasedOnHeight(150)
    },
    sortFilterStyle: {
        borderBottomLeftRadius: setValueBasedOnWidth(4),
        borderBottomRightRadius: setValueBasedOnWidth(4),
        height: setValueBasedOnHeight(40),
        flexDirection: 'row',
        backgroundColor: '#ffffff',
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
    patientNameStyle: {fontSize: setFontSize(13)},
    dateSection: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    searchBarContianer: {
        marginTop: setValueBasedOnHeight(10),
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
        paddingHorizontal: setValueBasedOnWidth(10)
    },
    buttonContainer: {
        backgroundColor: THEME_PRIMARY_COLOR,
        width: setValueBasedOnWidth(55),
        height: setValueBasedOnHeight(28),
        alignItems: "center",
        justifyContent: "center",
        marginRight: setValueBasedOnWidth(8)
    },
    closeSearchContainer: {
        backgroundColor: "#ffffff",
        width: setValueBasedOnWidth(30),
        height: setValueBasedOnHeight(28),
        alignItems: "center",
        justifyContent: "center",
        marginRight: setValueBasedOnWidth(5)
    },
    textStyle: {
        color: "white",
        fontSize: setFontSize(13),
        fontWeight: "600"
    },
    closeSearchStyle: {
        color: "#000000",
        fontSize: setFontSize(20),
        fontWeight: "600"
    },
    cardContainer: {
        width: setValueBasedOnWidth(284),
        height: setValueBasedOnHeight(100),
        borderRadius: setValueBasedOnWidth(4),
        marginHorizontal: setValueBasedOnWidth(10),
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,  
        elevation: 5,
        marginVertical: setValueBasedOnHeight(4)
        
    },
    editImage: {
        width: setValueBasedOnWidth(24),
        height: setValueBasedOnHeight(24)
    },
    margin: {
        marginVertical: setValueBasedOnHeight(10),
        alignItems: "center"
    },
    requestTitle: {fontSize: setFontSize(14)},
    noTextStyle: {
        fontSize: setFontSize(14),
        marginTop: setValueBasedOnHeight(100)
    },
    clearSearch: {marginHorizontal: setValueBasedOnWidth(7)},
    crossText: {
        fontSize: setFontSize(16),
        fontWeight: "600",
        paddingHorizontal: setValueBasedOnWidth(6)
    }
})