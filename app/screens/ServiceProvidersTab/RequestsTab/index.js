import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, ScrollView, TouchableOpacity, Keyboard} from 'react-native'
import { Item, Icon} from 'native-base'
import {getpaymentsCardList} from '../../../redux/menu/payment/actions'
import { CoreoTextInput, CoreoOpacityButton, CoreoText, CoreoHighlightButton, CoreoImage,ModalPopup } from '../../../components';
import {getVisitServiceEligibilityStatus,getPatientRequests,favouriteSp,inviteServiceProvider,cancelInvitation, getServiceProviders,getSortedServiceProviders, updateFilterState, searchForServiceProviders, getFilteredServiceProviders, changeSelectedServiceRequestId, hireServiceProvider, updateNormalizedPointOfServices} from '../../../redux/serviceProvidersTab/requestsTab/actions'
import styles from './styles';
import {navigateToScreenMainStack} from '../../../redux/navigation/actions'
import ServiceRequestCard from './ServiceRequestCard';
import ServiceProviderCard from './ServiceProviderCard';
import ServiceRequestFilter from '../../VisitSelection/VisitServiceList/ServiceRequestFilter';
import { setValueBasedOnWidth } from '../../../utils/deviceDimensions';
import { RequestsFilter } from '../../../data/FiltersData';
import {_} from '../../../utils/validations'
import  { empty_request } from '../../../assets/images';
import { PATH } from '../../../routes';
import { ListScrollerAPIWrapper } from '../../../components/LevelOne';
import { OverlayLoaderWrapper } from '../../../components/Base/Preloader/Preloader';
import { isAPIFetching } from '../../../utils/AppAPIUtils';
import { SERVICEPROVIDERS_REQUESTS } from '..';
import {INIT} from '../../../constants/AppAPIConstants'
import { isIOS } from '../../../utils/appUtils';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_NUMBER } from '../../../constants/constants';


class RequestsTab extends Component {
    hiringDetails = {}
    prevSelectedSRId = -1
    cancelInvitationDetails = {}
    selectedServiceCategoryForFilter = {}
    IS_COMPONENT_MOUNTED = false
    isFilterApplied = false
    isSearchApplied = false
    filterRequestObject = {}
    constructor(props) {
        super(props);
        props.navigation && props.navigation.setParams({
            onTabFocus: this.handleTabFocus
        });
        this.state = {
            serviceRequestId: '',
            isFilterOpen: false,
            newest: true,
            isSearchOpen: false,
            searchText: "",
            showAddCreditModal:false,
            showAuthorizeCreditModal:false,
            filterComponentKey: 0,
            keyboard: false,
            keyboardHeight: 0,
            cancelInvitationModal: false
        };
    };
    handleTabFocus = () => {
        if(this.IS_COMPONENT_MOUNTED && !isAPIFetching(this.props.loadingStatus)){
            this.isSearchApplied = false
            this.isFilterApplied = false
            this.apiCall()
            this.setState({searchText: ""})
        }
        this.IS_COMPONENT_MOUNTED = true
      };


