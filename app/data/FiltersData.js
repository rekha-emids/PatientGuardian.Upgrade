import { SERVICE_STATES } from "../constants/constants";

const CATEGORIES = "CATEGORIES"
const SERVICE_PROVIDERS = "SERVICE_PROVIDERS"
const ATTRIBUTE_PROVIDERS = "ATTRIBUTE_PROVIDERS"
const SERVICE_AREA = "SERVICE_AREA"
const STATUS = "STATUS"
const RECURRING = "RECURRING"
const NEEDING_APPROVAL = "NEEDING_APPROVAL"
const DATE_RANGE = "DATE_RANGE"
const POINT_OF_SERVICE = "POINT_OF_SERVICE"
const HOURLY_RATE = "HOURLY-RATE"
const SKILLS = "SKILLS"
const GENDER = "GENDER"
const EXPERIENCE = "EXPERIENCE"
const RATING = "RATING"
const PREFERRED = "PREFERRED"
const CONTRACT = "CONTRACT"
const RISK_GROUP = "RISK_GROUP"
const COHORT = "COHORT"
const CLINICAL_CONDITIONS = "CLINICAL_CONDITIONS"
const AGE_RANGE = "AGE_RANGE"
const LOCATION = "LOCATION"
const SERVICE_STATUS = "SERVICE_STATUS"
const VISIT_STATUS = "VISIT_STATUS"

export const Keys = {
    DATE_RANGE,
    STATUS,
    SERVICE_PROVIDERS,
    POINT_OF_SERVICE,
    HOURLY_RATE,
    SKILLS,
    GENDER,
    EXPERIENCE,
    RATING,
    CATEGORIES,
    CONTRACT,
    COHORT,
    CLINICAL_CONDITIONS,
    AGE_RANGE,
    LOCATION,
    SERVICE_STATUS,
    ATTRIBUTE_PROVIDERS,
    RECURRING,
    NEEDING_APPROVAL,
    PREFERRED,
    VISIT_STATUS,
    RISK_GROUP
}

export const ServiceProvidersFiltersData = [
    {
        id: 1,
        name: `Categories \n & Types`,
        key: CATEGORIES
    },
    // {
    //     id: 3,
    //     name: "Hourly Rate",
    //     key: HOURLY_RATE
    // },
    {
        id: 4,
        name: "Skills",
        key: SKILLS
    },
    {
        id: 5,
        name: "Gender",
        key: GENDER
    },
    {
        id: 6,
        name: "Rating",
        key: RATING
    }

]

export const ServiceRequestFiltersData = [
    {
        id: 1,
        name: `Categories \n & Types`,
        key: CATEGORIES
    },
    {
        id: 3,
        name: `Request \n Status`,
        key: STATUS
    },
    {
        id: 4,
        name: `One Time / \n Recurring`,
        key: RECURRING
    }
]

export const ServiceRequestFiltersWithApprovalData = [
    {
        id: 1,
        name: `Categories \n& Types`,
        key: CATEGORIES
    },
    {
        id: 2,
        name: `One Time \nRecurring`,
        key: RECURRING
    },
    {
        id: 3,
        name: `Approval \nStatus`,
        key: NEEDING_APPROVAL
    }
]

export const ServiceRequestFiltersWithoutStatusData = [
    {
        id: 1,
        name: `Categories \n & Types`,
        key: CATEGORIES
    },
    {
        id: 4,
        name: `One Time \n Recurring`,
        key: RECURRING
    }
]

export const ServiceVisitFiltersData = [
    {
        id: 1,
        name: `Categories \n & Types`,
        key: CATEGORIES
    },
    // {
    //     id: 2,
    //     name: "Service Areas",
    //     key: LOCATION
    // },
    {
        id: 2,
        name: `Visit Status`,
        key: SERVICE_STATUS
    }
]

export const ServiceVisitFiltersDataWithoutStatus = [
    {
        id: 1,
        name: `Categories \n & Types`,
        key: CATEGORIES
    }
]

export const IndividualFilters = [
    {
        id: 1,
        name: "Contracts",
        key: CONTRACT
    },
    {
        id: 2,
        name: "Risk Group",
        key: RISK_GROUP
    },
    // {
    //     id: 3,
    //     name: "Cohorts",
    //     key: COHORT
    // },
    {
        id: 3,
        name: `Attribute \n Providers`,
        key: ATTRIBUTE_PROVIDERS
    },
    {
        id: 4,
        name: "Clinical Conditions",
        key: CLINICAL_CONDITIONS
    },
    {
        id: 5,
        name: "Age",
        key: AGE_RANGE
    },
    {
        id: 6,
        name: "Gender",
        key: GENDER
    }
]

