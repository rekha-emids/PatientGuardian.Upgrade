import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../utils/deviceDimensions';
export default StyleSheet.create({
    cardContainer: {
        paddingVertical: setValueBasedOnHeight(23),
        paddingHorizontal: setValueBasedOnWidth(15)
    },
    content: {flex: 1},
   icon: {
       width: setValueBasedOnWidth(34),
       height: setValueBasedOnHeight(34),
       marginRight: setValueBasedOnWidth(9)
   },
   universityName: {
       fontSize: setFontSize(14),
       color: "#444444",
       fontFamily: "OpenSans",
       fontWeight: "bold"
   },
   universityDetails: {
    fontSize: setFontSize(12),
    color: "#444444",
    fontFamily: "OpenSans"
   },
   listItem: {
       flexDirection: "row",
       marginBottom: setValueBasedOnHeight(22)
   },
   divider: {
       height: setValueBasedOnHeight(1),
       flex: 1,
       backgroundColor: "#d8d8d8",
       marginBottom: setValueBasedOnHeight(22),
       marginLeft: setValueBasedOnWidth(43)
   },
   date: {
       fontSize: setFontSize(12),
       fontFamily: "OpenSans",
       color: "#444444",
       fontWeight: "bold"
   },
   editIcon: {
       width: setValueBasedOnWidth(16),
       height: setValueBasedOnHeight(16)
   }
})