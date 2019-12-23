const Realm = require('realm'),
 PatientVisitDetail = {
    name: 'PatientVisitDetail',
    primaryKey: 'date',
    properties: {
        // patientVisitDetail: 'string'
        date: 'int?',
        visits: 'string?'

    }
},

 Visits = {
    name: 'Visits',
    properties: {
        patientId: 'int?',
        serviceProvider: 'ServiceProvider',
        serviceRequestId: 'int?',
        serviceRequestVisitId: 'int?',
        servicecategories: 'Servicecategories[]?',
        slot: 'string?',
        visitDate: 'string?'
    }
},

 Servicecategories = {
    name: 'ServiceCategories',
    properties: {
        categoryId: 'int?',
        serviceCategoryDescription: 'string?',
        serviceType: 'ServiceType[]'
    }
},

 ServiceType = {
    name: 'ServiceType',
    properties: {
        isActive: 'bool?',
        serviceTypeDescription: 'string?',
        serviceTypeId: 'int?'
    }
},
 ServiceProvider = {
    name: 'ServiceProvider',
    properties: {
        age: 'int?',
        entityProviderFirstName: 'string?',
        entityProviderId: 'int?',
        entityProviderImage: 'string?',
        entityProviderLastName: 'string?',
        firstName: 'string?',
        gender: 'string?',
        hourlyRate: 'int?',
        image: 'string?',
        imageByte: 'string?',
        isEntityUser: 'bool?',
        isFavorite: 'bool?',
        isHired: 'bool?',
        lastName: 'string?',
        middleName: 'string?',
        organization: 'string?',
        phoneNumber: 'string?',
        rating: 'int?',
        serviceCategory: 'string?',
        serviceProviderId: 'int?',
        serviceTypeDescription: 'string?',
        serviceTypeId: 'int?',
        serviceTypes: 'string?',
        thumbnail: 'string?',
        thumbnailByte: 'string?',
        yearOfExperience: 'int?'
    }
}

export function storePatientVisitDetailData(patientVisitDetail, visitDate) {
    return Realm.open({ path: `PatientVisitDetail.realm`, schema: [PatientVisitDetail] })
        .then((realm) => {
            let patientVisitDetailObj = realm.objectForPrimaryKey('PatientVisitDetail', visitDate);

            realm.write(() => {
                if (!patientVisitDetailObj) {
                    let newPatientVisitDetailsObj = realm.create('PatientVisitDetail', {
                        date: visitDate,
                        visits: JSON.stringify(patientVisitDetail)
                    })

                    __DEV__ && console.log("newPatientVisitDetailsObj off: ", newPatientVisitDetailsObj)
                } else {
                    patientVisitDetailObj.visits = JSON.stringify(patientVisitDetail)
                }
                __DEV__ && console.log("patientVisitDetailObj off: ", patientVisitDetailObj)
            });
            return patientVisitDetailObj;
        })
.catch((err) => {
            __DEV__ && console.log("err in visit: ", err)
            throw err;
        })

}

export function getOfflinePatientVisitDetail(visitDate) {
    let realmPromise = Realm.open({ path: `PatientVisitDetail.realm`, schema: [PatientVisitDetail] })
        .then((realm) => {
            let retrievedVisitDetail = realm.objectForPrimaryKey('PatientVisitDetail', visitDate);

            return retrievedVisitDetail ? JSON.parse(retrievedVisitDetail.visits) : []
        })
        .catch((err) => {
            throw err;
        })

    return realmPromise;
}

export function clearOfflinePatientVisitDetail() {
    Realm.open({ path: `PatientVisitDetail.realm`, schema: [PatientVisitDetail] })
        .then((realm) => {
            realm.write(() => {
                let obj = realm.objects('PatientVisitDetail'),
                 deletedObj = realm.delete(obj); // Deletes all books
            });
        })
.catch((err) => {
throw err
})
}