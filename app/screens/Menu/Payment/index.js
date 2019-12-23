import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Platform, TouchableOpacity} from 'react-native'
import {getpaymentsCardList, deleteCard, primaryCard} from '../../../redux/menu/payment/actions'
import {navigateToScreenMainStack} from '../../../redux/navigation/actions'
import { CoreoScrollView, CoreoText, CoreoImage, ModalPopup } from '../../../components';
import styles from './styles'
import { getCreditCardImg } from '../../../assets/images';
import Navbar from '../../../components/LevelOne/Navbar';
import Icon from '../../../components/Base/Icon';
import Icons from '../../../assets/Icons';
import { setFontSize } from '../../../utils/deviceDimensions';
import { PATH } from '../../../routes';
import { SafeView } from '../../../components/LevelOne';
import { getUserInfo } from '../../../utils/userUtil';
import { USER_TYPES } from '../../../constants/constants';
import {_} from '../../../utils/validations'
import { updateNetworkConnectivity } from '../../../services/OfflineSyncing';

export const Card = (props) => {
    __DEV__ && console.log("props in card is: ",props)
    let icon = Platform.OS === "ios" ? Icons.deleteIos : Icons.deleteAndroid
    
    return (
        <TouchableOpacity onPress={() => props.makePrimary(props.coreoHomeStripeCustomerId, props.isPrimary)} style={[styles.cardContainer, props.isPrimary ? styles.primaryCardStyles : {}]}>
            <View style={styles.cardDetails}>
            <View style={styles.row}>
            { getUserInfo() && getUserInfo().userType !== USER_TYPES.CARE_TEAM ? <TouchableOpacity onPress={() => props.onPress(props.coreoHomeStripeCustomerId, props.isPrimary)} style={[styles.radioButtonOuterCircle]}>
                     <Icon {...icon} size={setFontSize(14)} />
                </TouchableOpacity> : <View style={[styles.radioButtonOuterCircle]} />}
                <CoreoText style={styles.cardNumberTextStyle}>{props.ccNumber}</CoreoText>
            </View>
            <CoreoImage style={styles.cardImage} source={getCreditCardImg(props.ccType)} />
            </View>
        </TouchableOpacity>
    )
}

class Payment extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedCardId: -1,
            deleteCardModal: false,
            successModal: false,
        }
    }
    onCardPress = (id, isPrimary) => {
        __DEV__ && console.log("onCardPress ID and isPrimary is: ",id, " ",isPrimary)
        this.setState({selectedCardId: id, isPrimary}, () => {
            this.setState({deleteCardModal: true})
        })
    }
    componentDidMount (){
        this.props.getpaymentsCardList(null, updateNetworkConnectivity)
    }

    onDeleteSuccess = () => {
        this.setState({successModal: true})
    }

    makePrimary = (id, isPrimary) => {
        __DEV__ && console.log("makePrimary ID and isPrimary is: ",id, " ",isPrimary)
        this.props.makePrimary(id, isPrimary)
    }
    onConfirmPopup = () => {
        this.setState({
            deleteCardModal: !this.state.deleteCardModal,
        })
        this.props.deleteCard(this.state.selectedCardId, this.state.isPrimary, this.onDeleteSuccess);
    }
    onCancelPopup = () => this.setState({
        deleteCardModal: !this.state.deleteCardModal,
    })
    onConfirmSuccessPopup = () => {
        this.setState({
            successModal: !this.state.successModal,
        })
    }

    render(){
        const {CardList} = this.props
        __DEV__ && console.log("CardList is: ",CardList)
        let cards = CardList &&  CardList.map((card, index) => {
            return <Card makePrimary={this.makePrimary} key={index} onPress={this.onCardPress} {...card} />
        })
        return (
            <SafeView>
            <View style={styles.mainContainer}>
                <Navbar title="Payments" showAdd={getUserInfo() && getUserInfo().userType !== USER_TYPES.CARE_TEAM} onClickAdd={this.props.goToAddCard} />
                <CoreoScrollView>
                    {!_.isEmpty(cards) ? cards: <CoreoText 
                        style={styles.emptyTextStyle}
                    >
                        You haven't added any forms of payment. Press '+' to add a credit card 
                    </CoreoText>}
                </CoreoScrollView>
                <ModalPopup
                    visible={this.state.deleteCardModal}
                    primaryButton="Confirm"
                    secondaryButton="Cancel"
                    onConfirm={this.onConfirmPopup}
                    onCancel={this.onCancelPopup}
                >
                    <CoreoText 
                        style={styles.cardNumberTextStyle}
                    >Are you sure you want to remove this card?     
                    </CoreoText>
                </ModalPopup>
                <ModalPopup
                    visible={this.state.successModal}
                    primaryButton="Ok"
                    onConfirm={this.onConfirmSuccessPopup}
                >
                    <CoreoText 
                        style={styles.cardNumberTextStyle}
                    >Your card removed successfully.     
                    </CoreoText>
                </ModalPopup>
            </View>
            </SafeView>
        )
    }
}

function mapStateToProps(state){
    return {
        CardList: state.menuState && state.menuState.paymentState.CardList
    }
}
function mapDispatchToProps(dispatch){
    return {
        getpaymentsCardList: (Onsuccess, updateNetworkOnResponse) => dispatch(getpaymentsCardList(Onsuccess, updateNetworkOnResponse)),
        deleteCard: (id, isPrimary, onSuccess) => dispatch(deleteCard(id, isPrimary, onSuccess)),
        goToAddCard: () => dispatch(navigateToScreenMainStack(PATH.WEB_VIEW_ADD_CARD)),
        makePrimary: (id, isPrimary) => dispatch(primaryCard(id, isPrimary))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Payment)