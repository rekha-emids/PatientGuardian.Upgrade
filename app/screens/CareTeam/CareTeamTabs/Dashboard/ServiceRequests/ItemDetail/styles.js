import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../../../../constants/theme';

export default StyleSheet.create({
    modalSecondaryBtnText: {
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(12),
        textAlign: "center",
        alignSelf: "center"
    },
    srDetailButton: {
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(14)
    },
    textBox: {
        width: setValueBasedOnWidth(94),
        alignSelf: 'center',
        color: THEME_PRIMARY_COLOR
    },
   modalSecondaryBtn: {
       marginTop: setValueBasedOnHeight(5),
        height: setValueBasedOnHeight(31),
        width: setValueBasedOnWidth(94),
        borderWidth: 1,
        borderColor: THEME_PRIMARY_COLOR,
        backgroundColor: "white",
        borderRadius: setValueBasedOnWidth(2),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: "center",
        marginBottom: setValueBasedOnHeight(5)
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
    titleHeader: {
        fontSize: setValueBasedOnHeight(18),
        color: '#ffffff',
        fontWeight: '600'
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
    requestTitle1: {
        color: '#424242',
        fontSize: setValueBasedOnHeight(14),
        fontWeight: '600'
    },
    requestTitle: {
        textAlign: 'center',
        fontSize: setValueBasedOnHeight(14)
    },
    requestTitle2: {
        color: '#424242',
        fontSize: setValueBasedOnHeight(14),
       textAlign: 'left',
        fontWeight: '600'
    },
    cardView: {
        height: setValueBasedOnHeight(100),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: setValueBasedOnWidth(17),
        alignItems: 'center',
        backgroundColor: "#f9f9f9"
    },
    cardLeftView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    cardTitle: {
        marginLeft: setValueBasedOnWidth(15),
        height: setValueBasedOnHeight(50),
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    title: {
        fontSize: setValueBasedOnHeight(14),
        color: THEME_PRIMARY_COLOR
    },
    subTitle: {
        fontSize: setValueBasedOnHeight(14),
        color: '#424242',
        fontWeight: '600',
        marginLeft: setValueBasedOnWidth(20)
    },
    count: {
        fontSize: setValueBasedOnHeight(18),
        color: THEME_PRIMARY_COLOR,
        fontWeight: '600'
    },
    arrow: {justifyContent: 'center'},
    rightContent: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    center: {
        width: setValueBasedOnHeight(40),
        height: setValueBasedOnHeight(50)
    },
    searchBarView: {
        backgroundColor: "#ffffff",
        height: setValueBasedOnHeight(40),
        marginLeft: setValueBasedOnHeight(15),
        marginRight: setValueBasedOnHeight(15),
        marginTop: setValueBasedOnHeight(10),
        paddingLeft: setValueBasedOnWidth(10),
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 2
    },
    listView: {
        backgroundColor: '#ffffff',
        borderBottomColor: '#e1e1e1',
        marginBottom: setValueBasedOnHeight(60),
        borderTopColor: '#e1e1e1',
        height: setValueBasedOnHeight(398)
    },
    listItem: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: setValueBasedOnHeight(1),
        borderBottomColor: '#e1e1e1',
        paddingLeft: setValueBasedOnHeight(15),
        paddingRight: setValueBasedOnHeight(15),
        paddingTop: setValueBasedOnHeight(15),
        paddingBottom: setValueBasedOnHeight(15),
        marginHorizontal: setValueBasedOnWidth(16)
    },
    subContainer2: {backgroundColor: "#e1e1e1"},
    imageProfileView: {
        width: setValueBasedOnHeight(32),
        height: setValueBasedOnHeight(32),
        borderRadius: setValueBasedOnHeight(16),
        backgroundColor: 'red'
    },
    imageProfileSize: {
        width: setValueBasedOnHeight(56),
        height: setValueBasedOnHeight(56),
        borderRadius: setValueBasedOnHeight(28),
        resizeMode: 'cover'
    },
    contentCenter: {
        justifyContent: 'center',
        paddingLeft: setValueBasedOnWidth(10)
    },
    profilePicture: {
        width: setValueBasedOnHeight(60),
        height: setValueBasedOnHeight(60),
        borderRadius: setValueBasedOnHeight(30),
        borderWidth: setValueBasedOnHeight(2),
        borderColor: '#dcdcdc'
    },
    actionButtons: {
        height: setValueBasedOnHeight(62),
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute'
    },
    actionButton: {
        width: setValueBasedOnHeight(30),
        height: setValueBasedOnHeight(30)
    },

    itemKeyView: {
        flexDirection: "row", 
        justifyContent: "flex-start", 
        flex: 1
    },
    itemValueView: {
        flexDirection: "row", 
        justifyContent: "flex-end", 
        flex: 1
    },
    itemFlexSize: {flex: 1},
    contentFlexEnd: {justifyContent: "flex-end"}
})