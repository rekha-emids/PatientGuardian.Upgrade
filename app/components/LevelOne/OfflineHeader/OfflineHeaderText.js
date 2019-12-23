import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import styles from './style';

class OfflineHeaderText extends PureComponent {
    render() {
        return (
         <View 
         style={styles.navBar}
         >
          <Text style = {styles.textStyle}>OFFLINE</Text>
        </View>
       );
    }
}

export default OfflineHeaderText;