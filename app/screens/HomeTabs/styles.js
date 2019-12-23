import { StyleSheet, Platform } from 'react-native';
import { setValueBasedOnWidth, setFontSize, setValueBasedOnHeight } from '../../utils/deviceDimensions';

const styles = StyleSheet.create({
    labelStyle: {
        fontSize: setFontSize(10),
        fontFamily: "OpenSans",
        flexWrap: "wrap",
        textAlign: "center",
        ...Platform.select({android: {paddingBottom: setValueBasedOnHeight(5)}})
    },
    tabBarStyle: {height: setValueBasedOnHeight(50)},
    tabIcon: {
        ...Platform.select({
            android: {
                width: setValueBasedOnWidth(20),
                height: setValueBasedOnHeight(20)
            },
            ios: {
                width: setValueBasedOnWidth(24),
                height: setValueBasedOnHeight(24)
            }
        })
    },
    tabStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    countText: {
        fontSize: setFontSize(8),
        textAlign: 'center',
        color: '#ffffff'
    },
    countView: {
        backgroundColor: 'red',
        marginLeft: setValueBasedOnWidth(15),
        marginTop: setValueBasedOnHeight(-1),
        height: setValueBasedOnHeight(16),
        width: setValueBasedOnHeight(16),
        borderRadius: setValueBasedOnHeight(8),
        alignItems: 'center',
        justifyContent: 'center'
    }
});  

export default styles;