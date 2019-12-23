import { StyleSheet, NativeModules, Platform } from 'react-native';
import { setHeight, setValueBasedOnHeight } from '../../utils/deviceDimensions';
import { IPAD } from '../../constants/constants';
const { PlatformConstants } = NativeModules;
const deviceType = PlatformConstants ? PlatformConstants.interfaceIdiom : null

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4f236b',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textHeader: {color: 'white'},
    loginButton: {
        padding: 10,
        backgroundColor: 'black'
    },
    title: {
        flex: 4,
        fontSize: setHeight(4.06),
        fontWeight: '600',
        marginTop: setHeight(12.03)
    },
    marginTop: {
        flex: 1,
        ...Platform.select({ios: {marginTop: deviceType == IPAD ? setValueBasedOnHeight(10) : 0}})
    }
});  

export default styles;