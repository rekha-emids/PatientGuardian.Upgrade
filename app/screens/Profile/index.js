import React, { Component } from 'react';
import {StyleSheet, RefreshControl } from 'react-native';
import CoreoCard from '../../components/LevelOne/CoreoCard'
import ClinicalCondition from './ClinicalCondition'
import Languages from './Languages/index'
import PersonalDetails from './PersonalDetails'
import CoreoAssociation from './CoreoAssociation'
import { connect } from 'react-redux';
import PatientManageConnection from '../PatientManageConnection'
import PointService from './PointService/index'
import { extractRole } from '../../utils/roleUtil';
import { SCREENS } from '../../constants/constants';
import { setValueBasedOnHeight } from '../../utils/deviceDimensions';
import { USER_TYPES } from '../../constants/constants';
import { SafeView } from '../../components/LevelOne';
import { CoreoScrollView } from '../../components';
import { getPersonalDetail, getImage } from '../../redux/profile/PersonalDetail/actions';
import { INIT, REFRESH, API_REFRESH_FETCHING } from '../../constants/AppAPIConstants';
import {_} from '../../utils/validations'
import { isAPIFetching } from '../../utils/AppAPIUtils';
import { CoreoActiveIndicator } from '../../components/Base/Preloader/Preloader';
import ErrorBoundaryHOC from '../../ErrorBoundaryHOC';
import { getSelectedPatientInfo, getUserInfo} from '../../utils/userUtil';
import { updateNetworkConnectivity } from '../../services/OfflineSyncing';
import HeightWeightDetails from './HeightWeightDetails';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.params = this.props.navigation && this.props.navigation.state.params
        this.state = {
            profileRole: extractRole(SCREENS.PROFILE),
        }
    }

    componentDidMount(){
        this.props.getImage(this.params, null, null, updateNetworkConnectivity)
        if(_.isNil(this.props.personalDetail)){
            this.apiCall(INIT)
        }
    }

    apiCall = (requestType) => {
        this.props.getPersonalDetail(this.params, requestType)
    }

    _onRefresh = () => {
        this.apiCall(REFRESH)
    }
  
    render()
    {
        const {id, userType, canEditable, fromManageConnection} = this.params || {}
        const {getProfileStatus} = this.props || {}
        let isEditable = this.params && this.params.isIndividualOrGuardianMyConnection?false: this.props.network && (!_.isNil(canEditable) ? canEditable : true) && (fromManageConnection? false : true) 
        if(isAPIFetching(getProfileStatus)) return <CoreoActiveIndicator />
        return(
            <SafeView>
            <CoreoScrollView 
             refreshControl={
                 <RefreshControl
                    refreshing={getProfileStatus === API_REFRESH_FETCHING}
                    onRefresh={this._onRefresh} />}>
                 <CoreoCard style={styles.sectionContianer}>
                    <PersonalDetails isEditable={isEditable} params = {this.params} isPatient={userType !== USER_TYPES.GUARDIAN} />
                </CoreoCard>
                {userType !== USER_TYPES.GUARDIAN ?
                <CoreoCard style={styles.sectionContianer}>
                    <HeightWeightDetails isEditable={isEditable} params = {this.params} />
                </CoreoCard>:null}
                {getUserInfo() && getUserInfo().userType === USER_TYPES.CARE_TEAM && getSelectedPatientInfo() && getSelectedPatientInfo().userType === USER_TYPES.PATIENT  ? 
                <CoreoCard style={styles.sectionContianer}>
                    <CoreoAssociation isEditable={isEditable} params = {this.params} />
                </CoreoCard> : null }
                {userType !== USER_TYPES.GUARDIAN ? <CoreoCard style={styles.sectionContianer}>
                    <ClinicalCondition isEditable={isEditable} params = {this.params}/>
                </CoreoCard> : null}
                {userType !== USER_TYPES.GUARDIAN ?
                <CoreoCard style={styles.sectionContianer}>
                    <PointService isEditable={isEditable} role={this.state.profileRole} params = {this.params} />
                </CoreoCard>
                : null}
                {userType !== USER_TYPES.GUARDIAN ?
                <CoreoCard style={styles.sectionContianer}>
                    <Languages isEditable={isEditable} params = {this.params}/>
                </CoreoCard>
                : null}
                
                { Number(global.currentUserPatientId) === id ?
                <CoreoCard style={styles.footerContianer}>
                    <PatientManageConnection isEditable={isEditable} params = {this.params}/>
                </CoreoCard>
                : null } 
            </CoreoScrollView>
            </SafeView>
        )
    }
}

const styles = StyleSheet.create({
    sectionContianer: {
        backgroundColor:'#F9F9F9',
        marginBottom:setValueBasedOnHeight(15)
    },
    footerContianer: {
        marginBottom: setValueBasedOnHeight(15)
    }
})

function mapStateToProps(state, props) {
    let params = props.navigation && props.navigation.state.params
    let profileState = {
        personalDetail: state.profileState && state.profileState.PersonalDetailState.personalDetail,
    }
    const {impersonatedDetails} = state.profileState && state.profileState.PersonalDetailState || {}
    if(params && params.id !== global.currentUserPatientId){
        profileState= {
            personalDetail: impersonatedDetails && impersonatedDetails[params.id] && impersonatedDetails[params.id].personalDetail ? impersonatedDetails[params.id].personalDetail : null
     }
    }
 
    return {
        network: state.networkReducer && state.networkReducer.network,
        ...profileState,
        getProfileStatus: state.profileState && state.profileState.PersonalDetailState.getProfileStatus,
        currentPatient : state.authState && state.authState.userState.patientId
    }
}

function mapDispatchToProps(dispatch){
    return {
        getPersonalDetail: (params, requestType) => dispatch(getPersonalDetail(params, requestType)),
        getImage: (params, onApiSuccess, onApiFailure, updateNetworkOnResponse) => dispatch(getImage(params, onApiSuccess, onApiFailure, updateNetworkOnResponse))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundaryHOC(Profile))