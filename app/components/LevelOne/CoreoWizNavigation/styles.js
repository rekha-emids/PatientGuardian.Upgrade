import { StyleSheet } from 'react-native';
import { setHeight } from '../../../utils/deviceDimensions';
export default StyleSheet.create({
    navtabs: {
        height: setHeight(5.78),
        top: -setHeight(1.875),
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    inactiveTab: {width: setHeight(3.125), height: setHeight(3.125)},
    activeTab: {width: setHeight(3.75), height: setHeight(3.75)},
    tabicon: {height: setHeight(3.75), justifyContent: 'center'}
})