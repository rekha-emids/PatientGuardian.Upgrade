import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import { Item, Icon} from 'native-base'
import {TouchableOpacity, View, Keyboard} from 'react-native'
import { getServiceProviders, getServiceCategories, onChangeServiceCategoryId, searchBrowseServiceProviders, browseFilteredServiceProviders } from '../../../redux/serviceProvidersTab/browseTab/actions';
import { OverlayLoaderWrapper } from '../../../components/Base/Preloader/Preloader';
import { isAPIFetching } from '../../../utils/AppAPIUtils';
import { CoreoTextInput, CoreoOpacityButton, NavbarWithImage,CoreoScrollView, CoreoText, CoreoImage, CoreoHighlightButton } from '../../../components';
import styles from './styles'
import BrowseServiceProviderCard from './components/BrowseServiceProviderCard';
import { getServiceRequestCategoryImage, getArrayFromNormalizedData, isIOS } from '../../../utils/appUtils';
import ServiceRequestFilter from '../../VisitSelection/VisitServiceList/ServiceRequestFilter';
import { RequestsFilter } from '../../../data/FiltersData';
import { getTodayDate } from '../../../utils/momentUtil';
import { _ } from '../../../utils/validations';
import { setValueBasedOnHeight, setValueBasedOnWidth } from '../../../utils/deviceDimensions';
import { BROWSE } from '..';
import { REFRESH, INIT } from '../../../constants/AppAPIConstants';
import { ListScrollerAPIWrapper, SafeView } from '../../../components/LevelOne';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, DATE_FORMATS, SERVICE_CATEGORY_IDS } from '../../../constants/constants';

export const SearchBar = (props) => {
    return (
        <Item style={[{paddingLeft: setValueBasedOnWidth(8)},props.borderColor]}>
            <Icon name="ios-search" />
            <CoreoTextInput
                inputStyle={[{width: '65%'}, props.inputStyle]}
                placeholder={props.placeholder || "Search"}
                onChangeText={(text) => props.onChangeText(text)}
                value={props.searchText}
                onSubmitEditing={props.onSubmitEditing}
            />
            {/* <Input placeholder="Search" onChangeText={this.onChangeText} /> */}
            <CoreoHighlightButton
                onPress={props.resetSearch}
                text="X"
                textStyle={styles.closeTextStyle}
                style={styles.closeSearchContainer}
            />
           {props.hideSearch ? null : <CoreoHighlightButton
                onPress={props.onSearch}
                text="Search"
                textStyle={styles.textStyle}
                style={styles.buttonContainer}
            />
           }
        </Item>
    )
}

const filterRequestModel = {
    city: "",
    fromDate: "1990-01-01",
    genderId: 0,
    maxExperience: 50,
    maxHourlyRate: 50,
    minExperience: 0,
    minHourlyRate: 0,
    pageNumber: 1,
    pageSize: 10,
    ratings: "0", 
    selectedServiceCategoryId: 1,
    serviceTypeIds: [],
    skills: [],
    stateName: "",
    statusIds: [],
    streetAddress: "",
    toDate: getTodayDate(DATE_FORMATS.YYYY_MM_DD),
    zip: 0,
    lat: 0,
    lon: 0,
    isFavourite: false,
    isRecent: false,
    ServiceCategoryId: SERVICE_CATEGORY_IDS.ACTIVITY_OF_DAILY_LIVING
};
class Browse extends PureComponent {
    IS_COMPONENT_MOUNTED = false
    isSearchApplied = false
    isFilterApplied = false
    filterRequestObject = filterRequestModel;
    constructor(props) {
        super(props)
        props.navigation && props.navigation.setParams({
            onTabFocus: this.handleTabFocus
          });
        this.state = {
            isSearchOpen: false,
            isFilterOpen: false,
            searchText: "",
            serviceCategoryItemWidths: {},
            filterComponentKey: 0,
            keyboard: false,
            keyboardHeight: 0
        }
    }
    handleTabFocus = () => {
        this.onResetFilter();
        const {getServiceCategoriesStatus, getServiceProviderStatus} = this.props.browseState
        if(this.IS_COMPONENT_MOUNTED && !isAPIFetching(getServiceCategoriesStatus, getServiceProviderStatus)){
            this.setState({ searchText: "" }, this.apiCall);
        }
        this.IS_COMPONENT_MOUNTED = true
      };
    
    resetSearchAndFilterStates = () => 
    {
        this.isSearchApplied = false
        this.isFilterApplied = false
        this.filterRequestObject = filterRequestModel;
    }

