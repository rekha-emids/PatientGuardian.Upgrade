import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Platform, TouchableOpacity, Text, InteractionManager } from 'react-native'
import { getAvailableDays, getBlackOutDays } from '../../../redux/serviceProviderProfile/Availability/actions'
import Header from '../Header'
import Images from '../../../assets/images/index'
import { _ } from '../../../utils/validations'
import EmptyText from '../EmptyText/index'
import Icon from '../../../components/Base/Icon/index'
import Icons from '../../../assets/images/Icons'
import { navigateToScreenMainStack } from '../../../redux/navigation/actions'
import AvailabilityDays from './AvailabilityDay'
import { setFontSize } from '../../../utils/deviceDimensions';
import styles from './styles'
import { PATH } from '../../../routes';
import { isEmpty } from '../../../utils/EmptyObjCheck';

class Availability extends Component {

    componentDidMount() {
        InteractionManager.runAfterInteractions(this.getAvailableAndBlockoutDays);

    }

    getAvailableAndBlockoutDays = () => {
        this.props.getAvailableDays(this.props.spId);
        this.props.getBlackOutDays(this.props.spId)
    }

    renderBlockoutDays = () => {
        let icon = Icons.forwardArrowAndroid
        if (Platform.OS === 'ios') {
            icon = Icons.forwardArrowIos
        }
        return (
            <TouchableOpacity onPress={this.props.goToBlockoutDays} style={styles.blockOutDayContainer}>
                <Text style={styles.blockOutText}>
                    Show Blackout days
                </Text>
                <Icon {...icon} size={setFontSize(20)} style={styles.arrow} />
            </TouchableOpacity>
        )
    }

    render() {
        const { availableDays, blackoutDays } = this.props
        __DEV__ && console.log("AVAILABILITY PROPS: ",availableDays," blackoutDays: ",blackoutDays)
        let content = <AvailabilityDays availableDays={availableDays} />
        let image = Images.edit
        let showBlockOutDays = this.renderBlockoutDays()
        if(this.props.isLoading){
            return null
        }
        let showEmptyText = true;
        let days = !isEmpty(availableDays) && availableDays.days;
        days && days.map((singleDay)=>{
            singleDay && singleDay.slots.map((individualSlot)=>{
                if(individualSlot.isActive){
                    showEmptyText = false
                }
            })
        })
        if(showEmptyText){
            content = <EmptyText/>
        }
        return (
            <View style={styles.cardContainer}>
                <Header title="Availability"
                    showIcon={this.props.isEditable}
                    icon={image}
                    onPress={this.props.goToEditAvailability}
                    headerStyle={styles.headerStyle}
                />
                {content}
                {blackoutDays && blackoutDays.length > 0 ? showBlockOutDays : null}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    let impersonateProfileState = state.impersonateProfileState;
    return {
        availableDays: impersonateProfileState && state.impersonateProfileState.AvailabilityState.availableDays,
        blackoutDays: impersonateProfileState && state.impersonateProfileState.AvailabilityState.blackoutDays.blockOutDates
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAvailableDays: (spId) => dispatch(getAvailableDays(spId)),
        goToBlockoutDays: () => dispatch(navigateToScreenMainStack(PATH.BLOCKOUT_DAYS)),
        getBlackOutDays: (spId) => dispatch(getBlackOutDays(spId)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Availability)