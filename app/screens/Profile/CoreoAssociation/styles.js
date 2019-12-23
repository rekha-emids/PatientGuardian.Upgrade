import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../utils/deviceDimensions';
import {THEME_PRIMARY_COLOR} from '../../../constants/theme'
export default StyleSheet.create({
    cardContainer: {
        paddingVertical: setValueBasedOnHeight(23),
        paddingLeft: setValueBasedOnWidth(15),
        paddingRight: setValueBasedOnWidth(17),
        backgroundColor: "#ffffff"
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: setValueBasedOnHeight(18)
    },
    skillItemsList: {
        flexDirection: 'column',
        padding: setValueBasedOnWidth(3),
        flexWrap: 'wrap'
    },
    heading: {
        fontSize: setFontSize(16),
        fontWeight: "600",
        color: THEME_PRIMARY_COLOR,
        fontFamily: "OpenSans"
    },
    descriptionHeader: {
        color: "black",
        fontSize: setFontSize(16),
        fontFamily: "OpenSans",
        fontWeight: '600'
   },
    description: {
            color: "#444444",
            fontSize: setFontSize(14),
            fontFamily: "OpenSans",
            marginBottom: setValueBasedOnHeight(26)
        }
})