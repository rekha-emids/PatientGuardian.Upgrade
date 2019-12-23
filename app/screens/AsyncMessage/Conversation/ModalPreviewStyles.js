import { StyleSheet } from 'react-native';
import { setValueBasedOnWidth } from '../../../utils/deviceDimensions';
export default StyleSheet.create({
    modalStyle: {
        alignSelf: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        flex: 1,
        flexDirection: 'column'
    },
    closeModalView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: setValueBasedOnWidth(20)
    },
    imageSize: {
        width: setValueBasedOnWidth(30),
        height: setValueBasedOnWidth(30)
    },
    sendButton: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#f1f1fb',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    previewImage: {
        height: "100%",
        width: "100%"
    }
})