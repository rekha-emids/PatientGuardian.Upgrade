import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Navbar, CoreoListItem, CoreoScrollView } from '../../components';
import { SafeView } from '../../components/LevelOne';
import {onSetSelectedPatient,getPatientImage, getIndividuals} from '../../redux/auth/User/actions';
import {onBack} from '../../redux/navigation/actions'
import {navigateToScreenMainStack} from '../../redux/navigation/actions'
import {USER_TYPES} from '../../constants/constants'
import { PATH } from '../../routes';
import styles from './styles'; 
import {getImageGuardian,getImageIndividual, getImage} from '../../redux/profile/PersonalDetail/actions'
import { DasboardProfilePic } from '../../assets/images';
import { getUserInfo } from '../../utils/userUtil';

class SelectIndividual extends Component {

    componentWillMount = () =>{
        if(this.props.userType === USER_TYPES.GUARDIAN)
         this.props.getImageGuardian(this.props.loggedInUser.userId)
        else if(this.props.userType === USER_TYPES.INDIVIDUAL_GUARDIAN)
        this.props.getImageIndividual(this.props.loggedInUser.userId)
        this.props.getIndividuals(true);
    }

    onSelectMe = () => {
        if(this.props.loggedInUser && this.props.loggedInUser.userType === USER_TYPES.INDIVIDUAL_GUARDIAN)
          {
            let data ={
                ...this.props.loggedInUser,
                firstName:this.props.patientName.firstName,
                lastName:this.props.patientName.lastName,
                image:this.props.patientImage?this.props.patientImage.image: null,
            }
            const {navigation} = this.props
            const {params} = navigation && navigation.state || {}
            params && params.navigator && params.navigator.navigate("Dashboard")
            this.props.setSelectedPatient(data)  
            this.props.getImage({id:getUserInfo() && getUserInfo().patientId, userTpe: getUserInfo() && getUserInfo().userTpe})
            this.props.goToHome();

        }
        else {
            let userInfo = getUserInfo()
            let params = {
                id: userInfo && userInfo.coreoHomeUserId,
                userType: userInfo && userInfo.userType
            }
            this.props.goToProfile(params);
        }
    }
    onBack = () => {
        if (this.props.individualList.length > 0) {
            this.props.goBack();
        }
    }

    onSelectIndividual = (individual) => {
        __DEV__ && console.log("individual onSelectIndividual is: ",individual)
        this.props.setSelectedPatient(individual);
        const {navigation} = this.props
        const {params} = navigation && navigation.state || {}
        this.props.goToHome();
        params && params.navigator && params.navigator.navigate("Dashboard")
    }

     render() {
         let guardianImage = this.props.userState && this.props.userState.userImage ?{uri: this.props.userState.userImage} : DasboardProfilePic ;
         return (
             <SafeView>
            <View>
                <Navbar showBackButton={false} title='Select Individual' onClickBackButton={this.onBack} showEmptyAdd/>
                <CoreoScrollView>
                    <CoreoListItem
                        key={this.props.loggedInUser && this.props.loggedInUser.userId}
                        text={'Me'}
                        icon={guardianImage}
                        onPress={this.onSelectMe}
                        iconStyle = {styles.iconStyle}
                    />
                    {this.props.individualList && this.props.individualList.map((individual) => {
                        return (
                            <CoreoListItem
                                key={individual.coreoHomeUserId}
                                text={individual.firstName + ' ' + individual.lastName}
                                icon={individual.image ? {uri: individual.image} : DasboardProfilePic}
                                iconStyle = {styles.iconStyle}
                                onPress={() => {this.onSelectIndividual(individual)}}
                                showSelected={individual.coreoHomeUserId === this.props.selectedUserId}
                            />
                        );
                    })}
                </CoreoScrollView>
            </View>
            </SafeView>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        goBack: () => dispatch(onBack()),
        setSelectedPatient: (individual) => dispatch(onSetSelectedPatient(individual)),
        goToProfile: (params) => dispatch(navigateToScreenMainStack(PATH? PATH.PROFILE: null, params)),
        goToHome: () => dispatch(navigateToScreenMainStack(PATH? PATH.HOME_SCREEN: null)),
        goToDashboard: () => dispatch(navigateToScreenMainStack(PATH.DASHBOARD_SCREEN)),
        getPatientImage: () => dispatch(getPatientImage()),
        getImage: (params) => dispatch(getImage(params)),
        getImageGuardian: (data) => dispatch(getImageGuardian(data)),
        getImageIndividual: (data) => dispatch(getImageIndividual(data)),
        getIndividuals: (data) => dispatch(getIndividuals(data)),
    }
}

function mapStateToProps(state) {
    let authState = state.authState;
    return {
        individualList: authState && authState.userState && authState.userState.individualList,
        selectedUserId: authState && authState.userState &&  authState.userState.userId,
        userState: authState && authState.userState &&  authState.userState,
        loggedInUser: authState && authState.userState &&  authState.userState.userInfo,
        patientName: authState && authState.userState &&  authState.userState.patientName,
        patientImage: authState && authState.userState &&  authState.userState.patientImage,
        userType: authState && authState.userState &&  authState.userState.userInfo.userType
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectIndividual)
