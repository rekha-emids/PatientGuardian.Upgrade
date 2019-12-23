import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Platform, TouchableOpacity} from 'react-native'
import { CoreoText, CoreoImage } from '../../../../../components';
import Icons from '../../../../../assets/images/Icons';
import { setFontSize, setValueBasedOnHeight } from '../../../../../utils/deviceDimensions';
import {getAllAttributeProviders} from '../../../../../redux/visitHistory/VisitServiceDetails/actions'
import {_} from '../../../../../utils/validations'
import styles from './styles';
import Icon from '../../../../../components/Base/Icon';
import { ListScrollerAPIWrapper } from '../../../../../components/LevelOne';
import { Header, Item, Icon as NativBaseIcon, Input } from 'native-base';
import { isIOS } from '../../../../../utils/appUtils';

const AttributeProviderDetails = (props) => {
    let icon = Platform.OS === "ios" ? Icons.checkboxIos : Icons.checkboxAndroid
    const {image, providerName, isSelected, attributedProviderId, onPress, selectedServiceProviders} = props
    const onClickSp = () => {
        onPress(attributedProviderId)
    }
    let checkBox = selectedServiceProviders[attributedProviderId] ? <Icon {...icon} size={setFontSize(18)} /> : <View style={styles.emptyCheckbox} />
    return (
        <TouchableOpacity onPress={onClickSp} style={[styles.spDetails, styles.margin]}>
            {checkBox}
            <CoreoImage source={{uri: image}} style={styles.pic} />
            <CoreoText style={[styles.text, styles.paddingText, {flex: 1}]} numberOfLines={1}>{providerName}</CoreoText>
        </TouchableOpacity>
    )
}

class AttributeProviders extends Component {
    constructor(props){
        super(props)
        this.state = {
            filteredAttributeProviders: []
        }
    }
    apiCall=()=>{
        this.props.getAllAttributeProviders()
    }
    componentWillReceiveProps(nextProps){
        if(this.props.attributeProviders !== nextProps.attributeProviders){
            this.setState({filteredAttributeProviders: nextProps.attributeProviders})
        }
    }

    onChangeText = (text) => {
        let updatedFilteredProviders = []
        const {attributeProviders} = this.props
        if(!text.length){
            this.setState({filteredAttributeProviders: attributeProviders})
        }else{
            attributeProviders && attributeProviders.map(item => {
                if(item.providerName && item.providerName.toLowerCase().indexOf(text.toLowerCase()) !== -1){
                    updatedFilteredProviders.push(item)
                }
            })
            this.setState({filteredAttributeProviders: updatedFilteredProviders})
        }
    }


    render(){
        const {selectedServiceProviders, onPress} = this.props
        return (
            <View style={[styles.container,{marginBottom: setValueBasedOnHeight(50)}]}>
                <CoreoText style={[styles.text, styles.margin]}>Select Attribute Providers</CoreoText>
                <View style={styles.searchBarContianer}>
                    {isIOS() ? null : <Header rounded style={{height: 0}} searchBar />}
                    <Item>
                    <NativBaseIcon name="ios-search" />
                        <Input placeholder="Search" onChangeText={this.onChangeText} />
                    </Item>
                </View>
                <View>
                <ListScrollerAPIWrapper
                    data={this.state.filteredAttributeProviders}
                    renderComponent={AttributeProviderDetails}
                    isPaginationEnabled={false}
                    hasPaginationEnded={true}
                    apiSaga={this.apiCall}
                    selectedServiceProviders={selectedServiceProviders}
                    onPress={onPress}
                /> 
                </View>
            </View>
        )
    }
}


function mapStateToProps(state) {
    let visitHistoryState = state.visitHistoryState
    return {
        attributeProviders: visitHistoryState ? visitHistoryState.vistServiceHistoryState.attributeProviders : []
    }
}

function mapDispatchToProps(dispatch){
    return {
        getAllAttributeProviders: () => dispatch(getAllAttributeProviders())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(AttributeProviders)