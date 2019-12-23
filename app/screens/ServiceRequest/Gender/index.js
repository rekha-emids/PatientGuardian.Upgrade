import React, {Component} from 'react'
import {View, TouchableOpacity} from 'react-native'
import { CoreoText } from '../../../components';
import styles from './styles';
import { PREFERENCE_ID, OTHERS, NO_PREFERENCE } from '../../../constants/constants';

class Gender extends Component{
    render(){
       let genders = this.props.genderType && this.props.genderType.map((gender, index) => <View style={styles.serciceAreaItem} key={index}>
                    <TouchableOpacity
                            onPress={() => this.props.onSelectGender(gender.id)}
                            style={styles.radioBox}
                        >
                    {this.props.selectedGenderKey === gender.id

                            ? <View style={styles.areaSelected}>
                                <View style={styles.selected}/>
                            </View>
                         : <View style={styles.areaNotSelected}/>
                    }
                    <View style={styles.dataView}>
                        <CoreoText style={styles.text}>{Number(gender.id) === PREFERENCE_ID || gender.name === OTHERS ? NO_PREFERENCE : gender.name}</CoreoText>
                    </View>
                    </TouchableOpacity>
                </View>)

        return (
            <View>
                <View style={styles.areaMarginTop}> 
                    {genders}
                </View>
            </View>
        )
    }
}

export default Gender
