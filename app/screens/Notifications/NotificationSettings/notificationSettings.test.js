import React from "react";
import configureMockStore from "redux-mock-store";
import NotificationSettings from "./index";
import thunkMiddleware from 'redux-thunk';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NotificationState, authState } from "./mockData";
Enzyme.configure({ adapter: new Adapter() });
const middlewares = [ thunkMiddleware ]
const mockStore = configureMockStore(middlewares);

 jest.mock('jsencrypt', () => ({	
    encryptPassword: 'mockJSEncrypt'	
}))


 jest.mock('react-native-background-task', () => ({	
  rnbt: 'mockRNBackgroundTask'	
}))

 jest.mock('react-native-firebase', () => ({	
  rnfb: 'mockRNFirebase'	
}))

 jest.mock('rn-fetch-blob', () => ({	
  reactNativeFetchBlob: 'mockRNFetchBlob'	
}))

 jest.mock('react-navigation-redux-helpers', () => ({	
    reactNavigationReduxHelpers: 'mockReactNavigationReduxHelpers'	
  }))

   jest.mock('../../../redux/store', () => ({	
    Store: 'mockStore'	
  }))

   jest.mock('../../../routes', () => ({	
    routes: 'mockRoutes'	
  }))

     jest.mock('@ptomasroos/react-native-multi-slider', () => ({	
    rnMultislider: 'mockRNMultislider'	
  }))

   jest.mock('react-native-pdf', () => ({	
    reactNativePdf: 'mockRNPdf'	
  }))
  let item = {
    applicationModuleDescription: "Service Requests",
    isChecked: true,
    moduledescription: "Receive all notifications related to Service Requests",
    serviceProviderId: 28,
    title: "Push Notification",
    userPrefrencesApplicationModuleID: 4
  }
  let index = 3;
  it('should be handling AgeRange', () => {
    const store = mockStore({
        loadingState: {
            isLoading: true
        },
        NotificationState: NotificationState,
        authState: authState
    }),

      context = { store },
     wrapper = shallow(
      <NotificationSettings />,
      { context },
    )
    let inst = wrapper.dive().instance();
    inst.onCheckClick()
    inst.onClickSync()
    inst.getCardNotification({item, index}, false)
    index = 0
    item = {
        applicationModuleDescription: "Service Requests",
        isChecked: false,
        moduledescription: "Receive all notifications related to Service Requests",
        serviceProviderId: 28,
        title: "Push Notification",
        userPrefrencesApplicationModuleID: 4
      }
    inst.getCardNotification({item, index}, true)
    inst.getCardNotification({item, index}, false)
    inst.handleCheckIcon(item, false)
    inst.setState({
        lastSyncedDate: '25 May | 14:08'
    })
     }) 
