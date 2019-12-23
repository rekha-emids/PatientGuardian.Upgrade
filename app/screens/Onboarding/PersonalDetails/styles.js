import { StyleSheet } from 'react-native';
import { setHeight, setWidth, setFontSize, setValueBasedOnHeight } from '../../../utils/deviceDimensions';
export default StyleSheet.create({
    wizScreenContainer: {
        flex: 0,
        height: setHeight(80)
    },
    container: {
        paddingLeft: setWidth(5.27),
        paddingRight: setWidth(5.27)
    },
    memberstyle: { marginTop: setHeight(2.19), height: setHeight(7.08) },
    icon: { width: setHeight(3.12), height: setHeight(3.12) },
    errormessage: { fontSize: setFontSize(12), color: '#dc3545' },

    errorview: { marginTop: setValueBasedOnHeight(15) },

    message: {

        fontSize: setValueBasedOnHeight(12),

        textAlign: 'center',

        color: '#444444'

    },
    screenCoverStyle: {flex: 1}
});