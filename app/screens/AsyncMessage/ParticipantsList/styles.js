import { StyleSheet } from 'react-native';
import { setHeight, setWidth, setValueBasedOnWidth } from '../../../utils/deviceDimensions';
export default StyleSheet.create({
    container: {
        height: 78,
        flexDirection: 'row',
        backgroundColor: '#66307f',
        position: 'relative'

    },
    HeaderText: {
        fontSize: setHeight(2.81),
        flex: 5,
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    HeaderTextIos: {
        fontSize: setHeight(2.81),
        flex: 5,
        color: '#fff',
        textAlign: 'center',
        marginTop: setHeight(3),
        marginLeft: setWidth(10),
        marginRight: setWidth(20)
    },
    rightIconIOS: {
        flex: 1,
        height: setHeight(2),
        width: setHeight(2),
        marginLeft: '82%',
        position: 'absolute',
        zIndex: 1,
        marginTop: 33
    },
    rightIcon: {
        flex: 1,
        height: setHeight(2),
        width: setHeight(2),
        marginLeft: '78%',
        position: 'absolute',
        zIndex: 1,
        marginTop: 33
    },
    leftIconIOS: {
        flex: 1,
        height: setHeight(2),
        width: setHeight(2),
        marginLeft: setHeight(2.81),
        position: 'absolute',
        zIndex: 1,
        marginTop: 32
    },
    leftIcon: {
        flex: 1,
        height: setHeight(2.81),
        width: setHeight(2.81),
        marginLeft: setHeight(2.81),
        position: 'absolute',
        zIndex: 1,
        marginTop: 32
    },
    avtrHolderLeft: {
        width: 38,
        height: 38,
        borderRadius: 19,
        borderWidth: 1,
        borderColor: '#fff',
        position: 'absolute',
        left: '5%',
        top: '17%'
    },
    avtrHolderLeftIos: {
        width: setWidth(6),
        height: setWidth(6),
        borderRadius: setWidth(6),
        borderWidth: 1,
        borderColor: '#fff',
        position: 'absolute',
        left: '5%',
        top: '17%'
    },
    msglistouterWrap: {
        flex: 1,
        flexDirection: 'row',
        height: 62
    },
    msglistouterWrapMe: {
        height: 62,
        backgroundColor: '#f8f1ff',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderTopWidth: 1,
        borderTopColor: '#ccc'

    },
    msglistavtrWrap: {
        marginLeft: setValueBasedOnWidth(10),
        flexDirection: "row"
    },
    msglistavtrWrapMe: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        marginLeft: 10
    },
    msglistmsgWrap: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'center',
        // borderTopWidth: 1,
        // borderTopColor: '#ccc',
        paddingLeft: 30
    },
    participantContainer: {height: setHeight(74.7)},
    msglistmsgWrapMe: {
        flex: 7,
        justifyContent: 'center',
        paddingLeft: 30
    },
    leaveButton: {
        marginTop: 8,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        height: setHeight(8),
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderTopWidth: 1,
        borderTopColor: '#ccc'
    },
    buttonIcon: {
        flex: 2,
        height: setHeight(2.8),
        width: setHeight(2.8),
        marginLeft: setHeight(3),
        position: 'absolute'
    },
    buttonText: {
        flex: 4,
        marginLeft: setHeight(9),
        marginTop: setHeight(2.4),
        color: '#ff5e5e'
    },
    button: {
        flex: 1,
        height: setHeight(30)
    },
    profileIcon: {
        width: setValueBasedOnWidth(27),
        height: setValueBasedOnWidth(27),
        borderRadius: setValueBasedOnWidth(13.5),
        borderColor: 'transparent',
        borderWidth: 1,
        resizeMode: "cover"
    },
    avtrHolderLeftBadge: {marginLeft: '-50'},
    ps_badge: {
        alignSelf: 'flex-end',
        marginLeft: -setValueBasedOnWidth(7)
    }
});
