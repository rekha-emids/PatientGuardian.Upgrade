import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import styles from './styles';
import { CoreoText, Select } from '../../../components';
import ServiceRequestContainer from './ServiceRequestContainer';
import { DEFAULT_VALUE } from '../../../components/Base/Select/Select';
import { ALL } from '../../../constants/constants';
class ServiceRequests extends Component {

  constructor(props) {
    super(props);
    this.state = {
      monthlabel: ALL
    }
}
  changeData = (data) => {
    if(data !== DEFAULT_VALUE){
      this.setState({ monthlabel: data });
    }
  }
  render() {

    return (
      <View style={styles.container}>
        <View style={styles.upperRow}>
          <CoreoText style={styles.heading}>
              View Requests
          </CoreoText>
          <View style={styles.selectRequest}>
            <Select
              selectedValue={this.state.monthlabel}
              enabled = {this.props.network}
              mode="dropdown"
              onValueChange={(value) => { this.changeData(value) }}
              dataArray={[{ value: 0, label: 'All' },{ value: 35, label: 'Open' }, { value: 38, label: 'Hired' }]}
              style={styles.colorSelect}
              placeholder="Select Status"
            />
          </View>
        </View>
        <ServiceRequestContainer  createServiceRequest={this.props.createServiceRequest} serviceType={this.state.monthlabel} navigation={this.props.navigation}/>
      </View>
    );
  };

};

export default ServiceRequests;
