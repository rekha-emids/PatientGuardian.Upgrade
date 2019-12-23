import React, { Component } from 'react';
import {connect} from 'react-redux';
import {View,
  Text} from 'react-native';
import Header from '../Header'
import Images from '../../../assets/images'
import {
    getClinicalCondition,
    addClinicalCondition,
    getSelectedClinicalCondition
  } from '../../../redux/profile/ClinicalCondition/actions'
import {navigateToScreenMainStack} from '../../../redux/navigation/actions'
import {PATH} from '../../../routes/index';
import styles from './styles'
import EmptyMsgText from '../EmptyText/index'
import _ from 'lodash'
import EmptyText from '../../ServiceProviderProfile/EmptyText';

class ClinicalCondition extends Component {
    componentDidMount() {
        this.props.getClinicalCondition();
        // this.props.getSelectedClinicalCondition(this.props.params);
    }

  onPressFun = () => {
    this.props.goToEditClinicalCondition(this.props.params)
    }
  onPressEmptyMsg = () => {
    this.props.goToEditClinicalCondition(this.props.params) 
   }
  render() {
    __DEV__ && console.log("CLINICAL COND PROF: ")
    let content = this.props.selectedClinicalConditionsList && this.props.selectedClinicalConditionsList.map((item) => <View style={styles.skillItemContainer}>
                <Text style={styles.skillItem}>{item.attributeName}</Text>
            </View>),
      image = Images.edit,
      isEmptyView = false

    if (_.isNil(this.props.selectedClinicalConditionsList) || this.props.selectedClinicalConditionsList.length <= 0){
        isEmptyView = true;
        image = Images.AddIcon
        content = this.props.isEditable ? <EmptyMsgText onPress={this.props.isEditable ? this.onPressEmptyMsg : null} text="Clinical Conditions" icon={image} />
        : <EmptyText/>
    }
    return (
        <View style={styles.cardContainer}>
            <Header title="Clinical Conditions"
                showIcon={this.props.isEditable}
                icon={image}
                isEditable={this.props.isEditable}
                 onPress={this.onPressFun}
            />
            <View style={[
styles.skillItemsList,
isEmptyView ? styles.noClinicalCondition : {}
]}>
                {content}
            </View>
    </View>
);
  }
}

function mapDispatchToProps (dispatch) {
    return {
      getClinicalCondition: () => dispatch(getClinicalCondition()),
      getSelectedClinicalCondition: (data) => dispatch(getSelectedClinicalCondition(data)),
        goToEditClinicalCondition: (params) => dispatch(navigateToScreenMainStack(PATH? PATH.EDIT_CLINICAL_CONDITION: null, params)),
      addClinicalCondition: (data) => dispatch(addClinicalCondition(data))
    }
  }
  
  function mapStateToProps (state, props) {
      let params = props.params
      let details = {
        selectedClinicalConditionsList: state.profileState && state.profileState.ClinicalConditionState.selectedClinicalConditionsList,
      }
      const {impersonatedClinicalDetails} = state.profileState && state.profileState.ClinicalConditionState || {}
      if(params && params.id !== global.currentUserPatientId){
        details = {
            selectedClinicalConditionsList: impersonatedClinicalDetails && impersonatedClinicalDetails[params.id] ? impersonatedClinicalDetails[params.id].selectedClinicalConditionsList : []      
      }}
    return {
        clinicalConditionList: state.profileState && state.profileState.ClinicalConditionState.clinicalConditionList,
        ...details  
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(ClinicalCondition)