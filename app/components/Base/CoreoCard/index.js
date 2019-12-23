import React from 'react'
import {View} from 'react-native'
import styles from './styles'

class CoreoCard extends React.Component{
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