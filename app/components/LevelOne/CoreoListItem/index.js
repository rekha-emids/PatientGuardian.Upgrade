import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { CoreoText, CoreoImage } from '../../../components'
import Images from '../../../assets/images/index'
import styles from './styles'

class CoreoListItem extends Component {
    render() {
        return (
            <View style={styles.listItem}>
                <TouchableOpacity style={ styles.container}
                onPress={this.props.onPress}
                disabled={this.props.disabled ? this.props.disabled : false}>

                   {this.props.icon
                   ? <CoreoImage style = {[
styles.listItemIcon,
this.props.iconStyle
]} source={this.props.icon} />
                : <View style={styles.listItemIcon} />}        
                    
                    <CoreoText
                        style={styles.textStyle}
                    >
                        {this.props.text}
                        
                    </CoreoText>

                    {this.props.showSelected &&
                        <CoreoImage
                            style={styles.listItemIcon}
                            source={Images.check}
                            resizeMode="contain"
                        />
                    }
                    
                </TouchableOpacity>
            </View>
        )
    }
}

export default CoreoListItem
