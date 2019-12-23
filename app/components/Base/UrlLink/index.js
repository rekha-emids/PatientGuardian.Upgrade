import React, { PureComponent } from 'react';
import {
    Text,Linking
} from 'react-native';
import styles from './styles';

class UrlLink extends PureComponent {
    handleUrlClick =(url)=>{
        if(url && !url.trim().startsWith('http://') || !url.trim().startsWith('https://')){
            url = "http://" +url
        }
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            } 
          });
    }

    render() {
        const {style, children,url,...other} = this.props
        return(
            <Text
                style={[styles.color,style]}
                onPress={()=>{this.handleUrlClick(url)}}
                {...other}
            >
                    {children}
            </Text>
        );
    }
}

export default UrlLink;