import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import {
  ScreenCover, 
  CoreoWizScreen,
  IconList,
  Select
} from '../../../components';
import styles from './styles';
import {MENUS, BUTTONS} from '../../../constants/config';
import {UserProfileType } from '../../../constants/constants';
import { ProfileTypes } from '../../../data/ProfileTypes';
import { onNextClick, onCancelClick } from '../../../redux/onboarding/ProfileType/actions';
import {  getRelationship } from '../../../redux/onboarding/AddGuardian/actions';
import {generatePickerValues} from '../../../utils/appUtils'
import Navbar from '../../../components/LevelOne/Navbar';
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
    let relationship = this.props.relationship.find((relation) => {
      return relation.id === this.state.relationshipId;
    });
    this.props.onClickNext({ 
        profileType: this.state.selectedProfileType,
        selectedRelationId: this.state.relationshipId,
        selectedRelationValue: relationship && relationship.name
    });
  }

  render() {
    const menus = [MENUS.CONTACT];
    const footerButtons = [BUTTONS.CANCEL, BUTTONS.NEXT];

    const iconList = ProfileTypes && ProfileTypes.map((profile, i) => {
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


    return (
        <ScreenCover isLoading={this.props.isLoading} showHeader={false}>
          <Navbar title="Add an Individual" showBackButton={true} />
          <CoreoWizScreen 
              menus={menus} 
              footerButtons={footerButtons} 
              isNextDisabled={this.state.selectedProfileType === '' || (this.state.selectedProfileType === UserProfileType.Guardian && this.state.relationshipId === null)} 
              onNextClick={this.onClickButtonNext} 
              onCancelClick={this.onClickButtonCancel}
          >
              <View style={styles.container}>
                  <Text style={[styles.sidemargin, styles.title]}>Select your profile type</Text>
                  <View style={styles.listmargin}>{iconList}</View>
                  {this.state.selectedProfileType === UserProfileType.Guardian ?
                    <View style={[styles.sidemargin, styles.relationview]}>
                      <Text style={styles.title}>What is your relationship with the individual?</Text>
                      <Select
                          placeholder='Select Relationship'
                          selectedValue={this.state.relationshipId}
                          enabled={true}
                          style={styles.planstyle}
                          onValueChange={(value) => { this.setState({ relationshipId: value }); }}
                          dataArray={relationshipOptions}/>
                      <View style={styles.line}/>
                    </View> :
                    null
                  }
              </View>
          </CoreoWizScreen>
        </ScreenCover>
    );
  };
};

function mapDispatchToProps(dispatch) {
  return {
      getRelationship: () => dispatch(getRelationship()),
      setWorkflowDirty: () => dispatch(setWorkflowDirty()),
      onClickCancel: () => dispatch(onCancelClick()),
      onClickNext: (data) => dispatch(onNextClick(data))
  }
}

function mapStateToProps(state) {
  let onboardingState = state.onboardingState;
  return {
      profileType: onboardingState && state.onboardingState.profileTypeState.profileType,
      isLoading: state.loadingState && state.loadingState.isLoading,
      relationship: onboardingState && state.onboardingState.addGuardianState.relationship,
      relationValue: onboardingState && state.onboardingState.profileTypeState.selectedRelationValue,
      relationshipId: onboardingState && state.onboardingState.profileTypeState.selectedRelationId
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSelection)