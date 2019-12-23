import { AsyncStorage } from 'react-native';

import FCM, {FCMEvent} from "react-native-fcm";
import { PATH } from '../routes';

AsyncStorage.getItem('lastNotification').then((data) => {
  if (data){
    // if notification arrives when app is killed, it should still be logged here
    AsyncStorage.removeItem('lastNotification');
  }
})

AsyncStorage.getItem('lastMessage').then((data) => {
  if (data){
    // if notification arrives when app is killed, it should still be logged here
    AsyncStorage.removeItem('lastMessage');
  }
})

export function registerKilledListener(navigation){
  // these callback will be triggered even when app is killed
  FCM.on(FCMEvent.Notification, (notif) => {
    AsyncStorage.setItem('lastNotification', JSON.stringify(notif));
    if (notif.opened_from_tray){
        navigation.navigateToScreenMainStack(PATH.NOTIFICATION_SETTINGS_SCREEN)
    }
  });

  FCM.on(FCMEvent.RefreshToken, (token) => {
  });

  FCM.enableDirectChannel();
  FCM.on(FCMEvent.DirectChannelConnectionChanged, (data) => {
  });
  setTimeout(() => {
    FCM.isDirectChannelEstablished().then((d) => console.log(d));
  }, 1000);
}
