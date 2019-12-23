import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth } from '../../../../../utils/deviceDimensions';

const styles = StyleSheet.create({
    cardView: {
        backgroundColor: "#ffffff",
        height: setValueBasedOnHeight(82),
        marginLeft: setValueBasedOnHeight(15),
        marginRight: setValueBasedOnHeight(15),
        marginTop: setValueBasedOnHeight(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 1
    },
    cardLeftView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    center: {
        width: setValueBasedOnHeight(40),
        height: setValueBasedOnHeight(50)
    },
    cardTitle: {
        height: setValueBasedOnHeight(50),
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    arrow: {
        justifyContent: 'center',
        marginRight: setValueBasedOnWidth(15)
    },
    title: {
        fontSize: setValueBasedOnHeight(14),
        color: '#444444'

    },
    subTitle: {
        fontSize: setValueBasedOnHeight(14),
        color: '#8c8c8c'
    },
    count: {
        fontSize: setValueBasedOnHeight(18),
        color: '#444444',
        fontWeight: '600'
    },
    countWrap: {
        flexDirection: 'row',
        alignItems: 'center'
    }
    
});  

export default styles;