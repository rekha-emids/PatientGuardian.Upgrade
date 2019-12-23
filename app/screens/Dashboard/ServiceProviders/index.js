import React, { Component } from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import { CoreoText } from '../../../components';
import ServiceProvideContainer from './ServiceProvideContainer';
import { connect } from 'react-redux'
import { SERVICE_PROVIDERS } from '../../HomeTabs';
import { SERVICEPROVIDERS_REQUESTS } from '../../ServiceProvidersTab';

class ServiceProviders extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedValue: { label: 'Favorites', value: 'favorite' },
      showall: false
    }
  }
  btnOnPress = () => {
    this.props.navigation && this.props.navigation.navigate(SERVICE_PROVIDERS)
    this.props.navigation && this.props.navigation.navigate(SERVICEPROVIDERS_REQUESTS)
}

  render() {
    return (
      <View>
        <View style={styles.container}>
          <View>
            <CoreoText style={styles.heading}>
              Service Providers
          </CoreoText>
          </View>
          <TouchableOpacity onPress={this.btnOnPress} disabled = {!this.props.network}>
            <CoreoText style={styles.headingViewALL} >
              View all
          </CoreoText>
          </TouchableOpacity>
        </View>
        <ServiceProvideContainer navigation={this.props.navigation}/>

      </View>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {
  }
}


function mapStateToProps(state) {
  return {
    serviceProvider: state.dashboardState && state.dashboardState.dashboardState.serviceProvider,
    network: state.networkReducer && state.networkReducer.network
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceProviders);