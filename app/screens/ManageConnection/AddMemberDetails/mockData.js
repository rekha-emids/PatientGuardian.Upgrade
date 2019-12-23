export let manageConnectionState = {
    addGuardianDetailsState: {

        firstName: "",
        isInvitationSent: false,
        isInvitationSentError: false,
        isLoadingAddGuardian: 200,
        lastName: "",
        relationship: [
            { id: 1, name: "Self" },
            { id: 2, name: "Service Provider" },
            { id: 3, name: "Father" },
            { id: 4, name: "Spouse" },
            { id: 5, name: "Mother" },
            { id: 6, name: "Friend" },
            { id: 7, name: "Grandparent" },
            { id: 8, name: "In-Law" },
            { id: 11, name: "Others" },
            { id: 12, name: "CareTeam" },
            { id: 13, name: "Child" }
        ]

    },
    manageConnectionDataState: {
        connections: [],
        impersonatedManageConnections: {},
        isLoadingManageConnection: 200,
        manageConnection: [
            {
                coreoHomeUserId: 355,
                firstName: "Lori",
                image: "",
                imageArray: null,
                lastName: "Miss",
                name: "Spouse",
                patientId: 1022,
                userType: "G"
            },
            {
                coreoHomeUserId: 363,
                firstName: "lori",
                image: "",
                imageArray: null,
                lastName: "vill",
                name: "Spouse",
                patientId: 1022,
                userType: "G"
            }
        ]
    },
    memberDetailsForMCState: {
        createPatientError: false,
        createPatientSuccess: false,
        dob: null,
        getPlansError: false,
        getPlansSuccess: true,
        isLoadingMemberDetails: 200,
        lastName: "",
        memberId: ""
    },
    personalDetailsForMCState: { firstName: "", lastName: "", contactNumber: "" },
    profileTypeSelectionState: { profileType: "Guardian", selectedRelationId: 3, selectedRelationValue: "Father" },
    setPasswordForMCState: {
        emailId: "",
        getEmailIdError: false,
        getEmailIdSuccess: false,
        isLoadingSetpassword: 0,
        patientId: null,
        setPasswordError: false,
        setPasswordStatus: "",
        setPasswordSuccess: false,
        token: "",
        userId: null
    }
}

export let onboardingState = {
    addGuardianState: {

        firstName: "",
        isInvitationSent: false,
        isInvitationSentError: false,
        isLoading: 200,
        lastName: "",
        relationship: [
            { id: 1, name: "Self", label: "Self", value: 1 },
            { id: 3, name: "Father", label: "Father", value: 3 },
            { id: 4, name: "Spouse", label: "Spouse", value: 4 },
            { id: 5, name: "Mother", label: "Mother", value: 5 },
            { id: 6, name: "Friend", label: "Friend", value: 6 },
            { id: 7, name: "Grandparent", label: "Grandparent", value: 7 },
            { id: 8, name: "In-Law", label: "In-Law", value: 8 },
            { id: 11, name: "Others", label: "Others", value: 11 },
            { id: 13, name: "Child", label: "Child", value: 13 }
        ]

    },
    memberDetailsState: {
        createPatientError: false,
        createPatientSuccess: false,
        dob: null,
        getPlansError: false,
        getPlansSuccess: false,
        lastName: "",
        memberId: "",
        patientProfiles: [],
        planId: null,
        plans: [],
        profileData: {
            dob: "",
            firstname: "",
            gender: "",
            lastname: "",
            memberId: "",
            mpi: ""
        },
        searchMembersError: false,
        searchMembersSuccess: false
    },
    personalDetailsState: { firstName: "", lastName: "", contactNumber: "" },
    profileTypeState: { profileType: "", selectedRelationId: null, selectedRelationValue: null },
    setPasswordState: {
        emailId: "",
        getEmailIdError: false,
        getEmailIdSuccess: false,
        patientId: null,
        setPasswordError: false,
        setPasswordStatus: "",
        setPasswordSuccess: false,
        token: "",
        userId: null
    },
    setUserIdState: { sendVerificationLinkSuccess: false, sendVerificationLinkError: false, isLoadingUserId: 0 },
    welcomeState: { isLoading: "" }
}
