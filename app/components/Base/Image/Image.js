import React from 'react';
import {Image, View} from 'react-native'
import _ from 'lodash'
import images from '../../../assets/images';

export const CoreoProfileImage = (props) => <CoreoImage source={props.pic || images.profile_icon} style={props.style} />
    

class CoreoImage extends React.Component{
    render() {
        const {resizeMode, style, source, ...other} = this.props
        let RenderComponent = View;

        if (!_.isNil(source)) {
            RenderComponent = Image;
        }
        return <RenderComponent resizeMode={resizeMode} style={style}
        source={source} {...other} />
    }
}

CoreoImage.defaultProps = {
    resizeMode: "contain",
    style: {}
}


CoreoImage.resizeMode = {
    contain: "contain",
    cover: "cover",
    stretch: "stretch"
}

export default CoreoImage;