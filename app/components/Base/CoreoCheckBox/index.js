import React from 'react'
import {View, Platform, TouchableOpacity, Text} from 'react-native'
import Icon from '../../Base/Icon/index'
import {setFontSize} from '../../../utils/deviceDimensions'
import Icons from '../../../assets/images/Icons';
import _ from 'lodash'
import styles from './styles'

class CoreoCheckBox extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            isSelected: props.isSelected
        }
    }

    onClickCheckbox = () => {
        const {onChange, disable} = this.props;
        if(!_.isNil(disable) && disable){
            return null
        }
        this.setState({isSelected: !this.props.isSelected}, () => {
            onChange && onChange(this.state.isSelected)
        })
    }

    render (){
        let icon = Icons.checkboxAndroid
        if(Platform.OS === "ios"){
            icon = Icons.checkboxIos
        }
        const {text, textStyle, disable, style, isSelected} = this.props
        let disableStyle = {}
        if(disable){
            disableStyle = styles.disableStyle
        }
        let iconComponent = <View style={[styles.emptyCheckBox]} />
        if(isSelected)
        {
            iconComponent = <Icon {...icon} size={setFontSize(18)} />
        }
        return (
            <TouchableOpacity style={[styles.container, style, disableStyle]} onPress={this.onClickCheckbox}>
                <View style={[styles.checkBoxContainer]}>
                    {iconComponent}
                </View>
                <Text style={[styles.text, textStyle]}>{text}</Text>
            </TouchableOpacity>
        )
    }
}

export default CoreoCheckBox