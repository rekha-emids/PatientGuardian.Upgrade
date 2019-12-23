import { DEV_SERVICE_URL } from "./http";

// HMSA-UAT SERVER
// export const spURL = "https://HMSA-UAT-sp-api.coreodevserver.com/api/"
// export const serviceRequestURL = "https://HMSA-UAT-sr-api.coreodevserver.com/api/"
// export const geoURL = "https://HMSA-UAT-gen-api.coreodevserver.com/api/"
// export const paymentURL = "https://HMSA-UAT-tp-api.coreodevserver.com/"
// export const paymentAPIUrl = paymentURL + "api/"
// export const aboutUs = "https://HMSA-UAT-tp-api.coreodevserver.com/api/"

// UAT SERVER
// export const spURL = "https://uat-sp-api.coreodevserver.com/api/"
// export const serviceRequestURL = "https://uat-sr-api.coreodevserver.com/api/"
// export const geoURL = "https://uat-gen-api.coreodevserver.com/api/"
// export const paymentURL = "https://uat-tp-api.coreodevserver.com/"
// export const paymentAPIUrl = paymentURL + "api/"
// export const aboutUs = "https://uat-tp-api.coreodevserver.com/api/"

// PFTEST SERVER
export const spURL = "https://PFTest-sp-api.coreoflowsandbox.com/api/"
export const serviceRequestURL = "https://PFTest-sr-api.coreoflowsandbox.com/api/"
export const geoURL = "https://PFTest-gen-api.coreoflowsandbox.com/api/"
export const paymentURL = "https://pftest-tp-api.coreoflowsandbox.com/"
export const paymentAPIUrl = `${paymentURL}api/`
export const aboutUs = "https://pftest-tp-api.coreoflowsandbox.com/api/"

// QA URL's
// export const baseURL = "https://chqa-api.coreoflowsandbox.com/api/";
// export const baseURLServiceRequest = DEV_SERVICE_URL //"https://chqa-ui.coreoflowsandbox.com/api/";
// export const spURL = "https://chqa-sp-api.coreoflowsandbox.com/api/"
// export const serviceRequestURL = DEV_SERVICE_URL //"https://chqa-ui.coreoflowsandbox.com/api/"
// export const geoURL = "http://ch-api.coreoflowsandbox.com:9008/api/"
// export const paymentURL = "https://chqa-vp-ui.coreoflowsandbox.com/"
// export const paymentAPIUrl = paymentURL + "api/"
// export const aboutUs = "https://chqa-tp-api.coreoflowsandbox.com/api/"
// export const signalRUrl = 'https://chqa-tp-api.coreoflowsandbox.com/signalR';


//Dev URL's
// export const spURL = "https://chdevdemo-sp-api.coreoflowsandbox.com/api/"
// export const serviceRequestURL = "https://chdevdemo-sr-api.coreoflowsandbox.com/api/"
// export const geoURL = "https://chdevdemo-gen-api.coreoflowsandbox.com/api/"
// export const paymentURL = "https://chdevdemo-tp-api.coreoflowsandbox.com/"
// export const paymentAPIUrl = paymentURL + "api/"
// export const aboutUs = "https://chdevdemo-tp-api.coreoflowsandbox.com/api/"

//Demo URL's
// export const baseURL = "https://chdemo-gen-api.coreodevserver.com/api/";
// export const baseURLServiceRequest = "https://chdemo-sr-api.coreodevserver.com/api/";
// export const spURL = "https://chdemo-sp-api.coreodevserver.com/api/"
// export const serviceRequestURL = "https://chdemo-sr-api.coreodevserver.com/api/"
// export const geoURL = "https://chdemo-gen-api.coreodevserver.com/api/"
// export const paymentURL = "https://chdemo-tp-api.coreodevserver.com/"
// export const paymentAPIUrl = paymentURL + "api/"
// export const aboutUs = "https://chdemo-tp-api.coreodevserver.com/api/"

// HMSA DEMO
// export const baseURL = "https://HMSADemo-gen-api.coreodevserver.com/api/";
// export const baseURLServiceRequest = "https://HMSADemo-sr-api.coreodevserver.com/api/";
// export const spURL = "https://HMSADemo-sp-api.coreodevserver.com/api/"
// export const serviceRequestURL = "https://HMSADemo-sr-api.coreodevserver.com/api/"
// export const geoURL = "https://HMSADemo-gen-api.coreodevserver.com/api/"
// export const paymentURL = "https://HMSADemo-tp-api.coreodevserver.com/"
// export const paymentAPIUrl = paymentURL + "api/"
// export const aboutUs = "https://HMSADemo-tp-api.coreodevserver.com/api/"

