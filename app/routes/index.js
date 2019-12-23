import { createStackNavigator } from 'react-navigation';
import {
  Welcome,
  ProfileType,
  MemberDetails,
  SetUserId,
  SetPassword,
  PersonalDetails,
  AddGuardian,
  OnboardingCompleted,
  Login,
  Profile,
  EditClinicalCondition,
  EditLanguages,
  EditPersonalDetails,
  EditPointofService,
  Home,
  
  ForgetPassword,
  SentEmailConfirmation,
  ResetPassword,
  ResetPasswordSuccess,
  
  VisitProcessing,
  AssessmentVisitProcessing,
  Feedback,
  VisitHistory,
  VisitHistoryServiceDetails,
  SubmittedFeedback,
  VisitServiceList,
  SchedulePreferences,
  Requirements,
  AddMemberDetails,
  ProfileSelection,
  AddGuardianDetails,
  ManageConnection,
  CareTeam,
  CareTeamDashboard,
  CareTeamDashboardIndividualDetail,
  CareTeamDashboardIndividualItemDetail,
  CareTeamDashboardServiceProviderDetail,
  CareTeamDashboardServiceProviderItemDetail,
  CareTeamDashboardServiceRequestDetail,
  CareTeamDashboardServiceRequestItemDetail,
  CareTeamDashboardServiceVisitDetail,
  CareTeamDashboardServiceVisitItemDetail,
  StartVideoConference,
  VideoConference,
  WebViewAddCard,
  
  Payment,
  ConversationSummary,
  NewConversation,
  Conversation,
  EditTitle,
  ParticipantsList,
  AddParticipants,
  Menu,
  SelectIndividual,
  AboutUs,
  ServiceRequestDetails,
  InvitationAlert,
  ServiceProviderProfile,
  DiagnosisCode,
  PatientProfile,
  InpersonateHome,
  OfflineScreen,
  BlockoutDays,
  Help,
  FeedbackAlerts,
  ServiceRequestPlan
} from '../screens'

