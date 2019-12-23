import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity,InteractionManager } from 'react-native';
import { CoreoImage } from '../../../components'
import Images from '../../../assets/images'
import _ from 'lodash';
import styles from './styles'
import { PATH } from '../../../routes/index';
import { ActionType } from '../../../constants/constants'
import Header from '../Header';
import EmptyText from '../EmptyText';
import { getPointService } from '../../../redux/serviceProviderProfile/PointService/actions';

export const AddressField = (props) => {
    const { icon, label, value } = props
    let RenderComponent = View;
    if (!_.isNil(icon)) {
        RenderComponent = CoreoImage;
    }
    return (
        <View style={styles.addressDetails}>
            <RenderComponent style={styles.icon} source={icon} />
            <Text style={styles.addressFieldTitle}>{label}</Text>
            <Text style={styles.addressFieldValue}>{value}</Text>
        </View>
    )
}

export const Address = (props) => {
    const { address, onEditPress, onServiceDelete, divider } = props
    return (
        <View>
            <View style={styles.headerCard}>
                <CoreoImage style={styles.badgeIcon} source={Images.street} />
                <View style={styles.editDeleteContainer}>
                    <View>
                        {
                            props.network
                                ?

                                <TouchableOpacity onPress={() => onServiceDelete(address)}>
                                    <CoreoImage source={Images.trash} style={styles.deleteIcon} />
                                </TouchableOpacity>
                                :
                                null
                        }
                    </View>
                    <View>
                        {
                            props.network
                                ?
                                <TouchableOpacity onPress={() => onEditPress(address, ActionType.EDIT)}>
                                    <CoreoImage source={Images.edit} style={styles.editIcon} />
                                </TouchableOpacity>
                                :
                                null
                        }
                    </View>
                </View>
            </View>
            <AddressField label={"Street"} value={address.streetAddress} />
            <AddressField label={"City"} value={address.city} />
            <AddressField label={"State"} value={address.stateName} />
            <AddressField label={"Zip"} value={address.zipCode} />
            <AddressField label={"Range"} value={Math.floor(address.coverageArea)} />

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
    };

    componentDidMount(){
        InteractionManager.runAfterInteractions(this.getPointService)
    }
    getPointService = () => {
        this.props.getPointService(this.props.spId)
    }
    onEditPress = (pointOfServiceItem) => {
        let screenProps = {
            type: ActionType.EDIT,
            pointOfServiceDetails: pointOfServiceItem
        }
        this.props.goToEditPointofService(PATH.EDIT_POINT_OF_SERVICE, screenProps);

    }


    onServiceDelete = (item) => {
        this.setState({
            showModalOnCancel: true,
            addressId: item.addressId,
        })

    }
    render() {
        let content = this.props.PointServiceList && this.props.PointServiceList.map((item, i) => {
            let divider = null;
            if (i !== this.props.PointServiceList.length - 1) {
                divider = <View style={styles.divider} />
            }
            return (
                <Address network = {this.props.network} address={item} mobileNumber={item.zip} onServiceDelete={this.onServiceDelete} onEditPress={this.onEditPress} divider={divider} />
            )
        })
        if(this.props.isLoading){
            return null
        }
        if ((_.isNil(this.props.PointServiceList) || this.props.PointServiceList.length <= 0)) {
            content = <EmptyText/>
        }
        return (
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <Header title="Service Areas"
                        disabled = {!this.props.network}
                        showIcon={this.props.isEditable}
                        icon={Images.AddIcon}
                    />
                    <View>
                        {content}
                    </View>
                </View>

            </View>

        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPointService: (spId) => dispatch(getPointService(spId))
    }
}

function mapStateToProps(state) {
    return {
        PointServiceList: state.impersonateProfileState && state.impersonateProfileState.PointServiceState.PointServiceList,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PointService);