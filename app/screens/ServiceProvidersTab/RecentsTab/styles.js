import {StyleSheet} from 'react-native'
import { setValueBasedOnHeight } from '../../../utils/deviceDimensions';

export default StyleSheet.create({
    margin: {
        paddingTop: setValueBasedOnHeight(20),
        flex: 1
    }
})