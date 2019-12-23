import { StyleSheet } from 'react-native';
import { setValueBasedOnWidth, setValueBasedOnHeight, setFontSize } from '../../../utils/deviceDimensions';
export default StyleSheet.create({
    cardContainer: {
        paddingVertical: setValueBasedOnHeight(23),
        paddingLeft: setValueBasedOnWidth(15),
        paddingRight: setValueBasedOnWidth(17)
    },
   icon: {
       width: setValueBasedOnWidth(34),
       height: setValueBasedOnHeight(34),
       marginRight: setValueBasedOnWidth(9)
   },
   editIcon: {
    width: setValueBasedOnWidth(16),
    height: setValueBasedOnHeight(16)
   },
   certificationType: {
       fontSize: setFontSize(14),
       color: "#444444",
       fontFamily: "OpenSans",
       fontWeight: "bold",
       marginBottom: setValueBasedOnHeight(6)
   },
   certificationDescription: {
    fontSize: setFontSize(12),
    color: "#444444",
    fontFamily: "OpenSans"
   },
   certificateItem: {
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
   content: {flex: 1}
})