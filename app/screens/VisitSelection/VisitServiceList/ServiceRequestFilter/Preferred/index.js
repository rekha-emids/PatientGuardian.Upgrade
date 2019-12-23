import React, {Component} from 'react'
import {View} from 'react-native'
import {PreferredData} from '../../../../../data/FiltersData'
import styles from './styles'
import { CoreoText, CoreoCheckBox } from '../../../../../components';

class Preferred extends Component{
    constructor(props) {
        super(props)
            this.state = {
                preferredData: PreferredData
            }
    }

    onPress = (index) => {
        let data = this.state.preferredData;
        this.props.updatePreferredData(data[index].id);
    }

    render(){
        let statusList = this.state.preferredData.map((item, index) => {
            let isTrue = this.props.preferredData && (this.props.preferredData.indexOf(item.id) > -1);
            return (
                <CoreoCheckBox
                    style={styles.checkboxRow}
                    checked={isTrue}
                    checkBoxStyle={styles.checkboxRadius}
                    textStyle={styles.statusTitle}
                    onPress={() => this.onPress(index)}
                >
                    {item.statusTitle}
                </CoreoCheckBox>
            )
        })
        return (
            <View style={styles.statusView}>
                <CoreoText style={styles.text}>Select the Preferred Status</CoreoText>
                {statusList}
            </View>
        )
    }
}

export default Preferred