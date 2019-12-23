import { StyleSheet, Platform } from 'react-native';
import { setValueBasedOnWidth, setValueBasedOnHeight, WIDTH, setFontSize } from '../../../utils/deviceDimensions';
export default StyleSheet.create({
   navBar: {
       height: setValueBasedOnHeight(60),
       width: WIDTH,
       flexDirection: "row",
       alignItems: "center",
       ...Platform.select({
        android: {elevation: 5},
        ios: {
            shadowOffset: {height: 2},
                shadowOpacity: 1,
            shadowColor: "rgba(0, 0, 0, 0.12)"
        }
       }),
       paddingLeft: setValueBasedOnWidth(16)
   },
   pic: {
       width: setValueBasedOnWidth(40),
       height: setValueBasedOnWidth(40),
       borderRadius: setValueBasedOnWidth(20),
       resizeMode: "cover"
   },
   iconStyle: {
        width: setValueBasedOnWidth(22),
        height: setValueBasedOnWidth(22),
        resizeMode: 'cover'
   },
   title: {
       flex: 2,
       fontSize: setValueBasedOnHeight(18),
       color: "white",
       fontWeight: '600',
       fontFamily: "OpenSans",
       textAlign: "center"
    },
   updateIcon: {marginHorizontal: setValueBasedOnWidth(15)},
   icon: {
       width: setValueBasedOnHeight(16),
       height: setValueBasedOnHeight(16),
       marginHorizontal: setValueBasedOnWidth(15)
   },
   text: {
       fontSize: setFontSize(14),
       color: "#ffffff",
       fontWeight: '600',
       fontFamily: "OpenSans"
   },
   cancelText: {
       fontSize: setFontSize(14),
       color: "#ffffff",
       marginRight: setValueBasedOnWidth(17)
   },
   empty: {
       width: setValueBasedOnWidth(25),
       height: setValueBasedOnHeight(25)
   }
})