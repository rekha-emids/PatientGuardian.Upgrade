const Realm = require('realm'),
 SpPersonalDetail = {
    name: 'SpPersonalDetail',
    primaryKey: 'serviceProviderId',
    properties: {
        serviceProviderId: 'int?',
        serviceProviderTypeId: 'int?',
        firstName: 'string?',
        middleName: 'string?',
        lastName: 'string?',
        age: 'string?',
        genderId: 'int?',
        genderName: 'string?',
        affiliationName: 'string?',
        categoryId: 'int?',
        affiliationId: 'int?',
        yearOfExperience: 'int?',
        description: 'string?',
        hourlyRate: 'int?',
        address: 'Address[]',
        isActive: 'bool?',
        phoneNumber: 'string?',
        rating: 'int?',
        organization: 'string?',
        entity: 'Entity?',
        serviceProviderType: 'string?',
        standByMode: 'bool?',
        entityName: 'string?',
        url: 'string?'
    }
},

 Address = {
    name: 'Address',
    properties: {
        addressId: 'int?', 
        serviceProviderId: 'int?', 
        addressTypeId: 'int?', 
        streetAddress: 'string?',
        city: 'string?',
        state: 'State',
        zipCode: 'int?', 
        isActive: 'bool?',
        rowversionId: 'string?',
        coverageArea: 'int?', 
        lat: 'int?', 
        lon: 'int?', 
        addressExternalId: 'string?',
        stateId: 'int?'
    }
    
},

 State = {
    name: 'State',
    properties: {
        id: 'int?', 
        name: 'string?'
    }
},

 Entity = {
    name: 'Entity',
    properties: {
        entityExternalId: 'int?',
        entityId: 'string?',
        name: 'string?',
        email: 'string?',
        phoneNumber: 'string?',
        websiteUrl: 'string?',
        logoByte: 'string?',
        logo: 'string?',
        shortDescription: 'string?',
        isActive: 'bool?',
        autoInvite: 'string?',
        modeOfInvite: 'int?',
        invitesCount: 'int?',
        createDate: 'string?',
        modifiedDate: 'string?',
        yearsOfExperience: 'int?',
        organization: 'string?',
        assignedBy: 'string?'
    }
}