    componentDidMount () {
        this.apiCall()
        this.props.navigation && this.props.navigation.addListener('didFocus', (route) => {
            global.selectedTab = SERVICEPROVIDERS_REQUESTS
            this.handleTabFocus()
        });
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this.setState({ keyboard: false,keyboardHeight:0 }))
    }

     _keyboardDidShow(e) {
        let keyboardHeight = e.endCoordinates.height
        this.setState({ keyboard: true, keyboardHeight: keyboardHeight })
    }

    onResetFilter = () => {
        this.isFilterApplied = false
        this.isSearchApplied = false
        this.setState({isFilterOpen: false},  () => {
            this.apiCall(this.prevSelectedSRId)
        })
    }

    componentWillReceiveProps(nextProps){
        if(this.prevSelectedSRId !== nextProps.requestsState.selectedServiceRequestId && 
            Number.isInteger(nextProps.requestsState.selectedServiceRequestId)){
                this.prevSelectedSRId = nextProps.requestsState.selectedServiceRequestId
            }
    }
    

    apiCall = (requestId) => {
        const {selectedServiceRequestId} = this.props.requestsState || {}
        this.props.getPatientRequests(requestId || selectedServiceRequestId)
    }

    apiToGetServiceProviders = (requestObject) => {
        const {selectedServiceRequestId} = this.props.requestsState
        if(this.isFilterApplied){
            this.props.getFilteredServiceProviders({...this.filterRequestObject, fromPage: requestObject.pageNumber, toPage: requestObject.pageSize, requestType: requestObject.requestType})
        }else if(this.isSearchApplied){
            this.props.searchForServiceProviders(this.state.searchText, selectedServiceRequestId, requestObject)
        }else {
            this.props.getServiceProviders(selectedServiceRequestId, requestObject)
        }
    }
    
    onClickServiceRequest = (id, serviceRequestDetails) => {
        const {selectedServiceRequestId} = this.props.requestsState
        if(selectedServiceRequestId !== id){
            this.props.changeSelectedServiceRequestId(Number(id))
            this.props.getServiceProviders(Number(id))
            this.setState({filterComponentKey: this.state.filterComponentKey + 1})
        }
        let address = {
            addressId: serviceRequestDetails.patientAddressId,
            city: serviceRequestDetails.city,
            street: serviceRequestDetails.streetAddress,
            stateName: serviceRequestDetails.stateName,
            zip: serviceRequestDetails.zipCode,
            streetAddress: serviceRequestDetails.streetAddress,
            state: serviceRequestDetails.stateName,
            lat: serviceRequestDetails.lat,
            lon: serviceRequestDetails.lon,
            addressTypeId: serviceRequestDetails.patientAddressId,

        }
        this.setState({searchText: ""});
        this.props.updateNormalizedPointOfServices(address, serviceRequestDetails.patientAddressId)
    }

    renderServiceRequests = (serviceRequests) => {
        const {selectedServiceRequestId} = this.props.requestsState || {}
        let requests = serviceRequests && serviceRequests.map((service, index) => {
            return <ServiceRequestCard onPress={this.onClickServiceRequest} selectedServiceRequestId={selectedServiceRequestId} {...service} key={index} />
        })
        return (
            <ScrollView horizontal contentContainerStyle={styles.scrollStyle}>
                {requests}
                <TouchableOpacity onPress={this.props.goToCreateSRequest} style={[styles.cardContainer]}>
                <CoreoImage source={empty_request} style={styles.editImage} />
                <CoreoText style={styles.requestTitle}>New Service Request</CoreoText>
                </TouchableOpacity>
            </ScrollView>
        )
    }

    onApplyFilter = (data) => {
        let selectedSkills = Object.keys(data.selectedSkills).map(key => data.selectedSkills[key].name)
        let updatedData = {
            category: data.selectedServiceDescription,
            minExperience: _.isNil(data.minExp) ? 0 : data.minExp,
            maxExperience: _.isNil(data.maxExp) ? 50 : data.maxExp,
            skills: selectedSkills,
            serviceTypes: this.selectedServiceCategoryForFilter,
            rating: data.rating,
            minHourlyRate: _.isNil(data.minRate) ? 0 : data.minRate,
            maxHourlyRate: _.isNil(data.maxRate) ? 50  : data.maxRate,
            pointOfservice: null,
            fromPage: DEFAULT_PAGE_NUMBER,
            toPage: DEFAULT_PAGE_SIZE,
            selectedAddressId: data.selectedAddressId,
            requestType: INIT
        }
        if(data.selectedGender){
            updatedData = {
                ...updatedData,
                gender: data.selectedGender
            }
        }
        this.isFilterApplied = true
        this.isSearchApplied = false
        this.filterRequestObject = data
        this.setState({searchText: ""})
        this.props.updateFilterState(data)
        this.props.getFilteredServiceProviders(updatedData)
    }

    onChangeText = (text) => {
        this.setState({searchText: text})
    }

    resetSearch = () => {
        Keyboard.dismiss();
        this.setState({searchText: '', filterComponentKey: this.state.filterComponentKey + 1})
        const {selectedServiceRequestId} = this.props.requestsState
        if(selectedServiceRequestId){
            this.props.changeSelectedServiceRequestId(this.prevSelectedSRId);
            this.props.getServiceProviders(this.prevSelectedSRId)
        }
        this.isSearchApplied = false
        this.isFilterApplied = false
    }

    onSearch = () => {
        this.isSearchApplied =true
        Keyboard.dismiss();
        const {selectedServiceRequestId} = this.props.requestsState
        if(this.state.searchText && this.state.searchText.length){           
            selectedServiceRequestId &&  this.props.searchForServiceProviders(this.state.searchText, this.prevSelectedSRId, {requestType: INIT, pageNumber: DEFAULT_PAGE_NUMBER, pageSize: DEFAULT_PAGE_SIZE})
        }else {
            selectedServiceRequestId && this.props.changeSelectedServiceRequestId(this.prevSelectedSRId)
            selectedServiceRequestId && this.props.getServiceProviders(this.prevSelectedSRId)
        }
        this.setState({isSearchOpen: false, filterComponentKey: this.state.filterComponentKey + 1})
        this.isFilterApplied = false
    }

    onHireClicked =(serviceRequestId, serviceProviderId, serviceProviderTypeId)=>{
        let data={
            serviceRequestId,
            serviceProviderId
        }
        this.hiringDetails = data
        if(serviceProviderTypeId === 2){
            this.props.hireSp(this.hiringDetails.serviceRequestId, this.hiringDetails.serviceProviderId)
        } else {
            this.props.getpaymentsCardList(this.onPaymentSuccess)
            this.props.getVisitServiceEligibilityStatus(data, this.onEligibilitySuccess)
        }
    }
    onPaymentSuccess = (paymentCardList) => {
        if(paymentCardList && paymentCardList.length === 0){
            this.setState({showAddCreditModal: true})
        }
    }

    onEligibilitySuccess = (data) => {
        if(data){
            this.setState({showAuthorizeCreditModal: true})
        }else{
            this.props.hireSp(this.hiringDetails.serviceRequestId, this.hiringDetails.serviceProviderId)
        }
    }

    renderBelowSortingAndFilter = () => {
        if(this.state.isSearchOpen){
            return (
                <View style={styles.sortFilterStyle}>
                    <CoreoOpacityButton
                        style={styles.filter}
                        text='Filter'
                        textStyle={styles.requestTitle}
                        onPress={() => {
                            this.setState({isFilterOpen: true})
                            this.setState({isSearchOpen: false})
                        }}
                    />
                </View> 
            )
        }
        return null
    }

    onChangeSearchText = (value) =>{
        if(value && value.length){
            this.setState({searchText: value})
        }
        else{
            this.setState({searchText: ""})
            this.props.changeSelectedServiceRequestId(this.prevSelectedSRId)
            this.props.getServiceProviders(this.prevSelectedSRId)
        }
    }

    HeaderComponent = () => {
        const {serviceRequests} = this.props.requestsState
        return (
            <View>
                {this.renderSearchAndSorting()}
                <View>
                    {this.renderServiceRequests(serviceRequests)}
                </View>
            </View>
        )
    }

    renderSearchAndSorting = () => {
        return (
            <View>
                <View style={styles.searchBarContianer}>
                    <Item style={{paddingLeft: setValueBasedOnWidth(8)}}>
                    <Icon name="ios-search" />
                        <CoreoTextInput
                            inputStyle={{width: '65%'}}
                            placeholder="Enter keyword for global search"
                            onChangeText={this.onChangeSearchText}
                            value={this.state.searchText}
                            onSubmitEditing={this.onSearch}
                        />
                        {/* <Input placeholder="Search" onChangeText={this.onChangeText} /> */}
                        <CoreoHighlightButton
                            onPress={this.resetSearch}
                            text="X"
                            textStyle={styles.closeSearchStyle}
                            style={styles.closeSearchContainer}
                        />
                        <CoreoHighlightButton
                            onPress={this.onSearch}
                            text="Search"
                            textStyle={styles.textStyle}
                            style={styles.buttonContainer}
                        />
                    </Item>
                </View>
                <View style={styles.sortFilterStyle}>
                    <CoreoOpacityButton
                        style={styles.filter}
                        text='Filter'
                        textStyle={styles.requestTitle}
                        onPress={() => {
                            this.setState({isFilterOpen: true})
                            this.setState({isSearchOpen: false})
                        }}
                    />
                </View>
            </View>
        )
    }

    onClickFavourite = (spId, isFavourite, onSuccess) => {
        this.props.favouriteSp(spId,isFavourite, onSuccess)
    }

    onClickSp = (id, IsEntityUser) => {
        let params = {
            id, 
            IsEntityUser
        }
        this.props.goToSPProfile(params)
    }

    onInactivity = (onSuccess) => {
        this.setState({isFilterOpen: false}, onSuccess && onSuccess())
    }
    onRefresh = () => {
        this.isFilterApplied = false
        this.isSearchApplied = false
        this.setState({filterComponentKey: this.state.filterComponentKey + 1})
        this.apiCall()
    }

    cancelInvitation = (serviceRequestId, spId, spName) => {
        this.cancelInvitationDetails = {
            serviceRequestId,
            serviceProviderId: spId,
            serviceProviderName: spName
        }
        this.setState({cancelInvitationModal: true})
    }

    HeaderComponent = () => {
        const {serviceRequests} = this.props.requestsState || {}
        return (
            <View>
                {this.renderSearchAndSorting()}
                <View>
                    {this.renderServiceRequests(serviceRequests)}
                </View>
            </View>
        )
    }


    render(){
        const {serviceProviders, serviceRequests,selectedServiceRequestId} = this.props.requestsState || {}
        const servicePrvidersList = serviceProviders && serviceProviders[selectedServiceRequestId] 
        let selectedFilterState = {}
        serviceRequests && serviceRequests.map(request => {
            if(request.serviceRequestId === selectedServiceRequestId){
                let serviceTypeIdArray = request.serviceTypeId.split(",")
                let selectedServiceCategories = {}
                serviceTypeIdArray && serviceTypeIdArray.map(typeId => {
                    selectedServiceCategories = {
                        ...selectedServiceCategories,
                        [typeId]: typeId
                    }
                })
                this.selectedServiceCategoryForFilter = request.serviceType.split(',')
                selectedFilterState = {
                    selectedServiceCategoryId: request.serviceCategoryId,
                    selectedServiceCategories,
                    selectedAddressId: request.patientAddressId,
                    selectedServiceDescription: request.serviceCategoryDescription
                }
            }
        })
        return (
            <OverlayLoaderWrapper isLoading={isAPIFetching(this.props.getEngageServiceRequests)}>

                <View style={[styles.container]}>
                    {!isIOS() ? this.HeaderComponent() : null}
                    <ListScrollerAPIWrapper
                        header={isIOS() ? this.HeaderComponent : () => null}
                        data={_.isNil(servicePrvidersList) ? [] : servicePrvidersList }
                        renderComponent={ServiceProviderCard}
                        onClickInvite={this.props.invitSp}
                        onClickHire={this.onHireClicked}
                        cancelInvitation={this.cancelInvitation}
                        apiSaga={this.apiToGetServiceProviders}
                        alwaysInitialAPI={false}
                        onClickFavourite={this.onClickFavourite}
                        noItemsText={serviceRequests && !serviceRequests.length && !isAPIFetching(this.props.loadingStatus) ? `Click on "New Service Request" to begin`: " "}
                        onRefresh={this.onRefresh}
                        onClickSp={this.onClickSp}
                        canAutomaticRefresh={false}
                        isPaginationEnabled={true}
                        pageSize={DEFAULT_PAGE_SIZE}
                        networkCallStatus={this.props.loadingStatus}
                        itemKey={"serviceProviderId"}
                    />
                </View>
                <ServiceRequestFilter
                    isFilterOpen={this.state.isFilterOpen}
                    onClose={() => this.setState({isFilterOpen: false})}
                    onApplyFilter={this.onApplyFilter}
                    selectedFilterState={selectedFilterState}
                    filters={RequestsFilter}
                    onResetFilter={this.onResetFilter}
                    disableApplyOnCategoryEmpty={true}
                    onInactivity={this.onInactivity}
                    id={this.state.filterComponentKey}
                    editable={false}
                />
                <ModalPopup
                    visible={this.state.showAddCreditModal}
                    primaryButton="Add credit card"
                    secondaryButton="Cancel"
                    primaryColor="#3c1053"
                    secondaryColor="#6c757d"
                    customBtnFlag='true'
                    onConfirm={() => {
                        this.setState({showAddCreditModal:false})
                       this.props.goToPaymentScreen()
                    }}
                    onCancel={() =>this.setState({showAddCreditModal:false})}>
                    <CoreoText style={styles.message}>To complete the hiring process,a credit card is required.Please add a credit card to continue.</CoreoText>
                </ModalPopup>
                <ModalPopup
                    visible={this.state.showAuthorizeCreditModal}
                    primaryButton="Proceed"
                    secondaryButton="Cancel"
                    primaryColor="#3c1053"
                    secondaryColor="#6c757d"
                    customBtnFlag='true'
                    onConfirm={() => {
                        this.setState({showAuthorizeCreditModal:false})
                        this.props.hireSp(this.hiringDetails.serviceRequestId, this.hiringDetails.serviceProviderId)
                    }}
                    onCancel={() =>this.setState({showAuthorizeCreditModal:false})}>
                    <CoreoText style={styles.message}>This Service requires authorization to be covered by insurance plan.You may continue hiring a service provider if you want to directly pay for services until authorization is received.</CoreoText>
                </ModalPopup>
                <ModalPopup
                    visible={this.state.cancelInvitationModal}
                    primaryButton="Yes"
                    secondaryButton="No"
                    primaryColor="#3c1053"
                    secondaryColor="#6c757d"
                    customBtnFlag='true'
                    onConfirm={() => {
                        this.setState({cancelInvitationModal:false})
                        this.props.cancelInvitation(this.cancelInvitationDetails.serviceRequestId, this.cancelInvitationDetails.serviceProviderId)
                    }}
                    onCancel={() =>this.setState({cancelInvitationModal:false})}>
                    <CoreoText style={styles.message}>Do you want to cancel the invitation of {this.cancelInvitationDetails.serviceProviderName}?</CoreoText>
                </ModalPopup>
            </OverlayLoaderWrapper>
        )
    }
}

