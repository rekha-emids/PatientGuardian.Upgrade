import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth } from '../../../../../../utils/deviceDimensions';

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: setValueBasedOnHeight(80),
        backgroundColor: '#3b104f'
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: setValueBasedOnWidth(15),
        paddingRight: setValueBasedOnWidth(15)
    },
    titleHeader: {
        fontSize: setValueBasedOnHeight(18),
        color: '#ffffff',
        fontWeight: '600'
    },
    arrow: {justifyContent: 'center'},
    rightContent: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    listView: {
        marginTop: setValueBasedOnHeight(12),
        backgroundColor: '#ffffff',
        flex: 1
    },
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
        borderRadius: setValueBasedOnHeight(16),
        backgroundColor: 'red'
    },
    imageProfileSize: {
        width: setValueBasedOnHeight(32),
        height: setValueBasedOnHeight(32)
    },
    contentCenter: {
        justifyContent: 'center',
        paddingLeft: setValueBasedOnWidth(10)
    },
    modalStyle: {
        height: setValueBasedOnHeight(122),
        width: '100%',
        bottom: 0,
        position: 'absolute',
        backgroundColor: '#ffffff'
    },
    lineStyle: {
        height: setValueBasedOnHeight(1),
        backgroundColor: '#e0e0e0'
    },
    sortModalTitle: {
        height: setValueBasedOnHeight(40),
        justifyContent: 'center',
        paddingLeft: setValueBasedOnWidth(15),
        paddingRight: setValueBasedOnWidth(15)
    },
    patientNameStyle: {
        color: '#444444',
        fontSize: setValueBasedOnHeight(14)
    },
    newestOldest: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingLeft: setValueBasedOnWidth(15),
        paddingRight: setValueBasedOnWidth(15)
    },
    dateSection: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    selectedSortStyle: {
        color: '#5d2976',
        fontSize: setValueBasedOnHeight(14)
    },
    transparentContainer: {
        position: "absolute",
        top: 0,
        bottom: 0,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.8)',
        width: setValueBasedOnWidth(360),
        height: setValueBasedOnHeight(620)
    }
})