import React, { Component } from 'react';
import { connect } from 'react-redux';
import {StyleSheet} from 'react-native';
import {CoreoCard, CoreoScrollView, ScreenCover} from '../../components'
import Skills from './Skills'
import Languages from './Languages/index'
import Certification from './Certification/index'
import Education from './Education/index'
import WorkHistory from './WorkHistory/index'
import PersonalDetails from './PersonalDetails'
import ServicesOffered from './ServicesOffered'
import Availability from './Availability/index'
import { setValueBasedOnHeight } from '../../utils/deviceDimensions';
import {OverlayLoaderWrapper} from '../../components/Base/Preloader/Preloader'
import { isAPIFetching, isAPIInitial } from '../../utils/AppAPIUtils';
import {clearPointServiceState} from '../../redux/serviceProviderProfile/PointService/actions'
import {clearAvailabilityState} from '../../redux/serviceProviderProfile/Availability/actions';
import {clearCertificationState} from '../../redux/serviceProviderProfile/Certification/actions';
import {clearEducationState} from '../../redux/serviceProviderProfile/Education/actions';
import {clearLanguagesState} from '../../redux/serviceProviderProfile/Languages/actions';
import {clearPersonalDetailsState} from '../../redux/serviceProviderProfile/PersonalDetail/actions';
import {clearProgressIndicatorState} from '../../redux/serviceProviderProfile/ProgerssIndicator/actions';
import {clearServiceOfferedState} from '../../redux/serviceProviderProfile/ServiceOffered/actions';
import {clearSkillsState} from '../../redux/serviceProviderProfile/Skills/actions';
import {clearWorkHistoryState} from '../../redux/serviceProviderProfile/WorkHistory/actions';
import PointService from './PointService';
import ErrorBoundaryHOC from '../../ErrorBoundaryHOC';
import { SafeView } from '../../components/LevelOne';
import { ENTITY_SERVICE_PROVIDER, ENTITY } from '../../constants/constants';

class ServiceProviderProfile extends Component {

    componentWillUnmount() {
        this.props.clearAvailabilityState();
        this.props.clearCertificationState();
        this.props.clearEducationState();
        this.props.clearLanguagesState();
        this.props.clearPersonalDetailsState();
        this.props.clearProgressIndicatorState();
        this.props.clearServiceOfferedState();
        this.props.clearSkillsState();
        this.props.clearWorkHistoryState();
        this.props.clearPointServiceState();
    }

