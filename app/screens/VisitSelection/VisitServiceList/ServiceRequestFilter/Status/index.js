import React, {Component} from 'react'
import {View, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';
import {StatusData,CareTeamStatusData} from '../../../../../data/FiltersData'
import styles from './styles'
import { CoreoText, CoreoCheckBox } from '../../../../../components';
import {_} from '../../../../../utils/validations'
import { caseInsensitiveComparer } from '../../../../../utils/appUtils';
import { THEME_PRIMARY_COLOR } from '../../../../../constants/theme';
import { USER_TYPES } from '../../../../../constants/constants';

class Status extends Component{
    constructor(props) {
        super(props)
            this.state = {
                statusData: props.customStatusData || this.props.loggedInUser.userType === USER_TYPES.CARE_TEAM  ? CareTeamStatusData : StatusData
            }
    }

    onPress = (index) => {
        let data = this.state.statusData;
        if(this.props.customStatusData){
            data[index].status = !(data[index].status);
            this.props.statusData(data)   
        }
        else if(caseInsensitiveComparer(index,0) && caseInsensitiveComparer(data[0].id,0)){
            for (let i = 1; i < data.length; i++) {
                if(data[index].status){
                    data[i].status = false;
                } else {
                    data[i].status = true;
                }   
            }
            data[index].status = !(data[index].status);
            this.props.statusData(-1, data[index].status)
        } else {
            data[index].status = !(data[index].status);
            let temp = data[1].status; 
            let match =true;
            if(data.length > 2){
                for (let i = 2; i < data.length ; i++) {
                    if(data[i].status !== temp){
                        match = false;
                        break;
                    }  
                }
                if(match){
                    data[0].status = temp;
                }else{
                    data[0].status = false;
                }
            } else{
                data[0].status = !(data[index].status);
            }
            this.props.statusData(data[index].id);
        }
        this.setState({statusData: data});
    }

    render(){
       const {selectedStatus, data, customStatusData} = this.props
       const {statusData} = this.state
       let updatedData = data && customStatusData ? data : statusData
       let statusList = updatedData.map((item, index) => {
            return (
                <CoreoCheckBox
                    style={styles.checkboxRow}
                    checked={(customStatusData && item.status) || (selectedStatus && selectedStatus.indexOf(item.id) > -1)}
                    checkboxColor={THEME_PRIMARY_COLOR}
                    checkBoxStyle={styles.checkboxStyle}
                    textStyle={styles.statusTitle}
                    statusTextView={styles.statusTextView}
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

function mapStateToProps(state){
    const authState = state.authState
    return{
        loggedInUser: authState && authState.userState.userInfo
    }
}

export default connect(mapStateToProps)(Status);