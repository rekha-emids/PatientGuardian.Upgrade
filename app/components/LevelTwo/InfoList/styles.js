import { StyleSheet } from 'react-native';
import { setHeight } from '../../../utils/deviceDimensions';
export default StyleSheet.create({
    container: {
        padding: setHeight(2.03),
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#d3d3d3',
        borderRadius: setHeight(1.25)
    },
    name: {
        fontSize: setHeight(2.5),
        fontWeight: '600',
        color: '#373737'
    },
    selected: {
        alignSelf: 'center',
        height: setHeight(2.5),
        width: setHeight(2.5)
    },
    data: {
        marginTop: setHeight(1.56),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    membername: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    marginitem: {marginTop: setHeight(1.4)},
    textstyle: {
        color: '#373737',
        fontSize: setHeight(2.5)
    }
})