import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { setHeight, setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../utils/deviceDimensions';
import { WHITE, THEME_SECONDARY_COLOR } from '../../../constants/theme';
const conversationstyles = StyleSheet.create({
    container: {
        height: setValueBasedOnHeight(78),
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#66307f',
        paddingLeft: setHeight(2),
        paddingRight: setHeight(2)
    },
    contentContainer: {paddingBottom: 20},
    addIcon: {
        flex: 2,
        height: '35%',
        width: '35%',
        marginLeft: '78%',
        position: 'absolute',
        zIndex: 1,
        marginTop: 23
    },
    HeaderText: {
        fontSize: setValueBasedOnHeight(18),
        color: '#fff',
        alignSelf: 'center'
    },
    addIconIOS: {
        flex: 1,
        height: '35%',
        width: '35%',
        marginLeft: '82%',
        position: 'absolute',
        zIndex: 1,
        marginTop: 28
    },
    HeaderTextIos: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
        marginTop: 26,
        marginLeft: Dimensions.get('window').width * 0.07
    },
    msglistouterWrapUnread: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: setValueBasedOnHeight(14),
        paddingHorizontal: setValueBasedOnWidth(16),
        backgroundColor: WHITE,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center'
    },
    
    msglistavtrWrap: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    msgliststatsWrap: {
        paddingLeft: setValueBasedOnWidth(8),
        justifyContent: 'flex-end',
        alignSelf: 'flex-end'
    },
    msglistmsgWrap: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: setValueBasedOnWidth(8)
    },
    avtrHolderLeft: {
        width: 30,
        height: 30,
        backgroundColor: THEME_SECONDARY_COLOR,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        position: 'absolute',
        left: '20%',
        top: '25%',
        zIndex: 99
    },
    avtrHolderRight: {
        backgroundColor: THEME_SECONDARY_COLOR,
        marginLeft: -setValueBasedOnWidth(7),
        zIndex: -1
    },
    avtrCountText: {
        paddingTop: 5,
        fontSize: 12,
        color: '#3c1053',
        textAlign: 'center'
    },
    avtrHolderWrap: {
        width: setValueBasedOnWidth(27),
        height: setValueBasedOnWidth(27),
        borderRadius: setValueBasedOnWidth(13.5),
        borderColor: 'transparent',
        borderWidth: 1,
        resizeMode: "cover"
    },
    extraIcon: {
        left: -setValueBasedOnWidth(8),
        zIndex: -1
    },
    msglistTitleWrap: {
        height: 20,
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10
    },
    msglistAttachWrap: {flexDirection: 'row'},
    msglistmsgTitle: {
        flex: 1,
        fontSize: 14,
        color: '#373737'
    },
    msglistmsgText: {
        fontSize: 14,
        color: '#9f9f9f',
        width: '80%',
        overflow: 'hidden'
    },
    msglistdateText: {
        fontSize: 12,
        color: '#9f9f9f'
    },
    unreadHolder: {
        height: setValueBasedOnWidth(20),
        width: setValueBasedOnWidth(20),
        backgroundColor: 'red',
        borderRadius: setValueBasedOnWidth(10),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    msglistdateHolder: {
        width: 100,
        paddingTop: 5,
        position: 'absolute',
        right: '1%',
        top: 28
    },
    dateCountText: {
        fontSize: 12,
        color: '#fff',
        alignSelf: 'flex-end',
        marginRight: 10

    },
    unreadText: {
        fontSize: setFontSize(10),
        color: '#fff'
    },
    msglistImgText: {
        fontSize: 14,
        color: '#9f9f9f',
        paddingLeft: 7
    },
    button: {
        width: setValueBasedOnHeight(18),
        height: setValueBasedOnHeight(18),
        alignSelf: 'center'
    },
    rightIcon: {
        width: setValueBasedOnHeight(18),
        height: setValueBasedOnHeight(18)
    },
    rightIconIOS: {
        flex: 2,
        width: setValueBasedOnHeight(20),
        height: setValueBasedOnHeight(20),
        marginLeft: '22%',
        marginBottom: 12
    },
    userIcon: {
        width: setValueBasedOnWidth(30),
        height: setValueBasedOnWidth(30),
        borderRadius: setValueBasedOnWidth(15),
        borderWidth: 1,
        borderColor: '#fff',
        zIndex: 1
    },
    dateText: {
        fontSize: setFontSize(10),
        color: '#9f9f9f',
        textAlign: 'right'
    },
    attachIcon: {
        height: setValueBasedOnHeight(12),
        width: setValueBasedOnWidth(12) 
    },
    emptyMsg: {
        width: setValueBasedOnWidth(120),
        height: setValueBasedOnHeight(120),
        alignSelf: "center"
    },
    emptyText: {
        color: "#8c8c8c",
        fontSize: setFontSize(12),
        textAlign: "center",
        fontFamily: "Opensans"
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white"
    },
    imageViewWrap: {flexDirection: 'row'},
    fixLeftWidth: {width: setValueBasedOnWidth(54)}
});


export default conversationstyles;