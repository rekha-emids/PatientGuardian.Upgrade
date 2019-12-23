import React, { Component } from 'react';
import {  View } from 'react-native';
import styles from './styles';
import PopoverTooltip from 'react-native-popover-tooltip';
import {_} from '../../../utils/validations'
import { USER_TYPES } from '../../../constants/constants';
class Popup extends Component {

    render() {
        const {
viewProfile, userType, isActive, showModal, visitProcess, network,
        label1, label2, label3, label4, onPhonePress, onAsyncPress, onTelePress
} = this.props
        const itemsShow = [{
            label: 'View Profile',
            onPress: viewProfile
        }]

        if (userType !== USER_TYPES.SERVICE_PROVIDER && isActive) {
            itemsShow.push({
                label: 'Remove Participant',
                onPress: showModal
            })
        }

        const communicationItems = [
            {
                label: label1,
                onPress: onPhonePress
            },
            {
                label: label2,
                onPress: onAsyncPress
            },
            {
                label: label3,
                onPress: onTelePress
            }
        ]

        if (label4){
            communicationItems.unshift({label: label4, onPress: visitProcess})
        }
    
        return (
            <View>
            <PopoverTooltip
                ref="tooltip1"
                tooltipContainerStyle={styles.borderRadius}
                allItemContainer={styles.allItemContainer}
                triangleUp={styles.triangle}
                overlayStyle={styles.paddingRight}
                triangleDown={styles.triangle}
                triangleOffset={0}
                labelSeparatorColor={'#fff'}
                componentWrapperStyle={styles.paddingHorizontal}
                buttonComponent={
                    <View style={styles.margin}>
                        <View style={styles.dot}></View>
                        <View style={styles.dot}></View>
                        <View style={styles.dot}></View>
                    </View>
                }
                labelContainerStyle={styles.labelContainerStyle}
                delayLongPress={0}

                items={!_.isNil(network) && !network ? [
                    {
                        label: label1,
                        onPress: onPhonePress
                    }
                ]
                : label1 ? communicationItems : itemsShow}
            />
            </View>
        );
    }
}


export default Popup;