import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../utils/deviceDimensions'

const OfflineStyle = StyleSheet.create({
    wrapperView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    mainComponent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    offlineImage: {alignSelf: 'center'},
    internetText: {
        fontWeight: 'bold',
        fontSize: setFontSize(14),
        marginBottom: setValueBasedOnHeight(10),
        marginTop: setValueBasedOnHeight(5),
        textAlign: 'center',
        marginLeft: setValueBasedOnWidth(25),
        marginRight: setValueBasedOnWidth(25)
    },

    guideText: {
        fontSize: setFontSize(12),
        textAlign: 'center',
        marginBottom: setValueBasedOnHeight(40),
        marginLeft: setValueBasedOnWidth(22),
        marginRight: setValueBasedOnWidth(22)
    },
    btnStyle: {
        backgroundColor: '#9a20b2',
        borderRadius: 5,
        alignSelf: 'center'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 12
    }
})

export default OfflineStyle;