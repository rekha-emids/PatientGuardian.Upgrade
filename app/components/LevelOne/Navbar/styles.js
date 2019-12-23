import { StyleSheet, Platform } from 'react-native';
import { setValueBasedOnWidth, setValueBasedOnHeight, WIDTH, setFontSize } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';
export default StyleSheet.create({
   navBar: {
       height: setValueBasedOnHeight(56),
       width: WIDTH,
       flexDirection: "row",
       alignItems: "center",
       ...Platform.select({
        android: {elevation: 5},
        ios: {
            shadowOffset: {height: 2},
           shadowOpacity: 1,
            shadowColor: "rgba(0, 0, 0, 0.12)"
        },
        flex: 1
       })
   },
   arrow: {marginLeft: setValueBasedOnWidth(16)},
   title: {
       flex: 1,
       fontSize: setValueBasedOnHeight(16),
       color: "white",
       fontWeight: '500',
       fontFamily: "OpenSans",
       textAlign: "center"
   },
   updateIcon: {marginHorizontal: setValueBasedOnWidth(15)},
   icon: {
       width: setValueBasedOnHeight(30),
       height: setValueBasedOnHeight(56),
       justifyContent: 'center',
       marginHorizontal: setValueBasedOnWidth(10),
       paddingLeft: setValueBasedOnWidth(5),
       paddingRight: setValueBasedOnWidth(5)
   },
   touchableArea: {
       width: setValueBasedOnHeight(30),
       height: setValueBasedOnHeight(56),
       justifyContent: 'center',
       marginHorizontal: setValueBasedOnWidth(15),
       alignItems: "center"
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
   check: {
       width: setValueBasedOnWidth(20),
       height: setValueBasedOnHeight(20)
   },
   saveText: {
    fontSize: setFontSize(12),
    color: "white",
    fontFamily: "OpenSans"
    },
    pullContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: setValueBasedOnHeight(7),
        marginBottom: setValueBasedOnHeight(5)
    },
    pullText: {
        fontSize: setFontSize(13),
        color: THEME_PRIMARY_COLOR,
        fontFamily: "OpenSans",
        marginLeft: setValueBasedOnWidth(7)

    }
})