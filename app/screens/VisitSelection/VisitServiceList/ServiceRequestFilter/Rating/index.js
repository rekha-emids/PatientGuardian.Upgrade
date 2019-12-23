import React, {Component} from 'react'
import {TouchableOpacity, View, Platform} from 'react-native'

import styles from './styles'
import { CoreoText } from '../../../../../components';
import Icons from '../../../../../assets/images/Icons';
import { setFontSize } from '../../../../../utils/deviceDimensions';
import Icon from '../../../../../components/Base/Icon';

class Rating extends Component {

    rating = () => {
        const {rating, onSelectRating} = this.props
            let starsCount = 6;
            let stars = []
            let selectedStar = Platform.OS === "ios" ? Icons.starIos : Icons.starAndroid
            let starOutline = Platform.OS === "ios" ? Icons.starAndroidOutling : Icons.starIosOutline
            for(let index = 1; index < starsCount; index++){
                if(index <= rating)
                {
                    stars.push(
                    <TouchableOpacity style={styles.margin} onPress={ () => {onSelectRating(index)}}>
                        <Icon {...selectedStar} color="#ffe623" size={setFontSize(24)} />
                    </TouchableOpacity>
                )
                }else{
                    stars.push(
                    <TouchableOpacity style={styles.margin} onPress={ () => {onSelectRating(index)}}>
                         <Icon {...starOutline} color="#ffe623" size={setFontSize(24)} /> 
                    </TouchableOpacity>)
                }
            }
            return (
                <View style={styles.stars}>
                    {stars}
                </View>
            )
    }
    render() {
        return (
            <View style={styles.container}>
                <CoreoText style={styles.title}>Select minimum Rating</CoreoText>
                {this.rating()}
            </View>
        )
    }
}
export default Rating