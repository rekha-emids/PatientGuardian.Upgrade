import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';

const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: '#f9f9f9',
        marginHorizontal: setValueBasedOnWidth(22),
        marginBottom: setValueBasedOnHeight(17)
    },

    mainCard: {backgroundColor: '#f9f9f9'},

    imagestyle: {
        height: setValueBasedOnWidth(24),
        width: setValueBasedOnWidth(24)
    },

    viewStyle: { 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginBottom: setValueBasedOnHeight(11)
    },

    headingTextStyle: {  
        color: '#444444',
        fontSize: setFontSize(16),
        fontWeight: "600",
        fontFamily: 'OpenSans'
    },

    subheadingText: {
        color: '#8c8c8c',
        fontSize: setFontSize(14),
        fontFamily: 'OpenSans'
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
        marginTop: setValueBasedOnHeight(39),
        marginBottom: setValueBasedOnHeight(19),
        fontFamily: 'OpenSans'
    },
    BoldTextEmail: {
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(16),
        fontWeight: "600",
        marginTop: setValueBasedOnHeight(10),
        marginBottom: setValueBasedOnHeight(19),
        fontFamily: 'OpenSans'
    },
    buttonText: {
        color: "white",
        paddingHorizontal: setValueBasedOnWidth(14),
        paddingVertical: setValueBasedOnHeight(8),
        backgroundColor: THEME_PRIMARY_COLOR,
        borderRadius: setValueBasedOnWidth(4)
    },
    manualSyncDate: {
        flex: 1, 
        flexDirection: 'column',
        marginBottom: setValueBasedOnHeight(17)
    }
})

export default styles