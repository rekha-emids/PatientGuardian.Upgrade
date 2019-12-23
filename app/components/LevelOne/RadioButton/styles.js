import {StyleSheet} from 'react-native'
import { setValueBasedOnHeight, setValueBasedOnWidth } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';

export default StyleSheet.create({
    container: {
        marginRight: setValueBasedOnWidth(12),
        padding: setValueBasedOnWidth(4)
    },
    areaNotSelected: {
        height: setValueBasedOnHeight(22),
        width: setValueBasedOnHeight(22),
        borderRadius: setValueBasedOnHeight(11),
        borderWidth: setValueBasedOnHeight(1),
        borderColor: '#444444'
    },
    areaSelected: {
        height: setValueBasedOnHeight(22),
        width: setValueBasedOnHeight(22),
        borderRadius: setValueBasedOnHeight(11),
        borderWidth: setValueBasedOnHeight(1),
        borderColor: THEME_PRIMARY_COLOR,
        justifyContent: 'center'
    },
    selected: {
        width: setValueBasedOnHeight(10),
        height: setValueBasedOnHeight(10),
        borderRadius: setValueBasedOnHeight(5),
        backgroundColor: THEME_PRIMARY_COLOR,
        alignSelf: 'center',
        alignItems: 'center'
    }
})