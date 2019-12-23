import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth } from '../../../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../../../constants/theme';

export default StyleSheet.create({
    cardView: {
        backgroundColor: "#ffffff",
        height: setValueBasedOnHeight(82),
        marginLeft: setValueBasedOnHeight(15),
        marginRight: setValueBasedOnHeight(15),
        marginTop: setValueBasedOnHeight(12),
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 2
    },
    cardLeftView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    cardTitle: {
        marginLeft: setValueBasedOnWidth(15),
        height: setValueBasedOnHeight(50),
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    title: {
        fontSize: setValueBasedOnHeight(14),
        color: THEME_PRIMARY_COLOR
    },
    subTitle: {
        fontSize: setValueBasedOnHeight(14),
        color: '#8c8c8c'
    },
    count: {
        fontSize: setValueBasedOnHeight(18),
        color: THEME_PRIMARY_COLOR,
        fontWeight: '600'
    },
    center: {
        width: setValueBasedOnHeight(40),
        height: setValueBasedOnHeight(50)
    }
})