import React, {Component} from 'react'
import {View,Image,TouchableOpacity} from 'react-native'
import { CoreoFlatList, CoreoText, CoreoImage } from '../../../components';
import Images, { DasboardProfilePic } from '../../../assets/images/index'
import styles from '../styles'
import { extractRole } from '../../../utils/roleUtil';
import { SCREENS, USER_TYPES } from '../../../constants/constants';
import { getUserInfo } from '../../../utils/userUtil';
export default class CardListViewComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profileRole: extractRole(SCREENS.PROFILE)
        }
    };
    onRenderItemPress = (item, canEditable)=>{
        __DEV__ && console.log("item in onRenderItemPress: ",item, " canEditable: ",canEditable)
        let id = (item && item.userType === "G") ? item.coreoHomeUserId : item && item.patientId;
        let params = {
            id: id,
            userType: item && item.userType,
            canEditable
        }
        this.state.profileRole.Read && this.props.goToProfile(params)
    } 
    onTouchableOpacityPress = (item, canEditable)=>{
        __DEV__ && console.log("item in onTouchableOpacityPress: ",item, " canEditable: ",canEditable)
        let id = (item && item.userType === "G") ? item.coreoHomeUserId : item && item.patientId;
        let params = {
            id: id,
            userType: item && item.userType,
            canEditable
        }
        this.state.profileRole.Read && this.props.goToProfile(params)
    } 
    _renderItem = ({item}) => {
        __DEV__ && console.log("item for _renderItem is: ",item)
        let canEditable = getUserInfo() && getUserInfo().userType === USER_TYPES.GUARDIAN
        return<View style={styles.cardViewStyle}>
        <TouchableOpacity  
        onPress={() => this.onRenderItemPress(item, canEditable)
        }
        style={styles.firstCardView}>
            <Image style={styles.thumbnailStyle}  source={item.image && item.image !== ''? {uri:item.image}:  DasboardProfilePic} />
        </TouchableOpacity>
        <View style={styles.SecondCardView}>
            <CoreoText style={styles.cardMainTextStyle}>{item.firstName} {item.lastName}</CoreoText>
            <CoreoText style={styles.cardSubTextStyle}>{item.name}</CoreoText>
        </View>
        <View style={styles.cardRightView}>
            <TouchableOpacity onPress={()=>this.onTouchableOpacityPress(item, canEditable)}><CoreoImage style={styles.cardRightViewFirstIcon}  source={Images.profileDetails}/></TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.onPress(item)}><CoreoImage style={styles.cardRightViewFirstIcon}  source={Images.trash}/></TouchableOpacity>
        </View>
        </View>
    };
    render(){
        return (
            <CoreoFlatList
                data={this.props.data}
                keyExtractor={"patientId"}
                renderItem={this._renderItem}
                goToProfile={this.props.goToProfile}
                
            />
        )
    }
}