    resetSearch = () => {
        this.resetSearchAndFilterStates()
        Keyboard.dismiss();
        this.state.searchText && this.state.searchText.length && this.apiCall()
        this.setState({searchText: ''})
    }

    apiCall = (requestObject={pageNumber: DEFAULT_PAGE_NUMBER, pageSize: DEFAULT_PAGE_SIZE, requestType: INIT}, requestType = INIT) => {
        if(this.isSearchApplied && this.state.searchText && this.state.searchText.length){
            this.props.searchBrowseServiceProviders(this.state.searchText, requestObject)
        }else{
            this.props.browseFilteredServiceProviders(this.filterRequestObject, requestObject)
        }
    }
    _onRefresh = () => {
        this.resetSearchAndFilterStates()
        this.apiCall({pageNumber: DEFAULT_PAGE_NUMBER, pageSize: DEFAULT_PAGE_SIZE}, REFRESH)
        this.setState({filterComponentKey: this.state.filterComponentKey + 1})
    }

    componentDidMount(){
        this.props.navigation.addListener('didFocus', (route) => {
            global.selectedTab = BROWSE
            this.handleTabFocus()
        });
        this.props.getServiceCategories()
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this.setState({ keyboard: false,keyboardHeight:0 }))
    }

    _keyboardDidShow(e) {
        let keyboardHeight = e.endCoordinates.height
        this.setState({ keyboard: true, keyboardHeight: keyboardHeight })
    }

    onPressServiceCategory = (id) => {
        this.resetSearchAndFilterStates()
        this.filterRequestObject = {
            ...this.filterRequestObject,
            ServiceCategoryId: id,
            selectedServiceCategoryId: id
        }
        this.props.changeServiceCategory(id)
        this.apiCall()
    }

    onLayout = (e, categoryId)=> {
        const {layout} = e.nativeEvent
        const {serviceCategoryItemWidths} = this.state
        if(_.isNil(serviceCategoryItemWidths[categoryId]) || (
            !_.isNil(serviceCategoryItemWidths[categoryId]) && layout.width !== serviceCategoryItemWidths[categoryId])){
        this.setState({serviceCategoryItemWidths : {
            ...serviceCategoryItemWidths,
            [categoryId]: {
                width: layout.width,
                height: layout.height
            }
        }})
        }
    }

    renderServiceCategories = () => {
        const {serviceCategories, selectedServiceCategoryId} = this.props.browseState
        let content =  serviceCategories && serviceCategories.map((category, index) => {
            const dimensions = this.state.serviceCategoryItemWidths[category.serviceCategoryId] || {}
            let backgroundStyle = selectedServiceCategoryId === category.serviceCategoryId ? styles.selectedCategoryBackground : styles.unselectedCategoryBackground
            return (
                <TouchableOpacity onLayout={(e) => {this.onLayout(e, category.serviceCategoryId)}} key={index} style={[styles.categoryItemContainer]} onPress={() => {this.onPressServiceCategory(category.serviceCategoryId)}}>
                    <CoreoImage style={[styles.bgImage, {width: dimensions.width, height: dimensions.height}]} source={getServiceRequestCategoryImage(category.serviceCategoryId)} />
                    <View style={[styles.background, backgroundStyle]}>
                        <CoreoText style={styles.categoryDesc}>{category.serviceCategoryDescription}</CoreoText>
                    </View>
                </TouchableOpacity>
            )
        })
        return (
            <CoreoScrollView horizontal={true}>
                {content}
            </CoreoScrollView>
        )
    }

    onSearch = () => {
        this.resetSearchAndFilterStates()
        this.isSearchApplied = true
        Keyboard.dismiss();
        this.apiCall()
        this.setState({filterComponentKey: this.state.filterComponentKey + 1})
    }

    onApplyFilter = (data) => {
        const {selectedServiceCategoryId} = this.props.browseState
        this.resetSearchAndFilterStates()
        const {otherLocation, selectedAddressDetails} = data
        let addressDetails = otherLocation
        if(selectedAddressDetails){
            addressDetails = selectedAddressDetails
        }
        let requestObject = {
            city: addressDetails.city || "",
            fromDate: "1990-01-01",
            genderId: data.selectedGenderId ? data.selectedGenderId : 0,
            maxExperience: data.maxExp || 50,
            maxHourlyRate: data.maxRate || 50,
            minExperience: data.minExp || 0,
            minHourlyRate: data.minRate || 0,
            pageNumber: 1,
            pageSize: 100,
            ratings: data.rating ? data.rating : "0", 
            selectedServiceCategoryId: data.selectedServiceCategoryId || selectedServiceCategoryId,
            serviceTypeIds: getArrayFromNormalizedData(data.selectedServiceCategories),
            skills: data.selectedSkills ? Object.keys(data.selectedSkills) : [],
            stateName: addressDetails.stateName || "",
            statusIds: [],
            streetAddress: addressDetails.street || "",
            toDate: getTodayDate(DATE_FORMATS.YYYY_MM_DD),
            zip: addressDetails.zip || 0,
            lat: 0,
            lon: 0,
            isFavourite: (data.preferredData.indexOf("isFavourite") > -1),
            isRecent: (data.preferredData.indexOf("isRecent") > -1),
            ServiceCategoryId: data.selectedServiceCategoryId || selectedServiceCategoryId,
        }
        this.setState({searchText: ""})
        this.isFilterApplied = true
        this.filterRequestObject = requestObject
        this.apiCall()
    }

    onResetFilter = () => {
        this.resetSearchAndFilterStates()
        this.setState({isFilterOpen: false, searchText: ""}, () => {
            this.apiCall()
        })
    }

    onChangeText = (text) => {
        this.setState({searchText: text})
    }


    renderSearchAndSorting = () => {
        return (
            <View>
                <View style={styles.searchBarContianer}>
                    <SearchBar 
                      onChangeText={(text) => {this.setState({searchText: text})}}
                      resetSearch={this.resetSearch}
                      onSearch={this.onSearch}
                      searchText={this.state.searchText}
                      placeholder="Enter keyword for global search"
                      onSubmitEditing={this.onSearch}
                      />
                </View>
                <View style={styles.sortFilterStyle}>
                    <CoreoOpacityButton
                        style={styles.filter}
                        text='Filters'
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
    onInactivity = (onSuccess) => {
        this.setState({isFilterOpen: false}, onSuccess && onSuccess())
    }

    render() {
        const {getServiceCategoriesStatus,getEngageServiceRequests, getServiceProviderStatus, serviceProviders, selectedServiceCategoryId} = this.props.browseState
        const isLoading = isAPIFetching(getServiceCategoriesStatus, getEngageServiceRequests)
        return (
            <SafeView>
            <OverlayLoaderWrapper style={[styles.mainContainer, isIOS() && this.state.keyboard ? {marginBottom: this.state.keyboardHeight - setValueBasedOnHeight(30)} : {}]} isLoading={isLoading}>
            <NavbarWithImage  showImage={false} title="Browse Providers" showBellIcon={false}  />
                <View style={styles.categoryContainer}>
                {this.renderServiceCategories()}
                {this.renderSearchAndSorting()}
                </View>
                <View style={styles.spListContainer}>
                    <ListScrollerAPIWrapper
                        data={_.isNil(serviceProviders && serviceProviders[selectedServiceCategoryId]) ? [] : serviceProviders[selectedServiceCategoryId] }
                        renderComponent={BrowseServiceProviderCard}
                        apiSaga={this.apiCall}
                        noItemsText={"No results found for the current criteria"}
                        navigation={this.props.navigation}
                        networkCallStatus={!isLoading ? getServiceProviderStatus : null}
                        isPaginationEnabled={true}
                        />
                </View>
                <ServiceRequestFilter
                    isFilterOpen={this.state.isFilterOpen}
                    onClose={() => this.setState({isFilterOpen: false})}
                    onApplyFilter={this.onApplyFilter}
                    filters={RequestsFilter}
                    onResetFilter={this.onResetFilter}
                    onInactivity={this.onInactivity}
                    isFavourite={true}
                    id={this.state.filterComponentKey}
                />
                </OverlayLoaderWrapper>
                </SafeView>
        )
    }
}

function mapStateToProps(state){
    return {
        browseState: state.serviceProvidersTabState.browseState,
        serviceCategories: state.visitHistoryState.vistServiceHistoryState.serviceCategories,
        getEngageServiceRequests: state.serviceProvidersTabState.browseState.getEngageServiceRequests
    }
}

function mapDispatchToProps(dispatch){
    return {
        getServiceCategories: () => dispatch(getServiceCategories()),
        getServiceProviders: (requestType, updateNetworkOnResponse, requestObject) => dispatch(getServiceProviders(requestType, updateNetworkOnResponse, requestObject)),
        changeServiceCategory: (data) => dispatch(onChangeServiceCategoryId(data)),
        browseFilteredServiceProviders: (data, requestObject) => dispatch(browseFilteredServiceProviders(data, requestObject)),
        searchBrowseServiceProviders: (searchText, requestObject) => dispatch(searchBrowseServiceProviders(searchText, requestObject))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Browse)