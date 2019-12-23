import { StyleSheet } from 'react-native';
import {setValueBasedOnWidth} from '../../../utils/deviceDimensions'

export default StyleSheet.create({
    
        container: {
            flex: 1,
            alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginRight: setValueBasedOnWidth(10)

        },
        image: {
            height: 26,
            width: 26,
            zIndex: 1, 
            marginTop: 17, 
            marginRight: 15
        },
        allItemContainer: {
            borderRadius: 0,
            backgroundColor: 'white',
            alignSelf: 'auto',
            height: 94,
            width: 170,
            overflow: 'hidden',
            marginRight: 25
        },
        labelContainerStyle: {
            flex: 1, 
            marginLeft: 5,  
            opacity: 0.87, 
            marginBottom: 5
        },
        triangle: {
            width: 0, 
            height: 0
        },
        dot: {
            height: setValueBasedOnWidth(4),
            width: setValueBasedOnWidth(4),
            backgroundColor: '#8c8c8c',
            marginBottom: setValueBasedOnWidth(2),
            borderRadius: setValueBasedOnWidth(2)
        },
        borderRadius: { borderRadius: 0 },
        paddingRight: {paddingRight: setValueBasedOnWidth(1.8)},
        paddingHorizontal: {paddingHorizontal: setValueBasedOnWidth(0)}
});
