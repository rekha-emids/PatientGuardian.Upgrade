import React, {Component} from 'react'
import {View} from 'react-native'
import {NeedingApprovalData} from '../../../../../data/FiltersData'
import styles from './styles'
import { CoreoText, CoreoCheckBox } from '../../../../../components';
import { THEME_PRIMARY_COLOR } from '../../../../../constants/theme';

class NeedingApproval extends Component{
    constructor(props) {
        super(props)
            this.state = {
                statusData: NeedingApprovalData
            }
    }

    onPress = (index) => {
        let data = this.state.statusData;
        data[index].status = !(data[index].status);
        this.props.updateNeedingApprovalData(data[index].id);
        this.setState({statusData: data});
    }

    render(){
        let statusList = this.state.statusData.map((item, index) => {
            let isTrue = this.props.needingApprovalData && (this.props.needingApprovalData.indexOf(item.id) > -1);
            return (
                <CoreoCheckBox
                    style={styles.checkboxRow}
                    checked={isTrue}
                    checkboxColor={THEME_PRIMARY_COLOR}
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
                <CoreoText style={styles.text}>Select the Approval Status</CoreoText>
                {statusList}
            </View>
        )
    }
}

export default NeedingApproval