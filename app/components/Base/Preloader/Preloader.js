import React, { Component } from 'react';
import {
    View,
    ActivityIndicator
} from 'react-native'
import styles from './styles'
import {THEME_PRIMARY_COLOR} from '../../../constants/theme'


export const Spinner = () => 
    <View style={styles.spinnerView}>
        <ActivityIndicator size="large" color={THEME_PRIMARY_COLOR} />
    </View>
    

export const CoreoActiveIndicator = (props) => <View style={[
styles.container,
props.style
]}>
            <ActivityIndicator size="large" color={THEME_PRIMARY_COLOR} />
        </View>
    

export const OverlayLoaderWrapper = (props) => <View style={[
styles.container,
props.style
]}>
            {props.children}
            {props.isLoading ? <CoreoActiveIndicator style={[
styles.customLoader,
props.loaderStyle
]} /> : null}
        </View>
    

class Preloader extends Component {
    render() {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={THEME_PRIMARY_COLOR} />
            </View>
        );
    }
}

export default Preloader;
