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
        getPlansSuccess: false,
        isLoadingMemberDetails: 200,
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
    personalDetailsForMCState: { firstName: "", lastName: "", contactNumber: "" },
    profileTypeSelectionState: { profileType: "", selectedRelationId: null, selectedRelationValue: null },
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