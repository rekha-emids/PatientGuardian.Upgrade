import {connections, vh_unselected, payments, help, settings, videoconference, aboutUs} from '../assets/images/index'
export const UserProfileType = {
    Individual: "Individual",
    Guardian: "Guardian",
    Patient: 'patient',
    Organization: "Organization"
};


export const SERVICE_STATES = {
  YET_TO_START: 43,
  IN_PROGRESS: 44,
  COMPLETED: 45,
  PAYMENT_PENDING: 90,
  CANCELLED: 46
}

export const RELATION_ID = {
  NAME: 'Service Provider',
  ID: 2
}

export const RESPONSE_STATUS = {
    VALID: "Valid",
    INVALID: "Invalid",
    OTP_EXPIRED: "Otp Expired",
    OTP_MATCHED: "Otp Matched",
    OTP_NOT_MATCHED: "Otp Not Matched",
    LINK_ACTIVE: 'Link Active',
    OK: 'OK',
    ALREADY_EXIST: 'Already Exist',
    SUCCESS: 200,
    ONBOARDED: 'Onboarded',
    LINK_EXPIRED: "Link Expired"
}
export const DATE_FORMAT = "MM/DD/YYYY";
export const DD_MMM_HH_MM = "ddd, MMM DD hh:mm A"
export const HH_MM_A = "hh:mm A"
export const NEW_DATE_FORMAT = "YYYY-MM-DD";
export const DATE_YEAR = "YYYY";
export const MM_YYYY = "MM YYYY"
export const MMM_YYYY = "MMM YYYY"

export const DATE_FORMATS = {
  "MM_YYYY": "MM YYYY",
  "MMM_YYYY": "MMM YYYY",
  "YYYY_MM_DD": "YYYY-MM-DD",
  "MMM_DD_YYYY": "MMM DD YYYY",
  "MMM_DD": "MMM DD",
  "MMM_DD_DDD": "MMM DD, dddd",
  "DD_MMM": "DD MMM",
  "MM_DD_YYYY": "MM-DD-YYYY",
  "HH_MM_A": "hh:mm A",
  "DDD": "ddd"  
}

export const USER_DATA = 'userData';

export const APP_NAME = 'coreohome';

export const OPEN_STATUS = 35
export const HIRED_STATUS = 38
export const IN_PROGRESS_STATUS = 40
export const PENDING_APPROVAL = 106
export const CLOSED_STATUS = 42
export const ALL = 0
export const DECLINED = 107

export const CANCEL_AVAILABILITY = [OPEN_STATUS, HIRED_STATUS]

export const VISIT_SERVICE_STATUS_ENGAGED = "Engaged";
export const VISIT_SERVICE_STATUS_OPEN = "Open";
export const VISIT_SERVICE_STATUS_CLOSED = "Closed";
export const VISIT_SERVICE_STATUS_IN_PROGRESS = "InProgress";
export const VISIT_SERVICE_STATUS_PENDING_APPROVAL = "Pending Approval";


export const visitServiceStatus = {
  VISIT_SERVICE_STATUS_ENGAGED: "Engaged",
  VISIT_SERVICE_STATUS_OPEN: "Open",
  VISIT_SERVICE_STATUS_CLOSED: "Closed",
  VISIT_SERVICE_STATUS_IN_PROGRESS: "InProgress",
  VISIT_SERVICE_STATUS_PENDING_APPROVAL: "Pending Approval"
}

export const ONE_TIME = 31
export const RECCURING = 32
export const END_AFTER = "END_AFTER"
export const END_BY = "END_BY"

export const FIREBASE_TOKEN = "FIREBASE_TOKEN"
export const USER_INFO = "USER_INFO"


export const WEEKLY = "Weekly"
const BI_MONTHLY = "Bi-Monthly",
 BI_WEEKLY = "Bi-Weekly",
 MONTHLY = "Monthly"

export const OCCURANCES = {
    WEEKLY,
    BI_MONTHLY,
    MONTHLY,
    BI_WEEKLY
}

export const VALIDATIONS = {
    ADDRESS: "ADDRESS",
    OCCURANCES: "occurrences",
    SLOTS: "SLOTS",
    STREET: "street",
    STATE: "state",
    ZIP: "zip",
    ADDRESS_TYPE: "addressType",
    CITY: "city",
    SELECT_DATE: "selectedDate",
    START_DATE: "startDate",
    END_DATE: "endDate",
    RECCURING_PATTERN: "recurringPattern"
}

