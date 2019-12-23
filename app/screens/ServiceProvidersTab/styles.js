import { StyleSheet, Platform } from 'react-native';
import { setFontSize, setValueBasedOnHeight, setValueBasedOnWidth } from '../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../constants/theme';

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: "white",
        ...Platform.select({
            android: {height: setValueBasedOnHeight(53)},
            ios: {height: setValueBasedOnHeight(30)}
        })
        
    },
    activeTabStyle: {
        borderBottomWidth: setValueBasedOnWidth(1),
        borderColor: THEME_PRIMARY_COLOR
        
    },
    indicatorStyle: {backgroundColor: THEME_PRIMARY_COLOR},
    labelStyle: {
        fontSize: setFontSize(14),
        ...Platform.select({
            ios: {
                padding: 0,
                margin: 0
            }
        })      
    }
});  

export default styles;