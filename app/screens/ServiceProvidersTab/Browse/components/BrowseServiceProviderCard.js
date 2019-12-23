import React, { Component } from 'react'
import { View, Modal, Platform, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { CoreoCard, ModalPopup } from '../../../../components/LevelOne';
import styles from '../../RequestsTab/ServiceProviderCard/styles'
import { CoreoImage, CoreoText, CoreoHighlightButton, CoreoScrollView } from '../../../../components';
import Icon from '../../../../components/Base/Icon';
import Icons from '../../../../assets/images/Icons';
import { setFontSize, setValueBasedOnWidth } from '../../../../utils/deviceDimensions';
import { CoreoProfileImage } from '../../../../components/Base/Image/Image';
import { getEngagedServiceRequests, inviteServiceProvider, hireServiceProvider } from '../../../../redux/serviceProvidersTab/browseTab/actions';
import { favouriteSp } from '../../../../redux/serviceProvidersTab/requestsTab/actions';

import serviceRequestStyles from '../../../VisitSelection/VisitServiceList/ServiceRequestCard/styles'
import { getFormatedDate } from '../../../../utils/momentUtil';
import { getServiceIcon } from '../../../../utils/appUtils';
import { OPEN, USER_TYPES, DATE_FORMATS } from '../../../../constants/constants';
import { cancelInvitation } from '../../../../redux/serviceProvidersTab/requestsTab/actions';
import { Popup } from '../../../../components/Base/PopOver';
import { onCreateNewConversation } from '../../../../redux/asyncMessages/actions'
import { createVideoConference } from '../../../../redux/telehealth/actions'
import images from '../../../../assets/images';

import { navigateToScreenMainStack } from '../../../../redux/navigation/actions';
import { PATH } from '../../../../routes';
import { isAPIFetching } from '../../../../utils/AppAPIUtils';
import { makeACall } from '../../../../utils/communicationUtils';
import { SELECTED_CARD_BACKGROUND, POPUP_PRIMARY_COLOR, WHITE, STAR_ICON_COLOR } from '../../../../constants/theme';
import { getpaymentsCardList } from '../../../../redux/menu/payment/actions';
import AlertPopup from '../../../../components/LevelOne/AlertPopup';
class BrowseServiceProviderCard extends Component {
    selectedCategoryDescription = ""
    constructor(props) {
        super(props)
        this.state = {
            selectedServiceRequestId: -1,
            isModalOpen: false,
            showCallModal: false,
            showHiredSuccessModal: false,
            isFavoriteServiceProvider: props.isFavourite,
            showNoNumber: false
        }
    }

    onClickServicerequest = (id) => {
        this.setState({ selectedServiceRequestId: id })
    }
    renderStatus = () => {
        let inviteComponent = null
        if (this.state.selectedServiceRequestId !== -1) {
            const { serviceRequests } = this.props
            let filteredServiceRequests = serviceRequests && serviceRequests.filter(request => request.serviceRequestId === this.state.selectedServiceRequestId)
            this.selectedCategoryDescription =filteredServiceRequests[0] ? filteredServiceRequests[0].serviceCategoryDescription : this.selectedCategoryDescription
            let status = filteredServiceRequests[0] ? filteredServiceRequests[0].status : ""
            if (status) {
                switch (status.toLowerCase()) {
                    case OPEN.toLowerCase():
                        inviteComponent = <CoreoHighlightButton style={styles.hireButton} onPress={this.onPressHire} textStyle={[styles.textStyle, { color: WHITE }]} text={"Request"} />
                        break
                    default:
                        break
                }
            }
        }
        return inviteComponent
    }

    getServiceRequests = () => {
        const { serviceProviderId } = this.props
        this.props.getEngagedServiceRequests(serviceProviderId)
    }
    openEngageRequests = () => {
        this.setState({ isModalOpen: true })
    }

    onPressEngage = () => {
        const { serviceProviderId } = this.props
        this.props.getEngagedServiceRequests(serviceProviderId, this.openEngageRequests)
    }

    onPressCancel = () => {
        this.setState({ isModalOpen: false, selectedServiceRequestId: -1 })
    }

    onPressInvite = () => {
        this.props.inviteServiceProvider(this.state.selectedServiceRequestId, this.props.serviceProviderId, this.getServiceRequests, true)
        this.setState({ selectedServiceRequestId: -1 })
    }

    onPressUnInvite = () => {
        this.props.cancelInvitation(this.state.selectedServiceRequestId, this.props.serviceProviderId, this.getServiceRequests, true)
        this.setState({ selectedServiceRequestId: -1 })
    }

    getPaymentCardsList = () => {
        this.props.getPaymentCardsList(this.engageSP)
    }

    engageSP = (cards) => {
        if(cards.length === 0){
            this.showAddCreditModal && this.showAddCreditModal.open()
        }else{
            let onSuccess = () => {
                this.setState({isModalOpen: false, showHiredSuccessModal: true})
                this.getServiceRequests()
            }
            this.props.hireServiceProvider(this.state.selectedServiceRequestId, this.props.serviceProviderId, onSuccess, true)    
        }
    }

    onPressHire = () => {
        this.setState({isModalOpen: false}, this.getPaymentCardsList)
    }

    onPhonePress = async (data) => {
        if(data === null || data === '' ){
            this.showNoNumberModal();
        }else{
            makeACall(data)
    }
    }

    showNoNumberModal = () => {
        this.setState({showNoNumber : true})
    }

    onPressConversation(data) {
        let userDetails =  [{
            userId: data.coreoHomeUserId,
            participantType: USER_TYPES.SERVICE_PROVIDER,
            participantId: data.serviceProviderId
        }]
        let requestObject = {
            context: null,
            participantList: userDetails,
            title: null
        }
        this.props.onCreateNewConversation(requestObject)
    }
    onTeleHealthPress(data) {
        let dataList = [
            {
                userId: data.coreoHomeUserId,
                participantType: USER_TYPES.SERVICE_PROVIDER,
                participantId: data.serviceProviderId,
                firstName: data.firstName,
                lastName: data.lastName,
                thumbNail: data.image
            }
        ];
        this.props.createVideoConference(dataList);
    }


    renderServiceRequests = () => {
        const { serviceRequests } = this.props
        if(isAPIFetching(this.props.getEngageServiceRequests)) return null
        if ((!serviceRequests || !serviceRequests.length)) return <View style={styles.waterMarkContainer}><CoreoText style={styles.waterMark}>No open service requests are available</CoreoText></View>
        return serviceRequests.map((serviceRequest) => {
            let id = null
            let title = serviceRequest.types && serviceRequest.types.map((type, index) => {
                if (index === 0 && !id) {
                    id = type.serviceTypeId
                }
                return type.serviceTypeDescription
            })
            let backgroundStyle = this.state.selectedServiceRequestId === serviceRequest.serviceRequestId ? { backgroundColor: SELECTED_CARD_BACKGROUND } : {}
            title = title ? title.join(", ") : ""
            const occurance = getFormatedDate(serviceRequest.postedDate, DATE_FORMATS.DD_MMM);
            let key = `${serviceRequest.serviceRequestId}_${serviceRequest.status}`
            return (
                <TouchableOpacity key={key} style={[serviceRequestStyles.cardStyle, serviceRequestStyles.cardInformationView, styles.srCard, backgroundStyle]} onPress={() => { this.onClickServicerequest(serviceRequest.serviceRequestId) }}>
                    <View style={[serviceRequestStyles.imageItemView, serviceRequestStyles.imageMarginTop]}>
                        <CoreoImage
                            source={getServiceIcon("serviceType" + id)}
                            style={serviceRequestStyles.imageItemSize}
                        />
                    </View>
                    <View style={serviceRequestStyles.descriptionView}>
                        <CoreoText style={serviceRequestStyles.requestTitle} numberOfLines={1}>{title}</CoreoText>
                        <View style={serviceRequestStyles.dateSection}>
                            <CoreoText style={serviceRequestStyles.requestFrequency}>{serviceRequest.recurringPattern}  | {`Posted on ${occurance}`}</CoreoText>
                            <View style={serviceRequestStyles.contentCenter}>
                                <CoreoText style={serviceRequestStyles.requestStatusStyle}>
                                    {serviceRequest.status ? serviceRequest.status : ''}
                                </CoreoText>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        })
    }

    onClickFavourite = (spId, isFavorite, onSuccess) => {
        this.props.favouriteSp(spId, isFavorite, onSuccess)
    }

    onSuccess = () => {
        this.setState({
            isFavoriteServiceProvider: !this.state.isFavoriteServiceProvider
        })
        this.props.apiSaga();
    }
    onClickSp = () => {
        let params = {
            id: this.props.serviceProviderId,
            IsEntityUser : this.props.isEntityUser
        }
        this.props.goToSpProfile(params)
    }

    onPressServiceRequest = () => {
        this.setState({isModalOpen: false}, () => {
            let params = {
                navigator: this.props.navigation,
                spId: this.props.serviceProviderId
            }
         this.props.goToPostServiceRequest(params)
        })
    }

    render() {
        const { image, firstName, lastName, hourlyRate, types, rating, age, yearOfExperience, isEntityUser, phoneNumber, serviceProviderId, isFavorite, isFavourite, isHired } = this.props
        let icon = Platform.OS === "ios" ? Icons.starIos : Icons.starAndroid
        let typesData = types ? types : this.props.serviceTypes
        let serviceTypes = typesData && typesData.map((type) => {
            return types ? type.serviceTypeDescription : type
        })
        serviceTypes = serviceTypes ? serviceTypes.join(", ") : ""
        return (
            <CoreoCard style={styles.cardContianer}>
                <View>
                    <View style={styles.detailsContainer}>
                        <View style={styles.picWrapper}>
                            <TouchableOpacity onPress={() => {
                                this.onClickSp()
                            }} style={styles.picOuterLayer}>
                                <CoreoProfileImage pic={image ? { uri: image } : null}
                                    style={styles.pic} />
                            </TouchableOpacity>

                        </View>
                        <View style={styles.flexCenter}>
                            <View style={styles.nameAndConstContainer}>
                            <TouchableOpacity onPress={() => {
                                this.onClickSp()
                            }}><CoreoText style={styles.name} numberOfLines={1}>{firstName} {lastName}</CoreoText>
                            </TouchableOpacity>
                                 <View style={styles.dotsImage}>
                                    <Popup showModal={true} label1='Phone Call' onPhonePress={() => this.onPhonePress(phoneNumber)} label2='Conversation' onAsyncPress={() => this.onPressConversation(this.props)} label3='Video Conference' onTelePress={() => this.onTeleHealthPress(this.props)} />
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => {
                                this.onClickSp()
                            }} style={[styles.rowCenter, styles.marginSpace]}>
                                <Icon color={STAR_ICON_COLOR} {...icon} size={setFontSize(13)} />
                                <CoreoText style={styles.greyText}>{` ${rating}`}</CoreoText>
                                {isEntityUser ? <View /> : <View style={styles.dot} />}
                                {isEntityUser ? <View /> : <CoreoText style={styles.greyText}>{age} Yrs Old</CoreoText>}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.onClickSp()
                            }} style={[styles.rowCenter, { paddingRight: setValueBasedOnWidth(15) }]}>
                                <CoreoText style={[styles.thickText, styles.smallText, styles.fixWitdh]} numberOfLines={1} >{serviceTypes}</CoreoText>

                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={styles.bottomRowStyle}>
                        {isEntityUser ? <View /> : <View style={styles.hourTextWrapper}>
                   <CoreoText style={styles.constText}>${hourlyRate}</CoreoText>
                   <CoreoText style={styles.hourText}>/hr</CoreoText>
                   </View>}
                        <TouchableOpacity onPress={() => this.onClickFavourite(serviceProviderId, !this.state.isFavoriteServiceProvider, this.onSuccess)}>
                            <CoreoImage source={this.state.isFavoriteServiceProvider ? images.favourite_filled : images.favourite_outline} style={styles.likeIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.horizontalDivider} />
                <CoreoHighlightButton onPress={this.onPressEngage} style={[styles.buttonContianer, styles.engageButton]} textStyle={styles.buttonText} text={"Engage"} />
                <Modal transparent={true} visible={this.state.isModalOpen}>
                    <View style={styles.transparentModal}>
                        <View style={styles.modalContainer}>
                            <CoreoText style={[styles.thickText, styles.smallText, styles.purpleText, styles.marginBottom]}> Select a service request to Engage</CoreoText>
                            <CoreoScrollView>
                                {this.renderServiceRequests()}
                            </CoreoScrollView>
                            <View style={styles.footerContainer}>
                                <CoreoHighlightButton style={styles.cancelButton} onPress={this.onPressServiceRequest} textStyle={styles.textStyle} text={"New Request"} />
                                <View style={styles.footer}>
                                    <CoreoHighlightButton style={styles.cancelButton} onPress={this.onPressCancel} textStyle={styles.textStyle} text={"Close"} />
                                    {this.renderStatus()}
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <ModalPopup
                    visible={this.state.showHiredSuccessModal}
                    primaryButton="Ok"
                    primaryColor={POPUP_PRIMARY_COLOR}
                    onConfirm={() => this.setState({
                        showHiredSuccessModal: !this.state.showHiredSuccessModal
                    })}
                >
                    <CoreoText style={styles.message}>You have engaged {firstName} {lastName} for {this.selectedCategoryDescription}.</CoreoText>
                </ModalPopup>
                <ModalPopup
                        visible={this.state.showNoNumber}
                        primaryButton="OK"
                        primaryColor="#3c1053"
                        onConfirm={() => {
                            this.setState({
                                showNoNumber: false,
                            })
                        }}
                    >
                        <Text style={styles.message}>No number found.</Text>
                    </ModalPopup>
                    <AlertPopup
                    ref={ref => (this.showAddCreditModal = ref)}                 
                    primaryButtonText="Add credit card"
                    secondaryButtonText="Cancel"
                    onConfirm={this.props.goToPaymentScreen}
                    alertText={"To complete the hiring process,a credit card is required.Please add a credit card to continue."}
                />
            </CoreoCard>
        )
    }
}

