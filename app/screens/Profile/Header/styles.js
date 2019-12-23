import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setFontSize, setValueBasedOnWidth } from '../../../utils/deviceDimensions';
import {THEME_PRIMARY_COLOR} from '../../../constants/theme'

export default StyleSheet.create({
    editIcon: {
        width: setValueBasedOnWidth(16),
        height: setValueBasedOnHeight(16),
        resizeMode: "contain"
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: setValueBasedOnHeight(18)
    },
    heading: {
        fontSize: setFontSize(16),
        fontWeight: 'bold',
        color: THEME_PRIMARY_COLOR,
        fontFamily: "OpenSans"
    }
})