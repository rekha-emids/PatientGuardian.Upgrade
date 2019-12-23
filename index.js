import { AppRegistry, NetInfo, Text, TextInput } from 'react-native';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BackHandler } from 'react-native'
import AppRoute from './app/app';
import { store } from './app/redux/store';
import { APP_NAME, BACKGROUND_SYNC_STARTED } from './app/constants/constants';
import { checkNetworkConnectivity } from './app/redux/network/action';
import './app/globals'
import { offlineSyncing } from './app/services/OfflineSyncing';
import { getSortFilter } from './app/redux/visitSelection/ServiceRequestSorting/actions';
import { initialState } from './app/screens/VisitSelection/VisitServiceList';
import { onBack } from './app/redux/navigation/actions';
import BackgroundFetch from "react-native-background-fetch";
import { BACKGROUND_SYNC_TIME } from './app/constants/config';
import { ServiceRequestPost } from './app/services/http';
import { API } from './app/services/api';
Text.defaultProps.allowFontScaling = false
TextInput.defaultProps.allowFontScaling = false


let headlessTask = async (event) => {
  __DEV__ && console.log('[BackgroundFetch HeadlessTask] start');
  offlineSyncing()
  const logURL = `${API.postErrorMessage + BACKGROUND_SYNC_STARTED + new Date()}'`;
  //logger API to intimate sync started

  ServiceRequestPost(logURL).then((res) => {
  }).catch((err) => {
    __DEV__ && console.log("err in sync ", err)
  })


  // Required:  Signal to native code that your task is complete.
  // If you don't do this, your app could be terminated and/or assigned
  // battery-blame for consuming too much time in background.
  BackgroundFetch.finish();
}


class App extends Component {

  componentWillUnmount() {
    this.backHandler.remove();
  }

  componentDidMount() {
    

    	    // Configure it.
          BackgroundFetch.configure({
            minimumFetchInterval: BACKGROUND_SYNC_TIME, // <-- minutes (15 is minimum allowed)
            stopOnTerminate: false,   // <-- Android-only,
            startOnBoot: true,         // <-- Android-only
            enableHeadless: true,
            forceReload: true
          }, () => {
            __DEV__ && console.log("[js] Received background-fetch event");
            offlineSyncing()
            const logURL = `${API.postErrorMessage + BACKGROUND_SYNC_STARTED + new Date()}'`
            //logger API to intimate sync started

            ServiceRequestPost(logURL).then((res) => {
            }).catch((err) => {
              __DEV__ && console.log("err in sync ", err)
            })
            // Required: Signal completion of your task to native code
            // If you fail to do this, the OS can terminate your app
            // or assign battery-blame for consuming too much background-time
            BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
          }, (error) => {
            __DEV__ && console.log("[js] RNBackgroundFetch failed to start");
          });
      
           //Specifically used for debugging Purpose
      
           // Optional: Query the authorization status.
          // BackgroundFetch.status((status) => {
          //   switch(status) {
          //     case BackgroundFetch.STATUS_RESTRICTED:
          //       __DEV__ && console.log("BackgroundFetch restricted");
          //       break;
          //     case BackgroundFetch.STATUS_DENIED:
          //       __DEV__ && console.log("BackgroundFetch denied");
          //       break;
          //     case BackgroundFetch.STATUS_AVAILABLE:
          //       __DEV__ && console.log("BackgroundFetch is enabled");
          //       break;
          //   }
          // });



    NetInfo.isConnected.addEventListener('change', (isConnected) => {
      store.dispatch(checkNetworkConnectivity(isConnected))
      if (isConnected) {
        store.dispatch(getSortFilter(initialState));
      }
    });

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {

      if (!(store.getState().authState.userState.userInfo.userType === 'CT' && store.getState().authState.userState.selectedPatientInfo.userType === 'I')) {
        store.dispatch(onBack()) // works best when the goBack is async
        return true;
      } else {
        return true;
      }

    });
  }

  render() {
    return (
      <Provider store={store}>
        <AppRoute />
      </Provider>
    )
  }
}
AppRegistry.registerComponent(APP_NAME, () => App);
BackgroundFetch.registerHeadlessTask(headlessTask);