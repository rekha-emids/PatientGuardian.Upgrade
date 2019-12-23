import React, {Component} from 'react'
import {View, TouchableOpacity} from 'react-native'
import styles from './styles'
class RadioButton extends Component {
    render(){
        const {isSelected, onPress} = this.props

        if (isSelected){
            return (
                <TouchableOpacity
                onPress={onPress}
                style={styles.container}
            >
                <View style={styles.areaSelected}>
                    <View style={styles.selected}/>
                </View>
                </TouchableOpacity>
            )
        }
        return (
            <TouchableOpacity
                onPress={onPress}
                style={styles.container}
            > 
                <View style={styles.areaNotSelected}/>
            </TouchableOpacity>
        )
    }
}

export default RadioButton