export const PATH = {
  PATIENT_PROFILE: 'PatientProfile',
  WELCOME_SCREEN: 'WelcomeScreen',
  PROFILE_TYPE_SCREEN: 'ProfileTypeScreen',
  PROFILE: 'Profile',
  EDIT_POINT_OF_SERVICE: 'EditPointofService',
  EDIT_CLINICAL_CONDITION: "EditClinicalCondition",
  EDIT_LANGUAGES: "EditLanguages",
  PATIENT_MANAGE_CONNECTION: 'PatientManageConnectionScreen',
  EDIT_PERSONAL_DETAILS: "EditPersonalDetails",
  MEMBER_DETAILS_SCREEN: 'MemberDetailsScreen',
  SET_USERID_SCREEN: 'SetUserIDScreen',
  BLOCKOUT_DAYS: "BlockoutDays",
  DASHBOARD_SCREEN: 'DashboardScreen',
  SET_PASSWORD_SCREEN: 'setpassword',
  PERSONAL_DETAILS_SCREEN: 'PersonalDetailsScreen',
  ADD_GUARDIAN_SCREEN: 'AddGuardianScreen',
  ONBOARDING_COMPLETE: 'OnboardingCompletedScreen',
  LOGIN_SCREEN: 'LoginScreen',
  HOME_SCREEN: 'HomeScreen',
  FORGET_PASSWORD_SCREEN: 'ForgetPasswordScreen',
  SENT_EMAIL_CONFIRMATION: 'SentEmailConfirmationScreen',
  RESET_PASSWORD_SCREEN: 'resetPassword',
  RESET_PASSWORD_SUCCESS: 'ResetPasswordSuccess',
  VISIT_SERVICE_DETAILS: 'ServiceRequestPlan',
  VISIT_PROCESSING: "VisitProcessing",
  ASSESSMENT_VISIT_PROCESSING: "AssessmentVisitProcessing",
  FEEDBACK: "Feedback",
  VISIT_HISTORY: "VisitHistory",
  VISIT_HISTORY_SERVICE_DETAILS: "VisitHistoryServiceDetails",
  SUBMITTED_FEEDBACK: "SubmittedFeedback",
  VISIT_SERVICE_LIST_SCREEN: 'VisitServiceListScreen',
  SCHEDULE_PREFERENCES_SCREEN: 'SchedulePreferencesScreen',
  REQUIREMENTS_SCREEN: 'Requirements',
  ADD_MEMBER_DETAILS: 'AddMemberDetails',
  PROFILE_SELECTION: 'ProfileSelection',
  ADD_GUARDIAN_DETAILS: 'AddGuardianDetails',
  MANAGE_CONNECTION: 'ManageConnectionScreen',
  CARETEAM_SCREEN: 'CareTeam',
  CARETEAM_DASHBOARD_SCREEN: 'CareTeamDashboardScreen',
  CARETEAM_DASHBOARD_INDIVIDUAL_DETAIL_SCREEN: 'CareTeamDashboardIndividualDetailScreen',
  CARETEAM_DASHBOARD_INDIVIDUAL_ITEM_DETAIL_SCREEN: 'CareTeamDashboardIndividualItemDetailScreen',
  CARETEAM_DASHBOARD_SERVICEPROVIDER_DETAIL_SCREEN: 'CareTeamDashboardServiceProviderDetailScreen',
  CARETEAM_DASHBOARD_SERVICEPROVIDER_ITEM_DETAIL_SCREEN: 'CareTeamDashboardServiceProviderItemDetailScreen',
  CARETEAM_DASHBOARD_SERVICEREQUEST_DETAIL_SCREEN: 'CareTeamDashboardServiceRequestDetailScreen',
  CARETEAM_DASHBOARD_SERVICEREQUEST_ITEM_DETAIL_SCREEN: 'CareTeamDashboardServiceRequestItemDetailScreen',
  CARETEAM_DASHBOARD_SERVICEVISIT_DETAIL_SCREEN: 'CareTeamDashboardServiceVisitDetailScreen',
  CARETEAM_DASHBOARD_SERVICEVISIT_ITEM_DETAIL_SCREEN: 'CareTeamDashboardServiceVisitItemDetailScreen',
  VIDEO_CONFERENCE_SCREEN: 'VideoConferenceScreen',
  START_VIDEO_CONFERENCE_SCREEN: 'StartVideoConferenceScreen',
  MANAGE_CONNECTION: 'ManageConnection',
  WEB_VIEW_ADD_CARD: "WebViewAddCard",
  PAYMENT: "Payment",
  conversationSummary: 'ConversationSummary',
  editTitle: 'EditTitle',
  participantsList: 'ParticipantsList',
  newConversation: 'NewConversation',
  conversation: 'Conversation',
  addParticipants: 'AddParticipants',
  MENU_SCREEN: 'MenuScreen',
  SELECT_INDIVIDUAL_SCREEN: 'SelectIndividaulScreen',
  NOTIFICATION_SETTINGS_SCREEN: 'NotificationSettingsScreen',
  NOTIFICATIONS_SCREEN: 'NotificationsScreen',
  ABOUT_US: "AboutUs",
  SERVICE_REQUEST_DETAILS: "ServiceRequestDetails",
  TELEHEALTH_INVITE: 'TelehealthInviteScreen',
  SERVICE_PROVIDER_PROFILE: 'ServiceProviderProfile',
  CARE_TEAM_DIAGNOSIS_CODE: 'DiagnosisCode',
  INPERSONATE_HOME_SCREEN: 'InpersonateHomeScreen',
  OFFLINESCREEN: 'OfflineScreen',
  HELP: "Help",
  FEEDBACK_ALERTS: "FeedbackAlerts",
  EDIT_HEIGHTWEIGHT_DETAILS: "EditHeightWeightDetails"
}

import {NotificationSettings, Notification} from '../screens/Notifications'
import EditHeightWeightDetails from '../screens/EditProfile/EditHeightWeightDetails';
const commonProps = ({ navigation }) => ({
  gesturesEnabled: false,
  header: null
})

export const AppStackRoot = createStackNavigator({
  
  WelcomeScreen: {
    screen: Welcome,
    navigationOptions: commonProps
  },

  Profile: {
    screen: Profile,
    navigationOptions: commonProps
  },

  PatientProfile: {
    screen: PatientProfile,
    navigationOptions: commonProps
  },

  ServiceProviderProfile: {
    screen: ServiceProviderProfile,
    navigationOptions: commonProps
  },
  
  BlockoutDays: {
    screen: BlockoutDays,
    navigationOptions: commonProps
  },

  AddGuardianDetails: {
    screen: AddGuardianDetails,
    navigationOptions: commonProps
  },
  HomeScreen: {
    screen: Home,
    navigationOptions: commonProps
  },
  InpersonateHomeScreen: {
    screen: InpersonateHome,
    navigationOptions: commonProps
  },
  NotificationSettingsScreen: {
    screen: NotificationSettings,
    navigationOptions: commonProps
  },
  NotificationsScreen: {
    screen: Notification,
    navigationOptions: commonProps
  },
  ManageConnection: {
    screen: ManageConnection,
    navigationOptions: commonProps
  },
  AddMemberDetails: {
    screen: AddMemberDetails,
    navigationOptions: commonProps
  },
  ResetPasswordSuccess: {
    screen: ResetPasswordSuccess,
    navigationOptions: commonProps
  },
  SentEmailConfirmationScreen: {
    screen: SentEmailConfirmation,
    navigationOptions: commonProps
  },  
  resetPassword: {
    screen: ResetPassword,
    navigationOptions: commonProps
  },
  ForgetPasswordScreen: {
    screen: ForgetPassword,
    navigationOptions: commonProps
  },
  ProfileTypeScreen: {
    screen: ProfileType,
    navigationOptions: commonProps
  },
  ProfileSelection: {
    screen: ProfileSelection,
    navigationOptions: commonProps
  },
  MemberDetailsScreen: {
    screen: MemberDetails,
    navigationOptions: commonProps
  },
  PersonalDetailsScreen: {
    screen: PersonalDetails,
    navigationOptions: commonProps
  },
  SetUserIDScreen: {
    screen: SetUserId,
    navigationOptions: commonProps
  },
  setpassword: {
    screen: SetPassword,
    path: 'setpassword/:profiletype/:uid/:guid',
    navigationOptions: commonProps
  },
  AddGuardianScreen: {
    screen: AddGuardian,
    navigationOptions: commonProps
  },
  OnboardingCompletedScreen: {
    screen: OnboardingCompleted,
    navigationOptions: commonProps
  },
  EditClinicalCondition: {
    screen: EditClinicalCondition,
    navigationOptions: commonProps
  },
  EditLanguages: {
    screen: EditLanguages,
    navigationOptions: commonProps
  },
  EditPointofService: {
    screen: EditPointofService,
    navigationOptions: commonProps
  },


  EditPersonalDetails: {
    screen: EditPersonalDetails,
    navigationOptions: commonProps
  },
  LoginScreen: {
    screen: Login,
    navigationOptions: commonProps
  },
  HomeScreen: {
    screen: Home,
    navigationOptions: commonProps
  },
  VisitProcessing: {
    screen: VisitProcessing,
    navigationOptions: commonProps
  },
  AssessmentVisitProcessing: {
    screen: AssessmentVisitProcessing,
    navigationOptions: commonProps
  },
  Feedback: {
    screen: Feedback,
    navigationOptions: commonProps
  },
  VisitHistoryServiceDetails: {
    screen: VisitHistoryServiceDetails,
    navigationOptions: commonProps
  },
  SubmittedFeedback: {
    screen: SubmittedFeedback,
    navigationOptions: commonProps
  },
  VisitServiceListScreen: {
    screen: VisitServiceList,
    navigationOptions: commonProps
  },
  ServiceRequestPlan: {
    screen: ServiceRequestPlan,
    navigationOptions: commonProps
  },
  CareTeam: {
    screen: CareTeam,
   navigationOptions: commonProps
  },
  VideoConferenceScreen: {
    screen: VideoConference,
    navigationOptions: commonProps
  },
  WebViewAddCard: {
    screen: WebViewAddCard,
    navigationOptions: commonProps
  },
  CareTeamDashboardIndividualDetailScreen: {
    screen: CareTeamDashboardIndividualDetail,
    navigationOptions: commonProps
  },
  CareTeamDashboardServiceProviderDetailScreen: {
    screen: CareTeamDashboardServiceProviderDetail,
    navigationOptions: commonProps
  },
  CareTeamDashboardServiceRequestDetailScreen: {
    screen: CareTeamDashboardServiceRequestDetail,
       navigationOptions: commonProps
  },
  StartVideoConferenceScreen: {
    screen: StartVideoConference,
    navigationOptions: commonProps
  },
  CareTeamDashboardServiceVisitDetailScreen: {
    screen: CareTeamDashboardServiceVisitDetail,
    navigationOptions: commonProps
  },
  SchedulePreferencesScreen: {
    screen: SchedulePreferences,
    navigationOptions: commonProps
  },
  CareTeamDashboardIndividualItemDetailScreen: {
    screen: CareTeamDashboardIndividualItemDetail,
    navigationOptions: commonProps
  },
  CareTeamDashboardServiceProviderItemDetailScreen: {
    screen: CareTeamDashboardServiceProviderItemDetail,
    navigationOptions: commonProps
  },
  CareTeamDashboardServiceRequestItemDetailScreen: {
    screen: CareTeamDashboardServiceRequestItemDetail,
    navigationOptions: commonProps
  },
  CareTeamDashboardServiceVisitItemDetailScreen: {
    screen: CareTeamDashboardServiceVisitItemDetail,
    navigationOptions: commonProps
  },
  ConversationSummary: {
    screen: ConversationSummary,
    navigationOptions: commonProps
  },
  EditTitle: {
    screen: EditTitle,
    navigationOptions: commonProps
  },
  NewConversation: {
    screen: NewConversation,
    navigationOptions: commonProps
  },
  Conversation: {
    screen: Conversation,
    navigationOptions: commonProps
  },
  ParticipantsList: {
    screen: ParticipantsList,
    navigationOptions: commonProps
  },
  Requirements: {
    screen: Requirements,
    navigationOptions: commonProps
  },
  AddParticipants: {
    screen: AddParticipants,
    navigationOptions: commonProps
  },
  Payment: {
    screen: Payment,
    navigationOptions: commonProps
  },
  MenuScreen: {
    screen: Menu,
    navigationOptions: commonProps
  },
  SelectIndividaulScreen: {
    screen: SelectIndividual,
    navigationOptions: commonProps
  },
  AboutUs: {
    screen: AboutUs,
    navigationOptions: commonProps
  },
  ServiceRequestDetails: {
    screen: ServiceRequestDetails,
    navigationOptions: commonProps
  },
  CareTeamDashboardScreen: {
    screen: CareTeamDashboard,
    navigationOptions: commonProps
  },
  DiagnosisCode: {
    screen: DiagnosisCode,
    navigationOptions: commonProps
  },
  TelehealthInviteScreen: {
    screen: InvitationAlert,
    navigationOptions: commonProps
  },
  ServiceProviderProfile: {
    screen: ServiceProviderProfile,
    navigationOptions: commonProps
  },
  VisitHistory: {
    screen: VisitHistory,
    navigationOptions: commonProps
  },
  OfflineScreen: {
    screen: OfflineScreen,
    navigationOptions: commonProps
  },
  Help: {
    screen: Help,
    navigationOptions: commonProps
  },
  FeedbackAlerts: {
    screen: FeedbackAlerts,
    navigationOptions: commonProps
  },
  EditHeightWeightDetails: {
    screen: EditHeightWeightDetails,
    navigationOptions: commonProps
  }
});
  
