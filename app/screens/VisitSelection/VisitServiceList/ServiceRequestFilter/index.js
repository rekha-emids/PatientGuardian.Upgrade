import React, { Component } from "react";
import { connect } from 'react-redux';
import { Modal, View, TouchableOpacity } from 'react-native';
import {
    CoreoText,
    CoreoOpacityButton, ScreenCover
} from '../../../../components';
import HourlyRate from './HourlyRate/index'
import Experience from './Experience/index'
import Rating from './Rating/index'
import { getSortFilter } from "../../../../redux/visitSelection/ServiceRequestSorting/actions";
import Status from './Status/index'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Keys, ServiceStatusNew, StatusData, NeedingApprovalData, VisitStatus, CareTeamStatusData } from '../../../../data/FiltersData'
import ServiceCategoryFilters from './ServiceCategoryFilter/index'
import ServiceProvidersFilter from './ServiceProvidersFilter/index'
import VisitDateFilter from './VisitDateFilter/index'
import { _ } from '../../../../utils/validations'
import { setValueBasedOnHeight } from '../../../../utils/deviceDimensions';
import styles from './styles';
import Gender from './Gender/index'
import Skills from "./Skills";
import PointOfServiceFilter from "./PointOfServiceFilter";
import Contracts from './Contracts/index'
import Cohorts from './Cohorts/index'
import ClinicalConditions from './ClinicalConditions/index'
import AgeRange from './AgeRange/index'
import Location from "./Location";
import ServiceStatus from './ServiceStatus/index'
import AttributeProviders from './AttributeProviders/index'
import RecurringPattern from './RecurringPattern/index'
import { SafeView } from "../../../../components/LevelOne";
import LinearGradient from "react-native-linear-gradient";
import { NAVBAR_COLOR1, NAVBAR_COLOR2 } from "../../../../constants/theme";
import { SELECTED_STATUS, NO_PREFERENCE_TEXT, NO_PREFERENCE_ALIAS, MAXIMUM_RATE, APPROVAL_STATUS, SERVICE_REQUEST_STATUS, USER_TYPES } from "../../../../constants/constants";
import { getArrayFromNormalizedData, pushSpliceHandler } from "../../../../utils/appUtils";
import { getPointOfServices } from "../../../../redux/serviceProvidersTab/requestsTab/actions";
import NeedingApproval from "./NeedingApproval";
import Preferred from "./Preferred";
import RiskGroup from "./RiskGroup";

const arrowLeft = <MaterialIcon name="arrow-left" size={setValueBasedOnHeight(25)} color="#ffffff" />
let statusIds = {}
StatusData.map(status => {
    statusIds = {
        ...statusIds,
        [status.id]: status.id
    }
})

let careTeamStatusIds = {};
CareTeamStatusData.map(status =>{
    careTeamStatusIds = {
        ...careTeamStatusIds,
        [status.id]:status.id
    }
})

delete statusIds[SERVICE_REQUEST_STATUS.declined.id.toString()]
delete statusIds[SERVICE_REQUEST_STATUS.closed.id.toString()]
delete statusIds[SERVICE_REQUEST_STATUS.all.id.toString()]

let initialState = {
    selectedServiceCategories: {},
    seletedDateRange: {
        fromDate: null,
        toDate: null
    },
    fromDate: null,
    toDate: null,
    preferredData: [],
    statusData:statusIds,
    needingApprovalData: [APPROVAL_STATUS.NEEDING_APPROVAL],
    serviceStatusData: [],
    selectedServiceProviderIds: {},
    minExp: null,
    maxExp: null,
    rating: 0,
    minRate: null,
    maxRate: null,
    selectedSkills: {},
    selectedGender: "",
    selectedGenderId: 0,
    selectedServiceDescription: "",
    otherLocation: {
        street: null,
        city: null,
        zip: null,
        state: null,
        range: null
    },
    selectedAddressId: null,
    selectedAddressDetails: null,
    selectedContractId: 0,
    selectedCohortIds: {},
    selectedClinics: {},
    minAge: 0,
    maxAge: 120,
    selectedServiceCategoryId: 0,
    recurringPattern: 0,
    resetServiceState: false,
    serviceStatusArray: ServiceStatusNew,
    visitStatusData: VisitStatus,
    careTeamStatusData: careTeamStatusIds
}

