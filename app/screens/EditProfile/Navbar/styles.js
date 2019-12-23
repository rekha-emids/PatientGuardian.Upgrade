import { StyleSheet, Platform } from 'react-native';
import { setValueBasedOnWidth, setValueBasedOnHeight, setFontSize, WIDTH } from '../../../utils/deviceDimensions';
export default StyleSheet.create({
   navBar: {
       height: setValueBasedOnHeight(56),
       width: WIDTH,
       flexDirection: "row",
       alignItems: "center",
       justifyContent: "space-between",
       ...Platform.select({
        android: {elevation: 5},
        ios: {
            shadowOffset: {height: 2},
            shadowOpacity: 1,
            shadowColor: "rgba(0, 0, 0, 0.12)"
        }
       })
   },
   arrow: {marginLeft: setValueBasedOnWidth(16)},
   title: {
        flex: 1.4,
        fontSize: setValueBasedOnHeight(18),
        color: "white",
        fontWeight: '500',
        fontFamily: "OpenSans",
        textAlign: "center",
        marginLeft: setValueBasedOnWidth(20)
   },
   updateIcon: {marginHorizontal: setValueBasedOnWidth(15)},
   icon: {
       height: setValueBasedOnHeight(56),
       justifyContent: 'center',
       marginHorizontal: setValueBasedOnWidth(15)
   },
   save: {
    fontSize: setFontSize(12),
    color: "white",
    fontFamily: "OpenSans"
}
})