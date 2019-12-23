import { StyleSheet } from 'react-native';
import { setWidth, setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../utils/deviceDimensions';

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: setValueBasedOnHeight(82),
        backgroundColor: '#3b104f'
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: setWidth(5.27),
        paddingRight: setWidth(5.27)
    },
    textStyle: {
        fontSize: setFontSize(16.5),
        color: '#FFF',
        fontWeight: '600'
    },
    imagestyle: {
        color: '#FFF',
        width: setValueBasedOnWidth(19),
        height: setValueBasedOnHeight(21)
    }
})