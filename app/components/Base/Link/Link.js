import React, { Component } from 'react';
import {
    Text
} from 'react-native';
import styles from './styles';

class Link extends Component {
    render() {
        const {onPress, children, style, ...others} = this.props

        return (
            <Text
                style={[
styles.color,
style
]}
                onPress={onPress}
                {...others}
            >
                    {children}
            </Text>
        );
    }
}

export default Link;