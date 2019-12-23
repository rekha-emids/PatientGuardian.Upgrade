import { StyleSheet } from 'react-native';
import { setHeight, setWidth, setValueBasedOnHeight, setValueBasedOnWidth } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';

export default StyleSheet.create({
    modalcontainer: {
        backgroundColor: '#fff', 
        flex: 1
    },
    header: {
        justifyContent: 'center',
        height: setValueBasedOnHeight(56),
        backgroundColor: '#3b104f'
    },
    subheader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        marginLeft: setWidth(5.27),
        marginRight: setWidth(5.27)
    },
    justifyContent: {justifyContent: 'center'},
    textStyle: {
        fontSize: setHeight(2.81),
        color: '#FFF'
    },
    imagestyle: {
        color: '#FFF',
        width: setHeight(4),
        height: setHeight(4)
    },
    modalView: { 
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        paddingLeft: setWidth(5.27), 
        paddingRight: setWidth(5.27)
    },
    scrollView: {
        marginTop: 10, 
        marginBottom: 10
    },
    margintop: {marginTop: setHeight(3.12)},
    tandctitle: {
        fontSize: setHeight(2.5), 
        fontWeight: '600', 
        color: '#373737'
    },
    tandcdesc: {
        fontSize: setHeight(2.187), 
        color: '#5d5c5c',
        marginRight: setWidth(5.55)
    },
    listItems: {
        flexDirection: 'row', 
        justifyContent: 'flex-start'
    },
    circle: {
        backgroundColor: THEME_PRIMARY_COLOR, 
        height: setValueBasedOnWidth(5), 
        width: setValueBasedOnWidth(5), 
        borderRadius: setValueBasedOnWidth(2.5),
        marginTop: setValueBasedOnHeight(7)
    },
    marginLeft: {marginLeft: 10},
    button: {
        marginBottom: setHeight(2),
        justifyContent: 'center',
        backgroundColor: THEME_PRIMARY_COLOR,
        height: setHeight(7.97),
        borderRadius: setHeight(1.56),
        fontSize: setHeight(2.3)
    },
    common: {
        color: "#FFF",
        textAlign: 'center',
        fontSize: setHeight(2.3),
        fontWeight: '600'
    }
})