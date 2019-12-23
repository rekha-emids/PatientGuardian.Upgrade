import React from 'react';
import Icon from '../../../components/Base/Icon'
import { connect } from 'react-redux';
import { View, Text, Platform, TouchableOpacity, KeyboardAvoidingView,InteractionManager } from 'react-native';
import { CoreoImage, CoreoCard } from '../../../components'
import Images from '../../../assets/images'
import { onBack } from '../../../redux/navigation/actions'
import * as action from '../../../redux/serviceProviderProfile/PersonalDetail/actions'
import { getProfilePercentage } from '../../../redux/serviceProviderProfile/ProgerssIndicator/actions'
import { setFontSize, setValueBasedOnWidth } from '../../../utils/deviceDimensions';
import _ from 'lodash';
import Icons from '../../../assets/images/Icons';
import { UserProfileType, ENTITY_SERVICE_PROVIDER } from '../../../constants/constants'
import ProgressCircle from 'react-native-progress-circle'
import { BORDER_BACKGROUND, THEME_PRIMARY_COLOR } from '../../../constants/theme';
import {  isIOS } from '../../../utils/appUtils'
import styles from './styles'
import images from '../../../assets/images';
import { normalizePhone } from '../../../utils/renderFields';
import UrlLink from '../../../components/Base/UrlLink';


export const NavBar = (props) => {
    __DEV__ && console.log("props in NavBar is: ",props)
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
        </View>
    )
}

export const ProfilePicAndDetails = (props) => {
    __DEV__ && console.log("props in profilePicAndDetails: ",props)
    const { profilePic, details, percentage } = props
    let name = details.firstName + ' ' + details.lastName
    let ratingComponent =  <View style={styles.starIconView}>
    <Icon name={isIOS() ? 'md-star' : 'ios-star'} style={styles.starIcon} />
    <Text style={styles.columnValue}>{" " + details.rating}</Text>
</View>
    let genderComponent =
        <View style={styles.genderContainer}>
            <Text style={styles.gender}>{details.genderName}</Text>
            <View style={styles.dot}/>
            <Text style={styles.gender}>{`${details.age} Yrs Old`}</Text>
            <View style={styles.dot}/>
            <Text style={styles.gender}>{`${details.yearOfExperience} Yrs Exp`}</Text>
        </View>
    let experienceComponent = null
    if (props.isEntityUser) {
        // ratingComponent = null
        name = details.entityName
        genderComponent = null
        // experienceComponent = <Text style={styles.gender}>{details.yearOfExperience} Yrs in Business</Text>
    }
    let nameComponent = <Text style={styles.name}>{name}</Text>
    let urlComponent = null
    let assignedBy = null
    if (props.isEntityServiceProvider) {
        urlComponent = <UrlLink style={[styles.serviceName,{color:THEME_PRIMARY_COLOR}]} 
            url={details.entity.websiteUrl}
        numberOfLines={1}>{details.entity ? details.entity.websiteUrl : ""}</UrlLink>
        assignedBy = <Text style={[styles.serviceName, styles.paddingSingleLine]} numberOfLines={1}>{details.entity ? "Assigned by: " + details.entity.assignedBy : ""}</Text>
    }
    return (
            <View style={styles.profilePicAndDetailsContainer}>
                <View style={styles.profilePicView}>
                <View>
                    <ProgressCircle
                        percent={percentage}
                        radius={setValueBasedOnWidth(107/2)}
                        borderWidth={setValueBasedOnWidth(4)}
                        color='#2ab498'
                        shadowColor={BORDER_BACKGROUND}
                        bgColor={BORDER_BACKGROUND}
                    >
                        <CoreoImage style={styles.profilePic} resizeMode={CoreoImage.resizeMode.cover} source={profilePic} />
                    </ProgressCircle>
                    </View>
                    {!props.isEntityServiceProvider && <CoreoCard style={[{flexDirection: 'column',alignItems:'center',justifyContent:'space-between'}]}>
                        <View style={styles.ratingView}>{ratingComponent}</View>
                    </CoreoCard>}
                
                </View>
                <View style={styles.userDetails}>
                    {nameComponent}
                    {
                        props.isEntityServiceProvider
                        ?
                        <React.Fragment>
                            <Text style={styles.gender}>{details.genderName}</Text>
                            <View style={styles.feesBorder}>
                                <Text style={styles.fee}>
                                    ${details.hourlyRate}
                                    <Text style={styles.duration}>/hr</Text>
                                </Text>
                            </View>
                            {assignedBy}
                            {urlComponent}
                        </React.Fragment>



                        :
                        <React.Fragment>
                            {experienceComponent}
                            {genderComponent}
                            {props.isEntityUser ?
                            <Text style={styles.serviceName}>{details.yearOfExperience} Yrs in Business</Text>
                            : 
                            !props.isEntityServiceProvider && !props.isEntityUser?<View style={styles.feesBorder}>
                            <Text style={styles.fee}>
                                ${details.hourlyRate}
                                <Text style={styles.duration}>/hr</Text>
                            </Text>
                        </View>:null}
                        </React.Fragment>
                    }
                   
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
            <AddressField icon={Images.street} label={"Street"} value={address ? address.streetAddress:""} />
            <AddressField label={"City"} value={address?address.city:""} />
            <AddressField label={"State"} value={address?address.state.name:""} />
            <AddressField label={"Zip"} value={address?address.zipCode:""} />
            <AddressField icon={Images.phone} label={"Phone"} value={mobileNumber ? normalizePhone(mobileNumber) : ""} />
        </View>
    )
}

