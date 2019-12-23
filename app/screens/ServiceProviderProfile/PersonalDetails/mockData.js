export let impersonateProfileState = {
    AvailabilityState: {
        availableDays: {
            serviceProviderId: 28,
            days: [
                {
                    dayId: 24,
                    dayName: "Monday",
                    slots: [
                        { availabilityId: 259, slotId: 21, slotName: "Morning", isActive: true },
                        { availabilityId: 260, slotId: 22, slotName: "Afternoon", isActive: true },
                        { availabilityId: 261, slotId: 23, slotName: "Evening", isActive: true }
                    ]
                },
                {
                    dayId: 25,
                    dayName: "Tuesday",
                    slots: [
                        { availabilityId: 574, slotId: 21, slotName: "Morning", isActive: true },
                        { availabilityId: 575, slotId: 22, slotName: "Afternoon", isActive: true },
                        { availabilityId: 576, slotId: 23, slotName: "Evening", isActive: true }
                    ]
                },
                {
                    dayId: 26,
                    dayName: "Wednesday",
                    slots: [
                        { availabilityId: 577, slotId: 21, slotName: "Morning", isActive: true },
                        { availabilityId: 578, slotId: 22, slotName: "Afternoon", isActive: true },
                        { availabilityId: 579, slotId: 23, slotName: "Evening", isActive: true }
                    ]
                },
                {
                    dayId: 27,
                    dayName: "Thursday",
                    slots: [
                        { availabilityId: 580, slotId: 21, slotName: "Morning", isActive: true },
                        { availabilityId: 581, slotId: 22, slotName: "Afternoon", isActive: true },
                        { availabilityId: 582, slotId: 23, slotName: "Evening", isActive: true }
                    ]
                },
                {
                    dayId: 28,
                    dayName: "Friday",
                    slots: [
                        { availabilityId: 583, slotId: 21, slotName: "Morning", isActive: true },
                        { availabilityId: 584, slotId: 22, slotName: "Afternoon", isActive: true },
                        { availabilityId: 585, slotId: 23, slotName: "Evening", isActive: true }
                    ]
                },
                {
                    dayId: 29, dayName: "Saturday", slots: [
                        { availabilityId: 586, slotId: 21, slotName: "Morning", isActive: true },
                        { availabilityId: 587, slotId: 22, slotName: "Afternoon", isActive: true },
                        { availabilityId: 588, slotId: 23, slotName: "Evening", isActive: true }
                    ]
                },
                {
                    dayId: 30,
                    dayName: "Sunday",
                    slots: [
                        { availabilityId: 589, slotId: 21, slotName: "Morning", isActive: true },
                        { availabilityId: 590, slotId: 22, slotName: "Afternoon", isActive: true },
                        { availabilityId: 591, slotId: 23, slotName: "Evening", isActive: true }
                    ]
                }
            ]
        },
        blackoutDays: { serviceProviderId: 28, blockOutDates: [] },
        getAvailabilityStatus: 200
    },
    CertificationState: {
        certificationList: [
            {
                authority: "kle",
                certificationExternalId: 0,
                certificationId: 116,
                certificationName: "kle",
                isActive: true,
                licenceNumber: "hmsa1221",
                rowversionId: "AAAAAABdaTc=",
                serviceProviderId: 28
            },
            {
                authority: "Oxford",
                certificationExternalId: 0,
                certificationId: 97,
                certificationName: "Cambridgeeee",
                isActive: true,
                licenceNumber: "Hmsa122",
                rowversionId: "AAAAAABZ3q4=",
                serviceProviderId: 28
            }
        ], getCertificationStatus: 200
    },
    EducationState: {
        educationList: [{
            degree: "kle",
            educationExternalId: 0,
            educationId: 204,
            endYear: "1935",
            fieldOfStudy: "kle",
            isActive: true,
            rowversionId: "AAAAAABdabo=",
            school: "kle",
            serviceProviderId: 28,
            startYear: "1920"
        },
        {
            degree: "MBBS",
            educationExternalId: 0,
            educationId: 22,
            endYear: "2010",
            fieldOfStudy: "Medication",
            isActive: true,
            rowversionId: "AAAAAAAAPJ4=",
            school: "American Caregiver Association",
            serviceProviderId: 28,
            startYear: "2009"
        }],
        getEducationStatus: 200
    },
    LanguagesState: {
        selectedLanguagesList: [
            { id: 10, name: "French" },
            { id: 8, name: "Hawaiian" },
            { id: 1, name: "English" }
        ], getLanguageStatus: 200
    },
    PersonalDetailState: {
        getImageStatus: 200,
        getPersonalDetailStatus: 200,
        imageData: {
            image: "data:image/jpeg;base64,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",
            imageByte: null,
            serviceProviderId: 28,
            thumbnailImage: "data:image/jpeg;base64,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",
            thumbnailImageByte: null
        },
        personalDetail: {
            address: [
                {
                    addressExternalId: null,
                    addressId: 427,
                    addressTypeId: 2,
                    city: "Los Angeles",
                    coverageArea: 500,
                    isActive: true,
                    lat: 34.05438,
                    lon: -118.267281,
                    rowversionId: null,
                    serviceProviderId: 0,
                    state: { id: 5, name: "California" },
                    stateId: 0,
                    streetAddress: "3141  Doctors Drive",
                    zipCode: 90017
                },
                {
                    addressExternalId: null,
                    addressId: 425,
                    addressTypeId: 2,
                    city: "Honolulu",
                    coverageArea: 500,
                    isActive: true,
                    lat: 21.331,
                    lon: -157.699051,
                    rowversionId: null,
                    serviceProviderId: 0,
                    state: { id: 11, name: "Hawaii" },
                    stateId: 0,
                    streetAddress: "41-209 Ilauhole St",
                    zipCode: 96795
                },
                {
                    addressExternalId: null,
                    addressId: 424,
                    addressTypeId: 2,
                    city: "Honolulu",
                    coverageArea: 500,
                    isActive: true,
                    lat: 21.331,
                    lon: -157.699051,
                    rowversionId: null,
                    serviceProviderId: 0,
                    state: { id: 11, name: "Hawaii" },
                    stateId: 0,
                    streetAddress: "41-209 Ilauhole St",
                    zipCode: 96795
                }
            ],
            affiliationId: 1,
            affiliationName: "AABB",
            age: "66",
            categoryId: 0,
            description: "Provides services related to Ambulation",
            entity: null,
            entityName: null,
            firstName: "Roy",
            genderId: 6,
            genderName: "Male",
            hourlyRate: 999.99,
            isActive: false,
            lastName: "Snyder",
            middleName: null,
            organization: null,
            phoneNumber: "8979797979",
            profileType: "Organization",
            rating: 3.3,
            serviceProviderId: 28,
            serviceProviderType: "Individual",
            serviceProviderTypeId: 1,
            standByMode: false,
            url: null,
            yearOfExperience: 19
        }
    },
    PointServiceState: {
        PointServiceFieldDetails: [],
        PointServiceList: [
            {
                addressExternalId: 0,
                addressId: 147,
                addressTypeId: 0,
                city: "New gfbfb",
                coverageArea: 600,
                isActive: true,
                lat: 10,
                lon: 10,
                rowversionId: "AAAAAAByx10=",
                serviceProviderId: 28,
                stateId: 32,
                stateName: "New York",
                streetAddress: "bdbfgnfgfg",
                zipCode: 10604
            },
            {
                addressExternalId: 0,
                addressId: 361,
                addressTypeId: 0,
                city: "St. Louisj",
                coverageArea: 678,
                isActive: true,
                lat: 38.64175,
                lon: -90.50381,
                rowversionId: "AAAAAABy5Tw=",
                serviceProviderId: 28,
                stateId: 25,
                stateName: "Missouri",
                streetAddress: "510 Maryville University",
                zipCode: 63141
            },
            {
                addressExternalId: 0,
                addressId: 412,
                addressTypeId: 0,
                city: "Fort worth",
                coverageArea: 523,
                isActive: true,
                lat: 32.89232,
                lon: -97.44302,
                rowversionId: "AAAAAAByx1E=",
                serviceProviderId: 28,
                stateId: 43,
                stateName: "Texas",
                streetAddress: "9100 Westwood shores",
                zipCode: 76179
            },
            {
                addressExternalId: 0,
                addressId: 437,
                addressTypeId: 0,
                city: "St. Louis",
                coverageArea: 12,
                isActive: true,
                lat: 30.64347,
                lon: -90.50768,
                rowversionId: "AAAAAABy13A=",
                serviceProviderId: 28,
                stateId: 2,
                stateName: "Alaska",
                streetAddress: "555 Maryville University",
                zipCode: 23424
            },
            {
                addressExternalId: 0,
                addressId: 438,
                addressTypeId: 0,
                city: "Reedsburg",
                coverageArea: 60,
                isActive: true,
                lat: 43.5531,
                lon: -89.98648,
                rowversionId: "AAAAAABy5TY=",
                serviceProviderId: 28,
                stateId: 49,
                stateName: "Wisconsin",
                streetAddress: "2240 Sunset Dr",
                zipCode: 53959
            },
            {
                addressExternalId: 0,
                addressId: 439,
                addressTypeId: 0,
                city: "Reedsburg",
                coverageArea: 60,
                isActive: true,
                lat: 0,
                lon: 0,
                rowversionId: "AAAAAABy5Tg=",
                serviceProviderId: 28,
                stateId: 49,
                stateName: "Wisconsin",
                streetAddress: "2240 Sunset Dr",
                zipCode: 53959
            },
            {
                addressExternalId: 0,
                addressId: 440,
                addressTypeId: 0,
                city: "Reedsburg",
                coverageArea: 60,
                isActive: true,
                lat: 33.09713,
                lon: -117.0636,
                rowversionId: "AAAAAABy5To=",
                serviceProviderId: 28,
                stateId: 49,
                stateName: "Wisconsin",
                streetAddress: "2240 Sunset Dr",
                zipCode: 53959
            }
        ],
        addPointServiceSuccess: false,
        addingPointService: 0,
        isLoading: 200
    },
    SkillsState: {
        selectedSkillsList: [
            { id: 5, name: "Depression" },
            { id: 7, name: "General Transportation" },
            { id: 8, name: "Hearing Disorder" },
            { id: 9, name: "Home Health Care" },
            { id: 11, name: "House Keeping" }
        ],
        getSkillStatus: 200
    },
    WorkHistoryState: {
        workhistoryList: [
            {
                company: "Kle",
                currentlyWorking: true,
                description: "",
                designation: "Kle",
                fromDate: "04-15-2010",
                isActive: true,
                isWorking: false,
                location: "Kle",
                rowversionId: "AAAAAABdaUQ=",
                serviceProviderId: 28,
                toDate: "01-01-1900",
                workHistoryExternalId: 0,
                workHistoryId: 112
            },
            {
                company: "cvb",
                currentlyWorking: false,
                description: "",
                designation: "sfv",
                fromDate: "05-06-2019",
                isActive: true,
                isWorking: false,
                location: "fcb",
                rowversionId: "AAAAAABdtWY=",
                serviceProviderId: 28,
                toDate: "05-07-2019",
                workHistoryExternalId: 0,
                workHistoryId: 117
            },
            {
                company: "Yuy",
                currentlyWorking: false,
                description: null,
                designation: "Uiu",
                fromDate: "05-08-2014",
                isActive: true,
                isWorking: false,
                location: "Gug",
                rowversionId: "AAAAAABd6ms=",
                serviceProviderId: 28,
                toDate: "05-08-2018",
                workHistoryExternalId: 0,
                workHistoryId: 118
            },
            {
                company: "kle",
                currentlyWorking: false,
                description: "",
                designation: "kle",
                fromDate: "05-29-2012",
                isActive: true,
                isWorking: false,
                location: "kle",
                rowversionId: "AAAAAABdaUI=",
                serviceProviderId: 28,
                toDate: "05-10-2016",
                workHistoryExternalId: 0,
                workHistoryId: 115
            }
        ],
        getWorkHistoryStatus: 200
    },
    progressIndicatorState: { profilePercentage: 100, getProfilePercentageStatus: 200 },
    serviceOfferedState: {
        serviceOfferedList: [{
            serviceCategoryDescription: "Activities of Daily Living",
            serviceCategoryId: 1,
            serviceTypeCount: 5,
            serviceTypeModel: [
                { serviceTypeId: 1, serviceTypeDescription: "Ambulation and Mobility", isActive: true },
                { serviceTypeId: 2, serviceTypeDescription: "Bathing", isActive: true },
                { serviceTypeId: 3, serviceTypeDescription: "Continence", isActive: true },
                { serviceTypeId: 5, serviceTypeDescription: "Getting Dressed", isActive: true },
                { serviceTypeId: 6, serviceTypeDescription: "Toileting", isActive: true }
            ]
        },
        {
            serviceCategoryDescription: "Help at Home",
            serviceCategoryId: 2,
            serviceTypeCount: 5,
            serviceTypeModel: [
                { serviceTypeId: 8, serviceTypeDescription: "Companionship and Errands", isActive: true },
                { serviceTypeId: 9, serviceTypeDescription: "Food Prep", isActive: true },
                { serviceTypeId: 10, serviceTypeDescription: "House Keeping", isActive: true },
                { serviceTypeId: 11, serviceTypeDescription: "Laundry", isActive: true },
                { serviceTypeId: 12, serviceTypeDescription: "Shopping", isActive: true }
            ]
        },
        {
            serviceCategoryDescription: "Groceries and Nutrition",
            serviceCategoryId: 3,
            serviceTypeCount: 2,
            serviceTypeModel: [
                { serviceTypeId: 14, serviceTypeDescription: "Grocery Delivery", isActive: true },
                { serviceTypeId: 15, serviceTypeDescription: "Meal Delivery", isActive: true }
            ]
        },
        {
            serviceCategoryDescription: "Transportation",
            serviceCategoryId: 4,
            serviceTypeCount: 1,
            serviceTypeModel: [{ serviceTypeId: 16, serviceTypeDescription: "General Transportation", isActive: true }]
        }
        ],
        getServicesOfferedStatus: 200
    }
}

