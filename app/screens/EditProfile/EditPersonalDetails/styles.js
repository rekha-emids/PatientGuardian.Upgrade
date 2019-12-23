import { StyleSheet } from 'react-native';
import { setValueBasedOnWidth, setFontSize, setValueBasedOnHeight } from '../../../utils/deviceDimensions';

export default StyleSheet.create({
    container: {marginHorizontal: setValueBasedOnWidth(20)},
    containerStyle: {backgroundColor: "white"},
    contentStyle: {flex: 1},
    heading: {
        fontSize: setFontSize(20),
        color: "#444444",
        fontFamily: "OpenSans",
        marginVertical: setValueBasedOnHeight(12)
    },
    fieldsContainer: {},
    imagePickerStyle: {
        alignSelf: "center",
        marginTop: setValueBasedOnHeight(8),
        marginBottom: setValueBasedOnHeight(27) 
    },
    checkBox: {
        marginBottom: setValueBasedOnHeight(4)
    },
    fieldsWrapper: {
        marginBottom: setValueBasedOnHeight(26)
    },
    descriptionStyle:{ height: setValueBasedOnHeight(100), textAlignVertical: 'top', },
    descriptionWrapper:{ textAlignVertical: 'top', }

})