    render() {
        const {getProfilePercentageStatus, getImageStatus, getPersonalDetailStatus, getSkillStatus, getAvailabilityStatus, getLanguageStatus, getEducationStatus, getCertificationStatus, getWorkHistoryStatus, getPointOfServiceStatus} = this.props
        let isLoading = isAPIFetching(getProfilePercentageStatus, getImageStatus, getPersonalDetailStatus, getSkillStatus, getAvailabilityStatus, getLanguageStatus, getEducationStatus, getCertificationStatus, getWorkHistoryStatus, getPointOfServiceStatus) ||
         isAPIInitial(getProfilePercentageStatus, getImageStatus, getPersonalDetailStatus)
        const {id, hideNavbar} = this.props.navigation.state.params;
        let isEntityUser = this.props.personalDetail && this.props.personalDetail.serviceProviderType === ENTITY
        let isESP = this.props.personalDetails && this.props.personalDetail.serviceProviderType === ENTITY_SERVICE_PROVIDER

        return (
            <SafeView>
            <ScreenCover>
                <OverlayLoaderWrapper isLoading={isLoading} loaderStyle={styles.loaderStyle}>
                    <CoreoScrollView>
                        <CoreoCard style={styles.sectionContianer}>
                            <PersonalDetails isEntityUser={isEntityUser} hideNavbar={hideNavbar} isEditable={false} spId={id}/>
                        </CoreoCard>

                        {
                            isESP
                            ? null
                            :                            <React.Fragment>
                                    <CoreoCard style={styles.sectionContianer}>
                                            <ServicesOffered isEditable={false} spId={id} isLoading={isLoading}/>
                                        </CoreoCard>
                                        <CoreoCard style={styles.sectionContianer}>
                                            <Skills isEditable={false} spId={id} isLoading={isLoading}/>
                                        </CoreoCard>
                                        <CoreoCard style={styles.sectionContianer}>
                                            <PointService isEditable={false} spId={id} isLoading={isLoading}/>
                                        </CoreoCard>
                                        <CoreoCard style={styles.sectionContianer}>
                                            <Availability isEditable={false} spId={id} isLoading={isLoading}/>
                                        </CoreoCard>
                                        <CoreoCard style={styles.sectionContianer}>
                                            <Languages isEditable={false} spId={id} isLoading={isLoading}/>
                                        </CoreoCard>
                                        <CoreoCard style={styles.sectionContianer}>
                                            <Certification isEditable={false} spId={id} isLoading={isLoading}/>
                                        </CoreoCard>
                                        {isEntityUser  ? null
                                           : <CoreoCard style={styles.sectionContianer}>
                                        <WorkHistory isEditable={false} spId={id} isLoading={isLoading}/>
                                    </CoreoCard> }
                            </React.Fragment>
                        
                        }
                        
                     {isEntityUser ? null
                          : <CoreoCard style={styles.sectionContianer}>
                         <Education isEditable={false} spId={id} isLoading={isLoading}/>
                     </CoreoCard>}
                        
                    </CoreoScrollView>
                </OverlayLoaderWrapper>
            </ScreenCover>
            </SafeView>
        )
    }
}

const styles = StyleSheet.create({
    sectionContianer: {marginBottom: setValueBasedOnHeight(9)},
   loaderStyle: {backgroundColor: 'white'}
})

function mapStateToProps (state) {
    const impersonateProfileState = state && state.impersonateProfileState
    return {
        getProfilePercentageStatus: impersonateProfileState.progressIndicatorState.getProfilePercentageStatus,
        getImageStatus: impersonateProfileState.PersonalDetailState.getImageStatus,
        getPersonalDetailStatus: impersonateProfileState.PersonalDetailState.getPersonalDetailStatus,
        getSkillStatus: impersonateProfileState.SkillsState.getSkillStatus,
        getServicesOfferedStatus: impersonateProfileState.serviceOfferedState.getServicesOfferedStatus,
        getAvailabilityStatus: impersonateProfileState.AvailabilityState.getAvailabilityStatus,
        getLanguageStatus: impersonateProfileState.LanguagesState.getLanguageStatus,
        getCertificationStatus: impersonateProfileState.CertificationState.getCertificationStatus,
        getEducationStatus: impersonateProfileState.EducationState.getEducationStatus,
        getWorkHistoryStatus: impersonateProfileState.WorkHistoryState.getWorkHistoryStatus,
        getPointOfServiceStatus: impersonateProfileState.PointServiceState.isLoading,
        personalDetail: impersonateProfileState.PersonalDetailState.personalDetail
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearAvailabilityState: () => dispatch(clearAvailabilityState()),
        clearCertificationState: () => dispatch(clearCertificationState()),
        clearEducationState: () => dispatch(clearEducationState()),
        clearLanguagesState: () => dispatch(clearLanguagesState()),
        clearPersonalDetailsState: () => dispatch(clearPersonalDetailsState()),
        clearProgressIndicatorState: () => dispatch(clearProgressIndicatorState()),
        clearSkillsState: () => dispatch(clearSkillsState()),
        clearServiceOfferedState: () => dispatch(clearServiceOfferedState()),
        clearWorkHistoryState: () => dispatch(clearWorkHistoryState()),
        clearPointServiceState: () => dispatch(clearPointServiceState())
    }
}

export default ErrorBoundaryHOC(connect(mapStateToProps, mapDispatchToProps)(ServiceProviderProfile))