export let details = {
    address: [
        {
            addressExternalId: null,
            addressId: 400,
            addressTypeId: 2,
            city: "Hawaii",
            coverageArea: 500,
            isActive: true,
            lat: 21.3105125,
            lon: -157.810547,
            rowversionId: null,
            serviceProviderId: 0,
            state: { id: 3, name: "Arizona" },
            stateId: 0,
            streetAddress: "2728 Huapala St # 209",
            zipCode: 96822
        },
        {
            addressExternalId: null,
            addressId: 399,
            addressTypeId: 2,
            city: "Hawaii",
            coverageArea: 500,
            isActive: true,
            lat: 21.3105125,
            lon: -157.810547,
            rowversionId: null,
            serviceProviderId: 0,
            state: { id: 11, name: "Hawaii" },
            stateId: 0,
            streetAddress: "2728 Huapala St # 209",
            zipCode: 96822
        },
        {
            addressExternalId: null,
            addressId: 398,
            addressTypeId: 2,
            city: "Hawaii",
            coverageArea: 500,
            isActive: true,
            lat: 21.3105125,
            lon: -157.810547,
            rowversionId: null,
            serviceProviderId: 0,
            state: { id: 11, name: "Hawaii" },
            stateId: 0,
            streetAddress: "2728 Huapala St # 209",
            zipCode: 96822
        },
        {
            addressExternalId: null,
            addressId: 397,
            addressTypeId: 2,
            city: "Hawaii",
            coverageArea: 500,
            isActive: true,
            lat: 21.3105125,
            lon: -157.810547,
            rowversionId: null,
            serviceProviderId: 0,
            state: { id: 11, name: "Hawaii" },
            stateId: 0,
            streetAddress: "2728 Huapala St # 209",
            zipCode: 96822
        },
        {
            addressExternalId: null,
            addressId: 235,
            addressTypeId: 2,
            city: "Hawaii",
            coverageArea: 500,
            isActive: true,
            lat: 21.3105125,
            lon: -157.810547,
            rowversionId: null,
            serviceProviderId: 0,
            state: { id: 11, name: "Hawaii" },
            stateId: 0,
            streetAddress: "2728 Huapala St # 209",
            zipCode: 96822
        },
        {
            addressExternalId: null,
            addressId: 121,
            addressTypeId: 2,
            city: "Hawaii",
            coverageArea: 500,
            isActive: true,
            lat: 21.3105125,
            lon: -157.810547,
            rowversionId: null,
            serviceProviderId: 0,
            state: { id: 11, name: "Hawaii" },
            stateId: 0,
            streetAddress: "2728 Huapala St # 209",
            zipCode: 96822
        },
        {
            addressExternalId: null,
            addressId: 31,
            addressTypeId: 2,
            city: "Hawaii",
            coverageArea: 500,
            isActive: true,
            lat: 21.3105125,
            lon: -157.810547,
            rowversionId: null,
            serviceProviderId: 0,
            state: { id: 11, name: "Hawaii" },
            stateId: 0,
            streetAddress: "2728 Huapala St # 209",
            zipCode: 96822
        }
    ],
    affiliationId: 1,
    affiliationName: "AABB",
    age: "23",
    categoryId: 11,
    description: "Meals on Wheels",
    entity: {
        assignedBy: "Food Basket",
        autoInvite: null,
        createDate: "0001-01-01T00:00:00",
        email: null,
        entityExternalId: 0,
        entityId: 11,
        invitesCount: 0,
        isActive: false,
        logo: null,
        logoByte: null,
        modeOfInvite: 0,
        modifiedDate: "0001-01-01T00:00:00",
        name: null,
        organization: null,
        phoneNumber: "7867844699",
        shortDescription: null,
        websiteUrl: "www.foodbasket.com",
        yearsOfExperience: 0
    },
    entityName: null,
    firstName: "Kyle",
    genderId: 6,
    genderName: "Male",
    hourlyRate: 333.33,
    isActive: false,
    lastName: "Edwards",
    middleName: null,
    organization: null,
    phoneNumber: "7867844699",
    profileType: "Organization",
    rating: 3.6,
    serviceProviderId: 13,
    serviceProviderType: "EntityServiceProvider",
    serviceProviderTypeId: 1,
    standByMode: false,
    url: "www.foodbasket.com",
    yearOfExperience: 18
}

