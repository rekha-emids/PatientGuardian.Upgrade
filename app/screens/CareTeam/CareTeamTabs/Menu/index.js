import React, {PureComponent} from 'react'
import { NavbarWithImage } from '../../../../components';
import { SafeView } from '../../../../components/LevelOne';
import {connect} from 'react-redux'
import { onLogout } from '../../../../redux/auth/Logout/actions';
import { View,  Text } from 'react-native'
import { CoreoImage, CoreoListItem } from '../../../../components';
import { MENU_TYPES } from '../../../../constants/constants'
import styles from './styles'
import {help,aboutUs} from '../../../../assets/images/index'
import {navigateToScreenMainStack} from '../../../../redux/navigation/actions'
import { PATH } from '../../../../routes';
import {extractRole} from '../../../../utils/roleUtil';
import { DasboardProfilePic } from '../../../../assets/images';

const MENU_NAVIGATION = [
    {
        name: "About Us",
        icon: aboutUs,
        title: "About Us",
        type: MENU_TYPES.ABOUT_US
      },
      {
        name: 'Support',
        icon: help,
        title: 'Support',
        type: MENU_TYPES.SUPPORT
      }
]

class Menu extends PureComponent {
     onPressMenuItem = (type)=> {
    switch(type){
        case MENU_TYPES.ABOUT_US:
            return this.props.goToAboutUs
        case MENU_TYPES.SUPPORT:
            return this.props.goToHelp
    }
}

render() {

    const {personalDetail} = this.props

    let firstName = personalDetail ? personalDetail.firstName : ""
    let lastName = personalDetail ? personalDetail.lastName : ""
    return (
        <SafeView>
            <NavbarWithImage showImage={false} title="Menu" showPowerIcon={true} onpowericonPressed={this.props.logout} />
                <View style={styles.profileCardView}>
                    <View style={styles.profileContent}>
                        <CoreoImage style={styles.profileImageStyle} source={ DasboardProfilePic} />
                        <Text style={styles.profileTextStyle}>{firstName} {lastName}</Text>
                    </View>
                </View> 
            
            {MENU_NAVIGATION.map((item) => (
                (item.permission === undefined || extractRole(item.permission).Read) &&
                <CoreoListItem
                    key={item.title}
                    text={item.title}
                    icon={item.icon}
                    type={item.type}
                    onPress={this.onPressMenuItem(item.type)}
                />))}
        </SafeView>

    )
}
}


function mapStateToProps(state) {
    return {
        personalDetail: state.profileState.PersonalDetailState.personalDetail,
} }

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(onLogout()),
        goToHelp: () => dispatch(navigateToScreenMainStack(PATH.HELP)),
        goToAboutUs: () => dispatch(navigateToScreenMainStack(PATH.ABOUT_US)),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Menu)