class ServiceRequestFilter extends Component {
    constructor(props) {
        super(props)
        const { selectedFilterKey } = props.selectedFilterState;
        this.state = {
            ...initialState,
            ...props.selectedFilterState,
            preferredData: [],
            needingApprovalData: [APPROVAL_STATUS.NEEDING_APPROVAL],
            statusDataNeedingApproval: NeedingApprovalData,
            selectedFilterKey: selectedFilterKey ? selectedFilterKey : (props.filters ? props.filters[0].key : ""),
        }
    }

    componentDidMount() {
        this.props.getPointOfServices()
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id) {
            this.resetLocalStates();
        }
        if (this.props.selectedFilterState !== nextProps.selectedFilterState) {
            this.setState({
                ...this.state.data,
                ...nextProps.selectedFilterState
            })
        }
    }

    onChangeMinExp = (value) => {
        this.setState({ minExp: value })
    }

    onChangeMaxExp = (value) => {
        this.setState({ maxExp: value })
    }

    onChangeMinRating = (value) => {
        const maxRate = value[1] === 0 ? 1 : value[1]
        this.setState({ minRate: value[0], maxRate })
    }
    onChangeMaxRating = (value) => {
        this.setState({ maxRate: value })
    }
    onChangeRating = (value) => {
        this.setState({ rating: value })
    }

    onChangeFromDate = (fromDate) => {
        this.setState({ seletedDateRange: { ...this.state.seletedDateRange, fromDate }, fromDate: fromDate })
    }

    onChangeToDate = (toDate) => {
        this.setState({ seletedDateRange: { ...this.state.seletedDateRange, toDate }, toDate: toDate })
    }

    onChangeSelectedGender = (gender) => {
        this.setState({ selectedGender: gender.name, selectedGenderId: gender.id })
    }

    onClickSkill = (skill) => {
        let skills = { ...this.state.selectedSkills }
        if (skills[skill.id]) {
            delete skills[skill.id]
            this.setState({ selectedSkills: skills })
        } else {
            skills = {
                ...skills,
                [skill.id]: skill
            }
            this.setState({ selectedSkills: skills })
        }
    }

    onClickFilter = (selectedFilterKey) => {
        this.setState({ selectedFilterKey })
    }

    onPressSp = (id) => {
        const selectedItems = { ...this.state.selectedServiceProviderIds }
        if (!_.isNil(selectedItems[id])) {
            delete selectedItems[id]
            this.setState({ selectedServiceProviderIds: selectedItems })
        }
        else {
            this.setState({ selectedServiceProviderIds: { ...selectedItems, [id]: id } })
        }
    }

    onChangeAddress = (value, key, stateName) => {
        let stateNameDetails = {}
        if (stateName) {
            stateNameDetails = {
                stateName
            }
        }
        this.setState({ otherLocation: { ...this.state.otherLocation, [key]: value, ...stateNameDetails } })
    }
    onChangeAddressId = (value, addressDetails) => {
        this.setState({ selectedAddressId: value, selectedAddressDetails: addressDetails })
    }
    onChangeContractId = (value) => {
        this.setState({ selectedContractId: value })
    }

    onPressCohorts = (id) => {
        const selectedItems = { ...this.state.selectedCohortIds }
        if (!_.isNil(selectedItems[id])) {
            delete selectedItems[id]
            this.setState({ selectedCohortIds: selectedItems })
        }
        else {
            this.setState({ selectedCohortIds: { ...selectedItems, [id]: id } })
        }
    }

    onClickClinicalCondition = (id) => {
        const selectedItems = { ...this.state.selectedClinics }
        if (!_.isNil(selectedItems[id])) {
            delete selectedItems[id]
            this.setState({ selectedClinics: selectedItems })
        }
        else {
            this.setState({ selectedClinics: { ...selectedItems, [id]: id } })
        }
    }

    onAgeChange = (values) => {
        this.setState({
            minAge: values[0],
            maxAge: values[1]
        })
    }
    onChangeCategory = (data) => {
        let selectedServiceTypes = {}
        if (data.serviceCategoryId !== this.state.selectedServiceCategoryId) {
            if (!Object.keys(this.props.selectedFilterState).length) {
                data.serviceTypeTasks.map((serviceType) => {
                    selectedServiceTypes = {
                        ...selectedServiceTypes,
                        [serviceType.serviceTypeId]: serviceType.serviceTypeId
                    }
                })
            }
            this.setState({ selectedServiceCategoryId: data.serviceCategoryId, selectedServiceDescription: data.serviceCategoryDescription, selectedServiceCategories: selectedServiceTypes })
        }
    }

    onChangeExp = (values) => {
        this.setState({
            minExp: values[0],
            maxExp: values[1]
        })
    }
    onChangeSelectedPattern = (patternId) => {
        this.setState({ recurringPattern: patternId })

    }

    updateNeedingApprovalData = (id) => {
        var data = this.state.needingApprovalData;
        var index = data.indexOf(id);
        if (index > -1) {
            data.splice(index, 1);
        } else {
            data.push(id);
        }
        this.setState({ needingApprovalData: data })
    }

    updatePreferredData = (id) => {
        var data = pushSpliceHandler(this.state.preferredData, id);
        this.setState({ preferredData: data })
    }

    onPressNeedingApproval = (index) => {
        let data = this.state.statusDataNeedingApproval;
        data[index].status = !(data[index].status);
        this.updateNeedingApprovalData(data[index].id);
        this.setState({ statusDataNeedingApproval: data });
    }

    renderContent = () => {
        const { selectedFilterKey } = this.state
        switch (selectedFilterKey) {
            case Keys.CATEGORIES:
                return <ServiceCategoryFilters editable={_.isNil(this.props.editable) ? true : this.props.editable} selectedServiceCategoryId={this.state.selectedServiceCategoryId} onChangeCategory={this.onChangeCategory} onPressCategory={this.onPressCategory} selectedServiceCategories={this.state.selectedServiceCategories} />
            case Keys.SERVICE_PROVIDERS:
                return <ServiceProvidersFilter onPress={this.onPressSp} selectedServiceProviders={this.state.selectedServiceProviderIds} />
            case Keys.DATE_RANGE:
                return <VisitDateFilter defaultFromDate={this.state.seletedDateRange.fromDate} onChangeFromDate={this.onChangeFromDate} onChangeToDate={this.onChangeToDate}
                    defaultToDate={this.state.seletedDateRange.toDate} />
            case Keys.STATUS:
                return <Status selectedStatus={this.props.loggedInUser.userType === USER_TYPES.CARE_TEAM ? getArrayFromNormalizedData(this.state.careTeamStatusData): getArrayFromNormalizedData(this.state.statusData)}
                    statusData={this.statusData}
                />
            case Keys.HOURLY_RATE:
                return <HourlyRate minRate={_.isNil(this.state.minRate) ? 0 : this.state.minRate} maxRate={_.isNil(this.state.maxRate) ? MAXIMUM_RATE : this.state.maxRate} onChangeRating={this.onChangeMinRating} />
            case Keys.EXPERIENCE:
                return <Experience minExp={_.isNil(this.state.minExp) ? 0 : this.state.minExp} maxExp={_.isNil(this.state.maxExp) ? 50 : this.state.maxExp} onChangeExp={this.onChangeExp} />
            case Keys.RATING:
                return <Rating rating={this.state.rating} onSelectRating={this.onChangeRating} />
            case Keys.SKILLS:
                return <Skills selectedSkills={this.state.selectedSkills} onClickSkill={this.onClickSkill} />
            case Keys.GENDER:
                return <Gender showNotDisclosedGender={this.props.showNotDisclosedGender} showOthersGender={this.props.showOthersGender} selectedGender={this.state.selectedGender} onChangeSelectedGender={this.onChangeSelectedGender} />
            case Keys.POINT_OF_SERVICE:
                return <PointOfServiceFilter editable={_.isNil(this.props.editable) ? true : this.props.editable} onChangeSelectedAddress={this.onChangeAddressId} selectedAddressId={this.state.selectedAddressId} onChangeText={this.onChangeAddress} otherLocation={this.state.otherLocation} />
            case Keys.CONTRACT:
                return <Contracts selectedContractId={this.state.selectedContractId} onChangeContractId={this.onChangeContractId} onPress={this.onChangeContractId} />
            case Keys.COHORT:
                return <Cohorts selectedCohortIds={this.state.selectedCohortIds} onPress={this.onPressCohorts} />
            case Keys.AGE_RANGE:
                return <AgeRange minAge={this.state.minAge} maxAge={this.state.maxAge} onAgeChange={this.onAgeChange} />
            case Keys.CLINICAL_CONDITIONS:
                return <ClinicalConditions selectedClinics={this.state.selectedClinics} onClickClinicalCondition={this.onClickClinicalCondition} />
            case Keys.LOCATION:
                return <Location onChangeSelectedAddress={this.onChangeAddressId} selectedAddressId={this.state.selectedAddressId} onChangeText={this.onChangeAddress} otherLocation={this.state.otherLocation} />
            case Keys.SERVICE_STATUS:
                return <ServiceStatus statusData={this.serviceStatusData} serviceStatusArray={this.state.serviceStatusArray} />
            case Keys.ATTRIBUTE_PROVIDERS:
                return <AttributeProviders onPress={this.onPressSp} selectedServiceProviders={this.state.selectedServiceProviderIds} />
            case Keys.RECURRING:
                return <RecurringPattern selectedPattern={this.state.recurringPattern} onChangeSelectedPattern={this.onChangeSelectedPattern} />
            case Keys.NEEDING_APPROVAL:
                return <NeedingApproval updateNeedingApprovalData={this.updateNeedingApprovalData} needingApprovalData={this.state.needingApprovalData} statusData={this.state.statusDataNeedingApproval} onPressNeedingApproval={this.onPressNeedingApproval} />
            case Keys.VISIT_STATUS:
                return <Status key={this.state.visitStatusData} customStatusData={VisitStatus} data={this.state.visitStatusData} statusData={this.onUpdateVisitStatusData} />
            case Keys.PREFERRED:
                return <Preferred updatePreferredData={this.updatePreferredData} preferredData={this.state.preferredData} />
            case Keys.RISK_GROUP:
                return <RiskGroup />
        }
    }
    onUpdateVisitStatusData = (data) => {
        this.setState({ visitStatusData: data })
    }

    statusData = (id, flag) => {
        let status ={};
        if(this.props.loggedInUser.userType === USER_TYPES.CARE_TEAM ){
            status = { ...this.state.careTeamStatusData };
        }
        else{
            status = { ...this.state.statusData };
        }
        if (id === -1) {
            if (flag) {
                status = SELECTED_STATUS
            } else {
                status = {}
            }
        } else if (status[id]) {
            delete status[id]
            delete status["0"]
        } else {
            status = {
                ...status,
                [id]: id
            }
            let currentLength = Object.keys(status).length
            if (currentLength === Object.keys(SELECTED_STATUS).length - 1) {
                status = {
                    ...status,
                    "0": 0
                }
            }
        }
        if(this.props.loggedInUser.userType === USER_TYPES.CARE_TEAM){
            this.setState({ careTeamStatusData: status });
        }
        else{
            this.setState({ statusData: status });
        }
    }

    serviceStatusData = (data, ind) => {
        let status = [];
        for (let index = 0; index < data.length; index++) {
            if (data[index].status) {
                status.push(data[index].id)
            }
        }
        this.setState({ serviceStatusData: status, serviceStatusArray: data });
    }

    applyFilter = () => {
        // alert(JSON.stringify({...this.state}))
        this.props.onApplyFilter && this.props.onApplyFilter({
            ...this.state,
            riskGroup:this.props.riskGroupData,
            selectedGender: this.state.selectedGender === NO_PREFERENCE_TEXT ? NO_PREFERENCE_ALIAS : this.state.selectedGender
        });
        this.props.onClose();
    }

    onPressCategory = (id) => {
        const selectedItems = { ...this.state.selectedServiceCategories }
        if (!_.isNil(selectedItems[id])) {
            delete selectedItems[id]
            this.setState({ selectedServiceCategories: selectedItems })
        }
        else {
            this.setState({ selectedServiceCategories: { ...selectedItems, [id]: id } })
        }
    }

    renderFilters = () => {
        let filtersList = this.props.filters && this.props.filters.map((filter, index) => {
            return <CoreoOpacityButton
                key={index}
                style={[styles.filterType, this.state.selectedFilterKey === filter.key ? styles.selectedFilterBg : {}]}
                text={filter.name}
                textStyle={styles.filterText}
                onPress={() => { this.onClickFilter(filter.key) }}
            />
        })
        return <View>{filtersList}</View>
    }

    onReset = () => {
        const { onResetFilter } = this.props || {}
        this.resetLocalStates(onResetFilter)
    }

    resetLocalStates = (onResetLocalStates) => {
        this.setState({
            ...initialState,
            serviceStatusArray: ServiceStatusNew,
            resetServiceState: !this.state.resetServiceState,
            ...this.props.selectedFilterState,
            needingApprovalData: [APPROVAL_STATUS.NEEDING_APPROVAL],
            preferredData: [],
            selectedFilterKey: this.props.selectedFilterState.selectedFilterKey ? this.props.selectedFilterState.selectedFilterKey : (this.props.filters ? this.props.filters[0].key : ""),
        }, () => {
            onResetLocalStates && onResetLocalStates()
        })
    }

    onClose = () => {
        this.props.onClose();
    }

    render() {
        const { disableApplyOnCategoryEmpty, onInactivity } = this.props || {}
        return (
            <Modal
                transparent={true}
                animationType="slide"
                closeOnClick={true}
                visible={this.props.isFilterOpen}
                onRequestClose={this.props.close}
            ><SafeView>
                    <ScreenCover onInactivity={onInactivity}>
                        <View style={styles.modalStyle}>
                            <LinearGradient colors={[NAVBAR_COLOR1, NAVBAR_COLOR2]} style={styles.container}>
                                <View style={styles.subContainer}>
                                    <View>
                                        <CoreoOpacityButton
                                            text={arrowLeft}
                                            onPress={this.props.onClose}
                                        />
                                    </View>
                                    <View style={styles.contentCenter}>
                                        <CoreoText style={styles.fontLarge}>Filters</CoreoText>
                                    </View>
                                    <TouchableOpacity onPress={this.onReset} style={styles.imageNotificationView}>
                                        <CoreoText style={styles.fontMedium}>Reset</CoreoText>
                                    </TouchableOpacity>
                                </View>
                            </LinearGradient>
                            <View style={styles.filterContainer}>
                                <View style={styles.filters}>
                                    {this.renderFilters()}
                                </View>
                                <View style={styles.content}>
                                    {this.renderContent()}
                                </View>
                            </View>
                            <View style={styles.actionButtons}>
                                <View style={styles.closeButton}>
                                    <CoreoOpacityButton
                                        textStyle={styles.closeNameStyle}
                                        text='Close'
                                        onPress={this.onClose}
                                    />
                                </View>
                                <View style={styles.applyButton}>
                                    {/* CH-5782 */}
                                    {/* <CoreoOpacityButton
                                    textStyle={[styles.applyNameStyle, disableApplyOnCategoryEmpty && this.state.selectedServiceCategoryId === -1 ? {opacity: 0.5} : {}  ]}
                                    text='Apply'
                                    onPress={disableApplyOnCategoryEmpty && this.state.selectedServiceCategoryId === -1 ? null : this.applyFilter}
                                /> */}
                                    <CoreoOpacityButton
                                        textStyle={styles.applyNameStyle}
                                        text='Apply'
                                        onPress={this.applyFilter}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScreenCover>
                </SafeView>
            </Modal>
        )
    }
}
ServiceRequestFilter.defaultProps = {
    selectedFilterState: {}
}

function mapDispatchToProps(dispatch) {
    return {
        getSortFilter: (data) => dispatch(getSortFilter(data)),
        getPointOfServices: () => dispatch(getPointOfServices())
    }
};

function mapStateToProps(state) {
    let visitHistoryState = state.visitHistoryState
    const authState = state.authState
    return {
        serviceCategories: visitHistoryState ? visitHistoryState.vistServiceHistoryState.serviceCategories : [],
        loggedInUser: authState && authState.userState.userInfo,
        riskGroupData: state.careTeamState.dashboardState.riskGroup
    }
}

ServiceRequestFilter.defaultProps = {
    selectedFilterState: {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceRequestFilter);
