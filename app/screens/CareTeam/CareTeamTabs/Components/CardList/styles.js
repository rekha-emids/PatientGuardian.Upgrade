import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth } from '../../../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../../../constants/theme';

export default StyleSheet.create({
    listItem: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        height: setValueBasedOnHeight(56),
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: setValueBasedOnHeight(1),
        borderBottomColor: '#e1e1e1',
        paddingLeft: setValueBasedOnHeight(15),
        paddingRight: setValueBasedOnHeight(15)
    },
    imageProfileView: {
        width: setValueBasedOnHeight(32),
        height: setValueBasedOnHeight(32),
        borderRadius: setValueBasedOnHeight(16)
    },
    imageProfileSize: {
        width: setValueBasedOnHeight(32),
        height: setValueBasedOnHeight(32)
    },
    contentCenter: {
        justifyContent: 'center',
        paddingLeft: setValueBasedOnWidth(10)
    },
    requestTitle: {
        color: '#444444',
        fontSize: setValueBasedOnHeight(14)
    },
    rightContent: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: "center"
    },
    rowStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    marginRight: {marginRight: setValueBasedOnWidth(10)},
    approveButton: {
        height: setValueBasedOnHeight(32),
        width: setValueBasedOnWidth(94),
        borderRadius: setValueBasedOnHeight(4),
        borderWidth: setValueBasedOnWidth(1),
        borderColor: THEME_PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center'
    },
    approveButtonText: {
        color: '#4f236b',
        fontSize: setValueBasedOnHeight(14)
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    margin: {marginHorizontal: setValueBasedOnWidth(5)}
})