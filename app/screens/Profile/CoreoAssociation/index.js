import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import Header from '../Header'
import {getCoreoAssociation} from '../../../redux/profile/CoreoAssociation/actions'
import _ from 'lodash';
import styles from './styles'

class CoreoAssociation extends Component {
    componentDidMount() {
        this.props.getCoreoAssociation();
    }

  render() {
    const { attributeProvider, cohorts, memberId, memberships, mpi, planName } = this.props.coreoAssociation || {}

    
    return (
        <View style={styles.cardContainer}>
            <Header title="Coreo Association"/>
            <View style={styles.skillItemsList}>
            <View>
            <Text style={styles.descriptionHeader}>Coreo MPI</Text>
            <Text style={styles.description}>{mpi}</Text> 
            </View>
            <View>
            <Text style={styles.descriptionHeader}>Attributed Provider</Text> 
            <Text style={styles.description}>{attributeProvider}</Text>
            </View>
            <View>
            <Text style={styles.descriptionHeader}>Cohorts</Text> 
            <Text style={styles.description}>{cohorts && cohorts.length > 0 ? cohorts.map((cohorts, index) => `${(index > 0 ? ', ' : '') + (cohorts.cohortName ? cohorts.cohortName : '')} ${cohorts.acronym !== '(  )' ? `(${cohorts.acronym})` : '( )'}${cohorts.riskIndicatorName ? ` - ${cohorts.riskIndicatorName}` : ''}`) : "None found"}</Text>
              </View>
              <View>
            <Text style={styles.descriptionHeader}>Contract</Text> 
            <Text style={styles.description}>{memberships && memberships.length > 0 ? memberships.map((contract) => contract.membershipName) : "None found" }</Text>
                </View>
                <View>
            <Text style={styles.descriptionHeader}>Employer Name</Text> 
            <Text style={styles.description}>{"None found"}</Text>
            {planName && <Text style={styles.descriptionHeader}>Plan Name</Text> }
            {planName && <Text style={styles.description}>{planName}</Text>}
            </View>
            </View>
    </View>
);
  }
}

function mapDispatchToProps (dispatch) {
    return {getCoreoAssociation: () => dispatch(getCoreoAssociation())}
  }
  
  function mapStateToProps (state, props) {
      return {coreoAssociation: state.profileState && state.profileState.CoreoAssociationState.CoreoAssociationData}
  }
export default connect(mapStateToProps, mapDispatchToProps)(CoreoAssociation)