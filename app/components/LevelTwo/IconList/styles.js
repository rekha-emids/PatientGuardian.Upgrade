import { StyleSheet } from 'react-native';
import { setHeight, setValueBasedOnHeight, setValueBasedOnWidth } from '../../../utils/deviceDimensions';

export default StyleSheet.create({
    container: {
        paddingLeft: setValueBasedOnWidth(5.27),
        paddingRight: setValueBasedOnWidth(5.27),
        paddingVertical: setValueBasedOnHeight(20),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    optionitem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    itemdetail: {
        marginLeft: setHeight(1.5),
        marginRight: setHeight(0.75),
        flexDirection: 'column',
        justifyContent: 'center'
    },
    fontstyle: {
        fontSize: setHeight(2.5),
        color: '#373737',
        fontFamily: "OpenSans"
    },
    desc: {
        fontSize: setHeight(1.87),
        color: '#7c7c7c',
        fontFamily: "OpenSans"
    },
    selectedItem: {
        flex: 0.1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: setValueBasedOnWidth(12),
        width: setValueBasedOnWidth(20)
    },
    selected: {alignSelf: 'center', height: setValueBasedOnWidth(15), width: setValueBasedOnWidth(15)},
    center: {alignSelf: 'center', height: setValueBasedOnHeight(30), width: setValueBasedOnHeight(30)}
})