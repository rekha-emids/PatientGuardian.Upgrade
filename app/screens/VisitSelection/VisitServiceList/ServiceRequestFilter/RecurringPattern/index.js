import React, {Component} from 'react'
import {View, TouchableOpacity} from 'react-native'
import styles from './styles';
import { CoreoText } from '../../../../../components';
import {RECURRING_PATTERN } from '../../../../../constants/constants';


class RecurringPattern extends Component{

   
    render(){
        const {selectedPattern, onChangeSelectedPattern} = this.props
       let patterns = RECURRING_PATTERN.map((pattern, index) => {
           let isSelected = selectedPattern === pattern.id 

            return (
                <TouchableOpacity onPress={() => onChangeSelectedPattern(pattern.id)} style={[
styles.serciceAreaItem,
isSelected ? styles.selectedItem : {}
]} key={index}>
                    {isSelected
                            ? <View style={styles.areaSelected}>
                                <View style={styles.selected}/>
                            </View>
                         : <View style={styles.areaNotSelected}/>
                    }
                    <View style={styles.dataView}>
                        <CoreoText style={styles.text}>{pattern.name}</CoreoText>
                    </View>
                    
                </TouchableOpacity>
            )
        })

        return (
            <View style={styles.container}>
                <CoreoText style={styles.title}>Select Schedule Type</CoreoText>
                <View style={styles.areaMarginTop}>
                    {patterns}
                </View>
            </View>
        )
    }
}


export default RecurringPattern