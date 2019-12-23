import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Platform, TouchableOpacity} from 'react-native'
import { CoreoText, CoreoImage, CoreoScrollView } from '../../../../../components';
import Icons from '../../../../../assets/images/Icons';
import { setFontSize, setValueBasedOnHeight, setValueBasedOnWidth } from '../../../../../utils/deviceDimensions';
import {getAllServiceProviders} from '../../../../../redux/visitHistory/VisitServiceDetails/actions'
import {_} from '../../../../../utils/validations'
import styles from './styles';
import Icon from '../../../../../components/Base/Icon';
import { CoreoProfileImage } from '../../../../../components/Base/Image/Image';

const ServiceProviderDetails = (props) => {
    let icon = Platform.OS === "ios" ? Icons.checkboxIos : Icons.checkboxAndroid
    const {image, firstName, lastName, isSelected, serviceProviderId, onPress} = props,
     onClickSP = () => {
        onPress(serviceProviderId)
    }
    let checkBox = isSelected ? <View style={styles.checkboxView}><Icon {...icon} size={setFontSize(18)} /></View> : <View style={styles.checkboxView}><View style={styles.emptyCheckbox} /></View>

    return (
        <TouchableOpacity onPress={onClickSP} style={[
styles.spDetails,
styles.margin
]}>
            {checkBox}
            <CoreoProfileImage pic={image ? {uri: image} : null} style={styles.pic} />
            <CoreoText style={styles.text}>{firstName} {lastName}</CoreoText>
        </TouchableOpacity>
    )
}

class ServiceProvidersFilter extends Component {

    componentDidMount(){
        this.props.getAllServiceProviders()
    }

    render(){
        const {selectedServiceProviders, onPress, serviceProvidersList} = this.props
        let serviceProviders = serviceProvidersList && serviceProvidersList.map((sp, index) => <ServiceProviderDetails onPress={onPress} {...sp} isSelected={!_.isNil(selectedServiceProviders[sp.serviceProviderId])} />)

        return (
            <View style={styles.container}>
                <CoreoText style={[
styles.text,
styles.margin
]}>Select Service Providers</CoreoText>
                <CoreoScrollView>
                    {serviceProviders}
                </CoreoScrollView>
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {serviceProvidersList: state.visitHistoryState && state.visitHistoryState.vistServiceHistoryState.serviceProviders}
}

function mapDispatchToProps(dispatch){
    return {getAllServiceProviders: () => dispatch(getAllServiceProviders())}
}



export default connect(mapStateToProps, mapDispatchToProps)(ServiceProvidersFilter)