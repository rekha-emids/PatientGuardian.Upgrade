import React, {Component} from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import { CoreoText, CoreoFloatingInput, Select } from '../../../components';
import styles from './styles';
import addressStyle from '../SchedulePreferences/styles'
import { VALIDATIONS, DEFAULT_VALUE } from '../../../constants/constants';
import schedulePreferenceStyles from '../SchedulePreferences/styles'
import { numericComparer, validateCoordinates } from '../../../utils/appUtils';
class Address extends Component{
    render(){
       const {onChangeText, renderError, normalizedStates, selectedAddressKey, addressType, street, city, stateOptions, selectedStateKey, zip} = this.props
       const addresses = this.props.patientAddressType.map((address, index) => 
                <View style={styles.serciceAreaItem} key={index}>
                 <View style={styles.radioBox}>
                    <TouchableOpacity onPress={() => this.props.onPressArea(address.addressId)}>
                    {selectedAddressKey ===  address.addressId
                       
                            ? <View style={styles.areaSelected}>
                                <View style={styles.selected}/>
                            </View>
                         :                                                <View style={styles.areaNotSelected}/>
                    }
                    </TouchableOpacity>
                    <View style={styles.dataView}>
                        {address.addressId === DEFAULT_VALUE
                            ? <View>
                                <TouchableOpacity onPress={() => this.props.onPressArea(address.addressId)}>
                                    <CoreoText style={styles.text}>New Address</CoreoText>
                                    <CoreoText style={styles.detailValue}>Enter a new location</CoreoText>
                                </TouchableOpacity>
                            {selectedAddressKey === DEFAULT_VALUE
                            ? <View style={addressStyle.addressFieldsMargin}>
                                <View style={addressStyle.inputViewstyle}>
                                    <CoreoFloatingInput
                                        placeholder="Enter Address Type"
                                        label="Address Type"
                                        maxLength={15}
                                        onChangeText={(text) => onChangeText({addressType: text})}
                                        value={addressType}
                                    />
                                </View>
                                <View style={addressStyle.inputViewstyle}>
                                    <CoreoFloatingInput
                                        placeholder="Enter Street"
                                        label="Street"
                                        maxLength={500}
                                        onChangeText={(text) => onChangeText({street: text})}
                                        value={street}
                                        selected = {!renderError(VALIDATIONS.STREET)}
                                    />
                                    {renderError(VALIDATIONS.STREET)}
                                </View>
                                <View style={addressStyle.inputViewstyle}>
                                    <CoreoFloatingInput
                                        placeholder="Enter City"
                                        label="City"
                                        onChangeText={(text) => onChangeText({city: text})}
                                        value={city}
                                        selected = {!renderError(VALIDATIONS.CITY)}
                                    />
                                    {renderError(VALIDATIONS.CITY)}
                                </View>
                                <View style={addressStyle.inputViewstyle}>
                                    <Text style={styles.stateLabel}>State</Text>
                                    <Select
                                        placeholder="Select State"
                                        selectedValue={selectedStateKey}
                                        style={addressStyle.planstyle}
                                        itemTextStyle={addressStyle.itemTextStyle}
                                        onValueChange={(value) => {
                                            normalizedStates[value] &&  onChangeText({selectedStateKey: value, state: normalizedStates[value].label})
                                        }}
                                        dataArray={stateOptions}
                                        />
                                    <View style={renderError(VALIDATIONS.STATE) ? addressStyle.unselectedLine : addressStyle.line}/>
                                    {renderError(VALIDATIONS.STATE)}
                                </View>
                                <View style={addressStyle.inputViewstyle}>
                                    <CoreoFloatingInput
                                        placeholder="Enter Zip"
                                        label="Zip"
                                        maxLength={5}
                                        onChangeText={(text) => onChangeText({zip: text})}
                                        value={zip}
                                        keyboardType={'numeric'}
                                        selected = {!renderError(VALIDATIONS.ZIP)}
                                        key={this.props.isUpdated ? "1" : "0"}
                                    />
                                    {renderError(VALIDATIONS.ZIP)}
                                </View>
                            </View> : null}
                            </View>
                            : <TouchableOpacity onPress={() => this.props.onPressArea(address.addressId)}>
                                {address.addressTypeId ? <View style={styles.directionRow}>
                                    <CoreoText style={styles.detailKey}>Address Type</CoreoText>
                                    <CoreoText style={styles.detailValue} numberOfLines={1}>{address.addressTypeId}</CoreoText>
                                </View> : null}
                                <View style={styles.directionRow}>
                                    <CoreoText style={styles.detailKey}>Street</CoreoText>
                                    <CoreoText style={styles.detailValue} numberOfLines={1}>{address.street}</CoreoText>
                                </View>
                                <View style={styles.directionRow}>
                                    <CoreoText style={styles.detailKey}>City</CoreoText>
                                    <CoreoText style={styles.detailValue} numberOfLines={1}>{address.city}</CoreoText>
                                </View>
                                <View style={styles.directionRow}>
                                    <CoreoText style={styles.detailKey}>State</CoreoText>
                                    <CoreoText style={styles.detailValue} numberOfLines={1}>{address.state || address.stateName}</CoreoText>
                                </View>
                                <View style={styles.directionRow}>
                                    <CoreoText style={styles.detailKey}>Zip</CoreoText>
                                    <CoreoText style={styles.detailValue} numberOfLines={1}>{address.zip}</CoreoText>
                                </View>
                                {!validateCoordinates(address) && numericComparer(address.addressId, selectedAddressKey)
                                    ? <View style={styles.directionRow}>
                                        <CoreoText style={schedulePreferenceStyles.customErrorMsg}>Please select valid address details.</CoreoText>
                                    </View>
                               : null }
                            </TouchableOpacity>}
                    </View>
                    </View>

                </View>
            )

        return (
            <View>
                <View style={styles.areaMarginTop}>
                    {addresses}
                </View>
            </View>
        )
    }
}

export default Address