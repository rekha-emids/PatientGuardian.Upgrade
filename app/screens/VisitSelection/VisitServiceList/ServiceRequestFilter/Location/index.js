import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Platform, TouchableOpacity} from 'react-native'
import {getPointOfServices} from '../../../../../redux/serviceProvidersTab/requestsTab/actions'
import styles from './styles'
import { CoreoText, CoreoScrollView, CoreoFloatingInput } from '../../../../../components';
import FloatingLabelPicker from '../../../../../components/Base/FloatingLabelPicker';
import { generatePickerValues } from '../../../../../utils/appUtils';
import Icons from '../../../../../assets/images/Icons';
import Icon from '../../../../../components/Base/Icon';
import {_} from '../../../../../utils/validations'
import { setFontSize } from '../../../../../utils/deviceDimensions';

export const OTHER_LOCATION_ID = -1
class Location extends Component {

    componentDidMount(){
        const {pointOfServices} = this.props
        if(_.isNil(pointOfServices)){
            this.props.getPointOfServices()
        }
    }

    renderError = () => {
        const {zip} = this.props.otherLocation
        if(!_.isNil(zip) && zip.length !== 5){
            let icon = Icons.closeCircleAndroid
            if(Platform.OS === 'ios'){
              icon = Icons.closeCircleIos
            }
            return (
                <View style={styles.errorMsgContainer}>
                    <Icon {...icon} size={setFontSize(18)} color="#c04e59" />
                    <CoreoText style={styles.errorMsg}>Zip code must be 5 digit number</CoreoText>
                </View>
            )
        }
        return null
    }

    renderFileds = () => {
        const {onChangeText, selectedAddressId} = this.props
        // if(selectedAddressId !== OTHER_LOCATION_ID) return null
        const {street, city, state, zip, range} = this.props.otherLocation
        let states = generatePickerValues(this.props.states, "name", "id");
        states.unshift({
            label: 'Select State',
            value: null
        });
        return (
            <View style={styles.item}>
                <CoreoFloatingInput
                    placeholder={'Street'}
                    value={street}
                    onChangeText={(text) => onChangeText(text, "street")}
                    label={"Street"}
                />
                <CoreoFloatingInput
                    placeholder={'City'}
                    value={city}
                    onChangeText={(text) => onChangeText(text, "city")}
                    label={"City"}
                /> 
                 <FloatingLabelPicker
                    placeholder={'Select State'}
                    label={"State"}
                    value={state || null}
                    onChange={(item, value) => {onChangeText(item, "state")}}
                    items={states}
                />
                <CoreoFloatingInput
                    placeholder={'Zip'}
                    value={zip}
                    onChangeText={(text) => onChangeText(text, "zip")}
                    label={"Zip"}
                    keyboardType={"numeric"}
                    maxLength={5}
                />    

                <CoreoFloatingInput
                    placeholder={'0'}
                    value={range}
                    onChangeText={(text) => onChangeText(text, "range")}
                    label={"Range(in miles)"}
                    keyboardType={"numeric"}
                    maxLength={3}
                />
                {this.renderError()}
            </View>
        )
    }

    renderAddress = () => {
        const {pointOfServices, selectedAddressId, onChangeSelectedAddress} = this.props
        let pointOfServiceComponents = null
        pointOfServiceComponents = pointOfServices && pointOfServices.map((service) => {
            let isSelected  = selectedAddressId === service.addressId
            return (
                <View style={styles.addressContainer}>
                    <View style={styles.itemContainer}>
                        <TouchableOpacity onPress={() => onChangeSelectedAddress(service.addressId)} style={[styles.radioButtonOuterCircle, isSelected ? styles.selectedRadioButtonOuterLayer :{}]}>
                            <View style={[styles.radioButtonInnerCircle, isSelected ? styles.selectedRadioButtonInnerLayer : {}]}/>
                        </TouchableOpacity>
                        <CoreoText style={styles.title}>{service.addressTypeId}</CoreoText>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.itemContainer}>
                            <CoreoText style={styles.heading}>Street</CoreoText>
                            <CoreoText style={styles.value}>{service.street}</CoreoText>
                        </View>
                        <View style={styles.itemContainer}>
                            <CoreoText style={styles.heading}>City</CoreoText>
                            <CoreoText style={styles.value}>{service.city}</CoreoText>
                        </View>
                        <View style={styles.itemContainer}>
                            <CoreoText style={styles.heading}>State</CoreoText>
                            <CoreoText style={styles.value}>{service.state}</CoreoText>
                        </View>
                        <View style={styles.itemContainer}>
                            <CoreoText style={styles.heading}>Range (in miles)</CoreoText>
                            <CoreoText style={styles.value}>{service.range}</CoreoText>
                        </View>
                    </View>
                </View>
            )
        })
        return pointOfServiceComponents
    }

    render(){
        const {selectedAddressId, onChangeSelectedAddress, pointOfServices} = this.props
        if(_.isNil(pointOfServices)) return null
        let isSelected = selectedAddressId === OTHER_LOCATION_ID
        return (
            <View style={styles.container}>
                <CoreoText style={styles.title}>Select the location</CoreoText>
                <CoreoScrollView>
                    {/* {this.renderAddress()} */}
                    <View style={styles.addressContainer}>
                        <View style={styles.itemContainer}>
                            <TouchableOpacity style={[styles.radioButtonOuterCircle, styles.selectedRadioButtonOuterLayer]}>
                                <View style={[styles.radioButtonInnerCircle, styles.selectedRadioButtonInnerLayer]}/>
                            </TouchableOpacity>
                            <CoreoText style={styles.title}>All</CoreoText>
                        </View>
                        {this.renderFileds()}
                    </View>
                </CoreoScrollView>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        pointOfServices: state.serviceProvidersTabState && state.serviceProvidersTabState.requestsState.pointOfServices,
        states: state.DashboardState && state.DashboardState.dashboardState.lookupDetails.state
    }
}

function mapDispatchToProps(dispatch){
    return {
        getPointOfServices: () => dispatch(getPointOfServices())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Location)