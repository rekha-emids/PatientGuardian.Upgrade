import { StyleSheet} from 'react-native';
import { setValueBasedOnWidth, setValueBasedOnHeight } from '../../utils/deviceDimensions';
const AsyncStyle = StyleSheet.create({
    wrapperView: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#66307f',
        paddingLeft: 15,
        paddingRight: 15,
        height: setValueBasedOnHeight(56)
    },
    headerContainerAdd: {
        flexDirection: 'column',
        backgroundColor: '#66307f'        
    },
    headerContainerTop: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#66307f',
        paddingLeft: 15,
        paddingRight: 15

    },
    headerContainerBtm: {
        backgroundColor: 'white',
       marginHorizontal: setValueBasedOnWidth(15),
       marginBottom: setValueBasedOnHeight(10)
    

    },
    headerLeftWrap: {
        maxWidth: 60,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    headerMidWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerRightWrap: {
        flex: 1,
        maxWidth: 70,
        
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    },
    HeaderTextSd: {
        fontSize: 20,
        color: '#fff',
        alignSelf: 'center'
    },
    HeaderTextLd: {
        alignSelf: 'center',
        fontSize: setValueBasedOnHeight(18),
        color: "white",
        fontWeight: '500',
        fontFamily: "OpenSans"
    },
    headerRightIcons: {
        width: setValueBasedOnWidth(18),
        height: setValueBasedOnWidth(18)
    },
    contentContainer: {
        flex: 8,
        display: 'flex',
        flexDirection: 'column'
        
    }
});

export default AsyncStyle;