function mapStateToProps(state){
    const serviceProvidersTabState = state && state.serviceProvidersTabState && state.serviceProvidersTabState.requestsState
    const getEngageServiceRequests = state && state.serviceProvidersTabState && state.serviceProvidersTabState.browseState && state.serviceProvidersTabState.browseState.getEngageServiceRequests 
    return {
        paymentCardList: state.menuState.paymentState.CardList,
        requestsState: serviceProvidersTabState,
        loadingStatus: serviceProvidersTabState.isLoading,
        normalizedPointOfServices: serviceProvidersTabState.normalizedPointOfServices,
        isLoading: state.loadingState.isLoading,
        serviceCategories: state.visitHistoryState.vistServiceHistoryState.serviceCategories,
        getEngageServiceRequests: getEngageServiceRequests
    }
}

function mapDispatchToProps(dispatch){
    return {
        getVisitServiceEligibilityStatus: (data, onSuccess) => dispatch(getVisitServiceEligibilityStatus(data, onSuccess)),
        getpaymentsCardList: (onSuccess) => dispatch(getpaymentsCardList(onSuccess)),
        goToPaymentScreen: () => dispatch(navigateToScreenMainStack(PATH ? PATH.PAYMENT : null)),
        getFilteredServiceProviders: (data) => dispatch(getFilteredServiceProviders(data)),
        getPatientRequests: (id) => dispatch(getPatientRequests(id)),
        getServiceProviders: (id, requestObject) => dispatch(getServiceProviders(id, requestObject)),
        changeSelectedServiceRequestId: (id) => dispatch(changeSelectedServiceRequestId(id)),
        searchForServiceProviders: (data, srId, requestObject) => dispatch(searchForServiceProviders(data, srId, requestObject)),
        getSortedServiceProviders: (id, data) => dispatch(getSortedServiceProviders(id, data)),
        updateFilterState: (data) => dispatch(updateFilterState(data)),
        goToCreateSRequest: () => dispatch(navigateToScreenMainStack(PATH ? PATH.REQUIREMENTS_SCREEN : null)),
        invitSp: (srId, spId, flag) => dispatch(inviteServiceProvider(srId, spId, flag)),
        hireSp: (srId, spId) => dispatch(hireServiceProvider(srId, spId)),
        cancelInvitation: (srId, spId) => dispatch(cancelInvitation(srId, spId)),
        goToSPProfile: (params) => dispatch(navigateToScreenMainStack(PATH ? PATH.SERVICE_PROVIDER_PROFILE : null, params)),
        favouriteSp: (spId,isFavourite, onSuccess) => dispatch(favouriteSp(spId,isFavourite, onSuccess)),
        updateNormalizedPointOfServices: (address, addressId) => dispatch(updateNormalizedPointOfServices(address, addressId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestsTab)