export let profilePicDetailsData = {
    details: {

        address: [
            {
                addressExternalId: null,
                addressId: 400,
                addressTypeId: 2,
                city: "Hawaii",
                coverageArea: 500,
                isActive: true,
                lat: 21.3105125,
                lon: -157.810547,
                rowversionId: null,
                serviceProviderId: 0,
                state: { id: 3, name: "Arizona" },
                stateId: 0,
                streetAddress: "2728 Huapala St # 209",
                zipCode: 96822
            },
            {
                addressExternalId: null,
                addressId: 399,
                addressTypeId: 2,
                city: "Hawaii",
                coverageArea: 500,
                isActive: true,
                lat: 21.3105125,
                lon: -157.810547,
                rowversionId: null,
                serviceProviderId: 0,
                state: { id: 11, name: "Hawaii" },
                stateId: 0,
                streetAddress: "2728 Huapala St # 209",
                zipCode: 96822
            },
            {
                addressExternalId: null,
                addressId: 398,
                addressTypeId: 2,
                city: "Hawaii",
                coverageArea: 500,
                isActive: true,
                lat: 21.3105125,
                lon: -157.810547,
                rowversionId: null,
                serviceProviderId: 0,
                state: { id: 11, name: "Hawaii" },
                stateId: 0,
                streetAddress: "2728 Huapala St # 209",
                zipCode: 96822
            },
            {
                addressExternalId: null,
                addressId: 397,
                addressTypeId: 2,
                city: "Hawaii",
                coverageArea: 500,
                isActive: true,
                lat: 21.3105125,
                lon: -157.810547,
                rowversionId: null,
                serviceProviderId: 0,
                state: { id: 11, name: "Hawaii" },
                stateId: 0,
                streetAddress: "2728 Huapala St # 209",
                zipCode: 96822
            },
            {
                addressExternalId: null,
                addressId: 235,
                addressTypeId: 2,
                city: "Hawaii",
                coverageArea: 500,
                isActive: true,
                lat: 21.3105125,
                lon: -157.810547,
                rowversionId: null,
                serviceProviderId: 0,
                state: { id: 11, name: "Hawaii" },
                stateId: 0,
                streetAddress: "2728 Huapala St # 209",
                zipCode: 96822
            },
            {
                addressExternalId: null,
                addressId: 121,
                addressTypeId: 2,
                city: "Hawaii",
                coverageArea: 500,
                isActive: true,
                lat: 21.3105125,
                lon: -157.810547,
                rowversionId: null,
                serviceProviderId: 0,
                state: { id: 11, name: "Hawaii" },
                stateId: 0,
                streetAddress: "2728 Huapala St # 209",
                zipCode: 96822
            },
            {
                addressExternalId: null,
                addressId: 31,
                addressTypeId: 2,
                city: "Hawaii",
                coverageArea: 500,
                isActive: true,
                lat: 21.3105125,
                lon: -157.810547,
                rowversionId: null,
                serviceProviderId: 0,
                state: { id: 11, name: "Hawaii" },
                stateId: 0,
                streetAddress: "2728 Huapala St # 209",
                zipCode: 96822
            }
        ],
        affiliationId: 1,
        affiliationName: "AABB",
        age: "23",
        categoryId: 11,
        description: "Meals on Wheels",
        entity: {
            assignedBy: "Food Basket",
            autoInvite: null,
            createDate: "0001-01-01T00:00:00",
            email: null,
            entityExternalId: 0,
            entityId: 11,
            invitesCount: 0,
            isActive: false,
            logo: null,
            logoByte: null,
            modeOfInvite: 0,
            modifiedDate: "0001-01-01T00:00:00",
            name: null,
            organization: null,
            phoneNumber: "7867844699",
            shortDescription: null,
            websiteUrl: "www.foodbasket.com",
            yearsOfExperience: 0
        },
        entityName: null,
        firstName: "Kyle",
        genderId: 6,
        genderName: "Male",
        hourlyRate: 333.33,
        isActive: false,
        lastName: "Edwards",
        middleName: null,
        organization: null,
        phoneNumber: "7867844699",
        profileType: "Organization",
        rating: 3.6,
        serviceProviderId: 13,
        serviceProviderType: "EntityServiceProvider",
        serviceProviderTypeId: 1,
        standByMode: false,
        url: "www.foodbasket.com",
        yearOfExperience: 18
    },
    isEntityServiceProvider: true,
    isEntityUser: false,
    percentage: 100,
    profilePic: { uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…EMmFBKwDxkwpP6SYcMKO/Z6EQozgAwPUJVKhnjke0KSQ/E//Z" }
}