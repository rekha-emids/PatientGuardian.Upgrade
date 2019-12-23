import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
    Text,
    View,
    Image,
    TouchableHighlight
} from 'react-native';
import {
    ScreenCover,
    CoreoWizScreen,
    Select,
    Calendar,
    InfoList,
    Link,
    ModalPopup,
    CoreoFloatingInput
} from '../../../components';
import {
    onNextClick,
    onCancelClick,
    resetClick,
    getPlans,
    searchMembers,
    formDirty
} from '../../../redux/onboarding/MemberDetails/actions';
import { checkSpace } from '../../../utils/validations';
import { MENUS, BUTTONS } from '../../../constants/config';
import { UserProfileType } from '../../../constants/constants';
import { PatientNavigationData } from '../../../data/PatientNavigationData';
import { GuardianNavigationData } from '../../../data/GuardianNavigationData';
import styles from './styles';
import { error } from '../../../assets/images';
import Navbar from '../../../components/LevelOne/Navbar';
import {navigateToScreenMainStack} from '../../../redux/navigation/actions'
import { PATH } from '../../../routes';

class AddMemberDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchData: {
                lastname: '',
                memberId: '',
                dob: '',
                planId: null
            },
            showModal: false,
            selectedData: {
                mpi: '',
                firstName: '',
                lastName: '',
                memberId: '',
                dob: '',
                gender: ''
            },
            showModalOnCancel: false,
            showModalOnPrevious: false,
            dobValid: true,
            isSearchCriteriaValid: true,
        };
    };

    componentDidMount() {
        this.setState(
            {
                selectedData: this.props.patientProfile,
                searchData: {
                    lastname: this.props.lastname,
                    memberId: this.props.memberId,
                    dob: this.props.dob,
                    planId: this.props.planId
                }
            }
        );
        this.props.getPlans();
    }

    resetData = () => {
        this.setState({
            searchData: {
                lastname: '',
                memberId: '',
                dob: '',
                planId: null
            },
            selectedData: {
                mpi: '',
                firstName: '',
                lastName: '',
                memberId: '',
                dob: '',
                gender: ''
            }
        });
        this.props.resetMemberDetails();
    }

    onClickButtonPrevious = () => {
        if (this.state.searchData.lastname || this.state.searchData.memberId || this.state.searchData.dob || this.state.searchData.planId || this.state.selectedData.mpi) {
            this.setState({
                showModalOnPrevious: true
            });
        }
        else {
            this.props.onClickPrevious({ patientProfile: this.state.selectedData });
        }
    }

    dateChanged = (date) => {
        const formattedDate = date ? moment(new Date(date.toString())).format('MM/DD/YYYY') : null;
        this.setState({ searchData: { ...this.state.searchData, dob: formattedDate }, dobValid: true });
        this.props.formDirty();
    }

    onChangePlan = (value, index) => {
        this.setState({ searchData: { ...this.state.searchData, planId: value } });
        this.props.formDirty();
    }

    onChangeLastName = (value) => {
        this.setState({ searchData: { ...this.state.searchData, lastname: value } });
        this.props.formDirty();
    }

    onChangeMemberId = (value) => {
        this.setState({ searchData: { ...this.state.searchData, memberId: value } });
        this.props.formDirty();
    }

    onClickPreviousBtn = () => {
        this.setState({
            showModalOnPrevious: !this.state.showModalOnPrevious,
        })
        this.props.resetMemberDetails();
        this.props.onClickPrevious();
    }

    onPressSupport = () => {
        this.props.goToHelp();
    }

    searchPatient = () => {
        if (this.state.searchData.planId === null || this.state.searchData.memberId === '' ||
            this.state.searchData.lastname === '' || this.state.searchData.dob === null || !this.state.dobValid) {
            if (!this.state.dobValid) {
                this.setState({ searchData: { ...this.state.searchData, dob: null } });
            }
            this.setState({ isSearchCriteriaValid: false });
        } else {
            this.setState({isSearchCriteriaValid: true});
            this.props.searchPatient(this.state.searchData)
        }
    }

    render() {
        const menus = [MENUS.CONTACT];
        const footerButtons = [BUTTONS.CANCEL, BUTTONS.NEXT];

        let planOptions = this.props.plans && this.props.plans.map((plan, i) => {
            return {
              label: plan.planType,
              value: plan.planId
            };
        });

        const memberOptions = this.props.patientProfiles && this.props.patientProfiles.map((item, i) => {
            item.id = item.mpi;
            return item;
        });

        const memberList = memberOptions && memberOptions.map((member) => {
            member.selected = this.state.selectedData.mpi === member.mpi;
            return (
                <InfoList
                    profile={member}
                    onSelectProfile={() => {this.setState({
                        selectedData: {
                            ...this.state.selectedData,
                            mpi: member.mpi,
                            firstName: member.firstName,
                            lastName: member.lastName,
                            dob: member.dob,
                            gender: member.gender,
                            memberId: member.memberId
                        }
                    })
                }}
                />
            );
        });
        
        const NavigationData = this.props.profileType === UserProfileType.Individual ? PatientNavigationData : GuardianNavigationData;
        const user = this.props.profileType === UserProfileType.Individual ? `Member's` : `${this.props.selectedRelationValue}'s`;
        return (
            <ScreenCover isLoading={this.props.isLoading} showHeader={false}>
             <Navbar title="Add an Individual" showBackButton={true} />
                <CoreoWizScreen 
                    menus={menus} 
                    footerButtons={footerButtons} 
                    isNextDisabled={this.state.selectedData && !this.state.selectedData.mpi} 
                    onNextClick={() => this.setState({
                        showModal: true
                    })}
                    onCancelClick={() => this.setState({
                        showModalOnCancel: true
                    })}
                >
                    <View style={styles.container}>
                        <Text style={[styles.title, styles.fontfamily]}>Select your plan</Text>
                        <View style={styles.planmargin}>
                            <Select
                                placeholder='Select Plan'
                                selectedValue={this.state.searchData.planId}
                                enabled={this.props.patientProfiles && this.props.patientProfiles.length <= 0}
                                style={styles.planstyle}
                                onValueChange={this.onChangePlan}
                                dataArray={planOptions}/>
                            <View style={styles.line}/>
                        </View>
                        <View style={styles.detailsmargin}>
                            <Text style={styles.title}>
                                Enter {user} Details
                            </Text>
                        </View>
                        <View style={styles.memberstyle}>
                            <CoreoFloatingInput
                                label="Last Name"
                                editable={this.props.patientProfiles && this.props.patientProfiles.length <= 0}
                                maxLength={100}
                                onChangeText={this.onChangeLastName}
                                value={checkSpace(this.state.searchData.lastname)}
                            />
                        </View>
                        <View style={styles.memberstyle}>
                            <CoreoFloatingInput
                                label="Member ID"
                                editable={this.props.patientProfiles && this.props.patientProfiles.length <= 0}
                                maxLength={50}
                                value={checkSpace(this.state.searchData.memberId)}
                                onChangeText={this.onChangeMemberId}
                            />
                        </View>
                        <View style={styles.calendermargin}>
                            <Calendar
                                style={styles.calenderheight}
                                label="Date Of Birth"
                                date={this.state.searchData.dob}
                                maxDate={new Date()}
                                placeholder="Select date"
                                textStyle={styles.calendertext}
                                placeHolderTextStyle={styles.calendertext}
                                onDateChange={this.dateChanged}
                                disabled={this.props.patientProfiles && this.props.patientProfiles.length > 0}
                                dateText={styles.dateText}
                            />
                            <View style={styles.line}/>
                        </View>
                        {
                            this.props.patientProfiles && !this.props.patientProfiles.length > 0 && 
                            this.state.searchData.planId &&
                            this.state.searchData.lastname !== '' &&
                            this.state.searchData.memberId !== '' &&
                            this.state.searchData.dob &&
                            <TouchableHighlight
                                style={styles.button}
                                onPress={this.searchPatient}
                            >
                                <Text style={styles.common}>Search</Text>
                            </TouchableHighlight>
                        }
                        {
                            this.props.patientProfiles && this.props.patientProfiles.length > 0 &&
                            <View style={styles.resulttitle}>
                                <Text style={styles.title}>Select the Individual Profile</Text>
                                <View style={styles.listmargin}>{memberList}</View>
                                <View style={styles.supportView}><Text style={styles.support}>Did not find your profile? <Link onPress={this.resetData}>Click here</Link> to reset details or Contact <Link onPress={this.onPressSupport}>Support</Link></Text></View>
                            </View>
                        }
                        {   (this.props.patientProfiles && this.props.patientProfiles.length <= 0 && this.props.isSearchMembersCompleted) &&
                            <View style={styles.messageview}>
                                <Image
                                    style={styles.icon}
                                    source={error}
                                />
                                <Text style={styles.errormessage}>No search results found. Please contact Support at +121323472343 if you believe this is a mistake.</Text>
                            </View>
                        }
                    </View>
                </CoreoWizScreen>
                <ModalPopup
                    visible={this.state.showModal}
                    primaryButton="CONFIRM"
                    secondaryButton="CANCEL"
                    primaryColor="#3c1053"
                    secondaryColor="#6c757d"
                    customBtnFlag='true'
                    onConfirm={() => {
                        this.setState({
                            showModal: !this.state.showModal,
                        });
                        this.props.onClickNext({ profileData: this.state.selectedData, searchData: this.state.searchData })
                    }}
                    onCancel={() =>
                        this.setState({
                            showModal: !this.state.showModal
                        })}
                >
                    <Text style={styles.message}>You have selected <Text style={{color: '#4f236b'}}>{this.state.selectedData && (this.state.selectedData.firstName + ' ' + this.state.selectedData.lastName)}</Text>. Are you sure you want to continue with this profile?</Text>
                </ModalPopup>
                <ModalPopup
                    visible={this.state.showModalOnCancel}
                    primaryButton="YES"
                    secondaryButton="NO"
                    primaryColor="#3c1053" 
                    secondaryColor="#6c757d"
                    onConfirm={() => {
                        this.setState({
                            showModalOnCancel: !this.state.showModalOnCancel,
                        })
                        this.props.onClickCancel();
                    }}
                    onCancel={() => this.setState({
                        showModalOnCancel: !this.state.showModalOnCancel,
                    })}
                >
                    <Text style={styles.message}>Do you want to cancel the adding individual detail process?</Text>
                </ModalPopup>
                <ModalPopup
                    visible={this.state.showModalOnPrevious}
                    primaryButton="YES"
                    secondaryButton="NO"
                    primaryColor="#3c1053"
                    secondaryColor="#6c757d"
                    onConfirm={() => this.onClickPreviousBtn()}
                    onCancel={() => this.setState({
                        showModalOnPrevious: !this.state.showModalOnPrevious,
                    })}
                >
                    <Text style={styles.message}>Do you want to discard changes?</Text>
                </ModalPopup>
            </ScreenCover>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onClickCancel: () => dispatch(onCancelClick()),
        onClickNext: (data) => dispatch(onNextClick(data)),
        onClickPrevious: () => dispatch(() => null),
        getPlans: () => dispatch(getPlans()),
        searchPatient: (data) => dispatch(searchMembers(data)),
        resetMemberDetails: () => dispatch(resetClick()),
        formDirty: () => dispatch(formDirty()),
        goToHelp: () => dispatch(navigateToScreenMainStack(PATH.HELP)),
    }
}

function mapStateToProps(state) {
    let onboardingState = state.onboardingState
    return {
        plans: onboardingState && state.onboardingState.memberDetailsState.plans,
        patientProfiles: onboardingState && state.onboardingState.memberDetailsState.patientProfiles,
        patientProfile: onboardingState && state.onboardingState.memberDetailsState.profileData,
        isLoading: state.loadingState && state.loadingState.isLoading,
        isSearchMembersCompleted: onboardingState && state.onboardingState.memberDetailsState.searchMembersSuccess ||
                onboardingState && state.onboardingState.memberDetailsState.searchMembersError,
        planId: onboardingState && state.onboardingState.memberDetailsState.planId,
        lastname: onboardingState && state.onboardingState.memberDetailsState.lastName,
        memberId: onboardingState && state.onboardingState.memberDetailsState.memberId,
        dob: onboardingState && state.onboardingState.memberDetailsState.dob,
        profileType: onboardingState && state.onboardingState.profileTypeState.profileType,
        selectedRelationValue: onboardingState && state.onboardingState.profileTypeState.selectedRelationValue,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberDetails);
