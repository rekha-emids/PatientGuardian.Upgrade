import React, { Component } from 'react';
import {connect} from 'react-redux'
import { CoreoWizScreen, FlowNavigator, ModalPopup, CoreoText } from '../../../components';
import { ServiceRequestNavigationData } from '../../../data/ServiceRequestNavigationData'
import { MENUS, BUTTONS } from '../../../constants/config';
import {onCancelClick, cancelClick} from '../../../redux/servicerequest/Requirements/actions'
import {cancelClick as cancelSubmitRequirements} from '../../../redux/servicerequest/SchedulePreferences/actions'
import Review from '../Review';
import { SchedulePreferences } from '../..';
import { _ } from '../../../utils/validations'
import Requirement from './requirement'
import styles from './styles'
import SafeAreaView from '../../../components/LevelOne/SafeAreaView/index'
import Navbar from '../../../components/LevelOne/Navbar';
import { OverlayLoaderWrapper } from '../../../components/Base/Preloader/Preloader';
import { isAPIFetching } from '../../../utils/AppAPIUtils';
import ErrorBoundaryHOC from '../../../ErrorBoundaryHOC';
class Requirements extends Component {
    constructor(props) {
        super(props)
        this.errorMessage = null
        this.state = {
            activeScreenId: 1,
            isSchedulePreferenceNextClicked: null,
            isRequirementsNextClicked: null,
            isReviewNextClicked: null,
            isModalOpen: false,
            isNavModalOpen: false,
            isPrevButtonClicked: false,
            showError:false
        }
    }

    componentWillUnmount(){
        this.props.cancelClickRequirements()
        this.props.cancelSubmitRequirements()
    }

    onClickCancelButton = () => {
        const {requirementObj} = this.props
        if(requirementObj && Object.keys(requirementObj).length === 0){
            this.props.onClickCancel()
        }
        else {
            this.setState({isModalOpen: true})
        }
    }

    onClickBackButton = () => {
        const {requirementObj} = this.props
        if(requirementObj && Object.keys(requirementObj).length === 0){
            this.props.onClickCancel()
        }
        else {
            this.setState({isNavModalOpen: true})
        }
    }

    changeActiveIndex = () => {
        let currentValue = this.state.activeScreenId
        currentValue++
        switch(currentValue){
            case 2:
            case 3:
                this.setState({activeScreenId:currentValue, showError: false})
                break;
            default:
                this.setState({showError: false})
                break
        }
    }

    onClickPrevButton = () => {
        let currentIndex = this.state.activeScreenId
        switch(currentIndex){
            case 2:{
                this.setState({isRequirementsNextClicked: false, showError:false, isPrevButtonClicked: !this.state.isPrevButtonClicked}, () => {
                    this.setState({activeScreenId: currentIndex - 1})
                })
                break;

            }
            case 3:{
                this.setState({isSchedulePreferenceNextClicked: false, showError:false}, () => {
                    this.setState({activeScreenId: currentIndex - 1})
                })
                break;
            }
            default:
                this.setState({showError: false})
                break
        }
    }

    changeRequirementsNextButtonClickFlag = () => {
        this.setState({isRequirementsNextClicked: false, isPrevButtonClicked: !this.state.isPrevButtonClicked,showError:true})
    }

    changeScheduleNextButtonFlag = (errorMsg = null) => {
        this.errorMessage = errorMsg
        this.setState({isSchedulePreferenceNextClicked: false,showError:true})
    }

    onClickButtonNext = (data) => {
        let currentValue = this.state.activeScreenId
        currentValue++

        switch(currentValue){
            case 2:{
                this.setState({isRequirementsNextClicked: true})
                break;

            }
            case 3:{
                this.setState({isSchedulePreferenceNextClicked: true})
                break;
            }

            case 4:{
                this.setState({isReviewNextClicked: true})
                break;
            }
        }

    }

    removeError = () => {
        this.setState({showError: false})
    }

