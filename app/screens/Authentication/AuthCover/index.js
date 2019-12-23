import React, { Component } from 'react';
import {
    View,
    ImageBackground
  } from 'react-native';
import { ScreenCover } from "../../../components";
import {landing} from '../../../assets/images';
import styles from './styles';

class AuthCover extends Component {
    render() {
        return (
            <ScreenCover isLoading={this.props.isLoading} showHeader={false}>
                <ImageBackground
                    source={landing}
                    style={styles.backgroundimage}
                >
                    <View style={styles.container}>
                        {this.props.children}
                    </View>
                </ImageBackground>
            </ScreenCover>
        );
    }
}

export default AuthCover;