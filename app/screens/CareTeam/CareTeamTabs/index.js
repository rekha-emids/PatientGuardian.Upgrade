import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { CoreoImage, CoreoText } from '../../../components';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';
import styles from './styles'
import Dashboard from './Dashboard/index'
import StartVideoConference from '../../../screens/TeleHealth/StartVideoConference/index'
import images from '../../../assets/images';
import {
  dashboard_selected,
  dashboard_unselected,
  menu_selected,
  menu_unselected,
} from '../../../assets/images';
import Menu from './Menu';
import ConversationSummary from '../../../screens/AsyncMessage/ConversationSummary/index';

export const DASHBOARD = "Dashboard"
export const CONVERSATIONS = "Conversations"
export const USERS = "Users"
export const VIDEO_CONFERENCE = "Video \n Conference"
export const MENU = "Menu"

export const NavigationOption =  ({ navigation }) => ({
  tabBarIcon: ({ focused, tintColor }) => {
    const { routeName } = navigation.state;
    let icon;

    if (routeName === DASHBOARD) {
      image = focused ? dashboard_selected : dashboard_unselected
    } else if (routeName === CONVERSATIONS){
      image = focused ? images.conversationImage : images.conversations
     } else if (routeName === VIDEO_CONFERENCE){
      image = focused ? images.videoconference : images.videoconference
    } else if (routeName === MENU){
      image = focused ? menu_selected : menu_unselected
    }

    return <CoreoImage source={image} style={styles.tabIcon} />
  },
  tabBarLabel: ({focused, tintColor}) => {
    const { routeName } = navigation.state;
    let text = routeName

    return <CoreoText numberOfLines={1} style={[
styles.labelStyle,
{color: tintColor}
]}>{text}</CoreoText>
  }
})

const CareTeamTabs = createBottomTabNavigator && createBottomTabNavigator(
    {
      [DASHBOARD]: { screen: Dashboard },
      [CONVERSATIONS]: { screen: ConversationSummary },
      [VIDEO_CONFERENCE]: { screen: StartVideoConference },
      [MENU]: { screen: Menu }
    },
    {
      navigationOptions: NavigationOption,
      tabBarPosition: 'bottom',
      tabBarOptions: {
        activeTintColor: THEME_PRIMARY_COLOR,
        inactiveTintColor: "#8c8c8c",
        labelStyle: styles.labelStyle,
        style: styles.tabBarStyle,
        tabStyle: styles.tabStyle,
        allowFontScaling: false
      },
      animationEnabled: false,
      swipeEnabled: false
    }
  );

export default CareTeamTabs
  