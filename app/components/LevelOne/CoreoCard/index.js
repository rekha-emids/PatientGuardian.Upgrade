import React, {Component} from 'react'
import {View} from 'react-native'
import styles from './styles'

class CoreoCard extends Component{
    render(){
        const {style, children} = this.props

        return (
            <View style={[
styles.container,
style
]}>
                {children}
            </View>
        )
    }
}

export default CoreoCard