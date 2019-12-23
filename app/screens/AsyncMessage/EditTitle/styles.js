import { StyleSheet } from 'react-native';
import { setHeight, setWidth, setValueBasedOnHeight, setValueBasedOnWidth } from '../../../utils/deviceDimensions';
export default StyleSheet.create({
    container: {
        height: setValueBasedOnHeight(78),
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#66307f' 
    },
    topContainer: {
        paddingLeft: setValueBasedOnWidth(18),
        paddingRight: setValueBasedOnWidth(18)
    },
    HeaderText: {
        fontSize: setHeight(2.81),
        flex: 5,
        color: '#fff',
        textAlign: 'left',
        marginTop: setHeight(4.5),
        marginLeft: setWidth(20),
        marginRight: setWidth(20)
    },
    HeaderTextIos: {
        fontSize: setHeight(2.81),
        flex: 5,
        color: '#fff',
        textAlign: 'left',
        marginTop: setHeight(4.5),
        marginLeft: setWidth(20),
        marginRight: setWidth(20)
    },
    rightIconIOS: {
        flex: 1,
        width: setHeight(2.81),
        height: setHeight(2.81),
        marginRight: '0%',
        position: 'absolute',
        zIndex: 1,
        marginTop: 33     
    },
    rightIcon: {
        flex: 1,
        width: setHeight(2.81),
        height: setHeight(2.81),
        marginRight: '0%',
        position: 'absolute',
        zIndex: 1,
        marginTop: 33
    },
    leftIconIOS: {
        flex: 2,
        height: setHeight(2.81),
        width: setHeight(2.81),
        marginLeft: '4%',
        position: 'absolute',
        zIndex: 1,
        marginTop: 32       
    },
    leftIcon: {
        flex: 2,
        height: setHeight(2.81),
        width: setHeight(2.81),
        marginLeft: '4%',
        position: 'absolute',
        zIndex: 1,
        marginTop: 32
    },
    button: {
        flex: 1,
        height: setHeight(30)
    },
    titleEdit: {
        marginTop: 16,
        paddingLeft: 17
    },
    message: {
        fontSize: setHeight(2.5),
        textAlign: 'center',
        color: '#373737'
    }
});