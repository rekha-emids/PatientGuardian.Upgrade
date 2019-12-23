import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../constants/theme';

const styles = StyleSheet.create({
    backView: {
        // height: setValueBasedOnHeight(40),
        justifyContent: 'center'
    },
    backText: {
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(16),
        marginLeft: setValueBasedOnWidth(10)
    },
    leftView: {
        paddingVertical: setValueBasedOnHeight(5),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: setValueBasedOnWidth(10)
    }
});  

export default styles;