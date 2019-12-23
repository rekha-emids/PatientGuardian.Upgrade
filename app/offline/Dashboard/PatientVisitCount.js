const Realm = require('realm'),
 PatientVisitCount = {
    name: 'PatientVisitCount',
    primaryKey: 'visitDate',
    properties: {
        visitDate: 'string?',
        visits: 'int'
    }
}


export function storePatientVisitCount(visitDate, visits) {
    Realm.open({ path: `PatientVisitCount.realm`, schema: [PatientVisitCount] })
        .then((realm) => {
            let PatientVisitCount = realm.objectForPrimaryKey('PatientVisitCount', visitDate);

            realm.write(() => {
                if (PatientVisitCount) {
                    PatientVisitCount.visits = visits
                } else {
                    let newPatientVisitCount = realm.create('PatientVisitCount', {
                        visitDate,
                        visits
                    })
                }
            });
        })
.catch((err) => {
            throw err;
        })
}

export function getOfflinePatientVisitCount() {
    let realmPromise = Realm.open({ path: `PatientVisitCount.realm`, schema: [PatientVisitCount] })
        .then((realm) => {
            let retrievedPatientVisitCount = realm.objects('PatientVisitCount');

            __DEV__ && console.log("retrievedPatientVisitCount: ", retrievedPatientVisitCount)
            return retrievedPatientVisitCount;
        })
        .catch((err) => {
            throw err;
        })

    return realmPromise;
}

export function clearOfflinePatientVisitCount(){
    return realmPromise = Realm.open({ path: `PatientVisitCount.realm`, schema: [PatientVisitCount] })
        .then((realm) => {
            realm.write(() => {
                let obj = realm.objects('PatientVisitCount'),
                 deletedObj = realm.delete(obj);
            });
        })
.catch((err) => {
throw err;
})
}