export const NOTIFICATION_LINKS = {
  SERVICE_REQUESTS: 'ServiceRequests',
  VISIT_PROCESSING_PAGE: 'VisitProcessing',
  VIDEO_CONFERENCE: 'VideoConferences',
  MY_SERVICE_REQUEST: 'MyServiceRequest',
  CONVERSATIONS: 'Conversations',
  PAYMENT_PROCESSING_PAGE: 'PaymentProcessing',
  SERVICE_DETAILS_PAGE: 'ServiceRequestDetailsPage'
}

export const PAYMENT_PENDING = "PaymentPending"

export const CHANNEL_ID = 'coreoHomePG'
export const CHANNEL_NAME = 'coreo Home PG'
export const CHANNEL_DESCRIPTION = 'coreo Home PG Notifications'

export const SLOTS = [
"Morning",
"Afternoon",
"Evening"
]
export const DAYS = [
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday",
"Sunday"
]

export const INVIE = "Invite"
export const INVITED = "Invited"
export const APPLIED = "Applied"
export const Hired = "Hired"
export const OPEN = "Open"

export const RESET_PASSWORD = "resetpassword"

export const COMPLETED_TASK_STATUS_ID = 45;

export const DEFAULT_DATA_TO_MANAGE_CONNECTION = "i";
export const MY_CONNECTION_INDIVIDUAL = 'I';
export const MY_CONNECTION_GUARDIAN = 'G';

export const PREFERENCE_ID = 8
export const OTHERS = 'Others';
export const NO_PREFERENCE = 'No Preference';
export const NOT_DISCLOSED = 'Not Disclosed';


export const paymentStatus = {
    IN_PROGRESS: "IN_PROGRESS",
    SUCCESSFUL: "SUCCESSFUL",
    FAILED: "FAILED"
  }

export const MENU_TYPES = {
  CONNECTIONS: "CONNECTIONS",
  VISIT_HISTORY: "VISIT_HISTORY",
  VIDEO_CONFERENCE: "VIDEO_CONFERENCE",
  PAYMENT: "PAYMENT",
  SETTINGS: "SETTINGS",
  ABOUT_US: "ABOUT_US",
  HELP: "HELP",
  SUPPORT: "SUPPORT"
}

export const ActionType = {
  EDIT: "Edit",
  Add: "Add"
}

export const SCREENS = {
  PROFILE: 'Profile',
  DASHBOARD: 'Dashboard',
  SERVICE_REQUEST: 'Service_Request',
  MANAGE_CONNECTION: 'Manage_Connections',
  VISIT_PROCESSING: 'Visit_Processing',
  PAYMENT_PROCESSING: 'Payment_Processing',
  VISIT_HISTORY: 'Visit_History',
  SEARCH: 'Search',
  ASYNC_MESSAGE: 'Async_Messages',
  TELEHEALTH: 'Telehealth',
  GEO_MAP: 'Geo_Map',
  NOTIFICATIONS: 'Notifications'
}

