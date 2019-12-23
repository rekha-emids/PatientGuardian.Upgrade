import { StyleSheet, Platform } from 'react-native';
import { setHeight, setValueBasedOnWidth, setValueBasedOnHeight } from '../../../utils/deviceDimensions';
export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1c40f'
    },
    padding: {
        paddingTop: setHeight(2.81),
        paddingBottom: setValueBasedOnHeight(10)
    },
    inputstyle: { 
        height: setHeight(6.25),
        fontSize: setHeight(2.5),
        color: '#373737',
        borderBottomColor: Platform.OS === 'ios' ? '#B8B3B3' : 'transparent',
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
        fontFamily: "OpenSans"
    },
    picker: {
        color: "#373737",
        height: setHeight(6.25),
        flex: 1
    },
    labelStyle: {
        position: 'absolute',
        left: setValueBasedOnWidth(2),
        top: 0,
        fontSize: setHeight(1.87),
        color: '#373737'
      },
      border: {
        height: 1,
        backgroundColor: '#B8B3B3',
        flex: 1,
        top: setValueBasedOnHeight(-3),
        marginHorizontal: setValueBasedOnWidth(2),
        marginTop: setValueBasedOnHeight(8)
      },
      itemStyle: {color: "#444444"}
})