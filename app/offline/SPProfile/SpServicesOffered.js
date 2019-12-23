

const Realm = require('realm'),
 spServicesOffered = {
    name: 'spServicesOffered',
    primaryKey: 'serviceProviderId',
    properties: {
        serviceProviderId: 'int?',
        servicesOffered: 'ServicesOfferedArr[]'
    }
},

 ServicesOfferedArr = {
    name: 'ServicesOfferedArr',
    properties: {
        serviceCategoryId: 'int?',
        serviceCategoryDescription: 'string?',
        serviceTypeCount: 'int?',
        serviceTypeModel: 'ServiceTypeModel[]'
    }
},

 ServiceTypeModel = {
    name: 'ServiceTypeModel',
    properties: {
        serviceTypeId: 'int?',
        serviceTypeDescription: 'string?',
        isActive: 'bool?'
    }
}


export function storeSpServicesOffered(spId, servicesOfferedObj) {
    return Realm.open({
 path: `spServicesOffered.realm`, schema: [
spServicesOffered,
ServicesOfferedArr,
ServiceTypeModel
] 
})
        .then((realm) => {
            let dbServicesOffered = realm.objectForPrimaryKey('spServicesOffered', spId);

            __DEV__ && console.log("storeSpServicesOffered: ", dbServicesOffered)
            realm.write(() => {
                if (dbServicesOffered) {
                    dbServicesOffered.servicesOffered = servicesOfferedObj
                } else {
                    let newDbServicesOffered = realm.create('spServicesOffered', {
                        serviceProviderId: spId,
                        servicesOffered: servicesOfferedObj
                    })

                    __DEV__ && console.log("newDbServicesOffered: ", newDbServicesOffered);
                }
            });
            return dbServicesOffered;
        })
.catch((err) => {
            __DEV__ && console.log("err is: ", err)
            throw err;
        })
}

export function getOfflineSpServicesOffered(id) {
    __DEV__ && console.log("getOfflineSpServicesOffered id: ", id)
    let realmPromise = Realm.open({
 path: `spServicesOffered.realm`, schema: [
spServicesOffered,
ServicesOfferedArr,
ServiceTypeModel
] 
})
        .then((realm) => {
            let data = realm.objectForPrimaryKey('spServicesOffered', id);

            __DEV__ && console.log("getOfflineSpServicesOffered is: ", data)
            return data ? data.servicesOffered : [];
        })
        .catch((err) => {
            __DEV__ && console.log("Err is: ", err)
            throw err;
        })

    return realmPromise;
}

export function clearOfflineSpServicesOffered(){
    Realm.open({
path: `spServicesOffered.realm`, schema: [
spServicesOffered,
ServicesOfferedArr,
ServiceTypeModel
] 
})
        .then((realm) => {
            realm.write(() => {
                let obj = realm.objects('spServicesOffered'),
                 deletedObj = realm.delete(obj); // Deletes all ServicesOffered
              });
        })
.catch((err) => {
            throw err;
        })
}