    loadScreen = () => {
        const {navigation} = this.props || {}
        const {navigator, spId} = navigation && navigation.state && navigation.state.params || {}
        switch (this.state.activeScreenId) {
            case 1: {
                return <Requirement removeError={this.removeError} changeNextButtonClickFlag={this.changeRequirementsNextButtonClickFlag} changeActiveIndex={this.changeActiveIndex}  isNextButtonClicked={this.state.isRequirementsNextClicked}/>
            }
            case 2: {
                return (<SchedulePreferences removeError={this.removeError} changeNextButtonClickFlag={this.changeScheduleNextButtonFlag} changeActiveIndex={this.changeActiveIndex} isNextButtonClicked={this.state.isSchedulePreferenceNextClicked} isPrevButtonClicked={this.state.isPrevButtonClicked} />)
            }

            case 3: {
                return (<Review spId={spId} navigator={navigator} isNextButtonClicked={this.state.isReviewNextClicked} />)
            }

        }
    }
    render() {
        const menus = [MENUS.CONTACT];
        let footerButtons = [BUTTONS.CANCEL, BUTTONS.PREVIOUS, BUTTONS.NEXT];
        if(this.state.activeScreenId === 1){
            footerButtons = [BUTTONS.CANCEL, BUTTONS.NEXT]
        }else if(this.state.activeScreenId === 3){
            footerButtons = [BUTTONS.CANCEL, BUTTONS.PREVIOUS, BUTTONS.POST]
        }
        const NavigationData = ServiceRequestNavigationData

        return (
            <SafeAreaView>
                <Navbar title="Create New Service Request" onClickBackButton={this.onClickBackButton} showEmptyAdd={true}/>
                <OverlayLoaderWrapper isLoading={isAPIFetching(this.props.postServiceRequestStatus, this.props.getServiceCategoryStauts, this.props.getServiceTypesStatus)}>
                <FlowNavigator
                    coreoWizNavigationData={NavigationData}
                    activeFlowId={this.state.activeScreenId}
                    connectorStyle={styles.connectorStyle}
                    containerStyle={styles.flowNavigatorStyle}
                />
                <CoreoWizScreen
                    menus={menus}
                    activeFlowId={this.state.activeScreenId}
                    footerButtons={footerButtons}
                    isNextDisabled={false}
                    onNextClick={this.onClickButtonNext}
                    onCancelClick={this.onClickCancelButton}
                    onPreviousClick={this.onClickPrevButton}
                    showError={this.state.showError}
                    errorMsg={this.errorMessage}
                >
                    {this.loadScreen()}
                    
                </CoreoWizScreen>
                <ModalPopup
                    visible={this.state.isModalOpen}
                    primaryButton="Yes"
                    secondaryButton = "No"
                    centered={true}
                    onConfirm={() => this.setState({
                        isModalOpen: !this.state.isModalOpen,
                    }, () => {
                        this.props.onClickCancel()
                    })}
                    onCancel={() => this.setState({
                        isModalOpen: !this.state.isModalOpen,
                    })}
                    customBtnFlag={true}
                >
                    <CoreoText style={[styles.textStyle, styles.messageTextCenter]}>
                        Do you want to cancel the Service Request?
                    </CoreoText>
                </ModalPopup>
                <ModalPopup
                    visible={this.state.isNavModalOpen}
                    primaryButton="Yes"
                    secondaryButton = "No"
                    centered={true}
                    onConfirm={ () => {
                        this.props.onClickCancel()
                        this.setState({isNavModalOpen: false})
                    }}
                    onCancel={() => this.setState({
                        isNavModalOpen: !this.state.isNavModalOpen,
                    })}
                    customBtnFlag={true}
                >
                <CoreoText style={styles.popupTextStyle}>
                Are you sure you want to discard the changes?            
              </CoreoText>
                </ModalPopup>
                {/* <OverlayLoaderWrapper style={styles.loaderWrapper} isLoading={isAPIFetching(this.props.getServiceCategoryStauts, this.props.getServiceTypesStatus)}> */}
               </OverlayLoaderWrapper>
            </SafeAreaView>
        )
    }
}

function mapStateToProps(state) {
    let servicerequestState = state.servicerequestState;
    return {
        getServiceCategoryStauts: servicerequestState && state.servicerequestState.requirementsState.getServiceCategoryStauts,
        getServiceTypesStatus: servicerequestState && state.servicerequestState.requirementsState.getServiceTypesStatus,
        requirementObj: servicerequestState && state.servicerequestState.requirementsState.requirementObj,
        postServiceRequestStatus: servicerequestState && state.servicerequestState.reviewState.postServiceRequestStatus

    }
}

function mapDispatchToProps(dispatch) {
    return {
        onClickCancel: () => dispatch(onCancelClick()),
        cancelClickRequirements: () => dispatch(cancelClick()),
        cancelSubmitRequirements: () => dispatch(cancelSubmitRequirements())
    }
}

export default ErrorBoundaryHOC(connect(mapStateToProps, mapDispatchToProps)(Requirements))