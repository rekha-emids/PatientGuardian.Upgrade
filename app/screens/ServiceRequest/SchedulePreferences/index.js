import React from "react";
import { connect } from 'react-redux';
import {
    View,
    Text,
    Platform,
    Image,
    TouchableOpacity
} from 'react-native';
import { CoreoText, Calendar, CoreoFloatingInput, Select } from '../../../components';
import { setFontSize } from '../../../utils/deviceDimensions';
import { completed } from '../../../assets/images';
import {
    onNextClick,
    getScheduleType,
    getGender,
    getRecurringPattern,
    getSlot,
    getDays,
    getStates,
    getPatientAddress,
    posValidation
} from '../../../redux/servicerequest/SchedulePreferences/actions';

import Gender from '../Gender';
import Address from '../Address';
import styles from './styles';
import { NEW_DATE_FORMAT, RECCURING, END_AFTER, END_BY, OCCURANCES, DAYS, ONE_TIME, VALIDATIONS, RECCURING_ONE_TIME, MINIMUM_EXPERIENCE, MAXIMUM_EXPERIENCE, WEEKLY_ID, WEEKLY, DEFAULT_VALUE, DEFAULT_WEEKLY_ID } from "../../../constants/constants";
import { generatePickerValues, normalizeData, numericComparer, validateCoordinates } from "../../../utils/appUtils";
import { RadioButton, ModalPopup } from "../../../components/LevelOne";
import { getFormatedDate, AddDays, getDayOfDate } from "../../../utils/momentUtil";
import Slots from "./Slots";
import { _ } from '../../../utils/validations'
import Icon from "../../../components/Base/Icon";
import Icons from "../../../assets/images/Icons";
import { isAPIFetching } from "../../../utils/AppAPIUtils";
import { OverlayLoaderWrapper } from "../../../components/Base/Preloader/Preloader";
import { normalizeOccurence } from "../../../utils/renderFields";



const SectionHeader = (props) => {
    return (
        <View style={styles.subTitle}>
            <CoreoText style={styles.subTitleText}>{props.title}</CoreoText>
        </View>
    )
}