function mapStateToProps(state) {
    const serviceProvidersTabState = state && state.serviceProvidersTabState && state.serviceProvidersTabState.browseState;
    const userState = state && state.authState && state.authState.userState;
    return {
        serviceRequests: serviceProvidersTabState.serviceRequests,
        selectedServiceCategoryId: serviceProvidersTabState.selectedServiceCategoryId,
        patientType: userState.userType,
        patientId: userState.patientId,
        getEngageServiceRequests: serviceProvidersTabState.getEngageServiceRequests
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onCreateNewConversation: (data) => dispatch(onCreateNewConversation(data)),
        createVideoConference: data => dispatch(createVideoConference(data)),
        goToSpProfile: (params) => dispatch(navigateToScreenMainStack(PATH ? PATH.SERVICE_PROVIDER_PROFILE : null, params)),
        getEngagedServiceRequests: (data, onSuccess) => dispatch(getEngagedServiceRequests(data, onSuccess)),
        inviteServiceProvider: (srId, spId, onSuccess, displayLoader) => dispatch(inviteServiceProvider(srId, spId, onSuccess, displayLoader)),
        hireServiceProvider: (srId, spId, onSuccess, displayLoader) => dispatch(hireServiceProvider(srId, spId, onSuccess, displayLoader)),
        cancelInvitation: (srId, spId, onSuccess, displayLoader) => dispatch(cancelInvitation(srId, spId, onSuccess, displayLoader)),
        favouriteSp: (spId, isFavorite, onSuccess) => dispatch(favouriteSp(spId, isFavorite, onSuccess)),
        goToPostServiceRequest: (params) => dispatch(navigateToScreenMainStack(PATH ? PATH.REQUIREMENTS_SCREEN : null, params)),
        getPaymentCardsList: (onSuccess) => dispatch(getpaymentsCardList(onSuccess)),
        goToPaymentScreen: () => dispatch(navigateToScreenMainStack(PATH ? PATH.WEB_VIEW_ADD_CARD : null))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseServiceProviderCard)