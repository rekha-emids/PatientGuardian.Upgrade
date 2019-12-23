import React from 'react';
import { createBottomTabNavigator} from 'react-navigation';
import { THEME_PRIMARY_COLOR } from '../../constants/theme';
import styles from './styles'
import ServiceRequestsList from '../VisitSelection/VisitServiceList/index'
import Dashboard from '../Dashboard';
import Browse from '../ServiceProvidersTab/Browse/index'
import Menu from '../Menu/index'
import images from '../../assets/images';

import { CoreoImage, CoreoText } from '../../components';
import ConversationSummary from '../AsyncMessage/ConversationSummary';

export const DASHBOARD = "Dashboard"
export const REQUESTS = "Requests"
export const SERVICE_PROVIDERS = `Providers`
export const CONVERSATIONS = "Conversations"
const MENU = "Menu"

export default createBottomTabNavigator && createBottomTabNavigator(
    {
      [DASHBOARD]: { screen: Dashboard },
      [REQUESTS]: { screen: ServiceRequestsList },
      [SERVICE_PROVIDERS]: { screen: Browse },
      [CONVERSATIONS]: { screen: ConversationSummary },
      [MENU]: { screen: Menu }
    },
    {
      navigationOptions: ({ navigation, screenProps }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          __DEV__ && console.log("properties navigation: ", navigation, " screenProps: ", screenProps, " focused: ", focused, " tintColor: ", tintColor)
          const { routeName } = navigation.state;
          let image;

          if (routeName === DASHBOARD) {
            image = focused ? images.dashboardSelected : images.dashboardUnselected 
          } else if (routeName === REQUESTS) {
            image = focused ? images.sr_selected : images.sr_unSelected
          } else if (routeName === SERVICE_PROVIDERS){
            image = focused ? images.serviceProviderSelected : images.serviceProviderUnselected
          } else if (routeName === CONVERSATIONS){
            if (screenProps.unreadMessagesCount === 0){
              image = focused ? images.conversationImage : images.conversations
            } else {
              image = focused ? images.conversationAlertImage : images.conversationAlertImageFocus
              // return (<ImageBackground source={image} style={styles.tabIcon}>
              //     <View style={styles.countView}>
              //       <Text style={styles.countText}>0</Text>
              //     </View>
              //   </ImageBackground>);
            }           
          } else if (routeName === MENU){
           image = focused ? images.menuSelected : images.menuUnselected
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
      }),
      tabBarPosition: 'bottom',
      initialRouteName: DASHBOARD,
      tabBarOptions: {
        activeTintColor: THEME_PRIMARY_COLOR,
        inactiveTintColor: "#8c8c8c",
        labelStyle: styles.labelStyle,
        style: styles.tabBarStyle,
        tabStyle: styles.tabStyle

      },
      animationEnabled: false,
      swipeEnabled: false,
      lazy: true
    }
  );
  