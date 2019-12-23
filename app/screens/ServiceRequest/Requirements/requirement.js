import React, { Component } from 'react';
import {
    getServiceCategory, getServiceType,
    onCheckServiceTask, onCheckServiceType, onNextClick, onChangeSelectedCategoryId
} from '../../../redux/servicerequest/Requirements/actions'
import { connect } from 'react-redux'
import { CoreoText, CoreoFlatList, CoreoCheckBox, CoreoImage, CoreoFloatingInput, ModalPopup } from '../../../components';
import styles from './styles'
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import CoreoCard from '../../../components/LevelOne/CoreoCard';
import { setValueBasedOnHeight } from '../../../utils/deviceDimensions';
import { getArrayFromNormalizedData, getServiceIcon, getServiceRequestCategoryImage, isIOS } from '../../../utils/appUtils'
import images from '../../../assets/images';
import { _ } from '../../../utils/validations'
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';

class Requirement extends Component {
    selectedServiceTypes = {}
    selectedTasks = []
    tempServiceCategoryId = -1
    constructor(props) {
        super(props)
        this.state = {
            selectedItemCategoryId: props.selectedServiceCategoryId,
            selectedCatagoryDescription: '',
            selectedServiceTypeId: -1,
            ...props.requirementObj,
            isModalOpen: false,
            renderer: null
        }
    }

    componentDidMount() {
        const { selectedServiceCategoryId, typeList } = this.props
        if (typeList && typeList[selectedServiceCategoryId]) {
            let serviceTypes = typeList[selectedServiceCategoryId]
            Object.keys(serviceTypes).map((key) => {
                if (serviceTypes[key].selected) {
                    this.selectedServiceTypes = {
                        ...this.selectedServiceTypes,
                        [serviceTypes[key].serviceTypeId]: serviceTypes[key].serviceTypeId
                    }
                }
            })
        }
        if (typeList && _.isNil(typeList[selectedServiceCategoryId])) {
            if (this.props.requirementList && this.props.requirementList.length === 0) {
                this.props.getServiceCategory()
            }
            this.props.getServiceType(selectedServiceCategoryId)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isNextButtonClicked !== nextProps.isNextButtonClicked && nextProps.isNextButtonClicked) {
            this.onNextClick(this.state)
        }
    }

    onNextClick = () => {
        const { selectedServiceCategoryId, typeList } = this.props
        let selectedTypes = typeList[selectedServiceCategoryId] || {}
        let count = 0
        selectedTypes && Object.keys(selectedTypes).map(id => {
            if (selectedTypes[id].selected) {
                if (selectedTypes[id].serviceTask.filter(task => task.isDefault).length)
                    count++
            }
        })
        if (count === 0) {
            this.props.changeNextButtonClickFlag()
        } else {
            this.props.onClickNext && this.props.onClickNext(this.state);
            this.props.changeActiveIndex()
        }
    }

    onClickServiceCategory = (id) => {
        const { typeList } = this.props
        if (Object.keys(this.selectedServiceTypes).length > 0 && (id !== this.state.selectedItemCategoryId)) {
            this.setState({ isModalOpen: true })
            this.tempServiceCategoryId = id
        } else {
            this.setState({ selectedItemCategoryId: id, selectedServiceTypeId: -1 })
            this.props.onChangeSelectedCategoryId(id)
            if (!typeList[id]) {
                this.props.getServiceType(id)
            }
        }
    }

    onCheckServiceTask = (index) => {
        this.props.onCheckServiceTask(this.state.selectedServiceTypeId, index)
        this.props.removeError();
    }

