import { StyleSheet } from 'react-native';
import { setValueBasedOnWidth, setFontSize, setValueBasedOnHeight, setHeight } from '../../../utils/deviceDimensions';
import { WHITE } from '../../../constants/theme';

export default StyleSheet.create({
    contentContainer: {backgroundColor: WHITE},
    container: {marginHorizontal: setValueBasedOnHeight(20)},
    containerStyle: {backgroundColor: 'white'},
    heading: {
        fontSize: setFontSize(20),
        color: "#444444",
        fontFamily: "OpenSans",
        marginVertical: setValueBasedOnHeight(12)
    },
    fieldsContainer: {
        paddingBottom: setValueBasedOnHeight(200),
        marginBottom: setValueBasedOnHeight(100),
        marginHorizontal: setValueBasedOnWidth(15)
    },
    buttonText: {
        fontSize: setFontSize(13.3),
        color: "#c04e59",
        fontFamily: "OpenSans",
        marginTop: setValueBasedOnHeight(177),
        backgroundColor: '#f9f9f9'
    },
  
    imagePickerStyle: {
        alignSelf: "center",
        marginTop: setValueBasedOnHeight(8),
        marginBottom: setValueBasedOnHeight(27)
    },
    checkBox: {marginBottom: setValueBasedOnHeight(4)},
    deleteButtonContainer: {
        backgroundColor: "#ffffff",
        borderColor: "rgba(0,0,0,0.12)",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: setValueBasedOnHeight(10)
    },
    buttonText: {
        fontSize: setFontSize(12),
        color: "#c04e59",
        fontFamily: "OpenSans"

    },
    fieldWrapper: {marginBottom: setValueBasedOnHeight(26)},
    message: {fontSize: setHeight(3)}
})