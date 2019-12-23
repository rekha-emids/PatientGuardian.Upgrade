import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight  } from '../../../../../utils/deviceDimensions';

export default StyleSheet.create({
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
    }
})