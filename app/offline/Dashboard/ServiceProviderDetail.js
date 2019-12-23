const Realm = require('realm'),
 ServiceProviderDetail = {
    name: 'ServiceProviderDetail',
    primaryKey: 'serviceProviderId',
    properties: {
        serviceProviderId: 'int?',
        firstName: 'string?',
        middleName: 'string?',
        lastName: 'string?',
        yearOfExperience: 'int?',
        age: 'int?',
        image: 'string?',
        imageByte: 'string?',
        thumbnailByte: 'string?',
        organization: 'string?',
        phoneNumber: 'string?',
        hourlyRate: 'int?',
        serviceTypeDescription: 'string?',
        gender: 'string?',
        serviceTypes: 'string?[]',
        serviceCategory: 'string?',
        rating: 'int?',
        isFavourite: 'bool?',
        serviceTypeId: 'int?',
        entityProviderFirstName: 'string?',
        entityProviderLastName: 'string?',
        entityProviderImage: 'string?',
        entityProviderId: 'int?',
        isEntityUser: 'bool?',
        isHired: 'bool?'

    }
}

export function storeServiceProviderDetailData(serviceProviderDetails) {
    return Realm.open({ path: `PG_ServiceProviderDetail.realm`, schema: [ServiceProviderDetail] })
        .then((realm) => {
            let retrievedSPObj;

            if (serviceProviderDetails.length) {
                realm.write(() => {
                    serviceProviderDetails.map((serviceProviderDetail) => {
                        // console.log("serviceProviderDetail: ", serviceProviderDetail);
                        let {serviceProviderId} = serviceProviderDetail;

                         retrievedSPObj = realm.objectForPrimaryKey('ServiceProviderDetail', serviceProviderId);
                        // console.log("retrievedSPObj: ", retrievedSPObj)
                        if (!retrievedSPObj) {
                            let newServiceProviderDetailObj = realm.create('ServiceProviderDetail', {
                                serviceProviderId: serviceProviderDetail.serviceProviderId,
                                firstName: serviceProviderDetail.firstName,
                                middleName: serviceProviderDetail.middleName,
                                lastName: serviceProviderDetail.lastName,
                                yearOfExperience: serviceProviderDetail.yearOfExperience,
                                age: serviceProviderDetail.age,
                                image: serviceProviderDetail.image,
                                imageByte: serviceProviderDetail.imageByte,
                                thumbnailByte: serviceProviderDetail.thumbnailByte,
                                organization: serviceProviderDetail.organization,
                                phoneNumber: serviceProviderDetail.phoneNumber,
                                hourlyRate: serviceProviderDetail.hourlyRate,
                                serviceTypeDescription: serviceProviderDetail.serviceTypeDescription,
                                gender: serviceProviderDetail.gender,
                                serviceTypes: serviceProviderDetail.serviceTypes,
                                serviceCategory: serviceProviderDetail.serviceCategory,
                                rating: serviceProviderDetail.rating,
                                isFavourite: serviceProviderDetail.isFavourite,
                                serviceTypeId: serviceProviderDetail.serviceTypeId,
                                entityProviderFirstName: serviceProviderDetail.entityProviderFirstName,
                                entityProviderLastName: serviceProviderDetail.entityProviderLastName,
                                entityProviderImage: serviceProviderDetail.entityProviderImage,
                                entityProviderId: serviceProviderDetail.entityProviderId,
                                isEntityUser: serviceProviderDetail.isEntityUser,
                                isHired: serviceProviderDetail.isHired
                            })
                        } else {
                                retrievedSPObj.firstName = serviceProviderDetail.firstName,
                                retrievedSPObj.middleName = serviceProviderDetail.middleName,
                                retrievedSPObj.lastName = serviceProviderDetail.lastName,
                                retrievedSPObj.yearOfExperience = serviceProviderDetail.yearOfExperience,
                                retrievedSPObj.age = serviceProviderDetail.age,
                                retrievedSPObj.image = serviceProviderDetail.image,
                                retrievedSPObj.imageByte = serviceProviderDetail.imageByte,
                                retrievedSPObj.thumbnailByte = serviceProviderDetail.thumbnailByte,
                                retrievedSPObj.organization = serviceProviderDetail.organization,
                                retrievedSPObj.phoneNumber = serviceProviderDetail.phoneNumber,
                                retrievedSPObj.hourlyRate = serviceProviderDetail.hourlyRate,
                                retrievedSPObj.serviceTypeDescription = serviceProviderDetail.serviceTypeDescription,
                                retrievedSPObj.gender = serviceProviderDetail.gender,
                                retrievedSPObj.serviceTypes = serviceProviderDetail.serviceTypes,
                                retrievedSPObj.serviceCategory = serviceProviderDetail.serviceCategory,
                                retrievedSPObj.rating = serviceProviderDetail.rating,
                                retrievedSPObj.isFavourite = serviceProviderDetail.isFavourite,
                                retrievedSPObj.serviceTypeId = serviceProviderDetail.serviceTypeId,
                                retrievedSPObj.entityProviderFirstName = serviceProviderDetail.entityProviderFirstName,
                                retrievedSPObj.entityProviderLastName = serviceProviderDetail.entityProviderLastName,
                                retrievedSPObj.entityProviderImage = serviceProviderDetail.entityProviderImage,
                                retrievedSPObj.entityProviderId = serviceProviderDetail.entityProviderId,
                                retrievedSPObj.isEntityUser = serviceProviderDetail.isEntityUser,
                                retrievedSPObj.isHired = serviceProviderDetail.isHired

                        }
                    })
                })
            }
            return retrievedSPObj;
        })
.catch((err) => {
        })
}

export function getOfflineServiceProviderDetail() {
    let realmPromise = Realm.open({ path: `PG_ServiceProviderDetail.realm`, schema: [ServiceProviderDetail] })
        .then((realm) => {
            let data = realm.objects('ServiceProviderDetail');

            return data;
        })
        .catch((err) => {
            throw err;
        })

    return realmPromise;
}

export function clearOfflineServiceProviderDetail() {
    Realm.open({ path: `PG_ServiceProviderDetail.realm`, schema: [ServiceProviderDetail] })
        .then((realm) => {
            realm.write(() => {
                let obj = realm.objects('ServiceProviderDetail'),
                 deletedObj = realm.delete(obj); // Deletes all books
              });
        })
.catch((err) => {
throw err; 
})
}