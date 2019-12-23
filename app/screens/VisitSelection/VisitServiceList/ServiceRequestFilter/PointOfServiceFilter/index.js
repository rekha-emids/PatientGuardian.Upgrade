import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Platform, TouchableOpacity} from 'react-native'
import { Container, Content } from 'native-base';
import {getPointOfServices} from '../../../../../redux/serviceProvidersTab/requestsTab/actions'
import styles from './styles'
import { CoreoText, CoreoFloatingInput } from '../../../../../components';
import FloatingLabelPicker from '../../../../../components/Base/FloatingLabelPicker';
import { generatePickerValues } from '../../../../../utils/appUtils';
import Icons from '../../../../../assets/images/Icons';
import Icon from '../../../../../components/Base/Icon';
import {_} from '../../../../../utils/validations'
import { setFontSize } from '../../../../../utils/deviceDimensions';

export const OTHER_LOCATION_ID = -1
class PointOfServiceFilter extends Component {

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
        if(selectedAddressId !== OTHER_LOCATION_ID) return null
        const {street, city, state, zip} = this.props.otherLocation
        let normalizedStates = generatePickerValues(this.props.states, "name", "id")
        return (
            <View style={styles.item}>
                <CoreoFloatingInput
                    value={street}
                    onChangeText={(text) => onChangeText(text, "street")}
                    label={"Street"}
                />
                <CoreoFloatingInput
                    value={city}
                    onChangeText={(text) => onChangeText(text, "city")}
                    label={"City"}
                /> 
                <FloatingLabelPicker
                    label={"State"}
                    value={state ? state :"Alaska"}
                    onChange={(item, value) => {onChangeText(item, "state", normalizedStates[item].label)}}
                    items={normalizedStates}
                    placeholder={"Select State"}
                    pickerStyle={styles.pickerStyle}
                    containerStyle={styles.containerStyle}
                />
                <CoreoFloatingInput
                    value={zip}
                    onChangeText={(text) => onChangeText(text, "zip")}
                    label={"Zip"}
                    keyboardType={"numeric"}
                    maxLength={5}
                />    
                {this.renderError()}
            </View>
        )
    }

    renderAddress = () => {
        const {pointOfServices, selectedAddressId, editable, onChangeSelectedAddress} = this.props
        let pointOfServiceComponents = null
        let count = 0
        pointOfServiceComponents = pointOfServices && pointOfServices.map((service) => {
            if(!editable && selectedAddressId !== service.addressId) return null
            let isSelected  = selectedAddressId === service.addressId
            if(!editable && count > 0) return null
            count = count + 1
            return (
                <TouchableOpacity style={styles.addressContainer} onPress={() => onChangeSelectedAddress(service.addressId, service)}>
                    <View style={styles.itemContainer}>
                        <View style={[styles.radioButtonOuterCircle, isSelected ? styles.selectedRadioButtonOuterLayer :{}]}>
                            <View style={[styles.radioButtonInnerCircle, isSelected ? styles.selectedRadioButtonInnerLayer : {}]}/>
                        </View>
                        <CoreoText style={styles.heading}>Street</CoreoText>
                        <CoreoText style={styles.value}>{service.street}</CoreoText>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.itemContainer}>
                            <CoreoText style={styles.heading}>City</CoreoText>
                            <CoreoText style={styles.value}>{service.city}</CoreoText>
                        </View>
                        <View style={styles.itemContainer}>
                            <CoreoText style={styles.heading}>State</CoreoText>
                            <CoreoText style={styles.value}>{service.stateName}</CoreoText>
                        </View>
                        <View style={styles.itemContainer}>
                            <CoreoText style={styles.heading}>Zip</CoreoText>
                            <CoreoText style={styles.value}>{service.zip}</CoreoText>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        })
        return pointOfServiceComponents
    }

    render(){
        const {selectedAddressId, onChangeSelectedAddress, pointOfServices} = this.props
        if(_.isNil(pointOfServices)) return null
        let isSelected = selectedAddressId === OTHER_LOCATION_ID
        return (
            <Container>
                <Content>
                    <View style={styles.container}>
                        <CoreoText style={styles.title}>Select Point of Service</CoreoText>
                        <View>
                            {this.renderAddress()}
                        {this.props.editable && <View style={styles.addressContainer}>
                                <View style={styles.itemContainer}>
                                    <TouchableOpacity onPress={() => onChangeSelectedAddress(OTHER_LOCATION_ID, null)} style={[styles.radioButtonOuterCircle,  isSelected ? styles.selectedRadioButtonOuterLayer :{}]}>
                                        <View style={[styles.radioButtonInnerCircle, isSelected ? styles.selectedRadioButtonInnerLayer : {}]}/>
                                    </TouchableOpacity>
                                    <CoreoText style={styles.title}>Other Location</CoreoText>
                                </View>
                                {this.renderFileds()}
                            </View>}
                        </View>
                    </View>
                </Content>
            </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(PointOfServiceFilter)