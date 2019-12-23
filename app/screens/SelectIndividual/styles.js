import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../utils/deviceDimensions';

export default StyleSheet.create({
    profileCardView: {
        justifyContent: "space-between",
        flexDirection: 'row',
        width: setValueBasedOnWidth(360),
        height: setValueBasedOnHeight(64),
        alignItems: 'center',
        paddingHorizontal: setValueBasedOnWidth(16),
        paddingVertical: setValueBasedOnWidth(16),
        backgroundColor: "#ffffff",
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1
    },
    profileContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileImageStyle: {
        width: setValueBasedOnWidth(40),
        height: setValueBasedOnWidth(40),
        borderRadius: setValueBasedOnWidth(20),
        marginTop: setValueBasedOnWidth(14),
        marginBottom: setValueBasedOnWidth(14),
        marginRight: setValueBasedOnWidth(16),
        resizeMode: "cover"
    },
    profileTextStyle: {
        fontWeight: '600',
        fontSize: setFontSize(16)
    },
    iconStyle: {
        width: setValueBasedOnWidth(26),
        height: setValueBasedOnWidth(26),
        marginLeft: setValueBasedOnWidth(16),
        marginRight: setValueBasedOnWidth(16),
        borderRadius: setValueBasedOnWidth(13),
        resizeMode: 'cover'
    }
  
})