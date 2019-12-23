export let onboardingState = [{
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
        createPatientSuccess: true,
        dob: null,
        getPlansError: false,
        getPlansSuccess: true,
        lastName: "Tylore",
        memberId: "2830284",
        patientProfiles: [{
            dob: "Feb 2 1992",
            employerName: null,
            firstName: "Sarah",
            gender: "Female",
            id: "2830284",
            lastName: "Tylore",
            memberId: "2830284",
            mpi: "2830284",
            selected: true
        }],
        planId: 2,
        plans: [
            { planId: 2, planType: "Commercial" },
            { planId: 1, planType: "Medicaid" },
            { planId: 3, planType: "Medicare" },
            { planId: 4, planType: "Not in List" }
        ],
        profileData: {
            dob: "Feb 2 1992",
            firstName: "Sarah",
            firstname: "",
            gender: "Female",
            lastName: "Tylore",
            lastname: "",
            memberId: "2830284",
            mpi: "2830284",
            relationShipId: 3
        },
        searchMembersError: false,
        searchMembersSuccess: true
    },
    personalDetailsState: { firstName: "karthick", lastName: "babu", contactNumber: "999-999-9999" },
    profileTypeState: { profileType: "Guardian", selectedRelationId: 3, selectedRelationValue: "Father" },
    setPasswordState: {
        emailId: "karthik@mailinator.com",
        getEmailIdError: false,
        getEmailIdSuccess: true,
        patientId: 0,
        setPasswordError: false,
        setPasswordStatus: "Valid",
        setPasswordSuccess: true,
        token: "5490B228-9311-41F5-87B6-B57BAF4A81D6",
        userId: 375
    },
    setUserIdState: { sendVerificationLinkSuccess: false, sendVerificationLinkError: false, isLoadingUserId: 0 },
    welcomeState: { isLoading: "", uid: "SFBPZTFQWCt1TG1ZQWpCNXdIVzZlelVVSE95cFJFVHl4VWJZT01RTitZST0", tokenkey: "5490B228-9311-41F5-87B6-B57BAF4A81D6", profiletype: "guardian" }
},
{
    addGuardianState: {
        firstName: "",
        isInvitationSent: true,
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
        createPatientSuccess: true,
        dob: null,
        getPlansError: false,
        getPlansSuccess: true,
        lastName: "Tylore",
        memberId: "2830284",
        patientProfiles: [{
            dob: "Feb 2 1992",
            employerName: null,
            firstName: "Sarah",
            gender: "Female",
            id: "2830284",
            lastName: "Tylore",
            memberId: "2830284",
            mpi: "2830284",
            selected: true
        }],
        planId: 2,
        plans: [
            { planId: 2, planType: "Commercial" },
            { planId: 1, planType: "Medicaid" },
            { planId: 3, planType: "Medicare" },
            { planId: 4, planType: "Not in List" }
        ],
        profileData: {
            dob: "Feb 2 1992",
            firstName: "Sarah",
            firstname: "",
            gender: "Female",
            lastName: "Tylore",
            lastname: "",
            memberId: "2830284",
            mpi: "2830284",
            relationShipId: 3
        },
        searchMembersError: false,
        searchMembersSuccess: true
    },
    personalDetailsState: { firstName: "karthick", lastName: "babu", contactNumber: "999-999-9999" },
    profileTypeState: { profileType: "Individual", selectedRelationId: 3, selectedRelationValue: "Father" },
    setPasswordState: {
        emailId: "karthik@mailinator.com",
        getEmailIdError: false,
        getEmailIdSuccess: true,
        patientId: 0,
        setPasswordError: false,
        setPasswordStatus: "Valid",
        setPasswordSuccess: true,
        token: "5490B228-9311-41F5-87B6-B57BAF4A81D6",
        userId: 375
    },
    setUserIdState: { sendVerificationLinkSuccess: false, sendVerificationLinkError: false, isLoadingUserId: 0 },
    welcomeState: { isLoading: "", uid: "SFBPZTFQWCt1TG1ZQWpCNXdIVzZlelVVSE95cFJFVHl4VWJZT01RTitZST0", tokenkey: "5490B228-9311-41F5-87B6-B57BAF4A81D6", profiletype: "guardian" }
}]
