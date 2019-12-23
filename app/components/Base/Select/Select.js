import React from 'react'
import { View, TouchableOpacity, Modal } from 'react-native';
import { CoreoText, CoreoScrollView } from '../../Base';
import styles from './styles';
import Icon from '../../Base/Icon';
import Icons from '../../../assets/Icons';
import { setFontSize } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';
import {_} from '../../../utils/validations'
import { CoreoImage } from '../Image';
import { profile_icon } from '../../../assets/images';
class Select extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selectedValue: !_.isNil(props.selectedValue) ? props.selectedValue : props.placeholder,
            isModalVisible: false
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.selectedValue !== nextProps.selectedValue){
            this.setState({selectedValue: nextProps.selectedValue})
        }
    }

    onChangePickerValue = (value) => {
        const {onValueChange} = this.props
        this.setState({selectedValue: value, isModalVisible: false})
        onValueChange && onValueChange(value)
    }

    changeModalState = () => {
        this.setState({isModalVisible: !this.state.isModalVisible})
        this.props.onPress && this.props.onPress()
    }

    render(){
        const {dataArray, placeholder} = this.props
        let selectedLabel = placeholder || ""
        let content = dataArray && dataArray.map((data, index) => {
            let showIcon = false
            let optionTextStyle = {}
            if(data.value === this.state.selectedValue){
                selectedLabel = data.label,
                showIcon = true
                optionTextStyle = {color: THEME_PRIMARY_COLOR}
            }
            return (
                <TouchableOpacity key={index} activeOpacity={1} onPress={() => this.onChangePickerValue(data.value)} style={[styles.option]}>
                    {!_.isNil(data.image) ? <CoreoImage source={data.image.length ? {uri: data.image} : profile_icon} style={styles.image} /> : null }
                    <CoreoText style={[styles.optionText, optionTextStyle]}>{data.label}</CoreoText>
                    {/* {showIcon && <Icon {...Icons.pickerDown} size={setFontSize(14)} color={THEME_PRIMARY_COLOR} />} */}
                </TouchableOpacity>
            )
        })
        let textColor = "#444444"
        if(this.props.selectedLabelColor){
            textColor = this.props.selectedLabelColor
        }
        return (
            <View style={this.props.pickerStyle}>
                <TouchableOpacity disabled={_.isNil(this.props.enabled) ? false : !this.props.enabled} onPress={this.changeModalState} style={styles.container}>
                    <CoreoText style={[styles.selectedValue,{color: textColor}]}>{selectedLabel}</CoreoText>
                    <Icon {...Icons.arrowDown} style={styles.icon} color={this.props.selectedLabelColor || "#444444"} size={setFontSize(14)} />
                </TouchableOpacity>
                <Modal transparent={true} visible={this.state.isModalVisible}>
                    <TouchableOpacity onPress={this.changeModalState} style={styles.pickerContianer}>
                        <View style={styles.contentContainerStyle}>
                            <CoreoScrollView bounces={false} showsVerticalScrollIndicator={false}  style={styles.content}>
                            {content}
                            </CoreoScrollView>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }
}

export default Select