import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { CoreoText, ModalPopup } from '../../../components';
import { CoreoImage } from '../../../components'
import Images from '../../../assets/images'
import * as actions from '../../../redux/profile/PointService/actions'
import _ from 'lodash';
import styles from './styles'
import { navigateToScreenMainStack } from '../../../redux/navigation/actions'
import { PATH } from '../../../routes/index';
import { ActionType } from '../../../constants/constants'
import Header from '../Header';
import EmptyMsgText from '../EmptyText';
import EmptyText from '../../ServiceProviderProfile/EmptyText';

export const AddressField = (props) => {
    const { icon, label, value } = props
    return (
        <View style={styles.addressDetails}>
            <Text style={styles.addressFieldTitle}>{label}</Text>
            <Text style={styles.addressFieldValue}>{value}</Text>
        </View>
    )
}

export const Address = (props) => {
    const { address, onEditPress, onServiceDelete, divider, role, isEditable } = props
    return (
        <View>
            <View style={styles.headerCard}>
                <View style={styles.addressTypeStyle}>
                    <CoreoImage style={styles.badgeIcon} source={Images.serviceArea} />
                    <Text style={styles.addressTypeText} numberOfLines={1}>{address.addressTypeId}</Text>
                </View>
                <View style={styles.editDeleteContainer}>
                    {address.isPrimaryAddress ? <CoreoText style={styles.primary}>Primary Address</CoreoText> : null}
                    {isEditable && <View>
                        <TouchableOpacity onPress={() => onServiceDelete(address)}>
                            <CoreoImage source={Images.trash} style={styles.deleteIcon} />
                        </TouchableOpacity>
                    </View>}
                    {isEditable && <View>
                        <TouchableOpacity onPress={() => onEditPress(address, ActionType.EDIT)}>
                            <CoreoImage source={Images.edit} style={styles.editIcon} />
                        </TouchableOpacity>
                    </View>}
                </View>
            </View>
            <AddressField label={"Street"} value={address.street} />
            <AddressField label={"City"} value={address.city} />
            <AddressField label={"State"} value={address.stateName} />
            <AddressField label={"Zip"} value={address.zip} />
            {!(address.latitude && address.longitude)?<CoreoText style={styles.validAdderss}>Address details are not valid.</CoreoText>:null}
            {divider}
        </View>
    )
}

class PointService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModalOnCancel: false,
            addressId: ''
        }
        this.role = {};
    };

    onDelete = () => {
        this.props.deletePointService(this.state.addressId)
    }
    componentDidMount() {
        // this.props.getPointService(this.props.params);
    }

    onEditPress = (pointOfServiceItem) => {
        let screenProps = {
            type: ActionType.EDIT,
            pointOfServiceDetails: pointOfServiceItem
        }
        this.props.goToEditPointofService(PATH? PATH.EDIT_POINT_OF_SERVICE: null, screenProps);
    }

    onAddPress = () => {
        let screenProps = {
            type: ActionType.Add
        }
        this.props.goToAddPointofService(screenProps)
    }

    onServiceDelete = (item) => {
        this.setState({
            showModalOnCancel: true,
            addressId: item.addressId,
        })

    }
    onConfirmModal = () => {
        this.setState({
            showModalOnCancel: !this.state.showModalOnCancel,
        })
        this.onDelete();
    }
    onCancelModal = () => this.setState({
        showModalOnCancel: !this.state.showModalOnCancel,
    })
    render() {
        let content = this.props.PointServiceList && this.props.PointServiceList.map((item, i) => {
            let divider = null;
            if (i !== this.props.PointServiceList.length - 1) {
                divider = <View style={styles.divider} />
            }
            return (
                <Address isEditable={this.props.isEditable} role={this.props.role} address={item} mobileNumber={item.zip} onServiceDelete={this.onServiceDelete} onEditPress={this.onEditPress} divider={divider} />
            )
        })
        if (_.isNil(this.props.PointServiceList) || this.props.PointServiceList.length <= 0) {
            content = this.props.isEditable ? <EmptyMsgText onPress={this.props.isEditable ? this.onAddPress : null} text="Point of Service" icon={Images.AddIcon} /> :
            <EmptyText/>
        }
        return (
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <Header title="Points of Service"
                        showIcon={this.props.isEditable && this.props.network}
                        icon={Images.AddIcon}
                        onPress={this.onAddPress}
                        isEditable={this.props.isEditable}
                    />
                    <View style={styles.skillItemsList}>
                        {content}
                    </View>
                </View>
                <ModalPopup
                    visible={this.state.showModalOnCancel}
                    primaryButton="Remove"
                    secondaryButton="Cancel"
                    primaryColor="#3c1053"
                    secondaryColor="#6c757d"
                    customBtnFlag='true'
                    onConfirm={this.onConfirmModal}
                    onCancel={this.onCancelModal}
                >
                    <CoreoText
                        style={styles.popupText}>{` Do you want to remove this point of service?`}
                    </CoreoText>
                </ModalPopup>

            </View>

        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPointService: (data) => dispatch(actions.getPointService(data)),
        updatePointService: data => dispatch(actions.updatePointService(data)),
        deletePointService: data => dispatch(actions.deletePointService(data)),
        goToEditPointofService: (screen, params) => dispatch(navigateToScreenMainStack(screen, params)),
        goToAddPointofService: (params) => dispatch(navigateToScreenMainStack(PATH? PATH.EDIT_POINT_OF_SERVICE: null, params))

    }
}

function mapStateToProps(state, props) {
    let params = props.params
    let details = {
        PointServiceList: state.profileState && state.profileState.PointServiceState.PointServiceList,
    }
    const { impersonatedPOSDetails } = state.profileState && state.profileState.PointServiceState || {}
    if (params && params.id !== global.currentUserPatientId) {
        details = {
            PointServiceList: impersonatedPOSDetails && impersonatedPOSDetails[params.id] ? impersonatedPOSDetails[params.id].PointServiceList : []
        }
    }
    return {
        cityDetail: state.profileState && state.profileState.PersonalDetailState.cityDetail,
        network: state.networkReducer && state.networkReducer.network,
        ...details
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PointService);
