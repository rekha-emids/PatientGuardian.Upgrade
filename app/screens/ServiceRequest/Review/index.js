import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import CoreoCard from '../../../components/LevelOne/CoreoCard';
import { CoreoText, CoreoImage, CoreoScrollView, ModalPopup } from '../../../components';
import styles from './styles'
import { onNextClick, onCancelClick } from '../../../redux/servicerequest/Review/actions'
import { setFontSize } from '../../../utils/deviceDimensions';
import { getServiceIcon } from '../../../utils/appUtils'
import { connect } from 'react-redux'
import { ONE_TIME, END_AFTER, DAYS, OTHERS, NO_PREFERENCE } from '../../../constants/constants';
import { _ } from '../../../utils/validations'
import { getFormatedDate, getDayOfDate } from '../../../utils/momentUtil';
import { Slot } from '../SchedulePreferences/Slots'
import { onPreviousClick } from '../../../redux/servicerequest/SchedulePreferences/actions';
import { SERVICE_PROVIDERS, DASHBOARD, REQUESTS } from '../../HomeTabs';
import { onBack } from '../../../redux/navigation/actions';
import { SERVICEPROVIDERS_REQUESTS } from '../../ServiceProvidersTab';
import AlertPopup from '../../../components/LevelOne/AlertPopup';
class Review extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedServiceTypeId: -1,
            showModalOnSuccess: false,
        }
    }

    componentWillReceiveProps(nextprops) {
        if (this.props.isNextButtonClicked !== nextprops.isNextButtonClicked && nextprops.isNextButtonClicked) {
            this.props.onSubmitClick(this.onNxt, this.props.spId, this.onSuccessApprovalRequest, this.onSuccessPostedSR)

        }
    }

    onSuccessApprovalRequest = () => {
        this.approveRequestModal.open()
    }

    onSuccessPostedSR = () => {
        this.successfulRequestModal.open()
    }
    

    onNxt = () => {
        this.setState({ showModalOnSuccess: !this.state.showModalOnSuccess })
    }
    switchTab= () => {
        const {navigator} = this.props
        navigator && navigator.navigate(REQUESTS)
    }
    onConfirm = () => {
        this.props.onCancelClick()
        setTimeout(this.switchTab, 1000);
    
    }

    onClickBackToDashboard = () => {
        this.props.onCancelClick()
        if (this.props.navigator) {
            this.props.navigator.navigate(DASHBOARD)
        }
    }

    onSuccess = () => {
        this.props.onCancelClick()
       if (this.props.navigator) {
            this.props.navigator.navigate(SERVICE_PROVIDERS)
            this.props.navigator.navigate(SERVICEPROVIDERS_REQUESTS)
        }
        this.setState({ showModalOnSuccess: !this.state.showModalOnSuccess })

    }

    renderSPPreferences = () => {
        const { schedulePreferencesObj, genderType } = this.props
        let genderName = genderType.filter(gender => gender.id === schedulePreferencesObj.selectedGenderKey)[0].name
        if(genderName && genderName.toLowerCase() === OTHERS.toLocaleLowerCase()){
            genderName = NO_PREFERENCE
        }
        return (
            <View>
                <View style={styles.marginBottom}>
                <CoreoText style={[styles.heading]}>
                    Gender
                </CoreoText>
                <CoreoText style={[styles.taskText]}>
                    {genderName}
                </CoreoText>
                </View>
            </View>
        )
    }

    renderSlots = (scheduleType) => {
        const { schedulePreferencesObj } = this.props
        if (scheduleType === ONE_TIME) {
            return (
                <Slot day={getDayOfDate(schedulePreferencesObj.selectedDate)} slotData={schedulePreferencesObj.slotData} index={0} onPress={() => null} />
            )
        } else {
            let slotsData = []
            let daysIndex = []
            schedulePreferencesObj.reccuranceSlotData.map((day, index) => {
                let isSlotPresent = day.filter(slot => slot.selected).length > 0
                if (isSlotPresent) {
                    slotsData.push(day)
                    daysIndex.push(index)
                }
            })
            let slots = slotsData.map((slotData, iter) => {
                return <Slot day={DAYS[daysIndex[iter]]} slotData={slotData} index={0} onPress={() => null} />
            })
            return (
                <View>
                    <CoreoText style={styles.heading}>Recurring Pattern</CoreoText>
                    <CoreoText style={styles.taskText}>{schedulePreferencesObj.recurringPatternLabel}</CoreoText>
                    <View style={styles.slotsContainer}>
                        {slots}
                    </View>
                </View>
            )
        }
    }

    renderAddress = () => {
        const { schedulePreferencesObj, schedulepreferencesState } = this.props
        const { patientAddressType } = schedulepreferencesState
        let address = null
        if (schedulePreferencesObj.selectedAddressKey === -1) {
            address = {
                addressTypeId: schedulePreferencesObj.addressType,
                street: schedulePreferencesObj.street,
                stateName: schedulePreferencesObj.state,
                city: schedulePreferencesObj.city,
                zip: schedulePreferencesObj.zip
            }
        } else {
            address = patientAddressType.filter(address => address.addressId === schedulePreferencesObj.selectedAddressKey)
            address = address && address.length > 0 ? address[0] : {}
        }
        return (
            <View>
                 {address.addressTypeId ? <View style={styles.addressItem}>
                    <CoreoText style={[styles.heading]}>Address Type</CoreoText>
                    <CoreoText style={[styles.addressValue]}>{address.addressTypeId}</CoreoText>
                </View>: null}
                <View style={styles.addressItem}>
                    <CoreoText style={[styles.heading]}>Street</CoreoText>
                    <CoreoText style={[styles.addressValue]}>{address.street}</CoreoText>
                </View>
                <View style={styles.addressItem}>
                    <CoreoText style={[styles.heading]}>City</CoreoText>
                    <CoreoText style={[styles.addressValue]}>{address.city}</CoreoText></View>
                <View style={styles.addressItem}><CoreoText style={[styles.heading]}>State</CoreoText>
                    <CoreoText style={[styles.addressValue]}>{address.stateName}
                    </CoreoText>
                </View>
                <View style={styles.addressItem}>
                    <CoreoText style={[styles.heading]}>Zip
                </CoreoText>
                    <CoreoText style={[styles.addressValue]}>{address.zip}
                    </CoreoText>
                </View>
            </View>
        )
    }

    renderServiceTasks = () => {
        const { selectedServiceCategoryId, typeList } = this.props
        let normalizedServiceTypes = typeList[selectedServiceCategoryId]
        if (_.isNil(normalizedServiceTypes)) return null
        let taskList = null
        let counter = 0;
        taskList = normalizedServiceTypes[this.state.selectedServiceTypeId] && normalizedServiceTypes[this.state.selectedServiceTypeId].serviceTask && normalizedServiceTypes[this.state.selectedServiceTypeId].serviceTask.map((task, i) => {
            if (!task.isDefault) return null
            counter++
            return (
                <View style={styles.tasksContainer}>
                    <View style={styles.countBg}>
                        <CoreoText style={styles.count}>{counter}</CoreoText>
                    </View>
                    <CoreoText style={styles.taskText}>{task.serviceTaskDescription}</CoreoText>
                </View>
            )
        })
        if (!taskList) return null
        return (
            <View>
                {taskList}
            </View>
        )
    }

    render() {
        const { requirementObj, schedulePreferencesObj, selectedServiceCategoryId, requirementList, typeList } = this.props
        let categoryTypes = typeList && typeList[selectedServiceCategoryId]
        if (_.isNil(categoryTypes)) return null
        let serviceTypes = []
        categoryTypes && Object.keys(categoryTypes).map(key => {
            if (categoryTypes[key].selected) {
                serviceTypes.push(categoryTypes[key])
            }
        })

        const serviceTypeCard = serviceTypes && serviceTypes.map((service, i) => {
            return (
                <TouchableOpacity key={i} onPress={() => {this.setState({selectedServiceTypeId: service.serviceTypeId})}} style={[styles.boxStyle]}>

                      
                        <CoreoImage
                            source={getServiceIcon("serviceType" + service.serviceTypeId)}
                            style={styles.categoryIcon}
                        />
                        <CoreoText style={[styles.textStyle, { fontSize: setFontSize(12), color: '#444444', textAlign: 'center' }]}>{service.serviceTypeDescription}</CoreoText>
                </TouchableOpacity>
            )
        })
        let serviceCategoryDescription = requirementList.filter(service => service.serviceCategoryId === selectedServiceCategoryId)[0].serviceCategoryDescription
        let occurance = null
        let scheduleType = "One time schedule"
        if (schedulePreferencesObj.selectedScheduleType === ONE_TIME) {
            occurance = getFormatedDate(schedulePreferencesObj.selectedDate, "MM/DD/YYYY")
        } else {
            scheduleType = "Recurring Schedule"
            if (schedulePreferencesObj.selectedEndType === END_AFTER) {
                occurance = getFormatedDate(schedulePreferencesObj.startDate, "MM/DD/YYYY") + " - " + schedulePreferencesObj.occurances + " occurrence"
            } else {
                occurance = getFormatedDate(schedulePreferencesObj.startDate, "MM/DD/YYYY") + " - " + getFormatedDate(schedulePreferencesObj.endDate, "MM/DD/YYYY")
            }
        }
        return (
            <View>
                <CoreoCard>
                    <CoreoCard style={styles.cardStyle}>
                        <CoreoText style={[styles.textStyle, styles.textColor]}>
                            Service Category
                        </CoreoText>
                    </CoreoCard>
                    <CoreoCard style={[styles.cardStyle, { backgroundColor: '#ffffff' }]}>
                        <CoreoText style={[styles.textStyle, styles.taskText]}>
                            {serviceCategoryDescription}
                        </CoreoText>
                    </CoreoCard>

                    <CoreoCard style={styles.cardStyle}>
                        <CoreoText style={[styles.textStyle, styles.textColor]}>
                            Service Types
                        </CoreoText>
                    </CoreoCard>

                    <CoreoCard style={[styles.cardStyle, { backgroundColor: '#ffffff' }]}>
                        <CoreoScrollView horizontal={true} style={{flexDirection:'row'}}>
                        {serviceTypeCard}
                        </CoreoScrollView>
                    </CoreoCard>

                {requirementObj.selectedCatagoryDescription && requirementObj.selectedCatagoryDescription.length > 0 ? 
                <View>
                <CoreoCard style={styles.cardStyle}>
                            <CoreoText style={[styles.textStyle, styles.textColor]}>
                                Additional Information
                        </CoreoText>
                    </CoreoCard>

                    <CoreoCard style={[styles.cardStyle, { backgroundColor: '#ffffff' }]}>
                            <CoreoText style={[styles.textStyle, styles.taskText]}>
                            {requirementObj.selectedCatagoryDescription}
                            </CoreoText>
                    </CoreoCard>
                    </View> : null}

                    <CoreoCard style={styles.cardStyle}>
                            <CoreoText style={[styles.textStyle, styles.textColor]}>
                                Schedule and Frequency
                            </CoreoText>
                    </CoreoCard>

                    <CoreoCard style={[styles.cardStyle,styles.whiteCardStyle]}>
                        <CoreoText style={styles.heading}>{scheduleType}</CoreoText>
                        <CoreoText style={styles.taskText}>{occurance}</CoreoText>
                        {this.renderSlots(schedulePreferencesObj.selectedScheduleType)}
                    </CoreoCard>

                    <CoreoCard style={styles.cardStyle}>
                            <CoreoText style={[styles.textStyle, styles.textColor]}>
                                Point Of Service
                            </CoreoText>
                    </CoreoCard>

                    <CoreoCard style={[styles.cardStyle,styles.whiteCardStyle]}>
                        {this.renderAddress()}
                    </CoreoCard>

                    <CoreoCard style={styles.cardStyle}>
                            <CoreoText style={[styles.textStyle, styles.textColor]}>
                                Service Provider Preferences
                            </CoreoText>
                    </CoreoCard>

                    <CoreoCard style={[styles.cardStyle, { backgroundColor: '#ffffff' }]}>
                        {this.renderSPPreferences()}
                    </CoreoCard>
                    <ModalPopup
                        visible={this.state.showModalOnSuccess}
                        primaryButton={`Browse Providers`}
                        secondaryButton={`Go to Dashboard`}
                        centered={true}
                        onConfirm={this.onSuccess}
                        onCancel={this.onClickBackToDashboard}
                    >
                    <Text style={styles.popupText}>Service Request created successfully.</Text>
                    </ModalPopup>
                </CoreoCard>
                <AlertPopup
                    alertText="Service Request created successfully. This request has been send for approval, once the request is approved the SP can be engaged."
                    ref={ref => this.approveRequestModal = ref}
                    onConfirm={this.onConfirm}
                />
                <AlertPopup
                    alertText="Service Request created successfully."
                    ref={ref => this.successfulRequestModal = ref}
                    onConfirm={this.onConfirm}
                />
            </View>
                )
            }
        }

        function mapDispatchToProps(dispatch) {
            return{
                goBack: () => dispatch(onBack()),
                onSubmitClick: (onNxt, spId, onSuccessApprovalRequest, onSuccessPostedRequest) => dispatch(onNextClick(onNxt, spId, onSuccessApprovalRequest, onSuccessPostedRequest)),
                onClickPrevious: () => dispatch(onPreviousClick()),
                GotoServiceProvider:() => dispatch(GotoServiceProvider()),
                onCancelClick:()=>dispatch(onCancelClick())
            }
        }
        
        function mapStateToProps(state) {
            let servicerequestState = state.servicerequestState
            return {
                genderType: state.DashboardState && state.DashboardState.dashboardState.lookupDetails.gender,
                requirementObj: servicerequestState && state.servicerequestState.requirementsState.requirementObj,
                schedulepreferencesState: servicerequestState && state.servicerequestState.schedulepreferencesState,
                schedulePreferencesObj: servicerequestState && state.servicerequestState.schedulepreferencesState.schedulePreferencesObj,
                selectedServiceCategoryId: servicerequestState && state.servicerequestState.requirementsState.selectedServiceCategoryId,
                typeList: servicerequestState && state.servicerequestState.requirementsState.typeList,
                requirementList: servicerequestState && state.servicerequestState.requirementsState.requirementList,
                postServiceRequestStatus: servicerequestState && state.servicerequestState.reviewState.postServiceRequestStatus
            };
        }
        
export default connect (mapStateToProps,mapDispatchToProps) (Review)