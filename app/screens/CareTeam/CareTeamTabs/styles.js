import { StyleSheet } from 'react-native';
import { setValueBasedOnWidth, setFontSize, setValueBasedOnHeight } from '../../../utils/deviceDimensions';

const styles = StyleSheet.create({
    labelStyle: {
        fontSize: setFontSize(10),
        fontFamily: "OpenSans",
        textAlign: "center"
    },
    tabBarStyle: {height: setValueBasedOnHeight(59)},
    tabIcon: {
        width: setValueBasedOnWidth(24),
        height: setValueBasedOnHeight(24)
    },
    tabStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    }
});  

export default styles;