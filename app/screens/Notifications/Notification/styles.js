import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';

const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: '#f9f9f9',
        marginHorizontal: setValueBasedOnWidth(22),
        marginTop: setValueBasedOnHeight(19)
    },

    mainCard: {
        backgroundColor: '#f9f9f9',
        flex: 1
    },

    imagestyle: {
        height: setValueBasedOnWidth(24),
        width: setValueBasedOnWidth(24)
    },

    headingTextStyle: {  
        color: '#444444',
        fontSize: setFontSize(16),
        fontWeight: "600",
        fontFamily: 'OpenSans',
        marginBottom: setValueBasedOnHeight(11)
    },

    subheadingText: {
        color: '#444444',
        fontSize: setFontSize(16),
        fontFamily: 'OpenSans'
    },
    time: {
        color: '#8c8c8c',
        fontSize: setFontSize(14),
        marginTop: setValueBasedOnHeight(7)
    },
    date: {
        marginHorizontal: setValueBasedOnWidth(22),
        marginTop: setValueBasedOnHeight(19),
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(16),
        fontWeight: '600',
        marginBottom: setValueBasedOnHeight(17)
    },
    horizontalLine: {
        height: setValueBasedOnHeight(1),
        backgroundColor: '#d7d7d7',
        marginTop: setValueBasedOnHeight(19)
    },

    blankView: {
        height: setValueBasedOnWidth(24),
        width: setValueBasedOnWidth(24),
        borderRadius: setValueBasedOnWidth(12),
        backgroundColor: '#ffffff',
        borderWidth: setValueBasedOnWidth(1),
        borderColor: '#e0e0e0'
    },

    BoldText: {
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(16),
        fontWeight: "600",
        marginTop: setValueBasedOnHeight(10),
        marginBottom: setValueBasedOnHeight(19),
        fontFamily: 'OpenSans'
    }
})

export default styles