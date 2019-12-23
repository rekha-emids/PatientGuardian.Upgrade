import { StyleSheet } from 'react-native';
import { setValueBasedOnWidth } from '../../../utils/deviceDimensions';
export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    errorContainer: {backgroundColor: 'red', justifyContent: 'center'},
    errorMsg: {color: 'white', textAlign: 'center', padding: setValueBasedOnWidth(5)}
})