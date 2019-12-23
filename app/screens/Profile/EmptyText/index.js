import React from 'react'
import {Text, TouchableOpacity} from 'react-native'
import styles from './styles';
import { CoreoImage } from '../../../components';
import { NoData } from '../../../assets/images/Dashboard';

class EmptyMsgText extends React.Component {
    render(){
        const {onPress, text, style, icon} = this.props

        return (
            <TouchableOpacity onPress={onPress} style={[
styles.container,
style
]}>
            <CoreoImage style={styles.image} source={NoData} />
            <Text style={styles.text}>Click + to add {text}</Text>
            </TouchableOpacity>
        )
    }
}
export default EmptyMsgText