    renderItemCategory = ({ item, index }) => {
        let selected = this.state.selectedItemCategoryId === item.serviceCategoryId
        return (
            <TouchableOpacity
                onPress={() => this.onClickServiceCategory(item.serviceCategoryId)}
            >
                <ImageBackground source={getServiceRequestCategoryImage(item.serviceCategoryId)} style={styles.categoryImage}>
                    <View style={[styles.bgContainer, selected ? {} : { backgroundColor: 'transparent' }]}>
                        <CoreoText style={[styles.textStyle, styles.categoryText, selected ? styles.selectedTextMargin : styles.unSelectedTextMargin]}>{item.serviceCategoryDescription}</CoreoText>
                        <View style={[styles.innerBorder, selected ? {} : {borderColor: "transparent"}]} />
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    onClickServiceType = ({ serviceTypeId }) => {
        this.setState({ selectedServiceTypeId: serviceTypeId })
    }

    renderItemType = ({ item, index }) => {
        const { typeList, selectedServiceCategoryId } = this.props
        let normalizedServiceTypes = typeList[selectedServiceCategoryId] || []
        let boxStyles = item.selected ? styles.checkedBoxStyle : {}

        return (
            <TouchableOpacity
                key={index}
                onPress={() => this.typeItemPressed(item)}
            >
                <View style={[styles.boxStyle, boxStyles]}>
                    {item.selected ?
                        <View style={styles.checkBoxContainer}>
                            <CoreoImage
                                source={images.completed}
                                style={styles.completedIcon}
                            />
                        </View> :
                        <View style={styles.emptyCheckBox} />
                    }
                    <CoreoImage
                        source={getServiceIcon("serviceType" + item.serviceTypeId)}
                        style={styles.categoryIcon}
                    />
                    <CoreoText style={[styles.textStyle, styles.description]}>{item.serviceTypeDescription}</CoreoText>
                </View>
            </TouchableOpacity>)
    }

    typeItemPressed = (item) => {
        this.onClickServiceType(item);
        if (this.selectedServiceTypes[item.serviceTypeId]) {
            delete this.selectedServiceTypes[item.serviceTypeId]
        } else {
            this.selectedServiceTypes = {
                ...this.selectedServiceTypes,
                [item.serviceTypeId]: item.serviceTypeId
            }
            this.props.onClickNext(this.state)
        }
        if(Object.keys(this.selectedServiceTypes).length > 0){
            this.props.removeError();
        }
        this.setState({ renderer: !this.state.renderer })
        this.props.onCheckServiceType(item.serviceTypeId)
    }

    renderTasksList = () => {
        const { selectedServiceCategoryId, typeList } = this.props
        let normalizedServiceTypes = typeList && typeList[selectedServiceCategoryId]
        if (_.isNil(normalizedServiceTypes)) return null
        let taskList = null
        let serviceType = ""
        taskList = normalizedServiceTypes[this.state.selectedServiceTypeId] && normalizedServiceTypes[this.state.selectedServiceTypeId].serviceTask && normalizedServiceTypes[this.state.selectedServiceTypeId].serviceTask.map((task, i) => {
            serviceType = normalizedServiceTypes[this.state.selectedServiceTypeId].serviceTypeDescription
            return (
                <CoreoCheckBox onPress={() => this.onCheckServiceTask(i)}
                    checked={task.isDefault}
                    checkboxColor={THEME_PRIMARY_COLOR}
                    style={styles.selectTaskContainer}
                    textStyle={styles.checkBoxText}
                    key={i}
                >{task.serviceTaskDescription}</CoreoCheckBox>
            )
        })
        if (!taskList) return null
        return (
            <View>
                <CoreoText style={styles.heading}>
                    Select the tasks for {serviceType}
                </CoreoText>
                {taskList}
            </View>
        )
    }

    onClickConfirm = () => {
        const { typeList } = this.props
        Object.keys(this.selectedServiceTypes).map((key, index) => {
            this.typeItemPressed({ serviceTypeId: key })
        })
        this.selectedServiceTypes = {}
        this.setState({ selectedItemCategoryId: this.tempServiceCategoryId, selectedServiceTypeId: -1 })
        this.props.onChangeSelectedCategoryId(this.tempServiceCategoryId)
        if (!typeList[this.tempServiceCategoryId]) {
            this.props.getServiceType(this.tempServiceCategoryId)
        }
        this.setState({ isModalOpen: false })
    }

    onCancel = () => {this.setState({
        isModalOpen: !this.state.isModalOpen,
    })}

    render() {

        const { selectedServiceCategoryId, typeList } = this.props 
        let normalizedServiceTypes = typeList && typeList[selectedServiceCategoryId]
        return (
            
            <View>
                <CoreoCard>
                    <CoreoCard style={styles.cardStyle}>
                        <CoreoText style={[styles.textStyle, styles.purpleText]}>
                            Service Category
                        </CoreoText>
                    </CoreoCard>

                    <CoreoCard style={[styles.cardStyle, { backgroundColor: '#ffffff'}]}>
                        <CoreoFlatList
                            itemKey={"serviceCategoryId"}
                            data={this.props.requirementList}
                            renderItem={this.renderItemCategory}
                            horizontal={true}
                            extraData={this.state.selectedItemCategoryId}
                        />
                    </CoreoCard>
                    <CoreoCard style={styles.cardStyle}>
                        <CoreoText style={[styles.textStyle, styles.purpleText]}>
                            Service Types
                        </CoreoText>
                    </CoreoCard>
                    <CoreoCard style={[styles.cardStyle, { backgroundColor: '#ffffff', height : setValueBasedOnHeight(200) }]}>
                        <CoreoFlatList
                            itemKey={"serviceTypeId"}
                            data={getArrayFromNormalizedData(normalizedServiceTypes)}
                            renderItem={(item, index) => this.renderItemType(item, index)}
                            horizontal={true}
                            extraData={{ serviceItem: this.state.renderer, category: this.state.selectedServiceTypeId }}
                        />
                    </CoreoCard>
                    <CoreoCard style={[styles.cardStyle]}>
                        <CoreoText style={styles.textAdditionalInfoStyle}>
                            Additional Information
                        </CoreoText>
                    </CoreoCard>
                        <CoreoCard style={[styles.cardStyle, { backgroundColor: '#ffffff', paddingTop: setValueBasedOnHeight(1) }]}>
                        <CoreoText style={[styles.taskText]}>
                            Tell us about yourself and your requirements
                        </CoreoText>
                        <CoreoFloatingInput
                            style={styles.inputStyle}
                            maxLength={1000}
                            value={this.state.selectedCatagoryDescription}
                            onChangeText={(value) => { this.setState({ selectedCatagoryDescription: value }) }}
                            multiline={true}
                            numberOfLines={10}
                            placeholder={'Write your description'}
                        />
                        <View style={styles.disclaimer}>
                            <CoreoText style={styles.disclaimerText}>
                                <CoreoText style={{ fontWeight: "500" }}>Disclaimer: </CoreoText>
                                Please note that this information will be available to Service Providers prior to hiring.
                            </CoreoText>
                        </View>
                        </CoreoCard>
                </CoreoCard>
                <View style={isIOS() ? {backgroundColor: '#ffffff', height: setValueBasedOnHeight(70)} : {}}/>
                <ModalPopup
                    visible={this.state.isModalOpen}
                    primaryButton="Yes"
                    secondaryButton="No"
                    centered={true}
                    onConfirm={this.onClickConfirm}
                    onCancel={this.onCancel}
                    customBtnFlag={true}
                >
                    <CoreoText style={styles.textStyle}>
                        Change in Service Category will discard the selection. Are you sure you want to change the Service Category.
                    </CoreoText>
                </ModalPopup>
            </View>
            
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getServiceCategory: () => dispatch(getServiceCategory()),
        getServiceType: (data) => dispatch(getServiceType(data)),
        onClickNext: (data) => dispatch(onNextClick(data)),
        onChangeSelectedCategoryId: (id) => dispatch(onChangeSelectedCategoryId(id)),
        onCheckServiceType: (id) => dispatch(onCheckServiceType(id)),
        onCheckServiceTask: (id, index) => dispatch(onCheckServiceTask(id, index))
    }
}

function mapStateToProps(state) {
    const requirementsState = state.servicerequestState && state.servicerequestState.requirementsState
    const requirementObj = requirementsState && requirementsState.requirementObj
    return {
        requirementList: requirementsState.requirementList,
        typeList: requirementsState.typeList,
        additionalDescription: requirementObj && requirementObj.additionalDescription,
        serviceCategoryDescription: requirementObj && requirementObj.serviceCategoryDescription,
        serviceTaskDescription: requirementObj && requirementObj.serviceTaskDescription,
        checkboxCount: requirementObj && requirementObj.checkboxCount,
        serviceTypeDescription: requirementObj && requirementObj.serviceTypeDescription,
        isLoading: state.loadingState.isLoading,
        selectedServiceCategoryId: requirementsState.selectedServiceCategoryId,
        requirementObj: requirementObj
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Requirement)