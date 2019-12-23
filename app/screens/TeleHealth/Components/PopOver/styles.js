import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    
        container: {
            flex: 1,
            alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'flex-start' 
        },
        image: {
            height: 26,
            width: 26,
            zIndex: 1, 
            // marginTop: 17, 
            // marginRight: 15,
            marginLeft: 15
        },
        allItemContainer: {
            borderRadius: 0,
            backgroundColor: 'white',
            alignSelf: 'auto',
           // height: 94,
            width: 170,
            
            overflow: 'hidden',
            marginRight: 25
        },
        labelContainerStyle: {
            flex: 1, 
            marginLeft: 15, 
            fontSize: 17, 
            opacity: 0.87, 
            marginBottom: 5
        },
        triangle: {
            width: 0, 
            height: 0
        }
     
});