export const API = {
    getServiceArea: "ServiceProvider/GetServiceProviderServiceAreaView/",
    getIndividualsList: 'CareTeam/Individual/List',
    GetPlan: 'LookUp/Plan',
    GetEmailIdByUserId: 'CoreoHomeUser/',
    SearchPatient: 'Patient/',
    SetPassword: 'CoreoHomeUser/',
    SendVerificationLink: 'CoreoHomeUser',
    getAllClinicalCondition: 'Patient/get-all-clinical-conditions',
    getClinicalCondition: 'Patient/get-patient-clinical-conditions/',
    addClinicalCondition: 'Patient/update-patient-clinical-conditions/',
    getPersonalDetailCareTeam: 'User/',
    getImageCareTeam: 'User/Image/',
    getPatientAddress: 'Patient/',
    addPatientAddress: 'Patient/',
    updatePatientAddress: 'Patient/',
    deletePatientAddress: 'Patient/',
    updatePersonalDetail: 'Patient/',
    updateGuardianDetail: 'CoreoHomeUser/GuardianProfile',
    GetRelationship: 'LookUp/Relationship',
    SendPersonalDetails: 'Guardian',
    getCity: 'ServiceProviderLookUp/GetState',
    uploadImage: 'Patient/Image',
    getImage: 'Patient/Image/',
    getPersonalDetail: 'Patient/',
    getAggregatedPersonalDetail: "Patient/get-patient-mobile-view/",
    getAggregatedGuardianPersonalDetail: "ManageConnections/get-guardian-mobile-view/",
    deleteIndividual: 'ManageConnections/Individual/',
    getAggregatedLookupDetails: "ServiceProvider/AggregatedLookup/",
    getServiceOffered: 'ServiceProvider/',
    editServiceOffered: 'ServiceProvider/',
    addServiceOffered: 'ServiceProvider/',
    getServiceProviderID: 'ServiceProviderOnBoarding/',
    SetGuardianPassword: 'CoreoHomeUser/UpdateGuardianPassword/',
    GetEmailIdByGuardianUserId: 'CoreoHomeUser/',
    CreatePatient: 'Patient',
    getLanguages: 'PatientLanguage/Language',
    addLanguages: 'PatientLanguage/',
    spLanguages: "ServiceProvider/",
    AddGuardian: 'patient/AddGuardian',
    Login: 'connect/token',
    updateEula: 'api/User/Eula',
    getEulaContent: 'api/user/config/EulaContent',
    SendResetPasswordLink: 'api/User/',
    GetEmailIdByCoreoHomeUserId: 'api/user/verifypasswordlink/',
    ResetPassword: 'api/user/',
    getServiceProviders: 'Patient/ServiceProvider/HighestRating/',
    getPatientServiceRequests: 'ServiceRequest/Servicerequests/',
    getPatientServiceVists: 'Patient/PatientVisit',
    getAggregatedPatientAPIS: "Patient/AggregatedPatientDashboardAPI/",
    getServiceRequestDetails: 'ServiceRequest/ServiceRequestDetails/',
    getServiceRequestSchedule: 'plan/patient/filtered-servicerequestvisit',
    getQuestionsList: 'VisitProcessing/ServiceRequestVisitFeedback/48',
    getServiceRequestPerformTasks: 'VisitProcessing/ServiceRequestVisitDetails/',
    getServicePlanPerformTasks: "plan/servicerequestvisitdetails/",
    saveAnswers: 'VisitProcessing/ServiceRequestVisit/FeedbackResponse/Patient',
    saveServicePlanAnswers: "feedback/planpatientvisitfeedbackresponse",
    getSummaryDetails: 'VisitProcessing/ServiceRequestVisitSummaryDetails/',
    getServicePlanSummaryDetails: "servicevisit/serviceplanvisitsummarydetails/",
    saveSummaryDetails: 'VisitProcessing/SubmitBillingForVisit/',
    getSortedVisitHistory: "ServiceRequest/Visits/PatientSorting/",
    getVisitHistoryList: 'servicerequest/patientvisit',
    getServiceProviderRating: "VisitProcessing/GetServceproviderRating/",
    getESPServiceProviderRating: "feedback/patient/feedbackdetails/",
    getPatientRating: "VisitProcessing/get-service-request-visit-feedback-details/",
    cancelVisit: "ServiceRequest/Cancel",
    getServiceCategories: "ServiceRequest/ServiceCategory",
    getServiceTasks: "ServiceRequest/ServiceType/",
    getServiceRequestList: 'ServiceRequest/Patient/',
    getPatientServiceRequests: 'ServiceRequest/Patient/',
    getFilteredVisitHistory: "ServiceRequest/PatientVisit",
    getSortServiceRequest: "ServiceRequest/Patient",
    getFilterServiceRequest: 'ServiceRequest/PatientRequest',
    getServiceRequestListSortingFilter: 'ServiceRequest/PatientRequest',
    getAllServiceProviders: "ServiceRequest/GetAllServiceProviders/",
    getTimeoutMilliseconds: 'Lookup/AutoLogout',
    servicerequest: 'ServiceRequest/',
    getStates: 'LookUp/State',
    getServiceRequestsById: "ServiceRequest/ServiceRequests/",
    getServiceProvidersBySRId: "Search/ServiceProviderDetailsByRequestId/",
    getSkills: "ServiceProvider/Skill",
    getFilteredServiceProviders: "Search/PostServiceFilters",
    searchServiceProviders: "Search/SearchProvidersWithQ/",
    getPointOfServices: "VisitProcessing/PatientAddress/",
    getLookupSlots: "ServiceRequest/LookUp/Slot",
    getState: 'ServiceProviderLookUp/GetState',
    getServiceRequestSlots: "ServiceRequest/ServiceRequestSlot/",
    sortServiceProviders: "VisitProcessing/ServiceProviderList/",
    getManageConnections: 'ManageConnections/',
    getPatientConnections: 'ManageConnections/GetPatientConnectionDetails/',
    getGeoLocation: "Patient/GetGeologicalPosition",
    getCareTeamIndividualCount: "CareTeam/Individual/Count",
    getCareTeamInTotalDashboardDetail: "CareTeam/Individual/List",
    getCareTeamVisitDashboardDetail: "CareTeam/Individual/VisitList",
    getCareTeamServiceRequestDashboardDetail: "CareTeam/ServiceRequest/List",
    getCareTeamServiceVisitDashboardDetail: "CareTeam/ServiceVisit/List",
    getCareTeamServiceProviderCount: "CareTeam/ServiceProvider/Count",
    getCareTeamServiceRequestCount: "CareTeam/ServiceRequest/Count",
    getCareTeamServiceVisitCount: "CareTeam/ServiceVisit/Count",
    getCareTeamServiceProviderDashboardDetail: "CareTeam/ServiceProvider/List",
    generateToken: 'VideoConferencing/',
    getContext: 'conversation/context/',
    createRoomId: 'VideoConferencing',
    getLinkedParticipants: 'GetParticipants/',
    joinVideoConference: 'VideoConferencing/JoinConference/',
    leaveVideoConference: 'VideoConferencing/LeaveConference/',
    getParticipantByConferenceId: 'VideoConferencing/GetParticipantByConferenceId/',
    getTeleHealthAllParticipants: 'VideoConferencing/GetAllParticipants/',
    addParticipants: 'VideoConferencing/AddParticipant',
    getNotificationSettings: 'NotificationSetting/get-notification-settings/',
    updateNotificationSettings: 'NotificationSetting/insert-notification-settings/',
    deleteCard: "Account/DeleteCard/",
    getSavedCards: "Account/GetByStripeCustomer/",
    saveCard: "home/SaveCard/?PatientID=",
    successPayment: "Home/Success",
    getPatientImage: "Patient/Image/",
    getPatientDetails: "Patient/",
    getConversationSummary: 'conversation/user/',
    getConversationSummaryImpersonate: 'Conversation/CareTeam/',
    getConversation: 'conversation/',
    getConversationImpersonate: 'Conversation/CareTeam/ConversationMessage/',
    getAllParticipants: 'conversation/participants/',
    createNewConversation: 'conversation',
    saveTitle: 'conversation/title',
    sendMessage: 'conversation/message',
    addParticipant: 'conversation/participant/add',
    removeParticipant: 'conversation/participant/remove',
    getUnreadCount: 'Conversation/Unread/User/',
    updateReadStatus: 'Conversation/UpdateRead/',
    leaveConversation: 'Conversation/leave/',
    getContext: 'conversation/context/',
    getParticipantsByContext: 'conversation/ParticipantByContext/',
    getDashboardMessageCount: 'Conversation/Dashboard/ConversationCount/',
    getAboutUs: "Common/LookupConfig/AboutUsMobile",
    closePaymentUrl: "Home/Redirect",
    sendDeviceToken: "patient/DeviceToken",
    getCohorts: "Cohort/GetAll/",
    getContracts: "Membership/Get-all-contracts",
    getCareTeamClinicalConditions: "PatientClinicalCondition/GetAll/",
    serviceRequestDetails: "ServiceRequest/ServiceRequestDetails/",
    approveServiceRequest: "Careteam/ServiceRequestResponse/",
    getAllAttributeProviders: "Patient/GetAllAttributedProviders",
    approveOrDeclineServiceRequest: "CareTeam/ServiceRequest/Approve/",
    inviteSp: "ServiceRequest/InviteServiceProvider/",
    cancelInvitation: "ServiceRequest/CancelInvitedServiceProvider/",
    hireServiceProvider: "ServiceRequest/Hire/",
    getServiceRequestEligibilityStatus: 'BenefitProcess/CheckEligibility',
    getUserRoles: "User/GetUserRoles",
    favouriteSp: "Patient/FavouriteServiceProvider/",
    getDiagnosisCode: "PatientClinicalCondition/GetDiagnosisCode",
    postDiagnosisCode: "PatientClinicalCondition/EligibilityServiceRequestApproval",
    postAuthNo: "PatientClinicalCondition/EligibilityServiceRequestApproval",
    uploadImageGuardian: 'CoreoHomeUser/Image',
    getImageGuardian: 'CoreoHomeUser/Image/',
    getPersonalDetailGuardian: 'CoreoHomeUser/GuardianProfile/',
    getLanguagesGuardian: 'CoreoHomeUser/',
    getGuardianAddress: 'CoreoHomeUser/',
    addPatientAddressGuardian: 'CoreoHomeUser/',
    deletePatientAddressGuardian: 'CoreoHomeUser/',
    getProfilePercentage: 'Patient/get-patient-progress/',
    getConversationImage: 'Conversation/Message/',
    getConversationMessage: 'Conversation/ConversationMessage/',
    getBrowseServiceProviders: "ServiceRequest/ServiceProvider/",
    getFavouriteServiceProviders: "Patient/FavouriteServiceProvider/",
    getRecentServiceProviders: "Patient/FavouriteServiceProvider/",
    engageServiceProvider: "ServiceRequest/Engage/",
    getSPProfilePercentage: 'ServiceProvider/ProgressIndicator/',
    getSPPersonalDetail: 'ServiceProvider/',
    getSPCity: 'ServiceProviderLookUp/GetState',
    getSPImage: 'ServiceProvider/Image/',
    getSPGender: 'ServiceProviderLookUp/gender',
    addSPSkills: 'ServiceProvider/',
    getAvailableDays: 'ServiceProvider/',
    getBlackOutDays: 'ServiceProvider/',
    getSPLanguages: 'ServiceProvider/Language',
    addSPLanguages: 'ServiceProvider/',
    certification: 'ServiceProvider/',
    education: 'ServiceProvider/',
    WorkHistory: 'ServiceProvider/',
    getNotificationList: 'Patient/GetAllNotifications/',
    getGender: "ServiceProviderLookUp/gender",
    getLoginInfo: 'connect/userinfo',
    makePrimaryCard: "Account/UpdateCard/",
    serviceVisitsCount: "VisitProcessing/Patient/ServiceVisitCount/",
    cancelHiredServiceRequest: "ServiceRequest/CancelHiredServiceProvider",
    serviceRequestSortAndFilter: "ServiceRequest/Patient/SortAndFilter/",
    removeDeviceToken: "patient/RemoveDeviceToken",
    searchBrowseSp: "Search/BrowseAllSearchServiceProvider/",
    browseAllFilterServiceProviders: "Search/BrowseAllFilterServiceProvider/",
    endConference: 'VideoConferencing/EndConference/',
    rejectConference: 'VideoConferencing/RejectConference',
    getBuildVersion: 'Common/LookupConfig/BuildVersion',
    getUnreadConversationsByUserId: 'Conversation/GetUnreadMessages/',
    getLatestMessages: 'Conversation/GetNewPostedMessage/',
    MessageFallBackInterval: 'Common/LookupConfig/MessageFallBackInterval',
    GetPatientCoreoDetails: 'Patient/GetPatientCoreoDetails/',
    getConverstionCountByUserId: 'Conversation/Count/',
    getConversationCount: "Conversation/MessageCount/",
    cancelServiceVisit: "VisitProcessing/CancelVisit/",
    getVideoConferenceNotifications: "VideoConferencing/GetAllActiveVideoConference",
    getPatientFeedbackAlerts: "CareTeam/Individual/FeedbackVisit/",
    getServiceProviderFeedbackAlerts: "CareTeam/ServiceProvider/FeedbackVisit/",
    getMessageFallBackInterval: 'Common/LookupConfig/MessageFallBackInterval',
    checkPosValidation: "ServiceRequest/Patient/PosValidation",
    postErrorMessage: "ErrorMessage/PostErrorMessage",
    getPatientStages: "patient/patient-guidance-stage/",
    patientBrowseStage: "patient/patient-browse-stage",
    introvideolink: "patient/patient-videolink-login/",
    getFilteredServiceVisits: "plan/visitdetails",
    getAssessmentQuestionsList: "assessment/get-assessment-visit/",
    getHeightWeightDetails: "patient/get-patient-coreo-association/",
    updateHeightWeightDetails: "patient/post-patient-coreo-association",
    cancelServicePlanVisit: "servicevisit/cancelvisit/",
    getFirstAndLastDatesOfRequest: "plan/getfirstlastvisitdate",
    getCanOnboardFlag: "Common/LookupConfig/AllowOnBoarding",
    getRiskGroup:"LookUp/RiskGroup"
}
