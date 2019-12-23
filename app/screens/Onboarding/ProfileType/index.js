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
  CoreoWizFlow,
  CoreoWizNavigation,
  Select
} from '../../../components';
import styles from './styles';
import {MENUS, BUTTONS} from '../../../constants/config';
import {UserProfileType,USER_TYPES } from '../../../constants/constants';
import { ProfileTypes } from '../../../data/ProfileTypes';
import { PatientNavigationData } from '../../../data/PatientNavigationData';
import { GuardianNavigationData } from '../../../data/GuardianNavigationData';
import { onNextClick, onCancelClick } from '../../../redux/onboarding/ProfileType/actions';
import {  getRelationship } from '../../../redux/onboarding/AddGuardian/actions';
import { OverlayLoaderWrapper } from '../../../components/Base/Preloader/Preloader';

class ProfileTypeScreen extends Component {

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

    const iconList = ProfileTypes.filter(item=>item.userType!=USER_TYPES.INDIVIDUAL_GUARDIAN).map((profile, i) => {
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

    let relationdata = this.props.relationship && this.props.relationship.filter(relation => relation.name !== 'Self');
    let relationshipOptions = relationdata && relationdata.map((relation, i) => {
        return {
          label: relation.name,
          value: relation.id
        };
    });

    const NavigationData =this.state.selectedProfileType === UserProfileType.Guardian ? GuardianNavigationData : PatientNavigationData;
    return (
        <ScreenCover style={styles.screenCoverStyle} showHeader={false}>
          <OverlayLoaderWrapper isLoading={this.props.isLoading} style={styles.screenCoverStyle}>
          <CoreoWizFlow coreoWizNavigationData={NavigationData} activeFlowId={1} />
          <CoreoWizNavigation
              activeFlowId={1}
              tablength={this.state.selectedProfileType === UserProfileType.Guardian ? 6 : 5}
          />
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
                  <View style={styles.listmargin}>{iconList}</View>
                  {this.state.selectedProfileType === UserProfileType.Guardian ?
                    <View style={[styles.sidemargin, styles.relationview]}>
                      <Text style={styles.title}>What is your relationship with the individual?</Text>
                      <Select
                          placeholder='Select Relationship'
                          selectedValue={this.state.relationshipId}
                          enabled={true}
                          style={styles.planstyle}
                          onValueChange={(value) => { 
                            if(value){
                              this.setState({ relationshipId: value }); 
                            }
                          }}
                          dataArray={relationshipOptions}/>
                      <View style={styles.line}/>
                    </View> :
                    null
                  }
              </View>
          </CoreoWizScreen>
          </OverlayLoaderWrapper>

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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTypeScreen)