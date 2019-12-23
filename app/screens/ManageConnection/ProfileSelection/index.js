import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import {
   CoreoWizScreen,
  IconList,
  
  Select
} from '../../../components';
import styles from './styles';
import {MENUS, BUTTONS} from '../../../constants/config';
import {UserProfileType,USER_TYPES,  BLOCED_RELATION_SHIPS} from '../../../constants/constants';
import { ProfileTypes } from '../../../data/ProfileTypes';
import {PATH} from '../../../routes/index.js'
import { PatientNavigationData } from '../../../data/PatientNavigationData';
import { GuardianNavigationData } from '../../../data/GuardianNavigationData';
import {generatePickerValues} from '../../../utils/appUtils'
import { navigateToScreenMainStack } from '../../../redux/navigation/actions';
import { onNextClick, onCancelClick } from '../../../redux/manageConnection/ProfileSelection/actions';
import {  getRelationship } from '../../../redux/manageConnection/AddGuardianDetails/actions';
import {SafeView, Navbar} from '../../../components/LevelOne'
import { OverlayLoaderWrapper } from '../../../components/Base/Preloader/Preloader';
import { isAPIFetching } from '../../../utils/AppAPIUtils';
class ProfileSelection extends Component {

  constructor(props) {
    super(props);
    this.state = {
        selectedProfileType: '',
        relationshipId: null,
        selectedRelationValue:null
    }
  }

  componentDidMount() {
    this.props.getRelationship();
  }

  onClickButtonCancel = () => {
    this.props.onClickCancel();
    this.setState({ selectedProfileType: '' });
  }

  onClickButtonNext = () => {
    let relationship = this.props.relationship && this.props.relationship.find((relation) => {
      return relation.id === this.state.relationshipId;
    });
    this.props.onClickNext({ 
        profileType: this.state.selectedProfileType,
        selectedRelationId: this.state.relationshipId,
        selectedRelationValue: relationship && relationship.name
    });
  }

  render() {
    __DEV__ && console.log("PROFILE SELECTION RENDER: ")
    const {navigation} = this.props
    let params = navigation && navigation.state && navigation.state.params
    let userType = params ? params.userType : this.props.userType
    const menus = [MENUS.CONTACT];
    const footerButtons = [BUTTONS.CANCEL, BUTTONS.NEXT];
    const iconList = userType===USER_TYPES.PATIENT? ProfileTypes && ProfileTypes.filter( item=> item.userType===USER_TYPES.GUARDIAN):userType===USER_TYPES.GUARDIAN? ProfileTypes && ProfileTypes.filter( item=>item.userType===USER_TYPES.GUARDIAN || item.userType === USER_TYPES.PATIENT ): ProfileTypes && ProfileTypes.filter( item=> item.userType===USER_TYPES.INDIVIDUAL_GUARDIAN)
    const result= iconList && iconList.map((profile, i) => {
      profile.selected = this.state.selectedProfileType === profile.name;
      return (
        <IconList
          key={i}
          profile={profile}
          onSelectProfile={() => {
            this.setState({ 
              selectedProfileType: profile.name,
              relationshipId: null,
              selectedRelationValue:null
            })}
          }
        />
      );
    });

    let relationshipOps = this.props.relationship && this.props.relationship.filter(relation => relation.name !== "Service Provider" && relation.id !== 2
    );
    let relationshipOptions = generatePickerValues(relationshipOps,"name","id")

    const NavigationData =this.state.selectedProfileType === UserProfileType.Guardian ? GuardianNavigationData : PatientNavigationData;
    let updatedRelationOptions = relationshipOptions
    if(this.state.selectedProfileType === UserProfileType.Guardian){
      updatedRelationOptions = relationshipOptions && relationshipOptions.filter(relation => BLOCED_RELATION_SHIPS.indexOf(relation.value) === -1)
    }
    return (
      <SafeView>
          <View style={{flex:1}}>
          <Navbar title="Add an Individual" showBackButton={true} showEmptyAdd />
          <OverlayLoaderWrapper style={{flex:1}} isLoading={isAPIFetching(this.props.isLoading)} >
          <CoreoWizScreen 
              menus={menus} 
              footerButtons={footerButtons} 
              isNextDisabled={this.state.selectedProfileType === '' || (this.state.selectedProfileType === UserProfileType.Guardian && this.state.relationshipId === null)} 
              onNextClick={this.onClickButtonNext} 
              onCancelClick={this.onClickButtonCancel}
              style={styles.container}
          >

              <View>
                  <Text style={[styles.sidemargin, styles.title]}>Select your profile type</Text>
                  <View style={styles.listmargin}>{result}</View>
                  {this.state.selectedProfileType === UserProfileType.Guardian ?
                    <View style={[styles.sidemargin, styles.relationview]}>
                      <Text style={styles.title}>What is your relationship with the individual?</Text>
                      <Select
                          placeholder='Select Relationship'
                          selectedValue={this.state.relationshipId}
                          enabled={true}
                          style={styles.planstyle}
                          onValueChange={(value) => { this.setState({ relationshipId: value }); }}
                          dataArray={updatedRelationOptions}/>
                      <View style={styles.line}/>
                    </View> :
                    null
                  }
              </View>
          </CoreoWizScreen>
          </OverlayLoaderWrapper> 

          </View></SafeView>
             );
  };
};

function mapDispatchToProps(dispatch) {
  return {
      getRelationship: () => dispatch(getRelationship()),
      setWorkflowDirty: () => dispatch(setWorkflowDirty()),
      onClickCancel: () => dispatch(onCancelClick()),
      goToHome: () => dispatch(navigateToScreenMainStack(PATH.HOME_SCREEN)),
      onClickNext: (data) => dispatch(onNextClick(data)),
      goBack: () => dispatch(onBack())
  }
}

function mapStateToProps(state) {
  let manageConnectionState = state.manageConnectionState;
  return {
      userType: state.authState && state.authState.userState.userInfo.userType,
      profileType: manageConnectionState && state.manageConnectionState.profileTypeSelectionState.profileType,
      relationship: manageConnectionState && state.manageConnectionState.addGuardianDetailsState.relationship,
      isLoading: manageConnectionState && state.manageConnectionState.addGuardianDetailsState.isLoadingAddGuardian,
      relationValue: manageConnectionState && state.manageConnectionState.profileTypeSelectionState.selectedRelationValue,
      relationshipId: manageConnectionState && state.manageConnectionState.profileTypeSelectionState.selectedRelationId,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileSelection)