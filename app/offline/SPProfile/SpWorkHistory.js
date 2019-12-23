
const Realm = require('realm'),
 WorkHistory = {
    name: 'spWorkHistory',
    primaryKey: 'serviceProviderId',
    properties: {
        serviceProviderId: 'int?',
        workHistoryArr: 'WorkHistoryArr[]'

    }
},

 WorkHistoryArr = {
    name: 'WorkHistoryArr',
    properties: {
        workHistoryId: 'int?',
        serviceProviderId: 'int?',
        designation: 'string?',
        company: 'string?',
        location: 'string?',
        fromDate: 'string?',
        toDate: 'string?',
        isWorking: 'bool?',
        description: 'string?',
        isActive: 'bool?',
        rowversionId: 'string?',
        workHistoryExternalId: 'int?',
        currentlyWorking: 'bool?'

    }
}

export function storeSpWorkHistory(spId, workHistoryObj) {
    __DEV__ && console.log("storeSpWorkHistory is: ", workHistoryObj)
    return Realm.open({
 path: `spWorkHistory.realm`, schema: [
WorkHistory,
WorkHistoryArr
] 
})
        .then((realm) => {
            let dbCert = realm.objectForPrimaryKey('spWorkHistory', spId);

            __DEV__ && console.log("storeSpWorkHistory: ", dbCert)
            realm.write(() => {
                if (dbCert) {
                    dbCert.workHistoryArr = workHistoryObj
                } else {
                    let newDbWorkHistory = realm.create('spWorkHistory', {
                        serviceProviderId: spId,
                        workHistoryArr: workHistoryObj
                    })

                    __DEV__ && console.log("newDbWorkHistory: ", newDbWorkHistory);
                }
            });
            return dbCert;
        })
.catch((err) => {
            __DEV__ && console.log("err is: ", err)
            throw err;
        })
}

export function getOfflineSpWorkHistory(id) {
    __DEV__ && console.log("getOfflineSpWorkHistory: ", id)
    let realmPromise = Realm.open({
 path: `spWorkHistory.realm`, schema: [
WorkHistory,
WorkHistoryArr
] 
})
        .then((realm) => {
            let data = realm.objectForPrimaryKey('spWorkHistory', id);

            __DEV__ && console.log("getOfflineSpWorkHistory is: ", data)
            return data ? data.workHistoryArr : [];
        })
        .catch((err) => {
            __DEV__ && console.log("Err is: ", err)
            throw err;
        })

    return realmPromise;
}

export function clearOfflineSpWorkHistory(){
    Realm.open({
path: `spWorkHistory.realm`, schema: [
WorkHistory,
WorkHistoryArr
] 
})
        .then((realm) => {
            realm.write(() => {
                let obj = realm.objects('spWorkHistory'),
                 deletedObj = realm.delete(obj); // Deletes all spWorkHistory
              });
        })
.catch((err) => {
            throw err;
        })
}