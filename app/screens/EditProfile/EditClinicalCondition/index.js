import React from 'react'
import { connect } from 'react-redux'
import { Text, TouchableOpacity,  View } from 'react-native'
import {Icon, Item as NativebaseItem, Input, Header} from 'native-base'
import { addClinicalCondition, updateClinicalCondition, resetUpdatedClinicalCondition } from '../../../redux/profile/ClinicalCondition/actions'
import EditProfileWrapper from '../index'
import { compare } from '../../../utils/comparerUtility'
import _ from 'lodash'
import Images from '../../../assets/images/index'
import styles from './styles'
import { CoreoImage } from '../../../components/Base/Image/index'
import { isIOS } from '../../../utils/appUtils';

export const Item = (props) => {
    __DEV__ &&  console.log("props in item: ",props)
    const { item, index, selectedItemStyle, onPress } = props;
    return (
        <TouchableOpacity key={index} onPress={() => onPress(item, props.onUpdateIsEdited)}
            style={[styles.skillItemContainer, selectedItemStyle]}>
            <Text style={styles.skillItem}>{item.attributeName}</Text>
        </TouchableOpacity>
    )
}

export const ItemLanguage = (props) => {
    const { item, index, selectedItemStyle, onPress } = props;
    return (
        <TouchableOpacity key={index} onPress={() => onPress(item, props.onUpdateIsEdited)}
            style={[styles.skillItemContainer, selectedItemStyle]}>
            <CoreoImage source={Images.Flags[item.name]} style={styles.flag} />
            <Text style={styles.skillItem}>{item.name}</Text>
        </TouchableOpacity>
    )
}

class EditClinicalCondition extends React.PureComponent {
    prevUpdatedClinicalConditionList = {}
    updatedClinicalConditionList = {}
    title = "Edit Clinical Conditions"
    constructor(props){
        super(props)
        this.state = {
            filteredItems: props.clinicalConditionState
        }
    }

    componentWillMount() {
        const { updatedClinicalConditionList } = this.props
        if (updatedClinicalConditionList && Object.keys(updatedClinicalConditionList).length <= 0) {
            this.title = "Add Clinical Conditions"
        }
    }

    onClickClinicalConditionItem = (clinicalCondition, onUpdateIsEdited) => {
        __DEV__ && console.log("clinicalCondition: ",clinicalCondition," onUpdateIsEdited: ",onUpdateIsEdited)
        const {navigation} = this.props
        const {params} = navigation.state
        this.props.addClinicalCondition(clinicalCondition, params)
        this.updateList(clinicalCondition)
        if (compare(this.updatedClinicalConditionList, this.prevUpdatedClinicalConditionList)) {
            onUpdateIsEdited && onUpdateIsEdited(false)
        } else {
            onUpdateIsEdited && onUpdateIsEdited(true)
        }
    }

    updateList = (clinicalCondition) => {
        if ((this.updatedClinicalConditionList[clinicalCondition.attributeId])) {
            this.updatedClinicalConditionList = {
                ...this.updatedClinicalConditionList,
                [clinicalCondition.attributeId]: clinicalCondition
            }
        } else {
            delete this.updatedClinicalConditionList[clinicalCondition.attributeId]
        }
    }

    componentDidMount() {
        this.prevUpdatedClinicalConditionList = this.props.updatedClinicalConditionList
        this.updatedClinicalConditionList = { ...this.props.updatedClinicalConditionList }
    }

    onConfirm = () => {
        this.props.resetUpdatedClinicalCondition(this.prevUpdatedClinicalConditionList)
    }

    onChangeText = (text) => {
        let updatedClinicalConditions = []
        const {clinicalConditionState} = this.props
        if(!text.length){
            this.setState({filteredItems: clinicalConditionState})
        }else{
            clinicalConditionState && clinicalConditionState.map(item => {
                if(item.attributeName && item.attributeName.toLowerCase().indexOf(text.toLowerCase()) !== -1){
                    updatedClinicalConditions.push(item)
                }
            })
            this.setState({filteredItems: updatedClinicalConditions})
        }
    }

    render() {
        const { updatedClinicalConditionList, navigation } = this.props
        __DEV__ && console.log("EDIT CLINICAL COND", navigation)
        const {params} = navigation && navigation.state || {}
        const {filteredItems} = this.state
        const content = filteredItems && filteredItems.map((item, i) => {
            let selectedItemStyle = {};
            if (!_.isNil(updatedClinicalConditionList[item.attributeId])) {
                selectedItemStyle = styles.selectedItem
            }
            return (
                <Item item={item} index={i} selectedItemStyle={selectedItemStyle}
                    onPress={this.onClickClinicalConditionItem} />
            )
        })
        return (
            <EditProfileWrapper
                onConfirm={this.onConfirm}
                containerStyle={styles.containerStyle}
                contentStyle={styles.content} 
                onClickUpdate={() => {this.props.updateClinicalCondition(null, params)}}
                style={styles.container}
                title={this.title}>
                 <View style={styles.searchBarContianer}>
                    {isIOS() ? null : <Header rounded style={{height: 0}} searchBar />}
                    <NativebaseItem>
                    <Icon name="ios-search" />
                        <Input placeholder="Search" onChangeText={this.onChangeText} />
                    </NativebaseItem>
                </View>
                {content}
                
            </EditProfileWrapper>
        )
    }
}

const mapStateToProps = (state, props) => {
    let params = props.navigation && props.navigation.state.params
    let details = {
        updatedClinicalConditionList: state.profileState && state.profileState.ClinicalConditionState.updateClinicalCondition,
    }
    const {impersonatedClinicalDetails} = state.profileState && state.profileState.ClinicalConditionState || {}
    if(params && params.id !== global.currentUserPatientId){
      details = {
        updatedClinicalConditionList: impersonatedClinicalDetails && impersonatedClinicalDetails[params.id] ? impersonatedClinicalDetails[params.id].updateClinicalCondition : []      
    }}
    return {
        clinicalConditionState: state.profileState && state.profileState.ClinicalConditionState.clinicalConditionList,
        ...details
     }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addClinicalCondition: (data, params) => dispatch(addClinicalCondition(data, params)),
        updateClinicalCondition: (onSuccess, params) => dispatch(updateClinicalCondition(onSuccess, params)),
        resetUpdatedClinicalCondition: (data) => dispatch(resetUpdatedClinicalCondition(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(
    EditClinicalCondition
)