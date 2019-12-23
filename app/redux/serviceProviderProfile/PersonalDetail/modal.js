// import _ from 'lodash'
// import PersonalDetailsFormConstants from '../../../screens/EditProfile/EditPersonalDetails/FormConstants'
// import OrganizationDetailsFormConstants from '../../../screens/EditProfile/EditOrganziationDetails/FormConstants'
export const PERSONAL_DETAIL = {
    UpdatePersonalDetails: 'update_personal_details',
    UpdateOrganizationalDetails: 'update_organizational_details'
}

// export const getModal = (data, action) => {
//     let organization = _.split(data[PersonalDetailsFormConstants.AFFLIATION_NAME], '-')
//     switch (action) {
//         case PERSONAL_DETAIL.UpdatePersonalDetails:           
//             return {
//                 serviceProviderId: data.serviceProviderId,
//                 serviceProviderTypeId: data.serviceProviderTypeId,
//                 individual: {
//                     firstName: data[PersonalDetailsFormConstants.FIRST_NAME],
//                     middleName: data[PersonalDetailsFormConstants.LAST_NAME],
//                     lastName: data[PersonalDetailsFormConstants.LAST_NAME],
//                     age: data[PersonalDetailsFormConstants.AGE] || 0,
//                     gender: {
//                         name: data.gender ? data.gender.name : "",
//                         genderId: data.gender ? data.gender.id : 8
//                     },
//                     yearOfExperience: data[PersonalDetailsFormConstants.EXPERIANCE] || 0,
//                     affiliation: {
//                         affiliationId: organization && organization[0] ? organization[0] : "3"
//                     }
//                 },
//                 entity: {
//                     organization: organization && organization[1] ? organization[1] : "AOM"
//                 },
//                 description: data[PersonalDetailsFormConstants.DESCRIPTION],
//                 hourlyRate: data[PersonalDetailsFormConstants.HOURLY_RATE] || 0,
//                 addresses: [
//                     {
//                         addressId: 1,
//                         serviceProviderId: data.serviceProviderId,
//                         addressTypeId: 2,
//                         streetAddress: data[PersonalDetailsFormConstants.STREET],
//                         city: data[PersonalDetailsFormConstants.CITY],
//                         state: data[PersonalDetailsFormConstants.STATE],
//                         zipCode: data[PersonalDetailsFormConstants.ZIP_CODE] || 0,
//                         isActive: true
//                     }
//                 ],
//                 phoneNumber: data[PersonalDetailsFormConstants.PHONE],
//                 isActive: true
//             }
//         case PERSONAL_DETAIL.UpdateOrganizationalDetails:
//             return {
//                 serviceProviderId: data.serviceProviderId,
//                 serviceProviderTypeId: data.serviceProviderTypeId,
//                 individual: {
//                     firstName: '',
//                     middleName: '',
//                     lastName: "",
//                     age: 0,
//                     gender: null,
//                     yearOfExperience: 0,
//                     affiliation: {
//                         affiliationId: organization && organization[0] ? organization[0] : "3"
//                     }
//                 },
//                 entity: {
//                     organization: organization && organization[1] ? organization[1] : "AOM"
//                 },
//                 description: data[OrganizationDetailsFormConstants.DESCRIPTION],
//                 hourlyRate: data[OrganizationDetailsFormConstants.HOURLY_RATE],
//                 addresses: [
//                     {
//                         addressId: 1,
//                         serviceProviderId: data.serviceProviderId,
//                         addressTypeId: 2,
//                         streetAddress: data[OrganizationDetailsFormConstants.STREET],
//                         city: data[OrganizationDetailsFormConstants.CITY],
//                         state: data[OrganizationDetailsFormConstants.STATE],
//                         zipCode: data[OrganizationDetailsFormConstants.ZIP_CODE] || 0,
//                         isActive: true
//                     }
//                 ],
//                 phoneNumber: data[OrganizationDetailsFormConstants.PHONE],
//                 isActive: true
//             }
//         default:
//             return {}
//     }
// }