export const MENU_NAVIGATION = [
    {
        name: 'ManageConnection',
        icon: connections,
        title: 'Connections',
        type: MENU_TYPES.CONNECTIONS,
        permission: SCREENS.MANAGE_CONNECTION
      },
      {
        name: 'VisitHistory',
        icon: vh_unselected,
        title: 'Visit History',
        type: MENU_TYPES.VISIT_HISTORY,
        permission: SCREENS.VISIT_HISTORY
      },
      {
        name: 'TeleHealth',
        icon: videoconference,
        title: 'Video Conference',
        type: MENU_TYPES.VIDEO_CONFERENCE,
        permission: SCREENS.TELEHEALTH
      },
      {
        name: 'Payments',
        icon: payments,
        title: 'Payments',
        type: MENU_TYPES.PAYMENT,
        permission: SCREENS.PAYMENT_PROCESSING
      },
      {
        name: 'Settings',
        icon: settings,
        title: 'Settings',
        type: MENU_TYPES.SETTINGS
      },
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

    export const GUARDIAN_MENU_NAVIGATION = [
        {
          name: 'VisitHistory',
          icon: vh_unselected,
          title: 'Visit History',
          type: MENU_TYPES.VISIT_HISTORY,
          permission: SCREENS.VISIT_HISTORY
        },
        {
          name: 'TeleHealth',
          icon: videoconference,
          title: 'Video Conference',
          type: MENU_TYPES.VIDEO_CONFERENCE,
          permission: SCREENS.TELEHEALTH
        },
        {
          name: 'Payments',
          icon: payments,
          title: 'Payments',
          type: MENU_TYPES.PAYMENT,
          permission: SCREENS.PAYMENT_PROCESSING
        },
        {
          name: 'Settings',
          icon: settings,
          title: 'Settings',
          type: MENU_TYPES.SETTINGS
        },
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

export const USER_TYPES = {
    PATIENT: 'I',
    GUARDIAN: 'G',
    SERVICE_PROVIDER: 'S',
    INDIVIDUAL_GUARDIAN: 'IG',
    CARE_TEAM: 'CT',
    EU: "EU"
}
export const UPDATE_CONNECTIVITY = "UPDATE_CONNECTIVITY";
export const DEFAULT_SELECTED_FILTER_STATE = {
  selectedServiceCategories: {},
  minExp: null,
  maxExp: null,
  rating: 0,
  minRate: null,
  maxRate: null,
  selectedSkills: {},
  selectedGender: "",
  otherLocation: {
      street: null,
      city: null,
      zip: null,
      state: null
  },
  selectedAddressId: null
}

export const PERMISSIONS = {
  CREATE: 'Create',
  READ: 'Read',
  UPDATE: 'Update',
  DELETE: 'Delete'
}

export const USERS = {
  SELF: 'Self',
  SERVICE_PROVIDER: 'Service Provider',
  CARETEAM: 'CareTeam'
};



export const ImageFormats = {
  JPG: 'image/jpg',
  JPEG: 'image/jpeg',
  PNG: 'image/png',
  GIF: 'image/gif'
}

export const ELIBILITY_STATUS = {
  "authorizationRequired": "Coverage Copay Authorization Required",
  "amount": "Coverage Copayment Amount",
  "benefitPercent": "Coverage Coinsurance Benefit Percentage",
  "coInAuthorizationRequired": "Coverage Coinsurance Authorization Required",
  "active": "Coverage Active"
 }

 export const ELIBILITY_STATUS_TAG = {
  "amount": "$",
  "benefitPercent": "%",
  "authorizationRequired": "",
  "coInAuthorizationRequired": "",
  "active": ""
 }

 export const EMPTY_ELIGBILITY = "No eligibility found. If you choose to proceed with the service, the entire visit cost will be charged to your credit card."

export const BLOCKED_STATUS_ID = [
41,
42,
47,
106,
107
]
export const RECCURING_ONE_TIME = "One Time"

export const SELECTED_STATUS = {"0": 0, "35": 35, "38": 38, "42": 42, "47": 47, "107": 107, "106": 106}

export const APPROVAL_STATUS = {
  APPROVED: 91,
  DECLINED: 92,
  NEEDING_APPROVAL: 93
}

export const SELF_ID = 1
export const CARE_TEAM_ID = 12
export const SERVICE_PROVIDER_RELATIONSHIP_ID = 2

export const BLOCED_RELATION_SHIPS = [
SELF_ID,
CARE_TEAM_ID,
SERVICE_PROVIDER_RELATIONSHIP_ID
]

export const NO_STATE = 0

export const NO_GENDER_PREFERENCE = 8
export const NO_PREFERENCE_TEXT = "All"
export const NO_PREFERENCE_ALIAS = "Not disclosed"

export const RECURRING_PATTERN = [
  {
    id: '31',
    name: 'One Time'
  },
  {
    id: '32',
    name: 'Recurring'
  }
]

export const OFFLINE_SCREENS = {
  ABOUT_US: 'AboutUs',
  START_VIDEO_CONFERENCE: 'StartVideoConferenceScreen',
  VISIT_HISTORY: 'VisitHistory',
  CONVERSATION_SUMMARY: 'ConversationSummary',
  CONNECTIONS: 'ManageConnection',
  PAYMENTS: 'Payment',
  SETTINGS: 'NotificationSettingsScreen',
  REQUEST_SCREEN: 'requestscreen',
  HELP: "Help",
  SERVICEPROVIDER_SCREEN: 'serviceProviderScreen'

}
export const VIDEO_CONFERENCE = 'Video Conference'
export const ABOUT_US_TITLE = 'About Us'
export const VISIT_HISTORY = 'Visit History'
export const CONVERSATION_SUMMARY = 'Conversation Summary'
export const MY_CONNECTIONS = 'My Connections'
export const PAYMENTS_TITLE = 'Payment'
export const NOTIFICATION_SETTINGS = 'Notification Settings'
export const SERVICE_REQUESTS = 'Service Requests'
export const SERVICE_PROVIDERS = 'Service Providers'
export const SUPPORT = 'Support'

export const CURRENT_DATE = "CURRENT_DATE"
export const PAST_DATE = "PAST_DATE"
export const FUTURE_DATE = "FUTURE_DATE"
export const PAST_DATE_2 = "PAST_DATE_2"
export const FUTURE_DATE_2 = "FUTURE_DATE_2"
export const FIRST_FETCH = 'FIRST_FETCH'

export const INDIVIDUAL_LABELS = {
  IN_TOTAL_IN_THE_PERIOD: "In Total In The Period",
  WITH_NO_INVALID_CREDIT_CARD: "With No/Invalid Credit Cards",
  WITH_VISITS_IN_THE_PERIOD: "With Visits In The Period",
  WITH_FEEDBACK_ALERTS: "With Feedback Alerts"

}
export const LOW_RATING = "LowRating"
export const FEEDBACK_ALERTS = "FeedbackAlerts"

export const TASK_PERCENTAGE = "TASK_PERCENTAGE"
export const RATING = "Rating"

export const MAX_PROFILE_PIC_SIZE_IN_MB = 2

export const CARETEAM_SERVICE_REQUESTS = {
  CANCELLED_IN_THE_PERIOD: "cancelled in the period",
  WITH_OPEN_STATUS: "with open status",
  NEEDING_APPROVAL: "needing approval"
}

export const CARETEAM_SERVICE_PROVIDERS = {
  IN_TOTAL_IN_THE_NETWORK: "In Total In The Population",
  WITH_LOW_RATINGS: "With Low Ratings",
  WITH_FEEDBACK_ALERTS: "With Feedback Alerts"
}

export const CARETEAM_SERVICE_VISITS = {
  IN_TOTAL_IN_THE_NETWORK: "in total in the network",
  CANCELLED_IN_THE_PERIOD: "cancelled in the period",
  WITH_LOW_TASK_COMPLETION: "with low task completion",
  OVERDUE_IN_THE_PERIOD: "overdue in the period"
}

export const MINIMUM_EXPERIENCE = 5
export const MAXIMUM_EXPERIENCE = 20
export const ENTITY_SERVICE_PROVIDER = "EntityServiceProvider"
export const MAXIMUM_AGE = 120
export const ENTITY = "Entity"
export const MAXIMUM_RATE = 50


export const LOW_TASK = "LowTask"
export const CANCEL = "Cancel"
export const ALL_TEXT = "All"
export const OVERDUE = "Overdue"

export const SORT_ORDER = {
  ASC: "asc",
  DESC: "desc"
}

export const DESC = "desc"
export const ASC = "asc"
export const MODIFIEDDATE = "ModifiedDate"
export const WEEKLY_ID = 17
export const DEFAULT_TIME_DURATION = "00:00:00"
export const PLATFORM = {
  ANDROID: "android",
  IOS: "ios"
}
export const DEFAULT_PAGE_NUMBER = 1
export const DEFAULT_PAGE_SIZE = 10

export const NO_RESULTS_FOUND = "No results found"
export const NO_ADDITIONAL_PARTICIPANTS_CONVERSATION = "No additional participants can be added to this conversation."
export const NO_ADDITIONAL_PARTICIPANTS_CONFERENCE = "No additional participants can be added to this conference." 

export const NEED_APPROVAL = "NeedApproval";

export const ALERT = "FEEDBACK_ALERT"
export const LAST_SYNCED_DATE = "LastSyncedDate"
export const SELECTED_CLINICAL_CONDITION = "SelectedClinicalCondition"
export const SELECTED_LANGUAGES = "SelectedLanguages"
export const  MANAGE_CONNECTION_TABLE_IDENTIFIER = "ManageConnection"
export const IMAGE_IDENTIFIER = "Image"
export const PERSONAL_DETAIL_IDENTIFIER = 'PersonalDetail'
export const POINT_SERVICE_IDENTIFIER = 'PointService'
export const INTRO_VIDEO_IDENTIFIER = 'VideoUrl'

export const TABLE_NAME = {
  LAST_SYNCED_DATE_TABLE: `LastSyncedDate.realm`,
  SELECTED_LANGUAGES_TABLE: `SelectedLanguages.realm`,
  SELECTED_CLINICAL_CONDITION_TABLE: `SelectedClinicalCondition.realm`,
  MANAGE_CONNECTION_TABLE: `ManageConnection.realm`,
  IMAGE_TABLE: `Image.realm`,
  PERSONAL_DETAIL_TABLE: `PersonalDetail.realm`,
  POINT_SERVICE_TABLE: `PointService.realm`,
  INTRO_VIDEO_TABLE: `VideoUrl.realm`
}

export const DEFAULT_VALUE = -1
export const DEFAULT_AUTO_LOGOUT_TIME = 3600000
export const BACKGROUND_SYNC_STARTED = "?errorMessage= 'PG Background Syncing Started: "
export const BACKGROUND_SYNC_FAILED = "?errorMessage= 'PG Background Syncing failed: "
export const BACKGROUND_SYNC_SUCCESS = "?errorMessage= 'PG Background Syncing success: "


export const DEFAULT_FROM_DATE = "1900-01-01"
export const DEFAULT_TO_DATE = "2100-01-01"
export const CANCELLED = 47


export const SERVICE_REQUEST_STATUS = {
  all: {
    id: 0,
    title: 'All'
  },
  open: {
    id: 35,
    title: 'Open'
  },
  invite: {
    id: 36,
    title: 'Invite'
  },
  applied: {
    id: 37,
    title: 'Applied'
  },
  hire: {
    id: 38,
    title: 'Hire'
  },
  notHired: {
    id: 39,
    title: 'Not Hired'
  },
  inProgress: {
    id: 40,
    title: 'InProgress'
  },
  completed: {
    id: 41,
    title: 'Completed'
  },
  closed: {
    id: 42,
    title: 'Closed'
  },
  cancelled: {
    id: 42,
    title: 'Cancelled'
  },
  notInterested: {
    id: 58,
    title: 'Not Interested'
  },
  pendingApproval: {
    id: 58,
    title: 'Pending Approval'
  },
  declined: {
    id: 107,
    title: 'Declined'
  },
  engaged: {
    id: 91,
    title: "Engaged"
  }
}
export const SERVICE_CATEGORY_IDS = {ACTIVITY_OF_DAILY_LIVING: 1}

export const GUIDELINES = {
  0: {
    id: 0,
    title: "Browse Providers",
    description: "Lipsum dolor sit amet, consectetuer adipiscing elit. sed diam nonummy. Lorem ipsum dolor sit amet.",
    key: "browseProvidersStage"
  },
  1: {
    key: "engageProviderStage",
    id: 1,
    title: "Engage Provider",
    description: "Lipsum dolor sit amet, consectetuer adipiscing elit. sed diam nonummy. Lorem ipsum dolor sit amet."
  },
  2: {
    key: "createRequestStage",
    id: 2,
    title: "Create Request",
    description: "Lipsum dolor sit amet, consectetuer adipiscing elit. sed diam nonummy. Lorem ipsum dolor sit amet."
  },
  3: {
    key: "visitScheduleStage",
    id: 3,
    title: "Visit(s) Schedules",
    description: "Lipsum dolor sit amet, consectetuer adipiscing elit. sed diam nonummy. Lorem ipsum dolor sit amet."
  },
  4: {
    key: "submitFeedbackStage",
    id: 4,
    title: "Submit Feedback",
    description: "Lipsum dolor sit amet, consectetuer adipiscing elit. sed diam nonummy. Lorem ipsum dolor sit amet."
  }
}
export const SERVICE_VISIT_STATUS = {
  "assesmentVisitStatus": 114,
  "schedule":115
}

export const DEFAULT_DATES = {
  fromDate: "1900-01-01",
  toDate: "2100-01-01"
}

export const SLOT_FORMAT = {
  MORNING: "morning",
  AFTERNOON: "afternoon",
  EVENING: "evening"
}


export const IPAD = "pad"

export const DEFAULT_VISIT_DATE = "0001-01-01"
export const DEFAULT_DAILY_ID = 17
export const DEFAULT_WEEKLY_ID = 18

