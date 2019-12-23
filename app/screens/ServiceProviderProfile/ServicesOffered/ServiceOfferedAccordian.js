import React from "react";
import { View, Text, TouchableOpacity } from 'react-native'
import { CoreoImage } from '../../../components'
import styles from './styles'
import { setFontSize } from '../../../utils/deviceDimensions';
import Icons from "../../../assets/images/Icons";
import { ActionType } from '../../../constants/constants'
import Images from "../../../assets/images/index";
import { getServiceIcon } from '../../../utils/appUtils'
import _ from 'lodash'
import Icon from "../../../components/Base/Icon";

const Service = (props) => {
    const { type, itemStyle, onPress, isActive } = props
    let RenderComponent = View
    let checkImage = null
    let selectedItemStyle = {}
    if (type === ActionType.Edit) {
        RenderComponent = TouchableOpacity
        if (isActive) {
            checkImage = <CoreoImage source={Images.completed} style={styles.checkMark} />
            selectedItemStyle = styles.selectedItemStyle
        }
    }
    return (
        <RenderComponent onPress={onPress} style={[styles.serviceItem, itemStyle, selectedItemStyle]}>
            <CoreoImage style={styles.serviceItemImage} source={getServiceIcon('serviceType'+props.serviceTypeId)} />
            <Text style={styles.itemTitle}>{props.serviceName}</Text>
            {/* {checkImage} */}
        </RenderComponent>
    )
}

class ServiceOfferedAccordian extends React.Component {

    getServiceItems = (serviceItems) => {
        const { customHeader } = this.props
        let headerComponent = null
        let divider = null
        if (!_.isNil(customHeader)) {
            headerComponent = customHeader
            divider = <View style={styles.divider} />
        }
        return (
            <View>
                <View style={styles.serviceItemsContentContainer}>
                    {headerComponent}
                    <View style={styles.serviceItems}>
                        {serviceItems}
                    </View>
                </View>
                {divider}
            </View>
        )
    }

    render() {
        const { serviceItemsList, id, onPress,
            count, isSelected, serviceName,
            selectedAccordianStyle,
            type, itemStyle, style } = this.props

        let serviceItems = serviceItemsList && serviceItemsList.map((service, index) => {

            return <Service
                serviceName={service.serviceTypeDescription}
                serviceTypeId={service.serviceTypeId}
                key={index}
                type={type}
                itemStyle={itemStyle}
                onPress={() => {
                    // onPress(id, service.serviceTypeId)
                }}
                isActive={service.isActive}
            />;
        })
        let ServiceItemsList = null;
        let selectedItemStyle = {}
        if (isSelected && serviceItemsList.length > 0) {
            selectedItemStyle = styles.selectedItemStyle
            ServiceItemsList = this.getServiceItems(serviceItems)
        }
        return (
            <View>
                <TouchableOpacity style={[styles.serviceAccordianContainer, style, selectedItemStyle,
                    selectedAccordianStyle]} onPress={() => { onPress(id) }}>
                    <Text style={styles.title}>{serviceName}</Text>
                    <View style={styles.count}>
                        <Text style={styles.countText}>{count}</Text>
                    </View>
                    <View style={styles.arrowIcon}>
                        <Icon {...Icons.arrowDown} size={setFontSize(18)} />
                    </View>
                </TouchableOpacity>
                {ServiceItemsList}
            </View>
        )
    }
}


export default ServiceOfferedAccordian