class SchedulePreferences extends React.Component {
    selectedDays = {}
    tempAddressKey = DEFAULT_VALUE
    constructor(props) {
        super(props);
        this.state = {
            selectedScheduleType: ONE_TIME,
            selectedScheduleValue: "OneTime",
            selectedGenderKey: 8,
            selectedAddressKey: null,
            selectedStateKey: null,
            selectedDate: null,
            selectedDateDay: '',
            slotData: props.slotType,
            selectedSlotKey: null,
            street: '',
            city: '',
            zip: '',
            minimumServiceProviderExperience: MINIMUM_EXPERIENCE,
            maximumServiceProviderExperience: MAXIMUM_EXPERIENCE,
            startDate: null,
            endDate: null,
            occurances: null,
            recurringPattern: DEFAULT_WEEKLY_ID,
            availableList: [],
            recurringPatternLabel: WEEKLY,
            addressLabel: '',
            state: '',
            addressType: "",
            selectedEndType: END_AFTER,
            reccuranceSlotData: [],
            noOfDaysCanSelect: 1,
            isModalOpen: false,
            ...props.schedulePreferencesObj,
            isNextClicked: false,
            posCustomOpen: false,
            updateTextInput: false,
            isUpdated:false
        }
    }
    componentDidMount() {
        this.props.getPatientAddress()
        let slots = this.props.slotType && this.props.slotType.map((slot, i) => {
            return {
                ...slot,
                selected: false
            };
        });
        let reccuranceSlots = DAYS.map(day => {
            return this.props.slotType && this.props.slotType.map((slot, i) => {
                return {
                    ...slot,
                    selected: false
                };
            });
        })
        this.setState({
            reccuranceSlotData: this.props.reccuranceSlotData ? this.props.reccuranceSlotData : reccuranceSlots,
            slotData: this.props.slotData ? this.props.slotData : slots
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isNextButtonClicked !== nextProps.isNextButtonClicked && nextProps.isNextButtonClicked) {
            this.setState({ isNextClicked: true }, () => {
                this.onClickButtonNext()
            })
        }
        if (nextProps.patientAddressType.length && (!this.state.selectedAddressKey || (this.state.selectedAddressKey === DEFAULT_VALUE && !this.state.zip.length)) && this.props.isNextButtonClicked === nextProps.isNextButtonClicked) {
            let tempAdd = nextProps.patientAddressType.filter((address) => address.isPrimaryAddress)
            if(tempAdd.length > 0){
                this.setState({ selectedAddressKey: tempAdd[0].addressId });
            }else {
                this.setState({selectedAddressKey: nextProps.patientAddressType[0].addressId})
            }
        }
        if(!this.state.selectedAddressKey){
            this.setState({selectedAddressKey: DEFAULT_VALUE})
        }
        if(this.props.isPrevButtonClicked !== nextProps.isPrevButtonClicked){
            this.props.onClickNext(this.state)
        }
    }

    isSlotsValid = () => {
        const { selectedScheduleType, recurringPatternLabel } = this.state
        let count = 0
        if (selectedScheduleType === ONE_TIME) {
            count = this.state.slotData.filter(slot => slot.selected).length
        } else {
            let slotsCount = 0
            this.state.reccuranceSlotData.map(day => {
                let reccringSlotCount = day.filter(slot => slot.selected).length
                if (reccringSlotCount > 0) slotsCount++
            })
            count = slotsCount > 0 ? slotsCount : 0
        }
        return !(count === 0)
    }

    checkAllFields = () => {
        let isValidAddress = false
        if(!_.isNil(this.state.selectedAddressKey)){
           const selectedAddress = this.props.patientAddressType.filter(address => numericComparer(address.addressId,this.state.selectedAddressKey) && validateCoordinates(address))
           isValidAddress = selectedAddress.length > 0
        }
        let isValidSelectDate = true
        if (this.state.selectedScheduleType === ONE_TIME) {
            isValidSelectDate = !_.isNil(this.state.selectedDate)
        }
        let isValidStartDate = true
        let isValidEndDate = true
        let isValidOccurances = true
        let isValidReccuringPattern = true
        if (this.state.selectedScheduleType === RECCURING) {
            isValidReccuringPattern = !_.isNil(this.state.recurringPattern)
            isValidStartDate = !_.isNil(this.state.startDate)
            if (this.state.selectedEndType === END_BY) {
                isValidEndDate = isValidStartDate && !_.isNil(this.state.endDate)
            }
            if (this.state.selectedEndType === END_AFTER) {
                isValidOccurances = isValidStartDate && !_.isNil(this.state.occurances) && this.state.occurances > 0
            }
        }
        if (this.state.selectedAddressKey === DEFAULT_VALUE) {
            let isStreetValid =  !_.isNil(this.state.street) && this.state.street.length > 0
            let isStateVaid = isStreetValid && !_.isNil(this.state.selectedStateKey)
            let isZipValid = isStateVaid && !_.isNil(this.state.zip) && this.state.zip.length === 5
            let isCityValid = isZipValid && !_.isNil(this.state.city) && this.state.city.length > 0
            isValidAddress = isCityValid

        }
        if(isValidAddress && isValidSelectDate && isValidStartDate &&
        isValidEndDate && isValidOccurances && this.isSlotsValid() && isValidReccuringPattern){
            this.props.removeError()
            return true
        }
        return false
    }

    onValidAddressSuccess = () => {
        this.props.removeError();
        this.props.changeActiveIndex()
    }

    onFailValidAddressCheck = () => {
        this.props.changeNextButtonClickFlag("Please enter valid address details")
    }
    onClickButtonNext = () => {
        if (this.checkAllFields()) {
            this.props.onClickNext(this.state)
            this.state.selectedAddressKey === DEFAULT_VALUE ? this.props.posValidation(this.state, this.onValidAddressSuccess, this.onFailValidAddressCheck) : this.onValidAddressSuccess()
        }else{
            this.props.changeNextButtonClickFlag()
        }
    }


    onPressArea = (id) => {
        if (this.state.selectedAddressKey === DEFAULT_VALUE && id !== DEFAULT_VALUE && (
            this.state.street.length || this.state.zip.length || this.state.state.length ||
            this.state.city.length || this.state.addressType.length
        )) {
            this.setState({ posCustomOpen: true, selectedStateKey : null})
            this.tempAddressKey = id
        } else {
            this.setState({ selectedAddressKey: id, selectedStateKey : null}, this.checkAllFields);
        }
    }

    onSelectGender = (id) => {
        this.setState({ selectedGenderKey: id });
    }

    selectedScheduleType = (item) => {
        this.setState({
            selectedScheduleType: item.id,
            selectedScheduleValue: item.name
        }, this.checkAllFields);
    }

    multiSliderValuesChange = (values) => {
        this.setState({
            minimumServiceProviderExperience: values[0],
            maximumServiceProviderExperience: values[1]
        });
    }

    dateChanged = (date) => {
        const formattedDate = date ? getFormatedDate(date, "YYYY-MM-DD") : null;
        this.setState({
            selectedDate: formattedDate,
            selectedDateDay: getDayOfDate(date)
        }, this.checkAllFields);
    }

    onReccuranceSlotSelection = (dayIndex, item, i) => {
        const { noOfDaysCanSelect, reccuranceSlotData } = this.state
        let tempArray = [...reccuranceSlotData]
        let isSelected = !tempArray[dayIndex][i].selected
        let count = tempArray[dayIndex].filter(day => day.selected).length
        let isPresent = count > 0
        if (count === 0 && isSelected) {
            isPresent = true
        } else if (count === 1 && !isSelected) {
            isPresent = false
        } else if (count > 1) {
            isPresent = true
        }

        if ((isPresent) || (isPresent && !_.isNil(this.selectedDays[dayIndex]))) {
            tempArray[dayIndex][i].selected = !tempArray[dayIndex][i].selected
            this.setState({ reccuranceSlotData: tempArray }, this.checkAllFields)
            this.selectedDays = {
                ...this.selectedDays,
                [dayIndex]: dayIndex
            }
        } else if (!isPresent && !_.isNil(this.selectedDays[dayIndex])) {
            tempArray[dayIndex][i].selected = !tempArray[dayIndex][i].selected
            this.setState({ reccuranceSlotData: tempArray }, this.checkAllFields)
            delete this.selectedDays[dayIndex]
        }
    }

    onSlotSelection = (item, i) => {
        let temp = this.state.slotData
        temp[i].selected = !temp[i].selected
        this.setState({ slotData: temp }, this.checkAllFields);
    }
    onChangeEndType = (type) => {
        this.setState({ selectedEndType: type }, this.checkAllFields)
    }

    getMinDate = () => {
        const { startDate, recurringPatternLabel } = this.state
        let minDate = null;
        let days = null;

        switch(recurringPatternLabel){
            case OCCURANCES.WEEKLY:
                days = 7;
                break;
            case OCCURANCES.BI_WEEKLY:
                days = 14;
                break;
            case OCCURANCES.MONTHLY:
                days = 30;
                break;
            case OCCURANCES.BI_MONTHLY:
                days = 60;
                break;
        }
        minDate = AddDays(startDate, days, NEW_DATE_FORMAT)
        return minDate;
    }

    onChangeReccuranceType = ({ name, id }) => {
        switch (name) {
            case OCCURANCES.WEEKLY:
            case OCCURANCES.MONTHLY:
                this.setState({ noOfDaysCanSelect: 1, recurringPattern: id, recurringPatternLabel: name }, this.checkAllFields)
                return
            case OCCURANCES.BI_MONTHLY:
            case OCCURANCES.BI_WEEKLY:
                this.setState({ noOfDaysCanSelect: 2, recurringPattern: id, recurringPatternLabel: name }, this.checkAllFields)
                return
        }
    }

    renderError = (key, customError) => {
        let error = this.renderAddressErrors(key)
        let icon = Icons.closeCircleAndroid
        if (Platform.OS === 'ios') {
            icon = Icons.closeCircleIos
        }
        if ((error || customError) && this.state.isNextClicked) {
            return (
                <View style={styles.errorMsgContainer}>
                    <Icon {...icon} size={setFontSize(18)} color="#c04e59" />
                    <CoreoText style={styles.errorMsg}>{error || customError}</CoreoText>
                </View>
            )
        }
        return null
    }


    renderAddressErrors = (key) => {
        if (!this.state.isNextClicked) return null
        if ((!(this.state[key]) || (this.state[key] && this.state[key].length === 0))) {
            switch (key) {
                case VALIDATIONS.STREET:
                    return "Please enter Street"
                case VALIDATIONS.STATE:
                    return "Please select State"
                case VALIDATIONS.ZIP:
                    return "Please enter valid Zip"
                case VALIDATIONS.CITY:
                    return "Please enter City"
                case VALIDATIONS.SELECT_DATE:
                    if (this.state.selectedScheduleType === ONE_TIME)
                        return "Please select Start date"
                    return null
                case VALIDATIONS.START_DATE:
                    if (!this.state.startDate && this.state.selectedScheduleType !== ONE_TIME)
                        return "Please select Start date"
                    return null
                case VALIDATIONS.END_DATE:
                    if (!this.state.endDate && this.state.selectedScheduleType !== ONE_TIME && this.state.selectedEndType === END_BY)
                        return "Please select End date"
                    return null
                case VALIDATIONS.OCCURANCES:
                    if (this.state.selectedEndType === END_AFTER && !this.state.occurances)
                        return "Please enter occurrences"
                    return null
                case VALIDATIONS.ADDRESS:
                    if (!this.state.selectedAddressKey)
                        return "Please select point of service"
                    return null
                case VALIDATIONS.RECCURING_PATTERN:
                    if(!this.state.recurringPattern){
                        return "Please select recurring pattern"
                    }
                    return null
            }
        } else if (key === VALIDATIONS.ZIP && this.state.zip.length !== 5) {
            return "Zip code must be 5 digit number"
        } else if (key === VALIDATIONS.OCCURANCES && this.state.occurances === 0) {
            return "Please enter value greater than 0"
        } else if (key === VALIDATIONS.ADDRESS && !this.state.selectedAddressKey) {
            return "Please select point of service"
        }
        return null
    }

    renderOneTimePattern = () => {
        let isSelected = this.state.slotData && this.state.slotData.filter(item => item.selected).length > 0
        return (
            <View>
                <CoreoText style={styles.preferencesFields}>Date</CoreoText>
                <Calendar
                    date={this.state.selectedDate}
                    minDate={new Date()}
                    maxDate={new Date(2500, 1, 1)}
                    placeholder={"Select date"}
                    // this.state.selectedDate ? null :
                    onDateChange={this.dateChanged}
                    
                />
                <View style={this.renderError(VALIDATIONS.SELECT_DATE) ? styles.unselectedLine : styles.line} />
                {this.renderError(VALIDATIONS.SELECT_DATE)}
                {this.state.selectedDate ? <View>
                    <CoreoText style={styles.preferencesFields}>Select each preferred slot for receiving services</CoreoText>
                    <View style={styles.slotBox}>
                        <View style={styles.boxStyle}>
                            <CoreoText style={styles.dayStyle}>{this.state.selectedDateDay}</CoreoText>
                            {isSelected && <Image
                                style={styles.imageCompletedSize}
                                source={completed}
                            />}
                        </View>
                        <View style={styles.slotViewMargin}>
                            {this.state.slotData.map((item, i) =>
                                <TouchableOpacity
                                    onPress={() => this.onSlotSelection(item, i)}
                                    key={i}
                                >
                                    <View style={item.selected ? styles.slotItemViewSelected : styles.slotItemViewNotSelected}>
                                        <View style={styles.dotView}>
                                            <View style={[styles.selectedSlotDot, item.selected ? {} : styles.emptyDot]} />
                                        </View>
                                        <CoreoText style={styles.slotTextStyleChecked}>{item.name}</CoreoText>
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                    {this.isSlotsValid() ? null : this.renderError(null, "Please select slots")}

                </View> : <View style={styles.marginBottom} />}
            </View>
        )
    }

    renderRecurringPattern = () => {
        const { recurringpatternType } = this.props
        let pickerItems = generatePickerValues(recurringpatternType, "name", "id")
        let normalizedPickerItems = normalizeData(recurringpatternType, "id")
        return (
            <View>
                <CoreoText style={[styles.scheduleType, styles.patternPaddingBottom]}>Select the recurring pattern</CoreoText>
                <Select
                    placeholder="Select recurring pattern"
                    selectedValue={this.state.recurringPattern}
                    style={styles.planstyle}
                    onValueChange={(key, value) => {
                        normalizedPickerItems[key] && this.onChangeReccuranceType(normalizedPickerItems[key])
                    }}
                    dataArray={pickerItems} />
                <View style={styles.line} />
                {this.renderError(VALIDATIONS.RECCURING_PATTERN)}
                <CoreoText style={styles.scheduleType}>Select the range of recurrence</CoreoText>
                <CoreoText style={styles.scheduleType}>Start</CoreoText>
                <Calendar
                    date={this.state.startDate}
                    minDate={new Date()}
                    maxDate={new Date(2500, 0, 0)}
                    onDateChange={(value) => { 
                        this.setState({ startDate: getFormatedDate(value, "YYYY-MM-DD") }, this.checkAllFields)
                    }}
                    placeholder={"Select date"}
                />
                <View style={this.renderError(VALIDATIONS.START_DATE) ? styles.unselectedLine : styles.line} />
                {this.renderError(VALIDATIONS.START_DATE)}
                <CoreoText style={styles.scheduleType}>End</CoreoText>
                <TouchableOpacity onPress={() => this.onChangeEndType(END_AFTER)} style={styles.occurencesOptionMargin}>
                    <RadioButton onPress={() => this.onChangeEndType(END_AFTER)} isSelected={this.state.selectedEndType === END_AFTER} />
                    <CoreoText style={styles.occurenceOptionText}>End after</CoreoText>
                </TouchableOpacity>
                {this.state.selectedEndType === END_AFTER ?
                    <View style={styles.occurencesOptionMargin}>
                        <CoreoFloatingInput
                            maxLength={2}
                            value={this.state.occurances}
                            keyValue={this.state.updateTextInput ? '0' : '1'}
                            onChangeText={(value) => {
                                let filteredValue = normalizeOccurence(value)
                                this.setState({
                                    occurances: filteredValue,
                                    updateTextInput: !this.state.updateTextInput
                                }, this.checkAllFields)
                            }}
                            selected={this.renderError(VALIDATIONS.OCCURANCES) ? false : true}
                            style={styles.inputStyle}
                            keyboardType="numeric"
                            editable={!_.isNil(this.state.recurringPattern)}
                        />
                        <CoreoText style={styles.occurenceOptionText}>occurrences</CoreoText>
                    </View> : null}
                {this.renderError(VALIDATIONS.OCCURANCES)}
                <TouchableOpacity  onPress={() => this.onChangeEndType(END_BY)} style={styles.occurencesOptionMargin}>
                    <RadioButton onPress={() => this.onChangeEndType(END_BY)} isSelected={this.state.selectedEndType === END_BY} />
                    <CoreoText style={styles.occurenceOptionText}>End by</CoreoText>
                </TouchableOpacity>
                {this.state.selectedEndType === END_BY ?
                    <View>

                        <Calendar
                            key={this.state.startDate ? '0' : '1'}
                            date={this.state.endDate}
                            minDate={this.getMinDate()}
                            onDateChange={(value) => { this.setState({ endDate: getFormatedDate(value, "YYYY-MM-DD")}, this.checkAllFields)
                        }}
                            placeholder={this.state.endDate ? null : "Select date"}
                            disabled={this.state.startDate && this.state.recurringPattern ? false : true}
                        />

                        <View style={styles.line} />
                        {this.renderError(VALIDATIONS.END_DATE)}
                    </View>
                    : null}
                <CoreoText style={styles.preferencesFields}>Select each preferred slot for receiving services</CoreoText>

                <Slots onSlotSelection={this.onReccuranceSlotSelection} slotData={this.state.reccuranceSlotData} />
                {this.isSlotsValid() ? null : this.renderError(null, "Please select slots")}
            </View>
        )
    }

    onChangeAddress = (address) => {
        let prevzip = this.state.zip
        this.setState({ ...address }, () => {
            if(!_.isNil(address.zip) && address.zip.toString().length === prevzip.toString().length){
                this.setState({isUpdated: !this.state.isUpdated})
            }
            this.checkAllFields()
        })
    }
    customMarkerLeft =()=>{
        return <View style={styles.sliderMarker}></View>
    }

    render() {
        let occurences = this.props.scheduleType && this.props.scheduleType.map((item, index) => {
            return (
                <View style={styles.occurencesOptionMargin} key={index}>
                 <TouchableOpacity
                            onPress={() => this.selectedScheduleType(item)}
                            style={styles.radioBox}
                        >
                    {this.state.selectedScheduleType === item.id ?
                       
                            <View style={styles.areaSelected}>
                                <View style={styles.selected} />
                            </View>
                         :
                     
                            <View style={styles.areaNotSelected} />
                    }
                    <View style={{ paddingLeft: 15 }}>
                        <CoreoText style={styles.occurenceOptionText}>{item.id && item.id === ONE_TIME ? RECCURING_ONE_TIME : item.name }</CoreoText>
                    </View>
                    </TouchableOpacity>
                </View>
            )
        })

        let stateOptions = this.props.statesType && this.props.statesType.map((state, i) => {
            return {
                label: state.name,
                value: state.id
            };
        });
        let normalizedStates = normalizeData(stateOptions, "value")
        let minExpSting = '<5 years';
        let minExpValue = this.state.minimumServiceProviderExperience
        let maxExpString = ">20 years"
        if(minExpValue === 5){
            minExpValue = "<5"
        }
        return (
            <OverlayLoaderWrapper isLoading={isAPIFetching(this.props.getPatientAddressStatus)}>
                <View style={styles.container}>
                    <SectionHeader title='Schedule and Frequency' />
                    <View style={styles.content}>
                        <CoreoText style={styles.scheduleType}>Schedule Type</CoreoText>
                        <View style={styles.occurencesMargin}>{occurences}</View>
                        {this.state.selectedScheduleType === ONE_TIME ? this.renderOneTimePattern() : this.renderRecurringPattern()}
                    </View>
                    <SectionHeader title='Point of Service' />
                    <View style={styles.content}>
                        <CoreoText style={styles.scheduleType}>Select your location</CoreoText>
                        <Address
                            selectedAddressKey={this.state.selectedAddressKey}
                            onPressArea={this.onPressArea}
                            patientAddressType={[{ addressId: DEFAULT_VALUE }, ...this.props.patientAddressType]}
                            onChangeText={this.onChangeAddress}
                            renderError={this.renderError}
                            addressType={this.state.addressType}
                            city={this.state.city}
                            street={this.state.street}
                            selectedStateKey={this.state.selectedStateKey}
                            zip={this.state.zip}
                            stateOptions={stateOptions}
                            normalizedStates={normalizedStates}
                            isUpdated={this.state.isUpdated}
                        />
                        {this.state.selectedAddressKey !== DEFAULT_VALUE
                            ?
                            this.renderError(VALIDATIONS.ADDRESS)
                            : null}
                    </View>
                    <SectionHeader title='Service Provider Preferences' />
                    <View style={styles.content}>
                        <CoreoText style={styles.scheduleType}>Gender</CoreoText>
                        <CoreoText style={styles.genderDesclaimer}>Caregiver gender preference will be confirmed/decided on at the time of the Initial Assessment to ensure the best match for your care needs.</CoreoText>
                        <Gender
                            selectedGenderKey={this.state.selectedGenderKey}
                            onSelectGender={this.onSelectGender}
                            genderType={this.props.genderType}
                        />
                  </View>
                    <ModalPopup
                        visible={this.state.posCustomOpen}
                        primaryButton="Yes"
                        secondaryButton="No"
                        centered={true}
                        onConfirm={() => this.setState({
                            posCustomOpen: !this.state.posCustomOpen,
                        }, () => {
                            this.setState({
                                selectedAddressKey: this.tempAddressKey,
                                addressType: "", city: "", state: "", street: "", zip: ""
                            })
                        })}
                        onCancel={() => this.setState({
                            posCustomOpen: !this.state.posCustomOpen,
                        })}
                    >
                        <Text style={styles.occurenceOptionText}>
                            Are you sure you want to discard the changes?
                        </Text>
                    </ModalPopup>
                </View>
               
            </OverlayLoaderWrapper>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onClickNext: (data) => dispatch(onNextClick(data)),
        getScheduleType: () => dispatch(getScheduleType()),
        getGender: () => dispatch(getGender()),
        getRecurringPattern: () => dispatch(getRecurringPattern()),
        getSlot: () => dispatch(getSlot()),
        getDays: () => dispatch(getDays()),
        getStates: () => dispatch(getStates()),
        getPatientAddress: () => dispatch(getPatientAddress()),
        posValidation: (data, onSuccess, onFailure) => dispatch(posValidation(data, onSuccess, onFailure))
    }
}

function mapStateToProps(state) {
    let servicerequestState = state.servicerequestState
    let dashboardState= state.DashboardState;
    return {
        schedulePreferencesObj: servicerequestState && state.servicerequestState.schedulepreferencesState.schedulePreferencesObj,
        getPatientAddressStatus: servicerequestState && state.servicerequestState.schedulepreferencesState.getPatientAddressStatus,
        scheduleType: dashboardState && state.DashboardState.dashboardState.lookupDetails.scehduleType,
        genderType: dashboardState && state.DashboardState.dashboardState.lookupDetails.gender,
        recurringpatternType: dashboardState && state.DashboardState.dashboardState.lookupDetails.recurringPattern,
        slotType: dashboardState && state.DashboardState.dashboardState.lookupDetails.slot,
        statesType: dashboardState && state.DashboardState.dashboardState.lookupDetails.state,
        patientAddressType: servicerequestState && state.servicerequestState.schedulepreferencesState.patientAddressType,
        reccuranceSlotData: servicerequestState && state.servicerequestState.schedulepreferencesState.schedulePreferencesObj && state.servicerequestState.schedulepreferencesState.schedulePreferencesObj.reccuranceSlotData,
        slotData: servicerequestState && state.servicerequestState.schedulepreferencesState.schedulePreferencesObj && state.servicerequestState.schedulepreferencesState.schedulePreferencesObj.slotData,
        minimumServiceProviderExperience: servicerequestState && state.servicerequestState.schedulepreferencesState.schedulePreferencesObj && state.servicerequestState.schedulepreferencesState.schedulePreferencesObj.minimumServiceProviderExperience,
        maximumServiceProviderExperience: servicerequestState && state.servicerequestState.schedulepreferencesState.schedulePreferencesObj && state.servicerequestState.schedulepreferencesState.schedulePreferencesObj.maximumServiceProviderExperience,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedulePreferences);
