import React from 'react'
import {View, TouchableOpacity, Platform, ToastAndroid} from 'react-native'
import {CoreoImage} from '../../Base/Image/index'
import ImagePicker from 'react-native-image-crop-picker'
import styles from './styles'
import { setValueBasedOnWidth} from '../../../utils/deviceDimensions'
import images from '../../../assets/images';
import { MAX_PROFILE_PIC_SIZE_IN_MB } from '../../../constants/constants';

const Byte = 0.000001

class CoreoImagePicker extends React.Component{

    onPress = () => {
        const {onChange, input} = this.props
        ImagePicker.openPicker({
            width: setValueBasedOnWidth(106),
            height: setValueBasedOnWidth(106),
            borderRadius: setValueBasedOnWidth(53),
            cropping: true,
            includeBase64: true,
            mediaType: "photo"
          }).then(image => {
            if(image.size*Byte >= MAX_PROFILE_PIC_SIZE_IN_MB){
                alert(`Please insert image less than ${MAX_PROFILE_PIC_SIZE_IN_MB}MB`)
            }
            else{
                let prefix = "data:image/jpeg;base64,"
                onChange && onChange(prefix +image.data)
                input && input.onChange && input.onChange(prefix + image.data)
            }
          });
    }

    render(){
        const {pic, containerStyle} = this.props
        return (
            <View style={[styles.container, containerStyle]}>
                <CoreoImage source={pic} style={styles.image} />
                <TouchableOpacity style={styles.circularButton} onPress={this.onPress}>
                    <CoreoImage source={images.edit} style={styles.icon} />
                </TouchableOpacity>
            </View>
        )
    }
}

export default CoreoImagePicker
