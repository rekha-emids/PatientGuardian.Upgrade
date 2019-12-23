import React, {Component} from 'react'
import {View, TouchableOpacity} from 'react-native'
import {ServiceStatus, ServiceStatusNew} from '../../../../../data/FiltersData'
import styles from './styles'
import { CoreoText, CoreoCheckBox } from '../../../../../components';
import {_} from '../../../../../utils/validations'
import {connect} from 'react-redux'
import { THEME_PRIMARY_COLOR } from '../../../../../constants/theme';

class ServiceStatusFilter extends Component{
    constructor(props) {
        super(props)
            this.state = {
                selectedStatusList: [],
                statusData: ServiceStatusNew
            }
    }

    componentWillReceiveProps(nextprops){
        if(this.props.reset !== nextprops.reset){
            this.setState({
                statusData:ServiceStatusNew
            })
        }
    }

    onPress = (index) => {
        let data = []
        data = this.props.serviceStatusArray.map((statusData, iter) => {
            if(iter === index){
                return {
                    ...statusData,
                    status: !statusData.status
                }
            }
            return statusData
        });
        this.props.statusData(data, index);
    }

    render(){
       let statusList = this.props.serviceStatusArray && this.props.serviceStatusArray.map((item, index) => {
            return (
                <CoreoCheckBox
                    style={styles.checkboxRow}
                    checked={item.status}
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
                <CoreoText style={styles.text}>Select the Status of Requests</CoreoText>
                {statusList}
            </View>
        )
    }
}


export default connect (null,null) (ServiceStatusFilter)