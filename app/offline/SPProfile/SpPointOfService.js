


    const Realm = require('realm'),
 spPointOfService = {
    name: 'spPointOfService',
    primaryKey: 'serviceProviderId',
    properties: {
        serviceProviderId: 'int?',
        spPointOfServiceArr: 'spPointOfServiceArr[]'

    }
},

 spPointOfServiceArr = {
    name: 'spPointOfServiceArr',
    properties: {
        addressId: 'int?',
        serviceProviderId: 'int?',
        addressTypeId: 'int?',
        streetAddress: 'string?',
        city: 'string?',
        stateId: 'int?',
        stateName: 'string?',
        zipCode: 'int?',
        isActive: 'bool?',
        rowversionId: 'string?',
        coverageArea: 'int?',
        lat: 'int?',
        lon: 'int?',
        addressExternalId: 'int?'

    }
}

export function storeSpPointOfService(spId, pointOfServObj) {
    __DEV__ && console.log("pointOfServObj is: ", pointOfServObj)
    return Realm.open({
 path: `spPointOfService.realm`, schema: [
spPointOfService,
spPointOfServiceArr
] 
})
        .then((realm) => {
            let dbPointOfServ = realm.objectForPrimaryKey('spPointOfService', spId);

            __DEV__ && console.log("storeSpPointOfService: ", dbPointOfServ)
            realm.write(() => {
                if (dbPointOfServ) {
                    dbPointOfServ.spPointOfServiceArr = pointOfServObj
                } else {
                    let newDbPointOfServ = realm.create('spPointOfService', {
                        serviceProviderId: spId,
                        spPointOfServiceArr: pointOfServObj
                    })

                    __DEV__ && console.log("newDbPointOfServ: ", newDbPointOfServ);
                }
            });
            return dbPointOfServ;
        })
.catch((err) => {
            __DEV__ && console.log("err is: ", err)
            throw err;
        })
}

export function getOfflineSpPointOfService(id) {
    __DEV__ && console.log("getOfflineSpPointOfServ id: ", id)
    let realmPromise = Realm.open({
 path: `spPointOfService.realm`, schema: [
spPointOfService,
spPointOfServiceArr
] 
})
        .then((realm) => {
            let data = realm.objectForPrimaryKey('spPointOfService', id);

            __DEV__ && console.log("getOfflineSpPointOfServ is: ", data)
            return data ? data.spPointOfServiceArr : [];
        })
        .catch((err) => {
            __DEV__ && console.log("Err is: ", err)
            throw err;
        })

    return realmPromise;
}

export function clearOfflineSpPointOfServ(){
    Realm.open({
path: `spPointOfService.realm`, schema: [
spPointOfService,
spPointOfServiceArr
] 
})
        .then((realm) => {
            realm.write(() => {
                let obj = realm.objects('spPointOfService'),
                 deletedObj = realm.delete(obj); // Deletes all spPointOfService
              });
        })
.catch((err) => {
            throw err;
        })
}