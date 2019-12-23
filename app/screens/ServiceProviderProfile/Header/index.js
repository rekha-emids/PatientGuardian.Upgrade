import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CoreoImage} from '../../../components'
import styles from './styles'

export default class Header extends Component {
    render() {
        const {title, showIcon, icon, headerStyle, onPress} = this.props
        let iconComponent = null,
         onIconPress = onPress ? onPress : () => null

        if (showIcon){
            iconComponent = <TouchableOpacity onPress={onIconPress}><CoreoImage source={icon} style={styles.editIcon} /></TouchableOpacity>
        }
        return (
            <View style={[
styles.header,
headerStyle
]}>
                <Text style={[styles.heading]}>{title}</Text>
                {iconComponent}
            </View>
        )
    }
}
