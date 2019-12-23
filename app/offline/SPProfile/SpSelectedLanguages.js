
const Realm = require('realm'),
 spSelectedLanguages = {
    name: 'spSelectedLanguages',
    primaryKey: 'serviceProviderId',
    properties: {
        serviceProviderId: 'int?',
        languages: 'Languages[]'

    }
},

 Languages = {
    name: 'Languages',
    properties: {
        id: 'int?',
        name: 'string?'

    }
}

export function storeSpSelectedLanguages(languagesObj) {
    __DEV__ && console.log("storeSpSelectedLanguages is: ", languagesObj)
    return Realm.open({
 path: `spSelectedLanguages.realm`, schema: [
spSelectedLanguages,
Languages
] 
})
        .then((realm) => {
            let dbSelectedLanguages = realm.objectForPrimaryKey('spSelectedLanguages', languagesObj.serviceProviderId);

            __DEV__ && console.log("dbSelectedLanguages: ", dbSelectedLanguages)
            realm.write(() => {
                if (dbSelectedLanguages) {
                    dbSelectedLanguages.languages = languagesObj.languages
                } else {
                    let newDbSelectedLanguages = realm.create('spSelectedLanguages', {
                        serviceProviderId: languagesObj.serviceProviderId,
                        languages: languagesObj.languages
                    })

                    __DEV__ && console.log("newDbSelectedLanguages: ", newDbSelectedLanguages);
                }
            });
            return dbSelectedLanguages;
        })
.catch((err) => {
            __DEV__ && console.log("err is: ", err)
            throw err;
        })
}

export function getOfflineSpSelectedLanguages(id) {
    __DEV__ && console.log("getOfflineSpSelectedLanguages: ", id)
    let realmPromise = Realm.open({
 path: `spSelectedLanguages.realm`, schema: [
spSelectedLanguages,
Languages
] 
})
        .then((realm) => {
            let data = realm.objectForPrimaryKey('spSelectedLanguages', id);

            __DEV__ && console.log("getOfflineSpSelectedLanguages is: ", data)
            return data ? data : {};
        })
        .catch((err) => {
            __DEV__ && console.log("Err is: ", err)
            throw err;
        })

    return realmPromise;
}

export function clearOfflineSpSelectedLanguages(){
    Realm.open({
path: `spSelectedLanguages.realm`, schema: [
spSelectedLanguages,
Languages
] 
})
        .then((realm) => {
            realm.write(() => {
                let obj = realm.objects('spSelectedLanguages'),
                 deletedObj = realm.delete(obj); // Deletes all spSelectedLanguages
              });
        })
.catch((err) => {
            throw err;
        })
}