export function storeSpPersonalData(personalDetailsObj) {
    __DEV__ && console.log("STORE ENITTY IS: ", personalDetailsObj.entity)

    return Realm.open({
 path: `SpPersonalDetail.realm`, schema: [
SpPersonalDetail,
Address,
State,
Entity
] 
})
        .then((realm) => {
            let spId = personalDetailsObj.serviceProviderId,
             dbPersonalDetailsObj = realm.objectForPrimaryKey('SpPersonalDetail', spId);

    return Realm.open({ path: `SpPersonalDetail.realm`, schema: [SpPersonalDetail, Address, State, Entity] })
        .then((realm) => {
            let spId = personalDetailsObj.serviceProviderId
            let dbPersonalDetailsObj = realm.objectForPrimaryKey('SpPersonalDetail', spId);

            __DEV__ && console.log("SpPersonalDetail: ", personalDetailsObj, " ENITTY IS: ", personalDetailsObj.entity)
            __DEV__ && console.log("dbPersonalDetailsObj is: ", dbPersonalDetailsObj)
            realm.write(() => {
                if (dbPersonalDetailsObj) {
                    dbPersonalDetailsObj.serviceProviderTypeId = personalDetailsObj.serviceProviderTypeId,
                    dbPersonalDetailsObj.firstName = personalDetailsObj.firstName,
                    dbPersonalDetailsObj.middleName = personalDetailsObj.middleName,
                    dbPersonalDetailsObj.lastName = personalDetailsObj.lastName,
                    dbPersonalDetailsObj.age = personalDetailsObj.age,
                    dbPersonalDetailsObj.genderId = personalDetailsObj.genderId,
                    dbPersonalDetailsObj.genderName = personalDetailsObj.genderName,
                    dbPersonalDetailsObj.affiliationName = personalDetailsObj.affiliationName,
                    dbPersonalDetailsObj.categoryId = personalDetailsObj.categoryId,
                    dbPersonalDetailsObj.affiliationId = personalDetailsObj.affiliationId,
                    dbPersonalDetailsObj.yearOfExperience = personalDetailsObj.yearOfExperience,
                    dbPersonalDetailsObj.description = personalDetailsObj.description,
                    dbPersonalDetailsObj.hourlyRate = personalDetailsObj.hourlyRate,
                    dbPersonalDetailsObj.address = personalDetailsObj.address,
                    dbPersonalDetailsObj.isActive = personalDetailsObj.isActive,
                    dbPersonalDetailsObj.phoneNumber = personalDetailsObj.phoneNumber,
                    dbPersonalDetailsObj.rating = personalDetailsObj.rating,
                    dbPersonalDetailsObj.organization = personalDetailsObj.organization,
                    dbPersonalDetailsObj.entity =  personalDetailsObj.entity || {},
                    dbPersonalDetailsObj.serviceProviderType = personalDetailsObj.serviceProviderType,
                    dbPersonalDetailsObj.standByMode = personalDetailsObj.standByMode,
                    dbPersonalDetailsObj.entityName = personalDetailsObj.entityName,
                    dbPersonalDetailsObj.url = personalDetailsObj.url
                    __DEV__ && console.log("dbPersonalDetailsObj if: ", dbPersonalDetailsObj)
                } else {
                    realm.create('SpPersonalDetail', {
                        serviceProviderId: personalDetailsObj.serviceProviderId,
                        serviceProviderTypeId: personalDetailsObj.serviceProviderTypeId,
                        firstName: personalDetailsObj.firstName,
                        middleName: personalDetailsObj.middleName,
                        lastName: personalDetailsObj.lastName,
                        age: personalDetailsObj.age,
                        genderId: personalDetailsObj.genderId,
                        genderName: personalDetailsObj.genderName,
                        affiliationName: personalDetailsObj.affiliationName,
                        categoryId: personalDetailsObj.categoryId,
                        affiliationId: personalDetailsObj.affiliationId,
                        yearOfExperience: personalDetailsObj.yearOfExperience,
                        description: personalDetailsObj.description,
                        hourlyRate: personalDetailsObj.hourlyRate,
                        address: personalDetailsObj.address,
                        isActive: personalDetailsObj.isActive,
                        phoneNumber: personalDetailsObj.phoneNumber,
                        rating: personalDetailsObj.rating,
                        organization: personalDetailsObj.organization,
                        entity: personalDetailsObj.entity || {},
                        serviceProviderType: personalDetailsObj.serviceProviderType,
                        standByMode: personalDetailsObj.standByMode,
                        entityName: personalDetailsObj.entityName,
                        url: personalDetailsObj.url
                    })

                }
            });
            return dbPersonalDetailsObj;
        })
.catch((err) => {
            __DEV__ && console.log("CATCH BLOCK: ", personalDetailsObj.entity)
            __DEV__ && console.log("err is: ", err)
            throw err;
        })
})
}

export function getOfflineSpPersonalData(id) {
    __DEV__ && console.log("id in SPpersonaldetail: ", id)
    let realmPromise = Realm.open({
 path: `SpPersonalDetail.realm`, schema: [
SpPersonalDetail,
Address,
State,
Entity
] 
})
        .then((realm) => {
            let data = realm.objectForPrimaryKey('SpPersonalDetail', id);

            __DEV__ && console.log("getOfflineSpPersonalData is: ", data)
            return data ? data : {};
        })
        .catch((err) => {
            throw err;
        })

    return realmPromise;
}

export function clearOfflineSpPersonalDetails(){
    Realm.open({
path: `SpPersonalDetail.realm`, schema: [
SpPersonalDetail,
Address,
State,
Entity
] 
})
        .then((realm) => {
            realm.write(() => {
                let obj = realm.objects('SpPersonalDetail');

                realm.delete(obj); // Deletes all percentage
              });
        })
.catch((err) => {
            throw err;
        })
}