export const VisitHistoryFilters = [
    {
        id: 0,
        name: `Service \nProviders`,
        key: SERVICE_PROVIDERS
    },
    {
        id: 1,
        name: "Date Range",
        key: DATE_RANGE
    },
    {
        id: 2,
        name: `Service \nCategories`,
        key: CATEGORIES
    }
]
export const Filters = [
    {
        id: 0,
        name: "Date Range",
        key: DATE_RANGE
    },
    {
        id: 1,
        name: `Status`,
        key: STATUS
    }
]
export const ServiceProvidersData = [
    {
        id: 1,
        name: "Something",
        pic: ""
    },
    {
        id: 2,
        name: "Something",
        pic: ""
    },
    {
        id: 3,
        name: "Something",
        pic: ""
    },
    {
        id: 4,
        name: "Something",
        pic: ""
    },
    {
        id: 5,
        name: "Something",
        pic: ""
    },
    {
        id: 6,
        name: "Something",
        pic: ""
    },
    {
        id: 7,
        name: "Something",
        pic: ""
    },
    {
        id: 8,
        name: "Something",
        pic: ""
    },
    {
        id: 9,
        name: "Something",
        pic: ""
    }
]

export const ServiceStatus = [
    {
        id: 0,
        status: true,
        statusTitle: "All"
    },
    {
        id: 43,
        status: true,
        statusTitle: "Completed"
    },
    {
        id: 44,
        status: true,
        statusTitle: "Not Started"
    },
    {
        id: 45,
        status: true,
        statusTitle: "Overdue"
    },
    {
        id: 46,
        status: true,
        statusTitle: "Cancelled"
    }
]

export const ServiceStatusNew = [
   {
    id: 43,
    status: false,
    statusTitle: "Scheduled"
   },

    {
        id: 45,
        status: false,
        statusTitle: "Completed"
    },
    {
        id: 46,
        status: false,
        statusTitle: "Cancelled"
    },
   
    {
        id: 61,
        status: false,
        statusTitle: "Overdue"
    },

    {
        id: 90,
        status: false,
        statusTitle: "Payment Pending"
    }
    
]

export const PreferredData = [
    {
        id: "isFavourite",
        status: false,
        statusTitle: "Favorite"
    },
    {
        id: "isRecent",
        status: false,
        statusTitle: "Recent"
    }
]

export const NeedingApprovalData = [
    {
        id: 91,
        status: false,
        statusTitle: "Approved"
    },
    {
        id: 92,
        status: false,
        statusTitle: "Declined"
    },
    {
        id: 93,
        status: true,
        statusTitle: "Needing Approval"
    }
]

export const StatusData = [
    {
        id: 0,
        status: true,
        statusTitle: "All"
    },
    {
        id: 35,
        status: true,
        statusTitle: "Open"
    },
    {
        id: 38,
        status: true,
        statusTitle: "Engaged"
    },
    {
        id: 42,
        status: true,
        statusTitle: "Closed"
    },
    {
        id: 47,
        status: true,
        statusTitle: "Cancelled"
    },
    {
        id: 106,
        status: true,
        statusTitle: "Pending Approval"
    },
    {
        id: 107,
        status: true,
        statusTitle: "Declined"
    }

]

export const CareTeamStatusData = [
    {
        id: 35,
        status: true,
        statusTitle: "Open"
    },
    {
        id: 38,
        status: true,
        statusTitle: "Engaged"
    },
    {
        id: 42,
        status: true,
        statusTitle: "Closed"
    },
    {
        id: 47,
        status: true,
        statusTitle: "Cancelled"
    },
    {
        id: 106,
        status: true,
        statusTitle: "Pending Approval"
    },
    {
        id: 107,
        status: true,
        statusTitle: "Declined"
    },

]

export const RequestsFilter = [
    {
        id: 1,
        name: `Categories \n & Types`,
        key: CATEGORIES
    },
    {
        id: 2,
        name: `Point of\nService`,
        key: POINT_OF_SERVICE
    },
    // {
    //     id: 3,
    //     name: `Hourly Rate`,
    //     key: HOURLY_RATE
    // },
    {
        id: 4,
        name: "Skills",
        key: SKILLS
    },
    {
        id: 5,
        name: "Gender",
        key: GENDER
    },
    {
        id: 6,
        name: "Rating",
        key: RATING
    },
    {
        id: 7,
        name: "Preferred",
        key: PREFERRED
    }
]

export const MyPlanFiltersDataForEsp = [
    {
        id: 1,
        name: "Date Range",
        key: DATE_RANGE
    },
    {
        id: 2,
        name: `Categories &\n Types`,
        key: CATEGORIES
    },
    {
        id: 3,
        name: `Visit Status`,
        key: VISIT_STATUS
    }
]
export const MyPlanFiltersDataForSP = [
    {
        id: 1,
        name: "Date Range",
        key: DATE_RANGE
    },
    {
        id: 3,
        name: `Visit Status`,
        key: VISIT_STATUS
    }
]
export const VisitStatus = [
    {
        id: SERVICE_STATES.YET_TO_START,
        status: false,
        statusTitle: "Scheduled"
    },
    {
        id: SERVICE_STATES.IN_PROGRESS,
        status: false,
        statusTitle: "In Progress"
    },
    {
        id: SERVICE_STATES.COMPLETED,
        status: false,
        statusTitle: "Completed"
    },
    {
        id: SERVICE_STATES.PAYMENT_PENDING,
        status: false,
        statusTitle: "Payment Pending"
    },
    {
        id: SERVICE_STATES.CANCELLED,
        status: false,
        statusTitle: "Cancelled"
    }
]
