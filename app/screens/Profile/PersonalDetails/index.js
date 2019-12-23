import React from 'react';
import Icon from '../../../components/Base/Icon'
import { connect } from 'react-redux';
import { View, Text, Platform, TouchableOpacity, Image } from 'react-native';
import { CoreoImage } from '../../../components'
import Images from '../../../assets/images'
import { onBack } from '../../../redux/navigation/actions'
import * as action from '../../../redux/profile/PersonalDetail/actions'
import _ from 'lodash';
import { setFontSize, setValueBasedOnWidth } from '../../../utils/deviceDimensions';
import styles from './styles'
import Icons from '../../../assets/images/Icons';
import { navigateToScreenMainStack } from '../../../redux/navigation/actions'
import { PATH } from '../../../routes/index';
import { UserProfileType, USER_TYPES, NO_PREFERENCE, OTHERS } from '../../../constants/constants';
import ProgressCircle from 'react-native-progress-circle';
import { CoreoProfileImage } from '../../../components/Base/Image/Image';
import { normalizePhone } from '../../../utils/renderFields';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';

export const NavBar = (props) => {
    let icon = Icons.backArrowAndroid
    if (Platform.OS === 'ios') {
        icon = Icons.backArrowIos
    }
    return (
        <View style={styles.navBarContainer}>
            <TouchableOpacity onPress={props.onPress}>
                <Icon {...icon} size={setFontSize(20)} style={styles.arrow} />
            </TouchableOpacity>
            <Text style={styles.heading}>Profile</Text>
            {
                props.isEditable ?
                    <TouchableOpacity onPress={props.onEditPress}>
                        <CoreoImage source={Images.edit} style={styles.editIcon} />
                    </TouchableOpacity>
                    : <View style={styles.editIcon} />}
        </View>
    )
}

export const ProfilePicAndDetails = (props) => {
    const { profilePic, details, profilePercentage, params } = props
    let gender;
    if (params && params.userType === USER_TYPES.GUARDIAN) {
        gender = details && details.genderName ? ((details.genderName === "Others") ? "Not Disclosed" : details.genderName) : ""
    } else {
        gender = details && details.gender && details.gender.genderName ? ((details.gender.genderName === "Others") ? "Not Disclosed" : details && details.gender.genderName) : ""
    }
    if (gender === NO_PREFERENCE && props.userType === USER_TYPES.PATIENT) {
        gender = OTHERS
    }
    let nameComponent = <Text style={styles.name}>{details && details.firstName} {details && details.lastName}</Text>
    let genderComponent = <Text style={styles.gender}>{gender}</Text>
    let ageComponent = <Text style={styles.age}>{details && details.age} Yrs Old</Text>
    let dotComponent = <View style={styles.dotImage} />
    return (
        <View style={styles.profilePicAndDetailsContainer}>
            <ProgressCircle
                percent={profilePercentage}
                radius={setValueBasedOnWidth(107 / 2)}
                borderWidth={setValueBasedOnWidth(4)}
                color="#2ab498"
                shadowColor="#eaeaea"
                bgColor="#fff"
            >
                <CoreoProfileImage style={styles.profilePic} pic={profilePic ? { uri: profilePic } : null} />
            </ProgressCircle>
            <View style={styles.userDetails}>
                {nameComponent}
                <View style={styles.personalDetails}>
                    <View>
                        {genderComponent}
                    </View>
                    <View style={styles.dotHolder}>
                        {dotComponent}
                    </View>
                    <View style={styles.year}>
                        {ageComponent}
                    </View>
                </View>
            </View>
        </View>

    )
}

export const AddressField = (props) => {
    const { icon, label, value } = props
    let RenderComponent = View;
    if (!_.isNil(icon)) {
        RenderComponent = CoreoImage;
    }
    return (
        <View style={styles.addressDetails}>
            <RenderComponent style={styles.icon} source={icon} />
            <Text style={styles.addressFieldTitle}>{label}</Text>
            <Text style={styles.addressFieldValue}>{value}</Text>
        </View>
    )
}

export const Address = (props) => {
    const { address, mobileNumber } = props
    return (
        <View>
            <AddressField icon={Images.street} label={"Street"} value={address.streetAddress} />
            <AddressField label={"City"} value={address.city} />
            <AddressField label={"State"} value={address.state.name} />
            <AddressField label={"Zip"} value={address.zipCode} />
            <AddressField icon={Images.phone} label={"Phone"} value={mobileNumber} />

        </View>
    )
}


class PersonalDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showLess: false,
        }
    }

    onEditPress = () => {
        const params = {
            personalDetails: this.props.personalDetail,
            imageData: this.props.profileImgData,
            isPatient: this.props.isPatient
        }
        this.props.goToEditPersonalDetails(PATH ? PATH.EDIT_PERSONAL_DETAILS : null, params)

    }

    renderAffliationComponent = (details) => {
        if (details.profileType === UserProfileType.Organization) return null
        return (
            <View style={styles.serviceDataContainer}>
                <CoreoImage style={styles.icon} source={Images.badge} />
                <Text style={styles.serviceName}>{details.affiliationName}</Text>
            </View>
        )
    }

    onPressFun = () => { this.setState({ showLess: !this.state.showLess }) }
    render() {
        const { profileImgData, personalDetail, profilePercentage,isPatient } = this.props
        if (_.isNil(personalDetail)) return null

        if (personalDetail.address && personalDetail.address.length > 0) {
            const address = personalDetail.address[personalDetail.address.length - 1]
            addressComponent = this.state.showLess ? <Address address={address} mobileNumber={personalDetail.phoneNumber} /> : null
            showMoreOrLessComponent =
                <View style={styles.showDetails}>
                    <Text style={styles.serviceName}>{displayText}</Text>
                    <TouchableOpacity style={styles.arrowIcon} onPress={this.onPressFun}>
                        <Icon {...icon} size={setFontSize(18)} color={THEME_PRIMARY_COLOR} />
                    </TouchableOpacity>
                </View>

        }

        return (
            <View style={styles.container}>
                <CoreoImage source={Images.CircularBg} style={styles.bg} />
                <NavBar onPress={this.props.popRoute} isEditable={this.props.isEditable}
                    onEditPress={this.onEditPress}
                />
                <ProfilePicAndDetails profilePic={profileImgData.image}
                    details={personalDetail} profilePercentage={profilePercentage} userType={this.props.userType} params={this.props.params} />
                <View style={styles.divider} />
                <Text style={styles.descriptionHeader}>Description</Text>
                <Text style={styles.description}>{personalDetail.description}</Text>
                <View style={styles.divider} />
                <Text style={styles.descriptionHeader}>Primary Phone No.</Text>
                {/* Patch for services API WRONG DATA */}
                <Text style={styles.description}>{normalizePhone(personalDetail.phoneNumber ? (personalDetail.phoneNumber ? personalDetail.phoneNumber : '') : (personalDetail.contactNumber ? personalDetail.contactNumber : ''))}</Text>
                {isPatient ?
                    <View>
                        <View style={styles.divider} />
                        <Text style={styles.descriptionHeader}>Emergency Contact</Text>
                        <Text style={styles.description}>{normalizePhone(personalDetail.emergencyContact ? (personalDetail.emergencyContact ? personalDetail.emergencyContact : '') : (personalDetail.contactNumber ? personalDetail.contactNumber : ''))}</Text>
                    </View> : null}
            </View>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        popRoute: () => dispatch(onBack()),
        getImageIndividual: (data) => dispatch(action.getImageIndividual(data)),
        getPersonalDetail: (data) => dispatch(action.getPersonalDetail(data)),
        uploadImg: data => dispatch(action.uploadImg(data)),
        getImage: (data) => dispatch(action.getImage(data)),
        getGenderDetail: (data) => dispatch(action.getGenderDetail(data)),
        getCityDetail: (data) => dispatch(action.getCityDetail(data)),
        goToEditOrganizationDetails: (screen, params) => dispatch(navigateToScreenMainStack(screen, params)),
        goToEditPersonalDetails: (screen, params) => dispatch(navigateToScreenMainStack(screen, params)),
        getProfilePercentage: (params) => dispatch(action.getProfilePercentage(params))

    }
}

function mapStateToProps(state, props) {
    let params = props.params;
    let profileStateObj = state.profileState;
    let authState = state.authState
    let profileState = {
        personalDetail: profileStateObj && state.profileState.PersonalDetailState.personalDetail,
        profileImgData: profileStateObj && state.profileState.PersonalDetailState.imageData,
        profilePercentage: profileStateObj && state.profileState.PersonalDetailState.profilePercentage
    }
    const { impersonatedDetails } = profileStateObj && state.profileState.PersonalDetailState || {}
    if (params && params.id !== global.currentUserPatientId) {
        profileState = {
            personalDetail: impersonatedDetails && impersonatedDetails[params.id] && impersonatedDetails[params.id].personalDetail ? impersonatedDetails[params.id].personalDetail : null,
            profileImgData: impersonatedDetails && impersonatedDetails[params.id] && impersonatedDetails[params.id].imageData ? impersonatedDetails[params.id].imageData : "",
            profilePercentage: impersonatedDetails && impersonatedDetails[params.id] && impersonatedDetails[params.id].profilePercentage ? impersonatedDetails[params.id].profilePercentage : 0
        }
    }
    return {
        userState: authState && state.authState.userState,
        selectedPatientInfo: authState && authState.userState && state.authState.userState.selectedPatientInfo,
        updatePersonalDetailSuccess: profileStateObj && state.profileState.PersonalDetailState
            .updatePersonalDetailSuccess,
        genderDetail: profileStateObj && state.profileState.PersonalDetailState.genderDetail,
        userType: authState && authState.userState && state.authState.userState.userType,
        userCTType: authState && authState.userState && state.authState.userState.userInfo.userType,
        ...profileState
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails);