import { getServiceRequestId } from '../../utils/appUtils';

const Realm = require('realm'),

 VisitDetailsArr = {
    name: 'VisitDetailsArr',
    properties: {
        age: 'int?',
        approvalStatus: 'string?',
        authorizationRequired: 'bool?',
        dataCount: 'int?',
        date: 'string?',
        day: 'string?',
        dayOfWeek: 'int?',
        endDate: 'string?',
        experience: 'int?',
        favourite: 'int?',
        gender: 'string?',
        genderPreference: 'int?',
        hiredDate: 'string?',
        hourlyRate: 'int?',
        image: 'string?',
        isActive: 'bool?',
        isRecurring: 'bool?',
        maximumServiceProviderExperience: 'int?',
        minimumServiceProviderExperience: 'int?',
        numberOfApplicants: 'int?',
        occurence: 'int?',
        patient: 'Patient',
        patientAddress: 'string?',
        patientAddressId: 'int?',
        patientFirstName: 'string?',
        patientId: 'int?',
        patientImage: 'string?',
        patientLastName: 'string?',
        paymentApproach: 'int?',
        phoneNumber: 'string?',
        postedDate: 'string?',
        providerFirstName: 'string?',
        providerLastName: 'string?',
        providerThumbnail: 'string?',
        providerThumbnailByte: 'string?',
        rating: 'int?',
        recurringPattern: 'int?',
        recurringPatternDescription: 'string?',
        requestDate: 'string?',
        scheduleType: 'string?',
        serviceCategoryDescription: 'string?',
        serviceCategoryId: 'int?',
        serviceProvider: 'ServiceProvider',
        serviceProviderId: 'int?',
        serviceProviderImage: 'string?',
        serviceRequestDescription: 'string?',
        serviceRequestId: 'int?',
        serviceRequestNumber: 'string?',
        serviceRequestSlot: 'ServiceRequestSlot[]',
        serviceRequestStatus: 'string?',
        serviceRequestTypeDetails: 'ServiceRequestTypeDetails[]',
        serviceTaskDescription: 'string?',
        serviceTaskId: 'int?',
        serviceType: 'string?',
        serviceTypeDescription: 'string?',
        serviceTypeId: 'int?',
        serviceTypes: 'string?',
        skills: 'string?',
        slotDescription: 'string?',
        slotId: 'int?',
        specialCareConsideration: 'string?',
        startDate: 'string?',
        status: 'string?',
        statusId: 'int?',
        statusName: 'string?',
        thumbnail: 'string?',
        types: 'string?',
        visitInProgress: 'bool?'

    }
},
 VisitServiceDetail = {
    name: 'VisitServiceDetail',
    primaryKey: 'serviceRequestId',
    properties: {
        serviceRequestId: 'int?',
        visitDetailsArr: 'VisitDetailsArr?'
        // visitServiceDetail: 'string?[]'



    }
},

 ServiceRequestSlot = {
    name: 'ServiceRequestSlot',
    properties: {
        day: 'string?',
        dayOfWeek: 'int?',
        isActive: 'bool?',
        rowversionId: 'string?',
        serviceRequestId: 'int?',
        serviceRequestSlotId: 'int?',
        slotDescription: 'string?',
        slotId: 'int?'
    }
},

 ServiceRequestTypeDetails = {
    name: 'ServiceRequestTypeDetails',
    properties: {
        serviceRequestId: 'int?',
        serviceRequestTypeDetailsId: 'int?',
        serviceRequestTypeTaskDetails: 'ServiceRequestTypeTaskDetails[]',
        serviceTypeDescription: 'string?',
        serviceTypeId: 'int?'
    }
},

 ServiceRequestTypeTaskDetails = {
    name: 'ServiceRequestTypeTaskDetails',
    properties: {
        serviceRequestTypeDetailsId: 'int?',
        serviceRequestTypeTaskDetailsId: 'int?',
        serviceTaskDescription: 'string?',
        serviceTaskId: 'int?'
    }
},

 ServiceProvider = {
    name: 'ServiceProvider',
    properties: {
        age: 'int?',
        categoryDescription: 'string?',
        categoryId: 'int?',
        firstName: 'string?',
        hourlyRate: 'int?',
        image: 'string?',
        imageArray: 'string?',
        isEntityServiceProvider: 'bool?',
        isEntityUser: 'bool?',
        isFavourite: 'bool?',
        isHired: 'bool?',
        lastName: 'string?',
        phoneNumber: 'string?',
        rating: 'int?',
        serviceProviderAddress: 'ServiceProviderAddress[]',
        serviceProviderId: 'int?',
        serviceProviderTypeId: 'int?',
        serviceTypeDescription: 'string?',
        serviceTypeId: 'int?',
        types: 'string?',
        yearOfExperience: 'int?'
    }
},

 ServiceProviderAddress = {
    name: 'ServiceProviderAddress',
    properties: {
        city: 'string?',
        serviceProviderAddressId: 'int?',
        serviceProviderId: 'int?',
        stateName: 'string?',
        streetAddress: 'string?',
        zipCode: 'string?'
    }
},

 Patient = {
    name: 'Patient',
    properties: {
        firstName: 'string?',
        image: 'string?',
        imageString: 'string?',
        lastName: 'string?',
        mpi: 'string?',
        patientAddresses: 'PatientAddress[]',
        patientId: 'int?',
        phoneNumber: 'string?'
    }
},
 PatientAddress = {
    name: 'PatientAddress',
    properties: {
        addressId: 'int?',
        addressTypeId: 'string?',
        city: 'string?',
        isActive: 'bool?',
        isPrimaryAddress: 'bool?',
        lat: 'int?',
        lon: 'int?',
        patientAddressId: 'int?',
        patientId: 'int?',
        state: 'string?',
        stateId: 'int?',
        stateName: 'string?',
        street: 'string?',
        streetAddress: 'string?',
        zip: 'int?',
        zipCode: 'string?'
    }
}

export function storeVisitServiceDetailData(visitServiceDetailData) {
    return Realm.open({
 path: `VisitServiceDetail.realm`, schema: [
VisitServiceDetail,
VisitDetailsArr,
ServiceRequestSlot,
Patient,
PatientAddress,
ServiceProviderAddress,
ServiceProvider,
ServiceRequestTypeTaskDetails,
ServiceRequestTypeDetails
] 
})
        .then((realm) => {
            let serviceReqId = getServiceRequestId(visitServiceDetailData),
             visitServiceDetailObj = realm.objectForPrimaryKey('VisitServiceDetail', serviceReqId);

            if (!visitServiceDetailObj) {
                realm.write(() => {
                    let newVisitServiceDetailObj = realm.create('VisitServiceDetail', {
                        serviceRequestId: serviceReqId,
                        visitDetailsArr: visitServiceDetailData
                    })
                })
            }
            return visitServiceDetailObj;
        }).catch((err) => {
            throw err;
        })

}

export function getOfflineVisitServiceDetailData(serviceReqId) {
    let realmPromise = Realm.open({
 path: `VisitServiceDetail.realm`, schema: [
VisitServiceDetail,
VisitDetailsArr,
ServiceRequestSlot,
Patient,
PatientAddress,
ServiceProviderAddress,
ServiceProvider,
ServiceRequestTypeTaskDetails,
ServiceRequestTypeDetails
] 
})
        .then((realm) => {

            let data = realm.objectForPrimaryKey('VisitServiceDetail', serviceReqId);

            return data ? data.visitDetailsArr : {}
        })
        .catch((err) => {
            throw err;
        })

    return realmPromise;
}

export function clearOfflineVisitServiceDetailData() {
    Realm.open({
 path: `VisitServiceDetail.realm`, schema: [
VisitServiceDetail,
VisitDetailsArr,
ServiceRequestSlot,
Patient,
PatientAddress,
ServiceProviderAddress,
ServiceProvider,
ServiceRequestTypeTaskDetails,
ServiceRequestTypeDetails
] 
})
        .then((realm) => {
            realm.write(() => {
                let obj = realm.objects('VisitServiceDetail'),
                 deletedObj = realm.delete(obj); // Deletes all books
            });
        })
.catch((err) => {
 throw err; 
})
}