export const RatingAndExperience = (props) => {
    const { details } = props
    __DEV__ && console.log("props in rating and experience: ",props)
    if (details.serviceProviderType !== ENTITY_SERVICE_PROVIDER) return null
    return (
        <View style={styles.ratingAndExperianceTable}>
            <View style={styles.column}>
                <Text style={styles.columnTextPadding}>
                    Rating
                </Text>
                <View style={styles.starIconView}><Text style={styles.columnValue}>{details.rating}</Text>
                    <Icon name={isIOS() ? 'md-star' : 'ios-star'} style={styles.starIcon} />
                </View>
            </View>
            <View style={styles.divider} />
            {details.serviceProviderTypeId === 1 ?
                <View style={styles.column}>
                    <Text style={styles.columnText}>
                        Experience
                </Text>

                    <Text style={styles.columnValue}>{details.yearOfExperience} Yrs</Text>
                </View> :
                <View style={styles.column}>
                    <Text style={styles.columnText}>
                        Yrs in Business
                </Text>
                    <Text style={styles.columnValue}>{details.yearOfExperience}</Text>
                </View>}
            <View style={styles.divider} />
            {details.serviceProviderTypeId === 1 ?
                <View style={styles.column}>
                    <Text style={styles.columnText}>
                        Age
                </Text>
                    <Text style={styles.columnValue}>{details.age} Yrs</Text>
                </View> : null}

        </View>
    )
}

class PersonalDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showLess: false
        }
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(this.getPersonalDetailsData);
        this.getPersonalDetailsData()
    }

    getPersonalDetailsData = () => {
        this.props.getProfilePercentage(this.props.spId)
        this.props.getPersonalDetail(this.props.spId)
        this.props.getImage(this.props.spId)
      }

    renderAffliationComponent = (details) => {
        let url = details.affiliationName
        if (details.serviceProviderType && details.serviceProviderType.toLowerCase() !== UserProfileType.Individual.toLocaleLowerCase()) return null
        return (
            <View style={styles.serviceDataContainer}>
                <CoreoImage style={styles.icon} source={Images.badge} />
                <Text style={styles.serviceName}>Affiliated to {url}</Text>
            </View>
        )
    }

    render() {
        const { profileImgData,hideNavbar, personalDetail, profilePercentage, isEntityUser } = this.props
        if (_.isNil(personalDetail)) return null

        let addressComponent = null

        let displayText = "See Less";
        let icon = Icons.arrowUp;
        if (!this.state.showLess) {
            displayText = "See More"
            icon = Icons.arrowDown;
            addressComponent = null
        }

        let showMoreOrLessComponent = null
        if (personalDetail.address && personalDetail.address.length > 0 || (personalDetail.phoneNumber&& personalDetail.phoneNumber.length>0)) {
            const address = personalDetail.address[0]
            addressComponent = this.state.showLess ? <Address address={address} mobileNumber={personalDetail.phoneNumber} /> : null
            showMoreOrLessComponent =
                <TouchableOpacity style={styles.showDetails} onPress={() => { this.setState({ showLess: !this.state.showLess }) }}>
                    <Text style={styles.serviceName}>{displayText}</Text>
                    <View style={styles.arrowIcon}>
                        <Icon {...icon} size={setFontSize(18)} color={THEME_PRIMARY_COLOR} />
                    </View>
                </TouchableOpacity>

        }
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.wrapperView}>
                <View style={styles.container}>
                {hideNavbar ? null :
                    <View> 
                        <CoreoImage source={Images.CircularBg} style={styles.bg} />
                        <NavBar onPress={this.props.popRoute} isEditable={this.props.isEditable}
                        />
                    </View>
                }
                    <ProfilePicAndDetails isEntityServiceProvider = {personalDetail.serviceProviderType === ENTITY_SERVICE_PROVIDER} isEntityUser={isEntityUser} profilePic={profileImgData && profileImgData.image ? {uri:profileImgData.image} : images.profile_icon}
                        details={personalDetail} percentage={profilePercentage} />
                    {this.renderAffliationComponent(personalDetail)}
                    {addressComponent}
                    {showMoreOrLessComponent}
                    <RatingAndExperience details={personalDetail} />
                    <Text style={styles.descriptionHeader}>Description</Text>
                    <Text style={styles.description}>{personalDetail.description}</Text>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        popRoute: () => dispatch(onBack()),
        getProfilePercentage: (spId) => dispatch(getProfilePercentage(spId)),
        getPersonalDetail: (spId) => dispatch(action.getPersonalDetail(spId)),
        getImage: (spId) => dispatch(action.getImage(spId)),
    }
};

function mapStateToProps(state) {
    let impersonateProfileState = state.impersonateProfileState;
    return {
        personalDetail: impersonateProfileState && state.impersonateProfileState.PersonalDetailState.personalDetail,
        updatePersonalDetailSuccess: impersonateProfileState && state.impersonateProfileState.PersonalDetailState
            .updatePersonalDetailSuccess,
        profileImgData: impersonateProfileState && state.impersonateProfileState.PersonalDetailState.imageData,
        profilePercentage: impersonateProfileState && state.impersonateProfileState.progressIndicatorState.profilePercentage
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails);
