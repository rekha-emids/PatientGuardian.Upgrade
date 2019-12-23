export let NotificationState = {
    NotificationListState: { notificationList: [], isLoading: 0 },
    NotificationSettingsState: {
        pushNotification: [
            {
                applicationModuleDescription: "Start/End Visit Processing",
                isChecked: true,
                moduledescription: "Receive notifications when the Service Visit Starts and Ends",
                serviceProviderId: 28,
                title: "Push Notification",
                userPrefrencesApplicationModuleID: 1
            },
            {
                applicationModuleDescription: "Video Conferences",
                isChecked: false,
                moduledescription: "Receive all notifications for video conferencing",
                serviceProviderId: 28,
                title: "Push Notification",
                userPrefrencesApplicationModuleID: 2
            },
            {
                applicationModuleDescription: "Conversations",
                isChecked: true,
                moduledescription: "Receive all notifications for Conversations",
                serviceProviderId: 28,
                title: "Push Notification",
                userPrefrencesApplicationModuleID: 3
            },
            {
                applicationModuleDescription: "Service Requests",
                isChecked: true,
                moduledescription: "Receive all notifications related to Service Requests",
                serviceProviderId: 28,
                title: "Push Notification",
                userPrefrencesApplicationModuleID: 4
            }
        ], emailNotification: [{
            applicationModuleDescription: "General Messages",
            isChecked: false,
            moduledescription: "Receive all general notifications via Mail",
            serviceProviderId: 28,
            title: "Email Notification",
            userPrefrencesApplicationModuleID: 5
        }]
    }
}

 export let authState = {
    forgetPasswordState: { sendResetPasswordLinkSuccess: false, sendResetPasswordLinkError: false, emailId: "" },
    loginState: { error: { message: "", code: "" }, isFailed: false },
    logoutState: { userData: {}, loading: false, error: { message: "", code: "" }, deviceToken: "eD2xfF96D0c:APA91bEXDCqtFM9336nmkYU1eRUl6mRLeFSgen…1LqXcH_e5layJwEOklPGCNVJcwtROTRgHt2N8nQ3mGkCxNH08" },
    resetPasswordState: {
        emailId: "",
        getEmailIdError: false,
        getEmailIdSuccess: false,
        patientId: null,
        resetPasswordError: false,
        resetPasswordLinkStatus: "",
        resetPasswordStatus: false,
        resetPasswordSuccess: false,
        token: "",
        userId: null
    },
    userAgreementState: { isEulaUpdated: false, eulaContent: "<!DOCTYPE html><html lang='en'><head><meta charset…PAA Regulations and any other applicable law.</p>", emailId: "Roy.Snyder@mailinator.com" },
    userState: {
        authData: { access_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA2RDNFNDZFOTEwNzNDNU…m0et8xojjpBW4WO5P5DNUMxK2C2DDwlRTbnl5Myj_ed9FF0WA", expires_in: 2592000, token_type: "Bearer" },
        autoLogoutTime: 1800000,
        isEntityServiceProvider: false,
        roles: {
            Async_Messages: { Create: true, Update: true, Read: true },
            Dashboard: { Read: true },
            Login: { Create: true, Update: true, Read: true },
            Payment_Processing: { Read: true, Delete: true },
            Profile: { Read: true },
            Search: { Create: true, Update: true, Read: true, Delete: true },
            Service_Request: { Read: true },
            Telehealth: { Create: true, Update: true, Read: true },
            Visit_History: { Read: true },
            Visit_Processing: { Update: true, Read: true }
        },
        serviceProviderId: 28,
        serviceProviderImage: {},
        serviceProviderName: "",
        serviceProviderTypeId: 1,
        userEmail: "Roy.Snyder@mailinator.com",
        userId: 82
    }
}