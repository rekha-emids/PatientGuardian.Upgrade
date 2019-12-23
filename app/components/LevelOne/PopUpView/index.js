import React, { Component } from 'react'
import { View } from 'react-native'
import { CoreoText, CoreoImage } from '../../../components'
import Images from '../../../assets/images/index'
import styles from './styles'

class PopUpView extends Component {
    render() {
        return (
            <View style={styles.container}>
            <View style={styles.subContainer} >
                <CoreoImage style={styles.imgStyle} source={this.props.image ? this.props.image : Images.hmsa} />
                <CoreoText style={styles.textStyle}>This number identifies your HMSA membership and enable providers to determine your plan benefits.</CoreoText>
                
            </View>
            <View style={styles.arrowDown} />
            </View>
        );
        }
    }

export default PopUpView;