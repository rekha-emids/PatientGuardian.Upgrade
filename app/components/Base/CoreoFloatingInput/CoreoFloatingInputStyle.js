import { StyleSheet, Platform } from 'react-native';
import { setHeight, setFontSize } from '../../../utils/deviceDimensions';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1c40f'
    },
    padding: {paddingTop: setHeight(2.81)},
    inputstyle: {
        height: setHeight(6.25),
        fontSize: setFontSize(14),
        color: '#373737',
        borderBottomColor: Platform.OS === 'ios' ? '#B8B3B3' : 'transparent',
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0
    },

    unselectedInputStyle: {
        height: setHeight(6.25),
        fontSize: setFontSize(14),
        color: '#373737',
        borderBottomColor: Platform.OS === 'ios' ? '#c04e59' : 'transparent',
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0

    }
})